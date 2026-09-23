import { PAYMENT_METHODS, type PaymentMethodId } from '@/config/payments';
import { SOCIAL } from '@/config/site';
import type { SiteContent } from '@/content/types';
import { PaymentCard } from './PaymentCard';
import { CardIcon, CoinIcon, ExternalLinkIcon, MailIcon } from './icons';

const ICONS: Record<PaymentMethodId, React.ReactNode> = {
  monobank: <CardIcon className="size-5" />,
  paypal: <MailIcon className="size-5" />,
  crypto: <CoinIcon className="size-5" />,
};

export function Donate({ content }: { content: SiteContent }) {
  const { donate } = content;

  return (
    <section id="support" className="container-page pt-14 lg:pt-24">
      <h2 className="text-h2 font-semibold">{donate.title}</h2>
      <p className="mt-2.5 max-w-prose text-muted">{donate.subtitle}</p>

      <ul className="mt-7 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {PAYMENT_METHODS.map((method) => (
          <PaymentCard
            key={method.id}
            method={method}
            copy={donate.methods[method.id]}
            qrAlt={content.a11y.qrAlt}
            icon={ICONS[method.id]}
          />
        ))}
      </ul>

      {/* Contact is a separate line, not a fourth payment method (section 24). */}
      <div className="mt-8 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
        <p className="text-muted">{donate.contactText}</p>
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-12 items-center gap-2 self-start text-khaki underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:decoration-khaki sm:self-auto"
        >
          {donate.contactCta}
          <ExternalLinkIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}
