import type { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}`]),
  );

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'ru' ? 1 : 0.8,
    alternates: { languages },
  }));
}
