import { expect } from '@open-wc/testing';
import openModal from '../scripts/modal.js';

describe('openModal', () => {
  afterEach(() => {
    document.querySelectorAll('.modal').forEach((m) => m.remove());
  });

  it('opens an iframe modal from a URL with an accessible label', () => {
    openModal('https://example.com/x', { label: 'Demo' });
    const modal = document.querySelector('.modal');
    expect(modal).to.exist;
    expect(modal.getAttribute('role')).to.equal('dialog');
    expect(modal.getAttribute('aria-label')).to.equal('Demo');
    expect(modal.querySelector('iframe').src).to.contain('example.com/x');
  });

  it('embeds a DOM node and applies the variant class', () => {
    const node = document.createElement('p');
    openModal(node, { className: 'modal-video' });
    const modal = document.querySelector('.modal.modal-video');
    expect(modal.contains(node)).to.be.true;
  });

  it('closes on Escape', () => {
    openModal('https://example.com');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.querySelector('.modal')).to.not.exist;
  });

  it('closes when the close button is clicked', () => {
    openModal('https://example.com');
    document.querySelector('.modal-close').click();
    expect(document.querySelector('.modal')).to.not.exist;
  });
});
