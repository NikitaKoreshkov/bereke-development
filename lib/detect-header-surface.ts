const LIGHT_SURFACE_SELECTOR = '[data-header-surface="light"], .section-bg-limestone';

function isLightSurfaceElement(element: Element | null, headerEl: HTMLElement): boolean {
  if (!element) return false;
  if (headerEl.contains(element)) return false;
  return Boolean(element.closest(LIGHT_SURFACE_SELECTOR));
}

function samplePointHitsLightSurface(
  headerEl: HTMLElement,
  x: number,
  y: number,
): boolean {
  const stack = document.elementsFromPoint(x, y);

  for (const element of stack) {
    if (isLightSurfaceElement(element, headerEl)) {
      return true;
    }
  }

  return false;
}

export function detectHeaderOnLightSurface(headerEl: HTMLElement | null): boolean {
  if (!headerEl || typeof document === 'undefined') return false;

  const rect = headerEl.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return false;

  const y = rect.top + rect.height * 0.5;
  const xs = [
    rect.left + rect.width * 0.18,
    rect.left + rect.width * 0.5,
    rect.left + rect.width * 0.82,
  ];

  let lightHits = 0;

  for (const x of xs) {
    if (samplePointHitsLightSurface(headerEl, x, y)) {
      lightHits += 1;
    }
  }

  return lightHits >= 2;
}
