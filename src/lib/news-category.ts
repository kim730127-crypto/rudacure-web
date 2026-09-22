/**
 * Category key visuals for the News Center.
 *
 * One abstract visual per category, shared by every article in that category
 * and by every locale. They are deliberately non-representational: no lab, no
 * equipment, no people, no molecules, no charts. A key visual is a graphic
 * device for the category, not a picture of the story, so nothing in it can be
 * read as a claim about an event, a capability or a measurement.
 *
 * Do not add a per-article image here. A picture attached to a single article
 * reads as a photograph of that article's subject, which is exactly the failure
 * mode recorded in public/images/IMAGE-CREDITS.md.
 *
 * Provenance and licence: public/images/IMAGE-CREDITS.md.
 */

/** Category strings as they appear in src/data/news*.json. */
const CATEGORY_SLUGS: Record<string, string> = {
  Company: "company",
  Award: "award",
  Clinical: "clinical",
  Science: "science",
  Partnership: "partnership",
  Patent: "patent",
  IR: "ir",
  Industry: "industry",
  CSR: "csr",
};

function slugFor(category: string): string | null {
  return CATEGORY_SLUGS[category] ?? null;
}

/** 1280x720 list thumbnail, or null for an unmapped category. */
export function categoryThumbnail(category: string): string | null {
  const slug = slugFor(category);
  return slug ? `/images/news/categories/${slug}.jpg` : null;
}

/**
 * 1200x630 share card. Falls back to the locale-wide card when the category is
 * unmapped, so a new category string never ships a broken Open Graph image.
 */
export function categoryOgImage(category: string, locale: string): string {
  const slug = slugFor(category);
  return slug ? `/og/news-${slug}.jpg` : `/og-image-${locale}.jpg`;
}
