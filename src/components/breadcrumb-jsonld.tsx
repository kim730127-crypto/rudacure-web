import { breadcrumbSchema } from "@/lib/schema";
import { getTranslations, isValidLocale, type Locale } from "@/lib/i18n";

type NavKey =
  | "nav.science"
  | "nav.pipeline"
  | "nav.cro"
  | "nav.ir"
  | "nav.news"
  | "nav.publications"
  | "nav.sab"
  | "nav.about"
  | "nav.contact";

/**
 * Emits a BreadcrumbList for a second-level page.
 *
 * Google renders this as the site-path line above a search result instead of a
 * raw URL, and answer engines use it to place a quoted page inside the site's
 * hierarchy. The label is read from the navigation dictionary so the breadcrumb
 * and the menu can never drift apart.
 *
 * Rendered per page rather than in the layout, because a layout cannot read the
 * pathname without opting the whole route tree out of static generation.
 */
export function BreadcrumbJsonLd({
  locale,
  navKey,
  path,
}: {
  locale: string;
  navKey: NavKey;
  path: string;
}) {
  const safeLocale: Locale = isValidLocale(locale) ? locale : "en";
  const t = getTranslations(safeLocale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          breadcrumbSchema(safeLocale, [{ name: t(navKey), path }]),
        ),
      }}
    />
  );
}
