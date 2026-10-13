/**
 * scripts/indexnow-core.mjs
 *
 * Core library for IndexNow URL submission, normalization, security validation,
 * key derivation, and Git change detection for NebulaSafeTech.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export const CANONICAL_ORIGIN = "https://www.nebulasafetech.com";
export const CANONICAL_HOST = "www.nebulasafetech.com";
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const KEY_FILENAME = "0138bf1db8ee4112916efd593da4e115.txt";
export const KEY_LOCATION = `${CANONICAL_ORIGIN}/${KEY_FILENAME}`;
export const EXPECTED_KEY = "0138bf1db8ee4112916efd593da4e115";

/** Known redirected or legacy paths that must never be submitted to search engines */
export const KNOWN_REDIRECT_PATTERNS = [
  /^\/clients(\/.*)?$/,
  /^\/blog(\/.*)?$/,
  /^\/contact(\/.*)?$/,
  /^\/careers(\/.*)?$/,
  /^\/index\.html$/,
  /^\/cgi-bin(\/.*)?$/,
];

/** Masks an API key for safe logging: e.g. "0138...115" */
export function maskKey(key) {
  if (!key || typeof key !== "string") return "[none]";
  if (key.length <= 8) return "***";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

/**
 * Derives and validates the server-side IndexNow key.
 * Priority:
 * 1. Explicit argument in options
 * 2. process.env.INDEXNOW_KEY
 * 3. File in public/0138bf1db8ee4112916efd593da4e115.txt
 */
export function resolveIndexNowKey(options = {}, rootDir = process.cwd()) {
  let key = options.key || process.env.INDEXNOW_KEY;

  if (!key) {
    const keyFilePath = path.join(rootDir, "public", KEY_FILENAME);
    if (existsSync(keyFilePath)) {
      try {
        key = readFileSync(keyFilePath, "utf-8").trim();
      } catch (err) {
        throw new Error(`Failed to read IndexNow key file at ${keyFilePath}: ${err.message}`);
      }
    }
  }

  if (!key || typeof key !== "string") {
    throw new Error(
      `IndexNow key not found. Ensure INDEXNOW_KEY environment variable is set or public/${KEY_FILENAME} exists.`
    );
  }

  // Validate key format (IndexNow requires 8-128 hex or alphanumeric characters)
  const keyPattern = /^[a-zA-Z0-9-]{8,128}$/;
  if (!keyPattern.test(key)) {
    throw new Error(`IndexNow key contains invalid characters or invalid length: ${maskKey(key)}`);
  }

  return key;
}

/**
 * Validates and normalizes an input URL to the canonical https://www.nebulasafetech.com format.
 * Rejects external domains, localhost, preview URLs, invalid protocols, query strings, and redirects.
 * Returns { valid: boolean, normalizedUrl?: string, error?: string }
 */
export function validateAndNormalizeUrl(rawInput) {
  if (!rawInput || typeof rawInput !== "string") {
    return { valid: false, error: "URL input must be a non-empty string" };
  }

  const trimmed = rawInput.trim();
  let parsedUrl;

  try {
    if (trimmed.startsWith("/")) {
      parsedUrl = new URL(trimmed, CANONICAL_ORIGIN);
    } else {
      parsedUrl = new URL(trimmed);
    }
  } catch (err) {
    return { valid: false, error: `Malformed URL: ${err.message}` };
  }

  // Enforce HTTPS
  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    return { valid: false, error: `Unsupported protocol: ${parsedUrl.protocol}` };
  }

  // Host validation & normalization
  const host = parsedUrl.hostname.toLowerCase();

  // Explicitly reject localhost and private IP addresses
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    /^192\.168\./.test(host) ||
    /^10\./.test(host)
  ) {
    return { valid: false, error: "Localhost or private network URLs cannot be submitted to IndexNow" };
  }

  // Reject preview deployments (e.g. *.vercel.app)
  if (host.endsWith(".vercel.app")) {
    return { valid: false, error: "Preview deployment URLs cannot be submitted to IndexNow" };
  }

  // Reject external domains
  if (host !== "www.nebulasafetech.com" && host !== "nebulasafetech.com") {
    return { valid: false, error: `Host '${host}' does not match canonical host '${CANONICAL_HOST}'` };
  }

  // Normalize host to canonical www.nebulasafetech.com
  parsedUrl.protocol = "https:";
  parsedUrl.hostname = CANONICAL_HOST;
  parsedUrl.port = "";

  // Strip query parameters and hash fragments (IndexNow indexes clean canonical pages)
  parsedUrl.search = "";
  parsedUrl.hash = "";

  // Normalize pathname: preserve root "/", remove trailing slashes for subpaths
  let pathname = parsedUrl.pathname;
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.replace(/\/+$/, "");
  }
  parsedUrl.pathname = pathname;

  // Check against known legacy redirect patterns
  for (const pattern of KNOWN_REDIRECT_PATTERNS) {
    if (pattern.test(pathname)) {
      return {
        valid: false,
        error: `URL '${pathname}' matches a redirected/legacy path. Only canonical indexable URLs may be submitted.`,
      };
    }
  }

  // Disallow dotfile or asset file paths unless intentional
  if (/\.(js|css|map|png|jpg|jpeg|webp|svg|ico|txt|json|xml)$/i.test(pathname)) {
    return { valid: false, error: `Static asset file paths should not be submitted to IndexNow: ${pathname}` };
  }

  return { valid: true, normalizedUrl: parsedUrl.origin + parsedUrl.pathname };
}

/**
 * Filters, validates, and deduplicates a list of URL inputs.
 * Returns { validUrls: string[], rejected: { input: string, reason: string }[] }
 */
export function filterAndDeduplicateUrls(urlInputs) {
  if (!Array.isArray(urlInputs)) {
    return { validUrls: [], rejected: [{ input: String(urlInputs), reason: "Input must be an array of URLs" }] };
  }

  const validSet = new Set();
  const rejected = [];

  for (const input of urlInputs) {
    const result = validateAndNormalizeUrl(input);
    if (result.valid) {
      validSet.add(result.normalizedUrl);
    } else {
      rejected.push({ input, reason: result.error });
    }
  }

  return {
    validUrls: Array.from(validSet),
    rejected,
  };
}

/**
 * Splits array into chunks of given size (IndexNow max batch size = 10,000)
 */
export function chunkArray(arr, size = 10000) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Submits a validated list of URLs to the IndexNow API.
 * Supports batching, retries for transient errors, and dry-run mode.
 */
export async function submitToIndexNow({
  key,
  urls,
  keyLocation = KEY_LOCATION,
  host = CANONICAL_HOST,
  endpoint = INDEXNOW_ENDPOINT,
  dryRun = false,
  fetchFn = globalThis.fetch,
  logger = console,
  batchSize = 10000,
  maxRetries = 1,
} = {}) {
  const { validUrls, rejected } = filterAndDeduplicateUrls(urls);

  if (rejected.length > 0) {
    logger.warn?.(`[IndexNow] Rejected ${rejected.length} invalid/non-canonical URL(s):`, rejected);
  }

  if (validUrls.length === 0) {
    logger.info?.("[IndexNow] No valid URLs to submit.");
    return {
      success: true,
      submittedCount: 0,
      batchesCount: 0,
      validUrls: [],
      rejected,
      results: [],
    };
  }

  const batches = chunkArray(validUrls, batchSize);
  const results = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const payload = {
      host,
      key,
      keyLocation,
      urlList: batch,
    };

    if (dryRun) {
      logger.info?.(
        `[IndexNow DRY-RUN] Batch ${i + 1}/${batches.length}: ${batch.length} URL(s) to ${endpoint} with key ${maskKey(key)}`
      );
      results.push({
        batchIndex: i,
        status: 200,
        ok: true,
        dryRun: true,
        count: batch.length,
        urls: batch,
      });
      continue;
    }

    let attempt = 0;
    let lastError = null;
    let responseStatus = null;
    let responseBody = null;

    while (attempt <= maxRetries) {
      attempt++;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await fetchFn(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "NebulaSafeTech-IndexNow-Bot/1.0",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        responseStatus = response.status;
        responseBody = await response.text();

        // 200 (OK) and 202 (Accepted) are valid IndexNow responses
        if (responseStatus === 200 || responseStatus === 202) {
          logger.info?.(
            `[IndexNow] Batch ${i + 1}/${batches.length} accepted (${responseStatus}): ${batch.length} URL(s) submitted.`
          );
          results.push({
            batchIndex: i,
            status: responseStatus,
            ok: true,
            count: batch.length,
            urls: batch,
            message: responseStatus === 202 ? "Accepted (Key validation pending)" : "OK (Submitted)",
          });
          lastError = null;
          break;
        }

        // 4xx client errors should not be retried
        if (responseStatus >= 400 && responseStatus < 500) {
          const errMsg = `IndexNow client error HTTP ${responseStatus}: ${responseBody.slice(0, 200)}`;
          logger.error?.(`[IndexNow] ${errMsg}`);
          lastError = new Error(errMsg);
          results.push({
            batchIndex: i,
            status: responseStatus,
            ok: false,
            count: batch.length,
            urls: batch,
            error: errMsg,
          });
          break;
        }

        // 5xx server errors can be retried
        if (attempt <= maxRetries) {
          logger.warn?.(`[IndexNow] HTTP ${responseStatus} on attempt ${attempt}. Retrying in 1.5s...`);
          await new Promise((r) => setTimeout(r, 1500));
        } else {
          lastError = new Error(`IndexNow server error HTTP ${responseStatus}: ${responseBody.slice(0, 200)}`);
          results.push({
            batchIndex: i,
            status: responseStatus,
            ok: false,
            count: batch.length,
            urls: batch,
            error: lastError.message,
          });
        }
      } catch (err) {
        lastError = err;
        if (attempt <= maxRetries) {
          logger.warn?.(`[IndexNow] Network error on attempt ${attempt}: ${err.message}. Retrying...`);
          await new Promise((r) => setTimeout(r, 1500));
        } else {
          logger.error?.(`[IndexNow] Network failure after ${attempt} attempts: ${err.message}`);
          results.push({
            batchIndex: i,
            status: null,
            ok: false,
            count: batch.length,
            urls: batch,
            error: err.message,
          });
        }
      }
    }
  }

  const allOk = results.every((r) => r.ok);
  return {
    success: allOk,
    submittedCount: allOk ? validUrls.length : results.filter((r) => r.ok).reduce((sum, r) => sum + r.count, 0),
    batchesCount: batches.length,
    validUrls,
    rejected,
    results,
  };
}

/**
 * Inspects Git commit diffs to discover which indexable URLs were published, updated, or removed.
 */
export function detectChangedUrlsFromGit({
  baseCommit = "HEAD~1",
  headCommit = "HEAD",
  rootDir = process.cwd(),
} = {}) {
  try {
    const diffCmd = `git diff --name-status "${baseCommit}" "${headCommit}"`;
    const output = execSync(diffCmd, { cwd: rootDir, encoding: "utf-8" }).trim();

    if (!output) {
      return { changedUrls: [], deletedUrls: [], details: [] };
    }

    const lines = output.split("\n");
    const changedUrls = new Set();
    const deletedUrls = new Set();
    const details = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      const [status, ...parts] = line.split(/\s+/);
      const filePath = parts.join(" ");

      // 1. Blog posts in src/app/data/blogs/
      if (filePath.startsWith("src/app/data/blogs/") && filePath.endsWith(".ts")) {
        if (status === "D") {
          // Attempt to extract slug from git commit history
          try {
            const oldContent = execSync(`git show "${baseCommit}:${filePath}"`, {
              cwd: rootDir,
              encoding: "utf-8",
            });
            const slugMatch = oldContent.match(/slug:\s*["']([^"']+)["']/);
            if (slugMatch) {
              const url = `${CANONICAL_ORIGIN}/blogs/${slugMatch[1]}`;
              deletedUrls.add(url);
              details.push({ file: filePath, status, type: "blog-deleted", url });
            }
          } catch {
            // If git show fails, fallback
          }
        } else {
          // File added (A) or modified (M)
          const fullPath = path.join(rootDir, filePath);
          if (existsSync(fullPath)) {
            const content = readFileSync(fullPath, "utf-8");
            const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
            if (slugMatch) {
              const url = `${CANONICAL_ORIGIN}/blogs/${slugMatch[1]}`;
              changedUrls.add(url);
              details.push({ file: filePath, status, type: "blog-post", url });
            }
          }
        }
      }

      // 2. Static Pages in src/app/pages/
      const PAGE_MAP = {
        "src/app/pages/HomePage.tsx": `${CANONICAL_ORIGIN}/`,
        "src/app/pages/AboutPage.tsx": `${CANONICAL_ORIGIN}/about`,
        "src/app/pages/ServicesPage.tsx": `${CANONICAL_ORIGIN}/services`,
        "src/app/pages/ClientsPage.tsx": `${CANONICAL_ORIGIN}/testimonials`,
        "src/app/pages/EdTechPage.tsx": `${CANONICAL_ORIGIN}/edtech`,
        "src/app/pages/BlogsPage.tsx": `${CANONICAL_ORIGIN}/blogs`,
        "src/app/pages/PrivacyPolicyPage.tsx": `${CANONICAL_ORIGIN}/privacy-policy`,
        "src/app/pages/TermsAndConditionsPage.tsx": `${CANONICAL_ORIGIN}/terms-and-conditions`,
      };

      if (PAGE_MAP[filePath]) {
        changedUrls.add(PAGE_MAP[filePath]);
        details.push({ file: filePath, status, type: "page", url: PAGE_MAP[filePath] });
      }

      // If ServiceDetailPage changed, submit the 4 service routes
      if (filePath === "src/app/pages/ServiceDetailPage.tsx") {
        const serviceRoutes = [
          `${CANONICAL_ORIGIN}/services/cybersecurity`,
          `${CANONICAL_ORIGIN}/services/web-development`,
          `${CANONICAL_ORIGIN}/services/ui-ux-design`,
          `${CANONICAL_ORIGIN}/services/edtech-training`,
        ];
        for (const sr of serviceRoutes) {
          changedUrls.add(sr);
          details.push({ file: filePath, status, type: "service-detail", url: sr });
        }
      }
    }

    return {
      changedUrls: Array.from(changedUrls),
      deletedUrls: Array.from(deletedUrls),
      details,
    };
  } catch (err) {
    return {
      error: `Git change detection error: ${err.message}`,
      changedUrls: [],
      deletedUrls: [],
      details: [],
    };
  }
}
