#!/usr/bin/env node
/**
 * scripts/test-indexnow-automation.mjs
 *
 * Automated test suite for the IndexNow submission integration.
 * Tests:
 *   1. Verification file presence & key resolution
 *   2. File-to-canonical URL mapping for blogs, pages, services, testimonials
 *   3. Safe handling of deleted files (never submitted as live pages)
 *   4. Safe resolution of legacy redirects (/clients -> /testimonials, /blog/* -> /blogs/*)
 *   5. Filtering of unrelated files (CSS, components, assets, configs)
 *   6. Canonical hostname enforcement and rejection of external hosts
 *   7. Duplicate URL filtering
 *   8. Dry-run and mock HTTP submission handling
 *   9. Live production endpoint checks
 */
import assert from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  detectChangedUrls,
  mapFileToCanonicalUrls,
  normalizeCanonicalUrl,
  extractSlugFromContent,
  CANONICAL_HOST,
  CANONICAL_ORIGIN,
} from "./detect-changed-urls.mjs";

import {
  resolveIndexNowKey,
  validateAndNormalizeUrl,
  submitUrlsToIndexNow,
  verifyUrlsLive,
  KEY_FILE,
} from "./submit-indexnow.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXPECTED_KEY = "0138bf1db8ee4112916efd593da4e115";

let passedCount = 0;
let failedCount = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${description}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${description}`);
    console.error(`     Error: ${err.message}`);
    failedCount++;
  }
}

async function asyncTest(description, fn) {
  try {
    await fn();
    console.log(`  ✅ [PASS] ${description}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${description}`);
    console.error(`     Error: ${err.message}`);
    failedCount++;
  }
}

async function runAllTests() {
  console.log("===============================================================");
  console.log("🧪 RUNNING INDEXNOW AUTOMATION & URL MAPPING TEST SUITE");
  console.log("===============================================================");

  // -------------------------------------------------------------------------
  // 1. KEY RESOLUTION & VERIFICATION FILE INTEGRITY
  // -------------------------------------------------------------------------
  console.log("\n--- 1. KEY FILE & RESOLUTION INTEGRITY ---");
  test("Verification file public/0138bf1db8ee4112916efd593da4e115.txt exists", () => {
    const keyPath = path.join(root, "public", KEY_FILE);
    assert(existsSync(keyPath), "Key file must exist");
  });

  test("Verification file contains correct key", () => {
    const keyPath = path.join(root, "public", KEY_FILE);
    const content = readFileSync(keyPath, "utf-8").trim();
    assert.strictEqual(content, EXPECTED_KEY);
  });

  test("resolveIndexNowKey resolves key from file", () => {
    const resolved = resolveIndexNowKey();
    assert.strictEqual(resolved, EXPECTED_KEY);
  });

  test("resolveIndexNowKey honors explicit key parameter", () => {
    const custom = "custom-test-key-123456789";
    const resolved = resolveIndexNowKey(custom);
    assert.strictEqual(resolved, custom);
  });

  // -------------------------------------------------------------------------
  // 2. BLOG CONTENT & SLUG EXTRACTION
  // -------------------------------------------------------------------------
  console.log("\n--- 2. BLOG SLUG EXTRACTION & MAPPING ---");
  test("Extracts slug from direct property (slug: 'example')", () => {
    const sample = `export const post = { slug: "my-test-article", title: "Test" };`;
    assert.strictEqual(extractSlugFromContent(sample), "my-test-article");
  });

  test("Extracts slug from constant definition (const SLUG = 'example')", () => {
    const sample = `const SLUG = "ransomware-data-theft-protect-business-2026";\nexport const post = { slug: SLUG };`;
    assert.strictEqual(extractSlugFromContent(sample), "ransomware-data-theft-protect-business-2026");
  });

  test("Maps all 13 real blog files in src/app/data/blogs/ to canonical URLs", () => {
    const sampleBlog1 = "src/app/data/blogs/aiAgentAttackSurface2026.ts";
    const sampleBlog2 = "src/app/data/blogs/ransomwareDataProtection.ts";

    const urls1 = mapFileToCanonicalUrls(sampleBlog1, "M", root);
    const urls2 = mapFileToCanonicalUrls(sampleBlog2, "M", root);

    assert.strictEqual(urls1.length, 1);
    assert.strictEqual(
      urls1[0],
      `${CANONICAL_ORIGIN}/blogs/ai-agent-attack-surface-security-checklist-2026`
    );

    assert.strictEqual(urls2.length, 1);
    assert.strictEqual(
      urls2[0],
      `${CANONICAL_ORIGIN}/blogs/ransomware-data-theft-protect-business-2026`
    );
  });

  test("Maps src/app/data/blogsData.ts to /blogs canonical index", () => {
    const urls = mapFileToCanonicalUrls("src/app/data/blogsData.ts", "M", root);
    assert.deepStrictEqual(urls, [`${CANONICAL_ORIGIN}/blogs`]);
  });

  // -------------------------------------------------------------------------
  // 3. STATIC PAGES & REDIRECT RESOLUTION
  // -------------------------------------------------------------------------
  console.log("\n--- 3. STATIC PAGES & CANONICAL PATH MAPPING ---");
  test("Maps HomePage.tsx to root /", () => {
    const urls = mapFileToCanonicalUrls("src/app/pages/HomePage.tsx", "M", root);
    assert.deepStrictEqual(urls, [`${CANONICAL_ORIGIN}/`]);
  });

  test("Maps AboutPage.tsx to /about", () => {
    const urls = mapFileToCanonicalUrls("src/app/pages/AboutPage.tsx", "M", root);
    assert.deepStrictEqual(urls, [`${CANONICAL_ORIGIN}/about`]);
  });

  test("Maps ServicesPage.tsx to /services", () => {
    const urls = mapFileToCanonicalUrls("src/app/pages/ServicesPage.tsx", "M", root);
    assert.deepStrictEqual(urls, [`${CANONICAL_ORIGIN}/services`]);
  });

  test("Maps ClientsPage.tsx to /testimonials (canonical, avoiding legacy /clients redirect)", () => {
    const urls = mapFileToCanonicalUrls("src/app/pages/ClientsPage.tsx", "M", root);
    assert.deepStrictEqual(urls, [`${CANONICAL_ORIGIN}/testimonials`]);
  });

  test("Maps clientsData.ts to /testimonials", () => {
    const urls = mapFileToCanonicalUrls("src/app/data/clientsData.ts", "M", root);
    assert.deepStrictEqual(urls, [`${CANONICAL_ORIGIN}/testimonials`]);
  });

  test("Maps serviceDetailContent.ts to 3 canonical service endpoints", () => {
    const urls = mapFileToCanonicalUrls("src/app/data/serviceDetailContent.ts", "M", root);
    assert.strictEqual(urls.length, 3);
    assert(urls.includes(`${CANONICAL_ORIGIN}/services/web-development`));
    assert(urls.includes(`${CANONICAL_ORIGIN}/services/cybersecurity`));
    assert(urls.includes(`${CANONICAL_ORIGIN}/services/ui-ux-design`));
  });

  // -------------------------------------------------------------------------
  // 4. DELETED FILES SAFETY
  // -------------------------------------------------------------------------
  console.log("\n--- 4. SAFE HANDLING OF DELETED FILES ---");
  test("Deleted blog post (status D) returns 0 URLs", () => {
    const urls = mapFileToCanonicalUrls("src/app/data/blogs/aiAgentAttackSurface2026.ts", "D", root);
    assert.strictEqual(urls.length, 0);
  });

  test("Deleted page file (status D) returns 0 URLs", () => {
    const urls = mapFileToCanonicalUrls("src/app/pages/AboutPage.tsx", "D", root);
    assert.strictEqual(urls.length, 0);
  });

  test("detectChangedUrls ignores deleted files and reports 0 URLs", () => {
    const result = detectChangedUrls({
      files: ["D:src/app/data/blogs/aiAgentAttackSurface2026.ts", "D:src/app/pages/HomePage.tsx"],
      rootDir: root,
    });
    assert.strictEqual(result.urls.length, 0);
    assert.strictEqual(result.skippedFiles.length, 2);
  });

  // -------------------------------------------------------------------------
  // 5. UNRELATED CODE CHANGES FILTERING
  // -------------------------------------------------------------------------
  console.log("\n--- 5. FILTERING OF UNRELATED FILES ---");
  test("CSS-only change returns 0 URLs", () => {
    const result = detectChangedUrls({
      files: ["src/styles/index.css", "src/styles/tailwind.css"],
      rootDir: root,
    });
    assert.strictEqual(result.urls.length, 0);
    assert.strictEqual(result.skippedFiles.length, 2);
  });

  test("Documentation, config, and component changes return 0 URLs", () => {
    const result = detectChangedUrls({
      files: [
        "README.md",
        "package.json",
        "vite.config.ts",
        "src/app/components/HeroParallax.tsx",
        "src/app/components/Header.tsx",
      ],
      rootDir: root,
    });
    assert.strictEqual(result.urls.length, 0);
    assert.strictEqual(result.skippedFiles.length, 5);
  });

  // -------------------------------------------------------------------------
  // 6. CANONICAL HOSTNAME & URL NORMALIZATION
  // -------------------------------------------------------------------------
  console.log("\n--- 6. CANONICAL HOSTNAME & URL NORMALIZATION ---");
  test("Normalizes relative paths to canonical origin", () => {
    const norm = normalizeCanonicalUrl("/about");
    assert.strictEqual(norm, `${CANONICAL_ORIGIN}/about`);
  });

  test("Strips trailing slash except for root", () => {
    assert.strictEqual(normalizeCanonicalUrl("/about/"), `${CANONICAL_ORIGIN}/about`);
    assert.strictEqual(normalizeCanonicalUrl("/"), `${CANONICAL_ORIGIN}/`);
  });

  test("Resolves legacy /clients to /testimonials", () => {
    assert.strictEqual(normalizeCanonicalUrl("/clients"), `${CANONICAL_ORIGIN}/testimonials`);
    assert.strictEqual(normalizeCanonicalUrl("https://www.nebulasafetech.com/clients/"), `${CANONICAL_ORIGIN}/testimonials`);
  });

  test("Resolves legacy /blog/slug to /blogs/slug", () => {
    assert.strictEqual(
      normalizeCanonicalUrl("/blog/test-slug"),
      `${CANONICAL_ORIGIN}/blogs/test-slug`
    );
  });

  test("Rejects external hostname (e.g., evil.com or google.com)", () => {
    assert.strictEqual(normalizeCanonicalUrl("https://google.com/search"), null);
    assert.strictEqual(normalizeCanonicalUrl("https://evil.com/phishing"), null);
    assert.strictEqual(validateAndNormalizeUrl("https://google.com"), null);
  });

  test("Rejects non-HTTPS protocol", () => {
    assert.strictEqual(normalizeCanonicalUrl("http://www.nebulasafetech.com/about"), null);
    assert.strictEqual(validateAndNormalizeUrl("http://www.nebulasafetech.com/about"), null);
  });

  // -------------------------------------------------------------------------
  // 7. DUPLICATE URL DEDUPLICATION
  // -------------------------------------------------------------------------
  console.log("\n--- 7. DUPLICATE URL FILTERING ---");
  test("Deduplicates multiple files mapping to same page", () => {
    const result = detectChangedUrls({
      files: ["src/app/pages/ClientsPage.tsx", "src/app/data/clientsData.ts"],
      rootDir: root,
    });
    assert.strictEqual(result.urls.length, 1);
    assert.strictEqual(result.urls[0], `${CANONICAL_ORIGIN}/testimonials`);
  });

  // -------------------------------------------------------------------------
  // 8. DRY RUN & SUBMISSION PAYLOAD INTEGRITY
  // -------------------------------------------------------------------------
  console.log("\n--- 8. DRY-RUN & SUBMISSION PAYLOAD ---");
  await asyncTest("Dry-run succeeds without network calls", async () => {
    const result = await submitUrlsToIndexNow({
      urls: [`${CANONICAL_ORIGIN}/about`],
      key: EXPECTED_KEY,
      dryRun: true,
      logger: { log: () => {}, warn: () => {}, error: () => {} },
    });
    assert.strictEqual(result.ok, true);
    assert.strictEqual(result.dryRun, true);
    assert.strictEqual(result.count, 1);
  });

  await asyncTest("Empty URL list returns ok=true with count=0", async () => {
    const result = await submitUrlsToIndexNow({
      urls: [],
      key: EXPECTED_KEY,
      logger: { log: () => {}, warn: () => {}, error: () => {} },
    });
    assert.strictEqual(result.ok, true);
    assert.strictEqual(result.count, 0);
  });

  await asyncTest("Handles HTTP 200 and HTTP 202 mock responses as success", async () => {
    const mock200Fetch = async () => ({ status: 200, text: async () => "OK" });
    const res200 = await submitUrlsToIndexNow({
      urls: [`${CANONICAL_ORIGIN}/about`],
      key: EXPECTED_KEY,
      fetchFn: mock200Fetch,
      logger: { log: () => {}, warn: () => {}, error: () => {} },
    });
    assert.strictEqual(res200.ok, true);
    assert.strictEqual(res200.status, 200);

    const mock202Fetch = async () => ({ status: 202, text: async () => "Accepted" });
    const res202 = await submitUrlsToIndexNow({
      urls: [`${CANONICAL_ORIGIN}/about`],
      key: EXPECTED_KEY,
      fetchFn: mock202Fetch,
      logger: { log: () => {}, warn: () => {}, error: () => {} },
    });
    assert.strictEqual(res202.ok, true);
    assert.strictEqual(res202.status, 202);
  });

  await asyncTest("Handles HTTP 400 and 403 responses as failure", async () => {
    const mock403Fetch = async () => ({ status: 403, text: async () => "Forbidden" });
    const res403 = await submitUrlsToIndexNow({
      urls: [`${CANONICAL_ORIGIN}/about`],
      key: EXPECTED_KEY,
      fetchFn: mock403Fetch,
      logger: { log: () => {}, warn: () => {}, error: () => {} },
    });
    assert.strictEqual(res403.ok, false);
    assert.strictEqual(res403.status, 403);
  });

  // -------------------------------------------------------------------------
  // 9. REMOTE PRODUCTION CHECKS
  // -------------------------------------------------------------------------
  console.log("\n--- 9. LIVE PRODUCTION CHECKS ---");
  await asyncTest("Live key file is accessible on production", async () => {
    const res = await fetch(`${CANONICAL_ORIGIN}/${KEY_FILE}`);
    assert.strictEqual(res.status, 200);
    const text = (await res.text()).trim();
    assert.strictEqual(text, EXPECTED_KEY);
  });

  // -------------------------------------------------------------------------
  // SUMMARY REPORT
  // -------------------------------------------------------------------------
  console.log("\n===============================================================");
  console.log("📊 TEST SUMMARY REPORT");
  console.log("===============================================================");
  console.log(`Total tests run: ${passedCount + failedCount}`);
  console.log(`Passed         : ${passedCount}`);
  console.log(`Failed         : ${failedCount}`);

  if (failedCount > 0) {
    console.error("\n❌ TEST SUITE FAILED.");
    process.exit(1);
  } else {
    console.log("\n✨ ALL INDEXNOW AUTOMATION TESTS PASSED COMPLETELY! ✨\n");
  }
}

runAllTests().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
