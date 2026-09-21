import type { SiteContent } from '@/content/types';
import { ArrowRightIcon, TargetIcon } from './icons';

/**
 * Section 15: no amount raised, no target, no progress bar — none of those
 * numbers were provided, so none are shown.
 */
export function GoalBanner({ content }: { content: SiteContent }) {
  const { goal } = content;

  return (
    <div className="container-page pt-12 lg:pt-16">
      <div className="flex flex-col gap-5 rounded-xl bg-cream px-6 py-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:gap-8">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-khaki"
        >
          <TargetIcon className="size-6" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-eyebrow font-medium text-muted uppercase">
            {goal.label}
          </p>
          <h2 className="mt-1.5 text-h3 font-semibold">{goal.title}</h2>
          <p className="mt-2 max-w-prose text-small text-muted sm:text-body">
            {goal.text}
          </p>
        </div>

        <a
          href="#support"
          className="group inline-flex min-h-12 shrink-0 items-center gap-2 self-start text-khaki underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:decoration-khaki md:self-center"
        >
          {goal.cta}
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
