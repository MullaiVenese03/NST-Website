/**
 * optimize-blog-images-3.mjs
 * Image optimization script for Blog #3 - Ransomware Data Protection
 *
 * Processes source PNGs from Docs/Blogs/#3 into optimized
 * JPEG / WebP / AVIF variants at multiple resolutions.
 *
 * Output locations:
 *   - Thumbnail/hero: public/media/blogs/ransomware-data-theft-protect-business-2026.{jpg,webp}
 *   - Article images: public/media/blogs/ransomware-data-theft-protect-business-2026/{name}-{width}.{ext}
 */

import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "Docs", "Blogs", "#3");

const slug = "ransomware-data-theft-protect-business-2026";
const outDir = path.join(root, "public", "media", "blogs", slug);
const rootMediaDir = path.join(root, "public", "media", "blogs");

mkdirSync(outDir, { recursive: true });
mkdirSync(rootMediaDir, { recursive: true });

/**
 * images[] - maps source filename → output slug name.
 * isHero: true  → also writes root-level thumbnail files used by og:image and blog cards.
 */
const images = [
  {
    srcFile: "Ransomware_Data_Protection_Thumbnail.png",
    slugName: "ransomware-data-theft-protect-business-2026",
    isHero: true,
  },
  {
    srcFile: "Modern_Ransomware_Attack_Chain.png",
    slugName: "ransomware-attack-chain",
  },
  {
    srcFile: "Old_vs_Modern_Ransomware.png",
    slugName: "ransomware-old-vs-modern",
  },
  {
    srcFile: "Backups_vs_Data_Exfiltration.png",
    slugName: "ransomware-backups-vs-exfiltration",
  },
  {
    srcFile: "7_Layers_of_Ransomware_Data_Protection.png",
    slugName: "ransomware-seven-layers-defense",
  },
  {
    srcFile: "Blast_Radius_Diagram.png",
    slugName: "ransomware-blast-radius",
  },
  {
    srcFile: "Defense-in-Depth+NEX.png",
    slugName: "ransomware-defense-in-depth-nex",
  },
];

for (const imgConfig of images) {
  const srcPath = path.join(blogDir, imgConfig.srcFile);
  if (!existsSync(srcPath)) {
    console.error(`❌  Source image not found: ${srcPath}`);
    continue;
  }

  const meta = await sharp(srcPath).metadata();
  const origWidth = meta.width || 1280;

  // Generate responsive widths - always include origWidth; filter duplicates
  const targetWidths = [640, 960, 1280, origWidth].filter(
    (w, idx, self) => w <= origWidth && self.indexOf(w) === idx
  );

  const imgName = imgConfig.slugName;

  for (const w of targetWidths) {
    const jpgFile = path.join(outDir, `${imgName}-${w}.jpg`);
    const webpFile = path.join(outDir, `${imgName}-${w}.webp`);
    const avifFile = path.join(outDir, `${imgName}-${w}.avif`);

    await sharp(srcPath)
      .resize(w)
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(jpgFile);

    await sharp(srcPath)
      .resize(w)
      .webp({ quality: 82, effort: 6 })
      .toFile(webpFile);

    await sharp(srcPath)
      .resize(w)
      .avif({ quality: 75, effort: 5 })
      .toFile(avifFile);
  }

  // Default single files (full resolution) used as fallback src
  const defaultJpg = path.join(outDir, `${imgName}.jpg`);
  const defaultWebp = path.join(outDir, `${imgName}.webp`);
  await sharp(srcPath).jpeg({ quality: 85, mozjpeg: true }).toFile(defaultJpg);
  await sharp(srcPath).webp({ quality: 82, effort: 6 }).toFile(defaultWebp);

  // Hero/thumbnail - also write to root media/blogs/ for blog card and og:image
  if (imgConfig.isHero) {
    const rootJpg = path.join(rootMediaDir, `${imgName}.jpg`);
    const rootWebp = path.join(rootMediaDir, `${imgName}.webp`);
    await sharp(srcPath).jpeg({ quality: 85, mozjpeg: true }).toFile(rootJpg);
    await sharp(srcPath).webp({ quality: 82, effort: 6 }).toFile(rootWebp);
    console.log(`✅  Hero thumbnail written to: media/blogs/${imgName}.{jpg,webp}`);
  }

  console.log(
    `✅  ${imgName} - ${origWidth}×${meta.height ?? "?"} → widths: [${targetWidths.join(", ")}] - jpg, webp, avif`
  );
}

console.log("\n🎉  Blog #3 image optimization complete.");
