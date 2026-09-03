'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ServicesPanelGlass } from '@/components/ui/ServicesPanelGlass';
import panelStyles from '@/components/ui/services-panel-glass.module.css';
import { useSiteContent } from '@/lib/content-context';
import type {
  CalculatorLot,
  CalculatorPaymentPercent,
  CalculatorSettings,
  SiteCopy,
} from '@/lib/content-types';
import { useLocale } from '@/lib/i18n/locale-context';
import { fillTemplate, localizedCopy, localizedLotLabel } from '@/lib/i18n/localized';

const STORAGE_KEY = 'bereke-price-calculator-v4';
const TOTAL_STEPS = 3;

type CalculatorState = {
  step: number;
  area: number;
  lotId: string | null;
  paymentPercent: CalculatorPaymentPercent;
};

function formatPrice(value: number, t: SiteCopy) {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} ${t.calcBillion}`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')} ${t.calcMillion}`;
  }

  return value.toLocaleString('ru-RU');
}

function formatTenge(value: number) {
  return `${value.toLocaleString('ru-RU')} ₸`;
}

function lotLine(lot: CalculatorLot, floorLabel: string, label: string) {
  return `${lot.area} м² · ${lot.floor} ${floorLabel} · ${label}`;
}

function getCalculatorPricePerSqm(
  priceTable: CalculatorSettings['priceTable'],
  area: number,
  paymentPercent: CalculatorPaymentPercent,
) {
  const tier =
    area < 200
      ? priceTable.under200
      : area <= 400
        ? priceTable.from200to400
        : priceTable.over400;
  return tier[paymentPercent];
}

function getCalculatorAreaTierLabel(area: number, t: SiteCopy) {
  if (area < 200) return t.calcTierUnder200;
  if (area <= 400) return t.calcTier200to400;
  return t.calcTierOver400;
}

function isPaymentPercent(
  value: unknown,
  allowed: CalculatorPaymentPercent[],
): value is CalculatorPaymentPercent {
  return typeof value === 'number' && (allowed as number[]).includes(value);
}

function defaultState(calculator: CalculatorSettings): CalculatorState {
  return {
    step: 1,
    area: calculator.defaultArea,
    lotId: null,
    paymentPercent: calculator.defaultPaymentPercent,
  };
}

function loadState(calculator: CalculatorSettings, lots: CalculatorLot[]): CalculatorState {
  const fallback = defaultState(calculator);
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as Partial<CalculatorState>;
    const step = typeof parsed.step === 'number' ? Math.min(TOTAL_STEPS, Math.max(1, parsed.step)) : 1;
    const area =
      typeof parsed.area === 'number'
        ? Math.min(calculator.maxArea, Math.max(calculator.minArea, Math.round(parsed.area)))
        : calculator.defaultArea;
    const lotId =
      typeof parsed.lotId === 'string' && lots.some((lot) => lot.id === parsed.lotId)
        ? parsed.lotId
        : null;
    const paymentPercent = isPaymentPercent(parsed.paymentPercent, calculator.paymentPercents)
      ? parsed.paymentPercent
      : calculator.defaultPaymentPercent;

    return { step, area, lotId, paymentPercent };
  } catch {
    return fallback;
  }
}

function persistState(state: CalculatorState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function optionCardClass(selected: boolean) {
  return [
    'micro-hover micro-hover-card rounded-2xl border px-4 py-3 text-left',
    selected
      ? 'border-[#D8C08A]/55 bg-[#D8C08A]/10'
      : 'border-white/10 bg-white/[0.035] hover:border-[#D8C08A]/35',
  ].join(' ');
}

export default function PriceCalculator() {
  const { calculator, calculatorLots: allLots, site, copy, copyKk } = useSiteContent();
  const { locale } = useLocale();
  const t = localizedCopy(copy, copyKk, locale);
  const lots = allLots.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const stepTitles = [t.calcStep1Title, t.calcStep2Title, t.calcStep3Title];
  const stepSubtitles = [t.calcStep1Subtitle, t.calcStep2Subtitle, t.calcStep3Subtitle];

  const {
    minArea: MIN_AREA,
    maxArea: MAX_AREA,
    areaMatchDelta: AREA_MATCH_DELTA,
    maxMatchingLots: MAX_MATCHING_LOTS,
    presets: PRESETS,
    paymentPercents: CALCULATOR_PAYMENT_PERCENTS,
    priceTable,
  } = calculator;

  const [state, setState] = useState<CalculatorState>(() => defaultState(calculator));
  const [hydrated, setHydrated] = useState(false);
  const rangeRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLParagraphElement>(null);
  const areaBounceReadyRef = useRef(false);

  const triggerSliderBounce = useCallback(() => {
    const el = rangeRef.current;
    if (!el) return;
    el.classList.remove('price-calculator-range--bounce');
    void el.offsetWidth;
    el.classList.add('price-calculator-range--bounce');
    window.setTimeout(() => el.classList.remove('price-calculator-range--bounce'), 520);
  }, []);

  const triggerAreaBounce = useCallback(() => {
    const el = areaRef.current;
    if (!el) return;
    el.classList.remove('price-calculator-area-bump');
    void el.offsetWidth;
    el.classList.add('price-calculator-area-bump');
  }, []);

  useEffect(() => {
    const el = rangeRef.current;
    if (!el) return;
    const onAnimEnd = () => el.classList.remove('price-calculator-range--bounce');
    el.addEventListener('animationend', onAnimEnd);
    return () => el.removeEventListener('animationend', onAnimEnd);
  }, []);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const onAnimEnd = () => el.classList.remove('price-calculator-area-bump');
    el.addEventListener('animationend', onAnimEnd);
    return () => el.removeEventListener('animationend', onAnimEnd);
  }, []);

  useEffect(() => {
    setState(loadState(calculator, lots));
    setHydrated(true);
    // Load once on mount from current content defaults / localStorage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistState(state);
  }, [state, hydrated]);

  const { step, area, lotId, paymentPercent } = state;

  useEffect(() => {
    if (!hydrated) return;
    if (!areaBounceReadyRef.current) {
      areaBounceReadyRef.current = true;
      return;
    }
    triggerAreaBounce();
  }, [area, hydrated, triggerAreaBounce]);

  const sliderProgress = ((area - MIN_AREA) / (MAX_AREA - MIN_AREA)) * 100;
  const pricePerSqm = getCalculatorPricePerSqm(priceTable, area, paymentPercent);
  const totalPrice = area * pricePerSqm;
  const areaTierLabel = getCalculatorAreaTierLabel(area, t);

  const matchingLots = useMemo(() => {
    return lots
      .filter((lot) => lot.floor !== 1 && Math.abs(lot.area - area) <= AREA_MATCH_DELTA)
      .slice(0, MAX_MATCHING_LOTS);
  }, [AREA_MATCH_DELTA, MAX_MATCHING_LOTS, area, lots]);

  const selectedLot = lotId ? lots.find((lot) => lot.id === lotId) : null;
  const selectedLotLabel = selectedLot ? localizedLotLabel(selectedLot, locale) : '';
  const selectedLotLine = selectedLot
    ? lotLine(selectedLot, t.calcFloor, selectedLotLabel)
    : '';

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    [
      t.calcWhatsappIntro,
      `${t.calcWhatsappArea} ${area} м² (${areaTierLabel})`,
      `${t.calcWhatsappPayment} ${paymentPercent}%`,
      `${t.calcWhatsappEstimate} ${formatTenge(totalPrice)}`,
      selectedLot ? `${t.calcWhatsappLot} ${selectedLotLine}` : null,
      `${t.calcWhatsappPricePerSqm} ${formatTenge(pricePerSqm)}`,
    ]
      .filter(Boolean)
      .join('\n'),
  )}`;

  const patch = useCallback((partial: Partial<CalculatorState>) => {
    setState((current) => ({ ...current, ...partial }));
  }, []);

  const goBack = () => {
    if (step <= 1) return;
    patch({ step: step - 1 });
  };

  const goNext = () => {
    if (step >= TOTAL_STEPS) return;
    patch({ step: step + 1 });
  };

  return (
    <div id="calculator" className="price-calculator-root flex h-full min-w-0 flex-1 flex-col">
      <ServicesPanelGlass
        id="price-calculator"
        tone="dark"
        className={`${panelStyles.shellCalculator} ${panelStyles.shellNeutralRim} layouts-twin-panel price-calculator-panel h-full flex-1 [--panel-radius:20px] sm:[--panel-radius:24px]`}
      >
        <div className="flex h-full min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-3 sm:gap-3 sm:px-8 sm:py-3.5 xl:px-5 xl:py-3">
            <div className="min-w-0 flex items-center gap-2 sm:gap-2.5">
              <span className="hidden h-px w-5 shrink-0 bg-gradient-to-r from-[#D8C08A]/80 to-transparent sm:block" aria-hidden />
              <p className="truncate text-[9px] font-medium uppercase tracking-[0.22em] text-[#D8C08A]/90 sm:text-[10px] sm:tracking-[0.3em]">
                {t.calcTitle}
              </p>
            </div>
            <div
              className="flex items-center gap-1.5"
              aria-label={fillTemplate(t.calcStepAria, { step, total: TOTAL_STEPS })}
            >
              {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                const stepNum = i + 1;
                const active = stepNum === step;
                const done = stepNum < step;
                return (
                  <span
                    key={stepNum}
                    className={[
                      'block rounded-full transition-all duration-500',
                      active
                        ? 'h-1 w-4 bg-gradient-to-r from-[#B8954F] to-[#D8C08A]'
                        : done
                          ? 'h-1 w-1 bg-[#D8C08A]/60'
                          : 'h-1 w-1 bg-white/15',
                    ].join(' ')}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-8 sm:py-5 xl:px-5 xl:py-4">
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="shrink-0">
                <h3
                  className="text-lg font-normal tracking-wide text-[#F4EFE7] sm:text-xl xl:text-[1.35rem]"
                  style={{ fontFamily: 'var(--font-playfair-display)' }}
                >
                  {stepTitles[step - 1]}
                </h3>
                <p className="mt-1.5 max-w-2xl text-[12px] leading-snug text-white/55 sm:mt-2 sm:text-[13px] sm:leading-relaxed">
                  {stepSubtitles[step - 1]}
                </p>
              </div>

              <div
                className={
                  step === 3
                    ? 'mt-3.5 shrink-0 sm:mt-4'
                    : 'mt-3 flex min-h-0 flex-1 flex-col sm:mt-4'
                }
              >
                {step === 1 ? (
                  <>
                    <div className="flex items-end justify-between gap-3">
                      <p
                        ref={areaRef}
                        className="text-3xl font-light tabular-nums text-white sm:text-4xl"
                        style={{ fontFamily: 'var(--font-playfair-display)' }}
                      >
                        {area}
                        <span className="ml-1 text-sm font-normal text-white/45 sm:ml-1.5 sm:text-base">м²</span>
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-4">
                      <div className="price-calculator-slider px-0.5 py-2 sm:px-1 sm:py-1.5">
                        <div className="relative flex min-h-6 items-center">
                          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/10" />
                          <div
                            className="price-calculator-range-fill pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#B8954F] to-[#D8C08A]"
                            style={{ width: `${sliderProgress}%` }}
                            aria-hidden
                          />
                          <input
                            ref={rangeRef}
                            type="range"
                            min={MIN_AREA}
                            max={MAX_AREA}
                            value={area}
                            onChange={(event) =>
                              patch({ area: Number(event.target.value), lotId: null })
                            }
                            onPointerUp={triggerSliderBounce}
                            className="price-calculator-range relative z-10"
                            aria-label={t.calcAreaAria}
                          />
                        </div>
                      </div>
                      <div className="mt-0.5 flex justify-between px-0.5 text-[10px] tabular-nums text-white/34 sm:px-1 sm:text-[11px]">
                        <span>{MIN_AREA} м²</span>
                        <span>{MAX_AREA} м²</span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-2">
                      {PRESETS.map((preset) => {
                        const selected = area === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              patch({ area: preset, lotId: null });
                              triggerSliderBounce();
                            }}
                            className={[
                              'micro-hover micro-hover-pill rounded-full border px-2 py-2 text-center text-[11px] font-semibold tabular-nums sm:px-3 sm:py-2 sm:text-xs',
                              selected
                                ? 'border-[#D8C08A] bg-[#D8C08A]/14 text-[#F2DDA8]'
                                : 'border-white/10 text-white/52 hover:border-[#D8C08A]/55 hover:text-[#F2DDA8]',
                            ].join(' ')}
                          >
                            {preset} м²
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    {matchingLots.length > 0 ? (
                      <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                        {matchingLots.map((lot) => {
                          const selected = lotId === lot.id;
                          const lotPrice =
                            lot.area * getCalculatorPricePerSqm(priceTable, lot.area, paymentPercent);
                          const lotLabel = localizedLotLabel(lot, locale);
                          return (
                            <button
                              key={lot.id}
                              type="button"
                              onClick={() => patch({ lotId: selected ? null : lot.id })}
                              className={`${optionCardClass(selected)} flex w-full flex-col items-stretch gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4`}
                            >
                              <div className="min-w-0 text-left">
                                <p
                                  className={`text-base tabular-nums ${
                                    selected
                                      ? 'font-semibold text-[#F2DDA8]'
                                      : 'font-medium text-white'
                                  }`}
                                >
                                  {lot.area} м²
                                </p>
                                <p className="mt-0.5 text-[11px] leading-snug text-white/42 sm:mt-1 sm:truncate sm:text-xs">
                                  {lot.floor} {t.calcFloor} · {lotLabel}
                                </p>
                              </div>
                              <p className="text-left text-sm font-semibold tabular-nums text-[#F2DDA8] sm:shrink-0 sm:text-right">
                                ~{formatPrice(lotPrice, t)} ₸
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-[13px] text-white/55 sm:px-5 sm:py-4 sm:text-sm">
                        {fillTemplate(t.calcNoLots, { area })}
                      </p>
                    )}
                    <p className="mt-3 text-[13px] leading-relaxed text-white/55 sm:mt-4 sm:text-sm">
                      {selectedLot ? (
                        <>
                          {t.calcSelected}{' '}
                          <span className="text-[#D8C08A]/80">{selectedLotLine}</span>
                        </>
                      ) : (
                        <>{t.calcOptional}</>
                      )}
                    </p>
                  </>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-3 sm:space-y-3.5">
                    <div>
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/50 sm:text-[11px]">
                        {t.calcPaymentTerms}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {CALCULATOR_PAYMENT_PERCENTS.map((percent) => {
                          const selected = paymentPercent === percent;
                          return (
                            <button
                              key={percent}
                              type="button"
                              onClick={() => patch({ paymentPercent: percent })}
                              className={[
                                'micro-hover rounded-xl border px-1.5 py-2.5 text-center text-[11px] font-semibold tabular-nums sm:text-xs',
                                selected
                                  ? 'border-[#D8C08A] bg-[#D8C08A]/14 text-[#F2DDA8]'
                                  : 'border-white/10 text-white/55 hover:border-[#D8C08A]/45 hover:text-[#F2DDA8]',
                              ].join(' ')}
                            >
                              {percent}%
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#D8C08A]/16 bg-black/18 px-3.5 py-3.5 text-center sm:px-4 sm:py-4">
                      <p
                        className="text-[1.65rem] leading-none text-[#F2DDA8] sm:text-[2.15rem]"
                        style={{ fontFamily: 'var(--font-playfair-display)' }}
                      >
                        ~{formatPrice(totalPrice, t)} ₸
                      </p>
                      <p className="mt-2.5 text-[11px] leading-snug text-white/55">
                        {formatTenge(pricePerSqm)}/м² · {areaTierLabel} · {paymentPercent}%
                      </p>
                      {selectedLot ? (
                        <p className="mt-1.5 text-[11px] text-white/45">
                          {selectedLot.floor} {t.calcFloor} · {selectedLotLabel}
                        </p>
                      ) : null}
                    </div>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="micro-hover micro-hover-cta group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111210] sm:text-[11px] sm:tracking-[0.14em]"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#E8D5A8] via-[#D8C08A] to-[#B8954F] transition-opacity duration-300 group-hover:opacity-90" />
                      <span className="relative">{t.calcGetExact}</span>
                    </a>

                    <p className="pt-0.5 text-center text-[11px] leading-snug text-white/40">
                      {t.calcSalesDept}{' '}
                      <a
                        href={site.phoneHref}
                        className="micro-hover-link text-white/60 hover:text-white/80"
                      >
                        {site.phone}
                      </a>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex shrink-0 items-stretch gap-2.5 border-t border-white/10 pt-4 sm:mt-auto sm:min-h-[52px] sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="micro-hover flex-1 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/75 hover:border-white/20 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-35 sm:flex-none sm:min-w-[7.5rem] sm:px-5"
              >
                {t.calcBack}
              </button>
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="micro-hover flex-1 rounded-xl border border-[#D8C08A]/40 bg-[#D8C08A]/12 px-4 py-2.5 text-sm font-semibold text-[#F2DDA8] hover:border-[#D8C08A]/70 hover:bg-[#D8C08A]/20 hover:text-[#FFE7B0] sm:flex-none sm:min-w-[7.5rem] sm:px-5"
                >
                  {t.calcNext}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </ServicesPanelGlass>
    </div>
  );
}
