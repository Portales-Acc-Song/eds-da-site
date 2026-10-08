/**
 * JAECOO Premium block — editorial dark panel with floating car image.
 *
 * DA rows:
 *   Row 1: eyebrow text
 *   Row 2: heading
 *   Row 3: body text (rich text / HTML from DA)
 *   Row 4: CTA label | CTA href
 *   Row 5: floating image (picture element)
 */
export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';
  const html = (row) => row?.querySelector(':scope > div')?.innerHTML?.trim() || '';
  const cells = (row) => [...(row?.children || [])].map((c) => c.innerHTML.trim());

  const eyebrow = text(rows[0]);
  const heading = html(rows[1]);
  const body = html(rows[2]);
  const [ctaLabel = '', ctaHref = '#contacto'] = cells(rows[3]);
  const imgMarkup = rows[4]?.querySelector('picture, img')?.outerHTML || '';

  block.innerHTML = `
    <div class="jpr-wrap">
      <div class="jpr-content">
        ${eyebrow ? `<p class="jpr-eyebrow">${eyebrow}</p>` : ''}
        <h2 class="jpr-heading">${heading}</h2>
        <div class="jpr-body">${body}</div>
        ${ctaLabel ? `<a class="jpr-cta jaecoo-btn jaecoo-btn-fill" href="${ctaHref}" data-goal="premium_cta">${ctaLabel}</a>` : ''}
      </div>
      ${imgMarkup ? `<div class="jpr-image">${imgMarkup}</div>` : ''}
    </div>
  `;
}
