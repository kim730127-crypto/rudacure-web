import { MagazineGrid } from "@/components/magazine-grid";
import articlesKo from "@/data/news.json";
import articlesEn from "@/data/news_en.json";
import articlesZh from "@/data/news_zh.json";
import articlesJa from "@/data/news_ja.json";
import articlesEs from "@/data/news_es.json";
import articlesFr from "@/data/news_fr.json";
import { type Locale, getTranslations } from "@/lib/i18n";
import { NewsYearFilter } from "@/components/news-year-filter";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: `${t("news.title1")} ${t("news.title2")} | RudaCure`,
    description: t("news.description"),
    alternates: localizedAlternates(locale, "/news"),
  };
}

/* ── Quarterly Magazines (Vol.16 = newest, Vol.1 = oldest) ── */
const MAGAZINES = [
  { vol: 16, quarter: "2026.2Q", pdf: "vol16.pdf" },
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

const MAGAZINE_CONTENT: Record<
  string,
  {
    sectionTag: string;
    sectionTitle: string;
    sectionTitleEm: string;
    sectionDescription: string;
    download: string;
    read: string;
    latest: string;
  }
> = {
  ko: {
    sectionTag: "Quarterly Magazine",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "매거진",
    sectionDescription:
      "루다큐어의 분기별 소식과 연구 성과를 정리한 매거진입니다. PDF로 다운로드하실 수 있습니다.",
    download: "PDF 다운로드",
    read: "읽기",
    latest: "최신호",
  },
  en: {
    sectionTag: "Quarterly Magazine",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "Magazine",
    sectionDescription:
      "Our quarterly magazine covering the latest research progress and company updates. Available for free PDF download.",
    download: "Download PDF",
    read: "Read",
    latest: "Latest",
  },
  zh: {
    sectionTag: "季刊杂志",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "杂志",
    sectionDescription:
      "汇总RudaCure每季度的最新动态和研究成果的杂志。可免费下载PDF版本。",
    download: "下载PDF",
    read: "阅读",
    latest: "最新刊",
  },
  ja: {
    sectionTag: "季刊マガジン",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "マガジン",
    sectionDescription:
      "RudaCureの四半期ごとのニュースと研究成果をまとめたマガジンです。PDFで無料ダウンロードいただけます。",
    download: "PDFダウンロード",
    read: "読む",
    latest: "最新号",
  },
  es: {
    sectionTag: "Revista Trimestral",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "Revista",
    sectionDescription:
      "Nuestra revista trimestral con los últimos avances en investigación y novedades de la empresa. Disponible para descarga gratuita en PDF.",
    download: "Descargar PDF",
    read: "Leer",
    latest: "Último",
  },
  fr: {
    sectionTag: "Magazine Trimestriel",
    sectionTitle: "RudaCure ",
    sectionTitleEm: "Magazine",
    sectionDescription:
      "Notre magazine trimestriel couvrant les dernières avancées de la recherche et les actualités de l'entreprise. Téléchargement PDF gratuit.",
    download: "Télécharger PDF",
    read: "Lire",
    latest: "Dernier",
  },
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const articlesMap: Record<string, typeof articlesKo> = {
    ko: articlesKo,
    en: articlesEn,
    zh: articlesZh as typeof articlesKo,
    ja: articlesJa as typeof articlesKo,
    es: articlesEs as typeof articlesKo,
    fr: articlesFr as typeof articlesKo,
  };
  const articles = articlesMap[locale] ?? articlesEn;
  const mc = MAGAZINE_CONTENT[locale] ?? MAGAZINE_CONTENT.en;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="section-label mb-4">
            {t("news.tag")}
          </p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {t("news.title1")}{" "}
            <em className="font-playfair italic font-semibold">
              {t("news.title2")}
            </em>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {t("news.description")}
          </p>
        </div>
      </section>

      {/* Quarterly Magazines */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-6 h-6 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h2 className="text-2xl font-light text-gray-900">
              {mc.sectionTitle}
              <em className="font-playfair italic font-semibold">
                {mc.sectionTitleEm}
              </em>
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-8 ms-9">
            {mc.sectionDescription}
          </p>

          <MagazineGrid
            magazines={MAGAZINES}
            latestLabel={mc.latest}
            readLabel={mc.read}
            downloadLabel={mc.download}
          />
        </div>
      </section>

      {/* News Articles */}
      <section className="px-6 pb-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-4xl mx-auto pt-8">
          <NewsYearFilter
            articles={
              articles as {
                id: number;
                title: string;
                date: string;
                category: string;
              }[]
            }
            locale={locale}
          />
        </div>
      </section>
    </div>
  );
}
