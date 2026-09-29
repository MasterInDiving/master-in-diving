'use client';

import { useState } from 'react';
import type { Locale } from '@/config/site';
import { CREATIONS } from '@/content/creations';
import type { SiteContent } from '@/content/types';
import { CollapsibleSection } from './CollapsibleSection';
import { Lightbox } from './Lightbox';
import { ResponsivePhoto } from './Photo';
import { ZoomIcon } from './icons';

/**
 * Closed by default (unlike Story/Updates) — this is scaffolding ahead of
 * more paintings, per the brief. An "empty" line is shown instead of the
 * grid while CREATIONS is empty; the section stays visible either way.
 */
export function Creations({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const { creations } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <CollapsibleSection id="creations" title={creations.title} defaultOpen={false}>
      {CREATIONS.length === 0 ? (
        <p className="max-w-prose text-muted">{creations.empty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {CREATIONS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={creations.viewLabel}
                className="group relative block w-full overflow-hidden rounded-lg border border-line"
              >
                <ResponsivePhoto
                  photo={{
                    name: item.id,
                    widths: item.widths,
                    width: item.width,
                    height: item.height,
                  }}
                  alt={item.alt[locale]}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw"
                  basePath="/creations"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-ink/0 text-white opacity-0 transition-all duration-200 group-hover:bg-ink/25 group-hover:opacity-100"
                >
                  <ZoomIcon className="size-7" />
                </span>
              </button>

              <p className="mt-2 text-small text-muted">
                {item.sizeCm && (
                  <>
                    {item.sizeCm} {creations.unitCm}
                    {(item.priceUsd || item.status === 'sold') && ' · '}
                  </>
                )}
                {item.status === 'sold' ? creations.statusSold : item.priceUsd ? `$${item.priceUsd}` : null}
              </p>

              {item.status === 'available' && (
                <a
                  href="#contact"
                  className="mt-1 inline-block text-small text-khaki underline decoration-line underline-offset-4 transition-colors duration-200 hover:decoration-khaki"
                >
                  {creations.buyCta}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {openIndex !== null && (
        <Lightbox
          item={CREATIONS[openIndex]}
          locale={locale}
          unitCm={creations.unitCm}
          closeLabel={creations.closeLabel}
          statusSold={creations.statusSold}
          buyCta={creations.buyCta}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </CollapsibleSection>
  );
}
