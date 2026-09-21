import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { LOCALES, OG_LOCALE, SITE_URL, isLocale, type Locale } from '@/config/site';
import { OG_IMAGE } from '@/config/photos';
import { getContent } from '@/content';
import '../globals.css';

// Only latin and cyrillic: latin-ext is unused by all three languages, and
// Ukrainian's і ї є ґ all sit inside the basic cyrillic range, so cyrillic-ext
// would be ~50 KiB of glyphs this site never renders.
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const content = getContent(locale);
  const languages = Object.fromEntries(
    LOCALES.map((item) => [item, `/${item}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, 'x-default': '/ru' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Master in Diving',
      url: `/${locale}`,
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      locale: OG_LOCALE[locale],
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          type: OG_IMAGE.type,
          alt: content.a11y.heroPhotoAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      images: [OG_IMAGE.url],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale as Locale);

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        {/* The hero is the largest contentful paint; start it with the HTML. */}
        <link
          rel="preload"
          as="image"
          href="/photos/hero-760.avif"
          type="image/avif"
          imageSrcSet="/photos/hero-546.avif 546w, /photos/hero-760.avif 760w, /photos/hero-1092.avif 1092w"
          imageSizes="(min-width: 1024px) 50vw, 100vw"
          fetchPriority="high"
        />
      </head>
      <body className="bg-white">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:bg-khaki focus:px-4 focus:py-2 focus:text-white"
        >
          {content.a11y.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
