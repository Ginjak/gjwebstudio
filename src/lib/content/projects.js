import {
  caseFushi,
  caseFushiChat,
  caseFushiCollection,
  caseEqCare,
  caseEqCareHome,
  caseEqCareForms,
  caseMgRehab,
  caseMgRehabResults,
  caseMgRehabBooking,
  caseAsembl,
  caseAsemblGrid,
  caseAsemblPost,
  caseProPlaster,
  caseProPlasterMapPack,
  caseProPlasterContact,
  caseAdorn,
  caseAdornServices,
  caseAdornLocation,
  caseDubois,
  caseDuboisContent,
  caseSkala,
  caseSkalaPagespeed,
  caseSkalaCaseStudies,
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
  { id: 'seo', icon: 'search', name: { lt: 'SEO ir vietinė paieška', en: 'SEO & local search' } },
  { id: 'corporate', icon: 'building', name: { lt: 'Įmonių svetainės', en: 'Business websites' } },
  { id: 'ecommerce', icon: 'cart', name: { lt: 'El. parduotuvės', en: 'Online stores' } },
  { id: 'maintenance', icon: 'shield', name: { lt: 'Priežiūra ir turinys', en: 'Care & content' } },
  { id: 'booking', icon: 'calendar', name: { lt: 'Rezervacijos', en: 'Bookings' } },
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
    slug: 'mg-rehab-svetaine-ir-seo',
    featured: true,
    year: 2026,
    categories: ['seo', 'booking'],
    services: ['seo-optimizavimas', 'google-verslo-profilis', 'integracijos'],
    image: caseMgRehab,
    gallery: [caseMgRehabResults, caseMgRehabBooking],
    url: 'https://mgrehab.com/',
    client: { lt: 'MG Rehab', en: 'MG Rehab' },
    title: {
      lt: 'Svetainės kūrimas ir SEO: 226 kartus daugiau parodymų Google per 3 mėnesius',
      en: 'A new website and SEO: 226× more Google impressions in three months',
    },
    excerpt: {
      lt: 'Sporto masažo ir reabilitacijos klinikai Londone nuo nulio sukūriau svetainę su Eleventy (11ty), įdiegiau techninį SEO ir struktūrinius duomenis, optimizavau Google verslo profilį ir integravau Calendly rezervacijas.',
      en: 'A sports massage and rehabilitation clinic in London, built from scratch with Eleventy (11ty): technical SEO, schema.org, Google Business Profile and Calendly bookings.',
    },
    challenge: {
      lt: 'MG Rehab — sporto masažo, traumų reabilitacijos ir akupunktūros klinika Richmonde (Londonas). Senoji svetainė Google paieškoje beveik nesirodė: per balandį–liepą ji buvo parodyta vos 1,46 tūkst. kartų, todėl žmonės, ieškantys sporto masažo ar reabilitacijos netoliese, klinikos tiesiog nerasdavo.',
      en: 'MG Rehab is a sports massage, rehabilitation and acupuncture clinic in Richmond, London. The old site barely appeared in Google: from April to July it collected just 1.46K impressions, so people searching for sports massage or injury rehab nearby simply never found the clinic.',
    },
    solution: {
      lt: 'Svetainę sukūriau nuo nulio su Eleventy (11ty) ir Decap TVS, talpinimas — Netlify. Struktūrą pritaikiau paieškai: kiekviena procedūra, gydoma būklė ir aptarnaujamas rajonas turi atskirą optimizuotą puslapį. Įdiegiau techninį SEO ir išsamius struktūrinius duomenis, optimizavau Google verslo profilį, o Calendly rezervacijos leidžia užsiregistruoti vos keliais paspaudimais.',
      en: 'I did everything from scratch: a fast static site built with Eleventy (11ty) and Decap CMS, hosted on Netlify, and structured for search — every treatment, condition and area served has its own optimised page. I implemented technical SEO and comprehensive structured data, optimised the Google Business Profile and integrated Calendly bookings so clients can book in a few clicks.',
    },
    outcome: {
      lt: 'Per tris mėnesius po paleidimo (rugpjūtį–spalį) svetainė Google paieškos rezultatuose sulaukė 330 tūkst. parodymų — 226 kartus daugiau nei prieš atnaujinimą.',
      en: 'In the three months after launch (August to October) the site was shown 330K times in Google Search — 226 times more than before the rebuild.',
    },
    metrics: [
      { value: '×226', label: { lt: 'Daugiau parodymų Google per 3 mėn.', en: 'More Google impressions in 3 months' } },
      { value: '330K', label: { lt: 'Parodymų per rugpjūtį–spalį (anksčiau 1,46 tūkst.)', en: 'Impressions Aug–Oct (was 1.46K)' } },
      { value: '21', label: { lt: 'Nauji optimizuoti puslapiai', en: 'New SEO landing pages' } },
    ],
    highlights: {
      lt: [
        'Svetainė nuo nulio sukurta su Eleventy (11ty) taip, kad puslapiai krautųsi greitai; talpinimas — Netlify',
        'Decap TVS: klinika pati redaguoja tekstus ir puslapius be programuotojo',
        '21 naujas optimizuotas puslapis: 8 procedūros, 6 būklės ir 7 aptarnaujami rajonai (Richmond, Twickenham, Kew ir kt.)',
        'Vidinių nuorodų struktūra: kiekvieno rajono puslapis veda į visas procedūras ir būkles',
        'Techninis SEO: XML svetainės žemėlapis, robots.txt, kanoniniai adresai, Open Graph žymos ir unikalūs meta aprašymai',
        'Struktūriniai duomenys (schema.org): LocalBusiness, MedicalBusiness, Person, Service, FAQPage, BreadcrumbList',
        'Optimizuoti vaizdai: WebP formatas ir atidėtas įkėlimas (lazy loading)',
        'Google verslo profilio optimizavimas: kategorijos, paslaugos ir susiejimas su svetaine',
        'Calendly rezervacijos: atskiri pirmos konsultacijos ir pakartotinio vizito tipai',
        'Google Analytics 4, Google Tag Manager ir slapukų sutikimo valdymas (BDAR)',
      ],
      en: [
        'Built from scratch with Eleventy (11ty): static pages that load instantly, hosted on Netlify',
        'Decap CMS (/admin) so the clinic edits text and pages without a developer',
        '21 new SEO landing pages: 8 treatments, 6 conditions and 7 local areas (Richmond, Twickenham, Kew and more)',
        'Internal linking structure: every area page links to all treatments and conditions',
        'Technical SEO: XML sitemap, robots.txt, canonical URLs, Open Graph and unique meta descriptions',
        'Structured data (schema.org): LocalBusiness, MedicalBusiness, Person, Service, FAQPage, BreadcrumbList',
        'Optimised images: WebP format and lazy loading',
        'Google Business Profile optimisation: categories, services and alignment with the website',
        'Calendly bookings on the site, with separate initial consultation and follow-up appointment types',
        'Google Analytics 4, Tag Manager and cookie consent management (GDPR)',
      ],
    },
  },
  {
    slug: 'pro-plaster-and-paint-vietinis-seo',
    year: 2026,
    categories: ['seo', 'corporate'],
    services: ['google-verslo-profilis', 'seo-optimizavimas'],
    image: caseProPlaster,
    gallery: [caseProPlasterMapPack, caseProPlasterContact],
    url: 'https://proplasterandpaint.co.uk/',
    client: { lt: 'Pro Plaster and Paint', en: 'Pro Plaster and Paint' },
    title: {
      lt: 'Svetainė ir vietinis SEO dažymo įmonei: 2 vieta Google žemėlapyje',
      en: 'A painter’s website and local SEO: #2 in the Google map pack',
    },
    excerpt: {
      lt: 'Dažymo ir tinkavimo įmonei Londone nuo nulio sukūriau svetainę su Eleventy ir nuolat optimizuoju jos Google verslo profilį. Rezultatas — 2 vieta Google žemėlapyje pagal „painter in Twickenham“ ir 100 atsiliepimų.',
      en: 'A website built from scratch with Eleventy for a London painting and plastering company, plus ongoing Google Business Profile work — #2 in the map pack for “painter in Twickenham” and 100 reviews.',
    },
    challenge: {
      lt: 'Pro Plaster and Paint — dažymo, dekoravimo ir tinkavimo įmonė pietvakarių Londone. Tokiam verslui daugiausia užsakymų atneša ne įprasti paieškos rezultatai, o Google žemėlapio blokas — trys įmonės, kurias žmonės pamato pirmiausia, ieškodami „dažytojas + rajonas“. Konkurencija didelė: vien Twickenhame dirba šimtai dažytojų.',
      en: 'Pro Plaster and Paint is a painting, decorating and plastering company in south-west London. For trades like this most jobs come not from regular search results but from the Google map pack — the three businesses people see first when they search “painter + area”. Competition is fierce: Twickenham alone has hundreds of painters.',
    },
    solution: {
      lt: 'Svetainę sukūriau nuo nulio su Eleventy, talpinimas — Netlify, o kiekvienai paslaugai ir rajonui skyriau atskirą puslapį. Optimizavau Google verslo profilį ir jį nuolat prižiūriu: kas savaitę skelbiu įrašus ir papildau turinį, kad profilis išliktų aktyvus ir kiltų vietinės paieškos rezultatuose.',
      en: 'I built a fast website from scratch with Eleventy, hosted on Netlify, with a dedicated page for every service and area. I optimised the Google Business Profile and keep it active: weekly updates and fresh content so the profile keeps climbing in map results.',
    },
    outcome: {
      lt: 'Pagal „painter in Twickenham“ įmonė Google žemėlapyje rodoma 2 vietoje, o atsiliepimų skaičius pasiekė 100 su 5,0 įvertinimu — daugiau nei dvigubai daugiau nei artimiausių konkurentų.',
      en: 'For “painter in Twickenham” the company now appears at #2 in the Google map pack, and its Google reviews have reached 100 with a 5.0 rating — more than double the nearest competitors.',
    },
    metrics: [
      { value: '#2', label: { lt: 'Vieta Google žemėlapyje („painter in Twickenham“)', en: 'Google map pack: “painter in Twickenham”' } },
      { value: '100', label: { lt: 'Google atsiliepimų (įvertinimas 5,0)', en: 'Google reviews, rated 5.0' } },
      { value: '13', label: { lt: 'Optimizuoti paslaugų ir rajonų puslapiai', en: 'Service and area SEO pages' } },
    ],
    highlights: {
      lt: [
        'Svetainė sukurta nuo nulio su Eleventy (11ty), talpinimas — Netlify: greita ir paprastai prižiūrima',
        'Atskiri optimizuoti puslapiai paslaugoms (gyvenamųjų ir komercinių patalpų dažymas, tinkavimas, biurai, mokyklos, restoranai ir kt.) ir rajonams (Twickenham, Richmond, Teddington, Kingston, Putney)',
        'Google verslo profilio optimizavimas: kategorijos, paslaugos, aprašymai ir nuotraukos',
        'Kassavaitiniai Google verslo profilio įrašai ir nuolat papildomas turinys geresnėms pozicijoms vietinėje paieškoje',
        'Atsiliepimų rinkimo strategija — profilis pasiekė 100 Google atsiliepimų',
        'Užklausos forma su projekto pašto kodu, darbų tipu ir galimybe pridėti planus ar nuotraukas (Netlify Forms)',
        'Struktūriniai duomenys (schema.org): LocalBusiness ir HousePainter',
      ],
      en: [
        'Built from scratch with Eleventy (11ty) and hosted on Netlify — fast and easy to maintain',
        'Dedicated SEO pages for services (residential and commercial painting, plastering, offices, schools, restaurants and more) and areas (Twickenham, Richmond, Teddington, Kingston, Putney)',
        'Google Business Profile optimisation: categories, services, descriptions and photos',
        'Weekly Google updates and ongoing content to push the profile up in local search',
        'Review generation strategy — the profile reached 100 Google reviews',
        'Quote form with project postcode, project type and floor plan or photo upload (Netlify Forms)',
        'Structured data (schema.org): LocalBusiness and HousePainter',
      ],
    },
  },
  {
    slug: 'skala-wordpress-acf-svetaine',
    year: 2026,
    categories: ['corporate'],
    services: ['wordpress-kurimas', 'greicio-optimizavimas'],
    image: caseSkala,
    gallery: [caseSkalaPagespeed, caseSkalaCaseStudies],
    url: 'https://skalaagency.co.uk/',
    client: { lt: 'Skala Agency', en: 'Skala Agency' },
    title: {
      lt: 'WordPress svetainės kūrimas su ACF moduliais: 100 balų PageSpeed',
      en: 'A bespoke WordPress site built with ACF modules: 100/100 on PageSpeed',
    },
    excerpt: {
      lt: 'Rinkodaros agentūrai nuo nulio sukūriau WordPress svetainę su ACF lanksčiu turiniu: klientas pats dėlioja sekcijas ir keičia jų išdėstymą, o svetainė surenka 100 balų kompiuteryje ir 99 — mobiliajame.',
      en: 'A marketing agency site built from scratch with WordPress and ACF flexible content: the client arranges sections and changes their layout, and the site scores 100 on desktop and 99 on mobile.',
    },
    challenge: {
      lt: 'Skala — rinkodaros, pardavimų ir strategijos agentūra Jungtinėje Karalystėje. Jai reikėjo išskirtinio dizaino svetainės, kurią komanda galėtų laisvai keisti: kurti naujus puslapius, dėlioti sekcijas ir derinti jų išvaizdą be programuotojo ir nesulėtinant svetainės.',
      en: 'Skala is a UK marketing, sales and strategy agency. It needed a distinctive website the team could change freely — building new pages, arranging sections and adjusting how they look — without a developer and without slowing the site down.',
    },
    solution: {
      lt: 'Nuo nulio sukūriau individualią WordPress temą, kurioje kiekvienas puslapis surenkamas iš ACF lankstaus turinio (Flexible Content) sekcijų. Klientas gali įdėti bet kurią sekciją į bet kurį puslapį ir bet kurią vietą, o kiekvienoje sekcijoje keisti ne tik turinį, bet ir išdėstymą: vidinius ir išorinius tarpus, stulpelių skaičių, nuorodas į kitas sekcijas. Kodas lengvas, be nereikalingų įskiepių, todėl puslapiai kraunasi greitai.',
      en: 'I built a bespoke WordPress theme from scratch where every page is assembled from ACF flexible content sections. The client can add any section to any page, in any position, and change not just its content but its layout: padding, margins, the number of columns and links to other sections. The code is lean with no unnecessary plugins, so the site loads instantly.',
    },
    outcome: {
      lt: 'Agentūra pati kuria ir keičia puslapius, o Google Lighthouse teste svetainė kompiuteryje surenka po 100 balų už našumą, gerąją praktiką ir SEO, mobiliajame — 99 už našumą.',
      en: 'The agency builds and edits pages on its own, and the site scores 100 for performance, best practices and SEO on desktop in Google Lighthouse, and 99 for mobile performance.',
    },
    metrics: [
      { value: '100', label: { lt: 'PageSpeed balai kompiuteryje', en: 'PageSpeed on desktop' } },
      { value: '99', label: { lt: 'PageSpeed balai mobiliajame', en: 'PageSpeed on mobile' } },
      { value: '100', label: { lt: 'Lighthouse SEO įvertinimas', en: 'Lighthouse SEO score' } },
    ],
    highlights: {
      lt: [
        'Individuali WordPress tema, nuo nulio sukurta pagal išskirtinį prekės ženklo dizainą',
        'ACF lankstus turinys (Flexible Content): bet kuri sekcija — į bet kurį puslapį ir bet kurią vietą',
        'Kiekvienos sekcijos išdėstymo nustatymai: vidiniai ir išoriniai tarpai, stulpelių skaičius, nuorodos į kitas sekcijas',
        'Lengvas kodas be nereikalingų įskiepių: 477 KB puslapis, LCP 0,36 s, CLS 0,001',
        'Google Lighthouse kompiuteryje: našumas 100, geroji praktika 100, SEO 100, prieinamumas 96; mobiliajame našumas — 99',
      ],
      en: [
        'Bespoke WordPress theme built from scratch around a distinctive brand design',
        'ACF Flexible Content: any section on any page, in any position',
        'Layout controls on every section: padding, margins, number of columns and links to other sections',
        'Lean code with no unnecessary plugins: a 477 KB page, LCP 0.36s, CLS 0.001',
        'Google Lighthouse: 100 performance, 100 best practices, 100 SEO, 96 accessibility (desktop), 99 mobile performance',
      ],
    },
  },
  {
    slug: 'fushi-shopify-parduotuve',
    year: 2025,
    categories: ['ecommerce'],
    services: ['shopify-parduotuves-kurimas', 'integracijos'],
    image: caseFushi,
    gallery: [caseFushiChat, caseFushiCollection],
    url: 'https://fushiwellbeing.com/',
    client: { lt: 'Fushi Wellbeing', en: 'Fushi Wellbeing' },
    title: {
      lt: 'Shopify el. parduotuvė su AI konsultante ir lanksčiomis sekcijomis',
      en: 'A Shopify store with an AI wellbeing advisor and campaign-ready sections',
    },
    excerpt: {
      lt: 'Londono ajurvedos prekės ženklui sukūriau individualias Shopify funkcijas: AI asistentę „Ask Ria“, reklamines plyteles kolekcijų puslapiuose ir redaguojamas sekcijas, valdomas metalaukais (metafields).',
      en: 'Custom Shopify functionality for a London Ayurvedic brand: the Ask Ria AI advisor, promo tiles inside collection grids and editable, metafield-driven sections.',
    },
    challenge: {
      lt: 'Fushi prekiauja plačiu natūralios kosmetikos ir maisto papildų asortimentu, suskirstytu pagal odos poreikius, ingredientus ir produktų tipus. Prieš pasirinkdami aliejų ar papildą pirkėjai dažnai nori patarimo, o rinkodaros komanda beveik kas mėnesį paleidžia naują pasiūlymą. Parduotuvei reikėjo būdo konsultuoti klientus ir keisti kampanijas, nuotraukas bei tekstus kaskart nekviečiant programuotojo.',
      en: 'Fushi sells a wide range of natural beauty and health products, organised by concern, ingredient and product type. Shoppers often want advice before choosing an oil or supplement, and the marketing team launches a new offer almost every month. The store needed a way to guide customers, and to change campaigns, images and copy without calling in a developer each time.',
    },
    solution: {
      lt: 'Į parduotuvės Shopify temą įdiegiau individualias funkcijas, kurios sprendžia abi problemas: AI konsultantė padeda pirkėjams išsirinkti tinkamą produktą, o lanksčios sekcijos ir metalaukai leidžia komandai pačiai keisti kampanijas ir turinį.',
      en: 'I added custom functionality to the store’s Shopify theme that meets both needs: an AI advisor helps shoppers choose the right product, while flexible sections and metafields let the team change campaigns and content on their own.',
    },
    outcome: {
      lt: 'Rinkodaros komanda sezonines kampanijas, nuotraukas ir tekstus keičia tiesiai temos redaktoriuje, pasiūlymai rodomi ten, kur pirkėjai naršo, o patarimą apie produktus klientai gauna bet kuriuo paros metu, neišeidami iš svetainės.',
      en: 'The marketing team swaps seasonal campaigns, images and copy straight from the theme editor, offers appear right where shoppers browse, and customers can get product advice at any hour without leaving the page.',
    },
    metrics: [
      { value: '24/7', label: { lt: 'AI konsultacijos pirkėjams', en: 'AI advice for shoppers' } },
      { value: '4', label: { lt: 'Greito pasirinkimo temos pokalbyje', en: 'Quick-start chat topics' } },
      { value: 'OS 2.0', label: { lt: 'Shopify sekcijos ir blokai, redaguojami be programuotojo', en: 'Shopify sections and blocks, editable without a developer' } },
    ],
    highlights: {
      lt: [
        'AI pokalbių asistentės „Ask Ria“ integracija į Shopify temą: mygtukas antraštėje, plaukiojantis pokalbio mygtukas ir greito pasirinkimo temos',
        'Reklaminės plytelės kolekcijų puslapiuose: su nuotrauka, tekstu ir mygtuku „Į krepšelį“ tarp prekių',
        'Individualios Shopify sekcijos (Online Store 2.0): prekės pagal poreikį ir ingredientą, palyginimo lentelė, privalumų ir atsiliepimų blokai',
        'Produktų informacija Shopify metalaukuose (metafields), automatiškai rodoma visoje parduotuvėje',
        'Nuotraukos, tekstai ir kampanijos keičiami temos redaktoriuje be programuotojo',
      ],
      en: [
        'Ask Ria AI chat assistant integrated into the Shopify theme: header button, floating chat launcher and quick-start topics',
        'Promo tiles on collection pages — with their own image, copy and Add to cart button between products',
        'Custom Shopify sections (Online Store 2.0): shop by concern and ingredient, comparison table, USP and review blocks',
        'Product details stored in Shopify metafields and shown automatically across the store',
        'Images, copy and campaigns edited in the theme editor — no developer needed',
      ],
    },
  },
  {
    slug: 'eq-care-wordpress-prieziura',
    year: 2026,
    categories: ['maintenance'],
    services: ['wordpress-prieziura', 'wordpress-kurimas'],
    image: caseEqCare,
    gallery: [caseEqCareHome, caseEqCareForms],
    url: 'https://eqcare.org/',
    client: { lt: 'EQ Care Group', en: 'EQ Care Group' },
    title: {
      lt: 'WordPress svetainės priežiūra ir plėtra globos namų tinklui',
      en: 'WordPress maintenance and development for a care home group',
    },
    excerpt: {
      lt: 'Nuolatinė EQ Care Group WordPress svetainės priežiūra: individualios formos, lankstūs ACF moduliai ir turinys, rodomas pagal TVS nustatymus.',
      en: 'Ongoing WordPress maintenance for EQ Care Group: custom forms, flexible ACF sections and conditional content driven by CMS settings.',
    },
    challenge: {
      lt: 'EQ Care Group valdo globos namų tinklą Anglijoje ir nuolat atidaro naujus namus. Svetainė turi greitai atspindėti pokyčius — naujus namus, jų būseną, kontaktus ir užklausų formas, — o komanda nori tai valdyti pati, nekviesdama programuotojo dėl kiekvieno pakeitimo. Kartu svetainę reikia nuolat prižiūrėti: atnaujinti WordPress ir įskiepius taip, kad niekas nesugestų.',
      en: 'EQ Care Group runs a network of care homes across England and keeps opening new ones. The website has to keep up with every change — new homes, their status, contact details and enquiry forms — and the team wants to manage that themselves rather than call a developer for each update. At the same time the site needs steady upkeep: WordPress and plugin updates that never break anything.',
    },
    solution: {
      lt: 'Pagal mėnesinės priežiūros planą rūpinuosi WordPress ir įskiepių atnaujinimais, o kartu kuriu naujas funkcijas: individualias formas, lanksčius Advanced Custom Fields (ACF) modulius ir sąlyginį turinį, kuris keičiasi pagal TVS nustatymus.',
      en: 'Under a monthly care plan I look after WordPress and plugin updates, and build new functionality alongside: custom forms, flexible Advanced Custom Fields (ACF) sections and conditional content that changes with the settings in the CMS.',
    },
    outcome: {
      lt: 'Komanda pati prideda naujus globos namus, keičia jų būseną ir kuria puslapius iš paruoštų sekcijų, o svetainė lieka atnaujinta, saugi ir stabili.',
      en: 'The team adds new care homes, changes their status and assembles pages from ready-made sections on their own, while the site stays updated, secure and stable.',
    },
    metrics: [
      { value: '8', label: { lt: 'Globos namų puslapiai, valdomi iš TVS', en: 'Care home pages managed from the CMS' } },
      { value: 'ACF', label: { lt: 'Lankstūs moduliai, dedami bet kuriame puslapyje', en: 'Flexible modules that can go on any page' } },
    ],
    highlights: {
      lt: [
        'Mėnesinė WordPress priežiūra: branduolio, temos ir įskiepių atnaujinimai bei saugumo stebėjimas',
        'Individualios Gravity Forms formos: užklausos pagal priežastį ir pasirinktus globos namus, atskiros formos kiekvieno namo puslapyje',
        'Nauji lankstūs ACF (Advanced Custom Fields) moduliai, kuriuos klientas deda bet kuriame puslapyje ir pats keičia jų turinį bei išdėstymą',
        'Sąlyginis turinys pagal TVS nustatymus: globos namų būsenos („Opening 2027“, „Reserve your space today!“), atskiras telefono numeris ir mygtukas „Request a Callback“ namo puslapyje',
        'Naujų funkcijų diegimas pagal poreikį, neperdarant visos svetainės',
      ],
      en: [
        'Monthly WordPress maintenance: core, theme and plugin updates plus security monitoring',
        'Custom Gravity Forms: enquiries by reason and preferred care home, with forms on every home page',
        'New flexible ACF (Advanced Custom Fields) modules the client can add to any page, editing content and layout themselves',
        'Conditional display driven by CMS settings: care home statuses (“Opening 2027”, “Reserve your space today!”), a home-specific phone number and a Request a Callback button on each home page',
        'New features added as needed — without rebuilding the site',
      ],
    },
  },
  {
    slug: 'adorn-wordpress-seo-turinys',
    year: 2026,
    categories: ['maintenance', 'seo'],
    services: ['wordpress-prieziura', 'seo-optimizavimas', 'google-verslo-profilis'],
    image: caseAdorn,
    gallery: [caseAdornServices, caseAdornLocation],
    url: 'https://www.adornfacilitiesmanagement.co.uk/',
    client: { lt: 'Adorn', en: 'Adorn' },
    title: {
      lt: 'WordPress turinys ir vietinis SEO istorinių pastatų restauravimo įmonei',
      en: 'WordPress content and local SEO for a heritage building restoration company',
    },
    excerpt: {
      lt: 'Statybų įmonei Esekse ir Safolke valdau WordPress turinį pagal SEO prioritetus, kuriu naujus puslapius su ACF lanksčiu turiniu ir prižiūriu Google verslo profilį.',
      en: 'Ongoing WordPress content management driven by SEO priorities, new pages built with ACF flexible content and Google Business Profile work for a builder in Essex and Suffolk.',
    },
    challenge: {
      lt: 'Adorn — statybų įmonė, besispecializuojanti istorinių ir saugomų pastatų restauravime Kolčesteryje ir Ipsviče. Paslaugos labai specifinės, todėl svarbu, kad svetainę ir Google profilį rastų būtent tie, kas ieško restauravimo, priestatų ar mansardų įrengimo šiose vietovėse.',
      en: 'Adorn is a builder specialising in heritage and listed building restoration across Colchester and Ipswich. The services are niche, so the website and Google profile need to reach exactly the people searching for restoration, extensions or loft conversions in those areas.',
    },
    solution: {
      lt: 'WordPress turinį valdau pagal SEO prioritetus: atnaujinu esamus puslapius ir kuriu naujus paslaugų bei vietovių puslapius. Naujas sekcijas kuriu kaip ACF lankstaus turinio modulius, kuriuos galima dėlioti bet kuriame puslapyje. Taip pat optimizavau Google verslo profilį ir kas savaitę skelbiu įrašus, kad įmonė būtų matomesnė vietinėje paieškoje.',
      en: 'I manage the WordPress content against SEO priorities: updating existing pages and creating new service and location pages. New sections are built as ACF flexible content modules that can be arranged on any page. I also optimised the Google Business Profile and post weekly updates to raise visibility in local search.',
    },
    outcome: {
      lt: 'Svetainė plečiama pagal planą: kiekvienas naujas puslapis atsako į konkrečią paiešką, o komanda turi lanksčių modulių biblioteką naujiems puslapiams kurti.',
      en: 'The site grows to a plan — every new page answers a specific search — and the team has a library of flexible modules to build new pages from.',
    },
    metrics: [
      { value: '7', label: { lt: 'Optimizuoti paslaugų ir vietovių puslapiai', en: 'Service and location SEO pages' } },
      { value: '52', label: { lt: 'Google verslo profilio įrašai per metus (kas savaitę)', en: 'Google profile updates a year (weekly)' } },
    ],
    highlights: {
      lt: [
        'WordPress turinio atnaujinimai pagal SEO prioritetus: antraštės, tekstai ir vidinės nuorodos',
        'Nauji paslaugų puslapiai: istorinių pastatų restauravimas, saugomų pastatų priestatai, mansardos, namų priestatai ir komerciniai projektai',
        'Vietovių puslapiai „Builders in Colchester“ ir „Builders in Ipswich“',
        'Nauji ACF lankstaus turinio (Flexible Content) moduliai, dedami bet kuriame puslapyje: paslaugų blokai, privalumai, darbo eiga, DUK, sertifikatai ir kt.',
        'Google verslo profilio optimizavimas ir kassavaitiniai įrašai matomumui didinti',
      ],
      en: [
        'WordPress content updates driven by SEO priorities: headings, copy and internal links',
        'New service pages (heritage restoration, listed building extensions, loft conversions, house extensions, commercial projects)',
        'Location pages for “Builders in Colchester” and “Builders in Ipswich”',
        'New ACF Flexible Content modules that can go on any page: service blocks, features, steps, FAQs, certifications and more',
        'Google Business Profile optimisation and weekly updates to boost visibility',
      ],
    },
  },
  {
    slug: 'asembl-tinklarastis-webflow-i-wordpress',
    year: 2026,
    categories: ['corporate'],
    services: ['migracija-ir-perkelimas', 'wordpress-kurimas'],
    image: caseAsembl,
    gallery: [caseAsemblGrid, caseAsemblPost],
    url: 'https://asemblgroup.co/blog/',
    client: { lt: 'Asembl Group', en: 'Asembl Group' },
    title: {
      lt: 'Webflow tinklaraščio perkėlimas į WordPress išlaikant dizainą',
      en: 'Rebuilding a Webflow blog in WordPress with an identical design',
    },
    excerpt: {
      lt: 'Tarptautinės renginių grupės tinklaraštį iš Webflow perkėliau į WordPress: tas pats dizainas, kategorijų filtrai, SEO struktūra ir patogus turinio valdymas.',
      en: 'An international events group’s blog, rebuilt from Webflow in WordPress: the same design, category filters, SEO structure and easy content editing.',
    },
    challenge: {
      lt: 'Asembl Group — tarptautinė renginių ir skatinamųjų kelionių grupė. Jos tinklaraščio dizainas buvo sukurtas Webflow, o užduotis — atkurti jį WordPress taip, kad lankytojai nepastebėtų skirtumo, o komanda galėtų publikuoti straipsnius įprastoje WordPress aplinkoje.',
      en: 'Asembl Group is an international events and incentives group. Its blog was designed in Webflow, and the task was to rebuild it in WordPress so visitors would notice no difference, while the team could publish articles in the familiar WordPress editor.',
    },
    solution: {
      lt: 'WordPress temoje atkūriau tinklaraščio sąrašo puslapį ir įrašo šabloną, išlaikydamas Webflow dizainą ir mobiliąją versiją. Kategorijų filtrus paverčiau atskirais, paieškos sistemoms draugiškais archyvais su puslapiavimu, o įrašams pridėjau struktūrinius duomenis.',
      en: 'I rebuilt the blog listing and the post template in the WordPress theme, matching the Webflow design and the mobile layout. Category filters became separate, search-friendly archives with pagination, and posts got structured data.',
    },
    outcome: {
      lt: 'WordPress tinklaraštis atrodo taip pat kaip Webflow, o komanda straipsnius rašo, priskiria kategorijoms ir publikuoja pati — be papildomų platformų.',
      en: 'The blog looks the same in WordPress as it did in Webflow, and the team writes, categorises and publishes articles themselves — no extra platform needed.',
    },
    metrics: [
      { value: 'Webflow → WP', label: { lt: 'Tinklaraštis perkeltas išlaikant dizainą', en: 'Blog moved with an identical design' } },
      { value: '3', label: { lt: 'Kategorijų archyvai su puslapiavimu', en: 'Category archives with pagination' } },
    ],
    highlights: {
      lt: [
        'Webflow tinklaraščio dizainas tiksliai atkurtas WordPress temoje — kompiuteryje ir mobiliajame',
        'Pagrindinis įrašas ir blokas „Featured Stories“, valdomi iš WordPress',
        'Kategorijų filtrai (Events, Incentives, Insights) kaip atskiri, paieškos sistemoms draugiški archyvai su puslapiavimu',
        'Aiški adresų struktūra pagal kategoriją (/insights/…, /events/…, /incentives/…)',
        'Įrašo šablonas: paryškinti antraštės žodžiai, skaitymo laikas, keli autoriai, dalijimosi mygtukai ir DUK blokas',
        'Struktūriniai duomenys (schema.org): Article, Person, BreadcrumbList',
      ],
      en: [
        'The Webflow blog design faithfully rebuilt in the WordPress theme — on desktop and mobile',
        'A lead post and a Featured Stories block, managed from WordPress',
        'Category filters (Events, Incentives, Insights) as separate, SEO-friendly archives with pagination',
        'A clear URL structure by category (/insights/…, /events/…, /incentives/…)',
        'Post template: highlighted headline words, read time, multiple contributors, share buttons and an FAQ block',
        'Structured data (schema.org): Article, Person, BreadcrumbList',
      ],
    },
  },
  {
    slug: 'dubois-turinio-atnaujinimai',
    year: 2026,
    categories: ['maintenance'],
    services: ['greicio-optimizavimas'],
    image: caseDubois,
    gallery: [caseDuboisContent],
    url: 'https://www.duboisgroup.com/',
    client: { lt: 'Dubois Group', en: 'Dubois Group' },
    title: {
      lt: 'Turinio atnaujinimai ir vaizdų optimizavimas tarptautiniam draudimo brokeriui',
      en: 'Content updates and image optimisation for an international insurance broker',
    },
    excerpt: {
      lt: 'Šeimos valdomo tarptautinio draudimo brokerio Dubois Group svetainės turinio atnaujinimai ir vaizdų optimizavimas.',
      en: 'Website content updates and image optimisation for Dubois Group, a family-owned international insurance broker.',
    },
    challenge: {
      lt: 'Dubois Group (anksčiau HWI) — šeimos valdomas tarptautinis draudimo brokeris, dirbantis su sudėtingomis rizikomis: nuo meno kolekcijų iki aviacijos. Svetainėje nuolat atsiranda naujienų, ekspertizės sričių ir komandos pokyčių, todėl turinį reikia atnaujinti greitai ir tvarkingai, nesulėtinant puslapių.',
      en: 'Dubois Group (formerly HWI) is a family-owned international insurance broker handling complex risks from fine art to aviation. The site regularly gets new announcements, expertise areas and team changes, so content needs updating quickly and cleanly without slowing pages down.',
    },
    solution: {
      lt: 'Atnaujinau svetainės turinį pagal komandos poreikius ir optimizavau vaizdus: parinkau tinkamus dydžius ir suspaudimą, kad puslapiai krautųsi greitai ir atrodytų ryškiai bet kuriame ekrane.',
      en: 'I updated the site content as the team needed and optimised the images — correct dimensions and compression — so pages load quickly and look sharp on any screen.',
    },
    outcome: {
      lt: 'Svetainėje — naujausia informacija, o optimizuoti vaizdai padeda išlaikyti greitą krovimąsi.',
      en: 'The site reflects the latest information, and optimised images help keep it loading fast.',
    },
    metrics: [],
    highlights: {
      lt: [
        'Svetainės turinio atnaujinimai: tekstai, naujienos ir puslapių informacija',
        'Vaizdų optimizavimas: tinkami dydžiai ir suspaudimas greitesniam krovimuisi',
      ],
      en: [
        'Website content updates: copy, news and page information',
        'Image optimisation: correct sizing and compression for faster loading',
      ],
    },
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return projects;
  return projects.filter((p) => p.categories.includes(categoryId));
}
