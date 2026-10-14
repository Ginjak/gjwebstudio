import {
  caseEcommerce,
  caseCorporate,
  caseBooking,
  caseNonprofit,
  casePortfolio,
  caseDirectory,
  caseWide1,
  caseWide2,
} from './images';

/**
 * ---------------------------------------------------------------------------
 * PROJECTS / CASE STUDIES
 * ---------------------------------------------------------------------------
 * Each project renders a card on /darbai and a full case study at
 * /darbai/<slug>. Metrics are what make a case study convincing — always
 * include at least three with a real number.
 *
 * `categories` must use ids from `projectCategories` below.
 * ---------------------------------------------------------------------------
 */

export const projectCategories = [
  { id: 'ecommerce', icon: 'cart', name: { lt: 'El. parduotuvės', en: 'E-commerce' } },
  { id: 'corporate', icon: 'building', name: { lt: 'Įmonių svetainės', en: 'Corporate' } },
  { id: 'booking', icon: 'calendar', name: { lt: 'Rezervacijos', en: 'Booking' } },
  { id: 'nonprofit', icon: 'heart', name: { lt: 'Ne pelno', en: 'Non-profit' } },
  { id: 'portfolio', icon: 'image', name: { lt: 'Portfolio', en: 'Portfolio' } },
];

/** Category badges for a project: [{ id, icon, name }] in the given locale. */
export function projectCategoryBadges(project, locale) {
  return project.categories
    .map((id) => projectCategories.find((c) => c.id === id))
    .filter(Boolean)
    .map((c) => ({ id: c.id, icon: c.icon, name: c.name[locale] ?? c.name.lt }));
}

export const projects = [
  {
    slug: 'baldu-parduotuve-woocommerce',
    featured: true,
    year: 2025,
    categories: ['ecommerce'],
    services: ['woocommerce', 'greicio-optimizavimas', 'seo-optimizavimas'],
    image: caseEcommerce,
    gallery: [caseWide1, caseWide2],
    client: { lt: 'Baldų prekybos įmonė', en: 'Furniture retailer' },
    title: {
      lt: 'Nuo lėto kataloga iki parduotuvės, kuri konvertuoja',
      en: 'From a slow catalogue to a store that converts',
    },
    excerpt: {
      lt: 'WooCommerce parduotuvė su 2 400 prekių, integruota su apskaita ir trimis siuntų tiekėjais.',
      en: 'A WooCommerce store with 2,400 products, wired into accounting and three couriers.',
    },
    challenge: {
      lt: 'Senoji svetainė buvo tik katalogas: klientai skambindavo teirautis kainų ir likučių, o darbuotojai kasdien rankiniu būdu perrašinėjo užsakymus į apskaitos programą. Puslapiai kraudavosi 6–8 sekundes, mobiliajame — dar lėčiau.',
      en: 'The old site was just a catalogue: customers phoned to ask about prices and stock, and staff retyped every order into the accounting system by hand. Pages took 6–8 seconds to load, and longer on mobile.',
    },
    solution: {
      lt: 'Sukūriau WooCommerce parduotuvę su individualia tema ir dvipusiu likučių sinchronizavimu su apskaitos sistema. Atsiskaitymo procesą sutrumpinau nuo penkių žingsnių iki dviejų, pridėjau Paysera ir Montonio mokėjimus bei Omniva, LP Express ir DPD siuntas su automatiniu lipdukų generavimu. Visos nuotraukos konvertuotos į AVIF, kritinis CSS įkeliamas iškart.',
      en: 'I built a WooCommerce store with a bespoke theme and two-way stock sync with the accounting system. Checkout went from five steps to two, with Paysera and Montonio payments and Omniva, LP Express and DPD shipping including automatic label generation. Every image was converted to AVIF and critical CSS is inlined.',
    },
    outcome: {
      lt: 'Parduotuvė paleista be prastovos. Per pirmus keturis mėnesius organinis srautas išaugo daugiau nei trečdaliu, o užsakymų apdorojimas iš 12 minučių sutrumpėjo iki kelių sekundžių.',
      en: 'The store launched with zero downtime. In the first four months organic traffic grew by more than a third, and order processing dropped from 12 minutes to a few seconds.',
    },
    metrics: [
      { value: '1,4 s', label: { lt: 'Krovimosi laikas (buvo 7,2 s)', en: 'Load time (was 7.2s)' } },
      { value: '+38 %', label: { lt: 'Organinis srautas per 4 mėn.', en: 'Organic traffic in 4 months' } },
      { value: '+52 %', label: { lt: 'Baigtų atsiskaitymų', en: 'Completed checkouts' } },
      { value: '12 min → 0', label: { lt: 'Rankinio darbo užsakymui', en: 'Manual work per order' } },
    ],
    testimonial: {
      quote: {
        lt: 'Pirmą kartą per dešimt metų svetainė nebėra galvos skausmas. Užsakymai patys atsiranda apskaitoje, o klientai nebeskambina klausti, ar prekė sandėlyje.',
        en: 'For the first time in ten years the website is not a headache. Orders appear in accounting by themselves and customers no longer ring to ask if something is in stock.',
      },
      author: { lt: 'Vadovas', en: 'Managing director' },
    },
  },
  {
    slug: 'gamybos-imones-svetaine',
    year: 2025,
    categories: ['corporate'],
    services: ['wordpress-kurimas', 'seo-optimizavimas', 'prieinamumas'],
    image: caseCorporate,
    gallery: [caseWide2],
    client: { lt: 'Metalo gamybos įmonė', en: 'Metal manufacturing company' },
    title: {
      lt: 'Dvikalbė svetainė, kuri atveda eksporto užklausas',
      en: 'A bilingual site that brings in export enquiries',
    },
    excerpt: {
      lt: 'LT/EN svetainė gamybos įmonei su produktų katalogu ir techniniais dokumentais.',
      en: 'An LT/EN site for a manufacturer with a product catalogue and technical documents.',
    },
    challenge: {
      lt: 'Įmonė 80 % apyvartos gaudavo iš eksporto, bet svetainė buvo tik lietuviška ir be vienos nuotraukos iš gamyklos. Užsienio klientai rasdavo įmonę tik per tarpininkus.',
      en: 'The company earned 80% of its turnover from exports, yet the site was Lithuanian-only and had not a single photo from the factory floor. Foreign clients only found them through intermediaries.',
    },
    solution: {
      lt: 'Sukūriau dvikalbę svetainę su atskirais adresais ir hreflang žymėmis, produktų katalogu su techninėmis specifikacijomis ir atsisiunčiamais PDF dokumentais. Pridėjau schema.org duomenis produktams ir organizacijai, o visą svetainę pritaikiau WCAG 2.2 AA reikalavimams — to reikalavo keli Skandinavijos pirkėjai.',
      en: 'I built a bilingual site with separate URLs and hreflang tags, a product catalogue with technical specifications and downloadable PDFs. I added schema.org data for products and the organisation, and brought the whole site to WCAG 2.2 AA — a requirement from several Scandinavian buyers.',
    },
    outcome: {
      lt: 'Per pusmetį angliškoji versija pradėjo generuoti daugiau užklausų nei lietuviškoji, o įmonė gavo pirmus tiesioginius užsakymus iš Švedijos ir Vokietijos.',
      en: 'Within six months the English version generated more enquiries than the Lithuanian one, and the company won its first direct orders from Sweden and Germany.',
    },
    metrics: [
      { value: '+164 %', label: { lt: 'Užklausų per pusmetį', en: 'Enquiries in six months' } },
      { value: '100/100', label: { lt: 'Lighthouse prieinamumas', en: 'Lighthouse accessibility' } },
      { value: '2 rinkos', label: { lt: 'Naujos eksporto rinkos', en: 'New export markets' } },
    ],
  },
  {
    slug: 'restorano-rezervacijos',
    year: 2024,
    categories: ['booking'],
    services: ['wordpress-kurimas', 'integracijos'],
    image: caseBooking,
    client: { lt: 'Restoranų tinklas', en: 'Restaurant group' },
    title: {
      lt: 'Rezervacijos be tarpininkų ir be komisinių',
      en: 'Bookings without middlemen or commission',
    },
    excerpt: {
      lt: 'Rezervacijų sistema trims restoranams su bendru kalendoriumi ir SMS priminimais.',
      en: 'A booking system for three restaurants with a shared calendar and SMS reminders.',
    },
    challenge: {
      lt: 'Tinklas mokėjo komisinius išorinei rezervacijų platformai ir neturėjo prieigos prie savo klientų duomenų. Neatvykusių svečių būdavo apie penktadalis.',
      en: 'The group paid commission to an external booking platform and had no access to its own customer data. Around a fifth of guests simply did not turn up.',
    },
    solution: {
      lt: 'Sukūriau nuosavą rezervacijų sistemą su bendru visų trijų restoranų kalendoriumi, automatiniais SMS ir el. pašto priminimais bei sinchronizacija su virtuvės planavimo lentele. Duomenys lieka įmonei ir naudojami el. pašto rinkodarai.',
      en: 'I built an in-house booking system with a shared calendar across all three restaurants, automatic SMS and email reminders, and sync with the kitchen planning board. The data stays with the business and feeds their email marketing.',
    },
    outcome: {
      lt: 'Komisiniai išnyko visiškai, o priminimai sumažino neatvykimų skaičių daugiau nei perpus.',
      en: 'Commission disappeared entirely, and reminders more than halved the no-show rate.',
    },
    metrics: [
      { value: '0 €', label: { lt: 'Komisinių per mėnesį', en: 'Commission per month' } },
      { value: '−58 %', label: { lt: 'Neatvykusių svečių', en: 'No-shows' } },
      { value: '4 100', label: { lt: 'Klientų duomenų bazėje', en: 'Customers in their own database' } },
    ],
  },
  {
    slug: 'asociacijos-svetaine',
    year: 2024,
    categories: ['nonprofit', 'corporate'],
    services: ['migracija-ir-perkelimas', 'prieinamumas', 'wordpress-prieziura'],
    image: caseNonprofit,
    client: { lt: 'Nevyriausybinė organizacija', en: 'Non-governmental organisation' },
    title: {
      lt: 'Migracija iš uždaros platformos be pozicijų praradimo',
      en: 'Migration off a closed platform without losing rankings',
    },
    excerpt: {
      lt: 'Perkėlimas iš Wix į WordPress su 340 nukreipimų ir pilna WCAG atitiktimi.',
      en: 'A move from Wix to WordPress with 340 redirects and full WCAG compliance.',
    },
    challenge: {
      lt: 'Organizacija negalėjo redaguoti savo turinio be pagalbos, mokėjo mėnesinį platformos mokestį ir neatitiko prieinamumo reikalavimų, kurių reikalavo finansuotojai.',
      en: 'The organisation could not edit its own content without help, paid a monthly platform fee and failed the accessibility requirements its funders demanded.',
    },
    solution: {
      lt: 'Suindeksavau visus 340 esamų adresų, sudariau nukreipimų žemėlapį ir perkėliau turinį į WordPress su paprasta blokų sistema. Visą svetainę pritaikiau WCAG 2.2 AA, parengiau prieinamumo aprašą ir apmokiau komandą.',
      en: 'I indexed all 340 existing URLs, built a redirect map and moved the content into WordPress with a simple block system. The whole site was brought to WCAG 2.2 AA, with an accessibility statement and training for the team.',
    },
    outcome: {
      lt: 'Po migracijos srautas ne krito, o augo. Organizacija dabar publikuoja turinį pati ir sutaupo platformos mokestį.',
      en: 'Traffic rose rather than fell after the migration. The organisation now publishes content itself and saves the platform fee.',
    },
    metrics: [
      { value: '340', label: { lt: 'Nukreipimų be klaidų', en: 'Redirects with no errors' } },
      { value: '+12 %', label: { lt: 'Srauto po migracijos', en: 'Traffic after migration' } },
      { value: 'AA', label: { lt: 'WCAG 2.2 atitiktis', en: 'WCAG 2.2 compliance' } },
    ],
  },
  {
    slug: 'fotografo-portfolio',
    year: 2024,
    categories: ['portfolio'],
    services: ['wordpress-kurimas', 'greicio-optimizavimas'],
    image: casePortfolio,
    client: { lt: 'Vestuvių fotografas', en: 'Wedding photographer' },
    title: {
      lt: 'Portfolio, kuris kraunasi greitai net su 600 nuotraukų',
      en: 'A portfolio that stays fast with 600 photographs',
    },
    excerpt: {
      lt: 'Vizualus portfolio su galerijomis, kurios kraunasi per mažiau nei sekundę.',
      en: 'A visual portfolio with galleries that load in under a second.',
    },
    challenge: {
      lt: 'Fotografo darbus geriausiai parduoda didelės nuotraukos, bet būtent jos ir žudė svetainės greitį mobiliajame ryšyje.',
      en: "Big images sell a photographer's work best — and they were exactly what killed the site's speed on mobile.",
    },
    solution: {
      lt: 'Sukūriau galerijų sistemą su AVIF formatu, tingiuoju krovimu ir progresyviu blur efektu. Kiekviena nuotrauka generuojama septyniais dydžiais ir pateikiama pagal ekrano plotį.',
      en: 'I built a gallery system using AVIF, lazy loading and a progressive blur-up effect. Every photo is generated in seven sizes and served according to screen width.',
    },
    outcome: {
      lt: 'Svetainė kraunasi greičiau nei tekstinės konkurentų svetainės, nors joje kelis kartus daugiau vaizdų.',
      en: 'The site loads faster than text-only competitor sites despite carrying several times more imagery.',
    },
    metrics: [
      { value: '0,9 s', label: { lt: 'Didžiausio elemento krovimas', en: 'Largest Contentful Paint' } },
      { value: '−81 %', label: { lt: 'Nuotraukų svoris', en: 'Image weight' } },
      { value: '600+', label: { lt: 'Nuotraukų galerijose', en: 'Photos in galleries' } },
    ],
  },
  {
    slug: 'paslaugu-katalogas',
    year: 2023,
    categories: ['corporate'],
    services: ['wordpress-kurimas', 'integracijos', 'seo-optimizavimas'],
    image: caseDirectory,
    client: { lt: 'Paslaugų platforma', en: 'Services platform' },
    title: {
      lt: 'Katalogas su paieška, žemėlapiu ir 1 200 įrašų',
      en: 'A directory with search, maps and 1,200 listings',
    },
    excerpt: {
      lt: 'Vietinių paslaugų katalogas su filtrais, žemėlapiu ir savitarnos registracija.',
      en: 'A local services directory with filters, maps and self-service sign-up.',
    },
    challenge: {
      lt: 'Reikėjo katalogo, kuriame paslaugų teikėjai patys registruotųsi ir atnaujintų informaciją, o lankytojai rastų juos pagal miestą ir kategoriją per kelis paspaudimus.',
      en: 'They needed a directory where providers register and update their own details, and where visitors find them by city and category in a couple of clicks.',
    },
    solution: {
      lt: 'Sukūriau individualų įrašų tipą su filtravimu be puslapio perkrovimo, žemėlapio rodiniu ir savitarnos registracija su moderavimu. Kiekvienas įrašas turi LocalBusiness schemą, todėl matomas Google paieškos rezultatuose kaip atskiras objektas.',
      en: 'I created a custom post type with filtering that never reloads the page, a map view and moderated self-service registration. Every listing carries LocalBusiness schema so it can surface in Google as its own result.',
    },
    outcome: {
      lt: 'Platforma užaugo iki 1 200 įrašų be papildomo administravimo krūvio.',
      en: 'The platform grew to 1,200 listings with no extra administrative load.',
    },
    metrics: [
      { value: '1 200', label: { lt: 'Įrašų kataloge', en: 'Listings in the directory' } },
      { value: '< 200 ms', label: { lt: 'Filtravimo atsakas', en: 'Filter response time' } },
      { value: '92 %', label: { lt: 'Įrašų sukurta savitarna', en: 'Listings created self-service' } },
    ],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return projects;
  return projects.filter((p) => p.categories.includes(categoryId));
}
