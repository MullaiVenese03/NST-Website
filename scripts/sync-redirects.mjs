/**
 * scripts/sync-redirects.mjs
 *
 * Automatically synchronizes permanent server-side redirects in vercel.json
 * from the authoritative list of blog posts (src/app/data/blogsData.ts),
 * plus the /clients -> /testimonials migration rule and unknown-slug 404 rewrite.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const vercelJsonPath = path.join(root, "vercel.json");

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

export async function syncVercelRedirects() {
  const blogPosts = await loadBlogPosts();
  const currentVercel = JSON.parse(readFileSync(vercelJsonPath, "utf-8"));

  // Phase 2 & 3: Migration redirects take precedence to ensure 1-hop redirects from any host (apex or www)
  const migrationRedirects = [
    {
      source: "/clients",
      destination: "https://www.nebulasafetech.com/testimonials",
      permanent: true,
    },
    {
      source: "/clients/",
      destination: "https://www.nebulasafetech.com/testimonials",
      permanent: true,
    },
    {
      source: "/blog",
      destination: "https://www.nebulasafetech.com/blogs",
      permanent: true,
    },
    {
      source: "/blog/",
      destination: "https://www.nebulasafetech.com/blogs",
      permanent: true,
    },
  ];

  // Phase 3: Known blog slug redirects
  const blogRedirects = [];
  for (const post of blogPosts) {
    blogRedirects.push({
      source: `/blog/${post.slug}`,
      destination: `https://www.nebulasafetech.com/blogs/${post.slug}`,
      permanent: true,
    });
    blogRedirects.push({
      source: `/blog/${post.slug}/`,
      destination: `https://www.nebulasafetech.com/blogs/${post.slug}`,
      permanent: true,
    });
  }

  const baseRedirects = [
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "nebulasafetech.com",
        },
      ],
      destination: "https://www.nebulasafetech.com/:path*",
      permanent: true,
    },
    {
      source: "/index.html",
      destination: "/",
      permanent: true,
    },
    {
      source: "/blogs",
      has: [
        {
          type: "query",
          key: "q",
        },
      ],
      destination: "/blogs",
      permanent: true,
    },
  ];

  const allRedirects = [...migrationRedirects, ...blogRedirects, ...baseRedirects];

  // Rewrites: catch unknown blog and service slugs and route to genuine 404 handler
  const rewrites = [
    { source: "/cgi-bin(.*)", destination: "/api/not-found" },
    { source: "/blog/(.*)", destination: "/api/not-found" },
    { source: "/blogs/:slug+", destination: "/api/not-found" },
    { source: "/services/:slug+", destination: "/api/not-found" },
    { source: "/careers", destination: "/api/not-found" },
    { source: "/(.*)", destination: "/index.html" },
  ];

  currentVercel.redirects = allRedirects;
  currentVercel.rewrites = rewrites;

  writeFileSync(vercelJsonPath, JSON.stringify(currentVercel, null, 2) + "\n", "utf-8");
  console.log(`sync-redirects: Updated vercel.json with ${allRedirects.length} redirects (${blogPosts.length} blog slugs) and fallback 404 rewrite.`);
}

// When run directly as script
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  syncVercelRedirects().catch((err) => {
    console.error("sync-redirects error:", err);
    process.exit(1);
  });
}
