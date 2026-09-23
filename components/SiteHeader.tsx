'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/config/site';
import type { SiteContent } from '@/content/types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CloseIcon, MenuIcon } from './icons';

interface SiteHeaderProps {
  locale: Locale;
  content: SiteContent;
  hasUpdates: boolean;
}

export function SiteHeader({ locale, content, hasUpdates }: SiteHeaderProps) {
  const items = [
    { id: 'top', label: content.nav.home },
    { id: 'story', label: content.nav.story },
    { id: 'creations', label: content.nav.creations },
    { id: 'support', label: content.nav.support },
    ...(hasUpdates ? [{ id: 'updates', label: content.nav.updates }] : []),
    { id: 'faq', label: content.nav.faq },
  ];

  const [active, setActive] = useState('top');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll spy: the section closest to the top of the viewport wins.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // `items` is derived from props that do not change within a page view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUpdates]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="text-[0.6875rem] font-semibold tracking-[0.06em] whitespace-nowrap text-khaki xs:text-[0.8125rem] xs:tracking-[0.1em] sm:text-[0.9375rem] sm:tracking-[0.14em]"
        >
          MASTER IN DIVING
        </a>

        <nav
          aria-label={content.nav.home}
          className="hidden items-center gap-7 lg:flex"
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={`border-b-2 py-1 text-small transition-colors duration-200 ${
                active === item.id
                  ? 'border-khaki text-khaki'
                  : 'border-transparent text-muted hover:text-khaki'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher locale={locale} label={content.a11y.languageLabel} />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? content.a11y.closeMenu : content.a11y.openMenu}
            className="inline-flex size-11 items-center justify-center rounded-md text-khaki lg:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label={content.nav.home}
          className="animate-fade-up border-t border-line bg-white lg:hidden"
        >
          <ul className="container-page py-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center border-b border-line/70 text-khaki last:border-b-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
