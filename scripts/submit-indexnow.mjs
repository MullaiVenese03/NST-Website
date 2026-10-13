#!/usr/bin/env node
/**
 * scripts/submit-indexnow.mjs
 *
 * Command-line tool to submit changed, new, or specified canonical URLs
 * from NebulaSafeTech to the IndexNow protocol (Bing, Yandex, Seznam, Naver, etc.).
 *
 * Usage Examples:
 *   node scripts/submit-indexnow.mjs                   # Auto-detect changes from git HEAD~1
 *   node scripts/submit-indexnow.mjs --since HEAD~2   # Detect changes across last 2 commits
 *   node scripts/submit-indexnow.mjs --url /about     # Submit specific route
 *   node scripts/submit-indexnow.mjs /blogs/post-slug # Positional URL argument
 *   node scripts/submit-indexnow.mjs --all            # Submit all indexable sitemap URLs
 *   node scripts/submit-indexnow.mjs --dry-run        # Preview submission payload without sending
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CANONICAL_ORIGIN,
  KEY_FILENAME,
  KEY_LOCATION,
  resolveIndexNowKey,
  submitToIndexNow,
  detectChangedUrlsFromGit,
  maskKey,
} from "./indexnow-core.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function printHelp() {
  console.log(`
NebulaSafeTech - IndexNow URL Submission CLI

Options:
  --since <commit>    Detect changes from specified commit (default: HEAD~1)
  --git-diff          Explicitly run git change detection
  --url <url>         Submit a specific URL or path (can specify multiple times)
  --all               Submit all 25 indexable URLs from public/sitemap.xml
  --dry-run           Inspect normalized payload without dispatching HTTP requests
  --key <key>         Override IndexNow key
  --help, -h          Show this help message

Positional Arguments:
  Any paths or URLs passed as arguments will be validated and submitted:
  e.g. node scripts/submit-indexnow.mjs /blogs/my-post /services/cybersecurity
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  const dryRun = args.includes("--dry-run");
  const submitAll = args.includes("--all");

  let keyOverride = null;
  const keyIdx = args.indexOf("--key");
  if (keyIdx !== -1 && args[keyIdx + 1]) {
    keyOverride = args[keyIdx + 1];
  }

  let sinceCommit = "HEAD~1";
  const sinceIdx = args.indexOf("--since");
  if (sinceIdx !== -1 && args[sinceIdx + 1]) {
    sinceCommit = args[sinceIdx + 1];
  }

  // Parse explicit URLs from --url flags and positional non-flag arguments
  const explicitUrls = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--url" && args[i + 1]) {
      explicitUrls.push(args[i + 1]);
      i++;
    } else if (!arg.startsWith("--") && (arg.startsWith("/") || arg.startsWith("http"))) {
      explicitUrls.push(arg);
    }
  }

  // 1. Resolve IndexNow Key
  let key;
  try {
    key = resolveIndexNowKey({ key: keyOverride }, root);
    console.log(`[IndexNow] Key loaded: ${maskKey(key)} (verification location: ${KEY_LOCATION})`);
  } catch (err) {
    console.error(`[IndexNow Error] ${err.message}`);
    process.exit(1);
  }

  // 2. Discover URLs to submit
  let urlsToSubmit = [];

  if (submitAll) {
    console.log("[IndexNow] Mode: Submit ALL active sitemap URLs.");
    const sitemapPath = path.join(root, "public", "sitemap.xml");
    if (!existsSync(sitemapPath)) {
      console.error(`[IndexNow Error] Sitemap file not found at ${sitemapPath}`);
      process.exit(1);
    }
    const sitemapXml = readFileSync(sitemapPath, "utf-8");
    const matches = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
    urlsToSubmit = matches;
    console.log(`[IndexNow] Discovered ${urlsToSubmit.length} URLs from sitemap.xml.`);
  } else if (explicitUrls.length > 0) {
    console.log(`[IndexNow] Mode: Explicit URLs (${explicitUrls.length} provided).`);
    urlsToSubmit = explicitUrls;
  } else {
    console.log(`[IndexNow] Mode: Auto Git Change Detection (comparing ${sinceCommit}..HEAD)...`);
    const diffResult = detectChangedUrlsFromGit({
      baseCommit: sinceCommit,
      headCommit: "HEAD",
      rootDir: root,
    });

    if (diffResult.error) {
      console.warn(`[IndexNow Warning] ${diffResult.error}`);
    }

    const combined = [...diffResult.changedUrls, ...diffResult.deletedUrls];

    if (combined.length === 0) {
      console.log(`[IndexNow] No indexable pages or blog posts were modified in ${sinceCommit}..HEAD.`);
      console.log("[IndexNow] Skipping submission (clean no-op).");
      process.exit(0);
    }

    console.log(`[IndexNow] Detected ${combined.length} changed/published/deleted indexable URL(s):`);
    for (const d of diffResult.details) {
      console.log(`  - [${d.status}] ${d.file} -> ${d.url}`);
    }

    urlsToSubmit = combined;
  }

  // 3. Dispatch Submission
  console.log(`\n[IndexNow] Starting submission for ${urlsToSubmit.length} URL(s)...${dryRun ? " [DRY-RUN]" : ""}`);

  const result = await submitToIndexNow({
    key,
    urls: urlsToSubmit,
    keyLocation: KEY_LOCATION,
    dryRun,
    logger: console,
  });

  console.log("\n=======================================================");
  console.log("📊 INDEXNOW SUBMISSION REPORT");
  console.log("=======================================================");
  console.log(`Status            : ${result.success ? "SUCCESS" : "FAILED"}`);
  console.log(`Submitted URLs    : ${result.submittedCount}`);
  console.log(`Batches Processed : ${result.batchesCount}`);
  console.log(`Rejected URLs     : ${result.rejected.length}`);

  if (result.rejected.length > 0) {
    console.log("\nRejected URLs Breakdown:");
    for (const r of result.rejected) {
      console.log(`  ❌ ${r.input}: ${r.reason}`);
    }
  }

  if (result.results.length > 0) {
    console.log("\nBatch Results Breakdown:");
    for (const b of result.results) {
      console.log(`  Batch #${b.batchIndex + 1} (${b.count} URLs): HTTP ${b.status || "ERR"} - ${b.ok ? "OK" : b.error}`);
      for (const u of b.urls) {
        console.log(`    ↳ ${u}`);
      }
    }
  }

  if (!result.success) {
    console.error("\n❌ IndexNow submission encountered errors.");
    process.exit(1);
  }

  console.log("\n✨ IndexNow notification completed successfully! ✨");
  console.log("Note: Participating search engines (Bing, Yandex, etc.) schedule crawling independently.");
}

main().catch((err) => {
  console.error("[Fatal Error]", err);
  process.exit(1);
});
