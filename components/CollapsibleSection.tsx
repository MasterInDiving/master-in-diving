'use client';

import { useId, useState } from 'react';
import { ChevronDownIcon } from './icons';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * A section whose whole heading is one button (full-width, so it's easy to
 * hit on a phone) that expands/collapses the body below it. Several of these
 * can be open at once — opening one never closes another.
 *
 * Uses the same CSS grid-rows height animation as .faq-answer (see
 * app/globals.css) under the generic name .accordion-panel, so Faq's own
 * markup didn't need touching.
 */
export function CollapsibleSection({
  id,
  title,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const buttonId = `${baseId}-button`;

  return (
    <section id={id} className="container-page pt-14 lg:pt-24">
      <h2>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 py-1 text-left"
        >
          <span className="text-h2 font-semibold text-khaki">{title}</span>
          <ChevronDownIcon
            className={`size-6 shrink-0 text-khaki-soft transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h2>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-open={open}
        className="accordion-panel"
      >
        <div>
          <div className="pt-7">{children}</div>
        </div>
      </div>
    </section>
  );
}
