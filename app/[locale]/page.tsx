import type { Locale } from '@/config/site';
import { getContent } from '@/content';
import { UPDATES } from '@/content/updates';
import { Creations } from '@/components/Creations';
import { Donate } from '@/components/Donate';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { GoalBanner } from '@/components/GoalBanner';
import { Hero } from '@/components/Hero';
import { SiteHeader } from '@/components/SiteHeader';
import { StickyCta } from '@/components/StickyCta';
import { Story } from '@/components/Story';
import { SupportUses } from '@/components/SupportUses';
import { Updates } from '@/components/Updates';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = getContent(locale);
  const hasUpdates = UPDATES.length > 0;

  return (
    <>
      <SiteHeader locale={locale} content={content} hasUpdates={hasUpdates} />

      <main>
        <Hero content={content} />
        <GoalBanner content={content} />
        <SupportUses content={content} />
        <Story content={content} />
        <Creations content={content} locale={locale} />
        <Donate content={content} />
        <Updates content={content} locale={locale} />
        <Faq content={content} />
      </main>

      <Footer content={content} />
      <StickyCta label={content.stickyCta} />
    </>
  );
}
