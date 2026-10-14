import {
  blogSpeed,
  blogPricing,
  blogSecurity,
  blogSeo,
  blogWordpressVsWix,
} from './images';
import { demoPosts } from './posts-demo';

/**
 * ---------------------------------------------------------------------------
 * BLOG POSTS
 * ---------------------------------------------------------------------------
 * Posts are plain objects. `body` is an array of blocks so the renderer can
 * stay simple and safe (no dangerouslySetInnerHTML anywhere).
 *
 * Block types:
 *   { type: 'p',  text: {lt, en} }
 *   { type: 'h2' | 'h3', text: {lt, en} }        → also builds the table of contents
 *   { type: 'ul' | 'ol', items: {lt: [], en: []} }
 *   { type: 'quote', text: {lt, en}, cite: {lt, en} }
 *   { type: 'callout', text: {lt, en} }
 *
 * To move to headless WordPress later, implement the same shape in
 * src/lib/content/source.js — nothing else needs to change.
 * ---------------------------------------------------------------------------
 */

export const postCategories = [
  { id: 'greitis', name: { lt: 'Greitis', en: 'Performance' } },
  { id: 'seo', name: { lt: 'SEO', en: 'SEO' } },
  { id: 'saugumas', name: { lt: 'Saugumas', en: 'Security' } },
  { id: 'verslui', name: { lt: 'Verslui', en: 'Business' } },
];

const realPosts = [
  {
    slug: 'kiek-kainuoja-svetaine-2026',
    date: '2026-01-14',
    updated: '2026-02-03',
    category: 'verslui',
    image: blogPricing,
    readingTime: 9,
    title: {
      lt: 'Kiek kainuoja svetainė Lietuvoje 2026 m.',
      en: 'How much does a website cost in Lithuania in 2026?',
    },
    excerpt: {
      lt: 'Realios kainos nuo 900 € iki 15 000 €, kas lemia skirtumą ir kokių pasiūlymų verta vengti.',
      en: 'Real prices from €900 to €15,000, what drives the difference, and which quotes to walk away from.',
    },
    body: [
      {
        type: 'p',
        text: {
          lt: 'Klausimas „kiek kainuoja svetainė“ yra maždaug toks pat kaip „kiek kainuoja automobilis“. Atsakymas priklauso nuo to, ką reikia nuvažiuoti. Šiame straipsnyje pateikiu realias 2026 m. Lietuvos rinkos kainas ir paaiškinu, kas už jų slypi.',
          en: 'Asking how much a website costs is a bit like asking how much a car costs. The answer depends on where you need to drive. Here are the real 2026 Lithuanian market prices and what actually sits behind them.',
        },
      },
      { type: 'h2', text: { lt: 'Trumpas atsakymas', en: 'The short answer' } },
      {
        type: 'ul',
        items: {
          lt: [
            'Nukreipiamasis puslapis: 700–1 500 €',
            'Vizitinė įmonės svetainė (5–8 psl.): 1 500–3 000 €',
            'Verslo svetainė su tinklaraščiu ir dviem kalbomis: 2 500–6 000 €',
            'El. parduotuvė: 4 500–15 000 €',
            'Mėnesinė priežiūra: 39–350 € / mėn.',
          ],
          en: [
            'Landing page: €700–1,500',
            'Small brochure site (5–8 pages): €1,500–3,000',
            'Business site with blog and two languages: €2,500–6,000',
            'Online store: €4,500–15,000',
            'Monthly care plan: €39–350 / month',
          ],
        },
      },
      { type: 'h2', text: { lt: 'Kas lemia kainą', en: 'What drives the price' } },
      {
        type: 'p',
        text: {
          lt: 'Didžiausią dalį kainos sudaro ne programavimas, o sprendimai. Kiek unikalių puslapių tipų reikia? Ar turinys jau parašytas? Ar reikia integracijų su apskaita? Ar svetainė turi veikti dviem kalbomis? Kiekvienas „taip“ prideda dienas, ne valandas.',
          en: 'Most of the cost is not coding — it is decisions. How many unique page types do you need? Is the copy already written? Do you need accounting integrations? Must it work in two languages? Every "yes" adds days, not hours.',
        },
      },
      {
        type: 'h3',
        text: { lt: 'Turinys yra brangiausia dalis', en: 'Content is the expensive part' },
      },
      {
        type: 'p',
        text: {
          lt: 'Pagal patirtį, projektai vėluoja ne dėl kodo, o dėl tekstų ir nuotraukų. Jei turinį parašysite patys, sutaupysite 500–1 500 €. Jei ne — įtraukite tai į biudžetą iš anksto, o ne po trijų mėnesių.',
          en: 'In practice projects slip because of copy and photography, not code. Writing the content yourself saves €500–1,500. If you cannot, budget for it up front rather than three months into the project.',
        },
      },
      { type: 'h2', text: { lt: 'Kodėl 300 € pasiūlymas yra brangus', en: 'Why a €300 quote is expensive' } },
      {
        type: 'p',
        text: {
          lt: 'Už tokią sumą gaunate nupirktą šabloną su dešimt įskiepių. Jis veikia pirmą mėnesį. Po metų įskiepiai nebeatnaujinami, svetainė kraunasi 8 sekundes, o pakeisti vieną sekciją be kūrėjo neįmanoma. Perdaryti tokią svetainę kainuoja brangiau nei sukurti naują.',
          en: 'For that money you get a purchased template with ten plugins. It works for a month. A year later the plugins are abandoned, the site takes eight seconds to load, and changing one section without a developer is impossible. Rebuilding it costs more than starting fresh.',
        },
      },
      {
        type: 'callout',
        text: {
          lt: 'Prieš pasirašydami paklauskite: kas nutiks po dvejų metų? Kas atnaujins? Ar galėsiu redaguoti pats? Kur saugomos atsarginės kopijos?',
          en: 'Before signing, ask: what happens in two years? Who updates it? Can I edit it myself? Where are the backups stored?',
        },
      },
      { type: 'h2', text: { lt: 'Vienkartinė kaina vs. mėnesinis mokestis', en: 'One-off price vs monthly fee' } },
      {
        type: 'p',
        text: {
          lt: 'Svetainė nėra baigtas produktas — tai sistema, kurią reikia prižiūrėti. Vienkartinė kaina padengia sukūrimą. Mėnesinis mokestis padengia tai, kad svetainė veiks ir po dvejų metų: atnaujinimus, saugumą, kopijas ir smulkius pakeitimus. Abu skaičiai turi būti biudžete.',
          en: 'A website is not a finished product — it is a system that needs looking after. The one-off price covers the build. The monthly fee covers it still working in two years: updates, security, backups and small changes. Both numbers belong in the budget.',
        },
      },
    ],
  },
  {
    slug: 'core-web-vitals-praktikoje',
    date: '2025-11-26',
    category: 'greitis',
    image: blogSpeed,
    readingTime: 7,
    title: {
      lt: 'Core Web Vitals praktikoje: ką iš tikrųjų verta taisyti',
      en: 'Core Web Vitals in practice: what is actually worth fixing',
    },
    excerpt: {
      lt: 'Trys metrikos, keturios tipinės problemos ir ko nedaryti, net jei PageSpeed rodo raudoną.',
      en: 'Three metrics, four typical problems, and what not to do even when PageSpeed shows red.',
    },
    body: [
      {
        type: 'p',
        text: {
          lt: 'Core Web Vitals yra trys skaičiai, kuriuos Google naudoja vertindama, ar svetainė patogi žmonėms. Svarbu suprasti: reikšmę turi realių lankytojų duomenys, o ne PageSpeed testo rezultatas jūsų kompiuteryje.',
          en: 'Core Web Vitals are three numbers Google uses to judge whether a site feels good to use. The key point: what counts is field data from real visitors, not the PageSpeed score on your own machine.',
        },
      },
      { type: 'h2', text: { lt: 'LCP — kada pasirodo pagrindinis turinys', en: 'LCP — when the main content appears' } },
      {
        type: 'p',
        text: {
          lt: 'Tikslas — po 2,5 sekundės. Devyniais atvejais iš dešimties kaltininkas yra pirmoji nuotrauka: per didelė, neteisingo formato arba krauta tinguoju būdu, nors ji matoma iškart. Sprendimas: AVIF formatas, teisingi dydžiai ir priority žyma pirmam vaizdui.',
          en: 'Target: under 2.5 seconds. Nine times out of ten the culprit is the first image: too large, wrong format, or lazy-loaded despite being immediately visible. The fix: AVIF, correct sizes, and a priority hint on that one image.',
        },
      },
      { type: 'h2', text: { lt: 'INP — kaip greitai reaguoja mygtukai', en: 'INP — how fast the page responds' } },
      {
        type: 'p',
        text: {
          lt: 'Pakeitė FID 2024 m. Blogas INP beveik visada reiškia per daug JavaScript. Tipinis WordPress su dvidešimt įskiepių paleidžia 1,5 MB skriptų, iš kurių realiai naudojama gal dešimtadalis.',
          en: 'It replaced FID in 2024. A poor INP almost always means too much JavaScript. A typical WordPress site with twenty plugins ships 1.5MB of scripts, of which maybe a tenth is ever used.',
        },
      },
      { type: 'h2', text: { lt: 'CLS — ar turinys šokinėja', en: 'CLS — does the layout jump' } },
      {
        type: 'p',
        text: {
          lt: 'Lengviausia ištaisyti ir dažniausiai ignoruojama. Kiekvienam paveikslėliui nurodykite plotį ir aukštį, rezervuokite vietą reklamoms ir šriftus kraukite su font-display: swap bei atsarginiu šriftu, kurio matmenys panašūs.',
          en: 'The easiest to fix and the most often ignored. Give every image a width and height, reserve space for ads, and load fonts with font-display: swap plus a fallback of similar metrics.',
        },
      },
      {
        type: 'callout',
        text: {
          lt: 'Nesivaikykite 100/100. Žalia zona visose trijose metrikose realiems vartotojams yra vertingesnė nei tobulas balas laboratorijoje.',
          en: 'Do not chase 100/100. Green across all three metrics for real users is worth more than a perfect lab score.',
        },
      },
    ],
  },
  {
    slug: 'wordpress-saugumas-pagrindai',
    date: '2025-10-08',
    category: 'saugumas',
    image: blogSecurity,
    readingTime: 6,
    title: {
      lt: 'WordPress saugumas: septyni dalykai, kuriuos padaryti šiandien',
      en: 'WordPress security: seven things to do today',
    },
    excerpt: {
      lt: 'Be įskiepių zoologijos sodo — tik tai, kas realiai sumažina riziką būti nulaužtam.',
      en: 'No plugin zoo — just the measures that genuinely reduce your risk of being hacked.',
    },
    body: [
      {
        type: 'p',
        text: {
          lt: 'Dauguma WordPress svetainių nulaužiamos ne dėl sudėtingos atakos, o dėl neatnaujinto įskiepio arba silpno slaptažodžio. Štai septyni veiksmai pagal naudos ir pastangų santykį.',
          en: 'Most WordPress sites are not hacked by sophisticated attacks but by an outdated plugin or a weak password. Here are seven actions ranked by benefit against effort.',
        },
      },
      {
        type: 'ol',
        items: {
          lt: [
            'Įjunkite dviejų veiksnių autentifikaciją visiems administratoriams.',
            'Ištrinkite, o ne tik išjunkite, nenaudojamus įskiepius ir temas.',
            'Atnaujinkite kas savaitę — bet pirma testinėje aplinkoje.',
            'Atsarginės kopijos turi būti saugomos ne tame pačiame serveryje.',
            'Apribokite prisijungimo bandymus ir paslėpkite /wp-admin nuo botų.',
            'Naudokite PHP 8.3 ar naujesnę versiją.',
            'Peržiūrėkite naudotojų sąrašą — buvę darbuotojai neturi turėti prieigos.',
          ],
          en: [
            'Turn on two-factor authentication for every administrator.',
            'Delete unused plugins and themes rather than just deactivating them.',
            'Update weekly — but on staging first.',
            'Keep backups on a different server from the site.',
            'Rate-limit login attempts and hide /wp-admin from bots.',
            'Run PHP 8.3 or newer.',
            'Review the user list — former staff should not still have access.',
          ],
        },
      },
      { type: 'h2', text: { lt: 'Ko nedaryti', en: 'What not to do' } },
      {
        type: 'p',
        text: {
          lt: 'Neįdiekite trijų saugumo įskiepių vienu metu. Jie konfliktuoja tarpusavyje, lėtina svetainę ir sukuria klaidingą saugumo jausmą. Vienas gerai sukonfigūruotas įskiepis plius atnaujinimų disciplina padengia daugiau nei 95 % realių atakų.',
          en: 'Do not install three security plugins at once. They conflict, slow the site down and create a false sense of safety. One well-configured plugin plus update discipline covers over 95% of real attacks.',
        },
      },
    ],
  },
  {
    slug: 'vietinis-seo-lietuvoje',
    date: '2025-09-02',
    category: 'seo',
    image: blogSeo,
    readingTime: 8,
    title: {
      lt: 'Vietinis SEO Lietuvoje: kaip atsirasti žemėlapyje',
      en: 'Local SEO in Lithuania: how to show up on the map',
    },
    excerpt: {
      lt: 'Google Business Profile, NAP nuoseklumas ir miestų puslapiai, kurie iš tikrųjų veikia.',
      en: 'Google Business Profile, NAP consistency and city pages that actually work.',
    },
    body: [
      {
        type: 'p',
        text: {
          lt: 'Jei jūsų klientai ieško „santechnikas Vilniuje“ arba „stogdengiai Kaune“, svarbiausias jūsų SEO įrankis yra ne svetainė, o Google Business Profile. Bet svetainė nusprendžia, ar iš to vizito bus užklausa.',
          en: 'If your customers search for "plumber in Vilnius" or "roofers in Kaunas", your most important SEO asset is not the website — it is your Google Business Profile. But the website decides whether that visit becomes an enquiry.',
        },
      },
      { type: 'h2', text: { lt: 'NAP nuoseklumas', en: 'NAP consistency' } },
      {
        type: 'p',
        text: {
          lt: 'Pavadinimas, adresas ir telefonas turi būti vienodi visur: svetainėje, Google profilyje, Facebook puslapyje, kataloguose. Net skirtingai užrašytas „g.“ ir „gatvė“ gali sumažinti pasitikėjimą algoritmo akimis.',
          en: 'Name, address and phone must be identical everywhere: your site, Google profile, Facebook page, directories. Even writing "St." in one place and "Street" in another chips away at algorithmic trust.',
        },
      },
      { type: 'h2', text: { lt: 'Miestų puslapiai — su turiniu, ne be jo', en: 'City pages — with content, not without' } },
      {
        type: 'p',
        text: {
          lt: 'Dvidešimt puslapių, kuriuose pakeistas tik miesto pavadinimas, yra spamas ir Google tai puikiai atpažįsta. Veikiantis miesto puslapis turi realius vietinius darbus, atsiliepimus iš to miesto klientų ir atsakymus į vietinius klausimus.',
          en: 'Twenty pages where only the city name changes is spam, and Google recognises it instantly. A city page that works contains real local projects, reviews from customers in that city, and answers to genuinely local questions.',
        },
      },
      {
        type: 'quote',
        text: {
          lt: 'Geriausias vietinis SEO signalas yra realus verslas, kurį realūs žmonės rekomenduoja.',
          en: 'The strongest local SEO signal is a real business that real people recommend.',
        },
        cite: { lt: 'Praktinė taisyklė', en: 'Rule of thumb' },
      },
    ],
  },
  {
    slug: 'wordpress-ar-wix',
    date: '2025-07-19',
    category: 'verslui',
    image: blogWordpressVsWix,
    readingTime: 7,
    title: {
      lt: 'WordPress ar Wix? Sąžiningas palyginimas verslui',
      en: 'WordPress or Wix? An honest comparison for business',
    },
    excerpt: {
      lt: 'Kada uždara platforma yra teisingas sprendimas, o kada ji jus įkalina.',
      en: 'When a closed platform is the right call, and when it traps you.',
    },
    body: [
      {
        type: 'p',
        text: {
          lt: 'Nesu ideologas. Kai kuriems verslams Wix arba Squarespace yra visiškai teisingas pasirinkimas. Problema prasideda tada, kai verslas iš to sprendimo išauga.',
          en: 'I am not an ideologue. For some businesses Wix or Squarespace is entirely the right choice. The problem starts when a business outgrows that decision.',
        },
      },
      { type: 'h2', text: { lt: 'Kada uždara platforma tinka', en: 'When a closed platform fits' } },
      {
        type: 'ul',
        items: {
          lt: [
            'Vienas puslapis ir minimalus turinys',
            'Biudžetas iki 500 € ir nėra kūrėjo',
            'Svetainė nėra pagrindinis klientų šaltinis',
            'Nereikia integracijų su kitomis sistemomis',
          ],
          en: [
            'A single page with minimal content',
            'A budget under €500 and no developer',
            'The website is not your main source of customers',
            'No integrations with other systems needed',
          ],
        },
      },
      { type: 'h2', text: { lt: 'Kada tai tampa problema', en: 'When it becomes a problem' } },
      {
        type: 'p',
        text: {
          lt: 'Uždarose platformose negalite kontroliuoti techninio SEO, greičio optimizavimo ribos nustatytos už jus, o duomenų eksportas dažnai reiškia tik tekstą be struktūros. Migracija vėliau kainuoja 600–1 500 € — tiek, kiek būtumėte sutaupę pradžioje.',
          en: 'On closed platforms you cannot control technical SEO, the ceiling for speed optimisation is set for you, and data export often means plain text with no structure. Migrating later costs €600–1,500 — roughly what you saved at the start.',
        },
      },
      {
        type: 'callout',
        text: {
          lt: 'Paprastas testas: ar po trejų metų galėsite pasiimti visą svetainę ir perkelti kitur? Jei atsakymas „ne“ — jūs nuomojatės, o ne turite.',
          en: 'A simple test: in three years, could you take the entire site and move it elsewhere? If the answer is no, you are renting, not owning.',
        },
      },
    ],
  },
];

/** TODO before launch: set to false — see posts-demo.js. */
const INCLUDE_DEMO_POSTS = true;

export const posts = INCLUDE_DEMO_POSTS ? [...realPosts, ...demoPosts] : realPosts;

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return sortedPosts();
  return sortedPosts().filter((p) => p.category === categoryId);
}

export function sortedPosts() {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPost(slug);
  if (!current) return [];
  const sameCategory = sortedPosts().filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = sortedPosts().filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
