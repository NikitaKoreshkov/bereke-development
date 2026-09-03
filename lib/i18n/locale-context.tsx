'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  readStoredLocale,
  writeStoredLocale,
  type Locale,
} from './locale';
import { t, type HeaderChromeMessages } from './translations';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: HeaderChromeMessages;
  ready: boolean;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  messages: t(DEFAULT_LOCALE),
  ready: false,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored) setLocaleState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeStoredLocale(locale);
    document.documentElement.lang = locale === 'kk' ? 'kk' : 'ru';
  }, [locale, ready]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LOCALE_STORAGE_KEY) return;
      if (isLocale(event.newValue)) setLocaleState(event.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages: t(locale),
      ready,
    }),
    [locale, setLocale, ready],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
