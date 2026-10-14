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

  // Prerender above-the-fold critical HTML shell for homepage into #root to eliminate LCP render delay
  if (routePath === "/") {
    const heroShell = `<div class="bg-white min-h-screen overflow-x-clip w-full max-w-[100vw]"><nav aria-label="Primary" class="absolute top-4 sm:top-5 left-4 sm:left-6 md:left-[50px] z-20 inline-flex items-center min-h-[44px] sm:min-h-[48px] md:min-h-[52px] px-3.5 sm:px-4 md:px-5 py-2 rounded-full" style="background: rgba(255,255,255,0.55); backdrop-filter: blur(18px) saturate(180%); -webkit-backdrop-filter: blur(18px) saturate(180%); border: 1px solid rgba(255,255,255,0.55); box-shadow: 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6);"><div class="flex items-center gap-2.5 sm:gap-3 cursor-pointer border-none bg-transparent p-0 text-left rounded-xl"><div class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0 flex items-center justify-center"><img src="/company-icon-72.webp" alt="NebulaSafeTech logo" width="36" height="36" decoding="async" fetchpriority="high" class="w-full h-full object-contain block" /></div><span class="text-lg md:text-xl font-black uppercase tracking-wider text-gray-900 select-none relative sm:top-[-4px] md:top-[-8px] lg:top-[-8px]" style="font-family: var(--font-company); line-height: 1;">NebulaSafeTech</span></div></nav><div class="w-full relative z-10 min-w-0"><main id="main-content"><div id="hero" class="relative w-full" style="position: relative;"><section class="relative flex min-h-dvh w-full flex-col overflow-hidden" aria-label="Hero"><div class="absolute inset-0 z-0 m-0 p-0 overflow-hidden bg-white" aria-hidden="true"><div class="absolute inset-0 h-full w-full overflow-hidden"></div></div><div class="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col items-center justify-evenly px-4 pb-10 pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:px-5 md:items-start md:justify-center md:px-10 md:pb-16 md:pt-24 lg:px-[50px]"><div class="flex w-full max-w-[min(100%,44rem)] flex-col items-center gap-8 text-center md:max-w-3xl md:items-start md:gap-6 md:text-left" style="will-change: transform, opacity; transform: translateZ(0);"><h1 class="nst-h1-hero max-w-full text-gray-900"><span class="flex flex-col gap-1"><span><span class="text-[#015aaa]">One</span> Entry.</span><span><span class="text-[#015aaa]">One</span> Device.</span><span><span class="text-[#015aaa]">One</span> Purpose.</span></span></h1><p class="nst-body-sm max-w-xl text-gray-600">Cybersecurity and IT solutions built to protect what matters most - your data, your systems, your future.</p><div class="nst-small flex flex-wrap items-center justify-center gap-2 text-gray-500 md:justify-start"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 shrink-0 text-[#015aaa]" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg><span>Trusted by enterprises Worldwide</span></div></div></div></section></div></main></div></div>`;
    html = html.replace('<div id="root"></div>', `<div id="root">${heroShell}</div>`);
  }

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
          "NebulaSafeTech delivers VAPT cybersecurity, secure web application development, UI/UX design, and practical EdTech training programs.",
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
          "Learn how NebulaSafeTech's defenders-first engineering team in Hosur, India delivers enterprise cybersecurity, secure software, and innovation.",
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
          "Explore NebulaSafeTech services including VAPT security assessments, full-stack web engineering, UI/UX product design, and corporate training.",
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
          "Explore testimonials, cybersecurity awareness workshops, academic MoUs, and enterprise training programs delivered across India by NebulaSafeTech.",
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
          "Protect systems with comprehensive VAPT assessments, application security, cloud auditing, network hardening, and actionable remediation from NST.",
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
          "Build scalable, high-performance web applications with modern React stacks, secure development lifecycles, and cloud-ready architectures from NST.",
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
          "Craft accessible, conversion-focused interfaces, design systems, and seamless user experiences for SaaS platforms and modern digital products.",
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
          "Advance technical capabilities through hands-on cybersecurity labs, industry certifications, and institutional learning programs from NST.",
        canonicalUrl: `${SITE_ORIGIN}/services/edtech-training`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `EdTech & Cybersecurity Training | ${ORG_NAME}`,
        ogType: "website",
      },
    },
    {
      dir: path.join(dist, "contact"),
      routePath: "/contact",
      meta: {
        title: `Contact ${ORG_NAME} | Cybersecurity, Web Development & Training Inquiries`,
        description:
          "Get in touch with NebulaSafeTech to discuss cybersecurity assessments, custom web engineering, UI/UX design, or institutional training programs.",
        canonicalUrl: `${SITE_ORIGIN}/contact`,
        imageUrl: DEFAULT_OG_IMAGE,
        imageType: "image/jpeg",
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: `Contact ${ORG_NAME} | Cybersecurity, Web Development & Training Inquiries`,
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
