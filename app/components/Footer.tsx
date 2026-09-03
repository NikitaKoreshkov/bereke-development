'use client';

import { type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorLink } from '@/components/ui/AnchorLink';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import {
  localizedAddressBC,
  localizedAddressSales,
  localizedCopy,
  localizedNavLabel,
} from '@/lib/i18n/localized';

function FooterLabel({ children }: { children: string }) {
  return (
    <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#C9A962]/80">{children}</p>
  );
}

function ContactItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</p>
      <div className="text-sm leading-relaxed text-white/80">{children}</div>
    </div>
  );
}

export default function Footer() {
  const { copy, copyKk, nav, site } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const addressBC = localizedAddressBC(site, locale);
  const addressSales = localizedAddressSales(site, locale);
  const navItems = nav.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const pathname = usePathname();
  const navHref = (href: string) => (href.startsWith('#') ? `/${href}` : href);
  const contactsHref = pathname === '/' ? '#contacts' : '/#contacts';

  const goToContacts = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;
    const el = document.getElementById('contacts');
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', '#contacts');
  };

  return (
    <footer key={locale} className="relative overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/35 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <ScrollReveal variant="up" className="lg:col-span-4">
            <img
              src={site.logoUrl}
              alt={site.name}
              className="mb-6 h-16 w-auto object-contain sm:h-[4.5rem]"
            />
            <p
              className="mb-3 max-w-xs text-lg leading-snug text-white/90 sm:text-xl"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {t.footerTagline}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-white/45">{t.footerDescription}</p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/60 transition-all hover:border-[#C9A962]/40 hover:bg-[#C9A962]/8 hover:text-[#C9A962]"
                aria-label={`Instagram ${site.instagramHandle}`}
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/60 transition-all hover:border-[#C9A962]/40 hover:bg-[#C9A962]/8 hover:text-[#C9A962]"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
              <span className="ml-1 text-xs tracking-wide text-white/35">{site.instagramHandle}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={80} className="lg:col-span-2">
            <FooterLabel>{t.footerNavLabel}</FooterLabel>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <AnchorLink
                  key={item.href}
                  href={pathname === '/' ? item.href : navHref(item.href)}
                  className="group inline-flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-[#C9A962]"
                >
                  <span className="h-px w-0 bg-[#C9A962] transition-all group-hover:w-3" aria-hidden />
                  {localizedNavLabel(item, locale)}
                </AnchorLink>
              ))}
            </nav>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={140} className="lg:col-span-4">
            <FooterLabel>{t.footerContactsLabel}</FooterLabel>
            <div className="space-y-5">
              <a
                href={site.phoneHref}
                className="block text-xl tracking-wide text-white transition-colors hover:text-[#C9A962] sm:text-2xl"
              >
                {site.phone}
              </a>

              <div className="grid gap-5 sm:grid-cols-2">
                <ContactItem label="WhatsApp">
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#C9A962]"
                  >
                    {site.phone}
                  </a>
                </ContactItem>
                <ContactItem label="Email">
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-[#C9A962]">
                    {site.email}
                  </a>
                </ContactItem>
                <ContactItem label={t.footerAddressBcLabel}>{addressBC}</ContactItem>
                <ContactItem label={t.footerSalesLabel}>{addressSales}</ContactItem>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={200} className="lg:col-span-2">
            <FooterLabel>{t.footerMaterialsLabel}</FooterLabel>
            <div className="flex flex-col gap-3">
              <a
                href={site.brochureUrl}
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#C9A962] to-[#B8954F] px-5 py-3.5 text-[10px] uppercase tracking-[0.16em] text-[#1a1a1a] shadow-[0_8px_28px_rgba(201,169,98,0.22)] transition-all hover:shadow-[0_12px_36px_rgba(201,169,98,0.32)] hover:brightness-105 sm:text-[11px]"
              >
                {t.footerBrochureCta}
              </a>
              <AnchorLink
                href={contactsHref}
                onClick={goToContacts}
                className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-white/75 transition-all hover:border-[#C9A962]/45 hover:text-[#C9A962]"
              >
                {t.footerContactsCta}
              </AnchorLink>
            </div>

            <div className="mt-10 hidden h-px w-full bg-gradient-to-r from-[#C9A962]/30 to-transparent lg:block" aria-hidden />
            <p className="mt-6 hidden text-xs leading-relaxed text-white/30 lg:block">
              {t.footerLocationLine}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="blur" delay={100}>
          <div className="mt-16 border-t border-white/[0.07] pt-8 sm:mt-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] leading-relaxed tracking-wide text-white/35">
                {t.footerLegal ||
                  `© ${new Date().getFullYear()} ТОО «Bereke Development». Все права защищены.`}
              </p>
              <Link
                href="/privacy-policy"
                className="text-[11px] tracking-wide text-white/35 underline decoration-white/15 underline-offset-4 transition-colors hover:text-[#C9A962] hover:decoration-[#C9A962]/40"
              >
                {t.footerPrivacyLink}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
