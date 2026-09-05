import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(
  root,
  "public",
  "media",
  "NST_-_Favicon_[Dark_Transparent]",
  "NST_-_Favicon_[Dark_Transparent]-480.webp",
);

const outIco = path.join(root, "public", "favicon.ico");
const outPng32 = path.join(root, "public", "favicon-32x32.png");
const outApple = path.join(root, "public", "apple-touch-icon.png");
const outWebp128 = path.join(root, "public", "company-icon-128.webp");
const outPng192 = path.join(root, "public", "icon-192.png");

if (!existsSync(src)) {
  console.warn("generate-favicons: source webp not found, skipping");
  process.exit(0);
}

const input = sharp(src);

await input.clone().resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(outPng32);

await input
  .clone()
  .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(outApple);

await input.clone().resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 85 }).toFile(outWebp128);

await input.clone().resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(outPng192);

const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map((size) =>
    input.clone().resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
  ),
);

await writeFile(outIco, await buildIco(pngBuffers, sizes));

console.log("generate-favicons: wrote", outIco, outPng32, outApple, outWebp128, outPng192);

/** Minimal ICO writer (PNG-embedded icons for modern browsers). */
async function buildIco(buffers, dimensions) {
  const count = buffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = buffers.map((buf, i) => {
    const entry = { width: dimensions[i], height: dimensions[i], size: buf.length, offset };
    offset += buf.length;
    return entry;
  });

  const totalSize = offset;
  const out = Buffer.alloc(totalSize);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  entries.forEach((e, i) => {
    const base = 6 + i * 16;
    out.writeUInt8(e.width >= 256 ? 0 : e.width, base);
    out.writeUInt8(e.height >= 256 ? 0 : e.height, base + 1);
    out.writeUInt8(0, base + 2);
    out.writeUInt8(0, base + 3);
    out.writeUInt16LE(1, base + 4);
    out.writeUInt16LE(32, base + 6);
    out.writeUInt32LE(e.size, base + 8);
    out.writeUInt32LE(e.offset, base + 12);
  });

  buffers.forEach((buf, i) => buf.copy(out, entries[i].offset));
  return out;
}
