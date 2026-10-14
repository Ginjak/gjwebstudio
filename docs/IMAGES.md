# Images

Every image on the site is a **labelled placeholder**. Each one shows its exact pixel dimensions and what belongs there, and carries an AI generation prompt that is currently being used as its `alt` text.

---

## How the registry works

All images are declared once in `src/lib/content/images.js`. Components never hard-code a path.

```js
export const heroWorkspace = {
  src: P + 'hero-workspace-1920x1080.png',
  width: 1920,
  height: 1080,
  alt: null,                    // ← you fill this in
  prompt:
    'Photorealistic wide shot of a bright modern home office in Vilnius, a laptop on a light oak desk showing a WordPress dashboard, soft morning light, deep indigo and warm amber accents, shallow depth of field, editorial photography, 16:9',
  blurDataURL: 'data:image/jpeg;base64,…',
};
```

| Field | Why it exists |
|---|---|
| `width` / `height` | Reserves space before the image loads → zero layout shift |
| `blurDataURL` | A 10px preview that renders instantly and blurs up into the real image |
| `prompt` | What to generate. Used as `alt` **only while `alt` is `null`** |
| `alt` | The real alternative text. Overrides the prompt as soon as you set it |

The fallback is one function:

```js
export function imageAlt(img) {
  return img.alt ?? img.prompt;
}
```

---

## Replacing a placeholder — three steps

### 1. Generate or shoot the image

Copy the `prompt` into your image tool, or brief a photographer with it. Produce it at **at least** the stated dimensions — larger is fine, smaller will look soft.

### 2. Drop the file in

Save it to `public/images/` (not `public/images/placeholders/`) and point `src` at it:

```js
export const heroWorkspace = {
  src: '/images/hero-workspace.jpg',
  width: 2400,        // ← the real dimensions of YOUR file
  height: 1350,
  …
};
```

The aspect ratio must match what the layout expects. If you change it, update the `ratio` prop where the image is used.

### 3. Write real alt text — and delete the prompt from `alt`

```js
alt: 'Nešiojamas kompiuteris ant šviesaus ąžuolo stalo su atvertu WordPress valdymo skydeliu',
```

> **This step is not optional.** A generation prompt is not alt text. It describes what you wanted to create, not what a blind visitor needs to know, and leaving prompts in production would fail WCAG 1.1.1 and look careless to search engines.

**Writing good alt text:**
- Describe what matters *in context*, not everything in frame
- Skip "image of" / "photo of" — screen readers already announce that
- Aim for under ~125 characters
- Purely decorative? Set `alt: ''` (empty string, not `null`)
- Text inside the image must be repeated in the alt

---

## Regenerating the blur preview

If you swap the file but keep the old `blurDataURL`, the blur-up will briefly show the wrong colours. Regenerate it:

```bash
node -e "
const sharp=require('sharp');
sharp('public/images/hero-workspace.jpg')
  .resize(10).jpeg({quality:40}).toBuffer()
  .then(b=>console.log('data:image/jpeg;base64,'+b.toString('base64')));
"
```

(`npm i -D sharp` first — it is only needed for this one-off task.)

Alternatively, import the image statically and let Next.js generate the placeholder for you:

```jsx
import hero from '@/../public/images/hero-workspace.jpg';
<Image src={hero} placeholder="blur" alt="…" />
```

Static imports produce the blur automatically, but you lose the central registry, so the project uses explicit values instead.

---

## Using an image in a component

```jsx
import { heroWorkspace } from '@/lib/content/images';
import Media from '@/components/ui/Media';

<Media
  image={heroWorkspace}
  ratio="16/9"                                      // crops to this aspect ratio
  priority                                          // ONLY for the LCP image
  sizes="(min-width: 1024px) 50vw, 100vw"
/>
```

`sizes` tells the browser how wide the image will be so it downloads the right file. Getting it wrong is the single most common cause of a poor LCP score.

| Layout | `sizes` |
|---|---|
| Full width | `100vw` |
| Half on desktop | `(min-width: 1024px) 50vw, 100vw` |
| Three-column grid | `(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw` |
| Fixed small | `96px` |

**Use `priority` on exactly one image per page** — the largest one visible without scrolling. Every other image should lazy-load, which is the default.

---

## The placeholder set

| Key | Size | Subject |
|---|---|---|
| `heroWorkspace` | 1920×1080 | Hero / workspace |
| `personWithLaptop` | 1024×768 | Person with a laptop |
| `authorPortrait` | 600×600 | Author portrait |
| `aboutDesk` | 1200×900 | Desk and notebook |
| `servicesDevelopment` | 1600×900 | WordPress development |
| `servicesMaintenance` | 1600×900 | Maintenance and monitoring |
| `servicesSeo` | 1600×900 | SEO and analytics |
| `contactOffice` | 1000×750 | Home office / meeting |
| `auditReport` | 900×600 | Website audit report |
| `caseEcommerce` … `caseDirectory` | 800×600 | Six case study thumbnails |
| `caseWide1`, `caseWide2` | 1600×1000 | Case study gallery shots |
| `blogSpeed` … `blogWordpressVsWix` | 1200×675 | Five article headers |
| `cityVilnius`, `cityKaunas`, `cityKlaipeda` | 1200×800 | City landing pages |
| `ogDefault` | 1200×630 | Default social share image |

---

## Before launch — checklist

- [ ] Every `src` points at a real image, not `/images/placeholders/`
- [ ] Every `alt` is a real sentence; no prompts remain
- [ ] Decorative images use `alt: ''`
- [ ] `width` and `height` match the actual files
- [ ] `blurDataURL` regenerated for each replacement
- [ ] `ogDefault` (1200×630) replaced — it is what appears when anyone shares a link
- [ ] Exactly one `priority` image per page
- [ ] Photos exported at a sensible quality; Next.js re-encodes to AVIF/WebP, but a 12 MB source still costs build time

Quick audit:

```bash
grep -c "placeholders/" src/lib/content/images.js   # should reach 0
grep -c "alt: null"     src/lib/content/images.js   # should reach 0
```
