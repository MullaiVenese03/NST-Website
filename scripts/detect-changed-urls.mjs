#!/usr/bin/env node
/**
 * scripts/detect-changed-urls.mjs
 *
 * Inspects Git changes between revisions (or a supplied file list) and maps
 * modified/added source files to their canonical production URLs for IndexNow.
 *
 * Rules:
 *  - Canonical host: https://www.nebulasafetech.com
 *  - Deleted files (status 'D') are safely skipped (never submitted as live pages).
 *  - Redirects like /clients -> /testimonials and /blog/{slug} -> /blogs/{slug}
 *    are resolved to canonical URLs.
 *  - Unrelated files (CSS, components, assets, config) are skipped.
 *  - Duplicates are strictly prevented.
 *
 * Usage:
 *   node scripts/detect-changed-urls.mjs --base <sha> --head <sha>
 *   node scripts/detect-changed-urls.mjs --files "src/app/data/blogs/sample.ts,src/app/pages/AboutPage.tsx"
 *   node scripts/detect-changed-urls.mjs --output .indexnow-urls.txt
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const CANONICAL_HOST = "www.nebulasafetech.com";
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Extracts the blog slug from a blog data file's content.
 */
export function extractSlugFromContent(content) {
  if (!content) return null;
  // 1. Direct property match: slug: "example-slug"
  const directMatch = content.match(/slug:\s*["']([^"']+)["']/);
  if (directMatch && directMatch[1] && directMatch[1] !== "SLUG") {
    return directMatch[1].trim();
  }
  // 2. Constant definition match: const SLUG = "example-slug"
  const constMatch = content.match(/(?:const|let|var)\s+(?:SLUG|slug)\s*=\s*["']([^"']+)["']/);
  if (constMatch && constMatch[1]) {
    return constMatch[1].trim();
  }
  return null;
}

/**
 * Maps a single repository file and change status to canonical production URLs.
 *
 * @param {string} filePath Relative path from repo root
 * @param {string} status Git status ('A', 'M', 'D', 'R', etc.)
 * @param {string} rootDir Base repository path
 * @returns {string[]} Array of canonical URLs
 */
export function mapFileToCanonicalUrls(filePath, status = "M", rootDir = root) {
  const normPath = filePath.replace(/\\/g, "/").trim();

  // Rule: Deleted files must never be submitted as live URLs
  if (status.toUpperCase().startsWith("D")) {
    return [];
  }

  // 1. Individual Blog Articles: src/app/data/blogs/*.ts
  if (normPath.startsWith("src/app/data/blogs/") && normPath.endsWith(".ts")) {
    const fullPath = path.join(rootDir, normPath);
    if (!existsSync(fullPath)) return [];
    try {
      const content = readFileSync(fullPath, "utf-8");
      const slug = extractSlugFromContent(content);
      if (slug) {
        return [`${CANONICAL_ORIGIN}/blogs/${slug}`];
      }
    } catch {
      return [];
    }
    return [];
  }

  // 2. Blog Data Aggregator: src/app/data/blogsData.ts
  if (normPath === "src/app/data/blogsData.ts") {
    // If blogsData.ts changed, we inspect it or map to /blogs directory
    return [`${CANONICAL_ORIGIN}/blogs`];
  }

  // 3. Static Pages
  const STATIC_PAGE_MAP = {
    "src/app/pages/HomePage.tsx": `${CANONICAL_ORIGIN}/`,
    "src/app/pages/AboutPage.tsx": `${CANONICAL_ORIGIN}/about`,
    "src/app/pages/ServicesPage.tsx": `${CANONICAL_ORIGIN}/services`,
    "src/app/pages/EdTechPage.tsx": `${CANONICAL_ORIGIN}/edtech`,
    "src/app/pages/BlogsPage.tsx": `${CANONICAL_ORIGIN}/blogs`,
    "src/app/pages/PrivacyPolicyPage.tsx": `${CANONICAL_ORIGIN}/privacy-policy`,
    "src/app/pages/TermsAndConditionsPage.tsx": `${CANONICAL_ORIGIN}/terms-and-conditions`,
    // Testimonials / Clients migration: canonical URL is /testimonials, never /clients
    "src/app/pages/ClientsPage.tsx": `${CANONICAL_ORIGIN}/testimonials`,
    "src/app/data/clientsData.ts": `${CANONICAL_ORIGIN}/testimonials`,
  };

  if (STATIC_PAGE_MAP[normPath]) {
    return [STATIC_PAGE_MAP[normPath]];
  }

  // 4. Service Detail Pages
  if (
    normPath === "src/app/pages/ServiceDetailPage.tsx" ||
    normPath === "src/app/data/serviceDetailContent.ts"
  ) {
    return [
      `${CANONICAL_ORIGIN}/services/web-development`,
      `${CANONICAL_ORIGIN}/services/cybersecurity`,
      `${CANONICAL_ORIGIN}/services/ui-ux-design`,
    ];
  }

  // 5. Sitemap Changes (public/sitemap.xml)
  if (normPath === "public/sitemap.xml") {
    // If sitemap was edited directly, read locs from it
    const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
    if (existsSync(sitemapPath)) {
      try {
        const content = readFileSync(sitemapPath, "utf-8");
        const matches = Array.from(content.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
        return matches;
      } catch {
        return [];
      }
    }
  }

  // Unrelated files (CSS, components, assets, configs, build scripts)
  return [];
}

/**
 * Normalizes and validates a URL to ensure it matches the canonical format.
 */
export function normalizeCanonicalUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  let url = rawUrl.trim();

  // If path provided, prepend canonical origin
  if (url.startsWith("/")) {
    url = `${CANONICAL_ORIGIN}${url}`;
  }

  try {
    const parsed = new URL(url);
    // Must match canonical hostname
    if (parsed.hostname !== CANONICAL_HOST) {
      return null;
    }
    // Must be HTTPS
    if (parsed.protocol !== "https:") {
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

    // Strip trailing slashes except for root
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    return `${CANONICAL_ORIGIN}${pathname}`;
  } catch {
    return null;
  }
}

/**
 * Executes a git diff to get changed files and statuses between two refs.
 */
export function getChangedFilesFromGit(baseRef, headRef, rootDir = root) {
  // If baseRef is all zeros (initial commit or fresh branch) or missing, fallback
  const isZeroSha = !baseRef || /^0+$/.test(baseRef);
  let command = "git diff --name-status HEAD~1 HEAD";

  if (!isZeroSha && baseRef && headRef) {
    try {
      // Verify baseRef exists in git history
      execSync(`git rev-parse --verify ${baseRef}^{commit}`, { cwd: rootDir, stdio: "ignore" });
      command = `git diff --name-status ${baseRef} ${headRef}`;
    } catch {
      console.warn(`[detect-changed-urls] Base ref '${baseRef}' not found in history. Falling back to HEAD~1.`);
      command = "git diff --name-status HEAD~1 HEAD";
    }
  }

  try {
    const stdout = execSync(command, { cwd: rootDir, encoding: "utf-8" }).trim();
    if (!stdout) return [];
    return stdout
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(/\s+/);
        const status = parts[0];
        const filePath = parts[parts.length - 1]; // Handles renames where format is 'R100 oldPath newPath'
        return { status, filePath };
      });
  } catch (err) {
    console.warn(`[detect-changed-urls] Git command failed (${command}): ${err.message}. Checking working tree.`);
    try {
      const statusOut = execSync("git status --porcelain", { cwd: rootDir, encoding: "utf-8" }).trim();
      if (!statusOut) return [];
      return statusOut
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const status = line.slice(0, 2).trim();
          const filePath = line.slice(2).trim();
          return { status, filePath };
        });
    } catch {
      return [];
    }
  }
}

/**
 * Main detection routine.
 */
export function detectChangedUrls({ base, head, files, rootDir = root } = {}) {
  let fileEntries = [];

  if (files) {
    // files can be passed as a comma-separated or space-separated list of file paths
    const list = Array.isArray(files) ? files : files.split(/[\s,]+/).filter(Boolean);
    fileEntries = list.map((f) => {
      // Check if format is STATUS:path or just path
      if (f.includes(":")) {
        const [status, filePath] = f.split(":");
        return { status, filePath };
      }
      return { status: "M", filePath: f };
    });
  } else {
    fileEntries = getChangedFilesFromGit(base, head, rootDir);
  }

  const detectedUrls = new Set();
  const skippedFiles = [];
  const mappedFiles = [];

  for (const { status, filePath } of fileEntries) {
    if (!filePath) continue;
    const urls = mapFileToCanonicalUrls(filePath, status, rootDir);
    if (urls.length > 0) {
      mappedFiles.push({ filePath, status, urls });
      for (const u of urls) {
        const normalized = normalizeCanonicalUrl(u);
        if (normalized) {
          detectedUrls.add(normalized);
        }
      }
    } else {
      skippedFiles.push({ filePath, status });
    }
  }

  return {
    urls: Array.from(detectedUrls),
    mappedFiles,
    skippedFiles,
    totalFilesChecked: fileEntries.length,
  };
}

// ---------------------------------------------------------------------------
// CLI Execution
// ---------------------------------------------------------------------------
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  const args = process.argv.slice(2);
  let base = null;
  let head = null;
  let filesArg = null;
  let outputFile = null;
  let jsonOutput = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--base" && args[i + 1]) base = args[++i];
    else if (args[i] === "--head" && args[i + 1]) head = args[++i];
    else if (args[i] === "--files" && args[i + 1]) filesArg = args[++i];
    else if (args[i] === "--output" && args[i + 1]) outputFile = args[++i];
    else if (args[i] === "--json") jsonOutput = true;
    else if (args[i] === "--help" || args[i] === "-h") {
      console.log(`
Usage:
  node scripts/detect-changed-urls.mjs [options]

Options:
  --base <ref>       Git base revision (default: HEAD~1)
  --head <ref>       Git head revision (default: HEAD)
  --files <list>     Explicit comma/space-separated list of files to map
  --output <file>    Write detected URLs to file (one per line)
  --json             Print output as JSON
  --help, -h         Show this message
`);
      process.exit(0);
    }
  }

  // Handle environment variable MANUAL_URLS if passed in CI
  const manualUrlsEnv = process.env.MANUAL_URLS ? process.env.MANUAL_URLS.trim() : "";

  console.log("===============================================================");
  console.log("🔍 INDEXNOW CHANGED URL DETECTION");
  console.log("===============================================================");

  const result = detectChangedUrls({ base, head, files: filesArg, rootDir: root });

  // If manual URLs were supplied, include and normalize them
  if (manualUrlsEnv) {
    console.log(`[detect-changed-urls] Including manually provided URLs: ${manualUrlsEnv}`);
    const manualList = manualUrlsEnv.split(/[\s,]+/).filter(Boolean);
    for (const raw of manualList) {
      const norm = normalizeCanonicalUrl(raw);
      if (norm && !result.urls.includes(norm)) {
        result.urls.push(norm);
      }
    }
  }

  console.log(`Total files examined : ${result.totalFilesChecked}`);
  console.log(`Mapped relevant files: ${result.mappedFiles.length}`);
  console.log(`Skipped files        : ${result.skippedFiles.length}`);
  console.log(`Detected URLs count  : ${result.urls.length}`);

  if (result.mappedFiles.length > 0) {
    console.log("\n--- MAPPED FILES ---");
    for (const m of result.mappedFiles) {
      console.log(`  [${m.status}] ${m.filePath} -> ${m.urls.join(", ")}`);
    }
  }

  if (result.skippedFiles.length > 0) {
    console.log(`\n--- SKIPPED FILES (${result.skippedFiles.length}) ---`);
    for (const s of result.skippedFiles.slice(0, 10)) {
      console.log(`  [${s.status}] ${s.filePath} (non-content or deleted)`);
    }
    if (result.skippedFiles.length > 10) {
      console.log(`  ... and ${result.skippedFiles.length - 10} more`);
    }
  }

  console.log("\n--- CANONICAL URLS FOR SUBMISSION ---");
  if (result.urls.length === 0) {
    console.log("  (None detected - no relevant public page or blog changes)");
  } else {
    for (const url of result.urls) {
      console.log(`  • ${url}`);
    }
  }

  if (outputFile) {
    const outPath = path.isAbsolute(outputFile) ? outputFile : path.join(root, outputFile);
    writeFileSync(outPath, result.urls.join("\n"), "utf-8");
    console.log(`\nWrote ${result.urls.length} URL(s) to ${outPath}`);
  }

  if (jsonOutput) {
    console.log("\nJSON Output:");
    console.log(JSON.stringify(result.urls, null, 2));
  }
}
