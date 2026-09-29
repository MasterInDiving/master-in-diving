import { SOCIAL } from '@/config/site';
import type { SiteContent } from '@/content/types';
import { FacebookIcon, InstagramIcon, TelegramIcon, TikTokIcon } from './icons';

const LINK_CLASS =
  'inline-flex min-h-12 items-center gap-2.5 rounded-md border border-line px-5 text-ink transition-colors duration-200 hover:border-khaki hover:text-khaki';

/**
 * Not collapsible, same as Support and FAQ (section 6/7 of the brief only
 * name those two, but a contact block is short enough that hiding it behind
 * an accordion would just cost a click for no real gain).
 */
export function Contact({ content }: { content: SiteContent }) {
  const { contact } = content;

  return (
    <section id="contact" className="container-page pt-14 lg:pt-24">
      <h2 className="text-h2 font-semibold">{contact.title}</h2>

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={SOCIAL.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contact.telegramLabel}
          className={LINK_CLASS}
        >
          <TelegramIcon className="size-5" />
          Telegram
        </a>
        <a
          href={SOCIAL.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contact.tiktokLabel}
          className={LINK_CLASS}
        >
          <TikTokIcon className="size-5" />
          TikTok
        </a>
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contact.instagramLabel}
          className={LINK_CLASS}
        >
          <InstagramIcon className="size-5" />
          Instagram
        </a>
        {SOCIAL.facebook && (
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contact.facebookLabel}
            className={LINK_CLASS}
          >
            <FacebookIcon className="size-5" />
            Facebook
          </a>
        )}
      </div>
    </section>
  );
}
