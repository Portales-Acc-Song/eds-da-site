/*
 * Multilingual support for a path-prefixed content tree.
 *
 * Every language lives under its own first path segment, e.g.
 *   /es/universidad-online/...  -> Spanish
 *   /ca/universidad-online/...  -> Catalan
 *   /en/universidad-online/...  -> English
 *
 * Spanish is the default: pages served without a recognised language prefix
 * are treated as Spanish so existing/unprefixed URLs keep working.
 */

/**
 * Supported languages, in the order they appear in the switcher.
 * `code`  -> first path segment and html `lang` value
 * `label` -> short text shown in the nav (ES / CA / EN)
 * `name`  -> full name for accessible labels / tooltips
 */
export const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'ca', label: 'CA', name: 'Català' },
  { code: 'en', label: 'EN', name: 'English' },
];

/** Default language, preselected when no prefix is present. */
export const DEFAULT_LANG = 'es';

/** True when `segment` is one of the supported language codes. */
function isLangSegment(segment) {
  return LANGUAGES.some((lang) => lang.code === segment);
}

/**
 * Returns the language code for a pathname by matching its language segment.
 * The segment is matched by value anywhere in the path, so the switcher works
 * both at the root (`/es/...`) and under a site-partition folder
 * (`/uemi/es/...`). Falls back to {@link DEFAULT_LANG} when none is present.
 * @param {string} [pathname] path to inspect (defaults to current page)
 * @returns {string} a language code from {@link LANGUAGES}
 */
export function getCurrentLang(pathname = window.location.pathname) {
  return pathname.split('/').find(isLangSegment) || DEFAULT_LANG;
}

/**
 * Rewrites a pathname so it points to the equivalent page in `lang`.
 * Replaces the existing language segment in place (preserving any site
 * partition before it); if none is present the prefix is inserted as the
 * first segment. The rest of the path is preserved (the target page may not
 * exist yet -> 404).
 * @param {string} lang target language code
 * @param {string} [pathname] path to localize (defaults to current page)
 * @returns {string} the localized path
 */
export function localizePath(lang, pathname = window.location.pathname) {
  const parts = pathname.split('/');
  const idx = parts.findIndex(isLangSegment);
  if (idx !== -1) {
    parts[idx] = lang;
  } else {
    parts.splice(1, 0, lang);
  }
  return parts.join('/') || '/';
}
