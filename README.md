# Master in Diving

A one-page multilingual site for Konstantin ("Kostya") Donets — his story, and a
direct way to support his rehabilitation. Russian, Ukrainian and English.

Static Next.js. No backend, no database, no payment processing: the page shows
payment details and copies them to the clipboard, nothing more.

---

## Running it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. `/` picks a language from the visitor's cookie,
then their browser languages, then falls back to Russian, and redirects to
`/ru`, `/uk` or `/en`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (prerenders all three languages) |
| `npm start` | Serves the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run images` | Regenerates photos and QR codes from `source-photos/` |
| `npm run fonts` | Re-cuts the handwriting font (only after editing that one line) |

---

## Language choice

`components/LanguageGate.tsx` shows a blocking "choose your language" modal
the first time a visitor arrives with no language cookie set. Picking one
writes the same `NEXT_LOCALE` cookie the header's language switcher already
uses (`config/site.ts` `LOCALE_COOKIE`) — there's no separate localStorage —
so a later visit to `/` redirects straight to that language (see `proxy.ts`),
and the modal never shows again. The header switcher still works normally at
any time and updates the same cookie.

The modal's own text is hardcoded in three languages at once in
`LanguageGate.tsx` (it has to be — no locale is known yet), unlike everything
else on the page, which comes from `content/<lang>.ts`.

## Collapsible sections

Most sections are wrapped in `components/CollapsibleSection.tsx` — a full-
width heading button with a chevron, several of which can be open at once.
Support (`components/Donate.tsx`) and FAQ (`components/Faq.tsx`) are the
exceptions and stay fully visible, though each FAQ question is still its own
small accordion. "About me" (`components/Story.tsx`) defaults open, since it
and the hero photo are meant to be the page's emotional centre; Creations and
Updates default closed.

---

## Changing the payment details

Everything lives in **`config/payments.ts`**. Change a value there and it updates
on the page, in the clipboard and in the QR code at once — nothing is duplicated
anywhere else.

```ts
{
  id: 'monobank',
  masked: '4441 •••• •••• 7984',   // shown before "reveal" is pressed
  display: '4441 1110 2260 7984',  // shown after, grouped for reading
  clipboard: '4441111022607984',   // exactly what gets copied — no spaces
  requiresReveal: true,            // false shows the value straight away
  qr: false,                       // true also renders a QR of `clipboard`
}
```

After changing a value with `qr: true`, regenerate the code:

```bash
npm run images
```

Button labels ("Show card number", "Copy address", …) are translated text and
live in `content/ru.ts`, `content/uk.ts` and `content/en.ts` under
`donate.methods`.

**Current details on the site**

| Method | Value |
| --- | --- |
| Monobank | 4441 1110 2260 7984 |
| PayPal | master.in.diving@gmail.com |
| Crypto | TBjNL453YC4qz44ZhsBpgeVtrgLVu6ZU3t — network: TRON (TRC20) |

The network name lives on `PaymentMethod.network` in `config/payments.ts` (not
localised); the label in front of it ("Сеть" / "Мережа" / "Network") is
`donate.methods.crypto.networkLabel` in each content file.

A `PaymentCopy` can also carry an optional `linkUrl` + `linkLabel` — a small
link rendered under the value, e.g. "How to send crypto via an exchange".
Both are unset by default; set them in a content file once there is a real
URL to point at.

---

## Adding an update

Updates live in **`content/updates.ts`**. The array ships empty, and while it is
empty the whole section and its navigation link are not rendered — no
placeholder entries.

Add newest first:

```ts
export const UPDATES: readonly UpdateEntry[] = [
  {
    date: '2026-09-20',                 // ISO 8601, formatted per language
    title: {
      ru: 'Новый курс реабилитации',
      uk: 'Новий курс реабілітації',
      en: 'A new course of rehabilitation',
    },
    text: {
      ru: 'Одна–три строки о том, что произошло.',
      uk: 'Один–три рядки про те, що сталося.',
      en: 'One to three lines about what happened.',
    },
  },
];
```

All three languages are required — the type will not compile otherwise. The
first three entries are shown; the rest appear behind "All updates".
Change `UPDATES_VISIBLE` in the same file to show more or fewer.

---

## Adding a creation ("My art")

Paintings live in **`content/creations.ts`**, shown as a gallery grid with a
lightbox. Unlike Updates, the section and its nav link stay visible while the
array is empty — an "empty" line is shown instead, since this started as
scaffolding ahead of real photos.

Each entry goes through the same responsive AVIF/WebP/JPEG pipeline as the
hero and story photos, just with a dynamic file list instead of a hand-picked
one. Drop the original into `source-photos/creations/` (any name — it becomes
the `id`) and run:

```bash
npm run images
```

It prints each photo's width/height/aspect and which of the three
breakpoints (480 / 900 / 1400px) actually got generated — a photo already
narrower than a breakpoint just skips it. Copy those numbers into a new
entry:

```ts
export const CREATIONS: readonly CreationItem[] = [
  {
    id: 'painting-1',            // public/creations/painting-1-480.avif, etc.
    widths: [480, 900, 1400],    // from the npm run images output
    width: 1500,                 // ditto — the source photo's own size
    height: 1800,
    alt: { ru: '…', uk: '…', en: '…' },
    sizeCm: '40 × 50',           // omit entirely if the size isn't known
  },
];
```

`sizeCm` is plain text, shown with the localised unit word
(`creations.unitCm`, "см" / "cm") appended under the thumbnail and in the
lightbox. There is deliberately no price or sold/available field — none was
ever provided, and the spec forbids inventing one; add those to
`content/types.ts` (`CreationItem`) and the two components
(`components/Creations.tsx`, `components/Lightbox.tsx`) if that information
becomes available later.

A photo with a size caption baked into the photo itself (rather than the
painting) should have that cropped off *before* it goes into
`source-photos/creations/` — see the git history for how the first batch was
cleaned up with `sharp` crops that only touched the surrounding wall/backdrop,
never the artwork.

---

## Editing the FAQ

Questions live under `faq.items` in each of `content/ru.ts`, `content/uk.ts` and
`content/en.ts`. Each entry is `{ q, a }`, and the three files must stay in the
same order — item 3 in Russian is item 3 in English.

```ts
faq: {
  title: 'Часто задаваемые вопросы',
  showAll: 'Показать все вопросы',
  items: [
    { q: 'Вопрос?', a: 'Ответ.' },
  ],
}
```

The first eight are open to browse; the rest appear behind "Show all questions".
That number is `FAQ_VISIBLE` in `content/index.ts`.

Everything else on the page is edited the same way — `content/<lang>.ts` holds
all copy, and `content/types.ts` describes the shape, so a missing translation
is a compile error rather than a blank spot on the page.

---

## Photos

Originals live in `source-photos/`; `public/photos/` is generated and committed.

```
source-photos/kostya-hero.jpg    -> hero, right-hand side of the first screen
source-photos/kostya-story.jpg   -> "My story"
```

To replace one, drop in a new file under the same name and run:

```bash
npm run images
```

That writes AVIF, WebP and JPEG at three widths each, plus the 1200×630
OpenGraph card used in link previews. If the new photo has a different shape,
update the matching numbers in `config/photos.ts`.

`scripts/optimize-images.mjs` also trims the Instagram overlays baked into the
current screenshots — the carousel counter in the hero's top-right corner and
the muted-audio badge in the story photo's bottom-right. If you replace a
screenshot with a clean original, set that photo's `trim` values to `0`.

Alt text is part of the translations, under `a11y` in each content file.

---

## The handwriting font

One line on the page is handwritten: the phrase over the hero photo
(`hero.handwritten` in each content file). It uses Caveat, cut down to just the
characters those three phrases contain and committed as
`public/fonts/caveat-subset.woff2` — 14 KiB instead of the 94 KiB Google's full
latin + cyrillic subsets would cost on every visit.

If you change that phrase in any language, re-cut the font:

```bash
npm run fonts
```

The script fetches Caveat from Google once, subsets it, and writes the file.
Nothing else on the site depends on a network call, at build time or after.

---

## Social links

`config/site.ts`:

```ts
export const SOCIAL = {
  telegram: 'https://t.me/masterindiving',
  tiktok: 'https://www.tiktok.com/@master.in.diving',
  instagram: 'https://www.instagram.com/master_in_diving',
  facebook: 'https://www.facebook.com/kostya.lebedev.7',
};
```

All four appear as buttons in the "Contact Kostya" section
(`components/Contact.tsx`), and Instagram/Facebook also in the footer.
Setting `facebook` to `null` removes that one icon everywhere, with no gap
left behind — Telegram, TikTok and Instagram are always shown.

Use permanent profile URLs only. A `facebook.com/share/…` link is a tracking
redirect, not an address: it carries a session-specific id and query
parameters, and it is not what the profile is reachable at. Open the profile
and use Copy link instead. The handle above reads `kostya.lebedev.7` — an old
username on a profile that displays as Константин Донец — which is correct and
should not be "fixed".

---

## Deployment

The site is a static build with one small proxy that only handles `/`. It runs
on Vercel with no configuration.

**Vercel**

1. Push the repository to GitHub.
2. Vercel → Add New → Project → import the repository. Framework detection
   picks Next.js; no settings need changing.
3. Deploy.
4. Once a domain is connected, set the environment variable below and redeploy,
   so canonical URLs, `hreflang` and link previews point at the real address:

   ```
   NEXT_PUBLIC_SITE_URL=https://the-real-domain
   ```

   Until then the site falls back to Vercel's own deployment URL.

**Netlify / Cloudflare Pages**

Both work: build command `npm run build`, and their Next.js adapters handle the
proxy redirect. Images are pre-generated at build time rather than served by a
runtime image service, so nothing else needs configuring.

---

## What is deliberately not on this page

The specification forbids invented content, and several things were never
provided. Rather than filling them in, they are omitted:

- **No amounts.** No sum raised, no target, no progress bar, no percentage.
- **No updates.** The timeline is empty and therefore hidden.
- **No Facebook link.** Hidden until a permanent profile URL exists.
- **No bank name, no IBAN.** Contact for anything else goes through Instagram.
- **No donor counts, no testimonials, no medical details.**

Some of these appear in the design mockup — they were illustrative, and are not
reproduced.

---

## Project layout

```
app/[locale]/            page, layout, per-language metadata
app/globals.css          design tokens (colours, type scale, spacing)
components/              one file per section, plus the interactive pieces
config/payments.ts       payment details — the single source of truth
config/site.ts           locales, social links, canonical origin
config/photos.ts         what the image script produced (hero/story)
content/                 all copy: ru.ts, uk.ts, en.ts, updates.ts, creations.ts
proxy.ts                 language negotiation for "/"
scripts/                 image and QR generation
source-photos/           original photographs
source-photos/creations/ original paintings, one file per gallery entry
public/creations/        generated gallery images — see npm run images
```
