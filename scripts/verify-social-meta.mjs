import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");

function checkPage(filePath, expectedType, label) {
  const content = readFileSync(filePath, "utf-8");

  const ogImages = [...content.matchAll(/<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/gi)].map(m => m[1]);
  const twImages = [...content.matchAll(/<meta\s+[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/gi)].map(m => m[1]);
  const ogTitles = [...content.matchAll(/<meta\s+[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/gi)].map(m => m[1]);
  const twTitles = [...content.matchAll(/<meta\s+[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["']/gi)].map(m => m[1]);
  const ogTypes = [...content.matchAll(/<meta\s+[^>]*property=["']og:type["'][^>]*content=["']([^"']+)["']/gi)].map(m => m[1]);
  const ogUrls = [...content.matchAll(/<meta\s+[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/gi)].map(m => m[1]);
  const twCards = [...content.matchAll(/<meta\s+[^>]*name=["']twitter:card["'][^>]*content=["']([^"']+)["']/gi)].map(m => m[1]);

  console.log(`\n========================================`);
  console.log(`PAGE: ${label}`);
  console.log(`FILE: ${path.relative(distDir, filePath)}`);
  console.log(`========================================`);
  console.log(`og:type       : ${ogTypes.join(", ")} (expected: ${expectedType})`);
  console.log(`og:url        : ${ogUrls.join(", ")}`);
  console.log(`og:title      : ${ogTitles.join(", ")}`);
  console.log(`og:image      : ${ogImages.join(", ")}`);
  console.log(`twitter:image : ${twImages.join(", ")}`);
  console.log(`twitter:card  : ${twCards.join(", ")}`);

  // Duplication checks
  let errors = 0;
  if (ogImages.length !== 1) {
    console.error(`ERROR: Expected exactly 1 og:image, found ${ogImages.length}`);
    errors++;
  }
  if (twImages.length !== 1) {
    console.error(`ERROR: Expected exactly 1 twitter:image, found ${twImages.length}`);
    errors++;
  }
  if (ogTitles.length !== 1) {
    console.error(`ERROR: Expected exactly 1 og:title, found ${ogTitles.length}`);
    errors++;
  }
  if (ogImages[0] !== twImages[0]) {
    console.error(`ERROR: og:image and twitter:image do not match!`);
    errors++;
  }
  if (!ogImages[0]?.startsWith("https://www.nebulasafetech.com/")) {
    console.error(`ERROR: og:image is not absolute with production domain!`);
    errors++;
  }
  if (ogTypes[0] !== expectedType) {
    console.error(`ERROR: og:type expected ${expectedType} but got ${ogTypes[0]}`);
    errors++;
  }

  if (errors === 0) {
    console.log(`STATUS: [PASSED] Authoritative & Unique`);
  } else {
    console.error(`STATUS: [FAILED] with ${errors} errors`);
    process.exitCode = 1;
  }

  return { label, ogImage: ogImages[0] };
}

console.log("AUDITING SOCIAL MEDIA SHARING METADATA ACROSS DIST...");

// 1. Homepage
checkPage(path.join(distDir, "index.html"), "website", "Homepage");

// 2. Blogs listing page
checkPage(path.join(distDir, "blogs", "index.html"), "website", "Blogs Listing Page");

// 3. Testimonials page
checkPage(path.join(distDir, "testimonials", "index.html"), "website", "Testimonials Page");

// 4. Assert absence of legacy prerendered directories
if (existsSync(path.join(distDir, "clients"))) {
  console.error("ERROR: dist/clients directory still exists in production build! Should be redirect only.");
  process.exitCode = 1;
}
if (existsSync(path.join(distDir, "blog"))) {
  console.error("ERROR: dist/blog directory still exists in production build! Should be redirect only.");
  process.exitCode = 1;
}

// 5. Individual blog pages in dist/blogs
const blogsBase = path.join(distDir, "blogs");
const blogDirs = readdirSync(blogsBase).filter(f => statSync(path.join(blogsBase, f)).isDirectory());

const blogResults = [];
for (const slug of blogDirs) {
  const result = checkPage(path.join(blogsBase, slug, "index.html"), "article", `Blog: ${slug}`);
  blogResults.push(result);
}

// Check uniqueness across blogs
console.log(`\n========================================`);
console.log(`UNIQUENESS CHECK ACROSS ALL BLOGS`);
console.log(`========================================`);
const imageSet = new Set();
let duplicates = 0;
for (const b of blogResults) {
  if (imageSet.has(b.ogImage)) {
    console.error(`DUPLICATE FOUND: ${b.label} shares thumbnail ${b.ogImage}`);
    duplicates++;
  } else {
    imageSet.add(b.ogImage);
  }
}

if (duplicates === 0) {
  console.log(`[PASSED] All ${blogResults.length} blogs have 100% unique, dedicated social preview thumbnails!`);
} else {
  console.error(`[FAILED] Found ${duplicates} duplicate thumbnails across blogs.`);
  process.exitCode = 1;
}
