import { siteConfig } from '@/config/site.config';
import { locales, defaultLocale, path, routes } from '@/config/routes';
import { services } from '@/lib/content/services';
import { projects } from '@/lib/content/projects';
import { posts } from '@/lib/content/posts';
import { cities } from '@/lib/content/site-content';

/**
 * Bilingual sitemap.
 *
 * Every entry carries `alternates.languages` so Google can pair the Lithuanian
 * and English versions of the same page — the sitemap equivalent of hreflang.
 */
const base = siteConfig.url.replace(/\/$/, '');
const url = (locale, key, ...rest) => base + path(locale, key, ...rest);

function entry(key, rest = [], { changeFrequency = 'monthly', priority = 0.7, lastModified } = {}) {
  return {
    url: url(defaultLocale, key, ...rest),
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, url(l, key, ...rest)])),
    },
  };
}

export default function sitemap() {
  const staticKeys = [
    ['home', { priority: 1, changeFrequency: 'weekly' }],
    ['services', { priority: 0.9 }],
    ['pricing', { priority: 0.9 }],
    ['work', { priority: 0.8 }],
    ['blog', { priority: 0.8, changeFrequency: 'weekly' }],
    ['about', { priority: 0.7 }],
    ['contact', { priority: 0.8 }],
    ['faq', { priority: 0.6 }],
    ['testimonials', { priority: 0.6 }],
    ['audit', { priority: 0.8 }],
    ['privacy', { priority: 0.2, changeFrequency: 'yearly' }],
    ['cookies', { priority: 0.2, changeFrequency: 'yearly' }],
    ['accessibility', { priority: 0.3, changeFrequency: 'yearly' }],
  ];

  return [
    ...staticKeys
      .filter(([key]) => routes[key])
      .map(([key, options]) => entry(key, [], options)),

    ...services.map((s) => entry('services', [s.slug], { priority: 0.8 })),
    ...projects.map((p) => entry('work', [p.slug], { priority: 0.7 })),
    ...posts.map((p) =>
      entry('blog', [p.slug], {
        priority: 0.6,
        lastModified: new Date(p.updated ?? p.date),
      }),
    ),
    ...cities.map((c) => entry('locations', [c.slug], { priority: 0.7 })),
  ];
}
