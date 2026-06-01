export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const [imgCell, contentCell] = [...row.children];
    row.classList.add('card');

    const img = imgCell.querySelector('img');
    imgCell.classList.add('card-image');

    const links = contentCell.querySelectorAll('a');
    let videoUrl = '';
    links.forEach((link) => {
      const href = link.href;
      if (href.includes('youtube.com') || href.includes('youtu.be')) {
        videoUrl = href;
        link.remove();
      }
    });

    const title = contentCell.textContent.trim();
    contentCell.innerHTML = '';

    const overlay = document.createElement('div');
    overlay.classList.add('card-overlay');

    const playBtn = document.createElement('button');
    playBtn.classList.add('play-btn');
    playBtn.setAttribute('aria-label', `Reproducir ${title}`);
    playBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="none" stroke="white" stroke-width="1.5"/>
      <polygon points="10,8 17,12 10,16" fill="white"/>
    </svg>`;

    const titleEl = document.createElement('p');
    titleEl.classList.add('card-title');
    titleEl.textContent = title;

    overlay.appendChild(playBtn);
    overlay.appendChild(titleEl);
    imgCell.appendChild(overlay);

    if (img) {
      imgCell.insertBefore(img, overlay);
    }

    row.innerHTML = '';
    row.appendChild(imgCell);

    if (videoUrl) {
      row.addEventListener('click', () => {
        const videoId = videoUrl.match(/v=([^&]+)/)?.[1];
        if (!videoId) return;

        const modal = document.createElement('div');
        modal.classList.add('video-modal');
        modal.innerHTML = `
          <div class="video-modal-inner">
            <button class="video-modal-close" aria-label="Cerrar">&times;</button>
            <iframe
              src="https://www.youtube.com/embed/${videoId}?autoplay=1"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.video-modal-close').addEventListener('click', () => {
          modal.remove();
        });

        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.remove();
        });
      });
    }
  });
}
