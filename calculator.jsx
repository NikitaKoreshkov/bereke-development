import { useState, useCallback } from "react";

const PRICE_PER_SQM = 1100000;
const MIN_AREA = 44;
const MAX_AREA = 170;

const LOTS = [
  { area: 44.176, floor: 3, label: "Open space, 6 рабочих мест" },
  { area: 45, floor: 3, label: "Компактный open space" },
  { area: 74.787, floor: 3, label: "Open space, 4 рабочие зоны" },
  { area: 83.848, floor: 3, label: "Open space, вид на город" },
  { area: 83.848, floor: 3, label: "Lounge и рабочая зона" },
  { area: 169.416, floor: 3, label: "Представительский open space" },
];

function formatPrice(value) {
  if (value >= 1e9) return (value / 1e9).toFixed(1).replace(/\.0$/, "") + " млрд";
  if (value >= 1e6) return (value / 1e6).toFixed(1).replace(/\.0$/, "") + " млн";
  return value.toLocaleString("ru-RU");
}

function formatTenge(value) {
  return value.toLocaleString("ru-RU") + " ₸";
}

export default function BerekeCalculator() {
  const [area, setArea] = useState(60);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = area * PRICE_PER_SQM;
  const priceFormatted = formatPrice(totalPrice);

  const matchingLots = LOTS.filter(
    (l) => Math.abs(l.area - area) <= 15
  ).slice(0, 3);

  const progress = ((area - MIN_AREA) / (MAX_AREA - MIN_AREA)) * 100;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setShowForm(false);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#191f2b",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#e8e4dd",
      padding: "0",
    }}>
      {/* Header strip */}
      <div style={{
        borderBottom: "1px solid rgba(201,169,110,0.15)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          width: "8px", height: "8px",
          background: "#ceb78e",
          borderRadius: "50%",
        }} />
        <span style={{
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#ceb78e",
        }}>
          БЦ BEREKE · Калькулятор
        </span>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 24px 60px" }}>
        {/* Title */}
        <h1 style={{
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: 1.2,
          margin: "0 0 8px",
          color: "#fff",
        }}>
          Рассчитайте стоимость офиса
        </h1>
        <p style={{
          fontSize: "15px",
          color: "#8a8a96",
          margin: "0 0 40px",
          lineHeight: 1.5,
        }}>
          Укажите нужную площадь — увидите ориентировочную цену. Для точного расчёта оставьте заявку
        </p>

        {/* Calculator card */}
        <div style={{
          background: "#161f2e",
          borderRadius: "16px",
          border: "1px solid rgba(201,169,110,0.12)",
          padding: "32px 28px",
          marginBottom: "24px",
        }}>
          {/* Area selector */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "20px",
            }}>
              <span style={{ fontSize: "14px", color: "#8a8a96", fontWeight: 500 }}>
                Площадь офиса
              </span>
              <span style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#fff",
                fontVariantNumeric: "tabular-nums",
              }}>
                {area} <span style={{ fontSize: "18px", color: "#8a8a96", fontWeight: 400 }}>м²</span>
              </span>
            </div>

            {/* Custom slider */}
            <div style={{ position: "relative", padding: "8px 0" }}>
              {/* Track background */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "4px",
                background: "#2a3347",
                borderRadius: "2px",
                transform: "translateY(-50%)",
              }} />
              {/* Track fill */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: `${progress}%`,
                height: "4px",
                background: "linear-gradient(90deg, #ceb78e, #e4d6b5)",
                borderRadius: "2px",
                transform: "translateY(-50%)",
                transition: "width 0.05s ease-out",
              }} />
              <input
                type="range"
                min={MIN_AREA}
                max={MAX_AREA}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                style={{
                  position: "relative",
                  width: "100%",
                  appearance: "none",
                  WebkitAppearance: "none",
                  background: "transparent",
                  height: "24px",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              />
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#555",
              marginTop: "4px",
            }}>
              <span>{MIN_AREA} м²</span>
              <span>{MAX_AREA} м²</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: "1px",
            background: "rgba(201,169,110,0.1)",
            margin: "0 -28px 28px",
          }} />

          {/* Price result */}
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <div style={{
              fontSize: "13px",
              color: "#8a8a96",
              marginBottom: "8px",
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}>
              Ориентировочная стоимость
            </div>
            <div style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "#ceb78e",
              lineHeight: 1.1,
              fontVariantNumeric: "tabular-nums",
            }}>
              ~{priceFormatted}
              <span style={{ fontSize: "22px", fontWeight: 400 }}> ₸</span>
            </div>
            <div style={{
              fontSize: "13px",
              color: "#555",
              marginTop: "8px",
            }}>
              из расчёта {formatTenge(PRICE_PER_SQM)}/м²
            </div>
          </div>
        </div>

        {/* Quick presets */}
        <div style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "32px",
        }}>
          {[44, 75, 84, 120, 170].map((v) => (
            <button
              key={v}
              onClick={() => setArea(v)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: area === v
                  ? "1px solid #ceb78e"
                  : "1px solid rgba(255,255,255,0.08)",
                background: area === v ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.03)",
                color: area === v ? "#ceb78e" : "#8a8a96",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {v} м²
            </button>
          ))}
        </div>

        {/* Matching lots */}
        {matchingLots.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#8a8a96",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 16px",
            }}>
              Подходящие помещения
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {matchingLots.map((lot, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    background: "#161f2e",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#e8e4dd" }}>
                      {lot.area} м²
                    </div>
                    <div style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>
                      {lot.floor} этаж · {lot.label}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#ceb78e",
                    }}>
                      ~{formatPrice(lot.area * PRICE_PER_SQM)} ₸
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #ceb78e, #b8944f)",
              color: "#0f1724",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            Получить точный расчёт
          </button>
        )}

        {/* Inline form */}
        {showForm && (
          <div style={{
            background: "#161f2e",
            borderRadius: "16px",
            border: "1px solid rgba(201,169,110,0.15)",
            padding: "24px",
            animation: "fadeIn 0.2s ease",
          }}>
            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "#fff" }}>
              Менеджер свяжется с расчётом
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                placeholder="Имя"
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#e8e4dd",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
              <input
                placeholder="+7 ___ ___ __ __"
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#e8e4dd",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #ceb78e, #b8944f)",
                    color: "#0f1724",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Отправить
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: "14px 20px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "#8a8a96",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
            <div style={{ fontSize: "11px", color: "#555", marginTop: "12px" }}>
              Нажимая «Отправить», вы соглашаетесь на обработку персональных данных
            </div>
          </div>
        )}

        {/* Success message */}
        {submitted && (
          <div style={{
            padding: "20px",
            borderRadius: "12px",
            background: "rgba(46,125,50,0.12)",
            border: "1px solid rgba(46,125,50,0.3)",
            textAlign: "center",
            color: "#66bb6a",
            fontWeight: 600,
            fontSize: "15px",
          }}>
            Заявка отправлена. Менеджер свяжется с вами в рабочее время
          </div>
        )}

        {/* Footer note */}
        <div style={{
          marginTop: "40px",
          padding: "20px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          fontSize: "12px",
          color: "#444",
          lineHeight: 1.6,
          textAlign: "center",
        }}>
          Расчёт ориентировочный, от {formatTenge(PRICE_PER_SQM)}/м². Точная стоимость зависит от этажа, расположения и условий сделки.
          Подробности уточняйте в отделе продаж: +7 775 350 9999
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ceb78e;
          border: 3px solid #0f1724;
          box-shadow: 0 0 0 2px rgba(201,169,110,0.3), 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer;
          transition: box-shadow 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 4px rgba(201,169,110,0.2), 0 2px 12px rgba(0,0,0,0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ceb78e;
          border: 3px solid #0f1724;
          box-shadow: 0 0 0 2px rgba(201,169,110,0.3), 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
