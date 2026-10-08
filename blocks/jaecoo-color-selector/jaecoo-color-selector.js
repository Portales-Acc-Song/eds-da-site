/**
 * JAECOO Color Selector block — 6-color swatch picker with reactive car image.
 *
 * DA rows:
 *   Row 1: eyebrow text
 *   Row 2: heading
 *   Row 3+: color name | hex code | car picture (one row per color)
 */
export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';

  const eyebrow = text(rows[0]);
  const heading = text(rows[1]);

  const colors = rows.slice(2).map((row) => {
    const cells = [...row.children];
    return {
      name: cells[0]?.textContent?.trim() || '',
      hex: cells[1]?.textContent?.trim() || '#ccc',
      picture: cells[2]?.querySelector('picture, img')?.outerHTML || '',
    };
  });

  if (!colors.length) {
    colors.push(
      { name: 'Blanco Ártico', hex: '#f0f0f0', picture: '' },
      { name: 'Negro Cosmos', hex: '#1a1a1a', picture: '' },
      { name: 'Gris Titanio', hex: '#7a7e82', picture: '' },
      { name: 'Plata Glaciar', hex: '#c8cdd2', picture: '' },
      { name: 'Azul Índigo', hex: '#2c4a7c', picture: '' },
      { name: 'Marrón Cobre', hex: '#7c5c3e', picture: '' },
    );
  }

  block.innerHTML = `
    <div class="jco-wrap">
      <div class="jco-header">
        ${eyebrow ? `<p class="jco-eyebrow">${eyebrow}</p>` : ''}
        <h2 class="jco-heading">${heading}</h2>
        <p class="jco-color-name" aria-live="polite">${colors[0].name}</p>
      </div>

      <div class="jco-stage" aria-label="Vista previa del color">
        ${colors.map((c, i) => `
          <div class="jco-car ${i === 0 ? 'jco-car--active' : ''}" data-index="${i}" aria-hidden="${i !== 0}">
            ${c.picture || `<div class="jco-car-placeholder" style="background: ${c.hex}20"></div>`}
          </div>`).join('')}
      </div>

      <div class="jco-swatches" role="group" aria-label="Seleccionar color">
        ${colors.map((c, i) => `
          <button
            class="jco-swatch ${i === 0 ? 'jco-swatch--active' : ''}"
            data-index="${i}"
            style="--swatch-color: ${c.hex}"
            aria-label="${c.name}"
            aria-pressed="${i === 0}"
            type="button"
          ></button>`).join('')}
      </div>
    </div>
  `;

  const nameEl = block.querySelector('.jco-color-name');
  const cars = [...block.querySelectorAll('.jco-car')];
  const swatches = [...block.querySelectorAll('.jco-swatch')];

  swatches.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      cars.forEach((c, j) => {
        c.classList.toggle('jco-car--active', j === i);
        c.setAttribute('aria-hidden', j !== i);
      });
      swatches.forEach((s, j) => {
        s.classList.toggle('jco-swatch--active', j === i);
        s.setAttribute('aria-pressed', j === i);
      });
      if (nameEl) nameEl.textContent = colors[i].name;
    });
  });
}
