'use client';

import { useState } from 'react';
import { SEO_FAQ } from '@/lib/seo';
import { useLocale } from '@/lib/i18n/locale-context';

export default function FaqSection() {
  const { locale } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      key={locale}
      className="section-bg-graphite border-t border-[#C9A962]/10 py-16 sm:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] uppercase tracking-[0.35em] text-[#C9A962]/80">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="mt-3 text-center text-xl uppercase tracking-[0.08em] text-white sm:text-2xl md:text-3xl"
          style={{ fontFamily: 'var(--font-playfair-display)' }}
        >
          {locale === 'kk' ? 'Жиі қойылатын сұрақтар' : 'Частые вопросы'}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-white/50">
          {locale === 'kk'
            ? 'BEREKE БО, бағалар, орналасуы және сатып алу шарттары туралы қысқа жауаптар.'
            : 'Коротко о БЦ BEREKE: локация, цены, площади и условия покупки офиса в Алматы.'}
        </p>

        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {SEO_FAQ.map((item, index) => {
            const open = openIndex === index;
            const question = locale === 'kk' ? item.questionKk : item.question;
            const answer = locale === 'kk' ? item.answerKk : item.answer;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-[#C9A962]"
                  >
                    <span className="text-sm font-medium leading-snug text-white sm:text-[15px]">
                      {question}
                    </span>
                    <span
                      className={`mt-0.5 shrink-0 text-[#C9A962] transition-transform duration-300 ${
                        open ? 'rotate-45' : ''
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  hidden={!open}
                  className={open ? 'pb-5' : undefined}
                >
                  {open ? (
                    <p className="pr-8 text-sm leading-relaxed text-white/55 sm:text-[15px] sm:leading-[1.75]">
                      {answer}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
