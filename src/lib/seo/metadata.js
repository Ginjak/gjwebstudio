import { siteConfig } from '@/config/site.config';
import { locales, defaultLocale, localeTags, localeOg, path, routes } from '@/config/routes';

/**
 * ---------------------------------------------------------------------------
 * METADATA HELPER
 * ---------------------------------------------------------------------------
 * Use in any page:
 *
 *   export async function generateMetadata({ params }) {
 *     const { locale } = await params;
 *     const t = createTranslator(await getDictionary(locale));
 *     return buildMetadata({
 *       locale,
 *       routeKey: 'pricing',
 *       title: t('pricing.title'),
 *       description: t('pricing.lead'),
 *     });
 *   }
 *
 * It produces: title, description, canonical, hreflang alternates for every
 * locale plus x-default, OpenGraph, Twitter card and robots directives.
 * ---------------------------------------------------------------------------
 */

const siteUrl = siteConfig.url.replace(/\/$/, '');

export function absoluteUrl(p = '/') {
  if (!p) return siteUrl;
  if (/^https?:\/\//.test(p)) return p;
  return siteUrl + (p.startsWith('/') ? p : `/${p}`);
}

/**
 * Build hreflang alternates for a route.
 * `extra` are additional path segments (e.g. a post slug).
 */
export function alternateLanguages(routeKey, ...extra) {
  const languages = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = absoluteUrl(path(locale, routeKey, ...extra));
  }
  languages['x-default'] = absoluteUrl(path(defaultLocale, routeKey, ...extra));
  return languages;
}

export function buildMetadata({
  locale = defaultLocale,
  routeKey = 'home',
  segments = [],
  title,
  description,
  image,
  imageAlt,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
  keywords,
  authors,
}) {
  const url = absoluteUrl(path(locale, routeKey, ...segments));
  const ogImage = absoluteUrl(image || siteConfig.ogImage);
  const isHome = routeKey === 'home';

  return {
    // The home title already carries the brand, so skip the "%s | GJ Web Studio" template.
    title: isHome ? { absolute: title } : title,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    authors: authors ?? [{ name: siteConfig.owner.name, url: siteUrl }],
    creator: siteConfig.owner.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteUrl),

    alternates: {
      canonical: url,
      languages: alternateLanguages(routeKey, ...segments),
      types: {
        'application/rss+xml': [
          { url: absoluteUrl('/rss.xml'), title: `${siteConfig.name} — RSS` },
        ],
      },
    },

    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: localeOg[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeOg[l]),
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt || title }],
      ...(type === 'article' ? { publishedTime, modifiedTime, authors: [siteConfig.owner.name] } : {}),
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },

    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    ...(siteConfig.analytics.gscVerification
      ? { verification: { google: siteConfig.analytics.gscVerification } }
      : {}),

    formatDetection: { email: false, address: false, telephone: false },
  };
}

/** All indexable routes, used by sitemap.js. */
export function staticRouteKeys() {
  return Object.keys(routes).filter(
    (k) => !['privacy', 'cookies', 'accessibility'].includes(k) || true,
  );
}
