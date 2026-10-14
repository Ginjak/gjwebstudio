import { defaultLocale } from '@/config/routes';

/** Join class names, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/** Pick the right language from a `{ lt, en }` object (or return as-is). */
export function pick(value, locale = defaultLocale) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[locale] ?? value[defaultLocale] ?? value.en;
  }
  return value;
}

const LOCALE_TAG = { lt: 'lt-LT', en: 'en-GB' };

export function formatDate(date, locale = defaultLocale, options) {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(LOCALE_TAG[locale] ?? 'lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(d);
}

export function formatDateShort(date, locale = defaultLocale) {
  return formatDate(date, locale, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatPrice(amount, locale = defaultLocale, currency = 'EUR') {
  return new Intl.NumberFormat(LOCALE_TAG[locale] ?? 'lt-LT', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value, locale = defaultLocale) {
  return new Intl.NumberFormat(LOCALE_TAG[locale] ?? 'lt-LT').format(value);
}

/** ISO 8601 duration from minutes — used for schema.org timeRequired. */
export function isoDuration(minutes) {
  return `PT${Math.max(1, Math.round(minutes))}M`;
}

/** Slugify a heading so it can be linked from a table of contents. */
export function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Rough word count for schema.org wordCount. */
export function countWords(blocks = [], locale = defaultLocale) {
  return blocks.reduce((total, block) => {
    const text = block.text ? pick(block.text, locale) : '';
    const items = block.items ? pick(block.items, locale) ?? [] : [];
    const all = [text, ...(Array.isArray(items) ? items : [])].join(' ');
    return total + all.split(/\s+/).filter(Boolean).length;
  }, 0);
}
