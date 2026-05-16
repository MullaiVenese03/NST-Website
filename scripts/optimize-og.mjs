import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public", "og-image.png");
const outWebp = path.join(root, "public", "og-image.webp");

if (!existsSync(src)) {
  console.warn("optimize-og: public/og-image.png not found, skipping");
  process.exit(0);
}

await sharp(src)
  .resize(1200, 630, { fit: "cover", withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(outWebp);

const { size } = await import("node:fs/promises").then((fs) => fs.stat(outWebp));
console.log(`optimize-og: wrote ${outWebp} (${Math.round(size / 1024)} KB)`);
