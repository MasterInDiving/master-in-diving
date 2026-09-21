#!/usr/bin/env node
/**
 * Turns the originals in source-photos/ into the responsive AVIF/WebP/JPEG set
 * that public/photos/ serves, plus the 1200x630 OpenGraph card.
 *
 * Run it after replacing or adding a photo:
 *   npm run images
 *
 * Output is committed to git, so Vercel never has to run sharp at build time
 * and the site stays portable to hosts without an image pipeline.
 */

import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import QRCode from 'qrcode';
import { PAYMENT_METHODS } from '../config/payments.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'source-photos');
const OUT = path.join(ROOT, 'public', 'photos');

/**
 * `trim` removes the Instagram overlays baked into the screenshots: the
 * carousel counter in the hero's top-right corner and the muted-audio badge
 * in the story photo's bottom-right corner. Values are pixels of the original.
 */
const SOURCES = [
  {
    name: 'hero',
    file: 'kostya-hero.jpg',
    trim: { top: 44, bottom: 0 },
    widths: [546, 820, 1092],
  },
  {
    name: 'story',
    file: 'kostya-story.jpg',
    trim: { top: 0, bottom: 64 },
    widths: [440, 660, 1024],
  },
];

/** OpenGraph card, cropped from the hero so the face sits inside the frame. */
const OG = {
  from: 'hero',
  width: 1200,
  height: 630,
  /** Vertical offset into the width-scaled hero, in output pixels. */
  top: 100,
};

const FORMATS = [
  { ext: 'avif', apply: (img) => img.avif({ quality: 58, effort: 6 }) },
  { ext: 'webp', apply: (img) => img.webp({ quality: 76 }) },
  { ext: 'jpg', apply: (img) => img.jpeg({ quality: 82, mozjpeg: true }) },
];

async function build() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const manifest = {};

  for (const source of SOURCES) {
    const input = path.join(SRC, source.file);
    if (!existsSync(input)) {
      console.error(`missing source photo: ${path.relative(ROOT, input)}`);
      process.exitCode = 1;
      continue;
    }

    const meta = await sharp(input).metadata();
    const height = meta.height - source.trim.top - source.trim.bottom;
    const cropped = () =>
      sharp(input)
        .rotate()
        .extract({ left: 0, top: source.trim.top, width: meta.width, height });

    const widths = source.widths.filter((w) => w <= meta.width);
    for (const width of widths) {
      for (const format of FORMATS) {
        const file = `${source.name}-${width}.${format.ext}`;
        await format
          .apply(cropped().resize({ width }))
          .toFile(path.join(OUT, file));
      }
    }

    manifest[source.name] = {
      widths,
      width: meta.width,
      height,
      aspect: +(meta.width / height).toFixed(4),
    };
    console.log(
      `${source.name}: ${meta.width}x${meta.height} -> ${widths.join(', ')} (${height}px tall after trim)`,
    );

    if (OG.from === source.name) {
      const scaled = Math.round((height * OG.width) / meta.width);
      const top = Math.min(OG.top, Math.max(0, scaled - OG.height));
      await sharp(await cropped().resize({ width: OG.width }).toBuffer())
        .extract({ left: 0, top, width: OG.width, height: OG.height })
        .jpeg({ quality: 86, mozjpeg: true })
        .toFile(path.join(OUT, 'og.jpg'));
      console.log(`og.jpg: ${OG.width}x${OG.height} from ${source.name} @ y=${top}`);
    }
  }

  await buildQrCodes();

  console.log(JSON.stringify(manifest, null, 2));
}

/**
 * QR codes are generated from config/payments.ts, so the encoded string can
 * never drift from the address shown on the page. The payload is the raw
 * value and nothing else — no amount, no label, no network hint.
 */
async function buildQrCodes() {
  for (const method of PAYMENT_METHODS.filter((m) => m.qr)) {
    const svg = await QRCode.toString(method.clipboard, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 1,
      color: { dark: '#303726', light: '#ffffff' },
    });
    await writeFile(path.join(OUT, `qr-${method.id}.svg`), svg, 'utf8');
    console.log(`qr-${method.id}.svg: ${method.clipboard}`);
  }
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
