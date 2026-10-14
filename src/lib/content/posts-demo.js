import { blogSpeed, blogPricing, blogSecurity, blogSeo, blogWordpressVsWix } from './images';

/**
 * ---------------------------------------------------------------------------
 * DEMO POSTS — for testing the blog listing ("load more", filters).
 * ---------------------------------------------------------------------------
 * >>> BEFORE LAUNCH: set INCLUDE_DEMO_POSTS to false in posts.js (or delete
 * >>> this file and its import). They are real pages while enabled — they
 * >>> show up in the sitemap and search results.
 * ---------------------------------------------------------------------------
 */

const p = (lt, en) => ({ type: 'p', text: { lt, en } });
const h2 = (lt, en) => ({ type: 'h2', text: { lt, en } });

export const demoPosts = [
  {
    slug: 'svetaines-perkelimas-be-srauto-praradimo',
    date: '2025-06-24',
    category: 'seo',
    image: blogSeo,
    readingTime: 6,
    title: {
      lt: 'Kaip perkelti svetainę ir neprarasti Google srauto',
      en: 'How to migrate a website without losing Google traffic',
    },
    excerpt: {
      lt: 'Peradresavimų žemėlapis, Search Console ir trys dažniausios klaidos, dėl kurių dingsta lankytojai.',
      en: 'A redirect map, Search Console and the three most common mistakes that make visitors disappear.',
    },
    body: [
      p('Migracija yra vienas rizikingiausių momentų svetainės gyvenime.', 'A migration is one of the riskiest moments in a website’s life.'),
      h2('Pradėkite nuo peradresavimų žemėlapio', 'Start with a redirect map'),
      p('Kiekvienas senas adresas turi turėti naują atitikmenį.', 'Every old URL needs a new counterpart.'),
    ],
  },
  {
    slug: 'woocommerce-greitis',
    date: '2025-05-27',
    category: 'greitis',
    image: blogSpeed,
    readingTime: 7,
    title: {
      lt: 'Kodėl WooCommerce parduotuvė lėta ir ką su tuo daryti',
      en: 'Why your WooCommerce store is slow — and what to do about it',
    },
    excerpt: {
      lt: 'Krepšelio fragmentai, per daug įskiepių ir prastas talpinimas: kas iš tikrųjų stabdo parduotuvę.',
      en: 'Cart fragments, too many plugins and cheap hosting: what actually slows a store down.',
    },
    body: [
      p('Lėta parduotuvė praranda pirkėjus dar prieš jiems pamatant prekę.', 'A slow store loses buyers before they even see the product.'),
      h2('Pirmiausia — matavimai', 'Measure first'),
      p('Be duomenų optimizavimas yra spėliojimas.', 'Without data, optimisation is guesswork.'),
    ],
  },
  {
    slug: 'atsargines-kopijos',
    date: '2025-04-29',
    category: 'saugumas',
    image: blogSecurity,
    readingTime: 5,
    title: {
      lt: 'Atsarginės kopijos: kiek jų reikia ir kur jas laikyti',
      en: 'Backups: how many you need and where to keep them',
    },
    excerpt: {
      lt: 'Taisyklė 3-2-1, atkūrimo testai ir kodėl kopija tame pačiame serveryje nėra kopija.',
      en: 'The 3-2-1 rule, restore tests and why a backup on the same server is not a backup.',
    },
    body: [
      p('Kopija, kurios niekada nebandėte atkurti, yra tik viltis.', 'A backup you have never restored is only a hope.'),
      h2('Taisyklė 3-2-1', 'The 3-2-1 rule'),
      p('Trys kopijos, dvi laikmenos, viena kitoje vietoje.', 'Three copies, two media, one off-site.'),
    ],
  },
  {
    slug: 'google-verslo-profilis',
    date: '2025-03-18',
    category: 'seo',
    image: blogSeo,
    readingTime: 6,
    title: {
      lt: 'Google verslo profilis: 10 minučių, kurios atneša klientų',
      en: 'Google Business Profile: ten minutes that bring in customers',
    },
    excerpt: {
      lt: 'Kaip užpildyti profilį, kad jus rastų žmonės šalia, ir kodėl atsiliepimai svarbesni nei manote.',
      en: 'How to fill in your profile so nearby people find you — and why reviews matter more than you think.',
    },
    body: [
      p('Vietinėje paieškoje profilis dažnai svarbesnis už svetainę.', 'In local search your profile often matters more than your website.'),
      h2('Kategorijos ir paslaugos', 'Categories and services'),
      p('Pagrindinė kategorija turi didžiausią įtaką.', 'The primary category carries the most weight.'),
    ],
  },
  {
    slug: 'svetaines-tekstai',
    date: '2025-02-11',
    category: 'verslui',
    image: blogPricing,
    readingTime: 8,
    title: {
      lt: 'Kaip parašyti svetainės tekstus, kurie parduoda',
      en: 'How to write website copy that sells',
    },
    excerpt: {
      lt: 'Pradėkite nuo kliento problemos, ne nuo įmonės istorijos. Praktinis planas pagrindiniam puslapiui.',
      en: 'Start with the customer’s problem, not your company history. A practical plan for the home page.',
    },
    body: [
      p('Lankytojas per kelias sekundes nusprendžia, ar liks.', 'A visitor decides in seconds whether to stay.'),
      h2('Antraštė atsako į vieną klausimą', 'The headline answers one question'),
      p('Ką jūs darote ir kam tai skirta.', 'What you do and who it is for.'),
    ],
  },
  {
    slug: 'vaizdu-optimizavimas',
    date: '2025-01-14',
    category: 'greitis',
    image: blogSpeed,
    readingTime: 5,
    title: {
      lt: 'Vaizdų optimizavimas: WebP, AVIF ir tinkami dydžiai',
      en: 'Image optimisation: WebP, AVIF and the right sizes',
    },
    excerpt: {
      lt: 'Nuotraukos dažniausiai sudaro didžiąją puslapio svorio dalį. Štai kaip jas sumažinti neprarandant kokybės.',
      en: 'Images are usually most of a page’s weight. Here is how to shrink them without losing quality.',
    },
    body: [
      p('Vienas neoptimizuotas vaizdas gali sulėtinti visą puslapį.', 'One unoptimised image can slow down a whole page.'),
      h2('Formatai', 'Formats'),
      p('AVIF dažniausiai mažiausias, WebP — saugus pasirinkimas.', 'AVIF is usually smallest; WebP is the safe choice.'),
    ],
  },
  {
    slug: 'iskiepiu-auditas',
    date: '2024-12-03',
    category: 'saugumas',
    image: blogSecurity,
    readingTime: 6,
    title: {
      lt: 'Įskiepių auditas: kuriuos išmesti, kuriuos palikti',
      en: 'A plugin audit: what to remove and what to keep',
    },
    excerpt: {
      lt: 'Kiekvienas įskiepis yra kodas, kurį kažkas turi prižiūrėti. Paprastas kontrolinis sąrašas.',
      en: 'Every plugin is code someone has to maintain. A simple checklist.',
    },
    body: [
      p('Daugiau įskiepių — daugiau rizikos ir lėtesnė svetainė.', 'More plugins mean more risk and a slower site.'),
      h2('Trys klausimai kiekvienam įskiepiui', 'Three questions for every plugin'),
      p('Ar jis reikalingas, ar prižiūrimas, ar yra paprastesnė alternatyva?', 'Is it needed, is it maintained, is there a simpler alternative?'),
    ],
  },
  {
    slug: 'dvikalbe-svetaine',
    date: '2024-10-22',
    category: 'verslui',
    image: blogWordpressVsWix,
    readingTime: 7,
    title: {
      lt: 'Dvikalbė svetainė: ką reikia žinoti prieš pradedant',
      en: 'A bilingual website: what to know before you start',
    },
    excerpt: {
      lt: 'Atskiri adresai, hreflang ir vertimų procesas — kaip išvengti brangių pakeitimų vėliau.',
      en: 'Separate URLs, hreflang and the translation workflow — how to avoid costly changes later.',
    },
    body: [
      p('Antra kalba nėra tik išverstas tekstas.', 'A second language is more than translated text.'),
      h2('Adresų struktūra', 'URL structure'),
      p('Kiekviena kalba turi savo adresą.', 'Each language gets its own URL.'),
    ],
  },
  {
    slug: 'svetaines-prieziura-kodel',
    date: '2024-09-10',
    category: 'saugumas',
    image: blogSecurity,
    readingTime: 4,
    title: {
      lt: 'Kodėl svetainei reikia priežiūros, net jei ji „tiesiog veikia“',
      en: 'Why a website needs care even when it “just works”',
    },
    excerpt: {
      lt: 'Atnaujinimai, kopijos ir stebėjimas — nematomas darbas, kuris apsaugo nuo brangių nemalonumų.',
      en: 'Updates, backups and monitoring — the invisible work that saves you from expensive trouble.',
    },
    body: [
      p('Dauguma įsilaužimų išnaudoja seniai ištaisytas spragas.', 'Most hacks exploit holes that were patched long ago.'),
      h2('Kas įeina į priežiūrą', 'What care includes'),
      p('Atnaujinimai, kopijos, stebėjimas ir greitas reagavimas.', 'Updates, backups, monitoring and a fast response.'),
    ],
  },
];
