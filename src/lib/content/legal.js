/**
 * ---------------------------------------------------------------------------
 * LEGAL CONTENT
 * ---------------------------------------------------------------------------
 * Template text for the privacy, cookie and accessibility pages.
 *
 * >>> IMPORTANT <<<
 * These are practical, GDPR-shaped drafts — not legal advice. Have them
 * reviewed by a lawyer, and fill in every  [PLACEHOLDER]  before launch.
 * ---------------------------------------------------------------------------
 */

export const privacyPolicy = {
  updated: '2026-01-01',
  sections: [
    {
      title: { lt: 'Kas tvarko jūsų duomenis', en: 'Who processes your data' },
      body: {
        lt: 'Duomenų valdytojas yra [ĮMONĖS PAVADINIMAS], įmonės kodas [KODAS], adresas [ADRESAS]. Klausimais dėl duomenų rašykite [EL. PAŠTAS].',
        en: 'The data controller is [COMPANY NAME], company code [CODE], registered at [ADDRESS]. For any data questions write to [EMAIL].',
      },
    },
    {
      title: { lt: 'Kokius duomenis renkame', en: 'What data we collect' },
      list: {
        lt: [
          'Kontaktinės formos duomenys: vardas, el. paštas, telefonas, įmonė, svetainės adresas ir jūsų žinutė.',
          'Techniniai duomenys: IP adresas (laikinai, apsaugai nuo šiukšlių), naršyklės tipas, apsilankymo laikas.',
          'Analitikos duomenys: tik jei sutikote su analitikos slapukais.',
        ],
        en: [
          'Contact form data: name, email, phone, company, website address and your message.',
          'Technical data: IP address (temporarily, for spam protection), browser type, visit time.',
          'Analytics data: only if you accepted analytics cookies.',
        ],
      },
    },
    {
      title: { lt: 'Kodėl juos tvarkome', en: 'Why we process it' },
      body: {
        lt: 'Kontaktinių formų duomenis tvarkome jūsų sutikimo pagrindu ir siekdami atsakyti į užklausą (teisėtas interesas). Analitikos duomenis — tik jūsų sutikimo pagrindu. Sutikimą galite atšaukti bet kada per slapukų nustatymus poraštėje.',
        en: 'Contact form data is processed on the basis of your consent and to answer your enquiry (legitimate interest). Analytics data is processed only with your consent, which you can withdraw at any time via the cookie settings in the footer.',
      },
    },
    {
      title: { lt: 'Kiek laiko saugome', en: 'How long we keep it' },
      body: {
        lt: 'Užklausų duomenis saugome iki 24 mėnesių nuo paskutinio susirašinėjimo. Sutarčių ir apskaitos dokumentus — teisės aktų nustatytą laiką (paprastai 10 metų). Analitikos duomenis — 14 mėnesių.',
        en: 'Enquiry data is kept for up to 24 months after our last correspondence. Contracts and accounting records are kept for the period required by law (typically 10 years). Analytics data is retained for 14 months.',
      },
    },
    {
      title: { lt: 'Kam perduodame', en: 'Who we share it with' },
      list: {
        lt: [
          'El. pašto siuntimo paslauga (Resend) — užklausoms pristatyti.',
          'Talpinimo paslaugų teikėjas — svetainės veikimui.',
          'Google Analytics — tik su jūsų sutikimu.',
          'Duomenų niekada neparduodame ir neperduodame reklamos tikslais.',
        ],
        en: [
          'Email delivery provider (Resend) — to deliver your enquiry.',
          'Hosting provider — to run the website.',
          'Google Analytics — only with your consent.',
          'We never sell your data or share it for advertising purposes.',
        ],
      },
    },
    {
      title: { lt: 'Jūsų teisės', en: 'Your rights' },
      list: {
        lt: [
          'Susipažinti su savo duomenimis',
          'Reikalauti juos ištaisyti ar ištrinti',
          'Apriboti tvarkymą arba jam nesutikti',
          'Perkelti duomenis kitam valdytojui',
          'Atšaukti sutikimą bet kada',
          'Pateikti skundą Valstybinei duomenų apsaugos inspekcijai (vdai.lrv.lt)',
        ],
        en: [
          'Access the data we hold about you',
          'Ask for it to be corrected or erased',
          'Restrict or object to processing',
          'Port your data to another controller',
          'Withdraw consent at any time',
          'Lodge a complaint with the Lithuanian State Data Protection Inspectorate (vdai.lrv.lt)',
        ],
      },
    },
  ],
};

export const cookiePolicy = {
  updated: '2026-01-01',
  intro: {
    lt: 'Slapukai yra maži tekstiniai failai, saugomi jūsų naršyklėje. Šioje svetainėje naudojame tik tuos, kurie būtini veikimui, ir tuos, kuriems davėte sutikimą.',
    en: 'Cookies are small text files stored in your browser. This site uses only those necessary for it to work, plus any you have consented to.',
  },
  table: [
    {
      name: 'gj_consent',
      category: { lt: 'Būtinas', en: 'Necessary' },
      purpose: {
        lt: 'Įsimena jūsų slapukų pasirinkimą, kad nereikėtų klausti kaskart.',
        en: 'Remembers your cookie choice so you are not asked every visit.',
      },
      duration: { lt: '12 mėn.', en: '12 months' },
    },
    {
      name: 'NEXT_LOCALE',
      category: { lt: 'Būtinas', en: 'Necessary' },
      purpose: {
        lt: 'Įsimena pasirinktą kalbą.',
        en: 'Remembers your language choice.',
      },
      duration: { lt: '12 mėn.', en: '12 months' },
    },
    {
      name: 'gj_a11y',
      category: { lt: 'Būtinas', en: 'Necessary' },
      purpose: {
        lt: 'Saugomas naršyklėje (localStorage): jūsų prieinamumo nustatymai — teksto dydis, tema, kontrastas.',
        en: 'Stored in the browser (localStorage): your accessibility settings — text size, theme, contrast.',
      },
      duration: { lt: 'Kol ištrinsite', en: 'Until you clear it' },
    },
    {
      name: '_ga, _ga_*',
      category: { lt: 'Analitika', en: 'Analytics' },
      purpose: {
        lt: 'Google Analytics — anoniminė lankomumo statistika. Įrašomi tik gavus sutikimą.',
        en: 'Google Analytics — anonymous usage statistics. Only set after you consent.',
      },
      duration: { lt: '14 mėn.', en: '14 months' },
    },
  ],
};

export const accessibilityStatement = {
  updated: '2026-01-01',
  level: 'WCAG 2.2 AA',
  sections: [
    {
      title: { lt: 'Mūsų įsipareigojimas', en: 'Our commitment' },
      body: {
        lt: 'Siekiame, kad šia svetaine galėtų naudotis visi, nepriklausomai nuo negalios ar naudojamų pagalbinių technologijų. Svetainė kurta siekiant atitikti WCAG 2.2 AA lygį ir Europos prieinamumo akto reikalavimus.',
        en: 'We want everyone to be able to use this website, regardless of disability or assistive technology. It is built to meet WCAG 2.2 level AA and the requirements of the European Accessibility Act.',
      },
    },
    {
      title: { lt: 'Ką padarėme', en: 'What we have done' },
      list: {
        lt: [
          'Visa svetainė valdoma klaviatūra, su matomu fokuso žymekliu',
          'Semantinė HTML struktūra ir teisinga antraščių hierarchija',
          'Teksto ir fono kontrastas ne mažesnis nei 4,5:1',
          'Visos prasmę turinčios nuotraukos turi alternatyvųjį tekstą',
          'Formų laukai turi etiketes, klaidos aprašomos tekstu, ne tik spalva',
          'Gerbiamas prefers-reduced-motion nustatymas',
          'Prieinamumo nustatymų skydelis: teksto dydis, kontrastas, tamsi tema, animacijų mažinimas',
        ],
        en: [
          'The entire site is keyboard operable with a visible focus indicator',
          'Semantic HTML structure and a correct heading hierarchy',
          'Text contrast of at least 4.5:1 against its background',
          'Every meaningful image has alternative text',
          'Form fields are labelled and errors are described in text, not colour alone',
          'The prefers-reduced-motion setting is respected',
          'An accessibility settings panel: text size, contrast, dark theme, reduced motion',
        ],
      },
    },
    {
      title: { lt: 'Žinomi apribojimai', en: 'Known limitations' },
      body: {
        lt: 'Šiuo metu žinomų neatitikimų nėra. Jei radote problemą, praneškite — ištaisysime per 10 darbo dienų.',
        en: 'We are not currently aware of any non-conformities. If you find a problem, please tell us — we aim to fix it within 10 business days.',
      },
    },
    {
      title: { lt: 'Grįžtamasis ryšys', en: 'Feedback' },
      body: {
        lt: 'Jei susidūrėte su kliūtimi naudodamiesi šia svetaine, rašykite [EL. PAŠTAS] arba skambinkite [TELEFONAS]. Atsakysime per 5 darbo dienas.',
        en: 'If you hit a barrier while using this site, email [EMAIL] or call [PHONE]. We will respond within 5 business days.',
      },
    },
  ],
};
