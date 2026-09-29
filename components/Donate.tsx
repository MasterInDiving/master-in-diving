import { PAYMENT_METHODS, type PaymentMethodId } from '@/config/payments';
import type { SiteContent } from '@/content/types';
import { PaymentCard } from './PaymentCard';
import { CardIcon, CoinIcon, MailIcon } from './icons';

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
    </section>
  );
}
