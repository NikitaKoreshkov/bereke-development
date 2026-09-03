'use client';

import { useEffect } from 'react';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedCopy } from '@/lib/i18n/localized';
import { useScrollLock } from '@/lib/use-scroll-lock';

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  phone: string;
  submitted: boolean;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CallbackModal({
  open,
  onClose,
  name,
  phone,
  submitted,
  onNameChange,
  onPhoneChange,
  onSubmit,
}: CallbackModalProps) {
  const { copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8"
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="callback-title" className="mb-6 text-base uppercase tracking-wide sm:text-lg">
          {t.supportCallbackCta}
        </h3>
        {submitted ? (
          <p className="text-sm text-gray-600">{t.callbackSuccess}</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder={t.formNamePlaceholder}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-base outline-none focus:border-[#C9A962] sm:text-sm"
              autoComplete="name"
            />
            <input
              type="tel"
              required
              placeholder={t.formPhonePlaceholder}
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-base outline-none focus:border-[#C9A962] sm:text-sm"
              autoComplete="tel"
            />
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-full bg-[#C9A962] py-3.5 text-xs uppercase tracking-widest text-[#1a1a1a]"
              >
                {t.formSubmit}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-full border border-gray-300 py-3.5 text-xs uppercase tracking-widest"
              >
                {t.formCancel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
