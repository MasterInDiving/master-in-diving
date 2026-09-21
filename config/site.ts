/**
 * Site-wide constants: canonical origin and social profiles.
 *
 * A social link set to `null` is not rendered anywhere.
 *
 * Both entries are permanent profile URLs. A /share/ link is not one: it is a
 * tracking redirect, so it does not belong here even though it resolves.
 */

export const LOCALES = ['ru', 'uk', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ru';

/** Cookie remembering the visitor's language choice across visits. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Absolute origin used for canonical URLs, hreflang and OpenGraph images.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the real domain is connected;
 * until then Vercel's own deployment URL is used.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const SOCIAL = {
  instagram: 'https://www.instagram.com/master_in_diving',
  /** Old username on a profile that displays as Константин Донец. */
  facebook: 'https://www.facebook.com/kostya.lebedev.7' as string | null,
} as const;

/** OpenGraph locale codes, keyed by site locale. */
export const OG_LOCALE: Record<Locale, string> = {
  ru: 'ru_RU',
  uk: 'uk_UA',
  en: 'en_US',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
