'use client';

import type { SiteContentData } from '@/lib/content-types';
import { Field, SaveBar, Toggle } from '../components/AdminFormBits';
import { newId, useAdminContent } from '../hooks/useAdminContent';

export default function AdminCalculatorPage() {
  const { content, setContent, loading, saving, message, save } = useAdminContent();

  if (loading || !content) {
    return <p className="text-[var(--admin-muted)]">Загрузка…</p>;
  }

  function patch(updater: (current: SiteContentData) => SiteContentData) {
    setContent((prev) => (prev ? updater(prev) : prev));
  }

  const calc = content.calculator;
  const tiers = [
    ['under200', 'До 200 м²'],
    ['from200to400', '200–400 м²'],
    ['over400', 'Более 400 м²'],
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">Калькулятор</p>
        <h2 className="mt-2 text-3xl md:text-4xl">Цены и лоты</h2>
      </div>

      <section className="admin-card grid gap-4 p-5 md:grid-cols-3">
        <Field
          label="Мин. площадь"
          type="number"
          value={String(calc.minArea)}
          onChange={(minArea) =>
            patch((c) => ({
              ...c,
              calculator: { ...c.calculator, minArea: Number(minArea) || 0 },
            }))
          }
        />
        <Field
          label="Макс. площадь"
          type="number"
          value={String(calc.maxArea)}
          onChange={(maxArea) =>
            patch((c) => ({
              ...c,
              calculator: { ...c.calculator, maxArea: Number(maxArea) || 0 },
            }))
          }
        />
        <Field
          label="Площадь по умолчанию"
          type="number"
          value={String(calc.defaultArea)}
          onChange={(defaultArea) =>
            patch((c) => ({
              ...c,
              calculator: { ...c.calculator, defaultArea: Number(defaultArea) || 0 },
            }))
          }
        />
        <Field
          label="Пресеты (через запятую)"
          value={calc.presets.join(', ')}
          onChange={(presets) =>
            patch((c) => ({
              ...c,
              calculator: {
                ...c.calculator,
                presets: presets
                  .split(',')
                  .map((part) => Number(part.trim()))
                  .filter((n) => Number.isFinite(n)),
              },
            }))
          }
        />
        <Field
          label="1 этаж: кол-во помещений"
          type="number"
          value={String(calc.firstFloorCommercial.units)}
          onChange={(units) =>
            patch((c) => ({
              ...c,
              calculator: {
                ...c.calculator,
                firstFloorCommercial: {
                  ...c.calculator.firstFloorCommercial,
                  units: Number(units) || 0,
                },
              },
            }))
          }
        />
        <Field
          label="1 этаж: площади м² (через запятую)"
          value={(calc.firstFloorCommercial.areasSqm || []).join(', ')}
          onChange={(areas) =>
            patch((c) => ({
              ...c,
              calculator: {
                ...c.calculator,
                firstFloorCommercial: {
                  ...c.calculator.firstFloorCommercial,
                  areasSqm: areas
                    .split(',')
                    .map((part) => Number(part.trim()))
                    .filter((n) => Number.isFinite(n) && n > 0),
                },
              },
            }))
          }
        />
        <Field
          label="1 этаж: высота потолков (м)"
          type="number"
          value={String(calc.firstFloorCommercial.ceilingHeightM ?? 4.5)}
          onChange={(ceilingHeightM) =>
            patch((c) => ({
              ...c,
              calculator: {
                ...c.calculator,
                firstFloorCommercial: {
                  ...c.calculator.firstFloorCommercial,
                  ceilingHeightM: Number(ceilingHeightM) || 0,
                },
              },
            }))
          }
        />
        <Field
          label="1 этаж: назначение"
          value={calc.firstFloorCommercial.purpose}
          onChange={(purpose) =>
            patch((c) => ({
              ...c,
              calculator: {
                ...c.calculator,
                firstFloorCommercial: {
                  ...c.calculator.firstFloorCommercial,
                  purpose,
                },
              },
            }))
          }
        />
        <Field
          label="1 этаж: цена ₸/м²"
          type="number"
          value={String(calc.firstFloorCommercial.pricePerSqm)}
          onChange={(pricePerSqm) =>
            patch((c) => ({
              ...c,
              calculator: {
                ...c.calculator,
                firstFloorCommercial: {
                  ...c.calculator.firstFloorCommercial,
                  pricePerSqm: Number(pricePerSqm) || 0,
                },
              },
            }))
          }
        />
      </section>

      <section className="admin-card space-y-4 p-5">
        <h3 className="text-xl">Таблица цен (₸/м²)</h3>
        {tiers.map(([key, label]) => (
          <div key={key} className="admin-item-card">
            <p className="mb-3 text-sm font-semibold">{label}</p>
            <div className="grid gap-3 md:grid-cols-4">
              {([100, 70, 50, 30] as const).map((percent) => (
                <Field
                  key={percent}
                  label={`${percent}% оплаты`}
                  type="number"
                  value={String(calc.priceTable[key][percent])}
                  onChange={(value) =>
                    patch((c) => ({
                      ...c,
                      calculator: {
                        ...c.calculator,
                        priceTable: {
                          ...c.calculator.priceTable,
                          [key]: {
                            ...c.calculator.priceTable[key],
                            [percent]: Number(value) || 0,
                          },
                        },
                      },
                    }))
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="admin-card space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl">Лоты калькулятора</h3>
          <button
            type="button"
            className="admin-btn admin-btn-gold"
            onClick={() =>
              patch((c) => ({
                ...c,
                calculatorLots: [
                  ...c.calculatorLots,
                  {
                    id: newId('calc-lot'),
                    area: 60,
                    floor: 2,
                    label: 'Новый лот',
                    labelKk: '',
                    visible: true,
                    order: c.calculatorLots.length,
                  },
                ],
              }))
            }
          >
            Добавить лот
          </button>
        </div>
        {content.calculatorLots
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((lot) => (
            <div key={lot.id} className="admin-item-card">
              <div className="admin-item-toolbar">
                <Toggle
                  label="Виден"
                  checked={lot.visible}
                  onChange={(visible) =>
                    patch((c) => ({
                      ...c,
                      calculatorLots: c.calculatorLots.map((entry) =>
                        entry.id === lot.id ? { ...entry, visible } : entry,
                      ),
                    }))
                  }
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-danger ml-auto"
                  onClick={() => {
                    if (confirm('Удалить лот?')) {
                      patch((c) => ({
                        ...c,
                        calculatorLots: c.calculatorLots.filter((entry) => entry.id !== lot.id),
                      }));
                    }
                  }}
                >
                  Удалить
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="Площадь"
                  type="number"
                  value={String(lot.area)}
                  onChange={(area) =>
                    patch((c) => ({
                      ...c,
                      calculatorLots: c.calculatorLots.map((entry) =>
                        entry.id === lot.id ? { ...entry, area: Number(area) || 0 } : entry,
                      ),
                    }))
                  }
                />
                <Field
                  label="Этаж"
                  type="number"
                  value={String(lot.floor)}
                  onChange={(floor) =>
                    patch((c) => ({
                      ...c,
                      calculatorLots: c.calculatorLots.map((entry) =>
                        entry.id === lot.id ? { ...entry, floor: Number(floor) || 0 } : entry,
                      ),
                    }))
                  }
                />
                <Field
                  label="Описание · RU"
                  value={lot.label}
                  onChange={(label) =>
                    patch((c) => ({
                      ...c,
                      calculatorLots: c.calculatorLots.map((entry) =>
                        entry.id === lot.id ? { ...entry, label } : entry,
                      ),
                    }))
                  }
                />
                <Field
                  label="Описание · KZ"
                  value={lot.labelKk || ''}
                  onChange={(labelKk) =>
                    patch((c) => ({
                      ...c,
                      calculatorLots: c.calculatorLots.map((entry) =>
                        entry.id === lot.id ? { ...entry, labelKk } : entry,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          ))}
      </section>

      <SaveBar saving={saving} message={message} onSave={() => void save(content)} />
    </div>
  );
}
