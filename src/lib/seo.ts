import { isValidLocale, LOCALES } from "@/lib/i18n";

export const SITE_URL = "https://www.rudacure.com";

export function localizedAlternates(locale: string, path = "") {
  const safeLocale = isValidLocale(locale) ? locale : "en";
  const normalizedPath = path === "" || path.startsWith("/") ? path : `/${path}`;
  const languages: Record<string, string> = {};

  LOCALES.forEach((lang) => {
    languages[lang] = `${SITE_URL}/${lang}${normalizedPath}`;
  });
  languages["x-default"] = `${SITE_URL}/en${normalizedPath}`;

  return {
    canonical: `${SITE_URL}/${safeLocale}${normalizedPath}`,
    languages,
  };
}
