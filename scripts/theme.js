import { getMetadata, loadCSS, toClassName } from './aem.js';

/**
 * Theming support for a shared (repoless) codebase.
 *
 * A single code repository powers several sites. Each site selects its theme
 * through the `theme` page metadata (authored per site, e.g. in metadata.xlsx).
 * A theme can change:
 *   - CSS custom properties  -> styles/themes/<theme>.css
 *   - brand assets           -> favicon via `favicon` metadata (logo is content-driven)
 *   - block behavior         -> THEME_CONFIG feature flags below
 *
 * The default theme's values live in styles/styles.css :root, so a site with no
 * `theme` metadata renders with the base brand and no extra request.
 */

const DEFAULT_THEME = 'default';

/**
 * Per-theme behavior configuration. Add a key per theme to toggle block
 * features or pass theme-specific options. Values merge over `default`.
 * Keep this aesthetic-agnostic: visual changes belong in the theme CSS.
 */
const THEME_CONFIG = {
  default: {},
  // universidad: { showBreadcrumbs: true },
};

/**
 * Returns the active theme name derived from the `theme` page metadata.
 * Only the first comma-separated value is used as the theme identifier.
 * @returns {string} kebab-case theme name, or 'default' when none is authored
 */
export function getTheme() {
  const meta = getMetadata('theme');
  if (!meta) return DEFAULT_THEME;
  const name = toClassName(meta.split(',')[0]);
  return name || DEFAULT_THEME;
}

/**
 * Returns the merged behavior config for the active theme.
 * @returns {Object} config object (default config extended with the theme's)
 */
export function getThemeConfig() {
  return { ...THEME_CONFIG.default, ...(THEME_CONFIG[getTheme()] || {}) };
}

/**
 * Convenience check for a single boolean feature flag.
 * @param {string} flag flag name
 * @returns {boolean} whether the flag is enabled for the active theme
 */
export function isFeatureEnabled(flag) {
  return Boolean(getThemeConfig()[flag]);
}

/**
 * Eagerly loads the active theme's CSS overrides (custom properties only).
 * Must run before the body is revealed (`.appear`) to avoid a flash of the
 * default theme. The default theme needs no file (its values are in styles.css).
 */
export async function loadThemeStyles() {
  const theme = getTheme();
  if (theme === DEFAULT_THEME) return;
  try {
    await loadCSS(`${window.hlx.codeBasePath}/styles/themes/${theme}.css`);
  } catch (e) {
    // missing theme file: fall back to the default brand from styles.css
    // eslint-disable-next-line no-console
    console.warn(`Theme stylesheet not found for "${theme}", using default`, e);
  }
}

/**
 * Sets a per-site favicon from the `favicon` page metadata, when present.
 * The value is resolved relative to the current page (so each site can point
 * to its own asset). With no metadata the static /favicon.ico is used.
 */
export function applyThemeFavicon() {
  const favicon = getMetadata('favicon');
  if (!favicon) return;
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.append(link);
  }
  link.href = new URL(favicon, window.location).href;
}
