import { siteConfig } from '@/config/site.config';
import { localeTags } from '@/config/routes';

/**
 * ---------------------------------------------------------------------------
 * SCHEMA.ORG BUILDERS
 * ---------------------------------------------------------------------------
 * Every page can export an array of nodes:
 *
 *   const schema = [
 *     breadcrumb(locale, [{ name: 'Kainos', url: '/kainos' }]),
 *     service({ name, description, priceFrom }),
 *     faqPage(items, locale),
 *   ];
 *   <JsonLd nodes={schema} locale={locale} />
 *
 * `<JsonLd>` merges them with the global Organization / WebSite / LocalBusiness
 * nodes, removes empty values and duplicate @ids, and prints ONE @graph block.
 *
 * Node @ids are stable so nodes can reference each other:
 *   #organization  #website  #localbusiness  #person
 * ---------------------------------------------------------------------------
 */

const base = () => siteConfig.url.replace(/\/$/, '');

/** Turn a relative path into an absolute URL. */
export function abs(path = '/') {
  if (!path) return base();
  if (/^https?:\/\//.test(path)) return path;
  return base() + (path.startsWith('/') ? path : `/${path}`);
}

export const ID = {
  organization: () => `${base()}/#organization`,
  website: () => `${base()}/#website`,
  localBusiness: () => `${base()}/#localbusiness`,
  person: () => `${base()}/#person`,
  webpage: (url) => `${abs(url)}#webpage`,
};

/** Remove null / undefined / empty values so the output stays clean. */
export function clean(node) {
  if (Array.isArray(node)) {
    const arr = node.map(clean).filter((v) => v !== undefined);
    return arr.length ? arr : undefined;
  }
  if (node && typeof node === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      const c = clean(v);
      if (c !== undefined) out[k] = c;
    }
    return Object.keys(out).length ? out : undefined;
  }
  if (node === null || node === '' || node === undefined) return undefined;
  return node;
}

const pick = (value, locale) =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value[locale] ?? value.lt ?? value.en)
    : value;

/* ==========================================================================
   GLOBAL NODES — injected on every page by the root layout
   ========================================================================== */

export function organization(locale = 'lt') {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    '@type': 'Organization',
    '@id': ID.organization(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: base(),
    logo: {
      '@type': 'ImageObject',
      url: abs(siteConfig.logo),
      contentUrl: abs(siteConfig.logo),
    },
    image: abs(siteConfig.ogImage),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: siteConfig.founded,
    vatID: siteConfig.registry?.vatCode,
    taxID: siteConfig.registry?.companyCode,
    address: postalAddress(locale),
    sameAs: sameAs.length ? sameAs : undefined,
    founder: { '@id': ID.person() },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.email,
      telephone: siteConfig.phone,
      availableLanguage: ['Lithuanian', 'English'],
      areaServed: 'LT',
    },
  };
}

export function postalAddress() {
  const a = siteConfig.address;
  return {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
}

export function localBusiness(locale = 'lt', rating) {
  return {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': ID.localBusiness(),
    name: siteConfig.name,
    url: base(),
    image: abs(siteConfig.ogImage),
    logo: abs(siteConfig.logo),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currency,
    paymentAccepted: 'Bank transfer, Card',
    address: postalAddress(locale),
    geo: siteConfig.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        }
      : undefined,
    areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'Place', name })),
    openingHoursSpecification: siteConfig.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: { '@id': ID.organization() },
    aggregateRating: rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: rating.ratingValue,
          reviewCount: rating.reviewCount,
          bestRating: rating.bestRating ?? 5,
        }
      : undefined,
  };
}

export function website(locale = 'lt') {
  return {
    '@type': 'WebSite',
    '@id': ID.website(),
    url: base(),
    name: siteConfig.name,
    inLanguage: localeTags[locale],
    publisher: { '@id': ID.organization() },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base()}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function person(locale = 'lt') {
  const o = siteConfig.owner;
  return {
    '@type': 'Person',
    '@id': ID.person(),
    name: o.name,
    jobTitle: pick(o.jobTitle, locale),
    url: base(),
    email: siteConfig.email,
    worksFor: { '@id': ID.organization() },
    sameAs: o.sameAs?.length ? o.sameAs : undefined,
    knowsAbout: [
      'WordPress',
      'WooCommerce',
      'Web performance',
      'Technical SEO',
      'Web accessibility',
    ],
  };
}

/** The four nodes that appear on every page. */
export function globalNodes(locale, rating) {
  return [organization(locale), localBusiness(locale, rating), website(locale), person(locale)];
}

/* ==========================================================================
   PER-PAGE NODES
   ========================================================================== */

/**
 * @param {string} locale
 * @param {{name: string, url: string}[]} items  — without the home crumb
 */
export function breadcrumb(locale, items = []) {
  const all = [{ name: siteConfig.name, url: locale === 'lt' ? '/' : '/en' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function webPage({ locale, url, name, description, datePublished, dateModified, image }) {
  return {
    '@type': 'WebPage',
    '@id': ID.webpage(url),
    url: abs(url),
    name,
    description,
    inLanguage: localeTags[locale],
    isPartOf: { '@id': ID.website() },
    about: { '@id': ID.organization() },
    primaryImageOfPage: image ? { '@type': 'ImageObject', url: abs(image) } : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
  };
}

export function service({
  name,
  description,
  url,
  priceFrom,
  currency = siteConfig.currency,
  recurring = false,
  serviceType,
  areaServed = siteConfig.areaServed,
}) {
  return {
    '@type': 'Service',
    name,
    description,
    url: url ? abs(url) : undefined,
    serviceType: serviceType ?? name,
    provider: { '@id': ID.organization() },
    areaServed: areaServed.map((a) => ({ '@type': 'Place', name: a })),
    offers: priceFrom
      ? {
          '@type': 'Offer',
          price: priceFrom,
          priceCurrency: currency,
          priceSpecification: {
            '@type': recurring ? 'UnitPriceSpecification' : 'PriceSpecification',
            price: priceFrom,
            priceCurrency: currency,
            minPrice: priceFrom,
            ...(recurring
              ? { billingIncrement: 1, unitCode: 'MON', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } }
              : {}),
          },
          availability: 'https://schema.org/InStock',
          url: url ? abs(url) : undefined,
        }
      : undefined,
  };
}

/**
 * A catalogue of offers — used on the pricing page.
 * @param {{name: string, description?: string, price: number, url?: string, recurring?: boolean}[]} offers
 */
export function offerCatalog({ name, offers = [], url }) {
  return {
    '@type': 'OfferCatalog',
    name,
    url: url ? abs(url) : undefined,
    provider: { '@id': ID.organization() },
    itemListElement: offers.map((o, i) => ({
      '@type': 'Offer',
      position: i + 1,
      name: o.name,
      description: o.description,
      price: o.price,
      priceCurrency: siteConfig.currency,
      url: o.url ? abs(o.url) : undefined,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: o.price,
        priceCurrency: siteConfig.currency,
        ...(o.recurring
          ? {
              billingDuration: 1,
              billingIncrement: 1,
              unitCode: 'MON',
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
            }
          : {}),
      },
      itemOffered: { '@type': 'Service', name: o.name, provider: { '@id': ID.organization() } },
    })),
  };
}

/** @param {{question: string, answer: string}[]} items */
export function faqPage(items = []) {
  if (!items.length) return undefined;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function article({
  locale,
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  section,
  keywords,
  wordCount,
  timeRequired,
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(url)}#article`,
    headline,
    description,
    url: abs(url),
    image: image ? abs(image) : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: localeTags[locale],
    articleSection: section,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    wordCount,
    timeRequired, // ISO 8601 duration, e.g. 'PT7M'
    author: { '@id': ID.person() },
    publisher: { '@id': ID.organization() },
    mainEntityOfPage: { '@id': ID.webpage(url) },
  };
}

export function creativeWork({ locale, url, name, description, image, datePublished, keywords, about }) {
  return {
    '@type': 'CreativeWork',
    '@id': `${abs(url)}#project`,
    name,
    description,
    url: abs(url),
    image: image ? abs(image) : undefined,
    datePublished,
    inLanguage: localeTags[locale],
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    about,
    creator: { '@id': ID.organization() },
  };
}

/** @param {{author: string, quote: string, rating?: number, date?: string}[]} reviews */
export function reviews(list = []) {
  return list.map((r) => ({
    '@type': 'Review',
    itemReviewed: { '@id': ID.localBusiness() },
    author: { '@type': 'Person', name: r.author },
    datePublished: r.date,
    reviewBody: r.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
  }));
}

/** @param {{name: string, text: string}[]} steps */
export function howTo({ name, description, steps = [], totalTime }) {
  return {
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function contactPage({ locale, url, name, description }) {
  return {
    '@type': 'ContactPage',
    '@id': ID.webpage(url),
    url: abs(url),
    name,
    description,
    inLanguage: localeTags[locale],
    mainEntity: { '@id': ID.organization() },
  };
}

export function itemList({ name, items = [] }) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: abs(item.url),
    })),
  };
}

export function videoObject({ name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl, duration }) {
  return {
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl ? abs(thumbnailUrl) : undefined,
    uploadDate,
    contentUrl,
    embedUrl,
    duration,
  };
}

export function event({ name, description, startDate, endDate, url, locationName, online }) {
  return {
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    url: url ? abs(url) : undefined,
    eventAttendanceMode: online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: online
      ? { '@type': 'VirtualLocation', url: url ? abs(url) : base() }
      : { '@type': 'Place', name: locationName, address: postalAddress() },
    organizer: { '@id': ID.organization() },
  };
}

export function jobPosting({ title, description, datePosted, validThrough, employmentType, salaryMin, salaryMax }) {
  return {
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: { '@id': ID.organization() },
    jobLocation: { '@type': 'Place', address: postalAddress() },
    baseSalary:
      salaryMin || salaryMax
        ? {
            '@type': 'MonetaryAmount',
            currency: siteConfig.currency,
            value: {
              '@type': 'QuantitativeValue',
              minValue: salaryMin,
              maxValue: salaryMax,
              unitText: 'MONTH',
            },
          }
        : undefined,
  };
}

/** Definition entries for a glossary page. */
export function definedTermSet({ name, url, terms = [] }) {
  return {
    '@type': 'DefinedTermSet',
    name,
    url: url ? abs(url) : undefined,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description: t.description,
    })),
  };
}

/**
 * Merge global + page nodes into a single, de-duplicated @graph.
 */
export function buildGraph(nodes = []) {
  const flat = nodes.flat().filter(Boolean).map(clean).filter(Boolean);
  const seen = new Set();
  const graph = [];
  for (const node of flat) {
    const id = node['@id'];
    if (id) {
      if (seen.has(id)) continue;
      seen.add(id);
    }
    graph.push(node);
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
