import type { MetadataRoute } from "next";
import {
  SITE_URL,
  ALL_LOCALES,
  TRANSLATED_LOCALES,
  CRO_LOCALES,
} from "@/lib/seo";
import newsDataKo from "@/data/news.json";
import { ANSWER_LOCALES, ANSWERS_REVIEWED } from "@/lib/answers";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ROUTES.flatMap((route) =>
    route.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      // Unknown per-page modification dates are omitted, never borrowed from news.
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternates(route.path, route.locales),
    })),
  );

  const newsRoutes = newsDataKo.flatMap((article) => {
    const path = `/news/${article.id}`;
    const articleDate = new Date(article.date);
    const articleModified = Number.isNaN(articleDate.getTime())
      ? undefined
      : articleDate;

    return TRANSLATED_LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: articleModified,
      changeFrequency: "yearly" as const,
      priority: 0.65,
      alternates: alternates(path, TRANSLATED_LOCALES),
    }));
  });

  const answerRoutes = ANSWER_LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}/faq`,
    lastModified: ANSWERS_REVIEWED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: alternates("/faq", ANSWER_LOCALES),
  }));

  return [...staticRoutes, ...answerRoutes, ...newsRoutes];
}
