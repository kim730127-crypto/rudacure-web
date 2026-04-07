import Link from "next/link";
import { notFound } from "next/navigation";
import newsDataKo from "@/data/news.json";
import newsDataEn from "@/data/news_en.json";
import newsDataZh from "@/data/news_zh.json";
import newsDataJa from "@/data/news_ja.json";
import newsDataEs from "@/data/news_es.json";
import newsDataFr from "@/data/news_fr.json";
import { type Locale, getTranslations } from "@/lib/i18n";

const NEWS_MAP: Record<string, typeof newsDataKo> = {
  ko: newsDataKo,
  en: newsDataEn,
  zh: newsDataZh as typeof newsDataKo,
  ja: newsDataJa as typeof newsDataKo,
  es: newsDataEs as typeof newsDataKo,
  fr: newsDataFr as typeof newsDataKo,
};

function getNewsData(locale: string) {
  return NEWS_MAP[locale] ?? newsDataEn;
}

function proxyImages(html: string): string {
  return html.replace(
    /<img\s+src="(https?:\/\/[^"]+)"/g,
    (_, url) => `<img src="/api/image-proxy?url=${encodeURIComponent(url)}"`,
  );
}

export function generateStaticParams() {
  const locales = ["ko", "en", "zh", "ja", "es", "fr"];
  return locales.flatMap((locale) =>
    newsDataKo.map((article) => ({ locale, id: String(article.id) })),
  );
}

const SITE_URL = "https://www.rudacure.com";

function stripHtml(html: string, maxLen = 200): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const data = getNewsData(locale);
  const article = data.find((a: { id: number }) => String(a.id) === id);
  if (!article) return { title: "Not Found" };

  const title = `${article.title} | RudaCure`;
  const description = stripHtml(article.content);
  const url = `${SITE_URL}/${locale}/news/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description,
      url,
      type: "article",
      publishedTime: article.date,
      authors: ["RudaCure Co., Ltd."],
      section: article.category,
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: article.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const data = getNewsData(locale);
  const article = data.find((a: { id: number }) => String(a.id) === id);
  if (!article) notFound();

  const t = getTranslations(locale as Locale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    dateModified: article.date,
    description: stripHtml(article.content),
    articleSection: article.category,
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/news/${id}`,
    image: `${SITE_URL}/og-image.jpg`,
    author: {
      "@type": "Organization",
      name: "RudaCure Co., Ltd.",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "RudaCure Co., Ltd.",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/news/${id}`,
    },
  };

  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/news`}
            className="text-sm text-gray-600 hover:text-teal-600 transition-colors mb-8 inline-block"
          >
            &larr; {t("news.back")}
          </Link>

          <span className="text-xs font-medium px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 mb-4 inline-block">
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-4 text-gray-900">
            {article.title}
          </h1>

          <p className="text-sm text-gray-600 mb-8">{article.date}</p>

          <div className="section-divider mb-8" />

          <article
            className="prose prose-gray max-w-none [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:text-[15px] [&_h3]:text-gray-800 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_a]:text-teal-600 [&_img]:rounded-lg [&_img]:my-4"
            dangerouslySetInnerHTML={{ __html: proxyImages(article.content) }}
          />

          <div className="section-divider mt-12 mb-8" />

          <Link
            href={`/${locale}/news`}
            className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
          >
            &larr; {t("news.back")}
          </Link>
        </div>
      </section>
    </div>
  );
}
