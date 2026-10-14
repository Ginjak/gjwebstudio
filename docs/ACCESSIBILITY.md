# Accessibility

Target: **WCAG 2.2 level AA**, which is also what the European Accessibility Act expects of most commercial websites from 2025.

---

## What is built in

### Structure and navigation
- One `<h1>` per page, headings in order, no levels skipped (`Section` takes a `headingLevel` prop so you cannot accidentally break the outline)
- Landmarks: `<header>`, `<nav>`, `<main id="main">`, `<footer>`, plus `aria-labelledby` on every section that has a heading
- Skip link as the first focusable element on the page
- Breadcrumbs on every subpage, matching the `BreadcrumbList` schema
- `aria-current="page"` on the active navigation item

### Keyboard
- Everything operable without a mouse
- `:focus-visible` rings everywhere — 3px, and 4px in high-contrast mode
- Focus trap plus <kbd>Esc</kbd> in the mobile menu, cookie settings dialog and accessibility panel; focus returns to the trigger on close
- Services accordion is a real `tablist` with arrow-key, <kbd>Home</kbd> and <kbd>End</kbd> navigation
- Horizontally scrollable tables are focusable (`tabindex="0"` with `role="region"`) so keyboard users can scroll them

### Forms
- Every field has a real `<label>`; placeholders are never used as labels
- Errors are linked with `aria-describedby`, marked with `aria-invalid`, and shown as **icon + text + colour**, never colour alone
- An error summary appears above the form and receives focus on failed submission
- Success and failure are announced through `role="alert"` / `role="status"`
- Required fields are marked visually and with `aria-required`

### Visual
- Text contrast at least 4.5:1, large text 3:1, UI borders 3:1
- Nothing conveyed by colour alone
- Minimum 44×44px targets on buttons and links (WCAG 2.2 §2.5.8 asks for 24px; 44 is the comfortable figure)
- Layout works at 200% zoom and at 320px wide with no horizontal scrolling
- `maximumScale: 5` — pinch-zoom is never blocked

### Motion
- Every animation uses `transform`/`opacity` only
- `@media (prefers-reduced-motion: reduce)` disables all of it
- The accessibility panel can also force it off, independently of the OS setting
- No autoplay, no parallax that moves against the scroll direction

---

## The accessibility panel

A floating button, bottom-left on every page. Settings persist in `localStorage` and are applied **before first paint** by `NoFlashScript`, so there is no flash of the wrong theme.

| Setting | Effect |
|---|---|
| Text size | 100% / 115% / 130% via `--font-scale` on `<html>` |
| Dark theme | `data-theme="dark"` |
| High contrast | `data-contrast="high"` — pure black on white, heavier focus rings, decorative shapes hidden |
| Reduce motion | `data-reduce-motion="true"` |
| Underline links | `data-underline-links="true"` |
| Dyslexia-friendly font | `data-dyslexic="true"` — wider tracking, simpler letterforms |
| Increased spacing | `data-spacing="wide"` — line height 2, wider word spacing |
| Reset | Clears everything |

Each one is a `role="switch"` with `aria-checked`, labelled by the adjacent text.

> The panel is a convenience, not a substitute. The underlying markup passes AA with every switch turned off.

---

## Keeping it compliant

### When you add a component
1. Is it reachable and operable with <kbd>Tab</kbd> alone?
2. Does the focus ring show clearly against its background?
3. If it opens something, does <kbd>Esc</kbd> close it and return focus?
4. Do icon-only buttons have a `.sr-only` label?
5. Is any state change announced, or is it silent to a screen reader?
6. Does contrast hold in light, dark **and** high-contrast modes?

### When you add content
1. Every meaningful image has alt text; decorative ones use `alt=""` — see `docs/IMAGES.md`
2. Link text makes sense out of context ("View pricing", not "click here")
3. Headings follow the existing order
4. Tables have `<th scope>` and a caption
5. If you embed video, provide captions and a transcript

---

## Testing

**Automated** (catches roughly 30% of issues):

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000 --only-categories=accessibility --view
```

Also useful: the axe DevTools browser extension, and WAVE.

**Manual** (catches the rest — do this before launch):

1. **Unplug the mouse.** Reach every link, button, form field and dialog. Can you always see where you are?
2. **Zoom to 200% and 400%.** Nothing clipped, no horizontal scrollbar.
3. **Screen reader pass** — VoiceOver (⌘F5 on macOS) or NVDA (free, Windows). Navigate by headings, then by landmarks. Does the page make sense?
4. **Turn on reduced motion** in your OS and reload. Nothing should move.
5. **Greyscale the page** in DevTools. Is anything now impossible to understand?
6. **Submit the contact form empty.** Is the error announced, and does focus land somewhere useful?

---

## The public statement

`/prieinamumas` (and `/en/accessibility`) is generated from `accessibilityStatement` in `src/lib/content/legal.js`.

Before launch, fill in:
- The contact email and phone for accessibility feedback
- Any known limitations — being honest about a gap is far better than claiming full conformance you have not verified
- The date you last tested

Review it annually, and after any significant redesign.

---

## Known constraints

- **Dyslexia-friendly font** uses system fonts (Comic Sans MS / Trebuchet MS) rather than bundling OpenDyslexic, which would add ~40KB. Swap it in `globals.scss` under `[data-dyslexic='true']` if you prefer.
- **Third-party embeds** (maps, video, chat) are outside this project's control. Anything you add must be audited separately.
- **Automated tools miss context.** A perfect Lighthouse score is a starting point, not a certificate.
