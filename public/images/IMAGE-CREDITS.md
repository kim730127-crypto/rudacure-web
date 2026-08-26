# Image provenance and licensing

Every non-logo image shipped on rudacure.com is listed here with its source and
licence. Keep this file current: for an IPO-track company the question "where
did this picture come from and are we allowed to use it" gets asked during
diligence, and the answer needs to exist before it is asked.

Two categories are permitted on this site:

1. **RudaCure-owned** — figures produced in-house (RuCIA molecular dynamics,
   internal photography). Preferred wherever a scientific image is needed.
2. **Unsplash License** — verified at <https://unsplash.com/license>:
   > Unsplash grants you an irrevocable, nonexclusive, worldwide copyright
   > licence to download, copy, modify, distribute, perform, and use images
   > from Unsplash for free, including for commercial purposes, without
   > permission from or attributing the photographer or Unsplash.

   Attribution is not required. The only prohibitions are reselling images
   without significant modification, and compiling them into a competing
   stock-image service. Neither applies here.

**Not permitted:** AI-generated imagery depicting events that did not happen,
company milestones not yet achieved, or data not actually measured. See the
"Removed" section for why.

---

## RudaCure-owned

| File | Content | Notes |
|---|---|---|
| `science/membrane-md.jpg` | Membrane protein in an explicit lipid bilayer, MD simulation | RuCIA output. Also the homepage Core Technology figure and the poster frame for `videos/rucia/membrane-turntable.mp4`. |
| `science/md-ligand.jpg` | Protein with bound ligand, MD frame | RuCIA output; frame from `videos/rucia/md-sim-1.mp4`. |
| `videos/rucia/*` | MD simulation videos and poster frames | RuCIA output. |
| `logo*.png`, `favicon` | Corporate marks | RudaCure. |
| `sab/*.jpg` | Scientific Advisory Board portraits | Supplied by each advisor. Confirm written consent is on file before publication. |
| `partners/*` | Partner and vendor marks | Used to identify each organisation. Nominative use; confirm any partner-specific brand guidelines. |

## Unsplash License

| File | Used on | Unsplash photo ID |
|---|---|---|
| `science/lab-bench.jpg` | Science — CRO / laboratory capability | `photo-1602052577122-f73b9710adba` |
| `science/assay-bench.jpg` | Science — assay / electrophysiology capability | `photo-1582560475093-ba66accbc424` |
| `science/scientist.jpg` | Science — page header | `photo-1614935151651-0bea6508db6b` |
| `ir-capital-markets.jpg` | IR — page header | `photo-1554310603-d39d43033735` |

Source URL pattern: `https://unsplash.com/photos/<id>`
Delivery URL pattern: `https://images.unsplash.com/<id>?w=2400&q=80&fm=jpg`

All four were downloaded at 2400 px on the long edge so they stay sharp on 2x
displays; the previous copies were 800 px and visibly soft.

---

## Removed

| File | Reason |
|---|---|
| `unnamed.jpg` | AI-generated image of a **KOSDAQ listing ceremony that has not happened**, carrying a fabricated price chart, a fabricated closing price of 98,500 KRW, a fabricated "+30.00% 상한가", and a fabricated date of 2026-03-25. It was published on the Investor Relations page under the alt text "KOSDAQ IPO Listing Celebration". A depiction of an unachieved listing with invented pricing does not belong on an IR page. |
| `Gemini_Generated_Image_2hkt252hkt252hkt.png` | AI-generated diagram, 8.9 MB, shipped uncompressed to every visitor of the Science page. Replaced by the in-house MD render. |
| `membrane_target_moa.png` | 8.9 MB unused earlier revision of the MoA diagram. |
| `Dry-eye.png` | 2.4 MB, unreferenced. |
| `science/ion-channel.jpg` | A **DNA double helix** CGI render captioned as an ion channel. Wrong molecule for a membrane-protein company. |
| `science/ai-simulation.jpg` | Also a DNA render; replaced with a real MD frame. |
| `science/{cro-lab,electrophysiology,hero-platform}.jpg` | Superseded by 2400 px versions above. |
| `science/slide[1-4].png` | 11 MB of unreferenced slide exports. |

## Still to resolve

- `membrane_target_moa_v2.png` (824 KB) is retained but no longer referenced.
  It is an AI illustration with baked-in English labels; if the RCI002
  mechanism needs a figure, commission a properly drawn one rather than
  restoring this.
- Unsplash has no genuine patch-clamp, electrophysiology-rig, cryo-EM or
  ion-channel photography. Searches for those terms return unrelated hardware
  or paid iStock placements. The lab photographs above are therefore generic
  laboratory scenes, accurate as *context* but not depictions of RudaCure's own
  instruments. **Photographing the actual Songdo and Seoul labs would replace
  all of them with something no competitor can use.** That is the highest-value
  remaining image action.
