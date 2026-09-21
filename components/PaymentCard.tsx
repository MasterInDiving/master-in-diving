'use client';

import { useEffect, useRef, useState } from 'react';
import type { PaymentMethod } from '@/config/payments';
import type { PaymentCopy } from '@/content/types';
import { CheckIcon, CopyIcon, EyeIcon } from './icons';

interface PaymentCardProps {
  method: PaymentMethod;
  copy: PaymentCopy;
  qrAlt: string;
  icon: React.ReactNode;
}

const COPIED_RESET_MS = 2000;

export function PaymentCard({ method, copy, qrAlt, icon }: PaymentCardProps) {
  const [revealed, setRevealed] = useState(!method.requiresReveal);
  const [copied, setCopied] = useState(false);
  /**
   * Section 47: never render a button that cannot work. Until the clipboard
   * API is confirmed available the value is shown as selectable text instead.
   * Checked after mount because the server cannot know.
   */
  const [canCopy, setCanCopy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCanCopy(
      typeof navigator !== 'undefined' &&
        typeof navigator.clipboard?.writeText === 'function' &&
        window.isSecureContext,
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(method.clipboard);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Permission denied mid-session: fall back to manual selection.
      setCanCopy(false);
      setRevealed(true);
    }
  }

  const value = revealed ? method.display : method.masked;

  return (
    <li className="flex flex-col rounded-xl border border-line px-6 py-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-khaki"
        >
          {icon}
        </span>
        <h3 className="text-h3 font-semibold">{copy.title}</h3>
      </div>

      {copy.note && <p className="mt-4 text-small text-muted">{copy.note}</p>}

      <p
        className={`mt-3 font-mono text-[0.8125rem] break-all text-ink xs:text-[0.9375rem] ${
          revealed ? 'select-all' : ''
        }`}
      >
        {value}
      </p>

      {revealed && method.qr && (
        <img
          src={`/photos/qr-${method.id}.svg`}
          alt={qrAlt}
          width={132}
          height={132}
          loading="lazy"
          className="mt-4 size-33 rounded-md border border-line bg-white p-1.5"
        />
      )}

      <div className="mt-auto pt-5">
        {!revealed && copy.reveal ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-khaki px-5 text-khaki transition-colors duration-200 hover:bg-cream"
          >
            <EyeIcon className="size-5" />
            {copy.reveal}
          </button>
        ) : canCopy ? (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-khaki px-5 text-khaki transition-colors duration-200 hover:bg-cream"
          >
            {copied ? (
              <CheckIcon className="size-5" />
            ) : (
              <CopyIcon className="size-5" />
            )}
            {copied ? copy.copied : copy.copy}
          </button>
        ) : (
          <p className="text-small text-muted">{copy.copyFallback}</p>
        )}
      </div>

      <span aria-live="polite" className="sr-only">
        {copied ? copy.copied : ''}
      </span>
    </li>
  );
}
