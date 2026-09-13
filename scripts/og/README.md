# Open Graph share cards

`public/og-image-<locale>.jpg` (1200×630) — one per locale, referenced from
`src/app/[locale]/layout.tsx` and the news article metadata.

## Why these exist

The site previously served a single `og-image.jpg` to all seven locales. It
carried no wordmark and no text — a cyan render on an empty cream field, with
the left 60% of the canvas evidently reserved for copy that was never set. A
link shared into LinkedIn or KakaoTalk therefore rendered as an unbranded blob,
and the Korean, Japanese and Arabic pages all shared the same Latin-free image.

## Regenerating

The headline strings are copied from `hero.title1` / `hero.title2` in
`src/lib/i18n.ts`. **If those change, regenerate the cards** or the share image
and the page headline will disagree.

1. Serve this folder together with `public/images/logo_transparent.png` as
   `logo.png`:
   `python3 -m http.server 8947 --bind 127.0.0.1`
2. Open `template.html` in a 1200×630 viewport, capture each `#og-<locale>`
   block, and export at JPEG quality 86 to `public/og-image-<locale>.jpg`.
3. `og-image.jpg` stays as the locale-less fallback and currently holds the
   English card.

## Not regenerated here

`og-image-pipeline.jpg` (Pipeline, Science) and `og-image-ir.jpg` (IR) are still
the original stock-style renders: a generic ball-and-stick molecule and an
abstract field, both unbranded and both with the same unused left gutter. They
need the same treatment.
