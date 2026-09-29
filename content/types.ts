import type { PaymentMethodId } from '@/config/payments';
import type { Locale } from '@/config/site';

export interface FaqItem {
  q: string;
  a: string;
}

export interface UseItem {
  title: string;
  text: string;
}

export interface PaymentCopy {
  /** Card heading, e.g. "Monobank". */
  title: string;
  /** Optional line above the value. Omitted when absent. */
  note?: string;
  /** Localised label shown before `PaymentMethod.network`, e.g. "Сеть". */
  networkLabel?: string;
  /** Label of the reveal button. Omitted when the value is shown outright. */
  reveal?: string;
  copy: string;
  copied: string;
  /** Shown instead of the copy button when the clipboard API is unavailable. */
  copyFallback: string;
  /** Optional link shown under the value, e.g. "How to send crypto". */
  linkUrl?: string;
  linkLabel?: string;
}

export interface CreationItem {
  /** File stem in public/creations/, e.g. "sunglasses-girl" -> sunglasses-girl-480.avif. */
  id: string;
  /** Rendered widths that actually exist for this id (see npm run images output). */
  widths: number[];
  /** Intrinsic size of the source photo, for the <img> width/height (no CLS). */
  width: number;
  height: number;
  alt: Record<Locale, string>;
  /**
   * Physical size read off the original photo, e.g. "40 × 50" or, for a
   * diptych, "2 × 40 × 40". Omitted when the photo carried no size — never
   * invented. The unit word ("см" / "cm") comes from creations.unitCm.
   */
  sizeCm?: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  a11y: {
    heroPhotoAlt: string;
    storyPhotoAlt: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
    qrAlt: string;
  };
  nav: {
    home: string;
    story: string;
    creations: string;
    support: string;
    updates: string;
    contact: string;
    faq: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitleBrand: string;
    subtitleRest: string;
    paragraphs: string[];
    cta: string;
    storyLink: string;
  };
  goal: {
    label: string;
    title: string;
    text: string;
    cta: string;
  };
  uses: {
    title: string;
    items: [UseItem, UseItem, UseItem];
  };
  story: {
    title: string;
    paragraphs: string[];
  };
  creations: {
    title: string;
    /** Shown instead of the grid while CREATIONS in content/creations.ts is empty. */
    empty: string;
    /** Unit word appended after CreationItem.sizeCm, e.g. "см" / "cm". */
    unitCm: string;
    /** Label for the button that opens the lightbox / the lightbox close button. */
    viewLabel: string;
    closeLabel: string;
  };
  donate: {
    title: string;
    subtitle: string;
    methods: Record<PaymentMethodId, PaymentCopy>;
    contactText: string;
    contactCta: string;
  };
  updates: {
    title: string;
    showAll: string;
  };
  contact: {
    title: string;
    telegramLabel: string;
    tiktokLabel: string;
    instagramLabel: string;
    facebookLabel: string;
  };
  faq: {
    title: string;
    showAll: string;
    items: FaqItem[];
  };
  footer: {
    tagline: string;
    thanks: string;
    instagramLabel: string;
    facebookLabel: string;
  };
  stickyCta: string;
}
