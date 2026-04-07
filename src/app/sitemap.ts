import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";

const SITE_URL = "https://www.rudacure.com";

const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/science", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pipeline", priority: 0.95, changeFrequency: "weekly" },
  { path: "/ir", priority: 0.95, changeFrequency: "weekly" },
  { path: "/news", priority: 0.85, changeFrequency: "weekly" },
  { path: "/publications", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sab", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.85, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
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
}
