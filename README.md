# GJ Web Studio

A bilingual (Lithuanian / English) marketing website for a WordPress development, maintenance and SEO business.

Built with **Next.js 15 (App Router)**, **React 19**, plain **JavaScript** and **Sass Modules**. No Tailwind, no CSS-in-JS, no animation library — the whole site ships around 103 KB of shared JavaScript.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional — the site runs without it
npm run dev                    # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (79 static pages) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier across `src/` |

**Requirements:** Node.js 18.18 or newer. Nothing else — no database, no CMS, no external services are needed to run it.

---

## First 30 minutes — what to change

Everything below is marked with `TODO` in the code.

1. **`src/config/site.config.js`** — business name, email, phone, address, company code, VAT code, social links, opening hours, coordinates.
2. **`src/lib/content/pricing.js`** — plan prices, package prices, hourly rate.
3. **`src/lib/content/projects.js`** — replace the six sample case studies with real ones.
4. **`src/lib/content/site-content.js`** — testimonials, FAQ, stats, values.
5. **`src/lib/content/legal.js`** — fill in every `[PLACEHOLDER]` and have a lawyer read it.
6. **`src/lib/content/images.js`** — swap the placeholder images and write real alt text (see `docs/IMAGES.md`).
7. **`.env.local`** — `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `NEXT_PUBLIC_GA_ID`.

---

## Project structure

```
src/
├── app/
│   ├── layout.js                  Root layout (global CSS only)
│   ├── sitemap.js robots.js       Generated at build time
│   ├── rss.xml/ manifest.js       Feed and PWA manifest
│   ├── api/contact/route.js       Form handler
│   └── [locale]/                  Every page. Folder names = Lithuanian slugs
│       ├── layout.js              <html lang>, header, footer, consent, a11y
│       ├── page.js                Home
│       ├── paslaugos/[slug]/      Services + detail
│       ├── kainos/                Pricing
│       ├── darbai/[slug]/         Work + case study
│       ├── tinklarastis/[slug]/   Blog + article
│       ├── apie/ kontaktai/ duk/  About, contact, FAQ
│       ├── atsiliepimai/          Testimonials
│       ├── nemokamas-auditas/     Free audit landing page
│       ├── wordpress-kurimas/[city]/   Local SEO city pages
│       └── privatumo-politika/ …  Legal pages
│
├── components/
│   ├── ui/          Button, Section, Card, Field, Accordion, Media, Reveal…
│   ├── layout/      Header, Footer, Logo, LocaleSwitcher, SkipLink, BackToTop
│   ├── sections/    Hero, WorkGrid, PricingTable, ContactForm, CTABanner…
│   ├── a11y/        AccessibilityPanel, NoFlashScript
│   └── cookies/     ConsentProvider, CookieBanner, Analytics
│
├── config/          site.config.js (business data) · routes.js (URLs + locales)
├── lib/
│   ├── content/     All page content — services, pricing, projects, posts, images
│   ├── schema/      Schema.org builders + <JsonLd>
│   ├── seo/         Metadata helper
│   └── forms/       Shared validation (runs on client AND server)
├── messages/        lt.json · en.json — UI strings only
└── styles/          _tokens.scss · _mixins.scss · globals.scss
```

`_tokens.scss` and `_mixins.scss` are auto-injected into every `.scss` file by `next.config.mjs`, so component styles never need to import them.

---

## How it works

### Languages
Lithuanian is the default and has **no URL prefix** (`/kainos`). English is prefixed and uses **translated slugs** (`/en/pricing`).

`src/middleware.js` rewrites the public English URL onto the internal Lithuanian folder, so one page file serves both languages. Add a language or a route in `src/config/routes.js` — see `docs/CONTENT.md`.

### Content vs. UI strings
- **UI chrome** (buttons, labels, nav) → `src/messages/*.json`
- **Page content** (services, prices, posts) → `src/lib/content/*.js` with `{ lt: …, en: … }` side by side, so translations can never drift apart.

### Structured data
Global `Organization`, `LocalBusiness`, `WebSite` and `Person` nodes are emitted on every page. Any page can add more by passing an array to `<JsonLd>`. See `docs/SCHEMA.md`.

### Images
Every image is declared once in `src/lib/content/images.js` with width, height and a base64 blur preview. See `docs/IMAGES.md`.

---

## Accessibility

Targets **WCAG 2.2 level AA** and the European Accessibility Act.

- Skip link, semantic landmarks, correct heading order
- Full keyboard operation; focus trap and <kbd>Esc</kbd> on the mobile menu, cookie dialog and accessibility panel
- Visible `:focus-visible` rings everywhere, 44px minimum touch targets
- Form errors announced via `role="alert"`, linked with `aria-describedby`, never signalled by colour alone
- `prefers-reduced-motion` respected by every animation
- **Accessibility panel** (bottom-left button): text size, dark theme, high contrast, reduced motion, underlined links, dyslexia-friendly font, increased spacing — persisted in `localStorage` and applied before first paint so there is no flash

Run an audit with Lighthouse, then test manually with the keyboard only and with a screen reader.

---

## Cookies & analytics

- Banner offers **Accept all / Reject non-essential / Settings** with equal prominence
- Categories: Necessary (locked), Analytics, Marketing
- Choice stored in a first-party cookie for 12 months and mirrored to `sessionStorage`
- **Google Consent Mode v2** defaults to denied; GA4 is only injected after consent
- Footer link "Slapukų nustatymai" reopens the dialog at any time
- Bump `CONSENT_VERSION` in `ConsentProvider.jsx` when the policy changes and everyone is asked again

---

## Contact form

`POST /api/contact` handles the contact form, the audit request and newsletter sign-ups.

Protection, in order: honeypot field → 3-second time trap → 5 requests per IP per 10 minutes → optional Cloudflare Turnstile → full server-side re-validation.

Delivery uses the Resend HTTP API through plain `fetch` (no extra dependency). **Without `RESEND_API_KEY` the form still works** — submissions are validated and printed to the server console, which is convenient in development.

To use SMTP instead, replace the single `fetch` call at the bottom of `src/app/api/contact/route.js`.

---

## Deployment

### Vercel (simplest)
Push to Git, import the repository, add the environment variables from `.env.example`. Nothing else to configure.

### Any Node host
```bash
npm ci
npm run build
npm run start      # listens on PORT, default 3000
```

### Static export
Not supported as-is: the contact API and middleware need a Node runtime. Everything else is already static.

**After going live:**
1. Set `NEXT_PUBLIC_SITE_URL` to the real domain — canonicals, hreflang and the sitemap all depend on it.
2. Submit `https://yourdomain.lt/sitemap.xml` in Google Search Console.
3. Verify the site in Search Console and put the code in `NEXT_PUBLIC_GSC_VERIFICATION`.
4. Test the structured data at [validator.schema.org](https://validator.schema.org).
5. Check `Content-Security-Policy` in `next.config.mjs` if you add third-party scripts.

---

## Performance notes

- Server Components by default; client JavaScript only in the header, forms, filters, cookie banner, accessibility panel and price calculator
- Fonts (Plus Jakarta Sans + Inter) self-hosted as subset variable WOFF2 via `next/font/local` (`src/fonts/`) — no request to Google, preloaded, no layout shift
- AVIF/WebP images with blur-up placeholders and explicit dimensions
- Animations use `transform`/`opacity` only and are disabled under reduced motion
- One year immutable cache on `/images/*`

Check regressions with `npx lighthouse http://localhost:3000 --view` after `npm run start`.

---

## Documentation

| File | Covers |
|---|---|
| `docs/CONTENT.md` | Editing copy, adding pages, services, posts, projects, languages |
| `docs/SCHEMA.md` | Extending structured data per page |
| `docs/IMAGES.md` | Replacing placeholders and writing alt text |
| `docs/ACCESSIBILITY.md` | What was done and how to keep it compliant |

---

## Licence

Private project. The Plus Jakarta Sans and Inter fonts are licensed under the SIL Open Font License.
