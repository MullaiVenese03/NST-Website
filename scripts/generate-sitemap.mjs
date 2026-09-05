/**
 * Generates public/sitemap.xml with image sitemap markup from active production routes.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
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

async function run() {
  const blogPosts = await loadBlogPosts();

  /** Static non-blog routes */
  const STATIC_ROUTES = [
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
  ];

  /** Dynamic blog routes from BLOG_POSTS */
  const BLOG_ROUTES = blogPosts.map((post) => {
    const imgSrc = post.featuredImage?.webpSrc || post.featuredImage?.src || "/og-image.webp";
    const imgLoc = `${SITE_ORIGIN}${imgSrc.startsWith("/") ? imgSrc : `/${imgSrc}`}`;
    return {
      path: `/blog/${post.slug}`,
      changefreq: "weekly",
      priority: "0.85",
      image: {
        loc: imgLoc,
        title: post.title,
      },
    };
  });

  /** Legal routes */
  const LEGAL_ROUTES = [
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

  const allRoutes = [...STATIC_ROUTES, ...BLOG_ROUTES, ...LEGAL_ROUTES];
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = allRoutes.map(({ path: p, changefreq, priority, image }) => {
    const loc = `${SITE_ORIGIN}${p === "/" ? "/" : p}`;
    const imageTag = image
      ? `\n    <image:image>\n      <image:loc>${image.loc}</image:loc>\n      <image:title>${escapeXml(image.title)}</image:title>\n    </image:image>`
      : "";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageTag}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;

  const sitemapPath = path.join(root, "public", "sitemap.xml");
  writeFileSync(sitemapPath, xml, "utf-8");
  console.log(`Wrote ${sitemapPath} (${allRoutes.length} URLs, lastmod=${lastmod})`);
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
    }
  });
}

run().catch((err) => {
  console.error("generate-sitemap error:", err);
  process.exit(1);
});
