import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcImage = path.join(root, "dist", "media", "authors", "Mullaivenese.png");
const publicAuthorsDir = path.join(root, "public", "media", "authors");
const distAuthorsDir = path.join(root, "dist", "media", "authors");

fs.mkdirSync(publicAuthorsDir, { recursive: true });
fs.mkdirSync(distAuthorsDir, { recursive: true });

async function run() {
  console.log("Reading source image:", srcImage);
  const metadata = await sharp(srcImage).metadata();
  console.log(`Source dimensions: ${metadata.width}x${metadata.height}`);

  // 1. Square Avatar (400x400), matching rajiv-sharma.webp / rajiv-sharma.jpg
  // Using top 1024x1024 crop to preserve the face, hair and suit collar with natural headroom
  const squareCrop = sharp(srcImage)
    .extract({ left: 0, top: 0, width: 1024, height: 1024 })
    .resize(400, 400);

  const squareWebpBuffer = await squareCrop.clone().webp({ quality: 90, effort: 6 }).toBuffer();
  const squarePngBuffer = await squareCrop.clone().png({ compressionLevel: 9 }).toBuffer();
  const squareJpgBuffer = await squareCrop.clone().jpeg({ quality: 90, mozjpeg: true }).toBuffer();

  // 2. Full uncropped WebP variant as well
  const fullWebpBuffer = await sharp(srcImage).webp({ quality: 90, effort: 6 }).toBuffer();
  const fullPngBuffer = await fs.promises.readFile(srcImage);

  // Define filenames to generate in both public/media/authors and dist/media/authors
  // We cover:
  // - mullaivenese (direct slug of "Mullaivenese")
  // - mullai-venese (kebab-case matching "rajiv-sharma")
  // - Mullaivenese (exact source casing)
  const targets = [
    { base: "mullaivenese", ext: ".webp", buffer: squareWebpBuffer },
    { base: "mullaivenese", ext: ".png", buffer: squarePngBuffer },
    { base: "mullaivenese", ext: ".jpg", buffer: squareJpgBuffer },
    { base: "mullai-venese", ext: ".webp", buffer: squareWebpBuffer },
    { base: "mullai-venese", ext: ".png", buffer: squarePngBuffer },
    { base: "mullai-venese", ext: ".jpg", buffer: squareJpgBuffer },
    { base: "Mullaivenese", ext: ".webp", buffer: squareWebpBuffer },
    { base: "Mullaivenese-full", ext: ".webp", buffer: fullWebpBuffer },
    { base: "Mullaivenese-full", ext: ".png", buffer: fullPngBuffer },
  ];

  // Save to public/media/authors
  for (const item of targets) {
    const pubPath = path.join(publicAuthorsDir, `${item.base}${item.ext}`);
    await fs.promises.writeFile(pubPath, item.buffer);
    console.log(`Saved: public/media/authors/${item.base}${item.ext} (${item.buffer.length} bytes)`);

    const distPath = path.join(distAuthorsDir, `${item.base}${item.ext}`);
    await fs.promises.writeFile(distPath, item.buffer);
    console.log(`Saved: dist/media/authors/${item.base}${item.ext} (${item.buffer.length} bytes)`);
  }

  // Also ensure original Mullaivenese.png is in public/media/authors
  const publicOriginalPng = path.join(publicAuthorsDir, "Mullaivenese.png");
  if (!fs.existsSync(publicOriginalPng)) {
    await fs.promises.writeFile(publicOriginalPng, fullPngBuffer);
    console.log(`Copied original Mullaivenese.png to public/media/authors/`);
  }

  // Cleanup temporary test files
  const tempFiles = [
    "crop-top0.webp",
    "crop-top50.webp",
    "test-attention.webp",
    "test-entropy.webp",
    "test-top.webp",
    "test-offset.webp",
  ];
  for (const f of tempFiles) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) {
      await fs.promises.unlink(p);
      console.log(`Cleaned up temp file: ${f}`);
    }
  }

  console.log("All author profile assets generated successfully!");
}

run().catch((err) => {
  console.error("Error generating profiles:", err);
  process.exit(1);
});
