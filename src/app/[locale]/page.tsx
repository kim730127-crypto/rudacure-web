import Image from "next/image";
import Link from "next/link";
import { type Locale, getTranslations } from "@/lib/i18n";
import { ScrollReveal } from "@/components/scroll-reveal";
import newsKo from "@/data/news.json";
import newsEn from "@/data/news_en.json";

const PIPELINE = [
  {
    id: "RCI001",
    name: "RCI001",
    indication: "Dry Eye Disease",
    target: "TRPV1-Rac1",
    status: "US FDA Phase 2",
    progress: 75,
    color: "teal" as const,
    milestone: "Interim Analysis Q1 2026",
    description:
      "TRPV1 하부 시그널 조절을 통한 Rac1 타깃 항염증/항산화 기전. 빠른 눈물 분비 촉진과 각막 손상 회복으로 기존 스테로이드 한계를 극복.",
  },
  {
    id: "RCI002",
    name: "RCI002",
    indication: "Non-Opioid Pain",
    target: "TRPV1-MOR Biased Dual",
    status: "Pre-clinical / IND",
    progress: 40,
    color: "blue" as const,
    milestone: "Global IND Filing Q2 2026",
    description:
      "TRPV1과 MOR을 동시 조절하는 MOR biased 듀얼 타깃 비마약성 진통제. 이상발열 Zero, 중독/내성 위험 없이 장기 지속 통증 완화.",
  },
];

const PARTNERS = {
  ko: [
    { name: "한림제약", role: "RCI001 국내 라이선싱(공동연구)" },
    { name: "Ceva", role: "동물의약품 공동개발" },
    { name: "WuXi AppTec", role: "CDMO" },
    { name: "한미정밀화학", role: "CDMO" },
    { name: "동아ST", role: "CDMO" },
    { name: "Pharmaron", role: "CDMO" },
    { name: "DT&CRO", role: "CRO" },
  ],
  en: [
    { name: "Hanlim Pharma", role: "RCI001 Domestic Licensing (Co-research)" },
    { name: "Ceva", role: "Veterinary Co-development" },
    { name: "WuXi AppTec", role: "CDMO" },
    { name: "Hanmi Fine Chemical", role: "CDMO" },
    { name: "Dong-A ST", role: "CDMO" },
    { name: "Pharmaron", role: "CDMO" },
    { name: "DT&CRO", role: "CRO" },
  ],
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const loc = (locale === "en" ? "en" : "ko") as Locale;
  const partners = PARTNERS[loc];

  const METRICS = [
    { value: "EP", label: t("rucia.metric.time"), sub: t("rucia.metric.time.sub") },
    { value: "MT", label: t("rucia.metric.selectivity"), sub: t("rucia.metric.selectivity.sub") },
    { value: "$94B", label: t("rucia.metric.market"), sub: t("rucia.metric.market.sub") },
  ];

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Geometric accent line */}
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-gray-100 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-28 pb-16 lg:pt-24">
          {/* Left content */}
          <div className="lg:col-span-7">
            <p className="section-label mb-6 animate-fade-up">
              {t("hero.tagline")}
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl section-heading mb-8 animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              {t("hero.title1")}
              <br />
              <em className="text-gradient-emerald">{t("hero.title2")}</em>
            </h1>
            <p
              className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed mb-10 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              {t("hero.description")}
            </p>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up"
              style={{ animationDelay: "0.45s" }}
            >
              <Link
                href={`/${locale}/pipeline`}
                className="btn-primary px-7 py-3.5 font-medium text-sm"
              >
                {t("hero.cta.pipeline")}
              </Link>
              <Link
                href={`/${locale}/science`}
                className="btn-outline px-7 py-3.5 border text-sm font-medium"
              >
                {t("hero.cta.science")}
              </Link>
            </div>
          </div>

          {/* Right visual */}
          <div
            className="lg:col-span-5 relative aspect-[16/9] lg:aspect-[3/4] rounded-2xl overflow-hidden animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Image
              src="/images/molecule_viz.jpg"
              alt="Molecular visualization"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-transparent" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </section>

      {/* ===== RuCIA Platform ===== */}
      <section className="py-20 lg:py-36 px-6 lg:px-12 bg-gray-50/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal animation="reveal-left">
            <p className="section-label mb-4">{t("rucia.tag")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl section-heading mb-6">
              {t("rucia.title1")} <em>{t("rucia.title2")}</em>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10">{t("rucia.description")}</p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 text-center hover:border-teal-300 transition-colors duration-300"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Roboto_Mono'] text-gradient-emerald">
                    {m.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 mt-1.5 font-medium">{m.label}</div>
                  <div className="text-[10px] text-gray-300 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal animation="scale-in" delay={200}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/membrane_target_moa.png"
                alt="RCI002 Dual Target Peptide Mechanism of Action — TRPV1 & MOR Membrane Target"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Pipeline Grid ===== */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="section-label mb-4">{t("pipeline.tag")}</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl section-heading">
                  {t("pipeline.title1")} <em>{t("pipeline.title2")}</em>
                </h2>
              </div>
              <Link
                href={`/${locale}/pipeline`}
                className="text-sm text-gray-400 hover:text-teal-600 transition-colors hidden sm:flex items-center gap-2 group"
              >
                {t("pipeline.view_news")}
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PIPELINE.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 150}>
                <Link
                  href={`/${locale}/pipeline`}
                  className={`block bg-white border border-gray-200 rounded-xl p-6 sm:p-8 group hover:border-teal-300 transition-all duration-300 border-l-4 ${
                    p.color === "teal" ? "border-l-teal-500" : "border-l-blue-500"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-gray-50 text-gray-700 border border-gray-200 font-['Roboto_Mono']">
                      {p.id}
                    </span>
                    <span className="text-xs text-gray-400 font-['Roboto_Mono']">{p.status}</span>
                  </div>

                  {/* Indication */}
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 group-hover:text-teal-700 transition-colors">
                    {p.indication}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2">
                    {p.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Progress</span>
                      <span className="font-['Roboto_Mono']">{p.progress}%</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full animate-progress ${
                          p.color === "teal"
                            ? "bg-gradient-to-r from-teal-600 to-teal-400"
                            : "bg-gradient-to-r from-blue-600 to-blue-400"
                        }`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs pt-4 border-t border-gray-100">
                    <span className="text-gray-300 font-['Roboto_Mono']">Target: {p.target}</span>
                    <span className="text-gray-400 group-hover:text-teal-600 transition-colors flex items-center gap-1">
                      {p.milestone}
                      <svg
                        className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Partners & Recognition ===== */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-label mb-4">
                {loc === "ko" ? "파트너 & 수상" : "Partners & Recognition"}
              </p>
              <h2 className="text-3xl sm:text-4xl section-heading">
                {loc === "ko" ? "함께하는 " : "Trusted "}
                <em>{loc === "ko" ? "파트너" : "Partners"}</em>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 100}>
                <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 group cursor-default hover:border-teal-300 transition-all duration-300">
                  <div className="text-sm font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{p.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Recent News ===== */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-4">
                  {loc === "ko" ? "최근 소식" : "Latest News"}
                </p>
                <h2 className="text-3xl sm:text-4xl section-heading">
                  {loc === "ko" ? "뉴스 & " : "News & "}
                  <em>{loc === "ko" ? "공지" : "Updates"}</em>
                </h2>
              </div>
              <Link
                href={`/${locale}/news`}
                className="text-sm text-gray-400 hover:text-teal-600 transition-colors hidden sm:flex items-center gap-2 group"
              >
                {loc === "ko" ? "전체보기 →" : "View All →"}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {(loc === "ko" ? newsKo : newsEn).slice(0, 5).map((article: { id: number; title: string; date: string; category: string }, i: number) => (
              <ScrollReveal key={article.id} delay={i * 80}>
                <Link
                  href={`/${locale}/news/${article.id}`}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl group hover:border-teal-300 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-medium text-gray-700 group-hover:text-teal-600 transition-colors truncate">
                      {article.title}
                    </h3>
                  </div>
                  <svg className="w-4 h-4 text-gray-200 group-hover:text-teal-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-950 text-white relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-white">
              {t("cta.title1")}{" "}
              <em className="font-['Playfair_Display'] italic font-semibold text-gradient-emerald">
                {t("cta.title2")}
              </em>
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed">{t("cta.description")}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-10 py-4 rounded-lg font-medium text-sm bg-teal-500 text-white hover:bg-teal-400 transition-colors"
            >
              {t("cta.button")}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
