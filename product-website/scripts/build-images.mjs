/**
 * Turns the photographs in /new-images into web-sized derivatives.
 *
 *   node scripts/build-images.mjs
 *
 * The originals are 1–8 MB JPEGs up to 6400px wide. Serving those directly
 * would be the single worst thing on the site for performance, and
 * `next.config.ts` sets `images: { unoptimized: true }`, so Next will not
 * resize anything at request time — the resizing has to happen here.
 *
 * Each source produces a set of WebP widths plus one JPEG fallback at the
 * largest width. Components render them through a `srcset`, so a phone
 * downloads the 640px file and a desktop the 1920px one. WebP is safe without
 * a `<picture>` dance: Next 16 already requires Chrome 111+ / Safari 16.4+,
 * all of which decode it.
 *
 * Re-running is cheap and idempotent — it overwrites the derivatives and never
 * touches the originals, which stay out of `public/` so they are never served.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve(process.cwd(), "../new-images");
const OUT_DIR = path.resolve(process.cwd(), "public/images");

/**
 * Semantic name → source file and the widths that name is actually rendered at.
 *
 * Named for the job each photograph does, not the photographer, so a component
 * asks for `hero-homes` and swapping the underlying picture is a one-line
 * change here rather than a search across the codebase.
 */
const ASSETS = [
  // Full-bleed hero. Wide, with a large area of plain sky for the headline.
  { name: "hero-homes", file: "braden-jarvis-Z6WmHx0nQXw-unsplash.jpg", widths: [640, 1024, 1600, 2400] },

  // Property type cards.
  { name: "type-apartments", file: "etienne-beauregard-riverin-B0aCvAVSX8E-unsplash.jpg", widths: [480, 800, 1200] },
  { name: "type-villas", file: "naomi-ellsworth-EMPLSuvDuhQ-unsplash.jpg", widths: [480, 800, 1200] },
  { name: "type-houses", file: "matt-jones-xpDHTc-pkog-unsplash.jpg", widths: [480, 800, 1200] },

  // Editorial banners.
  { name: "editorial-neighbourhoods", file: "breno-assis-r3WAWU5Fi5Q-unsplash.jpg", widths: [640, 1024, 1600, 2400] },
  { name: "editorial-living", file: "clay-banks-obnpdOXBaU8-unsplash.jpg", widths: [480, 800, 1200] },
  { name: "editorial-interior", file: "lotus-design-n-print-wRzBarqn3hs-unsplash.jpg", widths: [640, 1024, 1600] },
  { name: "editorial-doorway", file: "austin-wehrwein-EZERpkl3Lso-unsplash.jpg", widths: [480, 800, 1200] },
  { name: "editorial-gables", file: "alexander-andrews-A3DPhhAL6Zg-unsplash.jpg", widths: [480, 800, 1200] },

  // Guide headers.
  { name: "guide-bedroom", file: "steven-ungermann-ydudT6TqqmI-unsplash.jpg", widths: [640, 1024, 1600] },
  { name: "guide-keys-in-door", file: "jaye-haych-7tkDoo2L_Eg-unsplash.jpg", widths: [640, 1024, 1600] },
  { name: "guide-handover", file: "jakub-zerdzicki-Ebj87ehFNNU-unsplash.jpg", widths: [640, 1024, 1600] },
];

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`No source directory at ${SOURCE_DIR}`);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const available = new Set(await readdir(SOURCE_DIR));
  const report = [];

  for (const asset of ASSETS) {
    if (!available.has(asset.file)) {
      console.warn(`  ! missing source for ${asset.name}: ${asset.file}`);
      continue;
    }

    const source = path.join(SOURCE_DIR, asset.file);
    const meta = await sharp(source).metadata();
    const widths = asset.widths.filter((w) => w <= meta.width);
    const largest = Math.max(...widths);
    let total = 0;

    for (const width of widths) {
      const out = path.join(OUT_DIR, `${asset.name}-${width}.webp`);
      const info = await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(out);
      total += info.size;
    }

    // One JPEG at the largest width, for anything that cannot take a srcset
    // (Open Graph tags, mail clients, and any future non-browser consumer).
    const fallback = path.join(OUT_DIR, `${asset.name}.jpg`);
    const fallbackInfo = await sharp(source)
      .resize({ width: largest, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(fallback);
    total += fallbackInfo.size;

    report.push({
      name: asset.name,
      source: `${meta.width}x${meta.height}`,
      widths: widths.join(", "),
      kb: Math.round(total / 1024),
    });
  }

  console.table(report);

  // A machine-readable list of what exists, so the TypeScript manifest and this
  // script cannot drift apart silently.
  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(
      ASSETS.map((a) => ({ name: a.name, widths: a.widths, source: a.file })),
      null,
      2
    ) + "\n"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
