# Brand assets

## Strapline removal (logo)

`logo.png`, `logo_full.png` and `logo_transparent.png` in `public/images/`
carried the strapline **"For your quality and painless life"** baked into the
bitmap. That wording is from the company's previous positioning as a
non-opioid pain company. RudaCure now describes itself as a membrane-protein
(이온채널·GPCR) drug discovery company, and the pipeline spans dry eye,
psoriasis and rare disease — so the strapline asserted a scope the company had
already moved past, on every page of the site and on every share card.

The strapline was erased and each file re-cropped to the remaining content. The
lockup is now the lotus mark plus the RUDACURE wordmark.

**Originals are preserved in `logo-original/`.** They are kept outside
`public/` on purpose: everything under `public/` is served statically whether
or not a page links to it, so leaving a copy there would keep the old claim
publicly fetchable.

### Consequence to watch

The intrinsic aspect ratio changed from **2.40:1 to 3.24:1**. Any place that
hardcodes both width and height needs updating, otherwise the reserved box is
wrong and the layout shifts on first paint. Updated so far:

- `src/components/navbar.tsx` — `width`/`height` props
- `scripts/og/template.html` — share cards re-rendered against the new file

`publisher.logo` in the news article JSON-LD and `logo` in `src/lib/schema.ts`
point at `logo_full.png` by URL and need no change.
