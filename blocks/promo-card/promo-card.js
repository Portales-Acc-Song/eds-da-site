export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('promo-card-item');
    const [titleCell, contentCell] = [...row.children];
    titleCell.classList.add('promo-card-title');
    contentCell.classList.add('promo-card-content');

    const links = contentCell.querySelectorAll('a');
    links.forEach((link) => {
      link.classList.add('promo-card-link');
    });
  });
}
