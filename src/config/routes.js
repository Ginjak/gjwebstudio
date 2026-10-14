/**
 * ---------------------------------------------------------------------------
 * LOCALES & TRANSLATED ROUTES
 * ---------------------------------------------------------------------------
 * Lithuanian is the default locale and has NO url prefix ( /kainos ).
 * English is prefixed ( /en/pricing ) and uses translated slugs.
 *
 * The folder names inside src/app/[locale] are always the LITHUANIAN slugs.
 * middleware.js rewrites incoming English URLs onto those folders, so the
 * public URL and the internal route can differ without duplicating pages.
 *
 * To add a page:
 *   1. add an entry below,
 *   2. create src/app/[locale]/<lithuanian-slug>/page.js,
 *   3. link to it with  path(locale, 'yourKey')
 * ---------------------------------------------------------------------------
 */

export const locales = ['lt', 'en'];
export const defaultLocale = 'lt';

export const localeNames = { lt: 'Lietuvių', en: 'English' };
export const localeShort = { lt: 'LT', en: 'EN' };
/** BCP-47 tags for <html lang> and hreflang. */
export const localeTags = { lt: 'lt-LT', en: 'en-GB' };
export const localeOg = { lt: 'lt_LT', en: 'en_GB' };

/** routeKey -> { lt, en } slug segments (no leading slash). */
export const routes = {
  home: { lt: '', en: '' },
  services: { lt: 'paslaugos', en: 'services' },
  pricing: { lt: 'kainos', en: 'pricing' },
  work: { lt: 'darbai', en: 'work' },
  blog: { lt: 'tinklarastis', en: 'blog' },
  about: { lt: 'apie', en: 'about' },
  contact: { lt: 'kontaktai', en: 'contact' },
  faq: { lt: 'duk', en: 'faq' },
  testimonials: { lt: 'atsiliepimai', en: 'testimonials' },
  audit: { lt: 'nemokamas-auditas', en: 'free-audit' },
  locations: { lt: 'wordpress-kurimas', en: 'wordpress-development' },
  glossary: { lt: 'zodynas', en: 'glossary' },
  privacy: { lt: 'privatumo-politika', en: 'privacy-policy' },
  cookies: { lt: 'slapuku-politika', en: 'cookie-policy' },
  accessibility: { lt: 'prieinamumas', en: 'accessibility' },
};

/** Reverse lookup: english slug -> lithuanian (internal) slug. */
export const enToLt = Object.fromEntries(
  Object.values(routes)
    .filter((r) => r.en)
    .map((r) => [r.en, r.lt]),
);

/**
 * Build a public href.
 * @param {string} locale   'lt' | 'en'
 * @param {string} key      key from `routes`
 * @param {...string} rest  extra path segments (e.g. a post slug)
 */
export function path(locale, key = 'home', ...rest) {
  const entry = routes[key];
  const slug = entry ? entry[locale] ?? entry[defaultLocale] : key;
  const segments = [locale === defaultLocale ? '' : locale, slug, ...rest].filter(Boolean);
  return '/' + segments.join('/');
}

/**
 * Translate a public pathname from one locale to another.
 * Used by the language switcher so the visitor stays on the same page.
 */
export function switchLocalePath(pathname, from, to) {
  let rest = pathname;
  if (from !== defaultLocale) rest = rest.replace(new RegExp(`^/${from}`), '');
  const segments = rest.split('/').filter(Boolean);

  if (segments.length === 0) return path(to, 'home');

  const key = Object.keys(routes).find((k) => routes[k][from] === segments[0]);
  if (!key) return path(to, 'home');

  return path(to, key, ...segments.slice(1));
}

/** True when the segment belongs to a known route in the given locale. */
export function isKnownSlug(locale, slug) {
  return Object.values(routes).some((r) => r[locale] === slug);
}
