import { HERO_PHOTO } from '@/config/photos';
import type { SiteContent } from '@/content/types';
import { ResponsivePhoto } from './Photo';
import { ArrowRightIcon, HeartIcon } from './icons';

export function Hero({ content }: { content: SiteContent }) {
  const { hero } = content;

  return (
    <section id="top" className="border-b border-line/60">
      <div className="lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="lg:flex lg:justify-end">
          <div className="container-page pt-10 pb-9 lg:mx-0 lg:max-w-[620px] lg:py-24 lg:pr-12 lg:pl-10">
            <p className="text-eyebrow font-medium text-muted uppercase">
              {hero.eyebrow}
            </p>

            <h1 className="mt-5 text-hero font-semibold">{hero.title}</h1>

            <p className="mt-4 text-[1.0625rem] text-ink sm:text-[1.1875rem]">
              <strong className="font-semibold text-khaki">
                {hero.subtitleBrand}
              </strong>
              {hero.subtitleRest}
            </p>

            <div className="mt-5 max-w-prose space-y-3.5 text-muted">
              {hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#support"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-md bg-khaki px-7 text-white transition-colors duration-200 hover:bg-khaki-soft"
              >
                <HeartIcon className="size-5" />
                {hero.cta}
              </a>
              <a
                href="#story"
                className="group inline-flex min-h-12 items-center gap-2 text-khaki underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:decoration-khaki"
              >
                {hero.storyLink}
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative">
          <ResponsivePhoto
            photo={HERO_PHOTO}
            alt={content.a11y.heroPhotoAlt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="hero-photo-fade h-full max-h-[34rem] w-full object-cover object-[50%_28%] lg:max-h-none lg:min-h-[36rem]"
          />
          <p
            aria-hidden="true"
            className="pointer-events-none absolute top-[18%] right-5 max-w-[9rem] text-right font-hand text-[1.75rem] leading-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] sm:right-8 sm:text-[2.125rem] lg:top-[26%]"
          >
            {hero.handwritten}
            <span className="mt-1 block text-[1.5rem] sm:text-[1.75rem]">♡</span>
          </p>
        </div>
      </div>
    </section>
  );
}
