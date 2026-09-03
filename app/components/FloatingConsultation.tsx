'use client';

import { useEffect, useState } from 'react';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { useSiteContent } from '@/lib/content-context';

const WHATSAPP_MESSAGE = 'Здравствуйте! Интересует БЦ BEREKE. Хочу получить консультацию.';

export default function FloatingConsultation() {
  const { site } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setMenuOpen(document.documentElement.dataset.menuOpen === 'true');
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-menu-open'],
    });
    return () => observer.disconnect();
  }, []);

  if (menuOpen) return null;

  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="safe-bottom safe-right fixed z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A962] text-[#1a1a1a] shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      aria-label="Написать в WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
    </a>
  );
}
