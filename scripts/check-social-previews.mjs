import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

async function checkAll() {
  const blogPosts = await loadBlogPosts();
  console.log(`Total blogs registered: ${blogPosts.length}\n`);
  
  let mismatches = 0;
  let missingFiles = 0;

  for (const post of blogPosts) {
    console.log(`========================================`);
    console.log(`Blog #${post.id}: ${post.slug}`);
    console.log(`Title: ${post.title}`);
    
    const fi = post.featuredImage;
    if (!fi) {
      console.error(`  [ERROR] Missing featuredImage config for ${post.slug}`);
      mismatches++;
      continue;
    }
    
    const srcDiskPath = path.join(root, "public", fi.src.replace(/^\//, ""));
    const webpDiskPath = fi.webpSrc ? path.join(root, "public", fi.webpSrc.replace(/^\//, "")) : null;
    
    const srcExists = fs.existsSync(srcDiskPath);
    const webpExists = webpDiskPath ? fs.existsSync(webpDiskPath) : false;
    
    if (!srcExists) {
      console.error(`  [FAIL] featuredImage.src does not exist: ${srcDiskPath}`);
      missingFiles++;
    }
    if (fi.webpSrc && !webpExists) {
      console.error(`  [FAIL] featuredImage.webpSrc does not exist: ${webpDiskPath}`);
      missingFiles++;
    }

    let actualMeta = null;
    if (srcExists) {
      actualMeta = await sharp(srcDiskPath).metadata();
    }

    console.log(`  featuredImage.src     : ${fi.src} (${srcExists ? "EXISTS" : "MISSING"})`);
    console.log(`  featuredImage.webpSrc : ${fi.webpSrc || "none"} (${webpExists ? "EXISTS" : "MISSING"})`);
    console.log(`  Configured Dimensions : ${fi.width}x${fi.height}`);
    if (actualMeta) {
      console.log(`  Actual File Dimensions: ${actualMeta.width}x${actualMeta.height} (${actualMeta.format})`);
      if (actualMeta.width !== fi.width || actualMeta.height !== fi.height) {
        console.warn(`  [WARN] Dimensions mismatch! Config: ${fi.width}x${fi.height}, File: ${actualMeta.width}x${actualMeta.height}`);
        mismatches++;
      } else {
        console.log(`  [OK] Dimensions match configured.`);
      }
    }

    // Check pre-rendered HTML in dist
    const distHtmlPath = path.join(root, "dist", "blog", post.slug, "index.html");
    if (fs.existsSync(distHtmlPath)) {
      const html = fs.readFileSync(distHtmlPath, "utf8");
      const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
      const twMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
      const ogW = html.match(/<meta\s+property=["']og:image:width["']\s+content=["']([^"']+)["']/i);
      const ogH = html.match(/<meta\s+property=["']og:image:height["']\s+content=["']([^"']+)["']/i);
      
      const expectedUrl = `https://www.nebulasafetech.com${fi.src.startsWith("/") ? fi.src : `/${fi.src}`}`;
      const ogUrl = ogMatch ? ogMatch[1] : null;
      const twUrl = twMatch ? twMatch[1] : null;

      console.log(`  dist og:image         : ${ogUrl}`);
      console.log(`  dist twitter:image    : ${twUrl}`);
      console.log(`  dist og:dimensions    : ${ogW ? ogW[1] : "?"}x${ogH ? ogH[1] : "?"}`);

      if (ogUrl !== expectedUrl) {
        console.error(`  [FAIL] og:image doesn't match expected!`);
        console.error(`    Got:      ${ogUrl}`);
        console.error(`    Expected: ${expectedUrl}`);
        mismatches++;
      } else if (twUrl !== expectedUrl) {
        console.error(`  [FAIL] twitter:image doesn't match expected!`);
        mismatches++;
      } else {
        console.log(`  [OK] Social meta in dist matches current featuredImage.`);
      }
    } else {
      console.warn(`  [WARN] dist/blog/${post.slug}/index.html does not exist.`);
    }
  }

  console.log(`\n========================================`);
  console.log(`AUDIT COMPLETE`);
  console.log(`Missing Files: ${missingFiles}`);
  console.log(`Mismatches:    ${mismatches}`);
  console.log(`========================================`);
}

checkAll().catch(console.error);
