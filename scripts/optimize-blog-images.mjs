import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "Docs", "Blogs", "#2");

const slug = "ai-agents-enterprise-data-security";
const outDir = path.join(root, "public", "media", "blogs", slug);
const rootMediaDir = path.join(root, "public", "media", "blogs");

mkdirSync(outDir, { recursive: true });
mkdirSync(rootMediaDir, { recursive: true });

const images = [
  {
    srcFile: "AI_Agents_Enterprise_Data_Security_Thumbnail.png",
    slugName: "ai-agents-enterprise-data-security",
    isHero: true,
  },
  {
    srcFile: "01-hero-boundary.png",
    slugName: "ai-agent-hero-boundary",
  },
  {
    srcFile: "02-rovo-prompt-injection.png",
    slugName: "ai-agent-prompt-injection-chain",
  },
  {
    srcFile: "03-traditional-vs-agentic.png",
    slugName: "ai-agent-enterprise-access-path",
  },
  {
    srcFile: "04-seven-security-risks.png",
    slugName: "ai-agent-security-risks",
  },
  {
    srcFile: "05-industry-blast-radius.png",
    slugName: "ai-agent-industry-blast-radius",
  },
  {
    srcFile: "06-security-checklist.png",
    slugName: "ai-agent-security-checklist",
  },
  {
    srcFile: "07-defense-in-depth-nex.png",
    slugName: "ai-agent-defense-in-depth-nex",
  },
];

for (const imgConfig of images) {
  const srcPath = path.join(blogDir, imgConfig.srcFile);
  if (!existsSync(srcPath)) {
    console.error(`Source image not found: ${srcPath}`);
    continue;
  }

  const meta = await sharp(srcPath).metadata();
  const origWidth = meta.width || 1280;
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

  // Also create default single files
  const defaultJpg = path.join(outDir, `${imgName}.jpg`);
  const defaultWebp = path.join(outDir, `${imgName}.webp`);
  await sharp(srcPath).jpeg({ quality: 85, mozjpeg: true }).toFile(defaultJpg);
  await sharp(srcPath).webp({ quality: 82, effort: 6 }).toFile(defaultWebp);

  if (imgConfig.isHero) {
    const rootJpg = path.join(rootMediaDir, `${imgName}.jpg`);
    const rootWebp = path.join(rootMediaDir, `${imgName}.webp`);
    const rootPng = path.join(rootMediaDir, `${imgName}.png`);
    await sharp(srcPath).jpeg({ quality: 85, mozjpeg: true }).toFile(rootJpg);
    await sharp(srcPath).webp({ quality: 82, effort: 6 }).toFile(rootWebp);
    await sharp(srcPath).png({ compressionLevel: 8 }).toFile(rootPng);
  }

  console.log(`Successfully generated optimized variants for ${imgName} (${meta.width}x${meta.height})`);
}

