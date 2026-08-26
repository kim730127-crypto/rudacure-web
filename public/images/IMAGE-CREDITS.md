# Image provenance and licensing

Every non-logo image shipped on rudacure.com is listed here with its source and
licence. Keep this file current: for an IPO-track company the question "where
did this picture come from and are we allowed to use it" gets asked during
diligence, and the answer needs to exist before it is asked.

**Every photograph and figure on this site is now RudaCure-owned.** No stock
imagery of any kind remains. That is the strongest possible answer to the
diligence question, because it removes the licence question entirely rather
than documenting a licence.

Source of record for photography: the corporate NAS at
`00_RudaCure 전사공유/02_회사소개자료/05_사진`. Original files are retained there;
only cropped and downscaled web derivatives are committed to this repository.

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

## RudaCure photography

Shot in-house. Committed files are centre-cropped to 3:2 or 4:3 and downscaled;
none is upscaled, so the two drawn from 1280 px originals ship at their native
size. Paths below are relative to `02_회사소개자료/05_사진/`.

| File | Used on | Shipped | NAS original |
|---|---|---|---|
| `science/lab-bench.jpg` | Science — CRO capability card | 2400×1600 | `연구소 및 사무실 사진/20201103 실험장비 사진/KakaoTalk_20201203_165726341.jpg` (3024×4032) |
| `science/scientist.jpg` | Science — page header | 2400×1800 | `연구소 및 사무실 사진/20201103 실험장비 사진/KakaoTalk_20201203_165726341_17.jpg` (4032×3024) |
| `science/assay-bench.jpg` | Science — assay / electrophysiology card | 1280×853 | `연구소 및 사무실 사진/2021 연구소, 본사 사진/분자세포실험실.jpg` (1280×960) |
| `ir-capital-markets.jpg` | IR — page header | 2400×1600 | `연구소 및 사무실 사진/2022 서울사무실 인테리어/interior/in (13).jpg` (4527×3015) |

`science/lab-bench.jpg` and `science/scientist.jpg` show a ZEISS LUMERA
ophthalmic surgical microscope in use on a rodent cornea. This is the actual
procedure behind the CRO claim — ocular disease animal models and bespoke
efficacy evaluation — so the picture and the caption describe the same thing.

`science/assay-bench.jpg` is the 분자세포실험실 at the Central Research Institute.
It does not depict a patch-clamp rig, because no photograph of one exists on the
NAS; see "Open questions".

`ir-capital-markets.jpg` comes from the 2022 Seoul office interior shoot, the
only professionally lit photography on the NAS. The rest of that set (53 frames
at 4527×3015) is the obvious source for any further interior imagery.

Resolution note: `연구소, 본사 사진/` and `05_사진/연구소, 본사 사진/` hold 1280 px
re-exports. The full-resolution equivalents live under
`연구소 및 사무실 사진/`. Check dimensions before pulling from the NAS — the two
folders are near-duplicates and the smaller one is easy to grab by mistake.

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

| `science/{lab-bench,assay-bench,scientist}.jpg`, `ir-capital-markets.jpg` (Unsplash) | Replaced by RudaCure's own photography, above. The Unsplash versions were generic benches, a stranger in a lab coat, and the Yeouido skyline — accurate as mood, but they depicted no RudaCure capability and invited the question of why a drug discovery company was illustrating itself with stock. |

## Open questions

- `membrane_target_moa_v2.png` (824 KB) is retained but no longer referenced.
  It is an AI illustration with baked-in English labels; if the RCI002
  mechanism needs a figure, commission a properly drawn one rather than
  restoring this.
- **The electrophysiology card has no matching photograph.** Its caption claims
  "패치클램프 기반 고처리량 전기생리학 검증", but the NAS holds no picture of a
  patch-clamp rig; the only patch-clamp records found are outsourced study
  reports (`RCIP-24-004 티앤알바이오팹`, and the RCI002 patch-clamp efficacy
  reports). The card currently carries a general bench photograph, which claims
  nothing it cannot support. If the rig exists in Songdo, photograph it. If the
  work is contracted out, the caption is the thing to revise, not the picture.
- The bench and office photographs date from 2021 and were taken on a phone.
  They are honest but not art-directed. A half-day shoot at Songdo would lift
  the whole site; the ophthalmic microscope frames are the standard to match.
- `05_사진/시제품 사진 (RCI001)` holds photographs of the actual RCI001 unit-dose
  and glass-vial prototypes. They are not committed here because no page
  currently has a slot for them, but they are the obvious illustration for the
  RCI001 pipeline entry. Note the labels are legible and read `RCI001/HL262`
  with lot numbers, which publicly links the asset to the Hanlim codename;
  decide that before publishing them.
