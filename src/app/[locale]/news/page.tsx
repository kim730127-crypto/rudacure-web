import Link from "next/link";
import articlesKo from "@/data/news.json";
import articlesEn from "@/data/news_en.json";
import { type Locale, getTranslations } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: `${t("news.title1")} ${t("news.title2")} | RudaCure`,
    description: t("news.description"),
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Clinical: "bg-teal-50 text-teal-700 border border-teal-200",
  Science: "bg-blue-50 text-blue-700 border border-blue-200",
  Partnership: "bg-purple-50 text-purple-700 border border-purple-200",
  IR: "bg-amber-50 text-amber-700 border border-amber-200",
  Award: "bg-pink-50 text-pink-700 border border-pink-200",
  Patent: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  CSR: "bg-orange-50 text-orange-700 border border-orange-200",
  Company: "bg-slate-100 text-slate-600 border border-slate-200",
};

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const articles = locale === "en" ? articlesEn : articlesKo;

  return (
    <div className="pt-24">
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{t("news.tag")}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {t("news.title1")} <em className="font-['Playfair_Display'] italic font-semibold">{t("news.title2")}</em>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">{t("news.description")}</p>
        </div>
      </section>

      <section className="px-6 pb-32 bg-gray-50/50">
        <div className="max-w-4xl mx-auto space-y-3 pt-8">
          {(articles as { id: number; title: string; date: string; category: string }[]).map((article) => (
            <Link
              key={article.id}
              href={`/${locale}/news/${article.id}`}
              className="glass-card p-5 flex items-center gap-4 group transition-all block"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || "bg-gray-100 text-gray-500"}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-300">{article.date}</span>
                </div>
                <h3 className="text-[15px] font-medium text-gray-700 group-hover:text-teal-600 transition-colors truncate">
                  {article.title}
                </h3>
              </div>
              <svg className="w-4 h-4 text-gray-200 group-hover:text-teal-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
