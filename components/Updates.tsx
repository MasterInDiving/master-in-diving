'use client';

import { useState } from 'react';
import type { Locale } from '@/config/site';
import { formatUpdateDate } from '@/content';
import type { SiteContent } from '@/content/types';
import { UPDATES, UPDATES_VISIBLE } from '@/content/updates';
import { ArrowRightIcon } from './icons';

/**
 * Renders nothing while content/updates.ts is empty — the spec forbids
 * placeholder entries, and an empty timeline helps nobody.
 */
export function Updates({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const [expanded, setExpanded] = useState(false);

  if (UPDATES.length === 0) return null;

  const shown = expanded ? UPDATES : UPDATES.slice(0, UPDATES_VISIBLE);

  return (
    <section id="updates" className="container-page pt-14 lg:pt-24">
      <h2 className="text-h2 font-semibold">{content.updates.title}</h2>

      <ol className="mt-7 max-w-prose">
        {shown.map((entry) => (
          <li
            key={`${entry.date}-${entry.title[locale]}`}
            className="relative border-l border-line py-4 pl-7 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute top-[1.55rem] -left-[0.3125rem] size-2.5 rounded-full bg-khaki"
            />
            <time
              dateTime={entry.date}
              className="text-small text-muted tabular-nums"
            >
              {formatUpdateDate(entry.date, locale)}
            </time>
            <h3 className="mt-1 text-h3 font-semibold">{entry.title[locale]}</h3>
            <p className="mt-1 text-small text-muted">{entry.text[locale]}</p>
          </li>
        ))}
      </ol>

      {!expanded && UPDATES.length > UPDATES_VISIBLE && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="group mt-2 inline-flex min-h-12 items-center gap-2 text-khaki underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:decoration-khaki"
        >
          {content.updates.showAll}
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      )}
    </section>
  );
}
