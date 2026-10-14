/**
 * ---------------------------------------------------------------------------
 * SERVICE DETAIL PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Extra content for /paslaugos/<slug>, keyed by service slug:
 *   timeline  typical duration (shown in the quick facts)
 *   problems  3 × { problem, solution } — "problems I solve"
 *   faq       3 × { question, answer } — service-specific questions
 *
 * Anything missing simply hides its section, so a new service can start with
 * only the fields in services.js.
 * ---------------------------------------------------------------------------
 */

const ps = (problemLt, problemEn, solutionLt, solutionEn) => ({
  problem: { lt: problemLt, en: problemEn },
  solution: { lt: solutionLt, en: solutionEn },
});

const qa = (qLt, qEn, aLt, aEn) => ({
  question: { lt: qLt, en: qEn },
  answer: { lt: aLt, en: aEn },
});

export const serviceDetails = {
  'wordpress-kurimas': {
    timeline: { lt: '4–8 savaitės', en: '4–8 weeks' },
    problems: [
      ps(
        'Svetainė atrodo pasenusi ir nekelia pasitikėjimo.',
        'The site looks dated and does not inspire trust.',
        'Šiuolaikiškas, jūsų prekės ženklui sukurtas dizainas, kuris atrodo gerai bet kuriame ekrane.',
        'A modern design built for your brand that looks right on every screen.',
      ),
      ps(
        'Kiekvienam teksto pakeitimui reikia programuotojo.',
        'Every text change needs a developer.',
        'Gutenberg blokai, kuriais tekstus, nuotraukas ir sekcijas keičiate patys.',
        'Gutenberg blocks that let you change text, images and sections yourself.',
      ),
      ps(
        'Svetainė lėta ir apkrauta įskiepiais.',
        'The site is slow and weighed down by plugins.',
        'Švarus individualus kodas ir tik būtini įskiepiai — greitis nuo pirmos dienos.',
        'Clean custom code and only essential plugins — fast from day one.',
      ),
    ],
    faq: [
      qa(
        'Ar galėsiu pats redaguoti svetainę?',
        'Will I be able to edit the site myself?',
        'Taip. Kiekviena sekcija yra Gutenberg blokas, o paleidimo metu gausite mokymus ir trumpą instrukciją.',
        'Yes. Every section is a Gutenberg block, and you get training plus a short guide at launch.',
      ),
      qa(
        'Kas parašys svetainės tekstus?',
        'Who writes the website copy?',
        'Galite pateikti savo tekstus arba užsakyti turinio rašymą kaip papildomą paslaugą.',
        'You can supply your own copy or add content writing as an extra service.',
      ),
      qa(
        'Ar svetainė bus mano nuosavybė?',
        'Will I own the website?',
        'Taip — kodas, dizainas, domenas ir visos prieigos priklauso jums nuo pirmos dienos.',
        'Yes — the code, design, domain and all credentials are yours from day one.',
      ),
    ],
  },

  'wordpress-prieziura': {
    timeline: { lt: 'Pradžia per 1 d. d.', en: 'Starts within 1 business day' },
    problems: [
      ps(
        'Bijote spausti „Atnaujinti“, nes kažkas gali sulūžti.',
        'You are afraid to press “Update” in case something breaks.',
        'Atnaujinimai pirmiausia išbandomi testinėje aplinkoje, tik tada keliami į gyvą svetainę.',
        'Updates are tested on staging first, then pushed live.',
      ),
      ps(
        'Nežinote, ar turite veikiančią atsarginę kopiją.',
        'You do not know whether you have a working backup.',
        'Kasdienės kopijos saugomos atskirai nuo serverio ir reguliariai bandomos atkurti.',
        'Daily backups stored off-server and test-restored regularly.',
      ),
      ps(
        'Apie neveikiančią svetainę sužinote iš klientų.',
        'You find out the site is down from your customers.',
        'Veikimo stebėjimas kas minutę — apie problemą sužinau pirmas ir sprendžiu iškart.',
        'Uptime checks every minute — I hear about problems first and act at once.',
      ),
    ],
    faq: [
      qa(
        'Ką daryti, jei svetainę kūrė kitas specialistas?',
        'What if someone else built the site?',
        'Tai įprasta. Pradžioje atlieku nemokamą patikrą ir pasakau, ką reikia sutvarkyti prieš pradedant priežiūrą.',
        'That is common. I start with a free check and tell you what needs fixing before care begins.',
      ),
      qa(
        'Ar galiu bet kada nutraukti sutartį?',
        'Can I cancel at any time?',
        'Taip, su 30 dienų įspėjimu. Visos prieigos ir kopijos lieka jums.',
        'Yes, with 30 days’ notice. All access and backups stay with you.',
      ),
      qa(
        'Kas įeina į įskaičiuotas valandas?',
        'What do the included hours cover?',
        'Smulkūs pakeitimai: tekstai, nuotraukos, nauji puslapiai iš esamų blokų, nedidelės korekcijos.',
        'Small changes: text, images, new pages from existing blocks and minor tweaks.',
      ),
    ],
  },

  'seo-optimizavimas': {
    timeline: { lt: 'Pirmi rezultatai per 2–4 mėn.', en: 'First results in 2–4 months' },
    problems: [
      ps(
        'Svetainė nerodoma Google pagal svarbiausias paslaugas.',
        'The site does not show up in Google for your key services.',
        'Raktažodžių tyrimas ir puslapiai, atsakantys į tai, ko realiai ieško klientai.',
        'Keyword research and pages that answer what customers actually search for.',
      ),
      ps(
        'Visas srautas ateina tik iš mokamos reklamos.',
        'All your traffic comes from paid ads.',
        'Organinis srautas, kuris auga ir nesustoja vos išjungus reklamą.',
        'Organic traffic that grows and does not stop when the ads do.',
      ),
      ps(
        'Nežinote, ar SEO darbai iš viso duoda naudos.',
        'You cannot tell whether SEO work makes any difference.',
        'Mėnesinė ataskaita su pozicijomis, srautu ir konkrečiais atliktais darbais.',
        'A monthly report with rankings, traffic and the exact work done.',
      ),
    ],
    faq: [
      qa(
        'Per kiek laiko pamatysiu rezultatus?',
        'How soon will I see results?',
        'Techniniai pataisymai veikia per kelias savaites, o turinio rezultatai paprastai matomi per 2–4 mėnesius.',
        'Technical fixes show within weeks; content usually pays off within 2–4 months.',
      ),
      qa(
        'Ar garantuojate pirmą vietą Google?',
        'Do you guarantee the top spot in Google?',
        'Ne — to sąžiningai negali garantuoti niekas. Garantuoju skaidrų darbą ir matuojamą progresą.',
        'No — nobody can honestly promise that. I guarantee transparent work and measurable progress.',
      ),
      qa(
        'Ar tinka vietiniam verslui?',
        'Does it work for a local business?',
        'Taip. Vietinis SEO ir Google verslo profilis dažnai duoda greičiausią grąžą.',
        'Yes. Local SEO and the Google Business Profile often give the fastest return.',
      ),
    ],
  },

  'greicio-optimizavimas': {
    timeline: { lt: '1–2 savaitės', en: '1–2 weeks' },
    problems: [
      ps(
        'Puslapiai kraunasi ilgiau nei 3 sekundes.',
        'Pages take longer than 3 seconds to load.',
        'Randama tikroji priežastis ir pašalinama — dažniausiai pakanka kelių tikslių pakeitimų.',
        'The real cause is found and removed — a few targeted changes usually do it.',
      ),
      ps(
        'Search Console rodo raudonus Core Web Vitals.',
        'Search Console shows red Core Web Vitals.',
        'LCP, INP ir CLS į žalią zoną pagal realių vartotojų duomenis.',
        'LCP, INP and CLS into the green, based on real-user data.',
      ),
      ps(
        'Mobiliuosiuose lankytojai išeina nesulaukę puslapio.',
        'Mobile visitors leave before the page appears.',
        'Optimizuoti vaizdai, kritinis CSS ir talpykla — svetainė greita ir telefone.',
        'Optimised images, critical CSS and caching — fast on phones too.',
      ),
    ],
    faq: [
      qa(
        'Ar reikės keisti talpinimą?',
        'Will I need to change hosting?',
        'Ne visada. Pirmiausia išnaudojame esamą serverį; keisti siūlau tik jei jis tikrai stabdo.',
        'Not always. We get the most out of your current server first and only suggest a move if it is truly the bottleneck.',
      ),
      qa(
        'Ar nesugadinsite dizaino?',
        'Will the design change?',
        'Ne. Optimizuojama tai, kas po gaubtu — lankytojai pastebi tik greitį.',
        'No. The work happens under the hood — visitors only notice the speed.',
      ),
      qa(
        'Kaip įsitikinsiu, kad pagerėjo?',
        'How will I know it improved?',
        'Gausite ataskaitą „prieš ir po“ su lauko ir laboratoriniais Core Web Vitals duomenimis.',
        'You get a before/after report with field and lab Core Web Vitals data.',
      ),
    ],
  },

  woocommerce: {
    timeline: { lt: '6–10 savaičių', en: '6–10 weeks' },
    problems: [
      ps(
        'Užsakymus ir likučius vedate ranka keliose sistemose.',
        'You enter orders and stock by hand in several systems.',
        'Integracija su apskaita — prekės ir užsakymai sinchronizuojami automatiškai.',
        'Accounting integration — products and orders sync automatically.',
      ),
      ps(
        'Pirkėjai palieka krepšelį atsiskaitymo metu.',
        'Shoppers abandon their cart at checkout.',
        'Supaprastintas atsiskaitymas su lietuviškais mokėjimo ir siuntimo būdais.',
        'A streamlined checkout with Lithuanian payment and delivery options.',
      ),
      ps(
        'Platforma ima mokestį nuo kiekvieno pardavimo.',
        'The platform takes a cut of every sale.',
        'Jokių mokesčių nuo apyvartos — parduotuvė ir duomenys priklauso jums.',
        'No fees on turnover — the store and the data are yours.',
      ),
    ],
    faq: [
      qa(
        'Kokius mokėjimo būdus galima prijungti?',
        'Which payment methods can be connected?',
        'Paysera, Montonio, bankų nuorodas, korteles, Apple Pay ir Google Pay.',
        'Paysera, Montonio, bank links, cards, Apple Pay and Google Pay.',
      ),
      qa(
        'Ar galima perkelti prekes iš esamos parduotuvės?',
        'Can products be moved from my current store?',
        'Taip — prekės, kategorijos, klientai ir užsakymų istorija perkeliami su nukreipimais.',
        'Yes — products, categories, customers and order history move across, with redirects.',
      ),
      qa(
        'Ar parduotuvė veiks su mano apskaitos programa?',
        'Will the store work with my accounting software?',
        'Dažniausiai taip. Prieš pradedant patikrinu jūsų sistemos API ir pasakau tiksliai.',
        'Usually, yes. I check your system’s API before we start and give you a clear answer.',
      ),
    ],
  },

  'migracija-ir-perkelimas': {
    timeline: { lt: '2–4 savaitės', en: '2–4 weeks' },
    problems: [
      ps(
        'Bijote prarasti Google pozicijas ir srautą.',
        'You are worried about losing Google rankings and traffic.',
        'Kiekvienam senam adresui — 301 nukreipimas ir stebėjimas po paleidimo.',
        'A 301 redirect for every old URL, plus monitoring after launch.',
      ),
      ps(
        'Uždara platforma riboja ir brangsta.',
        'A closed platform is limiting you and getting pricier.',
        'Perkėlimas į WordPress, kur viską valdote patys ir nemokate už kiekvieną funkciją.',
        'A move to WordPress, where you control everything and do not pay per feature.',
      ),
      ps(
        'Svetainė negali stovėti nė dienos.',
        'The site cannot go offline for even a day.',
        'Nauja svetainė paruošiama atskirai, o perjungimas vyksta be prastovos.',
        'The new site is built separately and the switch happens with zero downtime.',
      ),
    ],
    faq: [
      qa(
        'Iš kokių platformų galima perkelti?',
        'Which platforms can you migrate from?',
        'Wix, Squarespace, Shopify, Joomla, seni WordPress ir individualiai sukurtos svetainės.',
        'Wix, Squarespace, Shopify, Joomla, old WordPress installs and custom-built sites.',
      ),
      qa(
        'Ar dings Google pozicijos?',
        'Will I lose my Google rankings?',
        'Su teisingu nukreipimų žemėlapiu — ne. Po paleidimo dvi savaites stebiu Search Console.',
        'Not with a proper redirect map. I monitor Search Console for two weeks after launch.',
      ),
      qa(
        'Ar el. paštas veiks perkeliant domeną?',
        'Will email keep working when the domain moves?',
        'Taip — DNS įrašai perkeliami taip, kad el. paštas nenutrūktų.',
        'Yes — DNS records are moved so email is never interrupted.',
      ),
    ],
  },

  integracijos: {
    timeline: { lt: '1–4 savaitės', en: '1–4 weeks' },
    problems: [
      ps(
        'Duomenis iš svetainės perrašinėjate ranka į kitą sistemą.',
        'You copy data from the website into another system by hand.',
        'Automatinis duomenų perdavimas per API — be klaidų ir gaišaties.',
        'Automatic data transfer via API — no errors, no lost time.',
      ),
      ps(
        'Sistemos „nesikalba“ tarpusavyje.',
        'Your systems do not talk to each other.',
        'Svetainė sujungiama su CRM, apskaita, sandėliu ar rezervacijomis.',
        'The website is connected to your CRM, accounting, stock or booking system.',
      ),
      ps(
        'Esama integracija dažnai lūžta ir niekas nežino kodėl.',
        'An existing integration keeps breaking and nobody knows why.',
        'Patikima integracija su klaidų registravimu ir pilna dokumentacija.',
        'A reliable integration with error logging and full documentation.',
      ),
    ],
    faq: [
      qa(
        'Su kokiomis sistemomis galima integruoti?',
        'Which systems can you integrate with?',
        'Su bet kuria, turinčia API: HubSpot, Pipedrive, apskaitos, sandėlio ir rezervacijų sistemomis.',
        'Anything with an API: HubSpot, Pipedrive, accounting, inventory and booking systems.',
      ),
      qa(
        'Kas nutiks, jei sistema pakeis savo API?',
        'What happens if a system changes its API?',
        'Priežiūros plane integracijos stebimos ir atnaujinamos; be jo — pataisymai pagal valandinį įkainį.',
        'On a care plan integrations are monitored and updated; otherwise fixes are billed hourly.',
      ),
      qa(
        'Ar mano duomenys bus saugūs?',
        'Will my data be safe?',
        'Taip — šifruotas ryšys, minimalios teisės ir jokių duomenų trečiosioms šalims be reikalo.',
        'Yes — encrypted connections, least-privilege access and no needless data sharing.',
      ),
    ],
  },

  prieinamumas: {
    timeline: { lt: '2–3 savaitės', en: '2–3 weeks' },
    problems: [
      ps(
        'Nežinote, ar svetainė atitinka Europos prieinamumo aktą.',
        'You do not know whether the site meets the European Accessibility Act.',
        'WCAG 2.2 AA auditas su aiškiu sąrašu, kas neatitinka ir kodėl.',
        'A WCAG 2.2 AA audit with a clear list of what fails and why.',
      ),
      ps(
        'Dalis lankytojų negali naudotis svetaine.',
        'Some visitors cannot use the site at all.',
        'Veikia su klaviatūra, ekrano skaitytuvais ir didinimu — visiems.',
        'Works with keyboards, screen readers and zoom — for everyone.',
      ),
      ps(
        'Formos ir klaidų pranešimai neaiškūs.',
        'Forms and error messages are confusing.',
        'Aiškios etiketės, suprantami pranešimai ir teisingas fokusavimas.',
        'Clear labels, understandable messages and correct focus handling.',
      ),
    ],
    faq: [
      qa(
        'Ar mano verslui taikomas prieinamumo aktas?',
        'Does the accessibility act apply to my business?',
        'Jis taikomas daugeliui e. prekybos, bankų, transporto ir paslaugų įmonių. Per auditą tai įvertinsime.',
        'It covers many e-commerce, banking, transport and service businesses. The audit will confirm it for you.',
      ),
      qa(
        'Ar užtenka prieinamumo įskiepio?',
        'Is an accessibility plugin enough?',
        'Ne. „Perdangos“ įskiepiai neištaiso kodo ir kartais net trukdo pagalbinėms technologijoms.',
        'No. Overlay plugins do not fix the code and can even get in the way of assistive tech.',
      ),
      qa(
        'Ką gausiu po darbų?',
        'What do I get at the end?',
        'Ištaisytą svetainę, audito ataskaitą ir viešą prieinamumo aprašą.',
        'A fixed site, the audit report and a public accessibility statement.',
      ),
    ],
  },

  'nextjs-svetainiu-kurimas': {
    timeline: { lt: '4–10 savaičių', en: '4–10 weeks' },
    problems: [
      ps(
        'Svetainė lėta net po optimizavimo.',
        'The site is still slow after optimisation.',
        'Next.js puslapiai sugeneruojami iš anksto ir pateikiami per CDN — jie atsidaro akimirksniu.',
        'Next.js pages are pre-rendered and served from a CDN — they open instantly.',
      ),
      ps(
        'Reikia funkcijų, kurių sunku pasiekti su įskiepiais.',
        'You need features that plugins cannot handle well.',
        'Individuali logika: paskyros, skaičiuoklės, rezervacijos ar integracijos — be įskiepių krūvos.',
        'Custom logic: accounts, calculators, bookings or integrations — without a pile of plugins.',
      ),
      ps(
        'Nerimaujate dėl įskiepių saugumo spragų.',
        'You worry about plugin security holes.',
        'Nėra viešo administravimo skydelio ir įskiepių, todėl atakoms lieka daug mažiau galimybių.',
        'No public admin panel and no plugins, so attackers have far fewer ways in.',
      ),
    ],
    faq: [
      qa(
        'Ar galėsiu pats keisti turinį?',
        'Will I be able to edit the content myself?',
        'Taip. Prijungiu patogią turinio valdymo sistemą (headless CMS arba WordPress), kurioje tekstus ir nuotraukas keičiate be programuotojo.',
        'Yes. I connect a friendly content system (a headless CMS or WordPress) where you change text and images without a developer.',
      ),
      qa(
        'Kada rinktis Next.js, o kada WordPress?',
        'When should I choose Next.js over WordPress?',
        'Daugumai įmonių svetainių puikiai tinka WordPress. Next.js verta rinktis, kai svarbiausias greitis, reikia individualios logikos ar web aplikacijos. Pokalbio metu patarsiu atvirai.',
        'WordPress suits most business websites. Next.js is worth it when speed matters most or you need custom logic or a web app. I will give you an honest recommendation on our call.',
      ),
      qa(
        'Kur bus talpinama svetainė?',
        'Where will the site be hosted?',
        'Dažniausiai Vercel arba kitoje patikimoje infrastruktūroje su CDN. Visos paskyros registruojamos jūsų vardu.',
        'Usually on Vercel or other reliable CDN-backed infrastructure. All accounts are registered in your name.',
      ),
    ],
  },

  'shopify-parduotuves-kurimas': {
    timeline: { lt: '4–8 savaitės', en: '4–8 weeks' },
    problems: [
      ps(
        'Parduotuvė su šablonine tema atrodo kaip tūkstančiai kitų.',
        'Your store on a stock theme looks like thousands of others.',
        'Individuali tema pagal jūsų prekės ženklą — be nereikalingo kodo, kuris lėtina puslapius.',
        'A custom theme built around your brand — without the extra code that slows pages down.',
      ),
      ps(
        'Programėlės lėtina parduotuvę ir kas mėnesį kainuoja.',
        'Apps slow the store down and cost money every month.',
        'Peržiūriu programėles ir nereikalingas pakeičiu temos funkcijomis — mažiau mokesčių, greitesnė parduotuvė.',
        'I review your apps and replace the unnecessary ones with theme features — lower fees, a faster store.',
      ),
      ps(
        'Pirkėjai palieka krepšelį nebaigę užsakymo.',
        'Shoppers abandon their cart before ordering.',
        'Paprastesnis pirkimo kelias, aiškios pristatymo sąlygos ir patogūs mokėjimo būdai.',
        'A simpler path to purchase, clear delivery terms and convenient payment options.',
      ),
    ],
    faq: [
      qa(
        'Shopify ar WooCommerce — ką rinktis?',
        'Shopify or WooCommerce — which should I choose?',
        'Shopify paprasčiau valdyti ir nereikia rūpintis serveriu, o WooCommerce suteikia daugiau laisvės ir neturi platformos mokesčių. Patarsiu pagal jūsų asortimentą, biudžetą ir reikalingas integracijas.',
        'Shopify is simpler to run with no server to look after; WooCommerce gives more freedom and has no platform fees. I will advise based on your range, budget and the integrations you need.',
      ),
      qa(
        'Kiek Shopify kainuoja kas mėnesį?',
        'How much does Shopify cost per month?',
        'Shopify planai prasideda nuo kelių dešimčių eurų per mėnesį, prie to prisideda mokėjimų mokesčiai ir mokamos programėlės. Padėsiu pasirinkti planą, kad nepermokėtumėte.',
        'Shopify plans start at a few tens of euros per month, plus payment fees and any paid apps. I will help you pick a plan so you do not overpay.',
      ),
      qa(
        'Ar galite perkelti esamą parduotuvę į Shopify?',
        'Can you move my existing store to Shopify?',
        'Taip. Perkeliu prekes, klientus ir užsakymų istoriją, o senus adresus nukreipiu 301 nukreipimais, kad neprarastumėte pozicijų Google.',
        'Yes. I move products, customers and order history, and 301-redirect old URLs so you keep your Google rankings.',
      ),
    ],
  },

  'google-verslo-profilis': {
    timeline: { lt: '1–2 savaitės', en: '1–2 weeks' },
    problems: [
      ps(
        'Jūsų įmonės nėra Google Maps arba informacija klaidinga.',
        'Your business is missing from Google Maps or shows wrong details.',
        'Profilį sukuriu arba perimu, patvirtinu ir užpildau tikslia informacija.',
        'I create or take over the profile, verify it and fill it with accurate details.',
      ),
      ps(
        'Konkurentai vietinėje paieškoje rodomi aukščiau.',
        'Competitors rank above you in local search.',
        'Tinkamos kategorijos, paslaugos ir aprašymai su raktažodžiais, nuotraukos ir reguliarūs įrašai.',
        'The right categories, services and keyword-rich descriptions, plus photos and regular posts.',
      ),
      ps(
        'Turite mažai atsiliepimų.',
        'You have too few reviews.',
        'Paprasta atsiliepimų rinkimo sistema: nuoroda, QR kodas ir atsakymų šablonai.',
        'A simple review routine: a short link, a QR code and reply templates.',
      ),
    ],
    faq: [
      qa(
        'Ar „Google Mano verslas“ ir Google verslo profilis — tas pats?',
        'Is Google My Business the same as Google Business Profile?',
        'Taip. 2021 m. Google pervadino „Google Mano verslas“ į „Google verslo profilis“ (Google Business Profile).',
        'Yes. In 2021 Google renamed Google My Business to Google Business Profile.',
      ),
      qa(
        'Ar profilis tinka, jei neturiu fizinės vietos klientams?',
        'Does it work if I have no premises for customers to visit?',
        'Taip. Paslaugų teikėjai gali nurodyti aptarnaujamą teritoriją ir paslėpti adresą.',
        'Yes. Service-area businesses can list the area they cover and hide their address.',
      ),
      qa(
        'Per kiek laiko pamatysiu rezultatus?',
        'How soon will I see results?',
        'Sutvarkytas profilis dažnai ima dažniau rodytis per kelias savaites, o atsiliepimai ir reguliarūs įrašai stiprina pozicijas ilgainiui.',
        'A tidied-up profile often starts appearing more within a few weeks, and reviews and regular posts strengthen it over time.',
      ),
    ],
  },
};

export function getServiceDetails(slug) {
  return serviceDetails[slug] ?? {};
}
