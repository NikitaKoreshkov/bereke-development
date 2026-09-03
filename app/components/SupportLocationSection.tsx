'use client';

import { useEffect, useRef, useState } from 'react';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import { MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { useSiteContent } from '@/lib/content-context';
import { useLocale } from '@/lib/i18n/locale-context';
import { localizedAddressBC, localizedCopy, localizedMapNote } from '@/lib/i18n/localized';

function BlockLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/55">{children}</p>
  );
}

function BlockTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-5 text-xl uppercase tracking-wide sm:text-2xl md:text-3xl">{children}</h2>
  );
}

function LazyMapEmbed({ query, title }: { query: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || active) return;

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-[#1a1a1a]/8 bg-gray-100 sm:min-h-[320px]"
    >
      {active ? (
        <iframe
          title={title}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
}

interface SupportLocationSectionProps {
  onCallbackOpen: () => void;
}

export default function SupportLocationSection({ onCallbackOpen }: SupportLocationSectionProps) {
  const { copy, copyKk, site } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const address = localizedAddressBC(site, locale);
  const mapNote = localizedMapNote(site, locale);

  return (
    <section key={locale} id="contacts" className="section-bg-limestone py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="px-1 py-2">
          <ServicesPanelGlass id="support-location" tone="light" className="[--panel-radius:24px]">
            <div className="grid lg:grid-cols-2 lg:items-stretch">
              <div
                id="support"
                className="flex h-full flex-col border-b border-[#1a1a1a]/8 px-6 py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:border-r"
              >
                <div className="text-center sm:text-left">
                  <BlockLabel>{t.supportSectionLabel}</BlockLabel>
                  <BlockTitle>{t.supportTitle}</BlockTitle>
                  <p className="mb-6 min-h-[3.25rem] text-sm leading-relaxed text-gray-600">
                    {t.supportSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={onCallbackOpen}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1a1a1a] px-4 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[#1a1a1a] hover:text-white sm:text-xs"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0" />
                    {t.supportCallbackCta}
                  </button>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1a1a1a] px-4 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[#1a1a1a] hover:text-white sm:text-xs"
                  >
                    <MailIcon className="h-4 w-4 shrink-0" />
                    {t.supportEmailCta}
                  </a>
                </div>

                <div className="mt-8 border-t border-[#1a1a1a]/8 pt-6 lg:mt-auto lg:pt-8">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#1a1a1a]/55">
                    {t.supportDirectContacts}
                  </p>
                  <ul className="space-y-3.5">
                    <li>
                      <a
                        href={site.phoneHref}
                        className="inline-flex items-center gap-3 text-sm text-[#1a1a1a] transition-opacity hover:opacity-65"
                      >
                        <PhoneIcon className="h-4 w-4 shrink-0 text-[#1a1a1a]" />
                        {site.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={site.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sm text-[#1a1a1a] transition-opacity hover:opacity-65"
                      >
                        <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#1a1a1a]" />
                        WhatsApp
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="inline-flex items-center gap-3 text-sm text-[#1a1a1a] transition-opacity hover:opacity-65"
                      >
                        <MailIcon className="h-4 w-4 shrink-0 text-[#1a1a1a]" />
                        {site.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div id="location" className="flex h-full flex-col px-6 py-8 sm:px-8 sm:py-10">
                <div className="text-center sm:text-left">
                  <BlockLabel>{t.locationTitle}</BlockLabel>
                  <BlockTitle>{t.locationBrandTitle}</BlockTitle>
                  <p className="mb-6 min-h-[3.25rem] text-sm leading-relaxed text-gray-600">
                    {address}
                    <span className="mt-1 block text-gray-500">({mapNote})</span>
                  </p>
                </div>

                <LazyMapEmbed query={site.mapQuery} title={t.locationMapAria} />
              </div>
            </div>
          </ServicesPanelGlass>
        </div>
      </div>
    </section>
  );
}
