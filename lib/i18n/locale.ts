export type Locale = 'ru' | 'kk';

export const LOCALES: Locale[] = ['ru', 'kk'];
export const DEFAULT_LOCALE: Locale = 'ru';
export const LOCALE_STORAGE_KEY = 'bereke-locale';

export function isLocale(value: unknown): value is Locale {
  return value === 'ru' || value === 'kk';
}

export function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore quota / private mode
  }
}
