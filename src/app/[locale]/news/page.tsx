import Link from "next/link";
import Image from "next/image";
import articlesKo from "@/data/news.json";
import articlesEn from "@/data/news_en.json";
import { type Locale, getTranslations, toDataLocale } from "@/lib/i18n";

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

/* ── Quarterly Magazines (Vol.15 = newest, Vol.1 = oldest) ── */
const MAGAZINES = [
  { vol: 15, quarter: "2026.1Q", pdf: "vol15.pdf" },
  { vol: 14, quarter: "2025.4Q", pdf: "vol14.pdf" },
  { vol: 13, quarter: "2025.3Q", pdf: "vol13.pdf" },
  { vol: 12, quarter: "2025.2Q", pdf: "vol12.pdf" },
  { vol: 11, quarter: "2025.1Q", pdf: "vol11.pdf" },
  { vol: 10, quarter: "2024.4Q", pdf: "vol10.pdf" },
  { vol: 9, quarter: "2024.3Q", pdf: "vol9.pdf" },
  { vol: 8, quarter: "2024.2Q", pdf: "vol8.pdf" },
  { vol: 7, quarter: "2024.1Q", pdf: "vol7.pdf" },
  { vol: 6, quarter: "2023.4Q", pdf: "vol6.pdf" },
  { vol: 5, quarter: "2023.3Q", pdf: "vol5.pdf" },
  { vol: 4, quarter: "2023.2Q", pdf: "vol4.pdf" },
  { vol: 3, quarter: "2023.1Q", pdf: "vol3.pdf" },
  { vol: 2, quarter: "2022.4Q", pdf: "vol2.pdf" },
  { vol: 1, quarter: "2021.3Q~2022.3Q", pdf: "vol1.pdf" },
];

const MAGAZINE_CONTENT = {
  ko: {
    sectionTag: "Quarterly Magazine",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "매거진",
    sectionDescription: "루다큐어의 분기별 소식과 연구 성과를 정리한 매거진입니다. PDF로 다운로드하실 수 있습니다.",
    download: "PDF 다운로드",
    latest: "최신호",
  },
  en: {
    sectionTag: "Quarterly Magazine",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "Magazine",
    sectionDescription: "Our quarterly magazine covering the latest research progress and company updates. Available for free PDF download.",
    download: "Download PDF",
    latest: "Latest",
  },
};

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const loc = toDataLocale(locale as Locale);
  const articles = locale === "en" ? articlesEn : articlesKo;
  const mc = MAGAZINE_CONTENT[loc];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{t("news.tag")}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {t("news.title1")} <em className="font-playfair italic font-semibold">{t("news.title2")}</em>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">{t("news.description")}</p>
        </div>
      </section>

      {/* Quarterly Magazines */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <h2 className="text-2xl font-light text-gray-900">
              {mc.sectionTitle}<em className="font-playfair italic font-semibold">{mc.sectionTitleEm}</em>
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-8 ml-9">{mc.sectionDescription}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {MAGAZINES.map((mag, i) => (
              <a
                key={mag.vol}
                href={`https://github.com/kim730127-crypto/rudacure-web/releases/download/magazines-v1/${mag.pdf}`}
                download
                className="group relative"
              >
                {/* Cover image */}
                <div className="relative aspect-[3/4.24] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow bg-gray-100">
                  <Image
                    src={`/magazines/covers/vol${mag.vol}.jpg`}
                    alt={`RudaCure Magazine Vol.${mag.vol}`}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  {/* Latest badge */}
                  {i === 0 && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-teal-600 text-white px-2 py-0.5 rounded-full shadow">
                      {mc.latest}
                    </span>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-white/90 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      {mc.download}
                    </div>
                  </div>
                </div>
                {/* Label */}
                <div className="mt-2 text-center">
                  <p className="text-xs font-semibold text-gray-800">Vol.{mag.vol}</p>
                  <p className="text-[11px] text-gray-400">{mag.quarter}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="px-6 pb-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-4xl mx-auto space-y-3 pt-8">
          {(articles as { id: number; title: string; date: string; category: string }[]).map((article) => (
            <Link
              key={article.id}
              href={`/${locale}/news/${article.id}`}
              className="liquid-glass p-5 flex items-center gap-4 group transition-all block"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || "bg-gray-100 text-gray-600"}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-600">{article.date}</span>
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
