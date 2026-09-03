'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSiteContent } from '@/lib/content-context';
import HeroSection from './HeroSection';
import BerekeProjectSection from './BerekeProjectSection';

const AdvantagesSection = dynamic(() => import('./AdvantagesSection'));
const ArchitectureSection = dynamic(() => import('./ArchitectureSection'));
const ConstructionProgressSection = dynamic(() => import('./ConstructionProgressSection'));
const SupportLocationSection = dynamic(() => import('./SupportLocationSection'));
const LayoutsSection = dynamic(() => import('./LayoutsSection'));
const FaqSection = dynamic(() => import('./FaqSection'));
const Footer = dynamic(() => import('./Footer'));
const CallbackModal = dynamic(() => import('./CallbackModal'));
const FloatingConsultation = dynamic(() => import('./FloatingConsultation'), {
  ssr: false,
});

export default function HomePageContent() {
  const { sections } = useSiteContent();
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
    setCallbackOpen(false);
    setCallbackName('');
    setCallbackPhone('');
  };

  return (
    <div className="bg-[var(--color-surface-graphite)] text-[#1a1a1a]">
      {sections.hero ? <HeroSection onConsultation={() => scrollTo('contacts')} /> : null}

      {sections.bereke ? <BerekeProjectSection onScrollTo={scrollTo} /> : null}

      {sections.advantages ? <AdvantagesSection /> : null}

      {sections.architecture ? <ArchitectureSection onScrollTo={scrollTo} /> : null}

      {sections.layouts ? <LayoutsSection /> : null}

      {sections.contacts ? (
        <SupportLocationSection
          onCallbackOpen={() => {
            setCallbackOpen(true);
            setCallbackSubmitted(false);
          }}
        />
      ) : null}

      <FaqSection />

      {sections.construction ? <ConstructionProgressSection /> : null}

      {callbackOpen ? (
        <CallbackModal
          open={callbackOpen}
          onClose={() => setCallbackOpen(false)}
          name={callbackName}
          phone={callbackPhone}
          submitted={callbackSubmitted}
          onNameChange={setCallbackName}
          onPhoneChange={setCallbackPhone}
          onSubmit={handleCallback}
        />
      ) : null}

      {sections.footer ? <Footer /> : null}
      <FloatingConsultation />
    </div>
  );
}
