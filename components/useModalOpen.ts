'use client';

import { useEffect } from 'react';

/**
 * Locks page scroll and hides the sticky header while a full-screen modal
 * (Lightbox, LanguageGate) is open.
 *
 * The header hide works around a stacking quirk: the header is
 * `position: sticky` with `z-index: 50`, and a modal portalled onto
 * <body> with a higher z-index and `top/left: 0` still rendered the header
 * on top of it in testing here, despite computed styles saying it
 * shouldn't. Hiding it explicitly (see `html.modal-open header` in
 * globals.css) sidesteps the question instead of relying on z-index alone.
 */
export function useModalOpen(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('modal-open');
    return () => {
      document.body.style.overflow = overflow;
      document.documentElement.classList.remove('modal-open');
    };
  }, [active]);
}
