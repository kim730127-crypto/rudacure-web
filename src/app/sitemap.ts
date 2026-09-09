import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import newsDataKo from "@/data/news.json";

const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/science", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pipeline", priority: 0.95, changeFrequency: "weekly" },
  { path: "/cro", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ir", priority: 0.95, changeFrequency: "weekly" },
  { path: "/news", priority: 0.85, changeFrequency: "weekly" },
  { path: "/publications", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sab", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.85, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

// The newest news item is the site's real "content changed" marker. Stamping
// every URL with `new Date()` told crawlers that all 1,351 URLs changed on
// every deploy, including deploys that only touched CSS — which is exactly the
// signal that gets a sitemap's lastmod ignored.
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
    LOCALES.map((locale) => {
      const url = `${SITE_URL}/${locale}${route.path}`;
      const languages: Record<string, string> = {};
      LOCALES.forEach((l) => {
        languages[l] = `${SITE_URL}/${l}${route.path}`;
      });
      languages["x-default"] = `${SITE_URL}/en${route.path}`;

      return {
        url,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      };
    }),
  );

  const newsRoutes = newsDataKo.flatMap((article) => {
    const articleDate = new Date(article.date);
    const articleModified = Number.isNaN(articleDate.getTime())
      ? lastModified
      : articleDate;

    return LOCALES.map((locale) => {
      const path = `/news/${article.id}`;
      const url = `${SITE_URL}/${locale}${path}`;
      const languages: Record<string, string> = {};
      LOCALES.forEach((l) => {
        languages[l] = `${SITE_URL}/${l}${path}`;
      });
      languages["x-default"] = `${SITE_URL}/en${path}`;

      return {
        url,
        lastModified: articleModified,
        changeFrequency: "yearly" as const,
        priority: 0.65,
        alternates: { languages },
      };
    });
  });

  return [...staticRoutes, ...newsRoutes];
}
