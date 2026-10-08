/**
 * JAECOO Specs block.
 *
 * DA authored rows (table):
 *   Row 1 : eyebrow text                                 (1 cell)
 *   Row 2 : hero stat value | hero stat label            (2 cells)
 *   Row 3 : dual-stat left value | left label | right value | right label  (4 cells)
 *   Row 4 : dual-stat left value | left label | right value | right label  (4 cells)
 *   Row 5 : car image (picture element)                  (1 cell)
 *   Row 6 : CTA button label                             (1 cell)
 *   Rows 7+: spec-sheet items — label | value            (2 cells each)
 */
export default function decorate(block) {
  const rows = [...block.children];
  const cells = (row) => [...(row?.children || [])].map((c) => c.innerHTML.trim());
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';

  const eyebrow = text(rows[0]) || 'Especificaciones técnicas';
  const [heroVal = '279 <small>CV</small>', heroLabel = 'Potencia combinada'] = cells(rows[1]);
  const [d1lv = '90 km', d1ll = 'en eléctrico', d1rv = '+1.200 km', d1rl = 'autonomía combinada'] = cells(rows[2]);
  const [d2lv = '2,4 L/100', d2ll = 'consumo mixto', d2rv = '8,5 s', d2rl = '0-100 km/h'] = cells(rows[3]);
  const imgCell = rows[4]?.querySelector('picture, img');
  const ctaLabel = text(rows[5]) || 'Todos los detalles técnicos';

  // Rows 7+ are spec-sheet items
  const specItems = rows.slice(6).map((r) => {
    const c = cells(r);
    return { label: c[0] || '', value: c[1] || '' };
  });

  const specHTML = specItems.length
    ? specItems.map((s) => `
        <li class="jss-item">
          <span class="jss-item-label">${s.label}</span>
          <span class="jss-item-value">${s.value}</span>
        </li>`).join('')
    : defaultSpecs();

  const imgMarkup = imgCell ? imgCell.outerHTML : '<img src="/jaecoo-7-phev/images/jaecoo-7-especificaciones.png" alt="JAECOO 7 SHS-P" loading="lazy" width="800" height="540">';

  block.innerHTML = `
    <div class="jss-wrap">
      <div class="jss-content">
        <p class="jss-eyebrow">${eyebrow}</p>

        <div class="jss-hero-stat">
          <div class="jss-hero-num">${heroVal}</div>
          <div class="jss-hero-label">${heroLabel}</div>
        </div>

        <div class="jss-dual-stats">
          <div class="jss-dual-stat">
            <div class="jss-dual-row">
              <div class="jss-dual-cell">
                <span class="jss-dual-val">${d1lv}</span>
                <span class="jss-dual-label">${d1ll}</span>
              </div>
              <div class="jss-dual-sep"></div>
              <div class="jss-dual-cell">
                <span class="jss-dual-val">${d1rv}</span>
                <span class="jss-dual-label">${d1rl}</span>
              </div>
            </div>
          </div>
          <div class="jss-dual-stat">
            <div class="jss-dual-row">
              <div class="jss-dual-cell">
                <span class="jss-dual-val">${d2lv}</span>
                <span class="jss-dual-label">${d2ll}</span>
              </div>
              <div class="jss-dual-sep"></div>
              <div class="jss-dual-cell">
                <span class="jss-dual-val">${d2rv}</span>
                <span class="jss-dual-label">${d2rl}</span>
              </div>
            </div>
          </div>
        </div>

        <button class="jss-cta" type="button" aria-expanded="false" aria-controls="jss-sheet" data-goal="specs_sheet_open">
          ${ctaLabel}
          <svg class="jss-cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>

      <div class="jss-image">
        ${imgMarkup}
      </div>
    </div>

    <div class="jss-sheet" id="jss-sheet" role="dialog" aria-label="Ficha técnica JAECOO 7 SHS-P" hidden>
      <div class="jss-sheet-inner">
        <button class="jss-sheet-close" aria-label="Cerrar ficha técnica" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h3 class="jss-sheet-title">Ficha técnica · JAECOO 7 SHS-P</h3>
        <ul class="jss-sheet-list">
          ${specHTML}
        </ul>
      </div>
      <div class="jss-sheet-backdrop"></div>
    </div>
  `;

  // Spec sheet open / close
  const cta = block.querySelector('.jss-cta');
  const sheet = block.querySelector('.jss-sheet');
  const closeBtn = block.querySelector('.jss-sheet-close');
  const backdrop = block.querySelector('.jss-sheet-backdrop');

  const openSheet = () => {
    sheet.hidden = false;
    cta.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => sheet.classList.add('jss-sheet--open'), 16);
    if (window.dataLayer) window.dataLayer.push({ event: 'specs_sheet_open' });
  };

  const closeSheet = () => {
    sheet.classList.remove('jss-sheet--open');
    cta.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    sheet.addEventListener('transitionend', () => { sheet.hidden = true; }, { once: true });
  };

  cta.addEventListener('click', openSheet);
  closeBtn.addEventListener('click', closeSheet);
  backdrop.addEventListener('click', closeSheet);
  sheet.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });
}

function defaultSpecs() {
  return [
    { label: 'Batería', value: '18,3 kWh' },
    { label: 'Maletero', value: '340 – 1.265 L' },
    { label: 'Aceleración 0–100', value: '8,5 s' },
    { label: 'Etiqueta DGT', value: 'CERO' },
    { label: 'Tracción', value: 'Delantera' },
    { label: 'Carga rápida (DC)', value: '~20 min (20→80%)' },
    { label: 'Carga AC', value: '~4 h (3,7 kW)' },
    { label: 'Longitud', value: '4.500 mm' },
  ].map((s) => `
    <li class="jss-item">
      <span class="jss-item-label">${s.label}</span>
      <span class="jss-item-value">${s.value}</span>
    </li>`).join('');
}
