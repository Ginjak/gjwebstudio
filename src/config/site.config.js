/**
 * ---------------------------------------------------------------------------
 * SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * The single source of truth for everything that identifies the business.
 * Change values here and they propagate to the header, footer, metadata,
 * structured data, sitemap and contact pages.
 *
 * Fields marked  TODO  are placeholders — replace before launch.
 * ---------------------------------------------------------------------------
 */

export const siteConfig = {
  // --- Identity -------------------------------------------------------------
  name: 'GJ Web Studio',
  legalName: 'GJ Web Studio, MB', // TODO real legal entity name
  shortName: 'GJ Web Studio',
  founded: '2021',
  /** Used in Person / author schema and the about page. */
  owner: {
    name: 'Giedrius J.', // TODO your full name
    jobTitle: { lt: 'WordPress kūrėjas ir SEO specialistas', en: 'WordPress developer & SEO specialist' },
    sameAs: [], // personal LinkedIn / GitHub
  },

  // --- URLs -----------------------------------------------------------------
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gjwebstudio.lt',
  logo: '/logo.svg',
  ogImage: '/images/placeholders/og-default-1200x630.png',

  // --- Contact (NAP — keep identical everywhere, including Google Profile) ---
  email: 'labas@gjwebstudio.lt', // TODO
  phone: '+370 600 00000', // TODO
  phoneDisplay: '+370 600 00000',
  bookingUrl: '', // e.g. 'https://cal.com/gjwebstudio/15min' — button appears when set

  address: {
    street: 'Gedimino pr. 1', // TODO
    locality: 'Vilnius',
    region: 'Vilniaus apskritis',
    postalCode: 'LT-01103',
    country: 'LT',
    countryName: { lt: 'Lietuva', en: 'Lithuania' },
  },
  geo: { latitude: 54.68737, longitude: 25.27954 }, // TODO exact coordinates

  /** Legal / registry details shown in the footer. */
  registry: {
    companyCode: '300000000', // TODO
    vatCode: 'LT100000000000', // TODO — remove the line if not VAT registered
  },

  /** Opening hours in schema.org format. */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
  ],

  /** Area served — powers LocalBusiness + the city landing pages. */
  areaServed: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Lietuva'],

  priceRange: '€€',
  currency: 'EUR',
  vatRate: 21,

  // --- Social ---------------------------------------------------------------
  social: {
    linkedin: 'https://www.linkedin.com/company/gj-web-studio', // TODO
    facebook: '',
    instagram: '',
    github: '',
  },

  // --- Analytics & verification --------------------------------------------
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },

  // --- Feature flags --------------------------------------------------------
  features: {
    blog: true,
    projects: true,
    pricingCalculator: true,
    freeAudit: true,
    newsletter: true,
    cityPages: true,
    uptimeBadge: false,
    darkMode: true,
  },

  /** Response-time promise shown on the contact page. */
  responseTime: { lt: 'per 1 darbo dieną', en: 'within 1 business day' },
};

export default siteConfig;
