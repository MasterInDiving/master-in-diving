import { STORY_PHOTO } from '@/config/photos';
import type { SiteContent } from '@/content/types';
import { CollapsibleSection } from './CollapsibleSection';
import { ResponsivePhoto } from './Photo';

/**
 * Open by default — this and the hero photo are the page's emotional
 * centre — but still collapsible like the other content sections.
 */
export function Story({ content }: { content: SiteContent }) {
  const { story } = content;

  return (
    <CollapsibleSection id="story" title={story.title} defaultOpen>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
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
        </div>
      </div>
    </CollapsibleSection>
  );
}
