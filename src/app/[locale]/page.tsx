import Image from "next/image";
import Link from "next/link";
import { type Locale, getTranslations } from "@/lib/i18n";

const PIPELINE = [
  {
    id: "RCI001",
    name: "RCI001",
    indication: "Dry Eye Disease",
    target: "Rac1 / NLRP3",
    status: "US FDA Phase 2",
    progress: 75,
    color: "teal",
    milestone: "Interim Analysis Q1 2026",
    description:
      "Targets Rac1/NLRP3 signaling to restore corneal health and tear film stability. Multi-target approach (TRPV1, CB1R, GPCR) promotes faster tear secretion vs traditional steroids.",
  },
  {
    id: "RCI002",
    name: "RCI002",
    indication: "Non-Opioid Pain",
    target: "TRPV1 Antagonist",
    status: "Pre-clinical / IND",
    progress: 40,
    color: "blue",
    milestone: "Global IND Filing Q2 2026",
    description:
      "Next-gen TRPV1 antagonist with superior selectivity and zero hyperthermia risk. Single-injection long-acting formulation for multi-month pain relief.",
  },
];

const PARTNERS = {
  ko: [
    { name: "한림제약", role: "RCI001 국내 라이선싱" },
    { name: "FDA", role: "Phase 2 임상시험 승인" },
    { name: "IBK Innovation Hub", role: "유럽 액셀러레이터" },
    { name: "TIPS", role: "스케일업 12억원 지원" },
    { name: "가천대학교", role: "이온채널 연구 파트너" },
    { name: "Hi-Seoul", role: "하이서울기업 인증" },
  ],
  en: [
    { name: "Hanlim Pharma", role: "RCI001 Domestic Licensing" },
    { name: "FDA", role: "Phase 2 Clinical Approval" },
    { name: "IBK Innovation Hub", role: "Europe Accelerator" },
    { name: "TIPS", role: "KRW 1.2B Scale-up Fund" },
    { name: "Gachon University", role: "Ion Channel Research" },
    { name: "Hi-Seoul", role: "Enterprise Certification" },
  ],
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const loc = (locale === "en" ? "en" : "ko") as Locale;
  const partners = PARTNERS[loc];

  const METRICS = [
    { value: "70%", label: t("rucia.metric.time"), sub: t("rucia.metric.time.sub") },
    { value: "100%", label: t("rucia.metric.selectivity"), sub: t("rucia.metric.selectivity.sub") },
    { value: "$94B", label: t("rucia.metric.market"), sub: t("rucia.metric.market.sub") },
  ];

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src="/images/hero_bg.jpg" alt="" fill className="object-cover opacity-[0.07]" priority />
          <div className="absolute inset-0 grid-pattern opacity-50" />
        </div>

        {/* Accent shapes */}
        <div className="hero-accent hero-accent-1" />
        <div className="hero-accent hero-accent-2" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <p className="text-teal-600 text-sm font-medium tracking-[0.3em] uppercase mb-8 animate-fade-up">
            {t("hero.tagline")}
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.95] mb-8 text-gray-900 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {t("hero.title1")}<br />
            <em className="font-['Playfair_Display'] font-semibold italic text-gradient-emerald">{t("hero.title2")}</em>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {t("hero.description")}
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <Link
              href={`/${locale}/pipeline`}
              className="btn-primary px-8 py-3.5 rounded-full font-semibold text-sm"
            >
              {t("hero.cta.pipeline")}
            </Link>
            <Link
              href={`/${locale}/science`}
              className="btn-outline px-8 py-3.5 rounded-full border text-sm font-medium"
            >
              {t("hero.cta.science")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </section>

      {/* ===== RuCIA Platform ===== */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{t("rucia.tag")}</p>
            <h2 className="text-4xl sm:text-5xl font-light leading-tight mb-6 text-gray-900">
              {t("rucia.title1")} <em className="font-['Playfair_Display'] italic font-semibold">{t("rucia.title2")}</em>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10">{t("rucia.description")}</p>
            <div className="grid grid-cols-3 gap-4 stagger-children">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl sm:text-3xl font-bold metric-value">{m.value}</div>
                  <div className="text-xs text-gray-500 mt-1.5 font-medium">{m.label}</div>
                  <div className="text-[10px] text-gray-300 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-xl">
            <Image src="/images/research_feature.jpg" alt="RuCIA Platform" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== Pipeline Grid ===== */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{t("pipeline.tag")}</p>
              <h2 className="text-4xl sm:text-5xl font-light text-gray-900">
                {t("pipeline.title1")} <em className="font-['Playfair_Display'] italic font-semibold">{t("pipeline.title2")}</em>
              </h2>
            </div>
            <Link href={`/${locale}/pipeline`} className="text-sm text-gray-400 hover:text-teal-600 transition-colors hidden sm:flex items-center gap-2 group">
              {t("pipeline.view_news")}
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PIPELINE.map((p) => (
              <Link key={p.id} href={`/${locale}/pipeline`} className="glass-card p-7 group">
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-semibold px-3.5 py-1.5 rounded-full ${p.color === "teal" ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                    {p.indication}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{p.status}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-teal-700 transition-colors">{p.name}</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">{p.description}</p>
                <div className="mb-4">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full animate-progress progress-bar-animated ${p.color === "teal" ? "bg-gradient-to-r from-teal-600 to-teal-400" : "bg-gradient-to-r from-blue-600 to-blue-400"}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-mono">Target: {p.target}</span>
                  <span className="text-gray-400">{p.milestone}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Partners & Recognition ===== */}
      <section className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {loc === "ko" ? "파트너 & 수상" : "Partners & Recognition"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900">
              {loc === "ko" ? "함께하는 " : "Trusted "}
              <em className="font-['Playfair_Display'] italic font-semibold">
                {loc === "ko" ? "파트너" : "Partners"}
              </em>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {partners.map((p) => (
              <div key={p.name} className="bg-white border border-gray-100 rounded-xl p-5 text-center group cursor-default hover:border-teal-200 hover:shadow-sm transition-all">
                <div className="text-sm font-semibold text-gray-700 group-hover:text-teal-700 transition-colors mb-1">
                  {p.name}
                </div>
                <div className="text-[10px] text-gray-400 leading-tight">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 px-6 text-center bg-white relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative">
          <h2 className="text-3xl sm:text-4xl font-light mb-6 text-gray-900">
            {t("cta.title1")} <em className="font-['Playfair_Display'] italic font-semibold">{t("cta.title2")}</em>
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">{t("cta.description")}</p>
          <Link
            href={`/${locale}/contact`}
            className="btn-primary inline-block px-10 py-4 rounded-full font-medium text-sm"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
