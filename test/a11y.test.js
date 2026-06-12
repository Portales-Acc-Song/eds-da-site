import { expect } from '@open-wc/testing';
import 'axe-core'; // UMD module: registers window.axe (no ESM export)
import openModal from '../scripts/modal.js';

const { axe } = window;

/**
 * Runs axe on an element and returns its violations.
 * color-contrast is skipped: it needs the real stylesheet, not loaded in unit tests.
 * @param {Element} element
 * @returns {Promise<Array>} axe violations
 */
async function violationsOf(element) {
  const results = await axe.run(element, {
    rules: { 'color-contrast': { enabled: false } },
  });
  return results.violations;
}

describe('a11y: modal', () => {
  afterEach(() => {
    document.querySelectorAll('.modal').forEach((m) => m.remove());
  });

  it('the iframe modal has no accessibility violations', async () => {
    openModal('https://example.com/x', { label: 'Demo' });
    const violations = await violationsOf(document.querySelector('.modal'));
    expect(violations, JSON.stringify(violations, null, 2)).to.have.lengthOf(0);
  });
});
