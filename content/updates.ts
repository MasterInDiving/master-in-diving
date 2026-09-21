import type { Locale } from '@/config/site';

/**
 * Timeline entries for the "Latest updates" section.
 *
 * The array is intentionally empty: no confirmed updates have been provided,
 * and the spec forbids inventing them. While it is empty the whole section —
 * heading included — is not rendered, and the "Updates" navigation link is
 * hidden along with it.
 *
 * To add one, prepend an entry (newest first):
 *
 *   {
 *     date: '2026-09-20',
 *     title: { ru: '…', uk: '…', en: '…' },
 *     text:  { ru: '…', uk: '…', en: '…' },
 *   }
 *
 * `date` must be ISO 8601 (YYYY-MM-DD); it is formatted per locale at render
 * time. `text` should stay within one to three lines.
 */

export interface UpdateEntry {
  date: string;
  title: Record<Locale, string>;
  text: Record<Locale, string>;
}

export const UPDATES: readonly UpdateEntry[] = [];

/** Entries shown before "All updates" is pressed. */
export const UPDATES_VISIBLE = 3;
