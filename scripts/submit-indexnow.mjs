#!/usr/bin/env node
/**
 * scripts/submit-indexnow.mjs
 *
 * Lightweight, direct IndexNow URL submission script for NebulaSafeTech.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs                      # Submits all URLs from sitemap.xml
 *   node scripts/submit-indexnow.mjs /blogs/example-slug  # Submits specific URL(s)
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "www.nebulasafetech.com";
const KEY_FILE = "0138bf1db8ee4112916efd593da4e115.txt";
const keyPath = path.join(root, "public", KEY_FILE);

if (!existsSync(keyPath)) {
  console.error(`[IndexNow Error] Verification key file not found at ${keyPath}`);
  process.exit(1);
}

const key = readFileSync(keyPath, "utf-8").trim();
const rawArgs = process.argv.slice(2);
if (rawArgs.includes("--help") || rawArgs.includes("-h")) {
  console.log(`
Usage:
  node scripts/submit-indexnow.mjs                      # Submit all URLs from public/sitemap.xml
  node scripts/submit-indexnow.mjs /blogs/example-slug  # Submit single URL
  node scripts/submit-indexnow.mjs url1 url2 ...        # Submit multiple URLs
`);
  process.exit(0);
}

const args = rawArgs.filter((a) => !a.startsWith("--"));

let urls = [];
if (args.length > 0) {
  urls = args.map((u) => (u.startsWith("http") ? u : `https://${HOST}${u.startsWith("/") ? "" : "/"}${u}`));
} else {
  const sitemapPath = path.join(root, "public", "sitemap.xml");
  if (!existsSync(sitemapPath)) {
    console.error(`[IndexNow Error] Sitemap not found at ${sitemapPath}`);
    process.exit(1);
  }
  const sitemap = readFileSync(sitemapPath, "utf-8");
  urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
}

console.log(`[IndexNow] Submitting ${urls.length} URL(s) for ${HOST}...`);

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `https://${HOST}/${KEY_FILE}`,
      urlList: urls,
    }),
  });

  const ok = res.status === 200 || res.status === 202;
  console.log(`[IndexNow] Response: HTTP ${res.status} (${ok ? "Success / Accepted" : "Failed"})`);

  if (!ok) {
    const text = await res.text();
    console.error(`[IndexNow Details] ${text}`);
    process.exit(1);
  }
} catch (err) {
  console.error(`[IndexNow Error] Network failure: ${err.message}`);
  process.exit(1);
}
