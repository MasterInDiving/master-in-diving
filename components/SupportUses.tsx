import type { SiteContent } from '@/content/types';
import { HomeIcon, RehabIcon, WheelchairIcon } from './icons';

const ICONS = [RehabIcon, WheelchairIcon, HomeIcon] as const;

export function SupportUses({ content }: { content: SiteContent }) {
  const { uses } = content;

  return (
    <section className="container-page pt-14 lg:pt-20">
      <h2 className="text-h2 font-semibold">{uses.title}</h2>

      <ul className="mt-7 grid gap-5 md:grid-cols-3 md:gap-6">
        {uses.items.map((item, index) => {
          const IconComponent = ICONS[index];
          return (
            <li
              key={item.title}
              className="rounded-xl border border-line px-6 py-6"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-full bg-cream text-khaki"
              >
                <IconComponent className="size-5" />
              </span>
              <h3 className="mt-4 text-h3 font-semibold">{item.title}</h3>
              <p className="mt-2 text-small text-muted">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
