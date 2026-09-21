'use client';

import { useEffect, useState } from 'react';
import { HeartIcon } from './icons';

/**
 * Small mobile-only bar (section 33). It appears once the hero has scrolled
 * away and hides again while the donation section is on screen, so it never
 * covers what it points at.
 */
export function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const support = document.getElementById('support');
    if (!hero || !support) return;

    const state = { heroVisible: true, supportVisible: false };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) state.heroVisible = entry.isIntersecting;
          if (entry.target === support) {
            state.supportVisible = entry.isIntersecting;
          }
        }
        setVisible(!state.heroVisible && !state.supportVisible);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    observer.observe(support);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="container-page py-2.5">
        <a
          href="#support"
          tabIndex={visible ? undefined : -1}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-md bg-khaki px-6 text-white"
        >
          <HeartIcon className="size-5" />
          {label}
        </a>
      </div>
    </div>
  );
}
