import { expect } from '@open-wc/testing';
import applyFocalPoint from '../scripts/focal-point.js';

describe('applyFocalPoint', () => {
  it('sets object-position from a data-focal title', () => {
    const el = document.createElement('div');
    el.innerHTML = '<img data-title="data-focal:91.26,20.56">';
    applyFocalPoint(el);
    expect(el.querySelector('img').style.objectPosition).to.equal('91.26% 20.56%');
  });

  it('ignores images whose title is not a focal point', () => {
    const el = document.createElement('div');
    el.innerHTML = '<img data-title="alt text">';
    applyFocalPoint(el);
    expect(el.querySelector('img').style.objectPosition).to.equal('');
  });

  it('does not throw when there are no images', () => {
    expect(() => applyFocalPoint(document.createElement('div'))).to.not.throw();
  });
});
