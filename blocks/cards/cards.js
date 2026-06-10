import { createOptimizedPicture } from '../../scripts/aem.js';
import applyFocalPoint from '../../scripts/focal-point.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else if (div.querySelector('.icon')) div.className = 'cards-card-icon';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // conserva el focal point para que applyFocalPoint pueda leerlo en la imagen optimizada
    if (img.dataset.title) optimized.querySelector('img').dataset.title = img.dataset.title;
    img.closest('picture').replaceWith(optimized);
  });
  block.replaceChildren(ul);
  applyFocalPoint(block);
}
