#!/usr/bin/env node
/**
 * Caveat appears exactly once on the page: the handwritten line over the hero
 * photo, in three languages. Google's latin + cyrillic subsets cost ~94 KiB
 * for that, competing with the largest contentful paint on a phone.
 *
 * This cuts the font down to the characters those phrases actually use and
 * writes public/fonts/caveat-subset.woff2 (a few KiB). The result is committed,
 * so neither the build nor the site ever calls out to Google.
 *
 * Re-run after changing hero.handwritten in any content file:
 *   node scripts/subset-caveat.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

import { ru } from '../content/ru.ts';
import { uk } from '../content/uk.ts';
import { en } from '../content/en.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'fonts');
const OUT_FILE = path.join(OUT_DIR, 'caveat-subset.woff2');

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@500&subset=latin,cyrillic';

async function run() {
  // Every character the handwritten line can render, across all languages.
  const characters = [...new Set([ru, uk, en].map((c) => c.hero.handwritten).join(''))]
    .sort()
    .join('');

  // No User-Agent header: Google then serves TTF URLs, which subset cleanly.
  const css = await fetch(CSS_URL).then((response) => {
    if (!response.ok) throw new Error(`font CSS: HTTP ${response.status}`);
    return response.text();
  });

  const sources = [...new Set([...css.matchAll(/url\((https:[^)]+\.ttf)\)/g)].map((m) => m[1]))];
  if (sources.length === 0) throw new Error('no TTF sources in the font CSS');

  const buffers = await Promise.all(
    sources.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`font file: HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    }),
  );

  // Called without a User-Agent, Google serves one TTF covering every subset,
  // so a single subsetting pass produces a font with both scripts in it.
  const subsets = [];
  for (const buffer of buffers) {
    try {
      subsets.push(await subsetFont(buffer, characters, { targetFormat: 'woff2' }));
    } catch {
      // A source that covers none of the characters is simply skipped.
    }
  }

  const best = subsets.sort((a, b) => b.length - a.length)[0];
  if (!best) throw new Error('subsetting produced nothing');

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, best);
  console.log(
    `caveat-subset.woff2: ${(best.length / 1024).toFixed(1)} KiB for ${characters.length} characters`,
  );
  console.log(`characters: ${JSON.stringify(characters)}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
