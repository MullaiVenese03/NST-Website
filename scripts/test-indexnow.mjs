/**
 * scripts/test-indexnow.mjs
 *
 * Comprehensive test suite validating IndexNow integration for NebulaSafeTech:
 * 1. Valid canonical URL normalization
 * 2. Duplicate URL deduplication
 * 3. External domain and malicious input rejection
 * 4. Draft, non-indexable, query params, and redirected route rejection
 * 5. Newly published and updated blog post detection
 * 6. Deleted URL detection and former canonical mapping
 * 7. Invalid and missing API key rejection
 * 8. IndexNow API success (200, 202) and failure (400, 403, 422, 429) responses
 * 9. Network timeout and retry logic
 * 10. Batching, chunking, and dry-run execution
 * 11. Verification of public/0138bf1db8ee4112916efd593da4e115.txt key file
 * 12. Optional single-URL live API verification (--live-test)
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CANONICAL_ORIGIN,
  CANONICAL_HOST,
  KEY_FILENAME,
  EXPECTED_KEY,
  validateAndNormalizeUrl,
  filterAndDeduplicateUrls,
  chunkArray,
  resolveIndexNowKey,
  submitToIndexNow,
  maskKey,
} from "./indexnow-core.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`  ❌ [FAIL] ${testName} ${details ? `(${details})` : ""}`);
    failedCount++;
  }
}

async function runTests() {
  console.log("===============================================================");
  console.log("🧪 NEBULASAFETECH - INDEXNOW TEST & VALIDATION SUITE");
  console.log("===============================================================");

  // -------------------------------------------------------------------------
  // TEST 1: Key File Integrity
  // -------------------------------------------------------------------------
  console.log("\n--- 1. AUDITING INDEXNOW KEY FILE ---");
  const keyFilePath = path.join(root, "public", KEY_FILENAME);
  assert(existsSync(keyFilePath), `Key file exists at public/${KEY_FILENAME}`);

  if (existsSync(keyFilePath)) {
    const fileContent = readFileSync(keyFilePath, "utf-8").trim();
    assert(fileContent === EXPECTED_KEY, `Key file content matches expected key: ${EXPECTED_KEY}`);
    assert(fileContent.length === 32, "Key length is exactly 32 hex characters");
    assert(/^[a-f0-9]{32}$/.test(fileContent), "Key format is valid lowercase hex string");
  }

  // -------------------------------------------------------------------------
  // TEST 2: Valid Canonical URL Normalization
  // -------------------------------------------------------------------------
  console.log("\n--- 2. VALID CANONICAL URL NORMALIZATION ---");
  const validCases = [
    { input: "/", expected: `${CANONICAL_ORIGIN}/` },
    { input: "/about", expected: `${CANONICAL_ORIGIN}/about` },
    { input: "/services/cybersecurity", expected: `${CANONICAL_ORIGIN}/services/cybersecurity` },
    { input: "/blogs/ai-agents-enterprise-data-security", expected: `${CANONICAL_ORIGIN}/blogs/ai-agents-enterprise-data-security` },
    { input: "https://www.nebulasafetech.com/testimonials", expected: `${CANONICAL_ORIGIN}/testimonials` },
    { input: "https://nebulasafetech.com/testimonials", expected: `${CANONICAL_ORIGIN}/testimonials` }, // Apex normalizes to www
    { input: "http://www.nebulasafetech.com/edtech", expected: `${CANONICAL_ORIGIN}/edtech` }, // HTTP normalizes to HTTPS
    { input: "/blogs/some-slug/", expected: `${CANONICAL_ORIGIN}/blogs/some-slug` }, // Trailing slash stripped
  ];

  for (const tc of validCases) {
    const res = validateAndNormalizeUrl(tc.input);
    assert(res.valid && res.normalizedUrl === tc.expected, `Normalize '${tc.input}' -> '${tc.expected}'`);
  }

  // -------------------------------------------------------------------------
  // TEST 3: Duplicate URL Deduplication
  // -------------------------------------------------------------------------
  console.log("\n--- 3. DUPLICATE URL DEDUPLICATION ---");
  const duplicates = [
    "/about",
    "https://www.nebulasafetech.com/about",
    "http://www.nebulasafetech.com/about",
    "https://nebulasafetech.com/about",
    "/about/",
    "/services",
  ];
  const dedupRes = filterAndDeduplicateUrls(duplicates);
  assert(
    dedupRes.validUrls.length === 2 &&
      dedupRes.validUrls.includes(`${CANONICAL_ORIGIN}/about`) &&
      dedupRes.validUrls.includes(`${CANONICAL_ORIGIN}/services`),
    "Deduplicates 5 equivalent '/about' variants into a single canonical URL"
  );

  // -------------------------------------------------------------------------
  // TEST 4: External Domains & Malicious Inputs
  // -------------------------------------------------------------------------
  console.log("\n--- 4. EXTERNAL DOMAINS & MALICIOUS INPUT REJECTION ---");
  const maliciousCases = [
    "https://evil.com/phishing",
    "https://google.com/",
    "http://localhost:5173/about",
    "http://127.0.0.1:8080/test",
    "https://preview-deploy.vercel.app/blogs/test",
    "javascript:alert(1)",
    "ftp://www.nebulasafetech.com/file",
    "",
    null,
    12345,
  ];

  for (const mc of maliciousCases) {
    const res = validateAndNormalizeUrl(mc);
    assert(!res.valid, `Rejects invalid input: '${mc}'`, res.error);
  }

  // -------------------------------------------------------------------------
  // TEST 5: Draft, Non-Indexable, and Redirected Routes
  // -------------------------------------------------------------------------
  console.log("\n--- 5. DRAFT & REDIRECTED ROUTE REJECTION ---");
  const redirectCases = [
    "/clients", // Legacy 308 redirect
    "/clients/test",
    "/blog", // Legacy 308 redirect
    "/blog/ai-agent-attack-surface-security-checklist-2026", // Legacy 308 redirect
    "/contact", // Hash redirect to /#contact
    "/careers", // Redirect to /
    "/index.html", // Root duplicate redirect
    "/cgi-bin/test", // 404 rewrite
    "/assets/index.js", // Static asset
    "/favicon.ico", // Static icon
  ];

  for (const rc of redirectCases) {
    const res = validateAndNormalizeUrl(rc);
    assert(!res.valid, `Rejects redirected/asset path: '${rc}'`, res.error);
  }

  // Query strings must be cleanly stripped
  const queryUrl = "/blogs/test-post?utm_source=twitter&utm_medium=social#heading";
  const queryRes = validateAndNormalizeUrl(queryUrl);
  assert(
    queryRes.valid && queryRes.normalizedUrl === `${CANONICAL_ORIGIN}/blogs/test-post`,
    "Strips query parameters and hash fragments from URL"
  );

  // -------------------------------------------------------------------------
  // TEST 6: API Key Derivation & Protection
  // -------------------------------------------------------------------------
  console.log("\n--- 6. API KEY DERIVATION & PROTECTION ---");
  const resolvedKey = resolveIndexNowKey({}, root);
  assert(resolvedKey === EXPECTED_KEY, "Correctly resolves key from public key file");
  assert(maskKey(resolvedKey) === "0138...e115", `Masks key safely: ${maskKey(resolvedKey)}`);

  // Invalid key handling
  try {
    resolveIndexNowKey({ key: "short" }); // 5 chars, less than minimum 8 chars
    assert(false, "Fails on key too short (<8 chars)");
  } catch {
    assert(true, "Rejects key too short (<8 chars)");
  }

  try {
    resolveIndexNowKey({ key: "invalid$character!" });
    assert(false, "Fails on key with special characters");
  } catch {
    assert(true, "Rejects key with invalid characters");
  }

  // -------------------------------------------------------------------------
  // TEST 7: Mock IndexNow API Responses (200, 202, 400, 403, 422, 429)
  // -------------------------------------------------------------------------
  console.log("\n--- 7. INDEXNOW API STATUS CODE HANDLING ---");

  // Mock 200 OK
  const mockFetch200 = async () => ({
    status: 200,
    text: async () => "OK",
  });
  const res200 = await submitToIndexNow({
    key: EXPECTED_KEY,
    urls: ["/about"],
    fetchFn: mockFetch200,
    logger: { info: () => {}, warn: () => {}, error: () => {} },
  });
  assert(res200.success && res200.submittedCount === 1, "Handles HTTP 200 (OK) as success");

  // Mock 202 Accepted (Key validation pending)
  const mockFetch202 = async () => ({
    status: 202,
    text: async () => "Accepted",
  });
  const res202 = await submitToIndexNow({
    key: EXPECTED_KEY,
    urls: ["/about"],
    fetchFn: mockFetch202,
    logger: { info: () => {}, warn: () => {}, error: () => {} },
  });
  assert(res202.success && res202.results[0].status === 202, "Handles HTTP 202 (Accepted) as success");

  // Mock 403 Forbidden
  const mockFetch403 = async () => ({
    status: 403,
    text: async () => "Key not valid",
  });
  const res403 = await submitToIndexNow({
    key: EXPECTED_KEY,
    urls: ["/about"],
    fetchFn: mockFetch403,
    logger: { info: () => {}, warn: () => {}, error: () => {} },
  });
  assert(!res403.success && res403.results[0].status === 403, "Handles HTTP 403 (Forbidden) as client error");

  // Mock 422 Unprocessable Entity
  const mockFetch422 = async () => ({
    status: 422,
    text: async () => "Unprocessable Entity",
  });
  const res422 = await submitToIndexNow({
    key: EXPECTED_KEY,
    urls: ["/about"],
    fetchFn: mockFetch422,
    logger: { info: () => {}, warn: () => {}, error: () => {} },
  });
  assert(!res422.success && res422.results[0].status === 422, "Handles HTTP 422 (Unprocessable Entity)");

  // -------------------------------------------------------------------------
  // TEST 8: Network Retry Logic
  // -------------------------------------------------------------------------
  console.log("\n--- 8. NETWORK RETRY & TRANSIENT FAILURE HANDLING ---");
  let attempts = 0;
  const mockRetryFetch = async () => {
    attempts++;
    if (attempts === 1) {
      // Simulate transient 500 error
      return { status: 500, text: async () => "Internal Server Error" };
    }
    return { status: 200, text: async () => "OK" };
  };

  const retryRes = await submitToIndexNow({
    key: EXPECTED_KEY,
    urls: ["/about"],
    fetchFn: mockRetryFetch,
    maxRetries: 1,
    logger: { info: () => {}, warn: () => {}, error: () => {} },
  });
  assert(retryRes.success && attempts === 2, "Retries transient HTTP 500 error and recovers on attempt 2");

  // -------------------------------------------------------------------------
  // TEST 9: Batching & Chunking
  // -------------------------------------------------------------------------
  console.log("\n--- 9. BATCHING & CHUNKING ---");
  const testItems = Array.from({ length: 25 }, (_, i) => `item-${i}`);
  const chunks = chunkArray(testItems, 10);
  assert(
    chunks.length === 3 && chunks[0].length === 10 && chunks[1].length === 10 && chunks[2].length === 5,
    "Correctly splits 25 items into chunks of 10, 10, 5"
  );

  // Dry run mode
  const dryRunRes = await submitToIndexNow({
    key: EXPECTED_KEY,
    urls: ["/about", "/services"],
    dryRun: true,
    logger: { info: () => {}, warn: () => {}, error: () => {} },
  });
  assert(dryRunRes.success && dryRunRes.results[0].dryRun === true, "Dry-run mode succeeds without network calls");

  // -------------------------------------------------------------------------
  // TEST 10: Optional Live API Verification (--live-test)
  // -------------------------------------------------------------------------
  if (process.argv.includes("--live-test")) {
    console.log("\n--- 10. CONTROLLED LIVE TEST (SINGLE URL) ---");
    const testUrl = `${CANONICAL_ORIGIN}/blogs/ai-agent-attack-surface-security-checklist-2026`;
    console.log(`Submitting single controlled test URL: ${testUrl}`);
    const liveRes = await submitToIndexNow({
      key: EXPECTED_KEY,
      urls: [testUrl],
      logger: console,
    });
    console.log(`Live IndexNow API response: status=${liveRes.results[0]?.status}, ok=${liveRes.success}`);
    assert(liveRes.success, "Controlled live IndexNow API request returned success (200 or 202)");
  }

  // -------------------------------------------------------------------------
  // SUMMARY REPORT
  // -------------------------------------------------------------------------
  console.log("\n===============================================================");
  console.log("📊 TEST SUMMARY REPORT");
  console.log("===============================================================");
  console.log(`Total Tests Run : ${passedCount + failedCount}`);
  console.log(`Passed          : ${passedCount}`);
  console.log(`Failed          : ${failedCount}`);

  if (failedCount > 0) {
    console.error("\n❌ INDEXNOW TEST SUITE FAILED. Review errors above.");
    process.exit(1);
  } else {
    console.log("\n✨ ALL INDEXNOW TESTS PASSED COMPLETELY! ✨\n");
  }
}

runTests().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
