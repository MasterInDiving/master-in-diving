import type { Locale } from '@/config/site';
import { SOCIAL } from '@/config/site';
import { CREATIONS } from '@/content/creations';
import type { SiteContent } from '@/content/types';
import { ExternalLinkIcon } from './icons';

/**
 * Shows an "empty" line instead of the grid while content/creations.ts is
 * empty — unlike Updates, the section and its nav link stay visible.
 */
export function Creations({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const { creations } = content;

  return (
    <section id="creations" className="container-page pt-14 lg:pt-24">
      <h2 className="text-h2 font-semibold">{creations.title}</h2>

      {CREATIONS.length === 0 ? (
        <p className="mt-4 max-w-prose text-muted">{creations.empty}</p>
      ) : (
        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CREATIONS.map((item) => (
            <li
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line"
            >
              <img
                src={item.photo}
                alt={item.alt[locale]}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />

              <div className="flex flex-1 flex-col px-5 py-5">
                <h3 className="text-h3 font-semibold">{item.title[locale]}</h3>
                <p className="mt-1 text-muted">
                  {item.price} {item.currency}
                </p>

                <span
                  className={
                    item.status === 'sold'
                      ? 'mt-2 inline-flex w-fit rounded-full bg-cream px-3 py-1 text-small text-muted'
                      : 'mt-2 inline-flex w-fit rounded-full border border-khaki px-3 py-1 text-small text-khaki'
                  }
                >
                  {item.status === 'sold'
                    ? creations.soldLabel
                    : creations.availableLabel}
                </span>

                {item.status === 'available' && (
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-auto inline-flex w-fit items-center gap-2 pt-4 text-khaki underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:decoration-khaki"
                  >
                    {creations.contactCta}
                    <ExternalLinkIcon className="size-4" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
