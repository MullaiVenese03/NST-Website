import { defineConfig, type Plugin } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

/** Charset must be the first child of <head> (within first 1024 bytes) for Lighthouse and HTML5. */
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
      const m = html.match(/<link rel="stylesheet"[^>]*>/);
      if (!m) return html;
      const cssLink = m[0].replace(/\s*crossorigin(?:="[^"]*")?/i, "");
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

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    htmlCharsetResponseHeader(),
    compression({
      algorithms: ["gzip", "brotliCompress"],
      exclude: [/\.(br|gz)$/, /\.(png|jpe?g|webp|avif|gif|svg|ico|mp4|webm)$/],
      threshold: 1024,
    }),
    moveEntryScriptToBody(),
    hoistStylesheetEarly(),
    charsetFirstInHead(),
  ],
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    modulePreload: false,
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
});
