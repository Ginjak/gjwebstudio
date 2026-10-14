
import { defaultLocale, locales } from '@/config/routes';

/**
 * ---------------------------------------------------------------------------
 * DICTIONARIES
 * ---------------------------------------------------------------------------
 * UI strings live in src/messages/<locale>.json.
 * Page *content* (services, pricing, posts…) lives in src/lib/content/*.js
 * where both languages sit side by side, which keeps translations aligned.
 *
 * Missing English keys fall back to Lithuanian rather than rendering blank.
 * ---------------------------------------------------------------------------
 */
const loaders = {
  lt: () => import('@/messages/lt.json').then((m) => m.default),
  en: () => import('@/messages/en.json').then((m) => m.default),
};

export async function getDictionary(locale) {
  const safe = locales.includes(locale) ? locale : defaultLocale;
  const dict = await loaders[safe]();
  if (safe === defaultLocale) return dict;
  const base = await loaders[defaultLocale]();
  return deepMerge(base, dict);
}

function deepMerge(base, override) {
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(override || {})) {
    const value = override[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      out[key] = deepMerge(base?.[key] ?? {}, value);
    } else if (value !== undefined && value !== '') {
      out[key] = value;
    }
  }
  return out;
}

export { createTranslator } from './translator';
