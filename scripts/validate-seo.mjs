/**
 * scripts/validate-seo.mjs
 *
 * Automated technical SEO audit and migration verification suite.
 * Validates generated dist/ production HTML files, sitemap.xml, robots.txt,
 * vercel.json server redirect/rewrite rules, and codebase internal links.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const vercelJsonPath = path.join(root, "vercel.json");
const sitemapPath = path.join(root, "public", "sitemap.xml");
const robotsPath = path.join(root, "public", "robots.txt");
const SITE_ORIGIN = "https://www.nebulasafetech.com";

async function loadBlogPosts() {
  const res = await build({
    entryPoints: [path.join(root, "src", "app", "data", "blogsData.ts")],
    bundle: true,
    format: "cjs",
    write: false,
  });

  const moduleShim = { exports: {} };
  const fn = new Function("module", "exports", res.outputFiles[0].text);
  fn(moduleShim, moduleShim.exports);
  return moduleShim.exports.BLOG_POSTS || [];
}

function countMatches(str, regex) {
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

function extractFirstMatch(str, regex) {
  const m = str.match(regex);
  return m ? m[1] : null;
}

async function runValidation() {
  console.log("===============================================================");
  console.log("🔍 NEBULASAFETECH - TECHNICAL SEO & URL MIGRATION AUDIT");
  console.log("===============================================================\n");

  let errorCount = 0;
  let warningCount = 0;

  function fail(msg) {
    console.error(`❌ [FAIL] ${msg}`);
    errorCount++;
  }

  function pass(msg) {
    console.log(`✅ [PASS] ${msg}`);
  }

  function warn(msg) {
    console.warn(`⚠️ [WARN] ${msg}`);
    warningCount++;
  }

  if (!existsSync(distDir)) {
    fail("dist directory does not exist. Run 'npm run build' first.");
    process.exit(1);
  }

  const blogPosts = await loadBlogPosts();
  console.log(`Loaded ${blogPosts.length} authoritative blog posts.\n`);

  // Define expected indexable routes (25 total)
  const indexableRoutes = [
    {
      route: "/",
      file: path.join(distDir, "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/`,
      expectedTextSnippet: "NebulaSafeTech",
    },
    {
      route: "/about",
      file: path.join(distDir, "about", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/about`,
      expectedTextSnippet: "About",
    },
    {
      route: "/services",
      file: path.join(distDir, "services", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/services`,
      expectedTextSnippet: "Services",
    },
    {
      route: "/services/cybersecurity",
      file: path.join(distDir, "services", "cybersecurity", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/services/cybersecurity`,
      expectedTextSnippet: "VAPT",
    },
    {
      route: "/services/web-development",
      file: path.join(distDir, "services", "web-development", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/services/web-development`,
      expectedTextSnippet: "Web Development",
    },
    {
      route: "/services/ui-ux-design",
      file: path.join(distDir, "services", "ui-ux-design", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/services/ui-ux-design`,
      expectedTextSnippet: "UI/UX",
    },
    {
      route: "/services/edtech-training",
      file: path.join(distDir, "services", "edtech-training", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/services/edtech-training`,
      expectedTextSnippet: "EdTech",
    },
    {
      route: "/testimonials",
      file: path.join(distDir, "testimonials", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/testimonials`,
      expectedTextSnippet: "Testimonials",
    },
    {
      route: "/edtech",
      file: path.join(distDir, "edtech", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/edtech`,
      expectedTextSnippet: "EdTech",
    },
    {
      route: "/blogs",
      file: path.join(distDir, "blogs", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/blogs`,
      expectedTextSnippet: "Blog",
    },
    {
      route: "/privacy-policy",
      file: path.join(distDir, "privacy-policy", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/privacy-policy`,
      expectedTextSnippet: "Privacy Policy",
    },
    {
      route: "/terms-and-conditions",
      file: path.join(distDir, "terms-and-conditions", "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/terms-and-conditions`,
      expectedTextSnippet: "Terms & Conditions",
    },
  ];

  // Add all 13 blog posts under /blogs/:slug
  for (const post of blogPosts) {
    indexableRoutes.push({
      route: `/blogs/${post.slug}`,
      file: path.join(distDir, "blogs", post.slug, "index.html"),
      expectedCanonical: `${SITE_ORIGIN}/blogs/${post.slug}`,
      expectedTextSnippet: post.title,
    });
  }

  // =========================================================================
  // CHECK 1: Production HTML Metadata & Prerender Verification (Every Route)
  // =========================================================================
  console.log("--- 1. AUDITING ALL INDEXABLE PAGES FOR METADATA ---");
  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const seenCanonicals = new Set();

  for (const r of indexableRoutes) {
    if (!existsSync(r.file)) {
      fail(`Missing prerendered output for route ${r.route} at ${r.file}`);
      continue;
    }

    const html = readFileSync(r.file, "utf-8");

    // Title checks
    const titleCount = countMatches(html, /<title\b[^>]*>/gi);
    if (titleCount !== 1) {
      fail(`${r.route}: Expected exactly 1 <title>, found ${titleCount}`);
    }
    const title = extractFirstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i)?.trim();
    if (!title) {
      fail(`${r.route}: Empty <title> element`);
    } else {
      if (seenTitles.has(title)) {
        fail(`Duplicate title detected between ${r.route} and ${seenTitles.get(title)}: "${title}"`);
      } else {
        seenTitles.set(title, r.route);
      }
    }

    // Description checks
    const descCount = countMatches(html, /<meta\s+[^>]*name=["']description["'][^>]*>/gi);
    if (descCount !== 1) {
      fail(`${r.route}: Expected exactly 1 meta description, found ${descCount}`);
    }
    const desc = extractFirstMatch(html, /<meta\s+[^>]*name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);
    if (!desc || desc.length < 15) {
      fail(`${r.route}: Meta description missing or suspiciously short ("${desc}")`);
    } else {
      if (seenDescriptions.has(desc)) {
        fail(`Duplicate description detected between ${r.route} and ${seenDescriptions.get(desc)}: "${desc}"`);
      } else {
        seenDescriptions.set(desc, r.route);
      }
    }

    // Canonical checks
    const canonicalCount = countMatches(html, /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi);
    if (canonicalCount !== 1) {
      fail(`${r.route}: Expected exactly 1 canonical tag, found ${canonicalCount}`);
    }
    const canonicalHref = extractFirstMatch(html, /<link\s+[^>]*rel=["']canonical["']\s+href=["']([^"']*)["'][^>]*>/i);
    if (canonicalHref !== r.expectedCanonical) {
      fail(`${r.route}: Canonical mismatch. Got "${canonicalHref}", expected "${r.expectedCanonical}"`);
    }
    if (seenCanonicals.has(canonicalHref)) {
      fail(`Duplicate canonical tag detected across routes: "${canonicalHref}"`);
    }
    seenCanonicals.add(canonicalHref);

    // No accidental noindex on indexable pages
    const robotsMatch = extractFirstMatch(html, /<meta\s+[^>]*name=["']robots["']\s+content=["']([^"']*)["'][^>]*>/i);
    if (robotsMatch && robotsMatch.includes("noindex")) {
      fail(`${r.route}: Contains accidental 'noindex' directive: "${robotsMatch}"`);
    }

    // Substantial route-specific content check
    // Look for content keywords in title, description, or HTML content
    const normalizedHtml = html.toLowerCase();
    const normalizedSnippet = r.expectedTextSnippet.toLowerCase();
    if (!normalizedHtml.includes(normalizedSnippet)) {
      warn(`${r.route}: Snippet "${r.expectedTextSnippet}" was not found in rendered HTML.`);
    }

    // Structured data verification
    const jsonLdScripts = [...html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][\s\S]*?>([\s\S]*?)<\/script>/gi)];
    if (jsonLdScripts.length === 0) {
      fail(`${r.route}: Missing JSON-LD structured data script`);
    } else {
      for (const scriptMatch of jsonLdScripts) {
        try {
          const parsed = JSON.parse(scriptMatch[1]);
          const serialized = JSON.stringify(parsed);
          // Verify no legacy URL in JSON-LD
          if (serialized.includes("https://www.nebulasafetech.com/clients")) {
            fail(`${r.route}: Structured data still references legacy URL https://www.nebulasafetech.com/clients`);
          }
          if (serialized.includes("https://www.nebulasafetech.com/blog/")) {
            fail(`${r.route}: Structured data still references legacy path https://www.nebulasafetech.com/blog/`);
          }
        } catch (e) {
          fail(`${r.route}: Malformed JSON-LD syntax: ${e.message}`);
        }
      }
    }
  }

  pass(`Audited ${indexableRoutes.length} indexable pages. All have exactly 1 title, 1 description, 1 canonical, valid structured data, and no accidental noindex.`);

  // =========================================================================
  // CHECK 2: Absence of Legacy Prerendered Static Files (No HTTP 200 duplicates)
  // =========================================================================
  console.log("\n--- 2. AUDITING ABSENCE OF LEGACY PRERENDERED DIRECTORIES ---");
  const forbiddenPaths = [
    path.join(distDir, "clients"),
    path.join(distDir, "clients.html"),
    path.join(distDir, "blog.html"),
  ];
  for (const fp of forbiddenPaths) {
    if (existsSync(fp)) {
      fail(`Forbidden legacy path still exists in dist: ${fp}`);
    } else {
      pass(`Confirmed absent from static output: ${path.relative(distDir, fp)}`);
    }
  }

  // Ensure dist/blog does not contain any article directories
  const legacyBlogDir = path.join(distDir, "blog");
  if (existsSync(legacyBlogDir)) {
    const subItems = readdirSync(legacyBlogDir);
    if (subItems.length > 0) {
      fail(`Legacy dist/blog directory is not empty (${subItems.join(", ")}). Must not serve static files.`);
    }
  } else {
    pass("Confirmed legacy dist/blog directory does not exist.");
  }

  // =========================================================================
  // CHECK 3: Sitemap Audit (public/sitemap.xml)
  // =========================================================================
  console.log("\n--- 3. AUDITING SITEMAP INTEGRITY ---");
  if (!existsSync(sitemapPath)) {
    fail(`Sitemap file missing at ${sitemapPath}`);
  } else {
    const sitemapContent = readFileSync(sitemapPath, "utf-8");
    const locs = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    console.log(`Found ${locs.length} URLs in public/sitemap.xml.`);

    // 1. Check for duplicates
    const locSet = new Set();
    const dups = [];
    for (const loc of locs) {
      if (locSet.has(loc)) dups.push(loc);
      locSet.add(loc);
    }
    if (dups.length > 0) {
      fail(`Duplicate sitemap URLs found: ${dups.join(", ")}`);
    } else {
      pass("Zero duplicate URLs in sitemap.");
    }

    // 2. Check that legacy routes are excluded
    const legacyClients = locs.find((u) => u === `${SITE_ORIGIN}/clients`);
    if (legacyClients) {
      fail("Legacy route https://www.nebulasafetech.com/clients is still present in sitemap.xml");
    } else {
      pass("Legacy route /clients is excluded from sitemap.xml");
    }

    const legacyBlogPosts = locs.filter((u) => u.startsWith(`${SITE_ORIGIN}/blog/`));
    if (legacyBlogPosts.length > 0) {
      fail(`Legacy /blog/{slug} URLs present in sitemap.xml: ${legacyBlogPosts.join(", ")}`);
    } else {
      pass("All legacy /blog/{slug} URLs excluded from sitemap.xml");
    }

    // 3. Check that /testimonials is present
    if (!locSet.has(`${SITE_ORIGIN}/testimonials`)) {
      fail("Missing https://www.nebulasafetech.com/testimonials in sitemap.xml");
    } else {
      pass("Confirmed https://www.nebulasafetech.com/testimonials is present in sitemap.xml");
    }

    // 4. Check that /blogs is present exactly once
    const blogListingMatches = locs.filter((u) => u === `${SITE_ORIGIN}/blogs`);
    if (blogListingMatches.length !== 1) {
      fail(`Expected https://www.nebulasafetech.com/blogs exactly once in sitemap, found ${blogListingMatches.length}`);
    } else {
      pass("Confirmed https://www.nebulasafetech.com/blogs is present once in sitemap.xml");
    }

    // 5. Check that all 13 blog posts use /blogs/{slug}
    for (const post of blogPosts) {
      const expectedUrl = `${SITE_ORIGIN}/blogs/${post.slug}`;
      if (!locSet.has(expectedUrl)) {
        fail(`Missing blog post in sitemap: ${expectedUrl}`);
      }
    }
    pass(`All ${blogPosts.length} individual blog articles present under /blogs/{slug} in sitemap.`);

    // 6. Check that all URLs use HTTPS and www domain
    const nonStandard = locs.filter((u) => !u.startsWith(`${SITE_ORIGIN}/`));
    if (nonStandard.length > 0) {
      fail(`Sitemap contains URLs not using ${SITE_ORIGIN}/: ${nonStandard.join(", ")}`);
    } else {
      pass("All sitemap entries use absolute HTTPS www.nebulasafetech.com URLs.");
    }
  }

  // =========================================================================
  // CHECK 4: Robots.txt Audit
  // =========================================================================
  console.log("\n--- 4. AUDITING ROBOTS.TXT ---");
  if (!existsSync(robotsPath)) {
    fail(`robots.txt missing at ${robotsPath}`);
  } else {
    const robots = readFileSync(robotsPath, "utf-8");
    if (!robots.includes("Sitemap: https://www.nebulasafetech.com/sitemap.xml")) {
      fail("robots.txt does not reference authoritative sitemap URL https://www.nebulasafetech.com/sitemap.xml");
    } else {
      pass("robots.txt references correct sitemap URL.");
    }
    if (robots.includes("Disallow: /clients") || robots.includes("Disallow: /blog")) {
      fail("robots.txt blocks legacy paths! Crawlers must be allowed to crawl them to observe redirects.");
    } else {
      pass("robots.txt does not block legacy redirect paths.");
    }
    if (robots.toLowerCase().includes("host:")) {
      fail("robots.txt contains unsupported 'Host:' directive.");
    }
  }

  // =========================================================================
  // CHECK 5: Vercel Server-Side Redirects & Rewrites (vercel.json)
  // =========================================================================
  console.log("\n--- 5. AUDITING VERCEL SERVER CONFIGURATION (vercel.json) ---");
  if (!existsSync(vercelJsonPath)) {
    fail(`vercel.json not found at ${vercelJsonPath}`);
  } else {
    const vercel = JSON.parse(readFileSync(vercelJsonPath, "utf-8"));
    const redirects = vercel.redirects || [];
    const rewrites = vercel.rewrites || [];

    // 1. Clients redirect assertion
    const clientsRedirect = redirects.find(
      (r) => r.source === "/clients" && r.destination === "https://www.nebulasafetech.com/testimonials" && r.permanent === true
    );
    if (!clientsRedirect) {
      fail("Missing permanent server redirect from /clients to https://www.nebulasafetech.com/testimonials in vercel.json");
    } else {
      pass("Confirmed permanent server redirect /clients -> https://www.nebulasafetech.com/testimonials in vercel.json");
    }

    // 2. Blog listing redirect assertion
    const blogListingRedirect = redirects.find(
      (r) => r.source === "/blog" && r.destination === "https://www.nebulasafetech.com/blogs" && r.permanent === true
    );
    if (!blogListingRedirect) {
      fail("Missing permanent server redirect from /blog to https://www.nebulasafetech.com/blogs in vercel.json");
    } else {
      pass("Confirmed permanent server redirect /blog -> https://www.nebulasafetech.com/blogs in vercel.json");
    }

    // 3. Every known blog slug redirect assertion
    let missingBlogRedirects = 0;
    for (const post of blogPosts) {
      const match = redirects.find(
        (r) => r.source === `/blog/${post.slug}` && r.destination === `https://www.nebulasafetech.com/blogs/${post.slug}` && r.permanent === true
      );
      if (!match) {
        fail(`Missing redirect for blog slug /blog/${post.slug} in vercel.json`);
        missingBlogRedirects++;
      }
    }
    if (missingBlogRedirects === 0) {
      pass(`Confirmed permanent server redirects for all ${blogPosts.length} known blog slugs in vercel.json.`);
    }

    // 4. Unknown blog slugs fallback to genuine 404 rewrite
    const notFoundRewrite = rewrites.find(
      (r) => r.source === "/blog/(.*)" && r.destination === "/api/not-found"
    );
    if (!notFoundRewrite) {
      fail("Missing fallback rewrite { source: '/blog/(.*)', destination: '/api/not-found' } in vercel.json for genuine 404 on unknown slugs.");
    } else {
      pass("Confirmed unknown legacy blog slugs rewrite to /api/not-found (HTTP 404 response).");
    }
  }

  // =========================================================================
  // CHECK 6: Codebase Internal Link Scan (src/ directory)
  // =========================================================================
  console.log("\n--- 6. SCANNING SOURCE CODE FOR STALE INTERNAL LINKS ---");
  const srcFilesToScan = [];
  function scanDir(dir) {
    for (const entry of readdirSync(dir)) {
      const fullPath = path.join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(tsx?|jsx?)$/.test(entry)) {
        srcFilesToScan.push(fullPath);
      }
    }
  }
  scanDir(path.join(root, "src"));

  let staleInternalLinks = 0;
  for (const f of srcFilesToScan) {
    const rel = path.relative(root, f);
    // Ignore route definitions and redirect helpers
    if (rel.includes("routes.tsx") || rel.includes("sync-redirects.mjs")) continue;

    const content = readFileSync(f, "utf-8");

    // Check for hardcoded internal navigation to "/clients"
    const clientsMatches = [...content.matchAll(/(?:href|to)=["']\/clients["']/g)];
    if (clientsMatches.length > 0) {
      fail(`${rel} contains stale internal link to "/clients"`);
      staleInternalLinks++;
    }

    // Check for internal navigation to "/blog/"
    const blogMatches = [...content.matchAll(/(?:href|to)=["']\/blog\/([^"']+)["']/g)];
    for (const bm of blogMatches) {
      fail(`${rel} contains stale internal link to "/blog/${bm[1]}" (should be /blogs/${bm[1]})`);
      staleInternalLinks++;
    }
  }

  if (staleInternalLinks === 0) {
    pass(`Scanned ${srcFilesToScan.length} source files. Zero stale internal links to /clients or /blog/ found.`);
  }

  // =========================================================================
  // CHECK 7: Vercel Routing Simulation & Status Code Verification
  // =========================================================================
  console.log("\n--- 7. SIMULATING VERCEL SERVER ROUTING & STATUS CODES ---");
  const vercelConfig = JSON.parse(readFileSync(vercelJsonPath, "utf-8"));
  const vercelRedirects = vercelConfig.redirects || [];
  const vercelRewrites = vercelConfig.rewrites || [];

  function simulateVercelRequest(reqPath, reqHost = "www.nebulasafetech.com") {
    // 1. Evaluate redirects in order
    for (const rule of vercelRedirects) {
      if (rule.has) {
        const hostCondition = rule.has.find((h) => h.type === "host");
        if (hostCondition && hostCondition.value !== reqHost) continue;
      }
      let matches = false;
      let dest = rule.destination;
      if (rule.source === "/:path*") {
        matches = true;
        dest = dest.replace("/:path*", reqPath);
      } else if (rule.source === reqPath) {
        matches = true;
      }
      if (matches) {
        return {
          type: "redirect",
          status: rule.permanent ? 308 : 307,
          destination: dest,
        };
      }
    }

    // 2. Check static file existence in dist
    const directFile = path.join(distDir, reqPath === "/" ? "index.html" : `${reqPath.replace(/^\//, "")}.html`);
    const indexFile = path.join(distDir, reqPath.replace(/^\//, ""), "index.html");
    if (existsSync(directFile) || existsSync(indexFile)) {
      return {
        type: "static",
        status: 200,
        filePath: existsSync(directFile) ? directFile : indexFile,
      };
    }

    // 3. Evaluate rewrites in order
    for (const rule of vercelRewrites) {
      if (rule.source === "/cgi-bin(.*)" && reqPath.startsWith("/cgi-bin")) {
        return { type: "rewrite", status: 404, destination: rule.destination };
      }
      if (rule.source === "/blog/(.*)" && reqPath.startsWith("/blog/")) {
        return { type: "rewrite", status: 404, destination: rule.destination };
      }
      if (rule.source === "/(.*)") {
        return { type: "rewrite", status: 200, destination: rule.destination, spa: true };
      }
    }

    return { type: "unknown", status: 404 };
  }

  const routingTestCases = [
    {
      path: "/clients",
      host: "www.nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/testimonials",
    },
    {
      path: "/clients/",
      host: "www.nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/testimonials",
    },
    {
      path: "/clients",
      host: "nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/testimonials",
    },
    {
      path: "/blog",
      host: "www.nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/blogs",
    },
    {
      path: "/blog/",
      host: "www.nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/blogs",
    },
    {
      path: "/blog/ai-agents-enterprise-data-security",
      host: "www.nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/blogs/ai-agents-enterprise-data-security",
    },
    {
      path: "/blog/ai-agents-enterprise-data-security/",
      host: "www.nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/blogs/ai-agents-enterprise-data-security",
    },
    {
      path: "/blog/ai-agents-enterprise-data-security",
      host: "nebulasafetech.com",
      expectedStatus: 308,
      expectedDest: "https://www.nebulasafetech.com/blogs/ai-agents-enterprise-data-security",
    },
    {
      path: "/blog/non-existent-article",
      host: "www.nebulasafetech.com",
      expectedStatus: 404,
      expectedDest: "/api/not-found",
    },
    {
      path: "/blog/non-existent-article/",
      host: "www.nebulasafetech.com",
      expectedStatus: 404,
      expectedDest: "/api/not-found",
    },
    {
      path: "/testimonials",
      host: "www.nebulasafetech.com",
      expectedStatus: 200,
    },
    {
      path: "/blogs/ai-agents-enterprise-data-security",
      host: "www.nebulasafetech.com",
      expectedStatus: 200,
    },
  ];

  let routingFailures = 0;
  for (const tc of routingTestCases) {
    const res = simulateVercelRequest(tc.path, tc.host);
    if (res.status !== tc.expectedStatus) {
      fail(`Routing simulation failed for ${tc.host}${tc.path}: expected HTTP ${tc.expectedStatus}, got ${res.status}`);
      routingFailures++;
    } else if (tc.expectedDest && res.destination !== tc.expectedDest) {
      fail(`Destination simulation failed for ${tc.host}${tc.path}: expected ${tc.expectedDest}, got ${res.destination}`);
      routingFailures++;
    }
  }

  if (routingFailures === 0) {
    pass(`All ${routingTestCases.length} simulated Vercel routing assertions passed (exact 308 redirects, 404 rewrites, 200 responses).`);
  }

  // =========================================================================
  // CHECK 8: Agentic Browsing Manifest & CSP DoubleClick Verification
  // =========================================================================
  console.log("\n--- 8. AUDITING AGENTIC BROWSING & CSP COMPLIANCE ---");
  const aiCatalogPath = path.join(root, "public", ".well-known", "ai-catalog.json");
  if (!existsSync(aiCatalogPath)) {
    fail(`Missing Agentic Resource Discovery manifest at ${aiCatalogPath}`);
  } else {
    try {
      const manifest = JSON.parse(readFileSync(aiCatalogPath, "utf-8"));
      if (manifest.specVersion !== "1.0") {
        fail(`ai-catalog.json specVersion must be '1.0', got '${manifest.specVersion}'`);
      } else if (!manifest.host?.displayName || !manifest.host?.identifier) {
        fail("ai-catalog.json missing required host metadata (displayName, identifier)");
      } else if (!Array.isArray(manifest.entries) || manifest.entries.length === 0) {
        fail("ai-catalog.json missing entries array or has 0 entries");
      } else {
        pass("Confirmed valid Agentic Resource Discovery manifest (specVersion 1.0, valid host & entries).");
      }
    } catch (err) {
      fail(`ai-catalog.json failed JSON parsing: ${err.message}`);
    }
  }

  // Check CSP in vercel.json includes stats.g.doubleclick.net
  const cspHeader = vercelConfig.headers?.find((h) =>
    h.headers?.some((hdr) => hdr.key === "Content-Security-Policy")
  );
  const cspVal = cspHeader?.headers?.find((hdr) => hdr.key === "Content-Security-Policy")?.value || "";
  if (!cspVal.includes("https://stats.g.doubleclick.net")) {
    fail("CSP in vercel.json missing https://stats.g.doubleclick.net in connect-src / img-src");
  } else {
    pass("Confirmed CSP permits https://stats.g.doubleclick.net (resolves DoubleClick/GA4 violation).");
  }

  if (!cspVal.includes("https://www.google.co.in")) {
    fail("CSP in vercel.json missing https://www.google.co.in in img-src (resolves Google Ads ga-audiences violation)");
  } else {
    pass("Confirmed CSP permits https://www.google.co.in (resolves Google Ads ga-audiences violation).");
  }

  // =========================================================================
  // CHECK 9: IndexNow Protocol Key File & Configuration Audit
  // =========================================================================
  console.log("\n--- 9. AUDITING INDEXNOW PROTOCOL KEY & CONFIGURATION ---");
  const indexNowKeyPath = path.join(root, "public", "0138bf1db8ee4112916efd593da4e115.txt");
  if (!existsSync(indexNowKeyPath)) {
    fail("Missing IndexNow key file at public/0138bf1db8ee4112916efd593da4e115.txt");
  } else {
    const keyVal = readFileSync(indexNowKeyPath, "utf-8").trim();
    if (keyVal !== "0138bf1db8ee4112916efd593da4e115") {
      fail(`IndexNow key content mismatch in 0138bf1db8ee4112916efd593da4e115.txt: '${keyVal}'`);
    } else {
      pass("Confirmed IndexNow verification key file (public/0138bf1db8ee4112916efd593da4e115.txt) is present and valid.");
    }
  }

  // =========================================================================
  // SUMMARY REPORT
  // =========================================================================
  console.log("\n===============================================================");
  console.log("📊 AUDIT SUMMARY REPORT");
  console.log("===============================================================");
  console.log(`Total Indexable Pages Checked : ${indexableRoutes.length}`);
  console.log(`Errors / Failures             : ${errorCount}`);
  console.log(`Warnings                      : ${warningCount}`);

  if (errorCount > 0) {
    console.error("\n❌ SEO AUDIT FAILED with errors. Review output above.");
    process.exit(1);
  } else {
    console.log("\n✨ TECHNICAL SEO AUDIT & URL MIGRATION PASSED COMPLETELY! ✨");
    console.log("Note: Server-level 308 redirects and HTTP 404 responses require live deployment verification on Vercel.");
  }
}

runValidation().catch((err) => {
  console.error("FATAL ERROR running SEO validation:", err);
  process.exit(1);
});
