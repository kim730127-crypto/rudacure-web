/**
 * Open Graph share cards for the section pages.
 *
 * Pipeline, Science and CRO previously shared a single `og-image-pipeline.jpg`
 * and IR used `og-image-ir.jpg`. Both were unbranded stock-style renders with
 * no wordmark and no text, and one image served all seven locales. Sharing one
 * card across Pipeline, Science and CRO was the worse half of that: CRO is a
 * sales page for a paid service, so a link dropped into a procurement thread
 * previewed as a generic molecule that said nothing about the service.
 *
 * A card exists only for the locales whose page copy is actually translated in
 * this repo — CRO carries Korean and English only — so an untranslated locale
 * resolves to the English card, which is exactly what the page itself renders.
 *
 * Deliberately absent from these cards: development stage, phase and progress
 * figures. Baking "FDA Phase 2" into a JPEG makes the image false the moment
 * the asset advances, and nothing in the build would catch it. Regeneration is
 * documented in scripts/og/README.md.
 */

const OG_CARD_LOCALES = {
  pipeline: ["ko", "en", "zh", "ja", "es", "fr"],
  science: ["ko", "en", "zh", "ja", "es", "fr"],
  ir: ["ko", "en", "zh", "ja", "es", "fr"],
  cro: ["ko", "en"],
} as const satisfies Record<string, readonly string[]>;

export type OgCardPage = keyof typeof OG_CARD_LOCALES;

export function ogCard(page: OgCardPage, locale: string): string {
  const available: readonly string[] = OG_CARD_LOCALES[page];
  const resolved = available.includes(locale) ? locale : "en";
  return `/og-${page}-${resolved}.jpg`;
}
