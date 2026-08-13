/**
 * Generates public/sitemap.xml with image sitemap markup from active production routes.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_ORIGIN = "https://www.nebulasafetech.com";

/** Active routes and their sitemap metadata */
const SITEMAP_ROUTES = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "NebulaSafeTech - Cybersecurity and Digital Solutions" },
  },
  {
    path: "/about",
    changefreq: "monthly",
    priority: "0.9",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "About NebulaSafeTech - Cybersecurity Defenders" },
  },
  {
    path: "/services",
    changefreq: "monthly",
    priority: "0.9",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "NebulaSafeTech Services Overview" },
  },
  {
    path: "/services/cybersecurity",
    changefreq: "monthly",
    priority: "0.85",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "Cybersecurity & VAPT Services" },
  },
  {
    path: "/services/web-development",
    changefreq: "monthly",
    priority: "0.85",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "Full-Stack Web Development Services" },
  },
  {
    path: "/services/ui-ux-design",
    changefreq: "monthly",
    priority: "0.85",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "UI/UX Product Design Services" },
  },
  {
    path: "/services/edtech-training",
    changefreq: "monthly",
    priority: "0.85",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "EdTech & Institutional Cybersecurity Training" },
  },
  {
    path: "/clients",
    changefreq: "monthly",
    priority: "0.75",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "NebulaSafeTech Client Programs & Testimonials" },
  },
  {
    path: "/edtech",
    changefreq: "monthly",
    priority: "0.85",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "NebulaSafeTech EdTech Ecosystem" },
  },
  {
    path: "/blogs",
    changefreq: "weekly",
    priority: "0.8",
    image: { loc: `${SITE_ORIGIN}/og-image.webp`, title: "NebulaSafeTech Technology & Cybersecurity Blog" },
  },
  {
    path: "/blog/ai-agents-enterprise-data-security",
    changefreq: "weekly",
    priority: "0.85",
    image: {
      loc: `${SITE_ORIGIN}/media/blogs/ai-agents-enterprise-data-security.jpg`,
      title: "AI Agents & Enterprise Data Security: Risks & Controls",
    },
  },
  {
    path: "/blog/how-to-start-career-cybersecurity",
    changefreq: "monthly",
    priority: "0.8",
    image: {
      loc: `${SITE_ORIGIN}/media/blogs/how-to-start-career-cybersecurity-2026.jpg`,
      title: "How to Start a Career in Cybersecurity in 2026",
    },
  },
  {
    path: "/privacy-policy",
    changefreq: "yearly",
    priority: "0.4",
  },
  {
    path: "/terms-and-conditions",
    changefreq: "yearly",
    priority: "0.4",
  },
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = SITEMAP_ROUTES.map(({ path: p, changefreq, priority, image }) => {
  const loc = `${SITE_ORIGIN}${p === "/" ? "/" : p}`;
  const imageTag = image
    ? `\n    <image:image>\n      <image:loc>${image.loc}</image:loc>\n      <image:title>${image.title}</image:title>\n    </image:image>`
    : "";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageTag}
  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${outPath} (${SITEMAP_ROUTES.length} URLs, lastmod=${lastmod})`);

