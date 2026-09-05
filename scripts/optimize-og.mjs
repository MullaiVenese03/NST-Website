import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public", "og-image.png");
const outWebp = path.join(root, "public", "og-image.webp");
const outJpg = path.join(root, "public", "og-image.jpg");

if (!existsSync(src)) {
  console.warn("optimize-og: public/og-image.png not found, skipping");
  process.exit(0);
}

await sharp(src)
  .resize(1200, 630, { fit: "cover", withoutEnlargement: true })
  .webp({ quality: 85, effort: 6 })
  .toFile(outWebp);

await sharp(src)
  .resize(1200, 630, { fit: "cover", withoutEnlargement: true })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outJpg);

const { size: sizeWebp } = await import("node:fs/promises").then((fs) => fs.stat(outWebp));
const { size: sizeJpg } = await import("node:fs/promises").then((fs) => fs.stat(outJpg));
console.log(`optimize-og: wrote ${outWebp} (${Math.round(sizeWebp / 1024)} KB), ${outJpg} (${Math.round(sizeJpg / 1024)} KB)`);
