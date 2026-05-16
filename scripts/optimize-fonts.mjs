/**
 * Subset Overcame Demo TTF → WOFF2 for brand glyphs only.
 * Run: node scripts/optimize-fonts.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, "../src/assets/fonts");
const sourcesDir = join(__dirname, "font-sources");

/** Glyphs used with --font-company (logo, loader, footer, EdTech header). */
const BRAND_TEXT =
  "NebulaSafeTech NST ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .-";

const sources = [
  { ttf: "OvercameDemoRegular.ttf", woff2: "OvercameDemoRegular.woff2", weight: 400 },
  { ttf: "OvercameDemoBold.ttf", woff2: "OvercameDemoBold.woff2", weight: 700 },
];

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const report = { before: 0, after: 0, files: [] };

for (const { ttf, woff2 } of sources) {
  const woff2Path = join(fontsDir, woff2);
  const ttfPath = existsSync(join(fontsDir, ttf))
    ? join(fontsDir, ttf)
    : join(sourcesDir, ttf);
  if (!existsSync(ttfPath)) {
    if (existsSync(woff2Path)) {
      console.log(`Skip ${ttf} (missing); ${woff2} already present.`);
      continue;
    }
    throw new Error(`Missing ${ttf} - add TTF to src/assets/fonts or scripts/font-sources.`);
  }
  const input = readFileSync(ttfPath);
  const before = input.length;
  report.before += before;

  const output = await subsetFont(input, BRAND_TEXT, {
    targetFormat: "woff2",
  });
  writeFileSync(woff2Path, output);
  report.after += output.length;
  report.files.push({ name: woff2, bytes: output.length, ttfBytes: before });

  console.log(`${ttf}: ${formatKb(before)} → ${woff2}: ${formatKb(output.length)}`);
}

console.log(`\nTotal: ${formatKb(report.before)} → ${formatKb(report.after)} (${Math.round((1 - report.after / report.before) * 100)}% smaller)`);
