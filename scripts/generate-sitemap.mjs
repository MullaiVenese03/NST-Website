/**
 * Generates public/sitemap.xml from SITEMAP_STATIC_PATHS (keep in sync with src/seo/pageMeta.ts).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_ORIGIN = "https://www.nebulasafetech.com";

/** Mirror of SITEMAP_STATIC_PATHS in src/seo/pageMeta.ts */
const SITEMAP_STATIC_PATHS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/cybersecurity", changefreq: "monthly", priority: "0.85" },
  { path: "/services/web-development", changefreq: "monthly", priority: "0.85" },
  { path: "/services/ui-ux-design", changefreq: "monthly", priority: "0.85" },
  { path: "/services/edtech-training", changefreq: "monthly", priority: "0.85" },
  { path: "/clients", changefreq: "monthly", priority: "0.75" },
  { path: "/edtech", changefreq: "monthly", priority: "0.85" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.4" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = SITEMAP_STATIC_PATHS.map(
  ({ path: p, changefreq, priority }) => `  <url>
    <loc>${SITE_ORIGIN}${p === "/" ? "/" : p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${outPath} (${SITEMAP_STATIC_PATHS.length} URLs, lastmod=${lastmod})`);
