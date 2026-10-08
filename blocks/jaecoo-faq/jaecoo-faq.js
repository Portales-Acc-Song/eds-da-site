/**
 * JAECOO FAQ block — accordion with JSON-LD FAQPage structured data.
 *
 * DA rows:
 *   Row 1: eyebrow text
 *   Row 2: heading
 *   Row 3+: question | answer (rich text supported in answer cell)
 */
export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';
  const cells = (row) => [...(row?.children || [])].map((c) => ({ text: c.textContent.trim(), html: c.innerHTML.trim() }));

  const eyebrow = text(rows[0]);
  const heading = text(rows[1]);
  const items = rows.slice(2).map((r) => {
    const c = cells(r);
    return { q: c[0]?.text || '', a: c[1]?.html || c[1]?.text || '' };
  });

  block.innerHTML = `
    <div class="jfq-wrap">
      <div class="jfq-header">
        ${eyebrow ? `<p class="jfq-eyebrow">${eyebrow}</p>` : ''}
        <h2 class="jfq-heading">${heading}</h2>
      </div>
      <dl class="jfq-list">
        ${items.map((item, i) => `
          <div class="jfq-item">
            <dt>
              <button
                class="jfq-q"
                type="button"
                aria-expanded="false"
                aria-controls="jfq-a-${i}"
                id="jfq-q-${i}"
              >
                <span>${item.q}</span>
                <svg class="jfq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </dt>
            <dd class="jfq-a" id="jfq-a-${i}" role="region" aria-labelledby="jfq-q-${i}" hidden>
              <div class="jfq-a-inner">${item.a}</div>
            </dd>
          </div>`).join('')}
      </dl>
    </div>
  `;

  // Accordion behaviour
  block.querySelectorAll('.jfq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = btn.closest('.jfq-item').querySelector('.jfq-a');

      if (!expanded) {
        // Close all others
        block.querySelectorAll('.jfq-q[aria-expanded="true"]').forEach((other) => {
          other.setAttribute('aria-expanded', 'false');
          const p = other.closest('.jfq-item').querySelector('.jfq-a');
          p.style.maxHeight = p.scrollHeight + 'px';
          requestAnimationFrame(() => { p.style.maxHeight = '0'; });
          p.addEventListener('transitionend', () => { p.hidden = true; p.style.maxHeight = ''; }, { once: true });
        });

        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        panel.style.maxHeight = '0';
        requestAnimationFrame(() => { panel.style.maxHeight = panel.scrollHeight + 'px'; });
        panel.addEventListener('transitionend', () => { panel.style.maxHeight = ''; }, { once: true });
      } else {
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        requestAnimationFrame(() => { panel.style.maxHeight = '0'; });
        panel.addEventListener('transitionend', () => {
          panel.hidden = true;
          panel.style.maxHeight = '';
        }, { once: true });
      }
    });
  });

  // JSON-LD FAQPage structured data
  if (items.length) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a.replace(/<[^>]+>/g, '') },
      })),
    });
    document.head.appendChild(script);
  }
}
