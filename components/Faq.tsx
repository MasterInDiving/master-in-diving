'use client';

import { useId, useState } from 'react';
import { FAQ_VISIBLE } from '@/content';
import type { SiteContent } from '@/content/types';

export function Faq({ content }: { content: SiteContent }) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  const items = content.faq.items;
  const shown = expanded ? items : items.slice(0, FAQ_VISIBLE);

  return (
    <section id="faq" className="container-page pt-14 lg:pt-24">
      <h2 className="text-h2 font-semibold">{content.faq.title}</h2>

      <ul className="mt-6 max-w-prose">
        {shown.map((item, index) => {
          const isOpen = open === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <li key={item.q} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-5 py-4 text-left text-khaki transition-colors duration-200 hover:text-khaki-soft"
                >
                  <span className="text-[1rem] font-medium sm:text-[1.0625rem]">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-xl leading-none text-khaki-soft select-none"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                data-open={isOpen}
                className="faq-answer"
              >
                <div>
                  <p className="pb-5 text-small text-muted sm:text-body">
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!expanded && items.length > FAQ_VISIBLE && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-5 inline-flex min-h-12 items-center rounded-md border border-line px-6 text-khaki transition-colors duration-200 hover:bg-cream"
        >
          {content.faq.showAll}
        </button>
      )}
    </section>
  );
}
