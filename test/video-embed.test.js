import { expect } from '@open-wc/testing';
import { getVideoSource, getVideoTypeLabel, buildVideoEmbed } from '../scripts/video-embed.js';

describe('video-embed: getVideoSource', () => {
  it('detects youtube (watch and youtu.be)', () => {
    expect(getVideoSource('https://www.youtube.com/watch?v=abc')).to.equal('youtube');
    expect(getVideoSource('https://youtu.be/abc')).to.equal('youtube');
  });

  it('detects vimeo', () => {
    expect(getVideoSource('https://vimeo.com/123')).to.equal('vimeo');
  });

  it('falls back to "video" for direct files', () => {
    expect(getVideoSource('https://example.com/clip.mp4')).to.equal('video');
  });
});

describe('video-embed: getVideoTypeLabel', () => {
  it('maps each source to a readable label', () => {
    expect(getVideoTypeLabel('youtube')).to.equal('YouTube video');
    expect(getVideoTypeLabel('vimeo')).to.equal('Vimeo video');
    expect(getVideoTypeLabel('video')).to.equal('MP4 video');
  });
});

describe('video-embed: buildVideoEmbed', () => {
  it('builds a YouTube iframe with the video id and autoplay', () => {
    const el = buildVideoEmbed('https://www.youtube.com/watch?v=abc123', { autoplay: true });
    const iframe = el.querySelector('iframe');
    expect(iframe).to.exist;
    expect(iframe.src).to.contain('youtube.com/embed/abc123');
    expect(iframe.src).to.contain('autoplay=1');
  });
});
