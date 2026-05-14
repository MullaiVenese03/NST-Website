import { defineConfig, type Plugin } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

function hoistStylesheetEarly(): Plugin {
  return {
    name: "hoist-stylesheet-early",
    apply: "build",
    enforce: "post",
    transformIndexHtml(html) {
      const m = html.match(/<link rel="stylesheet"[^>]*>/);
      if (!m) return html;
      let cssLink = m[0].replace(/\s*crossorigin(?:="[^"]*")?/i, "");
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

function previewCharsetHeader(): Plugin {
  return {
    name: "preview-charset-header",
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

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    moveEntryScriptToBody(),
    hoistStylesheetEarly(),
    previewCharsetHeader(),
  ],
  build: {
    modulePreload: false,
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
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  assetsInclude: ["**/*.svg", "**/*.csv", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp", "**/*.mp4"],
});
