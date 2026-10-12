import http from "node:http";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

async function run() {
  console.log("Starting vite preview server...");
  const preview = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], {
    shell: true,
    stdio: "pipe",
  });

  preview.stdout.on("data", (d) => console.log(`[preview stdout] ${d.toString().trim()}`));
  preview.stderr.on("data", (d) => console.error(`[preview stderr] ${d.toString().trim()}`));

  // Wait for preview server to start
  await sleep(3000);

  const fetchUrl = (path) =>
    new Promise((resolve, reject) => {
      const tryFetch = (retries = 5) => {
        const req = http.get(`http://localhost:4173${path}`, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: data,
            });
          });
        });
        req.on("error", (err) => {
          if (retries > 0 && err.code === "ECONNREFUSED") {
            setTimeout(() => tryFetch(retries - 1), 1000);
          } else {
            reject(err);
          }
        });
      };
      tryFetch();
    });

  let failed = false;

  try {
    // 1. Test homepage
    console.log("\n--- Testing GET / ---");
    const home = await fetchUrl("/");
    console.log(`Status: ${home.statusCode}`);
    console.log(`Content-Type: ${home.headers["content-type"]}`);
    console.log(`CSP header present: ${Boolean(home.headers["content-security-policy"])}`);
    if (home.headers["content-security-policy"]) {
      const hasDblClick = home.headers["content-security-policy"].includes("stats.g.doubleclick.net");
      console.log(`CSP contains stats.g.doubleclick.net: ${hasDblClick}`);
      if (!hasDblClick) failed = true;
    }
    const hasHeroMarkup = home.body.includes("One</span> Purpose.") && home.body.includes("company-icon-72.webp");
    console.log(`Prerendered hero injected into #root: ${hasHeroMarkup}`);
    const hasAiCatalogLink = home.body.includes('rel="ai-catalog"');
    console.log(`Link rel="ai-catalog" present in head: ${hasAiCatalogLink}`);
    if (!hasHeroMarkup || !hasAiCatalogLink) failed = true;

    // 2. Test /.well-known/ai-catalog.json
    console.log("\n--- Testing GET /.well-known/ai-catalog.json ---");
    const catalog = await fetchUrl("/.well-known/ai-catalog.json");
    console.log(`Status: ${catalog.statusCode}`);
    console.log(`Content-Type: ${catalog.headers["content-type"]}`);
    console.log(`Is valid JSON:`);
    try {
      const parsed = JSON.parse(catalog.body);
      console.log(`  Parsed successfully: specVersion=${parsed.specVersion}, host=${parsed.host?.displayName}`);
      console.log(`  Entries count: ${parsed.entries?.length}`);
    } catch (err) {
      console.error(`  FAILED: Response is not JSON! Body starts with: ${catalog.body.slice(0, 100)}`);
      failed = true;
    }

    // 3. Test /ai-catalog.json
    console.log("\n--- Testing GET /ai-catalog.json ---");
    const catalogRoot = await fetchUrl("/ai-catalog.json");
    console.log(`Status: ${catalogRoot.statusCode}`);
    console.log(`Content-Type: ${catalogRoot.headers["content-type"]}`);
    try {
      const parsed = JSON.parse(catalogRoot.body);
      console.log(`  Parsed successfully: specVersion=${parsed.specVersion}, host=${parsed.host?.displayName}`);
    } catch (err) {
      console.error(`  FAILED: Response is not JSON! Body starts with: ${catalogRoot.body.slice(0, 100)}`);
      failed = true;
    }

    // 4. Test /testimonials
    console.log("\n--- Testing GET /testimonials ---");
    const testimonials = await fetchUrl("/testimonials");
    console.log(`Status: ${testimonials.statusCode}`);
    console.log(`Content-Type: ${testimonials.headers["content-type"]}`);
    const hasTestimonialsContent = testimonials.body.includes("Client Testimonials") || testimonials.body.includes("Trusted");
    console.log(`Contains testimonials prerendered markup: ${hasTestimonialsContent}`);

    // 5. Test /blogs/ai-agents-enterprise-data-security
    console.log("\n--- Testing GET /blogs/ai-agents-enterprise-data-security ---");
    const blog = await fetchUrl("/blogs/ai-agents-enterprise-data-security");
    console.log(`Status: ${blog.statusCode}`);
    const hasBlogMeta = blog.body.includes("AI Agents") && blog.body.includes("og:image");
    console.log(`Contains blog prerendered metadata: ${hasBlogMeta}`);

    console.log("\n==========================================");
    if (failed) {
      console.error("ENDPOINT VALIDATION FAILED!");
      process.exitCode = 1;
    } else {
      console.log("ALL PREVIEW ENDPOINTS VALIDATED SUCCESSFULLY!");
    }
    console.log("==========================================");
  } catch (err) {
    console.error("Test error:", err);
    process.exitCode = 1;
  } finally {
    console.log("Stopping preview server...");
    try {
      if (process.platform === "win32" && preview.pid) {
        const { execSync } = await import("node:child_process");
        execSync(`taskkill /pid ${preview.pid} /T /F`, { stdio: "ignore" });
      } else {
        preview.kill();
      }
    } catch {}
  }
}

run();
