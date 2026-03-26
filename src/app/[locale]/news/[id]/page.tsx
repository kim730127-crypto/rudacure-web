import Link from "next/link";
import { notFound } from "next/navigation";
import newsDataKo from "@/data/news.json";
import newsDataEn from "@/data/news_en.json";
import { type Locale, getTranslations } from "@/lib/i18n";

function getNewsData(locale: string) {
  return locale === "en" ? newsDataEn : newsDataKo;
}

function proxyImages(html: string): string {
  return html.replace(
    /<img\s+src="(https?:\/\/[^"]+)"/g,
    (_, url) => `<img src="/api/image-proxy?url=${encodeURIComponent(url)}"`
  );
}

export function generateStaticParams() {
  const locales = ["ko", "en"];
  return locales.flatMap((locale) =>
    newsDataKo.map((article) => ({ locale, id: String(article.id) }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const data = getNewsData(locale);
  const article = data.find((a: { id: number }) => String(a.id) === id);
  return { title: article ? `${article.title} | RudaCure` : "Not Found" };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const data = getNewsData(locale);
  const article = data.find((a: { id: number }) => String(a.id) === id);
  if (!article) notFound();

  const t = getTranslations(locale as Locale);

  return (
    <div className="pt-24">
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
