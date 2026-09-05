import { defineConfig, loadEnv, type Plugin } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

function analyticsEnabled(env: Record<string, string>, mode: string): boolean {
  const flag = env.VITE_ENABLE_ANALYTICS;
  if (flag === "false") return false;
  if (flag === "true") return true;
  return mode === "production";
}

function injectAnalyticsHtml(env: Record<string, string>, mode: string): Plugin {
  const enabled = analyticsEnabled(env, mode);
  const gtmId = env.VITE_GTM_ID || "GTM-WTQS44T7";
  const gsc = env.VITE_GSC_VERIFICATION?.trim() ?? "";

  const gtmHead = enabled
    ? `<!-- Google Tag Manager (Deferred to avoid main-thread blocking) -->
<script>
window.dataLayer = window.dataLayer || [];
function loadGTM() {
  if (window._gtmLoaded) return;
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;
  window._gtmLoaded = true;
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');
}
if ('requestIdleCallback' in window) {
  requestIdleCallback(loadGTM, { timeout: 4000 });
} else {
  window.addEventListener('load', function() { setTimeout(loadGTM, 2000); });
}
['scroll', 'touchstart', 'click'].forEach(function(e) {
  window.addEventListener(e, loadGTM, { once: true, passive: true });
});
</script>
<!-- End Google Tag Manager -->`
    : "";

  const gtmBody = enabled
    ? `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`
    : "";

  const preconnect = enabled
    ? `<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />`
    : "";

  const gscMeta = gsc ? `<meta name="google-site-verification" content="${gsc}" />` : "";

  return {
    name: "inject-analytics-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        let out = html;
        if (out.includes("<!-- NST_ANALYTICS_HEAD -->")) {
          out = out.replace(
            "<!-- NST_ANALYTICS_HEAD -->",
            `${gtmHead}\n    ${preconnect}\n    ${gscMeta}`.trim() || "",
          );
        }
        if (out.includes("<!-- NST_ANALYTICS_BODY -->")) {
          out = out.replace("<!-- NST_ANALYTICS_BODY -->", gtmBody || "");
        }
        return out;
      },
    },
  };
}

function charsetFirstInHead(): Plugin {
  const charsetTag = '<meta charset="UTF-8" />';
  return {
    name: "charset-first-in-head",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(/<head([^>]*)>([\s\S]*?)<\/head>/i, (_, attrs, inner) => {
          const body = inner.replace(/<meta\s+charset=["']?utf-8["']?\s*\/?>\s*/gi, "");
          return `<head${attrs}>${charsetTag}${body}</head>`;
        });
      },
    },
  };
}

/** Mirrors vercel.json CSP on preview so Formspree/CSP issues reproduce locally. */
function vercelCspOnPreview(): Plugin {
  const csp =
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://formspree.io; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.clarity.ms https://www.clarity.ms https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://www.google-analytics.com https://*.clarity.ms https://*.bing.com https://i.ytimg.com https://*.ytimg.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://formspree.io https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://*.bing.com https://cloudflareinsights.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://fonts.googleapis.com https://fonts.gstatic.com; frame-src 'self' https://www.googletagmanager.com https://www.youtube-nocookie.com https://www.youtube.com; media-src 'self'; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests";
  return {
    name: "vercel-csp-on-preview",
    configurePreviewServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader("Content-Security-Policy", csp);
        next();
      });
    },
  };
}

function mockVercelOnPreview(): Plugin {
  return {
    name: "mock-vercel-on-preview",
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/_vercel/")) {
          res.setHeader("Content-Type", "application/javascript");
          res.end("// vercel mock");
          return;
        }
        next();
      });
    },
  };
}

function htmlCharsetResponseHeader(): Plugin {
  return {
    name: "html-charset-response-header",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const p = req.url?.split("?")[0] ?? "";
        if (p === "/" || p.endsWith(".html")) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const p = req.url?.split("?")[0] ?? "";
        if (p === "/" || p.endsWith(".html")) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
        }
        next();
      });
    },
  };
}

function hoistStylesheetEarly(): Plugin {
  return {
    name: "hoist-stylesheet-early",
    apply: "build",
    enforce: "post",
    transformIndexHtml(html) {
      const m = html.match(/<link rel="stylesheet"[^>]*href="[^"]*\/assets\/[^"]*\.css"[^>]*>/i);
      if (!m) return html;
      const cssLink = m[0];
      const stripped = html.replace(m[0], "");
      if (!stripped.includes("</title>")) return html;
      return stripped.replace("</title>", `</title>\n    ${cssLink}`);
    },
  };
}

function moveEntryScriptToBody(): Plugin {
  return {
    name: "move-entry-script-to-body",
    apply: "build",
    transformIndexHtml(html) {
      const cross = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>\s*/);
      const plain = html.match(/<script type="module" src="([^"]+)"><\/script>\s*/);
      const match = cross || plain;
      if (!match) return html;
      const src = match[1];
      const tag = `<script type="module" src="${src}"></script>\n    `;
      const without = html.replace(match[0], "");
      if (!without.includes("</body>")) return html;
      return without.replace("</body>", `${tag}</body>`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
  plugins: [
    injectAnalyticsHtml(env, mode),
    react(),
    tailwindcss(),
    htmlCharsetResponseHeader(),
    vercelCspOnPreview(),
    mockVercelOnPreview(),
    compression({
      algorithms: ["gzip", "brotliCompress"],
      exclude: [/\.(br|gz)$/, /\.(png|jpe?g|webp|avif|gif|svg|ico|mp4|webm)$/],
      threshold: 1024,
    }),
    moveEntryScriptToBody(),
    hoistStylesheetEarly(),
    charsetFirstInHead(),
  ],
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
    legalComments: "none",
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    modulePreload: true,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react-router")) {
            return "router";
          }
          if (id.includes("node_modules/motion")) {
            return "motion";
          }
          if (id.includes("node_modules/react-helmet-async")) {
            return "helmet";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  assetsInclude: [
    "**/*.svg",
    "**/*.csv",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.webp",
    "**/*.woff2",
    "**/*.mp4",
  ],
};
});
