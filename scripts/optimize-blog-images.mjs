/**
 * optimize-blog-images.mjs
 * Unified Blog Image Optimization & Asset Pipeline for NebulaSafeTech
 *
 * Processes master image assets from `Docs/Blogs/#<id>/` into production-ready,
 * SEO-optimized, responsive WebP, MozJPEG, and AVIF variants in `public/media/blogs/`.
 *
 * Usage:
 *   node scripts/optimize-blog-images.mjs --all          # Process all registered blogs
 *   node scripts/optimize-blog-images.mjs --blog 2       # Process a specific blog by number (e.g. 2)
 *   node scripts/optimize-blog-images.mjs --slug <slug>  # Process by blog slug
 *   node scripts/optimize-blog-images.mjs --help         # Show CLI help
 */

import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogsBaseDir = path.join(root, "Docs", "Blogs");
const mediaRootDir = path.join(root, "public", "media", "blogs");

mkdirSync(mediaRootDir, { recursive: true });

/**
 * Registry of blog image configurations.
 * To add a new blog in the future (e.g. Blog #7), simply add an entry here.
 */
export const BLOG_IMAGE_REGISTRY = [
  {
    blogNumber: 1,
    folderName: "#1",
    slug: "how-to-start-career-cybersecurity",
    thumbnail: {
      srcFile: "How to Start a Career in Cybersecurity in 2026_ A Practical Beginner's Guide-Thumbnail.jpg",
      outputBaseName: "cybersecurity-career-beginner-roadmap-guide",
      generatePng: false,
    },
    images: [],
  },
  {
    blogNumber: 2,
    folderName: "#2",
    slug: "ai-agents-enterprise-data-security",
    thumbnail: {
      srcFile: "AI_Agents_Enterprise_Data_Security_Thumbnail.png",
      outputBaseName: "ai-agents-sensitive-enterprise-data-access",
      generatePng: true,
    },
    images: [
      { srcFile: "01-hero-boundary.png", slugName: "ai-agent-hero-boundary" },
      { srcFile: "02-rovo-prompt-injection.png", slugName: "ai-agent-prompt-injection-chain" },
      { srcFile: "03-traditional-vs-agentic.png", slugName: "ai-agent-enterprise-access-path" },
      { srcFile: "04-seven-security-risks.png", slugName: "ai-agent-security-risks" },
      { srcFile: "05-industry-blast-radius.png", slugName: "ai-agent-industry-blast-radius" },
      { srcFile: "06-security-checklist.png", slugName: "ai-agent-security-checklist" },
      { srcFile: "07-defense-in-depth-nex.png", slugName: "ai-agent-defense-in-depth-nex" },
    ],
  },
  {
    blogNumber: 3,
    folderName: "#3",
    slug: "ransomware-data-theft-protect-business-2026",
    thumbnail: {
      srcFile: "Ransomware_Data_Protection_Thumbnail.png",
      outputBaseName: "ransomware-data-theft-extortion-protection",
      generatePng: false,
    },
    images: [
      { srcFile: "Modern_Ransomware_Attack_Chain.png", slugName: "ransomware-attack-chain" },
      { srcFile: "Old_vs_Modern_Ransomware.png", slugName: "ransomware-old-vs-modern" },
      { srcFile: "Backups_vs_Data_Exfiltration.png", slugName: "ransomware-backups-vs-exfiltration" },
      { srcFile: "7_Layers_of_Ransomware_Data_Protection.png", slugName: "ransomware-seven-layers-defense" },
      { srcFile: "Blast_Radius_Diagram.png", slugName: "ransomware-blast-radius" },
      { srcFile: "Defense-in-Depth+NEX.png", slugName: "ransomware-defense-in-depth-nex" },
    ],
  },
  {
    blogNumber: 4,
    folderName: "#4",
    slug: "shadow-ai-agents-enterprise-security-risk",
    thumbnail: {
      srcFile: "Shadow_AI_Agents_Thumbnail.png",
      outputBaseName: "shadow-ai-agents-enterprise-security-risk",
      generatePng: false,
    },
    images: [
      { srcFile: "Shadow_Al_Agent Example.png", slugName: "shadow-ai-agent-example" },
      { srcFile: "The_Visibility_Problem.png", slugName: "shadow-ai-visibility-problem" },
      { srcFile: "What_Can_an_Unknown_Al_Agent_Access.png", slugName: "shadow-ai-agent-access" },
      { srcFile: "The_5_Biggest_Shadow_Al_Agent_Risks.png", slugName: "shadow-ai-five-risks" },
      { srcFile: "How_Shadow_Al_Agents_Create_a_Larger_Blast_Radius.png", slugName: "shadow-ai-blast-radius" },
      { srcFile: "How_to_Discover_and_Govern_Al_Agents_(7_Step_Process).png", slugName: "shadow-ai-discover-govern" },
      { srcFile: "Where_NEX_Fits_in_Controlling_Sensitive_Data_Access.png", slugName: "shadow-ai-nex-fits" },
    ],
  },
  {
    blogNumber: 5,
    folderName: "#5",
    slug: "ai-agent-security-identity-access-enterprise-data",
    thumbnail: {
      srcFile: "AI_Agent_Identity_Data_Access_Thumbnail.png",
      outputBaseName: "ai-agent-identity-enterprise-data-access",
      generatePng: true,
    },
    images: [],
  },
  {
    blogNumber: 6,
    folderName: "#6",
    slug: "data-sovereignty-ai-sensitive-enterprise-files",
    thumbnail: {
      srcFile: "Data_Sovereignty_AI_Sensitive_Enterprise_Files_Thumbnail.png",
      outputBaseName: "data-sovereignty-ai-sensitive-enterprise-files",
      generatePng: true,
    },
    images: [],
  },
];

/**
 * Optimizes an image asset at specified widths and formats.
 */
async function processImage(srcPath, outDir, baseName, targetWidths, options = {}) {
  mkdirSync(outDir, { recursive: true });

  for (const w of targetWidths) {
    const webpFile = path.join(outDir, `${baseName}-${w}.webp`);
    const jpgFile = path.join(outDir, `${baseName}-${w}.jpg`);
    const avifFile = path.join(outDir, `${baseName}-${w}.avif`);

    await sharp(srcPath)
      .resize(w)
      .webp({ quality: 82, effort: 6 })
      .toFile(webpFile);

    await sharp(srcPath)
      .resize(w)
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(jpgFile);

    await sharp(srcPath)
      .resize(w)
      .avif({ quality: 75, effort: 5 })
      .toFile(avifFile);
  }

  // Standard full-resolution exports
  const defaultWebp = path.join(outDir, `${baseName}.webp`);
  const defaultJpg = path.join(outDir, `${baseName}.jpg`);

  await sharp(srcPath).webp({ quality: 84, effort: 6 }).toFile(defaultWebp);
  await sharp(srcPath).jpeg({ quality: 85, mozjpeg: true }).toFile(defaultJpg);

  if (options.generatePng) {
    const defaultPng = path.join(outDir, `${baseName}.png`);
    await sharp(srcPath).png({ compressionLevel: 8 }).toFile(defaultPng);
  }
}

/**
 * Processes all assets for a single blog entry.
 */
async function processBlog(config) {
  console.log(`\n========================================`);
  console.log(`Processing Blog #${config.blogNumber}: ${config.slug}`);
  console.log(`Source Folder: Docs/Blogs/${config.folderName}`);
  console.log(`========================================`);

  const blogSrcDir = path.join(blogsBaseDir, config.folderName);
  if (!existsSync(blogSrcDir)) {
    console.warn(`[WARN] Source directory not found: ${blogSrcDir}`);
    return;
  }

  const articleImgDir = path.join(mediaRootDir, config.slug);

  // 1. Process Thumbnail
  if (config.thumbnail) {
    const thumbSrc = path.join(blogSrcDir, config.thumbnail.srcFile);
    if (existsSync(thumbSrc)) {
      const meta = await sharp(thumbSrc).metadata();
      const origWidth = meta.width || 1280;
      const targetWidths = [640, 960, 1280, origWidth].filter(
        (w, idx, self) => w <= origWidth && self.indexOf(w) === idx
      );

      console.log(`→ Processing Thumbnail: ${config.thumbnail.outputBaseName} (${origWidth}x${meta.height})`);

      // Write root thumbnail files for OG / card previews
      const rootWebp = path.join(mediaRootDir, `${config.thumbnail.outputBaseName}.webp`);
      const rootJpg = path.join(mediaRootDir, `${config.thumbnail.outputBaseName}.jpg`);
      await sharp(thumbSrc).webp({ quality: 84, effort: 6 }).toFile(rootWebp);
      await sharp(thumbSrc).jpeg({ quality: 85, mozjpeg: true }).toFile(rootJpg);
      if (config.thumbnail.generatePng) {
        const rootPng = path.join(mediaRootDir, `${config.thumbnail.outputBaseName}.png`);
        await sharp(thumbSrc).png({ compressionLevel: 8 }).toFile(rootPng);
      }

      // Write responsive variants subfolder
      const thumbSubDir = path.join(mediaRootDir, config.thumbnail.outputBaseName);
      await processImage(thumbSrc, thumbSubDir, config.thumbnail.outputBaseName, targetWidths, {
        generatePng: config.thumbnail.generatePng,
      });
      console.log(`  [OK] Exported root & responsive thumbnail assets`);
    } else {
      console.warn(`  [WARN] Thumbnail source file not found: ${thumbSrc}`);
    }
  }

  // 2. Process Inline Article Graphics
  if (config.images && config.images.length > 0) {
    mkdirSync(articleImgDir, { recursive: true });
    for (const img of config.images) {
      const imgPath = path.join(blogSrcDir, img.srcFile);
      if (!existsSync(imgPath)) {
        console.warn(`  [WARN] Article image not found: ${img.srcFile}`);
        continue;
      }

      const meta = await sharp(imgPath).metadata();
      const origWidth = meta.width || 1280;
      const targetWidths = [640, 960, 1280, origWidth].filter(
        (w, idx, self) => w <= origWidth && self.indexOf(w) === idx
      );

      console.log(`→ Processing Article Graphic: ${img.slugName} (${origWidth}x${meta.height})`);
      await processImage(imgPath, articleImgDir, img.slugName, targetWidths);
      console.log(`  [OK] Exported ${img.slugName}`);
    }
  }
}

// -----------------------------------------------------------------------------
// CLI Handler
// -----------------------------------------------------------------------------
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
NebulaSafeTech Blog Image Optimization Pipeline

Options:
  --all               Process all registered blogs (default)
  --blog <number>     Process a specific blog number (e.g. --blog 2)
  --slug <slug>       Process a specific blog by slug (e.g. --slug shadow-ai-agents-enterprise-security-risk)
  --help              Display this help message
`);
  process.exit(0);
}

let targets = BLOG_IMAGE_REGISTRY;

const blogIdx = args.indexOf("--blog");
if (blogIdx !== -1 && args[blogIdx + 1]) {
  const num = parseInt(args[blogIdx + 1], 10);
  targets = BLOG_IMAGE_REGISTRY.filter((b) => b.blogNumber === num);
  if (targets.length === 0) {
    console.error(`Error: Blog #${num} not found in registry.`);
    process.exit(1);
  }
}

const slugIdx = args.indexOf("--slug");
if (slugIdx !== -1 && args[slugIdx + 1]) {
  const targetSlug = args[slugIdx + 1];
  targets = BLOG_IMAGE_REGISTRY.filter((b) => b.slug === targetSlug);
  if (targets.length === 0) {
    console.error(`Error: Blog with slug "${targetSlug}" not found in registry.`);
    process.exit(1);
  }
}

console.log(`Starting image processing for ${targets.length} blog(s)...`);
for (const blogConfig of targets) {
  await processBlog(blogConfig);
}
console.log("\nImage pipeline completed successfully!\n");
