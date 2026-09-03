/** Scroll Y that stays correct while `useScrollLock` freezes the body. */
export function getEffectiveScrollY() {
  if (typeof document === 'undefined') return 0;

  const { body } = document;
  if (body.style.position === 'fixed') {
    const locked = Number.parseFloat(body.style.top || '0');
    return Number.isFinite(locked) ? Math.abs(locked) : 0;
  }

  return window.scrollY;
}
