/*
 * Video Block
 * Show a video referenced by a link
 * https://www.hlx.live/developer/block-collection/video
 */

import { getVideoSource, getVideoTypeLabel, buildVideoEmbed } from '../../scripts/video-embed.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function loadVideoEmbed(block, link, autoplay, background) {
  if (block.dataset.embedLoaded === 'true') return;

  const embed = buildVideoEmbed(link, { autoplay, background });
  block.append(embed);

  const iframe = embed.querySelector('iframe');
  if (iframe) {
    iframe.addEventListener('load', () => { block.dataset.embedLoaded = true; });
  } else {
    embed.addEventListener('canplay', () => { block.dataset.embedLoaded = true; });
  }
}

export default async function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a').href;
  block.textContent = '';
  block.dataset.embedLoaded = false;

  const autoplay = block.classList.contains('autoplay');
  if (placeholder) {
    block.classList.add('placeholder');
    const wrapper = document.createElement('div');
    wrapper.className = 'video-placeholder';
    wrapper.append(placeholder);

    if (!autoplay) {
      const source = getVideoSource(link);
      const videoType = getVideoTypeLabel(source);
      const ariaLabel = `Play ${videoType}`;

      wrapper.insertAdjacentHTML(
        'beforeend',
        `<div class="video-placeholder-play"><button type="button" title="${ariaLabel}" aria-label="${ariaLabel}"></button></div>`,
      );
      wrapper.addEventListener('click', () => {
        wrapper.remove();
        loadVideoEmbed(block, link, true, false);
      });
    }
    block.append(wrapper);
  }

  if (!placeholder || autoplay) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        const playOnLoad = autoplay && !prefersReducedMotion.matches;
        loadVideoEmbed(block, link, playOnLoad, autoplay);
      }
    });
    observer.observe(block);
  }
}
