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
| PayPal | +380 98 339 10 85 (phone number, copied — no PayPal link exists yet) |
| Crypto | TBjNL453YC4qz44ZhsBpgeVtrgLVu6ZU3t |

The crypto network is deliberately not named anywhere, per the specification.

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

## Social links

`config/site.ts`:

```ts
export const SOCIAL = {
  instagram: 'https://www.instagram.com/master_in_diving',
  facebook: null,
};
```

Facebook is `null`, so no Facebook icon is rendered anywhere. Set it to a
permanent profile URL (Profile → Copy link, not a share link) and the icon
appears in the footer.

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
- **No e-mail, no bank name, no IBAN.** Contact goes through Instagram.
- **No crypto network name.** Only the address itself.
- **No donor counts, no testimonials, no medical details.**

Some of these appear in the design mockup — they were illustrative, and are not
reproduced.

---

## Project layout

```
app/[locale]/       page, layout, per-language metadata
app/globals.css     design tokens (colours, type scale, spacing)
components/         one file per section, plus the interactive pieces
config/payments.ts  payment details — the single source of truth
config/site.ts      locales, social links, canonical origin
config/photos.ts    what the image script produced
content/            all copy: ru.ts, uk.ts, en.ts, updates.ts
proxy.ts            language negotiation for "/"
scripts/            image and QR generation
source-photos/      original photographs
```
