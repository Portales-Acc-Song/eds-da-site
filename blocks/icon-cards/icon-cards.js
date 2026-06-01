export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const [contentCell, iconCell] = [...row.children];
    contentCell.classList.add('card-content');
    iconCell.classList.add('card-icon');
    row.classList.add('card');

    const img = iconCell.querySelector('img');
    if (img) {
      img.removeAttribute('width');
      img.removeAttribute('height');
    }
  });
}
