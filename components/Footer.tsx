import { SOCIAL } from '@/config/site';
import type { SiteContent } from '@/content/types';
import { FacebookIcon, InstagramIcon } from './icons';

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="mt-16 border-t border-line lg:mt-24">
      <div className="container-page flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="text-[0.9375rem] font-semibold tracking-[0.14em] text-khaki">
            MASTER IN DIVING
          </p>
          <p className="text-eyebrow text-muted uppercase">
            {content.footer.tagline}
          </p>

          <span className="flex items-center gap-1">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.footer.instagramLabel}
              className="inline-flex size-11 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-khaki"
            >
              <InstagramIcon className="size-5" />
            </a>
            {/* Rendered only once a permanent profile URL exists. */}
            {SOCIAL.facebook && (
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.footer.facebookLabel}
                className="inline-flex size-11 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-khaki"
              >
                <FacebookIcon className="size-5" />
              </a>
            )}
          </span>
        </div>

        <p className="text-small text-muted">{content.footer.thanks}</p>
      </div>
    </footer>
  );
}
