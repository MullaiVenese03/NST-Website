/**
 * optimize-blog-images-4.mjs
 * Image optimization script for Blog #4 - Shadow AI Agents Enterprise Security Risk
 *
 * Processes source PNGs from Docs/Blogs/#4 into optimized
 * JPEG / WebP / AVIF variants at multiple resolutions.
 *
 * Output locations:
 *   - Thumbnail/hero: public/media/blogs/shadow-ai-agents-enterprise-security-risk.{jpg,webp}
 *   - Article images: public/media/blogs/shadow-ai-agents-enterprise-security-risk/{name}-{width}.{ext}
 */

import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "Docs", "Blogs", "#4");

const slug = "shadow-ai-agents-enterprise-security-risk";
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
    srcFile: "Shadow_AI_Agents_Thumbnail.png",
    slugName: "shadow-ai-agents-enterprise-security-risk",
    isHero: true,
  },
  {
    srcFile: "Shadow_Al_Agent Example.png",
    slugName: "shadow-ai-agent-example",
  },
  {
    srcFile: "The_Visibility_Problem.png",
    slugName: "shadow-ai-visibility-problem",
  },
  {
    srcFile: "What_Can_an_Unknown_Al_Agent_Access.png",
    slugName: "shadow-ai-agent-access",
  },
  {
    srcFile: "The_5_Biggest_Shadow_Al_Agent_Risks.png",
    slugName: "shadow-ai-five-risks",
  },
  {
    srcFile: "How_Shadow_Al_Agents_Create_a_Larger_Blast_Radius.png",
    slugName: "shadow-ai-blast-radius",
  },
  {
    srcFile: "How_to_Discover_and_Govern_Al_Agents_(7_Step_Process).png",
    slugName: "shadow-ai-discover-govern",
  },
  {
    srcFile: "Where_NEX_Fits_in_Controlling_Sensitive_Data_Access.png",
    slugName: "shadow-ai-nex-fits",
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

console.log("\n🎉  Blog #4 image optimization complete.");
