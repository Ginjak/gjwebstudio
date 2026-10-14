# Editing content

Everything you will realistically want to change lives in **two folders**:

| Folder | Holds |
|---|---|
| `src/messages/` | UI strings — buttons, labels, navigation, form messages |
| `src/lib/content/` | Page content — services, pricing, projects, blog posts, FAQ, testimonials |

You should never need to open a component to change wording.

---

## 1. The two-language pattern

UI strings are two mirrored JSON files:

```
src/messages/lt.json   ← Lithuanian (the source of truth)
src/messages/en.json   ← English
```

If a key is missing from `en.json`, the Lithuanian value is used instead — the site never renders a blank string or a raw key.

Page content uses objects with both languages side by side, so a translation can never drift away from the thing it describes:

```js
name: {
  lt: 'WordPress priežiūra',
  en: 'WordPress care plans',
},
```

Anywhere you see `pick(value, locale)` in a component, it is reading from one of these.

---

## 2. Changing business details

`src/config/site.config.js` — one file, used by the header, footer, contact page, metadata, sitemap and all structured data.

```js
name: 'GJ Web Studio',
email: 'labas@gjwebstudio.lt',      // TODO
phone: '+370 600 00000',            // TODO
address: { street, locality, postalCode, country },
geo: { latitude, longitude },       // TODO exact coordinates
registry: { companyCode, vatCode }, // TODO
bookingUrl: '',                     // set this and a "Book a call" button appears
```

> **NAP consistency matters.** Name, address and phone must be written identically here, on your Google Business Profile and in every directory listing. Even "g." versus "gatvė" weakens local SEO.

### Feature switches

```js
features: {
  blog: true,
  projects: true,
  pricingCalculator: true,
  freeAudit: true,
  newsletter: true,
  cityPages: true,
  uptimeBadge: false,   // shows "All systems operational" in the footer
  darkMode: true,
}
```

---

## 3. Prices

`src/lib/content/pricing.js`. Change a number here and it updates the pricing page, the homepage preview, the comparison table, the calculator and the `OfferCatalog` structured data at the same time.

```js
{
  id: 'augimas',
  monthly: 179,          // annual price is derived: 10/12 = 2 months free
  featured: true,        // renders the "Most popular" badge
  hours: 3,
  name:    { lt: 'Augimas',  en: 'Growth' },
  tagline: { lt: '…',        en: '…' },
  features:{ lt: [...],      en: [...] },
}
```

Changing the annual discount: edit `annualise()` at the top of the file.

Adding a plan: add the object, then add a column value for it in every row of `comparison` further down (missing values render as "not included", which is safe but usually not what you meant).

---

## 4. Adding a service

1. Add an entry to `src/lib/content/services.js`:

```js
{
  slug: 'nauja-paslauga',      // shared by both languages — never translate it
  icon: 'bolt',                // any name from src/components/ui/Icon.jsx
  priceFrom: 500,
  recurring: false,            // true renders "/ month"
  order: 9,
  name:     { lt: '…', en: '…' },
  excerpt:  { lt: '…', en: '…' },   // used on cards and in meta description
  body:     { lt: '…', en: '…' },   // the long paragraph on the detail page
  features: { lt: [...], en: [...] },
  idealFor: { lt: '…', en: '…' },
}
```

2. That is it. The detail page at `/paslaugos/nauja-paslauga` (and `/en/services/nauja-paslauga`), the services grid, the homepage accordion, the footer menu, the sitemap and the `Service` schema are all generated from that object.

---

## 5. Adding a blog post

`src/lib/content/posts.js`. The body is an array of blocks rather than HTML, which keeps it safe (nothing is ever injected with `dangerouslySetInnerHTML`) and lets the table of contents build itself.

```js
{
  slug: 'mano-straipsnis',
  date: '2026-03-01',
  updated: '2026-03-14',      // optional — shown as "Updated …" and in schema
  category: 'seo',            // id from postCategories
  image: blogSeo,             // imported from ./images
  readingTime: 7,             // minutes
  title:   { lt: '…', en: '…' },
  excerpt: { lt: '…', en: '…' },
  body: [
    { type: 'p',  text: { lt: '…', en: '…' } },
    { type: 'h2', text: { lt: '…', en: '…' } },   // becomes a TOC entry
    { type: 'h3', text: { lt: '…', en: '…' } },
    { type: 'ul', items: { lt: ['…'], en: ['…'] } },
    { type: 'ol', items: { lt: ['…'], en: ['…'] } },
    { type: 'quote',   text: {…}, cite: {…} },
    { type: 'callout', text: {…} },               // highlighted box
  ],
}
```

Only `h2` blocks appear in the table of contents.

### Moving to headless WordPress later

`posts.js` exports `sortedPosts()`, `getPost()`, `getPostsByCategory()` and `getRelatedPosts()`. Re-implement those four functions against WPGraphQL, returning the same object shape, and no page or component needs to change.

---

## 6. Adding a case study

`src/lib/content/projects.js`. Metrics are what make a case study persuasive — always include at least three with a real number.

```js
{
  slug: 'kliento-projektas',
  featured: true,               // renders as the wide card on the homepage
  year: 2026,
  categories: ['ecommerce'],    // ids from projectCategories
  services: ['woocommerce'],    // service slugs — renders links back to them
  image: caseEcommerce,
  gallery: [caseWide1],
  client:    { lt: '…', en: '…' },
  title:     { lt: '…', en: '…' },
  excerpt:   { lt: '…', en: '…' },
  challenge: { lt: '…', en: '…' },
  solution:  { lt: '…', en: '…' },
  outcome:   { lt: '…', en: '…' },
  metrics: [{ value: '+38 %', label: { lt: '…', en: '…' } }],
  testimonial: { quote: {…}, author: {…} },   // optional
}
```

---

## 7. FAQ, testimonials, process, values, cities

All in `src/lib/content/site-content.js`.

- **`faq`** — every entry has a `group` (`general`, `pricing`, `process`, `technical`). The FAQ page renders them grouped; the pricing, services and contact pages each pull their relevant group and emit matching `FAQPage` schema.
- **`testimonials`** — also feed `Review` and `AggregateRating` schema. Keep `date` accurate.
- **`processSteps`** — shown on the home, services, about and city pages, and emitted as `HowTo` schema.
- **`cities`** — each entry generates a local SEO landing page. **Write genuinely local content.** Twenty pages where only the city name changes is spam and Google treats it as such.

---

## 8. Adding a whole new page

Say you want a "Glossary" page at `/zodynas` and `/en/glossary`.

**Step 1 — register the route** in `src/config/routes.js`:

```js
export const routes = {
  …
  glossary: { lt: 'zodynas', en: 'glossary' },
};
```

**Step 2 — create the file** using the **Lithuanian** slug as the folder name:

```
src/app/[locale]/zodynas/page.js
```

**Step 3 — write the page:**

```jsx
import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, webPage } from '@/lib/schema/builders';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'glossary',
    title: 'Žodynas',
    description: '…',
  });
}

export default async function GlossaryPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  return (
    <>
      <JsonLd
        locale={locale}
        nodes={[
          webPage({ locale, url: path(locale, 'glossary'), name: 'Žodynas' }),
          breadcrumb(locale, [{ name: 'Žodynas', url: path(locale, 'glossary') }]),
        ]}
      />
      <Hero title="Žodynas" body="…" />
      <Section header={false}>…</Section>
    </>
  );
}
```

**Step 4 — link to it.** Never hard-code a URL; always use `path()`:

```jsx
<Link href={path(locale, 'glossary')}>Žodynas</Link>
```

**Step 5 — add it to the sitemap** in `src/app/sitemap.js` (`staticKeys` array) and, if it belongs in the menus, to `navItems` in `src/app/[locale]/layout.js` or the column arrays in `src/components/layout/Footer.jsx`.

---

## 9. Adding a third language

1. `src/config/routes.js` — add the code to `locales`, plus entries in `localeNames`, `localeShort`, `localeTags`, `localeOg`, and a slug for it in every `routes` entry.
2. `src/messages/` — copy `lt.json` to e.g. `pl.json` and translate.
3. `src/i18n/dictionaries.js` — add the loader line.
4. `src/lib/content/*.js` — add the new key next to `lt` and `en` in each object.

Metadata, hreflang, the sitemap, the switcher and the middleware all read from `locales`, so nothing else changes.

---

## 10. Section component props

Every section takes the same shape, so laying out a new page is mostly copy-and-paste:

```jsx
<Section
  id="anchor"                    // anchor + aria-labelledby
  eyebrow="Small label"
  title="Section heading"
  headingLevel={2}               // keeps the document outline correct
  lead="Intro paragraph"
  background="default"           // default | alt | dark | accent | none
  align="left"                   // left | center
  width="default"                // default | wide | narrow
  space={1}                      // vertical rhythm multiplier
  actions={<Button … />}
  header={false}                 // render children only
>
  …
</Section>
```

Buttons:

```jsx
<Button
  label="Susisiekti"
  href="/kontaktai"              // or onClick for a real <button>
  variant="primary"              // primary | secondary | ghost | link | icon
  size="md"                      // sm | md | lg
  icon={<Icon name="arrowRight" />}
  external                       // adds rel + a hidden "opens in a new window"
  full                           // 100% width
/>
```

Scroll animations:

```jsx
<Reveal animation="fade-up" delay={80}>…</Reveal>
```

`animation`: `fade-up` · `fade` · `zoom` · `slide-left` · `slide-right` · `none`.
Stagger a list by multiplying `delay` by the index. All of it switches off automatically under `prefers-reduced-motion`.
