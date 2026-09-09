import type { MetadataRoute } from "next";
import {
  SITE_URL,
  ALL_LOCALES,
  TRANSLATED_LOCALES,
  CRO_LOCALES,
} from "@/lib/seo";
import newsDataKo from "@/data/news.json";

/**
 * Each route declares the locales it actually holds content for. A locale
 * outside the set renders the English body, so listing it here would submit a
 * duplicate to the index — which is what produced ~118 "duplicate, Google chose
 * a different canonical" pages, almost all of them /ar/*.
 */
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  locales: readonly string[];
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly", locales: ALL_LOCALES },
  { path: "/science", priority: 0.9, changeFrequency: "monthly", locales: TRANSLATED_LOCALES },
  { path: "/pipeline", priority: 0.95, changeFrequency: "weekly", locales: TRANSLATED_LOCALES },
  { path: "/cro", priority: 0.9, changeFrequency: "monthly", locales: CRO_LOCALES },
  { path: "/ir", priority: 0.95, changeFrequency: "weekly", locales: TRANSLATED_LOCALES },
  { path: "/news", priority: 0.85, changeFrequency: "weekly", locales: TRANSLATED_LOCALES },
  { path: "/publications", priority: 0.8, changeFrequency: "monthly", locales: TRANSLATED_LOCALES },
  { path: "/sab", priority: 0.7, changeFrequency: "monthly", locales: TRANSLATED_LOCALES },
  { path: "/about", priority: 0.85, changeFrequency: "monthly", locales: TRANSLATED_LOCALES },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", locales: TRANSLATED_LOCALES },
];

function alternates(path: string, locales: readonly string[]) {
  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${SITE_URL}/${l}${path}`;
  });
  languages["x-default"] = `${SITE_URL}/en${path}`;
  return { languages };
}

// The newest news item is the site's real "content changed" marker. Stamping
// every URL with `new Date()` told crawlers that all URLs changed on every
// deploy, including deploys that only touched CSS — which is exactly the signal
// that gets a sitemap's lastmod ignored.
function latestNewsDate(): Date {
  const newest = newsDataKo.reduce<string>(
    (max, article) => (article.date > max ? article.date : max),
    "1970-01-01",
  );
  const parsed = new Date(newest);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = latestNewsDate();

  const staticRoutes = ROUTES.flatMap((route) =>
    route.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternates(route.path, route.locales),
    })),
  );

  const newsRoutes = newsDataKo.flatMap((article) => {
    const path = `/news/${article.id}`;
    const articleDate = new Date(article.date);
    const articleModified = Number.isNaN(articleDate.getTime())
      ? lastModified
      : articleDate;

    return TRANSLATED_LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: articleModified,
      changeFrequency: "yearly" as const,
      priority: 0.65,
      alternates: alternates(path, TRANSLATED_LOCALES),
    }));
  });

  return [...staticRoutes, ...newsRoutes];
}
