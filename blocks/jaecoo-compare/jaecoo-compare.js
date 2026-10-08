/**
 * JAECOO Compare block — comparison table across 3 powertrains.
 *
 * DA rows:
 *   Row 1: eyebrow text
 *   Row 2: heading
 *   Row 3: column headers — "" | col1 label | col2 label | col3 label  (4 cells)
 *   Row 4+: feature rows — feature name | col1 value | col2 value | col3 value
 *           Values starting with "✓" or "✗" get icon treatment.
 *           The highlighted column (best option) = column index in row 2 if cell
 *           contains the text "(destacado)" — stripped before display.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';
  const cells = (row) => [...(row?.children || [])].map((c) => c.textContent.trim());

  const eyebrow = text(rows[0]);
  const heading = text(rows[1]);
  const headers = cells(rows[2]);

  // Find highlighted column (0-based, within the value columns only)
  let highlightIdx = 0;
  const cleanHeaders = headers.map((h, i) => {
    if (h.includes('(destacado)')) { highlightIdx = i; return h.replace('(destacado)', '').trim(); }
    return h;
  });

  const featureRows = rows.slice(3).map((r) => cells(r));

  const cellHTML = (val, colIdx) => {
    if (!val) return '<span class="jcmp-na">—</span>';
    if (val === '✓') return '<span class="jcmp-yes" aria-label="Sí"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>';
    if (val === '✗') return '<span class="jcmp-no" aria-label="No"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>';
    return `<span>${val}</span>`;
  };

  block.innerHTML = `
    <div class="jcmp-wrap">
      <div class="jcmp-header">
        ${eyebrow ? `<p class="jcmp-eyebrow">${eyebrow}</p>` : ''}
        <h2 class="jcmp-heading">${heading}</h2>
      </div>

      <div class="jcmp-table-wrap">
        <table class="jcmp-table">
          <thead>
            <tr>
              ${cleanHeaders.map((h, i) => i === 0
                ? `<th class="jcmp-th-feat" scope="col">${h}</th>`
                : `<th class="jcmp-th-col ${i === highlightIdx ? 'jcmp-col--highlight' : ''}" scope="col">
                    ${i === highlightIdx ? '<span class="jcmp-badge">Recomendado</span>' : ''}
                    ${h}
                  </th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${featureRows.map((row) => `
              <tr>
                ${row.map((val, i) => i === 0
                  ? `<th class="jcmp-td-feat" scope="row">${val}</th>`
                  : `<td class="jcmp-td ${i === highlightIdx ? 'jcmp-col--highlight' : ''}">${cellHTML(val, i)}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
