# Structured data (schema.org)

Search engines read a single JSON-LD `@graph` block on every page. This project builds it from small, composable functions rather than hand-written JSON.

---

## How it fits together

**Global nodes** are printed on every page by `src/app/[locale]/layout.js`:

| Node | Stable `@id` | Contains |
|---|---|---|
| `Organization` | `#organization` | Name, logo, VAT code, contact point |
| `ProfessionalService` + `LocalBusiness` | `#localbusiness` | NAP, geo, opening hours, area served, price range, rating |
| `WebSite` | `#website` | Site name, language, `SearchAction` |
| `Person` | `#person` | You — the author of every blog post |

**Page nodes** are added by each page:

```jsx
import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, service, faqPage, webPage } from '@/lib/schema/builders';

const schema = [
  webPage({ locale, url: path(locale, 'pricing'), name: title, description }),
  breadcrumb(locale, [{ name: 'Kainos', url: path(locale, 'pricing') }]),
  service({ name: 'WordPress priežiūra', priceFrom: 79, recurring: true }),
  faqPage(items),
];

return <JsonLd locale={locale} nodes={schema} />;
```

`buildGraph()` then merges global and page nodes, removes every empty value, and drops duplicate `@id`s — so you can safely emit `localBusiness()` again on a city page without producing two copies.

Because the ids are stable, nodes reference each other automatically: an `Article` points at `#person` as its author and `#organization` as its publisher, without you wiring it up.

---

## Available builders

All live in `src/lib/schema/builders.js`.

### Always useful

```js
webPage({ locale, url, name, description, datePublished, dateModified, image })
breadcrumb(locale, [{ name, url }])          // the home crumb is added for you
```

### Services and pricing

```js
service({
  name, description, url,
  priceFrom: 79,
  recurring: true,          // emits a monthly UnitPriceSpecification
  areaServed: ['Vilnius'],  // defaults to siteConfig.areaServed
})

offerCatalog({
  name: 'Kainos',
  url: '/kainos',
  offers: [
    { name: 'Augimas', description: '…', price: 179, url: '/kainos', recurring: true },
  ],
})
```

### Content

```js
article({
  locale, url, headline, description, image,
  datePublished, dateModified,
  section: 'SEO',
  wordCount: 1240,
  timeRequired: 'PT7M',     // helper: isoDuration(7)
})

creativeWork({ locale, url, name, description, image, datePublished, keywords })
faqPage([{ question, answer }])
itemList({ name, items: [{ name, url }] })
howTo({ name, description, steps: [{ name, text }], totalTime })
definedTermSet({ name, url, terms: [{ name, description }] })
```

### Trust signals

```js
reviews([{ author, quote, rating: 5, date: '2025-11-10' }])   // returns an array
```

`AggregateRating` is attached to `LocalBusiness` automatically from `aggregateRating` in `src/lib/content/site-content.js`.

### Other

```js
contactPage({ locale, url, name, description })
videoObject({ name, description, thumbnailUrl, uploadDate, embedUrl, duration })
event({ name, description, startDate, endDate, url, locationName, online })
jobPosting({ title, description, datePosted, validThrough, employmentType, salaryMin, salaryMax })
localBusiness(locale)      // for city pages
```

---

## Worked example: adding an FAQ to a new page

```jsx
import { faq } from '@/lib/content/site-content';
import { faqPage } from '@/lib/schema/builders';
import { pick } from '@/lib/utils';

const items = faq
  .filter((f) => f.group === 'technical')
  .map((f) => ({
    question: pick(f.question, locale),
    answer: pick(f.answer, locale),
  }));

const schema = [ …, faqPage(items) ];
```

The same array drives the visible `<Accordion>`, so the markup and the structured data can never disagree — which is exactly what Google's guidelines require.

---

## Worked example: adding location data

City pages already do this. To add a second physical office:

1. Put the address in `siteConfig` (or a new array of locations).
2. Emit an extra node with a distinct `@id`:

```js
{
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#office-kaunas`,
  name: `${siteConfig.name} Kaunas`,
  address: { '@type': 'PostalAddress', streetAddress: '…', addressLocality: 'Kaunas' },
  parentOrganization: { '@id': `${siteConfig.url}/#organization` },
}
```

Give every node its own `@id`, or the de-duplication will keep only the first.

---

## Rules worth keeping

1. **Only mark up what is visible.** Structured data describing content a visitor cannot see is a manual-action risk.
2. **Match exactly.** If the page says €179, the schema must say 179.
3. **One `FAQPage` per page.** Several blocks compete and Google may ignore all of them.
4. **Keep dates in ISO format** (`2026-03-01`). The builders pass them straight through.
5. **Prices are numbers, not strings** — `179`, not `'179 €'`. The currency is a separate field.

---

## Testing

| Tool | Use it for |
|---|---|
| [validator.schema.org](https://validator.schema.org) | Syntax and vocabulary errors |
| [Rich Results Test](https://search.google.com/test/rich-results) | Which rich results you actually qualify for |
| Search Console → Enhancements | Errors on live, indexed pages |

Quick local check:

```bash
npm run build && npm run start
curl -s http://localhost:3000/kainos | grep -o '"@type":"[^"]*"' | sort -u
```
