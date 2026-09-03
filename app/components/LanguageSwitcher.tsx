'use client';

import { useLocale } from '@/lib/i18n/locale-context';
import type { Locale } from '@/lib/i18n/locale';

const OPTIONS: { value: Locale; label: string }[] = [
  { value: 'ru', label: 'RU' },
  { value: 'kk', label: 'KZ' },
];

type LanguageSwitcherProps = {
  useLightChrome?: boolean;
  /** Larger controls for the burger menu panel */
  variant?: 'header' | 'menu';
};

export default function LanguageSwitcher({
  useLightChrome = true,
  variant = 'header',
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();

  if (variant === 'menu') {
    return (
      <div
        className="pointer-events-auto flex items-center gap-2"
        role="group"
        aria-label="Language"
      >
        {OPTIONS.map((option) => {
          const active = locale === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setLocale(option.value)}
              aria-pressed={active}
              className={`min-w-[3.25rem] rounded-full border px-4 py-2.5 text-xs font-semibold tracking-[0.18em] transition-colors duration-300 ${
                active
                  ? 'border-[#C9A962] bg-[#C9A962]/15 text-[#C9A962]'
                  : 'border-white/15 text-white/55 hover:border-white/30 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-auto mr-2 flex items-center gap-1 text-[11px] font-semibold tracking-[0.14em] sm:mr-3 sm:text-xs ${
        useLightChrome ? 'text-white/55' : 'text-[#1a1a1a]/45'
      }`}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map((option, index) => {
        const active = locale === option.value;
        return (
          <span key={option.value} className="contents">
            {index > 0 ? (
              <span className={useLightChrome ? 'text-white/25' : 'text-[#1a1a1a]/20'} aria-hidden>
                /
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setLocale(option.value)}
              aria-pressed={active}
              className={`rounded-sm px-1 py-0.5 transition-colors duration-300 ${
                active
                  ? useLightChrome
                    ? 'text-[#C9A962]'
                    : 'text-[#1a1a1a]'
                  : useLightChrome
                    ? 'hover:text-white'
                    : 'hover:text-[#1a1a1a]'
              }`}
            >
              {option.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
