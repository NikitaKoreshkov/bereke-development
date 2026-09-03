'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { detectHeaderOnLightSurface } from '@/lib/detect-header-surface';
import { getEffectiveScrollY } from '@/lib/scroll-y';
import { useScrollLock } from '@/lib/use-scroll-lock';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedNavLabel } from '@/lib/i18n/localized';
import LanguageSwitcher from './LanguageSwitcher';

const FUTURE_PROJECTS: { id: string; name: string }[] = [];

const MENU_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MENU_PANEL_MS = 520;
const MENU_ITEM_MS = 480;
const MENU_ITEM_STAGGER_MS = 70;
const MENU_ITEM_START_DELAY_MS = 140;
const MENU_CLOSE_STAGGER_MS = 40;
const HEADER_CHROME_TRANSITION =
  'transition-[color,border-color,background-color,filter,box-shadow] duration-700 ease-in-out';
const SURFACE_SWITCH_MS = 160;

function HeaderPhoneLink({ useLightChrome }: { useLightChrome: boolean }) {
  const { site } = useSiteContent();
  const { messages } = useLocale();
  const mobilePhoneClass = useLightChrome
    ? 'pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-700 ease-in-out hover:border-white/35 hover:bg-white/10 sm:hidden'
    : 'pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/15 text-[#1a1a1a] transition-colors duration-700 ease-in-out hover:border-[#1a1a1a]/30 hover:bg-[#1a1a1a]/5 sm:hidden';

  const desktopPhoneClass = useLightChrome
    ? 'pointer-events-auto hidden whitespace-nowrap text-base font-semibold tracking-[0.06em] text-[#C9A962] transition-colors duration-700 ease-in-out hover:text-[#d4b56e] sm:inline-flex md:text-lg'
    : 'pointer-events-auto hidden whitespace-nowrap text-base font-semibold tracking-[0.06em] text-[#1a1a1a] transition-colors duration-700 ease-in-out hover:text-[#B8954F] sm:inline-flex md:text-lg';

  return (
    <>
      <a
        href={site.phoneHref}
        className={mobilePhoneClass}
        aria-label={`${messages.callAria} ${site.phone}`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </a>

      <a href={site.phoneHref} className={desktopPhoneClass}>
        {site.phone}
      </a>
    </>
  );
}

function HeaderBrand({
  onNavigate,
  useLightChrome,
}: {
  onNavigate: () => void;
  useLightChrome: boolean;
}) {
  const { site } = useSiteContent();
  return (
    <Link
      href="/"
      scroll={false}
      onClick={onNavigate}
      className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 px-1 py-1 sm:gap-3"
      aria-label={site.name}
    >
      <img
        src={site.logoUrl}
        alt="БЦ BEREKE — логотип Bereke Development"
        className="h-11 w-11 shrink-0 rounded-sm object-contain sm:h-13 sm:w-13 md:h-14 md:w-14"
      />
      <span className="flex flex-col items-start leading-none">
        <span
          className={`${HEADER_CHROME_TRANSITION} text-[1.3rem] tracking-[0.1em] sm:text-[1.5rem] md:text-[1.7rem] ${
            useLightChrome ? 'text-white' : 'text-[#1a1a1a]'
          }`}
          style={{ fontFamily: 'var(--font-playfair-display)' }}
        >
          BEREKE
        </span>
        <span
          className={`${HEADER_CHROME_TRANSITION} mt-1 text-[8px] font-medium tracking-[0.38em] sm:text-[9px] md:text-[10px] ${
            useLightChrome ? 'text-[#C9A962]' : 'text-[#1a1a1a]/58'
          }`}
        >
          DEVELOPMENT
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { nav } = useSiteContent();
  const { locale, messages } = useLocale();
  const navItems = nav.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const surfaceCommittedRef = useRef(false);
  const surfacePendingRef = useRef<boolean | null>(null);
  const surfaceTimerRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [onLightSurface, setOnLightSurface] = useState(false);

  useScrollLock(menuOpen);

  useEffect(() => {
    document.documentElement.dataset.menuOpen = menuOpen ? 'true' : 'false';
    return () => {
      delete document.documentElement.dataset.menuOpen;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setMenuRendered(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMenuActive(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setMenuActive(false);
    const timeout = window.setTimeout(() => setMenuRendered(false), MENU_PANEL_MS);
    return () => window.clearTimeout(timeout);
  }, [menuOpen]);

  useEffect(() => {
    let raf = 0;

    const clearSurfaceTimer = () => {
      if (surfaceTimerRef.current) {
        clearTimeout(surfaceTimerRef.current);
        surfaceTimerRef.current = null;
      }
      surfacePendingRef.current = null;
    };

    const commitSurface = (detected: boolean) => {
      clearSurfaceTimer();
      surfaceCommittedRef.current = detected;
      setOnLightSurface(detected);
    };

    const updateHeader = (immediate = false) => {
      setScrolled(getEffectiveScrollY() > 40);
      const detected = detectHeaderOnLightSurface(headerRef.current);

      if (immediate) {
        commitSurface(detected);
        return;
      }

      // Already showing this surface — cancel any pending flip back
      if (detected === surfaceCommittedRef.current) {
        clearSurfaceTimer();
        return;
      }

      // Keep waiting for the same pending surface; do not restart the timer
      // on every scroll frame (that prevented color changes while scrolling).
      if (detected === surfacePendingRef.current && surfaceTimerRef.current) {
        return;
      }

      clearSurfaceTimer();
      surfacePendingRef.current = detected;
      surfaceTimerRef.current = window.setTimeout(() => {
        surfaceCommittedRef.current = detected;
        setOnLightSurface(detected);
        surfaceTimerRef.current = null;
        surfacePendingRef.current = null;
      }, SURFACE_SWITCH_MS);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updateHeader());
    };

    updateHeader(true);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('load', scheduleUpdate);

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-header-surface'],
    });

    return () => {
      cancelAnimationFrame(raf);
      if (surfaceTimerRef.current) {
        clearTimeout(surfaceTimerRef.current);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('load', scheduleUpdate);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (menuOpen || !pendingScrollId) return;

    const id = pendingScrollId;
    setPendingScrollId(null);

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [menuOpen, pendingScrollId]);

  const navigateTo = (href: string) => {
    const id = href.replace('#', '');
    setMenuOpen(false);

    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    setPendingScrollId(id);
  };

  const useLightChrome = menuOpen ? true : !onLightSurface;
  const showGlass = scrolled || menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        data-chrome={useLightChrome ? 'light' : 'dark'}
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-0 left-0 z-50 px-3 sm:top-4 sm:px-6"
      >
        <div
          className={`site-header-glass mx-auto w-full max-w-7xl rounded-[18px] border transition-[border-color,box-shadow] duration-700 ease-in-out sm:rounded-[26px] ${
            showGlass
              ? useLightChrome
                ? 'site-header-glass--blur site-header-glass--on-dark border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
                : 'site-header-glass--blur site-header-glass--on-light border-black/10 shadow-[0_8px_32px_rgba(26,26,26,0.08)]'
              : 'border-transparent shadow-none'
          }`}
        >
          <div className="site-header-glass__inner relative flex h-16 items-center px-4 sm:h-[5rem] sm:px-8">
            <div className="pointer-events-none relative z-20 flex flex-1 items-center justify-start">
              <HeaderPhoneLink useLightChrome={useLightChrome} />
            </div>

            <HeaderBrand onNavigate={() => setMenuOpen(false)} useLightChrome={useLightChrome} />

            <div className="pointer-events-none relative z-20 flex flex-1 items-center justify-end">
              <div className="hidden sm:block">
                <LanguageSwitcher useLightChrome={useLightChrome} />
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                data-open={menuOpen ? 'true' : 'false'}
                className={`header-burger pointer-events-auto flex h-10 w-10 items-center justify-center transition-colors duration-700 ease-in-out ${
                  useLightChrome ? 'text-white' : 'text-[#1a1a1a]'
                }`}
                aria-label={menuOpen ? messages.closeMenu : messages.openMenu}
                aria-expanded={menuOpen}
              >
                <span className="header-burger__line header-burger__line--top" />
                <span className="header-burger__line header-burger__line--middle" />
                <span className="header-burger__line header-burger__line--bottom" />
              </button>
            </div>
          </div>

          {FUTURE_PROJECTS.length > 0 && (
            <nav
              className="site-header-glass__inner hidden justify-center gap-6 px-6 pb-3 lg:flex"
              aria-label={messages.projectsNav}
            >
              {FUTURE_PROJECTS.map((p) => (
                <button key={p.id} className="text-xs uppercase tracking-widest text-[#C9A962]">
                  {p.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {menuRendered ? (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-black/96 backdrop-blur-md"
          style={{
            paddingTop: 'max(5.5rem, calc(env(safe-area-inset-top) + 4.5rem))',
            paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
            opacity: menuActive ? 1 : 0,
            transform: menuActive ? 'translateY(0)' : 'translateY(12px)',
            pointerEvents: menuActive ? 'auto' : 'none',
            transition: `opacity ${MENU_PANEL_MS}ms ${MENU_EASE}, transform ${MENU_PANEL_MS}ms ${MENU_EASE}`,
          }}
          aria-hidden={!menuOpen}
        >
          <nav className="flex min-h-0 flex-1 flex-col px-6 py-6 sm:px-8 sm:py-8">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                type="button"
                onClick={() => navigateTo(item.href)}
                style={{
                  opacity: menuActive ? 1 : 0,
                  transform: menuActive ? 'translateY(0)' : 'translateY(16px)',
                  transitionProperty: 'transform, opacity, color',
                  transitionDuration: `${MENU_ITEM_MS}ms`,
                  transitionTimingFunction: MENU_EASE,
                  transitionDelay: menuActive
                    ? `${MENU_ITEM_START_DELAY_MS + index * MENU_ITEM_STAGGER_MS}ms`
                    : `${(navItems.length - 1 - index) * MENU_CLOSE_STAGGER_MS}ms`,
                }}
                className="group flex w-full items-center gap-3 border-b border-white/10 py-5 text-left text-lg tracking-wide text-white/88 transition-colors hover:text-[#C9A962]"
              >
                <span
                  className="h-px w-0 shrink-0 bg-[#C9A962] transition-all duration-300 group-hover:w-4"
                  aria-hidden
                />
                {localizedNavLabel(item, locale)}
              </button>
            ))}

            <div
              className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-6 sm:hidden"
              style={{
                opacity: menuActive ? 1 : 0,
                transform: menuActive ? 'translateY(0)' : 'translateY(12px)',
                transitionProperty: 'transform, opacity',
                transitionDuration: `${MENU_ITEM_MS}ms`,
                transitionTimingFunction: MENU_EASE,
                transitionDelay: menuActive
                  ? `${MENU_ITEM_START_DELAY_MS + navItems.length * MENU_ITEM_STAGGER_MS}ms`
                  : '0ms',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                {locale === 'kk' ? 'Тіл' : 'Язык'}
              </p>
              <LanguageSwitcher variant="menu" />
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
