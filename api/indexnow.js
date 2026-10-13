/**
 * api/indexnow.js
 *
 * Vercel Serverless Function to securely receive URL submission requests
 * from authenticated CI/CD workflows, webhooks, or publishing pipelines,
 * and dispatch them to the official IndexNow API.
 *
 * Security:
 * - Requires authentication via 'Authorization: Bearer <INDEXNOW_SECRET>'
 *   or 'x-indexnow-secret: <INDEXNOW_SECRET>'.
 * - Rejects unauthenticated requests with HTTP 401.
 * - Strict URL validation & normalization against https://www.nebulasafetech.com.
 * - Never exposes the IndexNow key to visitors or unauthenticated callers.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const CANONICAL_ORIGIN = "https://www.nebulasafetech.com";
const CANONICAL_HOST = "www.nebulasafetech.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FILENAME = "0138bf1db8ee4112916efd593da4e115.txt";
const KEY_LOCATION = `${CANONICAL_ORIGIN}/${KEY_FILENAME}`;

const KNOWN_REDIRECT_PATTERNS = [
  /^\/clients(\/.*)?$/,
  /^\/blog(\/.*)?$/,
  /^\/contact(\/.*)?$/,
  /^\/careers(\/.*)?$/,
  /^\/index\.html$/,
  /^\/cgi-bin(\/.*)?$/,
];

function maskKey(key) {
  if (!key || typeof key !== "string") return "[none]";
  if (key.length <= 8) return "***";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

function resolveKey() {
  let key = process.env.INDEXNOW_KEY;
  if (!key) {
    const keyPath = path.join(process.cwd(), "public", KEY_FILENAME);
    if (existsSync(keyPath)) {
      try {
        key = readFileSync(keyPath, "utf-8").trim();
      } catch {
        // Fallback
      }
    }
  }
  return key;
}

function validateAndNormalizeUrl(rawInput) {
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

  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    return { valid: false, error: `Unsupported protocol: ${parsedUrl.protocol}` };
  }

  const host = parsedUrl.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".vercel.app") ||
    /^192\.168\./.test(host) ||
    /^10\./.test(host)
  ) {
    return { valid: false, error: "Localhost, private, or preview URLs cannot be submitted" };
  }

  if (host !== "www.nebulasafetech.com" && host !== "nebulasafetech.com") {
    return { valid: false, error: `Host '${host}' does not match canonical '${CANONICAL_HOST}'` };
  }

  parsedUrl.protocol = "https:";
  parsedUrl.hostname = CANONICAL_HOST;
  parsedUrl.port = "";
  parsedUrl.search = "";
  parsedUrl.hash = "";

  let pathname = parsedUrl.pathname;
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.replace(/\/+$/, "");
  }
  parsedUrl.pathname = pathname;

  for (const pattern of KNOWN_REDIRECT_PATTERNS) {
    if (pattern.test(pathname)) {
      return { valid: false, error: `URL '${pathname}' matches a redirected/legacy path` };
    }
  }

  if (/\.(js|css|map|png|jpg|jpeg|webp|svg|ico|txt|json|xml)$/i.test(pathname)) {
    return { valid: false, error: `Static asset file path not eligible: ${pathname}` };
  }

  return { valid: true, normalizedUrl: parsedUrl.origin + parsedUrl.pathname };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // 1. Enforce POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method Not Allowed. Use HTTP POST to submit URLs to IndexNow.",
    });
  }

  // 2. Authentication Check
  const expectedSecret = process.env.INDEXNOW_SECRET;
  if (!expectedSecret) {
    return res.status(503).json({
      error:
        "Service Unavailable: INDEXNOW_SECRET server-side environment variable is not configured. Configure it in Vercel project settings to enable this endpoint.",
    });
  }

  const authHeader = req.headers["authorization"] || "";
  const customHeader = req.headers["x-indexnow-secret"] || "";

  let providedSecret = "";
  if (authHeader.startsWith("Bearer ")) {
    providedSecret = authHeader.slice(7).trim();
  } else if (customHeader) {
    providedSecret = String(customHeader).trim();
  }

  if (!providedSecret || providedSecret !== expectedSecret) {
    return res.status(401).json({
      error: "Unauthorized: Invalid or missing IndexNow authorization secret token.",
    });
  }

  // 3. Resolve and validate IndexNow API key
  const key = resolveKey();
  if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
    return res.status(500).json({
      error: "Server configuration error: IndexNow key is missing or invalid on the host.",
    });
  }

  // 4. Parse and validate payload
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON request body." });
    }
  }

  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Request body must be a JSON object." });
  }

  const rawList = body.urls || body.urlList;
  if (!Array.isArray(rawList) || rawList.length === 0) {
    return res.status(400).json({
      error: "Request must include a non-empty 'urls' or 'urlList' array.",
    });
  }

  if (rawList.length > 1000) {
    return res.status(413).json({
      error: "Payload too large. Maximum 1,000 URLs per request.",
    });
  }

  // 5. Normalize and filter URLs
  const validSet = new Set();
  const rejected = [];

  for (const item of rawList) {
    const check = validateAndNormalizeUrl(item);
    if (check.valid) {
      validSet.add(check.normalizedUrl);
    } else {
      rejected.push({ input: item, reason: check.error });
    }
  }

  const validUrls = Array.from(validSet);
  if (validUrls.length === 0) {
    return res.status(422).json({
      error: "No valid indexable canonical URLs found in payload.",
      rejected,
    });
  }

  // 6. Submit to IndexNow
  const payload = {
    host: CANONICAL_HOST,
    key,
    keyLocation: KEY_LOCATION,
    urlList: validUrls,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const apiRes = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "NebulaSafeTech-IndexNow-Bot/1.0",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const status = apiRes.status;
    const text = await apiRes.text();

    if (status === 200 || status === 202) {
      return res.status(200).json({
        success: true,
        message: status === 202 ? "Accepted (Key validation pending)" : "OK (Submitted)",
        submittedCount: validUrls.length,
        urls: validUrls,
        rejected,
        indexnowStatus: status,
      });
    }

    return res.status(502).json({
      error: `IndexNow API returned status HTTP ${status}`,
      details: text.slice(0, 200),
      submittedCount: 0,
      indexnowStatus: status,
    });
  } catch (err) {
    return res.status(504).json({
      error: `IndexNow submission failed: ${err.message}`,
    });
  }
}
