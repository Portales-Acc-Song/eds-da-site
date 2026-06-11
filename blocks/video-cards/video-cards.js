import { buildVideoEmbed } from '../../scripts/video-embed.js';
import openModal from '../../scripts/modal.js';

/**
 * Gallery of video thumbnails. Each card shows an image + an accessible play
 * button + a title; clicking plays the video in a modal. Reuses the shared
 * video-embed helper (YouTube/Vimeo/MP4) and the shared modal.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [imgCell, contentCell] = [...row.children];
    if (!imgCell) return;

    row.classList.add('card');
    imgCell.classList.add('card-image');

    // first link in the content cell is the video; the rest of the text is the title
    const link = contentCell?.querySelector('a');
    const { href: videoUrl = '' } = link || {};
    if (link) link.remove();
    const title = contentCell ? contentCell.textContent.trim() : '';

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'play-btn';
    playBtn.setAttribute('aria-label', title ? `Reproducir ${title}` : 'Reproducir vídeo');

    // keep only the image, then overlay the play button + title
    const media = imgCell.querySelector('picture, img');
    imgCell.replaceChildren();
    if (media) imgCell.append(media);
    imgCell.append(playBtn);

    if (title) {
      const titleEl = document.createElement('p');
      titleEl.className = 'card-title';
      titleEl.textContent = title;
      imgCell.append(titleEl);
    }

    row.replaceChildren(imgCell);

    if (videoUrl) {
      playBtn.addEventListener('click', () => {
        openModal(buildVideoEmbed(videoUrl, { autoplay: true }), { label: title, className: 'modal-video' });
      });
    }
  });
}
