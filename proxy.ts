import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, isLocale } from '@/config/site';

/**
 * `/` has no page of its own. It resolves to a language and redirects:
 * the visitor's remembered choice first, then Accept-Language, then Russian.
 */
export function proxy(request: NextRequest) {
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    remembered && isLocale(remembered)
      ? remembered
      : pickFromAcceptLanguage(request.headers.get('accept-language'));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

function pickFromAcceptLanguage(header: string | null) {
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return {
        tag: tag.toLowerCase(),
        q: q ? Number.parseFloat(q.split('=')[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    // Ukrainian browsers commonly send uk; ru covers ru-RU, ru-UA and friends.
    const match = LOCALES.find((locale) => locale === base);
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}

export const config = {
  matcher: '/',
};
