'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from '@/config/site';
import { useModalOpen } from './useModalOpen';

/**
 * Shown once, before any per-locale copy has loaded, so its own text can't
 * come from content/<lang>.ts — it says the same three-language line and
 * button set no matter which page a visitor happened to land on first.
 */
const OPTIONS: { locale: Locale; label: string }[] = [
  { locale: 'uk', label: 'Українська' },
  { locale: 'ru', label: 'Русский' },
  { locale: 'en', label: 'English' },
];

/**
 * Blocks the page with a language choice on every load, by request — a
 * returning visitor re-confirms their language each time rather than only
 * on their first visit. The choice still writes LOCALE_COOKIE (config/site.ts),
 * which is what a later visit to bare "/" redirects to (see proxy.ts) and
 * what the header's LanguageSwitcher reads.
 */
export function LanguageGate({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(true);
  }, []);

  useModalOpen(open);

  function choose(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
    setOpen(false);
    if (next !== locale) router.replace(`/${next}`);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-gate-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-5"
    >
      <div className="w-full max-w-[22rem] rounded-xl bg-white p-7 text-center shadow-xl">
        <p id="language-gate-title" className="text-h3 font-semibold text-khaki">
          Оберіть мову / Выберите язык / Choose your language
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {OPTIONS.map((option) => (
            <button
              key={option.locale}
              type="button"
              autoFocus={option.locale === 'uk'}
              onClick={() => choose(option.locale)}
              className="min-h-12 rounded-md border border-khaki px-5 text-khaki transition-colors duration-200 hover:bg-cream"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
