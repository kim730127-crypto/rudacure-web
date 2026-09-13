# Open Graph share cards

All cards are 1200×630 and share one typeset layout: wordmark, teal rule,
two-line heading, and a footer carrying the page's own eyebrow label plus the
domain.

| File | Used by | Locales |
| --- | --- | --- |
| `og-image-<locale>.jpg` | Home, News articles, any page without an override | ko en zh ja es fr ar |
| `og-image.jpg` | Locale-less fallback (currently the English home card) | — |
| `og-pipeline-<locale>.jpg` | Pipeline | ko en zh ja es fr |
| `og-science-<locale>.jpg` | Science | ko en zh ja es fr |
| `og-ir-<locale>.jpg` | IR | ko en zh ja es fr |
| `og-cro-<locale>.jpg` | CRO | ko en |

Resolution and fallback live in `src/lib/og.ts`. A locale with no card resolves
to the English one, which is what those pages already render — CRO page copy
exists in Korean and English only, so `zh/cro` legitimately gets the English
card.

## Why these exist

The site previously served one `og-image.jpg` to all seven locales plus two
section cards. None of the three carried a wordmark or any text — a cyan render
and a generic ball-and-stick molecule on empty cream fields, each with the left
60% of the canvas evidently reserved for copy that was never set. A link shared
into LinkedIn or KakaoTalk rendered as an unbranded blob.

Worse, **Pipeline, Science and CRO shared one image**. CRO is a sales page for a
paid service, so a link dropped into a procurement thread previewed as a
molecule that said nothing about the service.

## Rules

**No stage, phase or progress figures on a card.** Baking "FDA Phase 2" into a
JPEG makes the image false the moment the asset advances, and nothing in the
build would catch it. Indications and platform names change slowly enough to be
safe; development stages do not.

**No new translation at generation time.** Every localized string on these cards
is lifted from copy that already exists in the repo — `HEADER` in the Pipeline
page, the science header record, `META` in the CRO page, `TEXT_INVESTORS` in the
IR page, and `hero.title1`/`hero.title2` in `src/lib/i18n.ts` for the home
cards. If a card would need a string that is not already translated here, add
the card only for the locales that have one.

## Regenerating

1. Copy `public/images/logo_transparent.png` next to the template as `logo.png`
   and serve the folder: `python3 -m http.server 8963 --bind 127.0.0.1`
2. Open the template, call `__show('<page>-<locale>')`, and capture the
   1200×630 region at the origin.
3. Export at JPEG quality 86 to `public/og-<page>-<locale>.jpg`.

`template.html` holds the home cards; the section-page cards use the same CSS
with the heading and footer strings swapped.

**When a page's heading or eyebrow label changes, regenerate its cards** or the
share image and the page will disagree.
