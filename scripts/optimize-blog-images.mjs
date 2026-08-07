import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(
  root,
  "Docs",
  "Blogs",
  "#1",
  "How to Start a Career in Cybersecurity in 2026_ A Practical Beginner's Guide-Thumbnail.jpg"
);

const outDir = path.join(root, "public", "media", "blogs", "how-to-start-career-cybersecurity-2026");
const rootMediaDir = path.join(root, "public", "media", "blogs");

if (!existsSync(src)) {
  console.error("Source thumbnail not found:", src);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
mkdirSync(rootMediaDir, { recursive: true });

const widths = [640, 960, 1280];

for (const w of widths) {
  const jpgFile = path.join(outDir, `how-to-start-career-cybersecurity-2026-${w}.jpg`);
  const webpFile = path.join(outDir, `how-to-start-career-cybersecurity-2026-${w}.webp`);
  const avifFile = path.join(outDir, `how-to-start-career-cybersecurity-2026-${w}.avif`);

  await sharp(src)
    .resize(w)
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(jpgFile);

  await sharp(src)
    .resize(w)
    .webp({ quality: 82, effort: 6 })
    .toFile(webpFile);

  await sharp(src)
    .resize(w)
    .avif({ quality: 75, effort: 5 })
    .toFile(avifFile);
}

const defaultJpg = path.join(rootMediaDir, "how-to-start-career-cybersecurity-2026.jpg");
const defaultWebp = path.join(rootMediaDir, "how-to-start-career-cybersecurity-2026.webp");

await sharp(src).jpeg({ quality: 85, mozjpeg: true }).toFile(defaultJpg);
await sharp(src).webp({ quality: 82, effort: 6 }).toFile(defaultWebp);

const { size: defaultSize } = await stat(defaultWebp);
console.log(`Successfully generated optimized Blog #1 images in ${outDir} and default WebP (${Math.round(defaultSize / 1024)} KB)`);
