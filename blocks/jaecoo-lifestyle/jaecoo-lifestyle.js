/**
 * JAECOO Lifestyle block — touch-enabled image carousel with caption.
 *
 * DA rows:
 *   Row 1: eyebrow text
 *   Row 2: heading
 *   Row 3+: slide image (picture) | caption text (optional)
 */
export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';

  const eyebrow = text(rows[0]);
  const heading = text(rows[1]);

  const slides = rows.slice(2).map((row) => {
    const cells = [...row.children];
    return {
      img: cells[0]?.querySelector('picture, img')?.outerHTML || '',
      caption: cells[1]?.textContent?.trim() || '',
    };
  });

  if (!slides.length) return;

  block.innerHTML = `
    <div class="jls-wrap">
      ${eyebrow || heading ? `
        <div class="jls-header">
          ${eyebrow ? `<p class="jls-eyebrow">${eyebrow}</p>` : ''}
          ${heading ? `<h2 class="jls-heading">${heading}</h2>` : ''}
        </div>` : ''}

      <div class="jls-carousel" aria-label="Galería de imágenes">
        <div class="jls-track" style="--slide-count: ${slides.length}">
          ${slides.map((s, i) => `
            <div class="jls-slide" aria-label="Imagen ${i + 1} de ${slides.length}" role="group">
              <div class="jls-slide-img">${s.img}</div>
              ${s.caption ? `<p class="jls-caption">${s.caption}</p>` : ''}
            </div>`).join('')}
        </div>

        ${slides.length > 1 ? `
          <button class="jls-btn jls-btn--prev" aria-label="Imagen anterior" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="jls-btn jls-btn--next" aria-label="Imagen siguiente" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div class="jls-dots" role="tablist" aria-label="Seleccionar imagen">
            ${slides.map((_, i) => `<button class="jls-dot ${i === 0 ? 'jls-dot--active' : ''}" role="tab" aria-selected="${i === 0}" aria-label="Imagen ${i + 1}" data-index="${i}" type="button"></button>`).join('')}
          </div>` : ''}
      </div>
    </div>
  `;

  if (slides.length <= 1) return;

  const track = block.querySelector('.jls-track');
  const dots = [...block.querySelectorAll('.jls-dot')];
  let current = 0;
  let startX = 0;
  let isDragging = false;

  const goto = (idx) => {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('jls-dot--active', i === current);
      d.setAttribute('aria-selected', i === current);
    });
  };

  block.querySelector('.jls-btn--prev').addEventListener('click', () => goto(current - 1));
  block.querySelector('.jls-btn--next').addEventListener('click', () => goto(current + 1));
  dots.forEach((d) => d.addEventListener('click', () => goto(parseInt(d.dataset.index, 10))));

  // Touch / drag swipe
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goto(current + (diff > 0 ? 1 : -1));
    isDragging = false;
  });

  // Auto-advance (paused on hover/focus)
  let timer = setInterval(() => goto(current + 1), 5000);
  block.addEventListener('mouseenter', () => clearInterval(timer));
  block.addEventListener('mouseleave', () => { timer = setInterval(() => goto(current + 1), 5000); });
  block.addEventListener('focusin', () => clearInterval(timer));
}
