import { STORY_PHOTO } from '@/config/photos';
import type { SiteContent } from '@/content/types';
import { ResponsivePhoto } from './Photo';

export function Story({ content }: { content: SiteContent }) {
  const { story } = content;

  return (
    <section id="story" className="container-page pt-14 lg:pt-24">
      <h2 className="text-h2 font-semibold">{story.title}</h2>

      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
        <ResponsivePhoto
          photo={STORY_PHOTO}
          alt={content.a11y.storyPhotoAlt}
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 60vw, 100vw"
          className="w-full rounded-xl object-cover lg:sticky lg:top-24"
        />

        <div>
          <div className="max-w-prose space-y-4 text-muted">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <figure className="mt-8 max-w-prose rounded-xl bg-cream px-6 py-6">
            <span
              aria-hidden="true"
              className="block font-serif text-[2rem] leading-none text-khaki-soft/50"
            >
              &ldquo;
            </span>
            <blockquote className="mt-1 text-[1.0625rem] text-khaki italic sm:text-[1.125rem]">
              {story.quote}
            </blockquote>
            <figcaption className="mt-3 text-small text-muted">
              — {story.quoteAuthor}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
