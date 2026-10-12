import { spawn, execSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import http from "node:http";
import { setTimeout as sleep } from "node:timers/promises";

const BRAVE_PATH = "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe";

async function main() {
  if (!existsSync(BRAVE_PATH)) {
    console.error(`Brave binary not found at ${BRAVE_PATH}`);
    process.exit(1);
  }

  console.log("1. Starting preview server on port 4173...");
  const preview = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], {
    shell: true,
    stdio: "pipe",
  });

  preview.stdout.on("data", (d) => console.log(`[preview] ${d.toString().trim()}`));
  preview.stderr.on("data", (d) => console.error(`[preview error] ${d.toString().trim()}`));

  // Wait for preview server to be responsive
  let ready = false;
  for (let i = 0; i < 10; i++) {
    await sleep(1000);
    try {
      await new Promise((resolve, reject) => {
        const req = http.get("http://localhost:4173/", (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on("error", reject);
      });
      ready = true;
      console.log("Preview server is live!");
      break;
    } catch {}
  }

  if (!ready) {
    console.error("Preview server failed to start.");
    if (preview.pid) execSync(`taskkill /pid ${preview.pid} /T /F`, { stdio: "ignore" });
    process.exit(1);
  }

  try {
    console.log("\n2. Running Lighthouse Mobile Audit...");
    const mobileCmd = `npx -y lighthouse http://localhost:4173/ --chrome-flags="--headless --no-sandbox" --output=json --output-path=./lighthouse-mobile.json --form-factor=mobile --throttling-method=simulate --only-categories=performance,accessibility,best-practices,seo`;
    console.log(`Executing: ${mobileCmd}`);
    execSync(mobileCmd, {
      env: { ...process.env, CHROME_PATH: BRAVE_PATH },
      stdio: "inherit",
    });

    console.log("\n3. Running Lighthouse Desktop Audit...");
    const desktopCmd = `npx -y lighthouse http://localhost:4173/ --chrome-flags="--headless --no-sandbox" --output=json --output-path=./lighthouse-desktop.json --preset=desktop --throttling-method=simulate --only-categories=performance,accessibility,best-practices,seo`;
    console.log(`Executing: ${desktopCmd}`);
    execSync(desktopCmd, {
      env: { ...process.env, CHROME_PATH: BRAVE_PATH },
      stdio: "inherit",
    });

    console.log("\nAudits completed successfully!");
  } catch (err) {
    console.error("Lighthouse execution error:", err.message);
  } finally {
    console.log("Stopping preview server...");
    if (preview.pid) {
      try {
        execSync(`taskkill /pid ${preview.pid} /T /F`, { stdio: "ignore" });
      } catch {}
    }
  }
}

main();
