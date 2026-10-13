#!/usr/bin/env node
/**
 * scripts/submit-indexnow.mjs
 *
 * Lightweight, production-ready IndexNow submission script for NebulaSafeTech.
 *
 * Supported workflows:
 *   1. Manual / All URLs:
 *        node scripts/submit-indexnow.mjs
 *   2. Specific URLs:
 *        node scripts/submit-indexnow.mjs /blogs/example-post /services
 *   3. CI / Automation with changed-URL detection:
 *        node scripts/submit-indexnow.mjs --urls-file .indexnow-urls.txt --changed-only --verify-live
 *   4. Dry Run (validation without sending HTTP POST):
 *        node scripts/submit-indexnow.mjs --dry-run
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const HOST = "www.nebulasafetech.com";
export const CANONICAL_ORIGIN = `https://${HOST}`;
export const KEY_FILE = "0138bf1db8ee4112916efd593da4e115.txt";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Resolves the IndexNow verification key.
 * Priority: CLI argument --key > process.env.INDEXNOW_KEY > public/<KEY_FILE>
 */
export function resolveIndexNowKey(explicitKey = null) {
  if (explicitKey && explicitKey.trim()) {
    return explicitKey.trim();
  }
  if (process.env.INDEXNOW_KEY && process.env.INDEXNOW_KEY.trim()) {
    return process.env.INDEXNOW_KEY.trim();
  }
  const keyPath = path.join(root, "public", KEY_FILE);
  if (!existsSync(keyPath)) {
    throw new Error(`Verification key file not found at ${keyPath}`);
  }
  const keyContent = readFileSync(keyPath, "utf-8").trim();
  if (!keyContent) {
    throw new Error(`Verification key file at ${keyPath} is empty`);
  }
  return keyContent;
}

/**
 * Normalizes a URL and validates that it belongs to the canonical host.
 */
export function validateAndNormalizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  let url = rawUrl.trim();
  if (url.startsWith("/")) {
    url = `${CANONICAL_ORIGIN}${url}`;
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== HOST) {
      console.warn(`[IndexNow Filter] Skipping non-canonical host: ${url}`);
      return null;
    }
    if (parsed.protocol !== "https:") {
      console.warn(`[IndexNow Filter] Skipping non-HTTPS URL: ${url}`);
      return null;
    }

    // Resolve legacy redirects
    let pathname = parsed.pathname;
    if (pathname === "/clients" || pathname === "/clients/") {
      pathname = "/testimonials";
    } else if (pathname === "/blog" || pathname === "/blog/") {
      pathname = "/blogs";
    } else if (pathname.startsWith("/blog/")) {
      pathname = pathname.replace(/^\/blog\//, "/blogs/");
    }

    // Strip trailing slashes except root
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    return `${CANONICAL_ORIGIN}${pathname}`;
  } catch {
    console.warn(`[IndexNow Filter] Skipping malformed URL: ${rawUrl}`);
    return null;
  }
}

/**
 * Polls target URLs on the live production site to ensure Vercel deployment has finished.
 * Avoids submitting URLs for failed or still-building deployments.
 */
export async function verifyUrlsLive(urls, { maxWaitSeconds = 180, intervalSeconds = 10, fetchFn = fetch } = {}) {
  console.log(`\n--- VERIFYING DEPLOYMENT STATUS ON PRODUCTION (${urls.length} URLs) ---`);
  console.log(`Polling ${CANONICAL_ORIGIN} to confirm deployment is live before submitting...`);

  // First verify key file is live
  const keyUrl = `${CANONICAL_ORIGIN}/${KEY_FILE}`;
  try {
    const keyRes = await fetchFn(keyUrl, { method: "HEAD", headers: { "User-Agent": "IndexNow-DeployCheck/1.0" } });
    if (keyRes.status !== 200) {
      console.warn(`[Deploy Warning] Key file ${keyUrl} returned status ${keyRes.status}.`);
    } else {
      console.log(`[Deploy Check] Verified key file is live at ${keyUrl}`);
    }
  } catch (err) {
    console.warn(`[Deploy Warning] Network error checking key file: ${err.message}`);
  }

  const verified = [];
  const startTime = Date.now();
  const maxWaitMs = maxWaitSeconds * 1000;

  for (const url of urls) {
    let isLive = false;
    let attempt = 0;

    while (!isLive && Date.now() - startTime < maxWaitMs) {
      attempt++;
      try {
        const res = await fetchFn(url, { method: "HEAD", headers: { "User-Agent": "IndexNow-DeployCheck/1.0" } });
        if (res.status === 200) {
          console.log(`✅ [Deploy Confirmed] ${url} is live (HTTP 200)`);
          verified.push(url);
          isLive = true;
          break;
        } else {
          console.log(`⏳ [Waiting] ${url} returned HTTP ${res.status} (attempt ${attempt}). Deployment may still be in progress...`);
        }
      } catch (err) {
        console.log(`⏳ [Waiting] ${url} error (${err.message}) on attempt ${attempt}...`);
      }

      // Wait interval before retrying
      if (!isLive) {
        await new Promise((resolve) => setTimeout(resolve, intervalSeconds * 1000));
      }
    }

    if (!isLive) {
      console.warn(`⚠️ [Deploy Timeout] ${url} did not return HTTP 200 within ${maxWaitSeconds}s. Skipping to prevent submitting unverified or failed deployments.`);
    }
  }

  return verified;
}

/**
 * Main submit function.
 */
export async function submitUrlsToIndexNow({
  urls = [],
  key,
  dryRun = false,
  fetchFn = fetch,
  logger = console,
} = {}) {
  if (!key) {
    throw new Error("Missing IndexNow key");
  }

  if (urls.length === 0) {
    logger.log("[IndexNow] No URLs to submit.");
    return { ok: true, status: 200, count: 0, dryRun };
  }

  const payload = {
    host: HOST,
    key,
    keyLocation: `${CANONICAL_ORIGIN}/${KEY_FILE}`,
    urlList: urls,
  };

  logger.log(`\n--- INDEXNOW SUBMISSION PAYLOAD ---`);
  logger.log(`Host        : ${payload.host}`);
  logger.log(`Key Location: ${payload.keyLocation}`);
  logger.log(`URL Count   : ${payload.urlList.length}`);
  logger.log(`URLs        :`);
  for (const u of payload.urlList) {
    logger.log(`  • ${u}`);
  }

  if (dryRun) {
    logger.log(`\n[IndexNow Dry Run] Payload valid. Skipped actual network submission (dryRun=true).`);
    return { ok: true, status: 200, count: urls.length, dryRun: true };
  }

  logger.log(`\nSubmitting ${urls.length} URL(s) to https://api.indexnow.org/indexnow...`);
  const res = await fetchFn("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const ok = res.status === 200 || res.status === 202;
  const statusDescription =
    res.status === 200
      ? "OK (Submission successful)"
      : res.status === 202
      ? "Accepted (URL received, key verification pending)"
      : res.status === 400
      ? "Bad Request (Invalid payload format)"
      : res.status === 403
      ? "Forbidden (Key not found or invalid)"
      : res.status === 422
      ? "Unprocessable Entity (URL does not match host or key mismatch)"
      : res.status === 429
      ? "Too Many Requests (Rate limit)"
      : `HTTP ${res.status}`;

  logger.log(`[IndexNow] Response: HTTP ${res.status} - ${statusDescription}`);

  if (!ok) {
    const text = await res.text();
    logger.error(`[IndexNow Error Details] ${text}`);
    return { ok: false, status: res.status, error: text, count: urls.length };
  }

  return { ok: true, status: res.status, count: urls.length };
}

// ---------------------------------------------------------------------------
// CLI Execution
// ---------------------------------------------------------------------------
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  async function runCli() {
    const rawArgs = process.argv.slice(2);
    if (rawArgs.includes("--help") || rawArgs.includes("-h")) {
      console.log(`
Usage:
  node scripts/submit-indexnow.mjs [options] [urls...]

Options:
  --urls-file <path>   File containing URLs to submit (one per line)
  --changed-only       If passed and no URLs are provided, exit cleanly without submitting sitemap
  --verify-live        Verify each URL returns HTTP 200 on production before submitting
  --dry-run            Validate URLs and payload without sending HTTP request
  --key <key>          Override verification key
  --help, -h           Show this message

Examples:
  node scripts/submit-indexnow.mjs                      # Submit all URLs from public/sitemap.xml
  node scripts/submit-indexnow.mjs /blogs/example-slug  # Submit single URL
  node scripts/submit-indexnow.mjs --urls-file .urls.txt --changed-only --verify-live
`);
      process.exit(0);
    }

    let urlsFile = null;
    let changedOnly = false;
    let verifyLive = false;
    let dryRun = false;
    let explicitKey = null;
    const urlArgs = [];

    for (let i = 0; i < rawArgs.length; i++) {
      const arg = rawArgs[i];
      if (arg === "--urls-file" && rawArgs[i + 1]) urlsFile = rawArgs[++i];
      else if (arg === "--changed-only" || arg === "--allow-empty") changedOnly = true;
      else if (arg === "--verify-live") verifyLive = true;
      else if (arg === "--dry-run") dryRun = true;
      else if (arg === "--key" && rawArgs[i + 1]) explicitKey = rawArgs[++i];
      else if (!arg.startsWith("--")) urlArgs.push(arg);
    }

    let key;
    try {
      key = resolveIndexNowKey(explicitKey);
    } catch (err) {
      console.error(`[IndexNow Error] ${err.message}`);
      process.exit(1);
    }

    const rawUrlList = [];

    // 1. Read from urls-file if provided
    if (urlsFile) {
      const fullUrlsPath = path.isAbsolute(urlsFile) ? urlsFile : path.join(root, urlsFile);
      if (existsSync(fullUrlsPath)) {
        const fileContent = readFileSync(fullUrlsPath, "utf-8");
        const lines = fileContent.split("\n").map((l) => l.trim()).filter(Boolean);
        rawUrlList.push(...lines);
      }
    }

    // 2. Add CLI url arguments
    rawUrlList.push(...urlArgs);

    // 3. Fallback: if no URLs and not changed-only, read all sitemap URLs
    if (rawUrlList.length === 0) {
      if (changedOnly) {
        console.log("[IndexNow] No newly added or updated public URLs detected. Skipping submission.");
        process.exit(0);
      }
      const sitemapPath = path.join(root, "public", "sitemap.xml");
      if (!existsSync(sitemapPath)) {
        console.error(`[IndexNow Error] Sitemap not found at ${sitemapPath}`);
        process.exit(1);
      }
      const sitemap = readFileSync(sitemapPath, "utf-8");
      rawUrlList.push(...Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]));
    }

    // Normalize and deduplicate URLs
    const validatedUrls = Array.from(
      new Set(rawUrlList.map(validateAndNormalizeUrl).filter(Boolean))
    );

    if (validatedUrls.length === 0) {
      console.log("[IndexNow] Zero valid canonical URLs found to submit. Exiting cleanly.");
      process.exit(0);
    }

    // Verify deployment is live on production if requested
    let urlsToSubmit = validatedUrls;
    if (verifyLive && !dryRun) {
      urlsToSubmit = await verifyUrlsLive(validatedUrls, { maxWaitSeconds: 180, intervalSeconds: 10 });
      if (urlsToSubmit.length === 0) {
        console.warn("[IndexNow Warning] None of the changed URLs were verified live on production. Deployment may have failed or timed out. Skipping submission.");
        process.exit(0);
      }
    }

    // Submit to IndexNow
    const result = await submitUrlsToIndexNow({
      urls: urlsToSubmit,
      key,
      dryRun,
    });

    if (!result.ok) {
      process.exit(1);
    }
  }

  runCli().catch((err) => {
    console.error(`[IndexNow Fatal Error] ${err.message}`);
    process.exit(1);
  });
}
