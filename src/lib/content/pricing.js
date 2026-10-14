/**
 * ---------------------------------------------------------------------------
 * PRICING
 * ---------------------------------------------------------------------------
 * All money lives here. Change a number and it updates the pricing page,
 * the homepage preview, the calculator and the Offer/OfferCatalog schema.
 *
 * Prices are in EUR, excluding 21% VAT (see siteConfig.vatRate).
 * `annual` is the per-month price when paying for 12 months up front
 * (currently 10/12 of the monthly price = 2 months free).
 * ---------------------------------------------------------------------------
 */

const annualise = (monthly) => Math.round((monthly * 10) / 12);

export const plans = [
  {
    id: 'pradzia',
    order: 1,
    monthly: 39,
    get annual() {
      return annualise(this.monthly);
    },
    hours: 0.5,
    responseTime: { lt: '2 darbo dienos', en: '2 business days' },
    name: { lt: 'Pradžia', en: 'Starter' },
    tagline: {
      lt: 'Bazinė priežiūra: atnaujinimai, atsarginės kopijos ir smulkūs pakeitimai.',
      en: 'The essentials: updates, backups and small content edits.',
    },
    bestFor: {
      lt: 'Vizitinėms ir nedidelėms įmonių svetainėms',
      en: 'Brochure sites and small business websites',
    },
    features: {
      lt: [
        'WordPress branduolio, temos ir įskiepių atnaujinimai kas mėnesį',
        'Svetainės patikra po kiekvieno atnaujinimo',
        'Savaitinės atsarginės kopijos (30 d. istorija)',
        'Veikimo stebėjimas kas 5 min.',
        '30 min. smulkiems turinio pakeitimams per mėnesį',
        'El. pašto pagalba per 2 darbo dienas',
      ],
      en: [
        'Monthly WordPress core, theme and plugin updates',
        'Site check after every update',
        'Weekly backups (30-day history)',
        'Uptime checks every 5 minutes',
        '30 minutes of small content edits per month',
        'Email support within 2 business days',
      ],
    },
  },
  {
    id: 'augimas',
    order: 2,
    featured: true,
    monthly: 179,
    get annual() {
      return annualise(this.monthly);
    },
    hours: 3,
    responseTime: { lt: '1 darbo diena', en: '1 business day' },
    name: { lt: 'Augimas', en: 'Growth' },
    tagline: {
      lt: 'Priežiūra plius nuolatinis greičio ir matomumo gerinimas.',
      en: 'Care plus continuous work on speed and visibility.',
    },
    bestFor: {
      lt: 'Aktyviai dirbančioms įmonėms, kurioms svetainė neša užklausas',
      en: 'Active businesses whose website generates enquiries',
    },
    features: {
      lt: [
        'Viskas, kas plane „Pradžia“',
        '3 val. darbų per mėnesį (turinys, pakeitimai, taisymai)',
        'Testinė (staging) aplinka prieš kiekvieną atnaujinimą',
        'Core Web Vitals stebėjimas ir optimizavimas',
        'Bazinis SEO: meta duomenys, vidinės nuorodos, schema',
        'Mėnesinė ataskaita su lankomumu ir atliktais darbais',
        'Pagalba per 1 darbo dieną',
      ],
      en: [
        'Everything in Starter',
        '3 hours of work per month (content, changes, fixes)',
        'Staging environment before every update',
        'Core Web Vitals monitoring and tuning',
        'Baseline SEO: metadata, internal links, schema',
        'Monthly report with traffic and work completed',
        'Support within 1 business day',
      ],
    },
  },
  {
    id: 'partneris',
    order: 3,
    monthly: 349,
    get annual() {
      return annualise(this.monthly);
    },
    hours: 8,
    responseTime: { lt: '4 darbo valandos', en: '4 business hours' },
    name: { lt: 'Partneris', en: 'Partner' },
    tagline: {
      lt: 'Nuolatinis vystymas: SEO, konversijos, naujos funkcijos.',
      en: 'Ongoing growth work: SEO, conversion, new features.',
    },
    bestFor: {
      lt: 'El. parduotuvėms ir įmonėms, kurioms svetainė yra pagrindinis kanalas',
      en: 'Online stores and companies whose site is the main channel',
    },
    features: {
      lt: [
        'Viskas, kas plane „Augimas“',
        '8 val. darbų per mėnesį',
        'Pilnas SEO: raktažodžiai, turinio planas, nuorodų strategija',
        'Konversijų optimizavimas ir A/B testai',
        'Kas ketvirtį — strateginis pokalbis ir kelrodis',
        'Prioritetinė pagalba per 4 darbo valandas',
        'Tiesioginis kontaktas telefonu',
      ],
      en: [
        'Everything in Growth',
        '8 hours of work per month',
        'Full SEO: keywords, content plan, link strategy',
        'Conversion optimisation and A/B tests',
        'Quarterly strategy call and roadmap',
        'Priority support within 4 business hours',
        'Direct phone contact',
      ],
    },
  },
  {
    id: 'individualus',
    order: 4,
    monthly: 600,
    custom: true,
    get annual() {
      return this.monthly;
    },
    hours: null,
    responseTime: { lt: 'pagal SLA', en: 'per SLA' },
    name: { lt: 'Individualus', en: 'Custom' },
    tagline: {
      lt: 'Kelios svetainės, sudėtingos integracijos arba griežtas SLA.',
      en: 'Multiple sites, complex integrations or a strict SLA.',
    },
    bestFor: {
      lt: 'Įmonių grupėms, viešajam sektoriui, didelėms el. parduotuvėms',
      en: 'Company groups, public sector, large e-commerce',
    },
    features: {
      lt: [
        'Kelių svetainių priežiūra viename plane',
        'Individualus SLA su garantuotu reagavimo laiku',
        'Skirtos valandos kas mėnesį pagal poreikį',
        'Techninė dokumentacija ir žinių perdavimas',
        'Dalyvavimas jūsų komandos susirinkimuose',
      ],
      en: [
        'Several websites under one plan',
        'Bespoke SLA with guaranteed response times',
        'Dedicated monthly hours agreed up front',
        'Technical documentation and knowledge transfer',
        'Participation in your team meetings',
      ],
    },
  },
];

/** Feature comparison matrix. `values` maps plan id -> true | false | string. */
export const comparison = [
  {
    group: { lt: 'Priežiūra', en: 'Maintenance' },
    rows: [
      {
        label: { lt: 'Atnaujinimų dažnumas', en: 'Update frequency' },
        values: {
          pradzia: { lt: 'Kas mėnesį', en: 'Monthly' },
          augimas: { lt: 'Kas savaitę + staging', en: 'Weekly + staging' },
          partneris: { lt: 'Kas savaitę + staging', en: 'Weekly + staging' },
          individualus: { lt: 'Pagal susitarimą', en: 'As agreed' },
        },
      },
      {
        label: { lt: 'Atsarginių kopijų istorija', en: 'Backup history' },
        values: {
          pradzia: '30 d.',
          augimas: '90 d.',
          partneris: '365 d.',
          individualus: { lt: 'Pagal susitarimą', en: 'As agreed' },
        },
      },
      {
        label: { lt: 'Veikimo stebėjimas', en: 'Uptime monitoring' },
        values: { pradzia: '5 min.', augimas: '1 min.', partneris: '1 min.', individualus: '1 min.' },
      },
      {
        label: { lt: 'Kenkėjiško kodo šalinimas', en: 'Malware removal' },
        values: { pradzia: false, augimas: true, partneris: true, individualus: true },
      },
    ],
  },
  {
    group: { lt: 'Darbas ir pagalba', en: 'Work & support' },
    rows: [
      {
        label: { lt: 'Valandos per mėnesį', en: 'Hours per month' },
        values: {
          pradzia: { lt: '0,5', en: '0.5' },
          augimas: '3',
          partneris: '8',
          individualus: { lt: 'Pagal susitarimą', en: 'As agreed' },
        },
      },
      {
        label: { lt: 'Reagavimo laikas', en: 'Response time' },
        values: {
          pradzia: { lt: '2 d. d.', en: '2 business days' },
          augimas: { lt: '1 d. d.', en: '1 business day' },
          partneris: { lt: '4 val.', en: '4 hours' },
          individualus: 'SLA',
        },
      },
      {
        label: { lt: 'Pagalba telefonu', en: 'Phone support' },
        values: { pradzia: false, augimas: false, partneris: true, individualus: true },
      },
    ],
  },
  {
    group: { lt: 'Augimas', en: 'Growth' },
    rows: [
      {
        label: { lt: 'Core Web Vitals optimizavimas', en: 'Core Web Vitals tuning' },
        values: { pradzia: false, augimas: true, partneris: true, individualus: true },
      },
      {
        label: { lt: 'SEO darbai', en: 'SEO work' },
        values: {
          pradzia: false,
          augimas: { lt: 'Baziniai', en: 'Baseline' },
          partneris: { lt: 'Pilni', en: 'Full' },
          individualus: { lt: 'Pilni', en: 'Full' },
        },
      },
      {
        label: { lt: 'Mėnesinė ataskaita', en: 'Monthly report' },
        values: { pradzia: false, augimas: true, partneris: true, individualus: true },
      },
      {
        label: { lt: 'Strateginis pokalbis', en: 'Strategy call' },
        values: {
          pradzia: false,
          augimas: false,
          partneris: { lt: 'Kas ketvirtį', en: 'Quarterly' },
          individualus: { lt: 'Kas mėnesį', en: 'Monthly' },
        },
      },
    ],
  },
];

/** One-off project packages. */
export const packages = [
  {
    id: 'landing',
    icon: 'bolt',
    from: 900,
    duration: { lt: '1–2 savaitės', en: '1–2 weeks' },
    name: { lt: 'Nukreipiamasis puslapis', en: 'Landing page' },
    description: {
      lt: 'Vienas puslapis, sukurtas vienam tikslui — užklausai, registracijai ar produkto pristatymui.',
      en: 'A single page built for one job — an enquiry, a sign-up or a product launch.',
    },
    includes: {
      lt: ['Iki 1 puslapio', 'Individualus dizainas', 'Kontaktų forma', 'Analitika ir konversijų sekimas', 'Bazinis SEO'],
      en: ['Up to 1 page', 'Custom design', 'Contact form', 'Analytics and conversion tracking', 'Baseline SEO'],
    },
  },
  {
    id: 'verslo-svetaine',
    icon: 'building',
    from: 2200,
    featured: true,
    duration: { lt: '4–6 savaitės', en: '4–6 weeks' },
    name: { lt: 'Verslo svetainė', en: 'Business website' },
    description: {
      lt: 'Pilna įmonės svetainė su paslaugomis, darbais, tinklaraščiu ir savarankišku turinio valdymu.',
      en: 'A full company site with services, case studies, a blog and self-service content editing.',
    },
    includes: {
      lt: [
        '8–15 puslapių',
        'Individuali WordPress tema',
        'Gutenberg blokų biblioteka',
        'Dvikalbė versija (LT/EN)',
        'Techninis SEO ir schema.org',
        'Mokymai ir dokumentacija',
      ],
      en: [
        '8–15 pages',
        'Bespoke WordPress theme',
        'Gutenberg block library',
        'Bilingual (LT/EN)',
        'Technical SEO and schema.org',
        'Training and documentation',
      ],
    },
  },
  {
    id: 'woocommerce',
    icon: 'cart',
    from: 4500,
    duration: { lt: '6–10 savaičių', en: '6–10 weeks' },
    name: { lt: 'WooCommerce parduotuvė', en: 'WooCommerce store' },
    description: {
      lt: 'El. parduotuvė su lietuviškais mokėjimais, siuntomis ir apskaitos integracija.',
      en: 'An online store with Lithuanian payments, couriers and accounting integration.',
    },
    includes: {
      lt: [
        'Neribotas prekių skaičius',
        'Paysera / Montonio mokėjimai',
        'Omniva, LP Express, DPD siuntos',
        'Apskaitos sistemos integracija',
        'Optimizuotas atsiskaitymas',
        'El. prekybos analitika',
      ],
      en: [
        'Unlimited products',
        'Paysera / Montonio payments',
        'Omniva, LP Express, DPD shipping',
        'Accounting system integration',
        'Optimised checkout',
        'E-commerce analytics',
      ],
    },
  },
];

/** Hourly rate for work outside a plan. */
export const hourlyRate = 55;

/** Add-ons, priced per month unless `oneOff` is true. */
export const addons = [
  {
    id: 'extra-language',
    icon: 'globe',
    price: 450,
    oneOff: true,
    name: { lt: 'Papildoma kalba', en: 'Additional language' },
    description: {
      lt: 'Vertimo struktūra, hreflang ir atskiri adresai kiekvienai kalbai.',
      en: 'Translation structure, hreflang and separate URLs per language.',
    },
  },
  {
    id: 'content',
    icon: 'document',
    price: 120,
    name: { lt: 'Turinio rašymas', en: 'Content writing' },
    description: {
      lt: '2 SEO straipsniai per mėnesį lietuvių kalba.',
      en: 'Two SEO articles per month.',
    },
  },
  {
    id: 'hosting',
    icon: 'bolt',
    price: 25,
    name: { lt: 'Talpinimas', en: 'Managed hosting' },
    description: {
      lt: 'Greitas NVMe serveris ES, SSL, CDN ir kasdienės kopijos.',
      en: 'Fast NVMe hosting in the EU, SSL, CDN and daily backups.',
    },
  },
  {
    id: 'training',
    icon: 'users',
    price: 150,
    oneOff: true,
    name: { lt: 'Komandos mokymai', en: 'Team training' },
    description: {
      lt: '2 val. nuotolinis mokymas su įrašu ir instrukcijomis.',
      en: 'A 2-hour remote session, recorded, with written instructions.',
    },
  },
];

/**
 * Calculator configuration. Each option adds its `price` to the estimate.
 * The result is shown as a range: base .. base * rangeFactor.
 */
export const calculator = {
  rangeFactor: 1.35,
  pages: { min: 1, max: 30, default: 8, pricePerPage: 140, base: 700 },
  options: [
    {
      id: 'design',
      price: 600,
      name: { lt: 'Individualus dizainas', en: 'Custom design' },
      hint: { lt: 'Vietoj paruoštos stilistikos', en: 'Instead of a ready-made style' },
    },
    {
      id: 'bilingual',
      price: 450,
      name: { lt: 'Dvi kalbos', en: 'Two languages' },
      hint: { lt: 'LT + EN su hreflang', en: 'LT + EN with hreflang' },
    },
    {
      id: 'shop',
      price: 2200,
      name: { lt: 'El. parduotuvė', en: 'Online store' },
      hint: { lt: 'WooCommerce su mokėjimais', en: 'WooCommerce with payments' },
    },
    {
      id: 'integrations',
      price: 800,
      name: { lt: 'Integracijos', en: 'Integrations' },
      hint: { lt: 'CRM, apskaita, rezervacijos', en: 'CRM, accounting, bookings' },
    },
    {
      id: 'content',
      price: 500,
      name: { lt: 'Turinio rašymas', en: 'Content writing' },
      hint: { lt: 'Tekstai visiems puslapiams', en: 'Copy for every page' },
    },
    {
      id: 'migration',
      price: 600,
      name: { lt: 'Migracija', en: 'Migration' },
      hint: { lt: 'Perkėlimas iš senos svetainės', en: 'Move from an existing site' },
    },
  ],
};

export function getPlan(id) {
  return plans.find((p) => p.id === id);
}
