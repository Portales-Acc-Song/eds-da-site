/**
 * JAECOO Trust block — trust badges with optional animated counter.
 *
 * DA rows:
 *   Row 1: eyebrow text
 *   Row 2: heading (optional)
 *   Row 3+: icon-key | badge title | badge subtitle
 *
 * Supported icon keys: shield, star, award, clock, eco, warranty, dealer, users
 */
const ICONS = {
  shield:   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  star:     '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  award:    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  clock:    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  eco:      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M2 22c0 0 4-8 10-8s10 8 10 8"/><path d="M12 14V2s4 2 4 7"/></svg>',
  warranty: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  dealer:   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  users:    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
};

export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';
  const cells = (row) => [...(row?.children || [])].map((c) => c.textContent.trim());

  const eyebrow = text(rows[0]);
  const heading = text(rows[1]);
  const badges = rows.slice(2).map((r) => {
    const [iconKey = 'shield', title = '', subtitle = ''] = cells(r);
    return { iconKey, title, subtitle };
  });

  if (!badges.length) {
    badges.push(
      { iconKey: 'warranty', title: '7 años de garantía', subtitle: 'Cobertura oficial en toda la red' },
      { iconKey: 'eco',      title: 'Etiqueta CERO DGT', subtitle: 'Sin restricciones de circulación' },
      { iconKey: 'dealer',   title: 'Red de concesionarios', subtitle: 'Más de 40 puntos de servicio' },
      { iconKey: 'clock',    title: 'Respuesta en 24 h', subtitle: 'Contacto personalizado garantizado' },
    );
  }

  block.innerHTML = `
    <div class="jtr-wrap">
      <div class="jtr-header">
        ${eyebrow ? `<p class="jtr-eyebrow">${eyebrow}</p>` : ''}
        ${heading ? `<h2 class="jtr-heading">${heading}</h2>` : ''}
      </div>
      <ul class="jtr-list">
        ${badges.map(({ iconKey, title, subtitle }) => `
          <li class="jtr-badge">
            <span class="jtr-icon">${ICONS[iconKey] || ICONS.shield}</span>
            <span class="jtr-title">${title}</span>
            ${subtitle ? `<span class="jtr-sub">${subtitle}</span>` : ''}
          </li>`).join('')}
      </ul>
    </div>
  `;
}
