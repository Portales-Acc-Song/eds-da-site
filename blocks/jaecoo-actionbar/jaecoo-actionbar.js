/**
 * JAECOO Actionbar — sticky bottom CTA bar, mobile-only.
 * Appears when the user scrolls past the hero section.
 * Hidden on desktop (≥ 560 px) via CSS.
 *
 * Authored columns (in DA):
 *   Row 1: primary CTA label | primary CTA href
 *   Row 2: secondary CTA label | secondary CTA href
 *
 * Optional Row 3 (analytics):
 *   Row 3: primary goal name | secondary goal name
 *   e.g.  "enquire_click" | "dealer_click"
 */
export default function decorate(block) {
  const rows = [...block.children];

  const getCells = (row) => [...(row?.querySelectorAll(':scope > div') || [])];

  const [labelA, hrefA] = getCells(rows[0]).map((c) => c.textContent.trim());
  const [labelB, hrefB] = getCells(rows[1]).map((c) => c.textContent.trim());
  const [goalA, goalB] = getCells(rows[2]).map((c) => c.textContent.trim());

  block.innerHTML = '';
  block.setAttribute('role', 'navigation');
  block.setAttribute('aria-label', 'Acciones principales');

  const buildCta = (label, href, isPrimary, goal) => {
    const a = document.createElement('a');
    a.href = href || '#contacto';
    a.className = isPrimary ? 'jaecoo-btn jaecoo-btn-fill' : 'jaecoo-btn jaecoo-btn-outline';
    a.textContent = label || (isPrimary ? 'Solicitar oferta' : 'Probar el coche');
    a.dataset.intent = isPrimary ? 'oferta' : 'prueba';
    if (goal) a.dataset.goal = goal;
    return a;
  };

  block.append(
    buildCta(labelA, hrefA, true, goalA || 'enquire_click'),
    buildCta(labelB, hrefB, false, goalB || 'dealer_click'),
  );

  // Analytics: propagate goal clicks to dataLayer
  block.addEventListener('click', (e) => {
    const el = e.target.closest('[data-goal]');
    if (!el || !window.dataLayer) return;
    window.dataLayer.push({ event: el.dataset.goal, intent: el.dataset.intent });
  });

  // Show bar once user scrolls past the hero block
  const hero = document.querySelector('.jaecoo-hero-block, .jaecoo-hero');
  const sentinel = hero || document.querySelector('main > div:first-child');

  if (!sentinel) {
    block.classList.add('jaecoo-actionbar--visible');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      block.classList.toggle('jaecoo-actionbar--visible', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '0px 0px -80px 0px' },
  );

  observer.observe(sentinel);
}
