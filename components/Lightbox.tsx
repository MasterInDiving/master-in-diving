'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '@/config/site';
import type { CreationItem } from '@/content/types';
import { ResponsivePhoto } from './Photo';
import { useModalOpen } from './useModalOpen';
import { CloseIcon } from './icons';

interface LightboxProps {
  item: CreationItem;
  locale: Locale;
  unitCm: string;
  closeLabel: string;
  onClose: () => void;
}

/** Full-size view of a gallery photo. Escape or the backdrop closes it. */
export function Lightbox({ item, locale, unitCm, closeLabel, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalOpen(true);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Rendered straight onto <body>: this component lives deep inside the
  // Creations accordion, and `position: fixed` is relative to the nearest
  // ancestor with a transform/filter/etc rather than the viewport if there
  // is one — a portal sidesteps that regardless of what wraps the trigger.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt[locale]}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
      >
        <CloseIcon className="size-6" />
      </button>

      <div
        className="flex max-h-full max-w-full flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <ResponsivePhoto
          photo={{ name: item.id, widths: item.widths, width: item.width, height: item.height }}
          alt={item.alt[locale]}
          sizes="90vw"
          basePath="/creations"
          className="max-h-[80vh] w-auto max-w-full rounded-md object-contain"
        />
        {item.sizeCm && (
          <p className="mt-3 text-small text-white/80">
            {item.sizeCm} {unitCm}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
