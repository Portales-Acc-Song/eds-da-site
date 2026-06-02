export default function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows[0];
  titleRow.classList.add('contact-box-title');

  const iconMap = {
    phone: 'phone',
    btn: 'user',
    email: 'mail',
  };

  rows.slice(1).forEach((row) => {
    row.classList.add('contact-box-item');
    const [labelCell] = [...row.children];
    const text = labelCell.textContent.trim();

    const link = document.createElement('a');
    link.classList.add('contact-box-link');
    link.textContent = text;

    let type = 'btn';
    if (text.startsWith('+') || text.match(/^\d/)) {
      link.href = `tel:${text.replace(/\s/g, '')}`;
      link.classList.add('contact-box-phone');
      type = 'phone';
    } else if (text.includes('@')) {
      link.href = `mailto:${text}`;
      link.classList.add('contact-box-email');
      type = 'email';
    } else {
      link.href = '#';
      link.classList.add('contact-box-btn');
    }

    const icon = document.createElement('img');
    icon.src = `/icons/${iconMap[type]}.svg`;
    icon.alt = '';
    icon.classList.add('contact-box-icon');
    icon.width = 20;
    icon.height = 20;

    const wrapper = document.createElement('div');
    wrapper.classList.add('contact-box-link-wrapper');
    wrapper.appendChild(icon);
    wrapper.appendChild(link);

    row.innerHTML = '';
    row.appendChild(wrapper);
  });
}
