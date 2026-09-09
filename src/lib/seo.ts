import { isValidLocale, LOCALES, type Locale } from "@/lib/i18n";

export const SITE_URL = "https://www.rudacure.com";

/**
 * Locales a page actually has content for.
 *
 * The site serves seven locale prefixes, but most pages hold only six content
 * tables and the CRO page holds two. Requests for a locale outside a page's set
 * fall back to English content while still living at the requested URL, so
 * `/ar/science` used to serve the English body and simultaneously claim
 * `canonical: /ar/science` and an `hreflang="ar"` alternate. Google saw ~118
 * such URLs, correctly called them duplicates and picked its own canonical,
 * which burned crawl budget on pages that were never going to be indexed.
 *
 * Declaring the real set here makes the canonical point at the locale that
 * holds the content and stops hreflang advertising translations that do not
 * exist.
 */
export const ALL_LOCALES = LOCALES;

/** Every page except the homepage and CRO: no Arabic content table exists. */
export const TRANSLATED_LOCALES = ["ko", "en", "zh", "ja", "es", "fr"] as const;

/** The CRO page is authored in Korean and English only. */
export const CRO_LOCALES = ["ko", "en"] as const;

const FALLBACK_LOCALE = "en";

/** The locale whose content a given URL actually renders. */
export function contentLocale(
  locale: string,
  available: readonly string[] = ALL_LOCALES,
): string {
  const safe = isValidLocale(locale) ? locale : FALLBACK_LOCALE;
  return available.includes(safe) ? safe : FALLBACK_LOCALE;
}

export function localizedAlternates(
  locale: string,
  path = "",
  available: readonly string[] = ALL_LOCALES,
) {
  const normalizedPath = path === "" || path.startsWith("/") ? path : `/${path}`;
  const resolved = contentLocale(locale, available);
  const languages: Record<string, string> = {};

  available.forEach((lang) => {
    languages[lang] = `${SITE_URL}/${lang}${normalizedPath}`;
  });
  languages["x-default"] = `${SITE_URL}/${FALLBACK_LOCALE}${normalizedPath}`;

  return {
    canonical: `${SITE_URL}/${resolved}${normalizedPath}`,
    languages,
  };
}

export type { Locale };
