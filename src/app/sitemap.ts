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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
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

  const newsRoutes = newsDataKo.flatMap((article) =>
    LOCALES.map((locale) => {
      const path = `/news/${article.id}`;
      const url = `${SITE_URL}/${locale}${path}`;
      const languages: Record<string, string> = {};
      LOCALES.forEach((l) => {
        languages[l] = `${SITE_URL}/${l}${path}`;
      });
      languages["x-default"] = `${SITE_URL}/en${path}`;

      return {
        url,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: { languages },
      };
    }),
  );

  return [...staticRoutes, ...newsRoutes];
}
