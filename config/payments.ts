/**
 * Single source of truth for every payment detail shown on the site.
 * Changing a value here updates it everywhere, including the clipboard payload.
 *
 * `display` is what a visitor reads on screen (grouped for legibility).
 * `clipboard` is the exact string copied — never formatted, never spaced.
 * `masked` is the collapsed preview shown before "reveal" is pressed.
 *
 * Deliberately absent: the bank name, the IBAN. They were not provided, so
 * they are not invented and not rendered.
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
  /** Network name shown next to the address, e.g. "TRON (TRC20)". Not localised. */
  network?: string;
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
    masked: 'master.in.diving@gmail.com',
    display: 'master.in.diving@gmail.com',
    clipboard: 'master.in.diving@gmail.com',
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
    network: 'TRON (TRC20)',
  },
] as const;
