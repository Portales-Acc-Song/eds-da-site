import { expect } from '@open-wc/testing';
import { getCurrentLang, localizePath, DEFAULT_LANG } from '../scripts/languages.js';

describe('languages: getCurrentLang', () => {
  it('detects the language segment anywhere in the path', () => {
    expect(getCurrentLang('/en/universidad-online/x')).to.equal('en');
    expect(getCurrentLang('/uemi/ca/x')).to.equal('ca');
  });

  it('falls back to the default language when no segment is present', () => {
    expect(getCurrentLang('/universidad-online/x')).to.equal(DEFAULT_LANG);
    expect(getCurrentLang('/')).to.equal(DEFAULT_LANG);
  });
});

describe('languages: localizePath', () => {
  it('replaces the existing language segment in place', () => {
    expect(localizePath('ca', '/uemi/es/x')).to.equal('/uemi/ca/x');
  });

  it('inserts the prefix when no segment is present', () => {
    expect(localizePath('en', '/x/y')).to.equal('/en/x/y');
  });
});
