/**
 * JAECOO 7 SHS-P Hero block.
 *
 * Authored columns (in DA):
 *   Row 1: background image (picture)
 *   Row 2: car cutout image (picture) — optional, overlaid on background
 *   Row 3: pill text (e.g. "Híbrido enchufable · Etiqueta 0 DGT")
 *   Row 4: price text (e.g. "Desde 27.990 €")
 *   Row 5: stat 1 | stat 2 | stat 3  (value ↵ label pairs separated by line break)
 *   Row 6: CTA primary text | CTA primary href
 *   Row 7: CTA secondary text | CTA secondary href
 */
export default function decorate(block) {
  const rows = [...block.children];

  const bgPicture = rows[0]?.querySelector('picture');
  const cutoutPicture = rows[1]?.querySelector('picture');
  const pillText = rows[2]?.textContent?.trim();
  const priceText = rows[3]?.textContent?.trim();
  const statsRow = rows[4];
  const ctaPrimary = rows[5];
  const ctaSecondary = rows[6];

  block.innerHTML = '';

  // Background image
  if (bgPicture) {
    bgPicture.querySelector('img')?.classList.add('jaecoo-hero-bg');
    block.append(bgPicture);
  }

  // Wordmark (decorative, aria-hidden)
  const wordmark = document.createElement('div');
  wordmark.className = 'jaecoo-hero-wordmark';
  wordmark.setAttribute('aria-hidden', 'true');
  wordmark.textContent = 'JAECOO 7';
  block.append(wordmark);

  // Car cutout (layered on top of bg, aria-hidden)
  if (cutoutPicture) {
    cutoutPicture.querySelector('img')?.classList.add('jaecoo-hero-cutout');
    cutoutPicture.querySelector('img')?.setAttribute('aria-hidden', 'true');
    cutoutPicture.querySelector('img')?.setAttribute('alt', '');
    block.append(cutoutPicture);
  }

  // Gradient scrim
  const scrim = document.createElement('div');
  scrim.className = 'jaecoo-hero-scrim';
  scrim.setAttribute('aria-hidden', 'true');
  block.append(scrim);

  // Visually-hidden H1 for SEO
  const h1 = document.createElement('h1');
  h1.className = 'jaecoo-hero-h1';
  h1.innerHTML = 'JAECOO 7 <span class="vh">SHS-P Híbrido Enchufable · Etiqueta CERO · desde 27.990€</span>';
  block.append(h1);

  // Buybox
  const buybox = document.createElement('div');
  buybox.className = 'jaecoo-hero-buybox';

  // Pill
  if (pillText) {
    const pill = document.createElement('span');
    pill.className = 'jaecoo-hero-pill';
    pill.innerHTML = `${pillText}<span class="jaecoo-hero-eco0" aria-hidden="true">0</span>`;
    buybox.append(pill);
  }

  // Price
  if (priceText) {
    const price = document.createElement('div');
    price.className = 'jaecoo-hero-price';
    price.textContent = priceText;
    buybox.append(price);
  }

  // Stats — each direct child div of the row is one stat cell
  if (statsRow) {
    const stats = document.createElement('div');
    stats.className = 'jaecoo-hero-stats';
    const cells = [...statsRow.querySelectorAll(':scope > div')];
    cells.forEach((cell) => {
      const html = cell.innerHTML;
      const lines = html.split(/<br\s*\/?>/i);
      if (lines.length >= 2) {
        const stat = document.createElement('div');
        stat.innerHTML = `<b>${lines[0].trim()}</b><span>${lines[1].trim()}</span>`;
        stats.append(stat);
      }
    });
    if (stats.children.length) buybox.append(stats);
  }

  // CTAs
  const ctaWrap = document.createElement('div');
  ctaWrap.className = 'jaecoo-hero-ctas';

  const buildCta = (row, isPrimary) => {
    if (!row) return null;
    const cells = [...row.querySelectorAll(':scope > div')];
    const label = cells[0]?.textContent?.trim() || (isPrimary ? 'Solicitar oferta' : 'Probar el coche');
    const href = cells[1]?.textContent?.trim() || '#contacto';
    const intent = isPrimary ? 'oferta' : 'prueba';
    const goal = isPrimary ? 'enquire_click' : 'dealer_click';
    const a = document.createElement('a');
    a.href = href;
    a.className = isPrimary ? 'jaecoo-btn jaecoo-btn-fill' : 'jaecoo-btn jaecoo-btn-soft';
    a.dataset.goal = goal;
    a.dataset.intent = intent;
    a.textContent = label;
    return a;
  };

  const cta1 = buildCta(ctaPrimary, true);
  const cta2 = buildCta(ctaSecondary, false);
  if (cta1) ctaWrap.append(cta1);
  if (cta2) ctaWrap.append(cta2);
  buybox.append(ctaWrap);

  // Scroll arrow
  const arrow = document.createElement('div');
  arrow.className = 'jaecoo-hero-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  buybox.append(arrow);

  block.append(buybox);

  // Analytics: capture goal clicks
  block.addEventListener('click', (e) => {
    const el = e.target.closest('[data-goal]');
    if (!el) return;
    const goal = el.dataset.goal;
    const intent = el.dataset.intent;
    if (window.dataLayer) window.dataLayer.push({ event: goal, intent });
  });
}
