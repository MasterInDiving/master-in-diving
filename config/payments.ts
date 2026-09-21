/**
 * Single source of truth for every payment detail shown on the site.
 * Changing a value here updates it everywhere, including the clipboard payload.
 *
 * `display` is what a visitor reads on screen (grouped for legibility).
 * `clipboard` is the exact string copied — never formatted, never spaced.
 * `masked` is the collapsed preview shown before "reveal" is pressed.
 *
 * Deliberately absent: the crypto network name, the bank/IBAN, any e-mail.
 * They were not provided, so they are not invented and not rendered.
 */

export type PaymentMethodId = 'monobank' | 'paypal' | 'crypto';

export interface PaymentMethod {
  id: PaymentMethodId;
  /** Collapsed preview, shown until the visitor reveals the full value. */
  masked: string;
  /** Full value, grouped for reading. */
  display: string;
  /** Exact value written to the clipboard. */
  clipboard: string;
  /** Keep the value collapsed until the visitor presses "reveal". */
  requiresReveal: boolean;
  /** Render a QR code of `clipboard` once the value is revealed. */
  qr: boolean;
}

export const PAYMENT_METHODS: readonly PaymentMethod[] = [
  {
    id: 'monobank',
    masked: '4441 •••• •••• 7984',
    display: '4441 1110 2260 7984',
    clipboard: '4441111022607984',
    requiresReveal: true,
    qr: false,
  },
  {
    id: 'paypal',
    masked: '+380 98 ••• •• 85',
    display: '+380 98 339 10 85',
    clipboard: '+380983391085',
    requiresReveal: false,
    qr: false,
  },
  {
    id: 'crypto',
    masked: 'TBjNL4••••••••••••••••6ZU3t',
    display: 'TBjNL453YC4qz44ZhsBpgeVtrgLVu6ZU3t',
    clipboard: 'TBjNL453YC4qz44ZhsBpgeVtrgLVu6ZU3t',
    requiresReveal: true,
    qr: true,
  },
] as const;
