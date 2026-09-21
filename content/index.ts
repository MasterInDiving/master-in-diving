import type { Locale } from '@/config/site';
import type { SiteContent } from './types';
import { ru } from './ru';
import { uk } from './uk';
import { en } from './en';

const CONTENT: Record<Locale, SiteContent> = { ru, uk, en };

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}

/** Questions shown before "Show all questions" is pressed. */
export const FAQ_VISIBLE = 8;

/** BCP 47 tags used for date formatting. */
const DATE_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-GB',
};

export function formatUpdateDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export type { SiteContent } from './types';
