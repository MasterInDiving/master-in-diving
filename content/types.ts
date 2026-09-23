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
  /** Stable key; also used to derive nothing else — free-form. */
  id: string;
  /** Path under public/, e.g. "/creations/painting-1.jpg". No build step needed. */
  photo: string;
  alt: Record<Locale, string>;
  title: Record<Locale, string>;
  price: number;
  currency: string;
  status: 'available' | 'sold';
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
    soldLabel: string;
    availableLabel: string;
    /** Link label under an available piece, e.g. "Ask about this piece". */
    contactCta: string;
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
