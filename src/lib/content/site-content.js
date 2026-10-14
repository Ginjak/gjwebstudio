import { cityVilnius, cityKaunas, cityKlaipeda } from './images';

/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — FAQ, testimonials, process, values, stats, cities
 * ---------------------------------------------------------------------------
 * Everything here is plain data. Add, remove or reorder freely.
 * `faq` entries tagged with a `group` are also emitted as FAQPage schema on
 * the matching page (see lib/schema/builders.js → faqPage()).
 * ---------------------------------------------------------------------------
 */

export const faqGroups = [
  { id: 'general', name: { lt: 'Bendri klausimai', en: 'General' } },
  { id: 'pricing', name: { lt: 'Kainos ir sutartys', en: 'Pricing & contracts' } },
  { id: 'process', name: { lt: 'Darbo procesas', en: 'Process' } },
  { id: 'technical', name: { lt: 'Techniniai klausimai', en: 'Technical' } },
];

export const faq = [
  {
    group: 'general',
    question: { lt: 'Kodėl WordPress, o ne kita sistema?', en: 'Why WordPress and not something else?' },
    answer: {
      lt: 'WordPress valdo maždaug keturiasdešimt procentų visų pasaulio svetainių, todėl jam yra didžiulė bendruomenė, dokumentacija ir specialistų rinka. Jums tai reiškia vieną svarbų dalyką: net jei nustosime dirbti kartu, svetainę galės perimti bet kuris kitas kūrėjas. Uždarose platformose to nėra.',
      en: 'WordPress runs around forty percent of all websites, which means a huge community, documentation and talent pool. For you that matters in one specific way: even if we stop working together, any other developer can take the site over. Closed platforms do not offer that.',
    },
  },
  {
    group: 'general',
    question: { lt: 'Dirbate visoje Lietuvoje?', en: 'Do you work across all of Lithuania?' },
    answer: {
      lt: 'Taip. Dauguma projektų vyksta nuotoliu — vaizdo skambučiai, bendra užduočių lenta ir testinė aplinka, kurioje matote progresą realiu laiku. Vilniuje, Kaune ir Klaipėdoje galiu susitikti ir gyvai, jei to reikia projekto pradžioje.',
      en: 'Yes. Most projects run remotely — video calls, a shared task board and a staging site where you watch progress in real time. In Vilnius, Kaunas and Klaipėda I can also meet in person if that helps at the start of a project.',
    },
  },
  {
    group: 'general',
    question: { lt: 'Ar galiu pats redaguoti turinį?', en: 'Can I edit the content myself?' },
    answer: {
      lt: 'Taip, ir tai yra vienas pagrindinių tikslų. Kiekviena svetainė kuriama su blokų sistema, kurioje galite keisti tekstus, nuotraukas, pridėti puslapius ir sekcijas nesugadindami dizaino. Po paleidimo gaunate mokymus ir rašytinę instrukciją.',
      en: 'Yes, and that is one of the main goals. Every site is built with a block system where you can change text, images, add pages and whole sections without breaking the design. After launch you get training and a written guide.',
    },
  },
  {
    group: 'pricing',
    question: { lt: 'Ar priežiūros planą galima nutraukti?', en: 'Can I cancel a care plan?' },
    answer: {
      lt: 'Taip, bet kada, įspėjus prieš 30 dienų. Jokių baudų ir jokių metinių įsipareigojimų — nebent pasirinkote metinį mokėjimą su nuolaida. Nutraukus planą svetainė lieka jūsų, taip pat ir visos prieigos bei atsarginės kopijos.',
      en: 'Yes, any time, with 30 days notice. No penalties and no annual lock-in — unless you chose the discounted annual payment. If you cancel, the website remains yours, along with every access credential and backup.',
    },
  },
  {
    group: 'pricing',
    question: { lt: 'Kodėl kainos nurodytos „nuo“?', en: 'Why are prices shown as "from"?' },
    answer: {
      lt: 'Nes penkių puslapių svetainė ir penkiasdešimties puslapių svetainė su integracijomis yra skirtingi projektai. Nurodytos kainos yra realios apatinės ribos, o ne vilionės. Po pirmo pokalbio pateikiu fiksuotą kainą, kuri nesikeičia, jei nesikeičia apimtis.',
      en: 'Because a five-page site and a fifty-page site with integrations are different projects. The prices shown are genuine floors, not bait. After the first call you get a fixed price that does not change unless the scope changes.',
    },
  },
  {
    group: 'pricing',
    question: { lt: 'Ar reikia mokėti avansą?', en: 'Do you require a deposit?' },
    answer: {
      lt: 'Taip — 40 % projekto pradžioje, 30 % patvirtinus dizainą ir 30 % prieš paleidimą. Priežiūros planai apmokami kas mėnesį arba kas metus iš anksto.',
      en: 'Yes — 40% to start, 30% on design approval and 30% before launch. Care plans are billed monthly, or annually in advance.',
    },
  },
  {
    group: 'process',
    question: { lt: 'Kiek laiko trunka sukurti svetainę?', en: 'How long does a website take?' },
    answer: {
      lt: 'Nukreipiamasis puslapis — 1–2 savaitės. Verslo svetainė — 4–6 savaitės. El. parduotuvė — 6–10 savaičių. Realiai terminą dažniausiai lemia ne programavimas, o tai, kaip greitai gaunu tekstus ir nuotraukas.',
      en: 'A landing page takes 1–2 weeks, a business site 4–6 weeks, an online store 6–10 weeks. In practice the timeline is usually set not by development but by how quickly I receive copy and photography.',
    },
  },
  {
    group: 'process',
    question: { lt: 'Ką reikia paruošti iš anksto?', en: 'What do I need to prepare?' },
    answer: {
      lt: 'Naudingiausia turėti: aiškų tikslą (ko norite iš svetainės), logotipą vektoriniu formatu, tekstus arba bent jų metmenis, nuotraukas ir sąrašą konkurentų svetainių, kurios jums patinka arba nepatinka. Jei kažko trūksta — padedu paruošti.',
      en: 'The most useful things are: a clear goal, a vector logo, copy or at least an outline of it, photography, and a list of competitor sites you like or dislike. If something is missing, I can help produce it.',
    },
  },
  {
    group: 'process',
    question: { lt: 'Kaip vyksta komunikacija?', en: 'How does communication work?' },
    answer: {
      lt: 'Bendraujate tiesiogiai su manimi, be tarpininkų. Kas savaitę gaunate trumpą progreso santrauką, o testinėje aplinkoje bet kada galite pamatyti dabartinę būklę. Skubiems klausimams — telefonas arba žinutė.',
      en: 'You talk to me directly, with no middlemen. Each week you get a short progress summary, and you can check the staging site at any time. For anything urgent, phone or message me.',
    },
  },
  {
    group: 'technical',
    question: { lt: 'Kas nutinka, jei svetainė nulaužiama?', en: 'What happens if the site is hacked?' },
    answer: {
      lt: 'Priežiūros klientams tai sprendžiama be papildomo mokesčio: atstatau svetainę iš švarios atsarginės kopijos, randu ir uždarau pažeidžiamumą, po to pateikiu ataskaitą, kas įvyko. Kasdienės kopijos saugomos atskirai nuo serverio, todėl atstatymas realiai trunka valandas, o ne dienas.',
      en: 'For care-plan clients this is handled at no extra cost: I restore from a clean backup, find and close the vulnerability, then send you a report on what happened. Daily backups live off-server, so recovery genuinely takes hours rather than days.',
    },
  },
  {
    group: 'technical',
    question: { lt: 'Ar svetainė bus pritaikyta neįgaliesiems?', en: 'Will the site be accessible?' },
    answer: {
      lt: 'Kiekviena mano kuriama svetainė atitinka bent WCAG 2.1 AA lygį: klaviatūros navigacija, pakankamas kontrastas, semantinė struktūra, alternatyvūs tekstai. Pilna WCAG 2.2 AA atitiktis su auditu ir viešu aprašu yra atskira paslauga.',
      en: 'Every site I build meets at least WCAG 2.1 AA: keyboard navigation, sufficient contrast, semantic structure, alt text. Full WCAG 2.2 AA compliance with an audit and a public statement is a separate service.',
    },
  },
  {
    group: 'technical',
    question: { lt: 'Kur talpinama svetainė?', en: 'Where is the site hosted?' },
    answer: {
      lt: 'Rekomenduoju ES serverius su NVMe diskais ir PHP 8.3 — tai atitinka BDAR ir duoda geriausią greitį Lietuvos lankytojams. Galiu talpinimą įtraukti į priežiūros planą arba dirbti su jūsų esamu tiekėju.',
      en: 'I recommend EU hosting with NVMe storage and PHP 8.3 — that satisfies GDPR and gives the best speed for Lithuanian visitors. Hosting can be part of your care plan, or I can work with your existing provider.',
    },
  },
];

export function getFaqByGroup(groupId) {
  return faq.filter((f) => f.group === groupId);
}

/** ------------------------------------------------------------------------ */

export const testimonials = [
  {
    id: 't1',
    rating: 5,
    date: '2025-11-10',
    author: { lt: 'Vadovas, baldų prekyba', en: 'Managing director, furniture retail' },
    quote: {
      lt: 'Pirmą kartą per dešimt metų svetainė nebėra galvos skausmas. Užsakymai patys atsiranda apskaitoje, o klientai nebeskambina klausti, ar prekė sandėlyje.',
      en: 'For the first time in ten years the website is not a headache. Orders appear in accounting by themselves and customers no longer ring to ask if something is in stock.',
    },
  },
  {
    id: 't2',
    rating: 5,
    date: '2025-08-22',
    author: { lt: 'Rinkodaros vadovė, gamyba', en: 'Head of marketing, manufacturing' },
    quote: {
      lt: 'Gavome tai, ko prašėme, per sutartą laiką ir už sutartą kainą. Skamba banaliai, bet po dviejų nesėkmingų bandymų su agentūromis tai buvo didžiausias palengvėjimas.',
      en: 'We got what we asked for, on time and at the agreed price. It sounds mundane, but after two failed attempts with agencies it was an enormous relief.',
    },
  },
  {
    id: 't3',
    rating: 5,
    date: '2025-05-14',
    author: { lt: 'Savininkas, restoranų tinklas', en: 'Owner, restaurant group' },
    quote: {
      lt: 'Rezervacijų sistema atsipirko per keturis mėnesius vien sutaupytais komisiniais. O svarbiausia — dabar klientų duomenys priklauso mums.',
      en: 'The booking system paid for itself in four months on saved commission alone. More importantly, the customer data is now ours.',
    },
  },
  {
    id: 't4',
    rating: 5,
    date: '2025-02-03',
    author: { lt: 'Projektų vadovė, NVO', en: 'Programme manager, NGO' },
    quote: {
      lt: 'Bijojome migracijos, nes girdėjome istorijų apie dingusį srautą. Po perkėlimo lankytojų tik padaugėjo, o dabar turinį publikuojame patys.',
      en: 'We were afraid of the migration — we had heard the horror stories about lost traffic. Visits actually went up, and now we publish content ourselves.',
    },
  },
  {
    id: 't5',
    rating: 5,
    date: '2024-12-08',
    author: { lt: 'Fotografas', en: 'Photographer' },
    quote: {
      lt: 'Nuotraukos atrodo taip, kaip turi atrodyti, ir svetainė vis tiek kraunasi akimirksniu. Nemaniau, kad tai įmanoma suderinti.',
      en: 'The photographs look the way they should and the site still loads instantly. I did not think those two things could go together.',
    },
  },
];

export const aggregateRating = {
  ratingValue: 5,
  reviewCount: testimonials.length,
  bestRating: 5,
};

/** ------------------------------------------------------------------------ */

export const processSteps = [
  {
    step: 1,
    name: { lt: 'Pokalbis ir tikslai', en: 'Discovery call' },
    description: {
      lt: 'Nemokamas 30 min. pokalbis: ką norite pasiekti, kas veikia dabar ir kas ne. Išeinu su aiškiu supratimu, jūs — su pirmais patarimais.',
      en: 'A free 30-minute call: what you want to achieve, what works today and what does not. I leave with a clear picture, you leave with first recommendations.',
    },
    duration: { lt: '30 min.', en: '30 min' },
  },
  {
    step: 2,
    name: { lt: 'Pasiūlymas ir planas', en: 'Proposal and plan' },
    description: {
      lt: 'Per 2 darbo dienas gaunate fiksuotą kainą, apimtį ir terminus. Be paslėptų eilučių ir be „paaiškės vėliau“.',
      en: 'Within two business days you get a fixed price, scope and timeline. No hidden line items and no "we will see later".',
    },
    duration: { lt: '2 d. d.', en: '2 days' },
  },
  {
    step: 3,
    name: { lt: 'Struktūra ir dizainas', en: 'Structure and design' },
    description: {
      lt: 'Pirmiausia turinio struktūra, tada dizainas. Matote maketus ir tvirtinate juos prieš pradedant programuoti.',
      en: 'Content structure first, design second. You review and approve the layouts before a single line of code is written.',
    },
    duration: { lt: '1–2 sav.', en: '1–2 weeks' },
  },
  {
    step: 4,
    name: { lt: 'Programavimas', en: 'Development' },
    description: {
      lt: 'Kuriu individualią temą testinėje aplinkoje, kurioje bet kada matote progresą. Kas savaitę — trumpa santrauka.',
      en: 'I build the bespoke theme on a staging site you can check at any time. A short progress summary lands every week.',
    },
    duration: { lt: '2–6 sav.', en: '2–6 weeks' },
  },
  {
    step: 5,
    name: { lt: 'Paleidimas ir priežiūra', en: 'Launch and care' },
    description: {
      lt: 'Testavimas, greičio patikra, SEO nustatymai ir paleidimas be prastovos. Po to — mokymai ir pasirinktas priežiūros planas.',
      en: 'Testing, a speed pass, SEO setup and a launch with no downtime. Then training and the care plan you have chosen.',
    },
    duration: { lt: '1 sav.', en: '1 week' },
  },
];

/** ------------------------------------------------------------------------ */

export const values = [
  {
    id: 'clarity',
    icon: 'eye',
    name: { lt: 'Skaidrumas', en: 'Transparency' },
    description: {
      lt: 'Fiksuota kaina, aiškūs terminai ir prieiga prie visko, kas sukurta. Jokių paslapčių apie tai, kur saugomi jūsų duomenys.',
      en: 'A fixed price, clear deadlines and access to everything that gets built. No mystery about where your data lives.',
    },
  },
  {
    id: 'ownership',
    icon: 'key',
    name: { lt: 'Jūsų nuosavybė', en: 'You own it' },
    description: {
      lt: 'Svetainė, kodas, domenas ir prieigos priklauso jums nuo pirmos dienos. Nutraukus bendradarbiavimą viskas lieka pas jus.',
      en: 'The website, code, domain and credentials are yours from day one. If we part ways, everything stays with you.',
    },
  },
  {
    id: 'speed',
    icon: 'bolt',
    name: { lt: 'Greitis kaip standartas', en: 'Speed as standard' },
    description: {
      lt: 'Greita svetainė nėra papildoma paslauga. Core Web Vitals žalioje zonoje yra minimalus reikalavimas, ne priedas.',
      en: 'A fast site is not an upsell. Green Core Web Vitals is the minimum requirement, not an extra.',
    },
  },
  {
    id: 'longterm',
    icon: 'tree',
    name: { lt: 'Ilgalaikis mąstymas', en: 'Long-term thinking' },
    description: {
      lt: 'Renkuosi sprendimus, kurie veiks po penkerių metų, o ne tuos, kurie greičiausiai pastatomi šiandien.',
      en: 'I choose solutions that will still work in five years over the ones that are quickest to assemble today.',
    },
  },
];

/** ------------------------------------------------------------------------ */

export const stats = [
  { value: '60+', label: { lt: 'Paleistų projektų', en: 'Projects launched' } },
  { value: '9', label: { lt: 'Metai su WordPress', en: 'Years with WordPress' } },
  { value: '99,98 %', label: { lt: 'Vidutinis veikimo laikas', en: 'Average uptime' } },
  { value: '< 1,5 s', label: { lt: 'Vidutinis krovimosi laikas', en: 'Average load time' } },
];

/** ------------------------------------------------------------------------ */

export const cities = [
  {
    slug: 'vilnius',
    image: cityVilnius,
    name: { lt: 'Vilniuje', en: 'Vilnius' },
    nameNom: { lt: 'Vilnius', en: 'Vilnius' },
    nameGen: { lt: 'Vilniaus', en: 'Vilnius' },
    intro: {
      lt: 'Vilniuje veikia daugiausia Lietuvos paslaugų įmonių, todėl konkurencija Google paieškoje čia didžiausia. Kuriu svetaines, kurios išsiskiria ne dizainu, o tuo, kad greičiau atsako į kliento klausimą.',
      en: 'Vilnius has the highest concentration of service businesses in Lithuania, which makes Google competition fiercest here. I build sites that stand out not by design alone but by answering the customer question faster.',
    },
    highlights: {
      lt: [
        'Susitikimai gyvai Vilniaus centre arba nuotoliu',
        'Patirtis su IT, teisės ir sveikatos sektorių svetainėmis',
        'Vietinis SEO ir Google Business Profile optimizavimas',
      ],
      en: [
        'In-person meetings in central Vilnius or remote',
        'Experience with IT, legal and healthcare websites',
        'Local SEO and Google Business Profile optimisation',
      ],
    },
  },
  {
    slug: 'kaunas',
    image: cityKaunas,
    name: { lt: 'Kaune', en: 'Kaunas' },
    nameNom: { lt: 'Kaunas', en: 'Kaunas' },
    nameGen: { lt: 'Kauno', en: 'Kaunas' },
    intro: {
      lt: 'Kaune daug gamybos ir logistikos įmonių, kurioms svetainė yra eksporto įrankis. Dvikalbės svetainės su techniniais katalogais čia duoda didžiausią grąžą.',
      en: 'Kaunas is full of manufacturing and logistics companies for whom the website is an export tool. Bilingual sites with technical catalogues deliver the best return here.',
    },
    highlights: {
      lt: [
        'Dvikalbės (LT/EN) svetainės eksporto rinkoms',
        'Produktų katalogai su techninėmis specifikacijomis',
        'Integracijos su apskaitos ir sandėlio sistemomis',
      ],
      en: [
        'Bilingual (LT/EN) sites for export markets',
        'Product catalogues with technical specifications',
        'Accounting and inventory system integrations',
      ],
    },
  },
  {
    slug: 'klaipeda',
    image: cityKlaipeda,
    name: { lt: 'Klaipėdoje', en: 'Klaipėda' },
    nameNom: { lt: 'Klaipėda', en: 'Klaipėda' },
    nameGen: { lt: 'Klaipėdos', en: 'Klaipėda' },
    intro: {
      lt: 'Klaipėdoje daug turizmo, apgyvendinimo ir jūrinio verslo. Šiems sektoriams svarbiausia yra rezervacijos be tarpininkų ir svetainė, kuri greitai kraunasi telefone.',
      en: 'Klaipėda is dominated by tourism, hospitality and maritime business. For those sectors what matters most is direct booking without middlemen and a site that loads instantly on a phone.',
    },
    highlights: {
      lt: [
        'Rezervacijų sistemos be komisinių',
        'Sezoninio turinio valdymas',
        'Greitis mobiliajame ryšyje kaip prioritetas',
      ],
      en: [
        'Commission-free booking systems',
        'Seasonal content management',
        'Mobile network speed as the priority',
      ],
    },
  },
];

export function getCity(slug) {
  return cities.find((c) => c.slug === slug);
}

/** ------------------------------------------------------------------------ */

/** Logos / tech strip on the homepage — plain wordmarks, no third-party assets. */
export const techStack = [
  'WordPress',
  'Gutenberg',
  'ACF',
  'WooCommerce',
  'Next.js',
  'React',
  'Shopify',
  'Figma',
  'Google Business Profile',
  'Google Analytics',
  'Google Tag Manager',
  'Search Console',
];

/** Budget options used by the contact and audit forms. */
export const budgetOptions = [
  { id: 'under-1500', label: { lt: 'Iki 1 500 €', en: 'Under €1,500' } },
  { id: '1500-3000', label: { lt: '1 500 – 3 000 €', en: '€1,500 – €3,000' } },
  { id: '3000-6000', label: { lt: '3 000 – 6 000 €', en: '€3,000 – €6,000' } },
  { id: 'over-6000', label: { lt: 'Daugiau nei 6 000 €', en: 'Over €6,000' } },
  { id: 'retainer', label: { lt: 'Tik mėnesinė priežiūra', en: 'Care plan only' } },
  { id: 'unknown', label: { lt: 'Dar nežinau', en: 'Not sure yet' } },
];

/** What the free audit covers. */
export const auditChecks = [
  {
    name: { lt: 'Greitis ir Core Web Vitals', en: 'Speed and Core Web Vitals' },
    description: {
      lt: 'Realių vartotojų duomenys, didžiausios problemos ir kiek sekundžių realu sutaupyti.',
      en: 'Field data from real users, the biggest bottlenecks and how many seconds are realistically recoverable.',
    },
  },
  {
    name: { lt: 'Techninis SEO', en: 'Technical SEO' },
    description: {
      lt: 'Indeksavimas, meta duomenys, struktūriniai duomenys, vidinės nuorodos ir dublikatai.',
      en: 'Indexing, metadata, structured data, internal linking and duplicate content.',
    },
  },
  {
    name: { lt: 'Saugumas', en: 'Security' },
    description: {
      lt: 'Pasenusios versijos, žinomi pažeidžiamumai, SSL konfigūracija ir atsarginių kopijų būklė.',
      en: 'Outdated versions, known vulnerabilities, SSL configuration and the state of your backups.',
    },
  },
  {
    name: { lt: 'Prieinamumas', en: 'Accessibility' },
    description: {
      lt: 'Kontrastas, klaviatūros navigacija ir dažniausios WCAG klaidos.',
      en: 'Contrast, keyboard navigation and the most common WCAG failures.',
    },
  },
  {
    name: { lt: 'Konversijos', en: 'Conversion' },
    description: {
      lt: 'Ar lankytojui aišku, ką daryti toliau, ir kur jis dažniausiai pasimeta.',
      en: 'Whether visitors know what to do next, and where they most often get lost.',
    },
  },
];

/** ------------------------------------------------------------------------ */

/**
 * About page — personal intro. Paragraphs in first person.
 * TODO: make it yours — a real detail or two (how you started, what you
 * enjoy outside work) does more than any adjective.
 */
export const aboutStory = {
  lt: [
    'Su WordPress dirbu daugiau nei devynerius metus ir per tą laiką paleidau per šešiasdešimt projektų — nuo vieno puslapio nukreipiamųjų iki el. parduotuvių su apskaitos integracijomis.',
    '2021 m. įkūriau GJ Web Studio, nes norėjau dirbti taip, kaip pats norėčiau, kad su manimi dirbtų: tiesiogiai, už aiškią kainą ir be staigmenų. Visada kalbate su tuo pačiu žmogumi, kuris rašo kodą ir rūpinasi svetaine po paleidimo.',
  ],
  en: [
    'I have worked with WordPress for more than nine years and launched over sixty projects in that time — from single-page landing pages to online stores wired into accounting systems.',
    'I started GJ Web Studio in 2021 to work the way I would want someone to work with me: directly, at a clear price and with no surprises. You always talk to the same person who writes the code and looks after the site after launch.',
  ],
};

/** About page — "why me": one specialist vs. an agency, point by point. */
export const whyMe = [
  {
    id: 'contact',
    icon: 'users',
    topic: { lt: 'Bendravimas', en: 'Communication' },
    me: {
      lt: 'Kalbatės tiesiai su žmogumi, kuris kuria jūsų svetainę.',
      en: 'You talk directly to the person building your site.',
    },
    agency: {
      lt: 'Per projektų vadovą — informacija keliauja per kelias rankas.',
      en: 'Through a project manager — messages pass through several hands.',
    },
  },
  {
    id: 'price',
    icon: 'key',
    topic: { lt: 'Kaina', en: 'Price' },
    me: {
      lt: 'Fiksuota kaina, sutarta prieš pradedant darbus.',
      en: 'A fixed price, agreed before any work starts.',
    },
    agency: {
      lt: 'Valandiniai įkainiai ir papildomi darbai projekto eigoje.',
      en: 'Hourly rates and change requests along the way.',
    },
  },
  {
    id: 'speed',
    icon: 'bolt',
    topic: { lt: 'Sprendimai', en: 'Decisions' },
    me: {
      lt: 'Klausimas išsprendžiamas per dieną, be derinimų grandinės.',
      en: 'Questions are settled within a day, no chain of approvals.',
    },
    agency: {
      lt: 'Susitikimai, derinimai ir užduočių eilės.',
      en: 'Meetings, sign-offs and ticket queues.',
    },
  },
  {
    id: 'after',
    icon: 'shield',
    topic: { lt: 'Po paleidimo', en: 'After launch' },
    me: {
      lt: 'Tas pats žmogus toliau prižiūri ir tobulina svetainę.',
      en: 'The same person keeps looking after and improving the site.',
    },
    agency: {
      lt: 'Projektas perduodamas palaikymo komandai, kuri jo nekūrė.',
      en: 'The project is handed to a support team that did not build it.',
    },
  },
  {
    id: 'cost',
    icon: 'chart',
    topic: { lt: 'Už ką mokate', en: 'What you pay for' },
    me: {
      lt: 'Už darbą — ne už biurą, vadybą ir administravimą.',
      en: 'The work itself — not an office, management and overheads.',
    },
    agency: {
      lt: 'Kainoje slypi vadybos ir administravimo sąnaudos.',
      en: 'Management and admin overheads are built into the price.',
    },
  },
];
