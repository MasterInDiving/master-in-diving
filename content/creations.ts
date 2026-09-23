import type { CreationItem } from './types';

/**
 * Paintings shown in the "My art" section.
 *
 * The array ships empty. Unlike content/updates.ts, the section and its
 * navigation link stay visible even while it is empty (an "empty" copy line
 * is shown instead) — this was requested as scaffolding to fill in later.
 *
 * To add one, drop the photo into public/creations/ (any name, no build step
 * needed — these are plain <img>, not the optimised AVIF/WebP/JPEG pipeline
 * used for the hero and story photos) and add an entry here:
 *
 *   {
 *     id: 'painting-1',
 *     photo: '/creations/painting-1.jpg',
 *     alt: { ru: '…', uk: '…', en: '…' },
 *     title: { ru: '…', uk: '…', en: '…' },
 *     price: 1500,
 *     currency: 'UAH',
 *     status: 'available', // or 'sold'
 *   }
 *
 * All three languages are required — the type will not compile otherwise.
 */
export const CREATIONS: readonly CreationItem[] = [];
