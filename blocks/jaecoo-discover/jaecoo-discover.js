/**
 * JAECOO Discover block — feature cards grid.
 *
 * DA rows:
 *   Row 1: eyebrow text
 *   Row 2: heading
 *   Row 3+: card image (picture) | card title | card body text
 */
export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';

  const eyebrow = text(rows[0]);
  const heading = text(rows[1]);

  const cards = rows.slice(2).map((row) => {
    const cells = [...row.children];
    return {
      img: cells[0]?.querySelector('picture, img')?.outerHTML || '',
      title: cells[1]?.innerHTML?.trim() || '',
      body: cells[2]?.innerHTML?.trim() || '',
    };
  });

  block.innerHTML = `
    <div class="jdsc-wrap">
      <div class="jdsc-header">
        ${eyebrow ? `<p class="jdsc-eyebrow">${eyebrow}</p>` : ''}
        <h2 class="jdsc-heading">${heading}</h2>
      </div>
      <ul class="jdsc-grid">
        ${cards.map((c) => `
          <li class="jdsc-card">
            ${c.img ? `<div class="jdsc-card-img">${c.img}</div>` : ''}
            <div class="jdsc-card-body">
              <h3 class="jdsc-card-title">${c.title}</h3>
              ${c.body ? `<div class="jdsc-card-text">${c.body}</div>` : ''}
            </div>
          </li>`).join('')}
      </ul>
    </div>
  `;
}
