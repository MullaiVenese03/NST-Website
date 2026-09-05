/**
 * scripts/prerender-seo.mjs
 *
 * Pre-renders authoritative Open Graph and Twitter/X metadata into static HTML files
 * for all routes in `dist/`, including:
 * 1. Homepage & non-blog pages -> Company branding social image (og-image.jpg / og-image.webp)
 * 2. Blogs listing page -> Approved blogs listing social image (og-image.jpg / og-image.webp)
 * 3. Individual blog pages -> Each blog's unique source thumbnail (16:9 JPEG, absolute URL)
 *
 * This ensures that social platforms and crawlers (Facebook, LinkedIn, Twitter/X,
 * WhatsApp, Slack, Discord, Telegram, Google, Bing) receive the exact, unique,
 * publicly accessible thumbnail without executing JavaScript.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
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

function injectMetadata(templateHtml, meta) {
  let html = templateHtml;

  // 1. Authoritative Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);

  // 2. Authoritative Meta Description
  if (html.match(/<meta\s+name=["']description["'][\s\S]*?>/i)) {
    html = html.replace(
      /<meta\s+name=["']description["'][\s\S]*?>/i,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`
    );
  }

  // 3. Authoritative Canonical Link
  if (html.match(/<link\s+rel=["']canonical["'][\s\S]*?>/i)) {
    html = html.replace(
      /<link\s+rel=["']canonical["'][\s\S]*?>/i,
      `<link rel="canonical" href="${meta.canonicalUrl}" />`
    );
  } else {
    html = html.replace("</head>", `  <link rel="canonical" href="${meta.canonicalUrl}" />\n  </head>`);
  }

  // 4. Remove any existing Open Graph or Twitter tags & comments to guarantee NO duplicate/conflicting tags
  html = html.replace(/<!--\s*(?:Open Graph|Twitter)[^>]*-->\s*/gi, "");
  html = html.replace(/<meta\s+property=["']og:[\s\S]*?>\s*/gi, "");
  html = html.replace(/<meta\s+name=["']twitter:[\s\S]*?>\s*/gi, "");

  const imageType =
    meta.imageType ||
    (meta.imageUrl.endsWith(".png")
      ? "image/png"
      : meta.imageUrl.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg");

  const ogTags = `
    <!-- Open Graph Metadata (Authoritative) -->
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="${ORG_NAME}" />
    <meta property="og:type" content="${meta.ogType || 'website'}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${meta.canonicalUrl}" />
    <meta property="og:image" content="${meta.imageUrl}" />
    <meta property="og:image:secure_url" content="${meta.imageUrl}" />
    <meta property="og:image:type" content="${imageType}" />
    <meta property="og:image:width" content="${meta.imageWidth || 1200}" />
    <meta property="og:image:height" content="${meta.imageHeight || 630}" />
    <meta property="og:image:alt" content="${escapeHtml(meta.imageAlt || meta.title)}" />

    <!-- Twitter / X Cards (Authoritative) -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${TWITTER_HANDLE}" />
    <meta name="twitter:creator" content="${TWITTER_HANDLE}" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${meta.imageUrl}" />
    <meta name="twitter:image:alt" content="${escapeHtml(meta.imageAlt || meta.title)}" />
  `;

  return html.replace("</head>", `${ogTags.trim()}\n  </head>`);
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

async function run() {
  const indexHtmlPath = path.join(dist, "index.html");
  if (!existsSync(indexHtmlPath)) {
    console.error("prerender-seo: dist/index.html does not exist. Run vite build first.");
    process.exit(1);
  }

  const baseHtml = readFileSync(indexHtmlPath, "utf-8");
  const blogPosts = await loadBlogPosts();

  console.log(`prerender-seo: Loaded ${blogPosts.length} blog posts dynamically.`);

  // 1. Homepage & Non-blog pages
  const staticPages = [
    {
      dir: dist,
      meta: {
        title: "NebulaSafeTech - Cybersecurity, VAPT & Digital Solutions in India",
        description:
          "NebulaSafeTech is a cybersecurity and digital solutions company based in Hosur, Tamil Nadu, India. Practical VAPT, secure web development, UI/UX design, and EdTech training programs for organizations worldwide.",
        canonicalUrl: `${SITE_ORIGIN}/`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: "NebulaSafeTech - Cybersecurity, VAPT & Digital Solutions in India",
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "blogs"),
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
      dir: path.join(dist, "clients"),
      meta: {
        title: `Clients & Institutional Programs | ${ORG_NAME}`,
        description:
          "Cybersecurity awareness workshops, academic MoUs, and enterprise training programs delivered across India by NebulaSafeTech.",
        canonicalUrl: `${SITE_ORIGIN}/clients`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Clients & Institutional Programs | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "edtech"),
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
  ];

  for (const page of staticPages) {
    mkdirSync(page.dir, { recursive: true });
    const rendered = injectMetadata(baseHtml, page.meta);
    writeFileSync(path.join(page.dir, "index.html"), rendered, "utf-8");
    if (page.dir !== dist) {
      writeFileSync(`${page.dir}.html`, rendered, "utf-8");
    }
  }

  // 2. Every Blog Post -> Distinct, uncropped, absolute thumbnail Open Graph
  const blogBaseDir = path.join(dist, "blog");
  mkdirSync(blogBaseDir, { recursive: true });

  for (const post of blogPosts) {
    const blogDir = path.join(blogBaseDir, post.slug);
    mkdirSync(blogDir, { recursive: true });

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
      canonicalUrl: `${SITE_ORIGIN}/blog/${post.slug}`,
      imageUrl,
      imageType,
      imageWidth: post.featuredImage?.width || 1672,
      imageHeight: post.featuredImage?.height || 941,
      imageAlt: post.featuredImage?.alt || `${post.title} | ${ORG_NAME}`,
      ogType: "article",
    };

    const renderedBlogHtml = injectMetadata(baseHtml, blogMeta);
    writeFileSync(path.join(blogDir, "index.html"), renderedBlogHtml, "utf-8");
    writeFileSync(path.join(blogBaseDir, `${post.slug}.html`), renderedBlogHtml, "utf-8");
    console.log(`prerender-seo: [OK] /blog/${post.slug} -> og:image = ${imageUrl}`);
  }

  console.log("prerender-seo: All social sharing metadata pre-rendered successfully.");
}

run().catch((err) => {
  console.error("prerender-seo error:", err);
  process.exit(1);
});
