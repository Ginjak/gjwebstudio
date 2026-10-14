/**
 * ---------------------------------------------------------------------------
 * SERVICES
 * ---------------------------------------------------------------------------
 * Each service becomes:
 *   • a card on the homepage accordion and /paslaugos
 *   • a detail page at /paslaugos/<slug>  (/en/services/<slug>)
 *   • a `Service` node in the structured data
 *
 * `slug` is shared by both languages so links never break when switching.
 * ---------------------------------------------------------------------------
 */

export const services = [
  {
    slug: 'wordpress-kurimas',
    icon: 'code',
    priceFrom: 900,
    order: 1,
    name: {
      lt: 'WordPress svetainių kūrimas',
      en: 'WordPress website development',
    },
    excerpt: {
      lt: 'Individualiai suprogramuota tema, švarus kodas ir patogi turinio redagavimo sistema. Jokių sunkių šablonų.',
      en: 'A custom-coded theme, clean markup and a content editor your team will actually enjoy. No heavy templates.',
    },
    body: {
      lt: 'Kiekviena svetainė pradedama nuo turinio struktūros, o ne nuo dizaino šablono. Programuoju individualią temą su Gutenberg blokais, kad galėtumėte patys keisti tekstus, nuotraukas ir sekcijas nesugadindami dizaino. Kodas švarus, be dešimties nereikalingų įskiepių, todėl svetainė kraunasi greitai ir lieka saugi metų metus.',
      en: 'Every website starts with the content structure, not a design template. I code a bespoke theme with Gutenberg blocks so your team can change text, images and whole sections without breaking the layout. The code stays lean — no ten-plugin stack — so the site loads fast and stays secure for years.',
    },
    features: {
      lt: [
        'Individuali tema, pritaikyta jūsų turiniui',
        'Gutenberg blokai savarankiškam redagavimui',
        'Adaptyvus dizainas nuo 320 px iki 4K',
        'Core Web Vitals žalioje zonoje',
        'Techninis SEO pagrindas nuo pirmos dienos',
        'Mokymai, kaip valdyti svetainę',
      ],
      en: [
        'Bespoke theme built around your content',
        'Gutenberg blocks for self-service editing',
        'Responsive from 320px to 4K',
        'Core Web Vitals in the green',
        'Technical SEO foundation from day one',
        'Training on how to run the site',
      ],
    },
    idealFor: {
      lt: 'Įmonėms, kurioms reikia svetainės, atspindinčios realų verslą, o ne bendrinį šabloną.',
      en: 'Businesses that need a site reflecting their actual business, not a generic template.',
    },
  },
  {
    slug: 'wordpress-prieziura',
    icon: 'shield',
    priceFrom: 39,
    recurring: true,
    order: 5,
    name: {
      lt: 'WordPress svetainių priežiūra',
      en: 'WordPress maintenance plans',
    },
    excerpt: {
      lt: 'Atnaujinimai, atsarginės kopijos, saugumas ir stebėjimas 24/7. Jūs galvojate apie verslą, aš — apie svetainę.',
      en: 'Updates, backups, security and 24/7 monitoring. You think about the business, I think about the website.',
    },
    body: {
      lt: 'Nepriežiūrima WordPress svetainė sugenda ne „jei“, o „kada“. Kas savaitę atnaujinu branduolį, temą ir įskiepius testinėje aplinkoje, tikrinu, ar niekas nesulūžo, ir tik tada keliu į gyvą svetainę. Atsarginės kopijos daromos kasdien ir saugomos atskirai nuo serverio, todėl net ir blogiausiu atveju svetainę atstatau per kelias valandas.',
      en: 'An unmaintained WordPress site does not break "if" — it breaks "when". Every week I update core, theme and plugins on a staging copy, check nothing broke, and only then push live. Backups run daily and are stored away from the server, so even in the worst case the site is back within hours.',
    },
    features: {
      lt: [
        'Savaitiniai atnaujinimai testinėje aplinkoje',
        'Kasdienės atsarginės kopijos, saugomos atskirai',
        'Saugumo stebėjimas ir kenkėjiško kodo šalinimas',
        'Veikimo (uptime) stebėjimas kas 1 min.',
        'Greičio stebėjimas ir mėnesinė ataskaita',
        'Valandos smulkiems pakeitimams',
      ],
      en: [
        'Weekly updates tested on staging first',
        'Daily off-server backups',
        'Security monitoring and malware clean-up',
        'Uptime checks every minute',
        'Performance monitoring and a monthly report',
        'Included hours for small changes',
      ],
    },
    idealFor: {
      lt: 'Visiems, kurių svetainė uždirba pinigus ir negali stovėti.',
      en: 'Anyone whose website earns money and cannot afford downtime.',
    },
  },
  {
    slug: 'seo-optimizavimas',
    icon: 'search',
    priceFrom: 149,
    recurring: true,
    order: 6,
    name: {
      lt: 'SEO paslaugos ir optimizavimas',
      en: 'SEO services',
    },
    excerpt: {
      lt: 'Techninis SEO, turinio strategija ir vietinė paieška. Matomi rezultatai, o ne pažadai.',
      en: 'Technical SEO, content strategy and local search. Measurable results, not promises.',
    },
    body: {
      lt: 'SEO prasideda nuo technikos: greičio, struktūros, indeksavimo ir schema.org duomenų. Tada eina turinys — raktažodžiai, kurių realiai ieško jūsų klientai Lietuvoje, ir puslapiai, kurie į juos atsako geriau nei konkurentų. Kas mėnesį matote ataskaitą su pozicijomis, srautu ir konkrečiais darbais.',
      en: 'SEO starts with the technical layer: speed, structure, indexing and schema.org data. Then comes content — the keywords your customers actually search for in Lithuania, and pages that answer them better than the competition. Every month you get a report with rankings, traffic and the exact work done.',
    },
    features: {
      lt: [
        'Techninis SEO auditas ir klaidų taisymas',
        'Raktažodžių tyrimas lietuvių kalba',
        'Turinio planas ir tekstų optimizavimas',
        'Vietinis SEO ir Google Business Profile',
        'Struktūriniai duomenys (schema.org)',
        'Mėnesinės ataskaitos su pozicijomis',
      ],
      en: [
        'Technical SEO audit and fixes',
        'Keyword research in Lithuanian and English',
        'Content plan and on-page optimisation',
        'Local SEO and Google Business Profile',
        'Structured data (schema.org)',
        'Monthly reporting with rankings',
      ],
    },
    idealFor: {
      lt: 'Verslams, kurie nori organinio srauto vietoje nuolatinių reklamos išlaidų.',
      en: 'Businesses that want organic traffic instead of permanent ad spend.',
    },
  },
  {
    slug: 'greicio-optimizavimas',
    icon: 'bolt',
    priceFrom: 450,
    order: 8,
    name: {
      lt: 'Greičio optimizavimas',
      en: 'Speed optimisation',
    },
    excerpt: {
      lt: 'Core Web Vitals į žalią zoną. Greitesnė svetainė = daugiau užklausų ir aukštesnės pozicijos.',
      en: 'Core Web Vitals into the green. A faster site means more enquiries and better rankings.',
    },
    body: {
      lt: 'Lėta svetainė kainuoja realius pinigus: kas sekundę ilgesnis krovimasis mažina konversiją. Išmatuoju realių vartotojų duomenis, randu tikrąją problemą — dažniausiai tai nesuspaustos nuotraukos, per daug įskiepių arba blogai sukonfigūruotas serveris — ir ją pašalinu. Po darbų gaunate ataskaitą „prieš ir po“ su Core Web Vitals skaičiais.',
      en: 'A slow site costs real money: every extra second of load time cuts conversions. I measure field data from real users, find the actual bottleneck — usually unoptimised images, plugin bloat or a badly configured server — and remove it. You get a before/after report with Core Web Vitals numbers.',
    },
    features: {
      lt: [
        'Core Web Vitals auditas (lauko ir laboratoriniai duomenys)',
        'Nuotraukų konvertavimas į WebP/AVIF',
        'Kritinio CSS ir JS optimizavimas',
        'Talpyklos ir CDN konfigūravimas',
        'Duomenų bazės valymas',
        'Ataskaita „prieš ir po“',
      ],
      en: [
        'Core Web Vitals audit (field and lab data)',
        'Image conversion to WebP/AVIF',
        'Critical CSS and JavaScript optimisation',
        'Caching and CDN configuration',
        'Database clean-up',
        'Before/after report',
      ],
    },
    idealFor: {
      lt: 'Svetainėms, kurios kraunasi ilgiau nei 2,5 s arba krenta Google pozicijose.',
      en: 'Sites that load in over 2.5s or are slipping in Google rankings.',
    },
  },
  {
    slug: 'woocommerce',
    icon: 'cart',
    priceFrom: 4500,
    order: 4,
    name: {
      lt: 'WooCommerce el. parduotuvių kūrimas',
      en: 'WooCommerce store development',
    },
    excerpt: {
      lt: 'Parduotuvė, integruota su jūsų apskaita, siuntomis ir mokėjimais. Pirkimas be trinties.',
      en: 'A store wired into your accounting, shipping and payments. Checkout without friction.',
    },
    body: {
      lt: 'Kuriu WooCommerce parduotuves, kurios veikia su lietuviškais mokėjimų ir siuntų tiekėjais: Paysera, Montonio, Omniva, LP Express, DPD. Prekių sinchronizavimas su apskaitos sistema reiškia, kad likučių nereikia vesti du kartus. Atsiskaitymo procesas supaprastintas iki minimumo — kuo mažiau žingsnių, tuo daugiau užsakymų.',
      en: 'I build WooCommerce stores that work with Lithuanian payment and delivery providers: Paysera, Montonio, Omniva, LP Express, DPD. Product sync with your accounting system means stock is never entered twice. Checkout is trimmed to the minimum — fewer steps, more completed orders.',
    },
    features: {
      lt: [
        'Lietuviški mokėjimo būdai ir siuntų tiekėjai',
        'Integracija su apskaitos sistema',
        'Optimizuotas atsiskaitymo procesas',
        'Prekių importas ir sinchronizavimas',
        'Nuolaidų ir lojalumo mechanizmai',
        'El. prekybos analitika ir konversijų sekimas',
      ],
      en: [
        'Lithuanian payment gateways and couriers',
        'Accounting system integration',
        'Streamlined checkout flow',
        'Product import and synchronisation',
        'Discounts and loyalty mechanics',
        'E-commerce analytics and conversion tracking',
      ],
    },
    idealFor: {
      lt: 'Prekybininkams, kuriems reikia pilnos kontrolės ir jokių mėnesinių platformos mokesčių nuo apyvartos.',
      en: 'Retailers who want full control and no platform fees taken from turnover.',
    },
  },
  {
    slug: 'migracija-ir-perkelimas',
    icon: 'move',
    priceFrom: 600,
    order: 9,
    name: {
      lt: 'Migracija ir perkėlimas',
      en: 'Migration and replatforming',
    },
    excerpt: {
      lt: 'Perkėlimas iš Wix, Squarespace ar seno WordPress be pozicijų ir srauto praradimo.',
      en: 'Move from Wix, Squarespace or an old WordPress without losing rankings or traffic.',
    },
    body: {
      lt: 'Blogai atlikta migracija gali per naktį nubraukti metų SEO darbą. Prieš perkeliant suindeksuoju visus esamus adresus, sudarau nukreipimų žemėlapį ir tik tada keliu turinį. Po paleidimo dvi savaites stebiu Search Console — kad nei vienas puslapis nedingtų iš paieškos.',
      en: 'A botched migration can wipe out years of SEO overnight. Before moving anything I index every existing URL, build a redirect map, and only then migrate the content. After launch I watch Search Console for two weeks so not a single page falls out of the index.',
    },
    features: {
      lt: [
        'Pilnas esamų adresų ir turinio auditas',
        '301 nukreipimų žemėlapis',
        'Turinio ir nuotraukų perkėlimas',
        'Serverio ir domeno konfigūravimas',
        'Stebėjimas Search Console po paleidimo',
        'Nulinė prastova perjungimo metu',
      ],
      en: [
        'Full audit of existing URLs and content',
        '301 redirect map',
        'Content and media migration',
        'Hosting and domain configuration',
        'Post-launch Search Console monitoring',
        'Zero downtime at switchover',
      ],
    },
    idealFor: {
      lt: 'Tiems, kurie nori išeiti iš uždaros platformos ar pasenusios svetainės.',
      en: 'Anyone escaping a closed platform or an outdated website.',
    },
  },
  {
    slug: 'integracijos',
    icon: 'plug',
    priceFrom: 800,
    order: 10,
    name: {
      lt: 'Integracijos ir API',
      en: 'Integrations and APIs',
    },
    excerpt: {
      lt: 'Svetainė, kuri kalbasi su jūsų CRM, apskaita ir rezervacijų sistema. Mažiau rankinio darbo.',
      en: 'A website that talks to your CRM, accounting and booking system. Less manual work.',
    },
    body: {
      lt: 'Jei duomenis iš svetainės kas dieną perrašinėjate ranka į kitą sistemą — tai automatizuojama. Jungiu WordPress su CRM (HubSpot, Pipedrive), apskaitos programomis, rezervacijų ir sandėlio sistemomis per oficialias API arba individualius sprendimus. Kiekviena integracija dokumentuojama, kad ateityje ją suprastų ir kitas kūrėjas.',
      en: 'If you retype data from the website into another system every day, that can be automated. I connect WordPress to CRMs (HubSpot, Pipedrive), accounting software, booking and inventory systems through official APIs or custom endpoints. Every integration is documented so the next developer can pick it up.',
    },
    features: {
      lt: [
        'CRM ir el. pašto rinkodaros integracijos',
        'Apskaitos ir sandėlio sistemos',
        'Rezervacijų ir kalendorių sinchronizavimas',
        'Individualūs REST API sprendimai',
        'Webhook automatizacijos',
        'Pilna techninė dokumentacija',
      ],
      en: [
        'CRM and email marketing integrations',
        'Accounting and inventory systems',
        'Booking and calendar synchronisation',
        'Custom REST API endpoints',
        'Webhook automations',
        'Full technical documentation',
      ],
    },
    idealFor: {
      lt: 'Įmonėms, kurios naudoja kelias sistemas ir gaišta laiką rankiniam duomenų perkėlimui.',
      en: 'Companies juggling several systems and wasting time moving data by hand.',
    },
  },
  {
    slug: 'prieinamumas',
    icon: 'accessibility',
    priceFrom: 700,
    order: 11,
    name: {
      lt: 'Prieinamumas (WCAG)',
      en: 'Accessibility (WCAG)',
    },
    excerpt: {
      lt: 'WCAG 2.2 AA atitiktis. Svetainė, kuria gali naudotis visi — ir kuri atitinka ES reikalavimus.',
      en: 'WCAG 2.2 AA compliance. A site everyone can use — and one that meets EU requirements.',
    },
    body: {
      lt: 'Nuo 2025 m. Europos prieinamumo aktas taikomas daugeliui verslų, o viešojo sektoriaus svetainėms reikalavimai galioja jau seniai. Atlieku auditą su ekrano skaitytuvais ir klaviatūra, ištaisau kontrasto, fokusavimo, formų ir ARIA klaidas bei parengiu viešą prieinamumo aprašą.',
      en: 'The European Accessibility Act applies to many businesses from 2025, and public sector sites have been covered for years. I audit with screen readers and keyboard only, fix contrast, focus, form and ARIA issues, and prepare the public accessibility statement.',
    },
    features: {
      lt: [
        'WCAG 2.2 AA auditas su ekrano skaitytuvais',
        'Klaviatūros navigacijos taisymas',
        'Kontrasto ir tipografijos korekcijos',
        'Formų ir klaidų pranešimų prieinamumas',
        'Prieinamumo aprašo parengimas',
        'Komandos mokymai',
      ],
      en: [
        'WCAG 2.2 AA audit with screen readers',
        'Keyboard navigation fixes',
        'Contrast and typography corrections',
        'Accessible forms and error messaging',
        'Accessibility statement drafting',
        'Team training',
      ],
    },
    idealFor: {
      lt: 'Viešajam sektoriui, bankams, e. parduotuvėms ir visiems, kam svarbi ES atitiktis.',
      en: 'Public sector, finance, e-commerce and anyone who needs EU compliance.',
    },
  },
  {
    slug: 'nextjs-svetainiu-kurimas',
    icon: 'sparkles',
    order: 2,
    name: {
      lt: 'Next.js svetainių kūrimas',
      en: 'Next.js website development',
    },
    excerpt: {
      lt: 'Itin greitos ir saugios svetainės bei web aplikacijos su Next.js ir React — kai WordPress nebeužtenka.',
      en: 'Ultra-fast, secure websites and web apps built with Next.js and React — for when WordPress is not enough.',
    },
    body: {
      lt: 'Next.js renkuosi, kai svetainei reikia didžiausio greičio, sudėtingesnės logikos ar integracijų: rezervacijų, klientų paskyrų, skaičiuoklių ar didelių katalogų. Puslapiai sugeneruojami iš anksto ir pateikiami per CDN, todėl atsidaro akimirksniu ir puikiai vertinami Google. Turinį valdote patogioje turinio valdymo sistemoje (headless CMS) arba net WordPress aplinkoje — be jokio programavimo.',
      en: 'I choose Next.js when a site needs maximum speed, more complex logic or integrations: bookings, customer accounts, calculators or large catalogues. Pages are pre-rendered and served from a CDN, so they open instantly and score highly with Google. You manage content in a friendly headless CMS — or even in WordPress — without touching code.',
    },
    features: {
      lt: [
        'Individualus dizainas ir React komponentai',
        'Statinis generavimas ir CDN — puslapiai atsidaro akimirksniu',
        'Headless CMS arba WordPress turiniui valdyti',
        'Techninis SEO, schema.org ir kelios kalbos',
        'Integracijos su API, CRM ir mokėjimų sistemomis',
        'Saugi architektūra be įskiepių spragų',
      ],
      en: [
        'Custom design and React components',
        'Static generation and CDN — pages open instantly',
        'Headless CMS or WordPress for content editing',
        'Technical SEO, schema.org and multiple languages',
        'Integrations with APIs, CRMs and payment providers',
        'Secure architecture with no plugin vulnerabilities',
      ],
    },
    idealFor: {
      lt: 'Verslams, kuriems svarbus didžiausias greitis, individualios funkcijos ar web aplikacija.',
      en: 'Businesses that need top speed, custom functionality or a web application.',
    },
  },
  {
    slug: 'shopify-parduotuves-kurimas',
    icon: 'tag',
    order: 3,
    name: {
      lt: 'Shopify el. parduotuvių kūrimas',
      en: 'Shopify store development',
    },
    excerpt: {
      lt: 'Shopify parduotuvė su individualia tema, patogiais mokėjimais ir siuntomis. Paprasta valdyti, paruošta augti.',
      en: 'A Shopify store with a custom theme, smooth payments and shipping. Easy to run, ready to grow.',
    },
    body: {
      lt: 'Shopify — puikus pasirinkimas, kai norite parduoti internetu negalvodami apie serverius, atnaujinimus ir saugumą. Kuriu individualias Shopify temas, o ne perdarau šablonus, pritaikau parduotuvę jūsų rinkai — mokėjimams, siuntoms ir mokesčiams — ir parenku programėles taip, kad jos nelėtintų puslapių. Esamą parduotuvę galiu perkelti iš WooCommerce ar kitos platformos neprarandant pozicijų Google.',
      en: 'Shopify is a great choice when you want to sell online without worrying about servers, updates or security. I build custom Shopify themes rather than tweaking templates, set the store up for your market — payments, shipping and taxes — and choose apps that do not slow your pages down. I can also move an existing store from WooCommerce or another platform without losing your Google rankings.',
    },
    features: {
      lt: [
        'Individuali Shopify tema (Online Store 2.0)',
        'Mokėjimų ir siuntų integracijos',
        'Prekių, kolekcijų ir filtrų struktūra',
        'Programėlių parinkimas ir konfigūravimas',
        'SEO: struktūra, meta duomenys, schema.org',
        'Perkėlimas iš WooCommerce ar kitos platformos',
      ],
      en: [
        'Custom Shopify theme (Online Store 2.0)',
        'Payment and shipping integrations',
        'Product, collection and filter structure',
        'App selection and configuration',
        'SEO: structure, metadata, schema.org',
        'Migration from WooCommerce or another platform',
      ],
    },
    idealFor: {
      lt: 'Prekybininkams, kurie nori patikimos parduotuvės be rūpesčių dėl serverių ir atnaujinimų.',
      en: 'Retailers who want a reliable store without worrying about servers and updates.',
    },
  },
  {
    slug: 'google-verslo-profilis',
    icon: 'pin',
    order: 7,
    name: {
      lt: 'Google verslo profilio optimizavimas',
      en: 'Google Business Profile optimisation',
    },
    excerpt: {
      lt: 'Būkite matomi Google Maps ir vietinėje paieškoje. Profilio sukūrimas, optimizavimas ir atsiliepimų strategija.',
      en: 'Get found on Google Maps and in local search. Profile setup, optimisation and a review strategy.',
    },
    body: {
      lt: 'Kai klientas ieško „paslauga + miestas“, pirmiausia mato Google žemėlapį su trimis įmonėmis. Sukuriu arba sutvarkau jūsų Google verslo profilį (anksčiau — Google Mano verslas): tinkamos kategorijos, paslaugos, darbo laikas, nuotraukos ir aprašymai su raktažodžiais. Suderinu profilį su svetaine ir parengiu paprastą atsiliepimų rinkimo sistemą, kad jis augtų ir be manęs.',
      en: 'When customers search for “service + city”, the first thing they see is a Google map with three businesses. I create or fix your Google Business Profile: the right categories, services, opening hours, photos and keyword-rich descriptions. I align the profile with your website and set up a simple review routine so it keeps growing without me.',
    },
    features: {
      lt: [
        'Profilio sukūrimas arba perėmimas ir patvirtinimas',
        'Kategorijų, paslaugų ir aprašymų optimizavimas',
        'Nuotraukos ir reguliarūs įrašai',
        'Atsiliepimų rinkimo ir atsakymų strategija',
        'Įmonės duomenų suderinimas su svetaine ir katalogais',
        'Skambučių, maršrutų ir paspaudimų ataskaitos',
      ],
      en: [
        'Profile creation or takeover and verification',
        'Category, service and description optimisation',
        'Photos and regular posts',
        'Review collection and response strategy',
        'Business details aligned with your site and directories',
        'Reports on calls, directions and clicks',
      ],
    },
    idealFor: {
      lt: 'Vietiniams verslams: paslaugų teikėjams, salonams, klinikoms, kavinėms ir parduotuvėms.',
      en: 'Local businesses: tradespeople, salons, clinics, cafés and shops.',
    },
  },
  // Every list (home, /paslaugos, menu, footer, sitemap) follows `order`.
].sort((a, b) => a.order - b.order);

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

export function serviceName(service, locale) {
  return service.name[locale] ?? service.name.lt;
}
