export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('card');
    const [textCell, imgCell] = row.children;
    textCell.classList.add('card-content');
    imgCell.classList.add('card-image');
  });
}