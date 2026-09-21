'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from '@/config/site';

/** Labels differ from the route segments: the `uk` route is shown as "UA". */
const LABEL: Record<Locale, string> = { ru: 'RU', uk: 'UA', en: 'EN' };

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  function select(next: Locale) {
    if (next === locale) return;
    // Remembered so a later visit to "/" lands on the same language.
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
    const rest = pathname.replace(/^\/[^/]+/, '');
    router.push(`/${next}${rest}`);
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center text-small text-muted"
    >
      {LOCALES.map((item, index) => (
        <span key={item} className="flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="px-0 text-line xs:px-0.5">
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => select(item)}
            aria-current={item === locale ? 'true' : undefined}
            className={`inline-flex h-11 min-w-7 items-center justify-center rounded-md px-0 transition-colors duration-200 xs:min-w-9 xs:px-1 ${
              item === locale
                ? 'font-semibold text-khaki'
                : 'hover:text-khaki'
            }`}
          >
            {LABEL[item]}
          </button>
        </span>
      ))}
    </div>
  );
}
