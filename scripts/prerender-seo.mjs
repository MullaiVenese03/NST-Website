/**
 * scripts/prerender-seo.mjs
 *
 * Pre-renders authoritative Open Graph, Twitter/X, and JSON-LD metadata into static HTML files
 * for all routes in `dist/`, including:
 * 1. Homepage & non-blog pages -> Company branding social image (og-image.jpg / og-image.webp)
 * 2. Blogs listing page -> Approved blogs listing social image (og-image.jpg / og-image.webp)
 * 3. Individual blog pages -> Each blog's unique source thumbnail (16:9 JPEG, absolute URL)
 *
 * This ensures that social platforms and crawlers (Facebook, LinkedIn, Twitter/X,
 * WhatsApp, Slack, Discord, Telegram, Google, Bing) receive the exact, unique,
 * publicly accessible metadata and structured data without executing JavaScript.
 *
 * Also adds data-rh="true" attributes to match react-helmet-async so that
 * client-side hydration does not create duplicate tags.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const SITE_ORIGIN = "https://www.nebulasafetech.com";
const ORG_NAME = "NebulaSafeTech";
const TWITTER_HANDLE = "@nebulasafetech";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMetadata(templateHtml, meta, routePath, post, prerenderSchemas) {
  let html = templateHtml;

  // 1. Authoritative Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title data-rh="true">${escapeHtml(meta.title)}</title>`);

  // 2. Remove all existing canonical links, alternate hreflang, descriptions, robots, OG, Twitter, geo, and ld+json
  html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>\s*/gi, "");
  html = html.replace(/<link\s+[^>]*rel=["']alternate["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta\s+[^>]*name=["']description["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta\s+[^>]*name=["']robots["'][^>]*>\s*/gi, "");
  html = html.replace(/<!--\s*(?:Open Graph|Twitter)[^>]*-->\s*/gi, "");
  html = html.replace(/<meta\s+[^>]*property=["']og:[\s\S]*?>\s*/gi, "");
  html = html.replace(/<meta\s+[^>]*name=["']twitter:[\s\S]*?>\s*/gi, "");
  html = html.replace(/<meta\s+[^>]*name=["']geo\.[\s\S]*?>\s*/gi, "");
  html = html.replace(/<meta\s+[^>]*name=["']ICBM["'][^>]*>\s*/gi, "");
  html = html.replace(/<script\s+[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>\s*/gi, "");

  const imageType =
    meta.imageType ||
    (meta.imageUrl.endsWith(".png")
      ? "image/png"
      : meta.imageUrl.endsWith(".webp")
        ? "image/webp"
        : "image/jpeg");

  const globalJson = prerenderSchemas.getGlobalSchemaJson();
  const pageJson = prerenderSchemas.getPageSchemaJson(routePath, post);

  const headTags = `
  <meta data-rh="true" name="description" content="${escapeHtml(meta.description)}" />
  <meta data-rh="true" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link data-rh="true" rel="canonical" href="${meta.canonicalUrl}" />

  <!-- Geo Location Tags -->
  <meta data-rh="true" name="geo.region" content="IN-TN" />
  <meta data-rh="true" name="geo.placename" content="Hosur, Tamil Nadu, India" />
  <meta data-rh="true" name="geo.position" content="12.7409;77.8253" />
  <meta data-rh="true" name="ICBM" content="12.7409;77.8253" />

  <!-- Open Graph Metadata (Authoritative) -->
  <meta data-rh="true" property="og:locale" content="en_IN" />
  <meta data-rh="true" property="og:site_name" content="${ORG_NAME}" />
  <meta data-rh="true" property="og:type" content="${meta.ogType || 'website'}" />
  <meta data-rh="true" property="og:title" content="${escapeHtml(meta.title)}" />
  <meta data-rh="true" property="og:description" content="${escapeHtml(meta.description)}" />
  <meta data-rh="true" property="og:url" content="${meta.canonicalUrl}" />
  <meta data-rh="true" property="og:image" content="${meta.imageUrl}" />
  <meta data-rh="true" property="og:image:secure_url" content="${meta.imageUrl}" />
  <meta data-rh="true" property="og:image:type" content="${imageType}" />
  <meta data-rh="true" property="og:image:width" content="${meta.imageWidth || 1200}" />
  <meta data-rh="true" property="og:image:height" content="${meta.imageHeight || 630}" />
  <meta data-rh="true" property="og:image:alt" content="${escapeHtml(meta.imageAlt || meta.title)}" />

  <!-- Twitter / X Cards (Authoritative) -->
  <meta data-rh="true" name="twitter:card" content="summary_large_image" />
  <meta data-rh="true" name="twitter:site" content="${TWITTER_HANDLE}" />
  <meta data-rh="true" name="twitter:creator" content="${TWITTER_HANDLE}" />
  <meta data-rh="true" name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta data-rh="true" name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta data-rh="true" name="twitter:image" content="${meta.imageUrl}" />
  <meta data-rh="true" name="twitter:image:alt" content="${escapeHtml(meta.imageAlt || meta.title)}" />

  <!-- Structured Data (JSON-LD) -->
  <script data-rh="true" type="application/ld+json">${globalJson}</script>
  <script data-rh="true" type="application/ld+json">${pageJson}</script>
`;

  html = html.replace("</head>", `${headTags.trim()}\n  </head>`);

  return html;
}

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

async function loadPrerenderSchemas() {
  const res = await build({
    entryPoints: [path.join(root, "src", "seo", "prerenderSchemas.ts")],
    bundle: true,
    format: "cjs",
    write: false,
  });

  const moduleShim = { exports: {} };
  const fn = new Function("module", "exports", res.outputFiles[0].text);
  fn(moduleShim, moduleShim.exports);
  return moduleShim.exports;
}

async function run() {
  const indexHtmlPath = path.join(dist, "index.html");
  if (!existsSync(indexHtmlPath)) {
    console.error("prerender-seo: dist/index.html does not exist. Run vite build first.");
    process.exit(1);
  }

  const baseHtml = readFileSync(indexHtmlPath, "utf-8");
  const blogPosts = await loadBlogPosts();
  const prerenderSchemas = await loadPrerenderSchemas();

  // Clean up any legacy prerendered artifacts from old builds to prevent serving 200 on old paths
  const legacyDirs = [
    path.join(dist, "clients"),
    path.join(dist, "blog"),
  ];
  const legacyFiles = [
    path.join(dist, "clients.html"),
    path.join(dist, "blog.html"),
  ];
  for (const d of legacyDirs) {
    if (existsSync(d)) {
      rmSync(d, { recursive: true, force: true });
    }
  }
  for (const f of legacyFiles) {
    if (existsSync(f)) {
      rmSync(f, { force: true });
    }
  }

  console.log(`prerender-seo: Loaded ${blogPosts.length} blog posts dynamically.`);

  // 1. Homepage & Non-blog pages
  const staticPages = [
    {
      dir: dist,
      routePath: "/",
      meta: {
        title: "NebulaSafeTech | Cybersecurity, VAPT & Digital Solutions",
        description:
          "NebulaSafeTech delivers expert VAPT cybersecurity, secure web development, UI/UX design, and EdTech training for organizations across India and worldwide.",
        canonicalUrl: `${SITE_ORIGIN}/`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: "NebulaSafeTech | Cybersecurity, VAPT & Digital Solutions",
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "blogs"),
      routePath: "/blogs",
      meta: {
        title: `Technology & Cybersecurity Blog | ${ORG_NAME}`,
        description:
          "Read technical guides, VAPT methodologies, cloud-native architecture insights, and cybersecurity career roadmaps from NebulaSafeTech engineers.",
        canonicalUrl: `${SITE_ORIGIN}/blogs`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Technology & Cybersecurity Blog | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "about"),
      routePath: "/about",
      meta: {
        title: `About ${ORG_NAME} | Cybersecurity & Digital Engineering Experts`,
        description:
          "NebulaSafeTech is a cybersecurity and digital solutions company based in Hosur, Tamil Nadu, India. Learn how our defenders-first engineering team delivers enterprise-grade security.",
        canonicalUrl: `${SITE_ORIGIN}/about`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `About ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "services"),
      routePath: "/services",
      meta: {
        title: `Services | ${ORG_NAME} - Security, Web, UI/UX & Training`,
        description:
          "Explore VAPT vulnerability assessments, full-stack React web engineering, UI/UX design systems, and institutional cybersecurity training from NebulaSafeTech.",
        canonicalUrl: `${SITE_ORIGIN}/services`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Services | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "testimonials"),
      routePath: "/testimonials",
      meta: {
        title: `Client Testimonials & Institutional Programs | ${ORG_NAME}`,
        description:
          "Cybersecurity awareness workshops, academic MoUs, and enterprise training programs delivered across India by NebulaSafeTech.",
        canonicalUrl: `${SITE_ORIGIN}/testimonials`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Client Testimonials & Institutional Programs | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "edtech"),
      routePath: "/edtech",
      meta: {
        title: `EdTech & Cybersecurity Career Programs | ${ORG_NAME}`,
        description:
          "Industry-grade cybersecurity learning paths, hands-on vulnerability labs, student certifications, and capstone project guidance from NebulaSafeTech.",
        canonicalUrl: `${SITE_ORIGIN}/edtech`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `EdTech & Cybersecurity Career Programs | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "privacy-policy"),
      routePath: "/privacy-policy",
      meta: {
        title: `Privacy Policy | ${ORG_NAME}`,
        description:
          "How NebulaSafeTech collects, handles, and protects user data across our digital platforms, cybersecurity assessments, and educational services.",
        canonicalUrl: `${SITE_ORIGIN}/privacy-policy`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Privacy Policy | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "terms-and-conditions"),
      routePath: "/terms-and-conditions",
      meta: {
        title: `Terms & Conditions | ${ORG_NAME}`,
        description:
          "Official terms of service governing the use of NebulaSafeTech website, client software engagements, and training programs.",
        canonicalUrl: `${SITE_ORIGIN}/terms-and-conditions`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Terms & Conditions | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "services", "cybersecurity"),
      routePath: "/services/cybersecurity",
      meta: {
        title: `Cybersecurity Services & Assessments | ${ORG_NAME}`,
        description:
          `${ORG_NAME} in Hosur, Tamil Nadu delivers practical cybersecurity services including VAPT, application and cloud security, network hardening, and awareness programs for teams across India and abroad.`,
        canonicalUrl: `${SITE_ORIGIN}/services/cybersecurity`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Cybersecurity Services & Assessments | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "services", "web-development"),
      routePath: "/services/web-development",
      meta: {
        title: `Full-Stack Web Development | ${ORG_NAME}`,
        description:
          `${ORG_NAME} builds scalable, secure web applications from Hosur, India with modern stacks, secure SDLC practices, and production-ready delivery for startups and enterprises.`,
        canonicalUrl: `${SITE_ORIGIN}/services/web-development`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Full-Stack Web Development | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "services", "ui-ux-design"),
      routePath: "/services/ui-ux-design",
      meta: {
        title: `UI/UX Design & Product Experience | ${ORG_NAME}`,
        description:
          `${ORG_NAME} crafts accessible, conversion-focused UI and UX for security products, SaaS, and marketing sites-aligned with your brand and engineering constraints.`,
        canonicalUrl: `${SITE_ORIGIN}/services/ui-ux-design`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `UI/UX Design & Product Experience | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "services", "edtech-training"),
      routePath: "/services/edtech-training",
      meta: {
        title: `EdTech & Cybersecurity Training | ${ORG_NAME}`,
        description:
          "Structured cybersecurity training, labs, certifications, and institutional programs that connect learners to real-world projects from NebulaSafeTech.",
        canonicalUrl: `${SITE_ORIGIN}/services/edtech-training`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `EdTech & Cybersecurity Training | ${ORG_NAME}`,
        ogType: "website",
      },
    },
  ];

  for (const page of staticPages) {
    mkdirSync(page.dir, { recursive: true });
    const rendered = injectMetadata(baseHtml, page.meta, page.routePath, undefined, prerenderSchemas);
    writeFileSync(path.join(page.dir, "index.html"), rendered, "utf-8");
    if (page.dir !== dist) {
      writeFileSync(`${page.dir}.html`, rendered, "utf-8");
    }
  }

  // 2. Every Blog Post -> Distinct, uncropped, absolute thumbnail Open Graph
  const blogsBaseDir = path.join(dist, "blogs");
  mkdirSync(blogsBaseDir, { recursive: true });

  for (const post of blogPosts) {
    const blogsDir = path.join(blogsBaseDir, post.slug);
    mkdirSync(blogsDir, { recursive: true });

    // Resolves public thumbnail asset to absolute production URL
    const imageRelativeSrc = post.featuredImage?.src || "/og-image.jpg";
    const imageUrl = `${SITE_ORIGIN}${imageRelativeSrc.startsWith("/") ? imageRelativeSrc : `/${imageRelativeSrc}`}`;
    const imageType = imageUrl.endsWith(".png")
      ? "image/png"
      : imageUrl.endsWith(".webp")
        ? "image/webp"
        : "image/jpeg";

    const blogMeta = {
      title: `${post.seoTitle || post.title} | ${ORG_NAME}`,
      description: post.metaDescription,
      canonicalUrl: `${SITE_ORIGIN}/blogs/${post.slug}`,
      imageUrl,
      imageType,
      imageWidth: post.featuredImage?.width || 1672,
      imageHeight: post.featuredImage?.height || 941,
      imageAlt: post.featuredImage?.alt || `${post.title} | ${ORG_NAME}`,
      ogType: "article",
    };

    const renderedBlogHtml = injectMetadata(baseHtml, blogMeta, `/blogs/${post.slug}`, post, prerenderSchemas);
    writeFileSync(path.join(blogsDir, "index.html"), renderedBlogHtml, "utf-8");
    writeFileSync(path.join(blogsBaseDir, `${post.slug}.html`), renderedBlogHtml, "utf-8");
    console.log(`prerender-seo: [OK] /blogs/${post.slug} -> og:image = ${imageUrl}`);
  }

  console.log("prerender-seo: All social sharing metadata pre-rendered successfully.");
}

run().catch((err) => {
  console.error("prerender-seo error:", err);
  process.exit(1);
});
