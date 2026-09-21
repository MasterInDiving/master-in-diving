/**
 * Describes what scripts/optimize-images.mjs produced, so markup and files
 * cannot drift apart. Re-run `npm run images` and update the numbers here if
 * a source photo is replaced with one of a different shape.
 */

export interface Photo {
  /** File stem in public/photos, e.g. "hero" -> hero-820.avif */
  name: string;
  /** Rendered widths, ascending. */
  widths: number[];
  /** Intrinsic size after trimming, used to reserve layout space. */
  width: number;
  height: number;
}

export const HERO_PHOTO: Photo = {
  name: 'hero',
  widths: [546, 820, 1092],
  width: 1092,
  height: 1236,
};

export const STORY_PHOTO: Photo = {
  name: 'story',
  widths: [440, 660, 1024],
  width: 1284,
  height: 1536,
};

export const OG_IMAGE = {
  url: '/photos/og.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
} as const;
