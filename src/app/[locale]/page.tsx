import Image from "next/image";
import Link from "next/link";
import { type Locale, getTranslations, toDataLocale } from "@/lib/i18n";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HeroParticles } from "@/components/hero-particles";
import { PartnerLogo } from "@/components/partner-logo";
import newsKo from "@/data/news.json";
import newsEn from "@/data/news_en.json";

const PIPELINE = {
  ko: [
    {
      id: "RCI001", name: "RCI001", indication: "Dry Eye Disease", target: "TRPV1-Rac1",
      status: "US FDA Phase 2", progress: 75, color: "teal" as const,
      milestone: "Phase 2 IND Q2 2026",
      description: "TRPV1 하부 시그널 조절을 통한 Rac1 타깃 항염증/항산화 기전. 빠른 눈물 분비 촉진과 각막 손상 회복으로 기존 스테로이드 한계를 극복.",
    },
    {
      id: "RCI002", name: "RCI002", indication: "Non-Opioid Pain", target: "TRPV1-MOR Biased Dual",
      status: "Pre-clinical / IND", progress: 40, color: "blue" as const,
      milestone: "Tox Study 3Q 2026",
      description: "TRPV1과 MOR을 동시 조절하는 MOR biased 듀얼 타깃 비마약성 진통제. 이상발열 Zero, 중독/내성 위험 없이 장기 지속 통증 완화.",
    },
  ],
  en: [
    {
      id: "RCI001", name: "RCI001", indication: "Dry Eye Disease", target: "TRPV1-Rac1",
      status: "US FDA Phase 2", progress: 75, color: "teal" as const,
      milestone: "Phase 2 IND Q2 2026",
      description: "Anti-inflammatory/antioxidant mechanism targeting Rac1 via TRPV1 downstream signal modulation. Overcomes steroid limitations with rapid tear secretion and corneal wound healing.",
    },
    {
      id: "RCI002", name: "RCI002", indication: "Non-Opioid Pain", target: "TRPV1-MOR Biased Dual",
      status: "Pre-clinical / IND", progress: 40, color: "blue" as const,
      milestone: "Tox Study 3Q 2026",
      description: "MOR biased dual-target non-opioid analgesic simultaneously modulating TRPV1 and MOR. Zero hyperthermia, long-lasting pain relief without addiction or tolerance risk.",
    },
  ],
};

const PARTNERS = {
  ko: [
    { name: "서울대학교 병원", role: "임상시험 수행 기관, 제3자 검증기관", logo: "/images/partners/snuh.jpg", initials: "SNUH", color: "blue" },
    { name: "POSTECH", role: "Cryo-EM, MoA 검증기관", logo: "/images/partners/postech.png", initials: "POST", color: "red" },
    { name: "한림제약", role: "RCI001 국내 라이선싱(공동연구)", logo: "/images/partners/hanlim.png", initials: "HL", color: "teal" },
    { name: "프랑스 동물의약품 회사", role: "동물의약품 공동개발", logo: "pictogram:animal", initials: "VP", color: "indigo" },
    { name: "WuXi AppTec", role: "CDMO, Process Development", logo: "/images/partners/wuxi.jpg", initials: "WX", color: "emerald" },
    { name: "한미정밀화학", role: "RCI001/RCI002 GMP 생산", logo: "/images/partners/hanmi.gif", initials: "HM", color: "violet" },
    { name: "동아ST", role: "CDMO", logo: "/images/partners/dongast.png", initials: "DA", color: "orange" },
    { name: "Pharmaron", role: "CDMO", logo: "/images/partners/pharmaron.svg", initials: "PR", color: "cyan" },
    { name: "DT&CRO", role: "독성시험 평가기관", logo: "/images/partners/dtcro.png", initials: "DT", color: "rose" },
  ],
  en: [
    { name: "Seoul National Univ. Hospital", role: "Clinical Trial Conducting Org, Third-Party Validation", logo: "/images/partners/snuh.jpg", initials: "SNUH", color: "blue" },
    { name: "POSTECH", role: "Cryo-EM, MoA Validation", logo: "/images/partners/postech.png", initials: "POST", color: "red" },
    { name: "Hanlim Pharma", role: "RCI001 Domestic Licensing (Co-research)", logo: "/images/partners/hanlim.png", initials: "HL", color: "teal" },
    { name: "French Veterinary Pharma", role: "Veterinary Co-development", logo: "pictogram:animal", initials: "VP", color: "indigo" },
    { name: "WuXi AppTec", role: "CDMO, Process Development", logo: "/images/partners/wuxi.jpg", initials: "WX", color: "emerald" },
    { name: "Hanmi Fine Chemical", role: "RCI001/RCI002 GMP Production", logo: "/images/partners/hanmi.gif", initials: "HM", color: "violet" },
    { name: "Dong-A ST", role: "CDMO", logo: "/images/partners/dongast.png", initials: "DA", color: "orange" },
    { name: "Pharmaron", role: "CDMO", logo: "/images/partners/pharmaron.svg", initials: "PR", color: "cyan" },
    { name: "DT&CRO", role: "Toxicology Testing Agency", logo: "/images/partners/dtcro.png", initials: "DT", color: "rose" },
  ],
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const loc = toDataLocale(locale as Locale);
  const partners = PARTNERS[loc];
  const pipeline = PIPELINE[loc];

  const METRICS = [
    { value: "EP", label: t("rucia.metric.time"), sub: t("rucia.metric.time.sub") },
    { value: "MT", label: t("rucia.metric.selectivity"), sub: t("rucia.metric.selectivity.sub") },
    { value: "$94B", label: t("rucia.metric.market"), sub: t("rucia.metric.market.sub") },
  ];

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full background image */}
        <Image
          src="/images/dry-eye-hero.jpg"
          alt="Dry eye disease - bloodshot eye close-up"
          fill
          className="object-cover hero-bg-zoom"
          priority
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/70 to-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/30" />

        {/* Animated particle background */}
        <HeroParticles />

        {/* Ambient glow */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl hero-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-400/8 rounded-full blur-3xl hero-glow" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-32 pb-24 lg:pt-36">
          <div className="max-w-2xl">
            <p className="text-teal-400 text-xs font-semibold tracking-[0.25em] uppercase mb-6 animate-hero-blur-in">
              {t("hero.tagline")}
            </p>

            {/* Decorative line draw */}
            <div className="h-px w-16 bg-gradient-to-r from-teal-400 to-cyan-400 mb-6 hero-line-accent" />

            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.1] mb-8 text-white animate-hero-blur-in"
              style={{ animationDelay: "0.2s" }}
            >
              {t("hero.title1")}
              <br />
              <em className="font-playfair italic font-semibold hero-gradient-text">{t("hero.title2")}</em>
            </h1>
            <p
              className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed mb-10 animate-hero-blur-in"
              style={{ animationDelay: "0.4s" }}
            >
              {t("hero.description")}
            </p>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-hero-blur-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                href={`/${locale}/pipeline`}
                className="px-7 py-3.5 rounded-lg font-medium text-sm bg-teal-500 text-white hover:bg-teal-400 transition-colors"
              >
                {t("hero.cta.pipeline")}
              </Link>
              <Link
                href={`/${locale}/science`}
                className="px-7 py-3.5 rounded-lg border border-white/20 text-sm font-medium text-white/80 hover:text-white hover:border-white/40 transition-colors"
              >
                {t("hero.cta.science")}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint z-10">
          <span className="text-xs tracking-[0.2em] uppercase text-white/40">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ===== RuCIA Platform ===== */}
      <section className="py-20 lg:py-36 px-6 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal animation="reveal-left">
            <p className="section-label mb-4">{t("rucia.tag")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl section-heading mb-6">
              {t("rucia.title1")} <em>{t("rucia.title2")}</em>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10">{t("rucia.description")}</p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="liquid-glass p-4 sm:p-5 text-center"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Roboto_Mono'] text-gradient-emerald">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-xs text-gray-600 mt-1.5 font-medium">{m.label}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{m.sub}</div>
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
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50/50">
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
                className="text-sm text-gray-600 hover:text-teal-600 transition-colors hidden sm:flex items-center gap-2 group"
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
            {pipeline.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 150}>
                <Link
                  href={`/${locale}/pipeline`}
                  className={`block liquid-glass-teal p-6 sm:p-8 group border-l-4 ${
                    p.color === "teal" ? "border-l-teal-500" : "border-l-blue-500"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-gray-50 text-gray-700 border border-gray-200 font-['Roboto_Mono']">
                      {p.id}
                    </span>
                    <span className="text-xs text-gray-600 font-['Roboto_Mono']">{p.status}</span>
                  </div>

                  {/* Indication */}
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 group-hover:text-teal-700 transition-colors">
                    {p.indication}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-2">
                    {p.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
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
                    <span className="text-gray-600 font-['Roboto_Mono']">Target: {p.target}</span>
                    <span className="text-gray-600 group-hover:text-teal-600 transition-colors flex items-center gap-1">
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
      <section className="py-20 lg:py-24 px-6 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
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
            {partners.map((p, i) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-50 text-blue-600",
                red: "bg-red-50 text-red-600",
                teal: "bg-teal-50 text-teal-600",
                indigo: "bg-indigo-50 text-indigo-600",
                emerald: "bg-emerald-50 text-emerald-600",
                violet: "bg-violet-50 text-violet-600",
                orange: "bg-orange-50 text-orange-600",
                cyan: "bg-cyan-50 text-cyan-600",
                rose: "bg-rose-50 text-rose-600",
              };
              const badgeClass = colorMap[p.color] || "bg-gray-50 text-gray-600";
              return (
                <ScrollReveal key={p.name} delay={i * 100}>
                  <div className="liquid-glass px-6 py-5 group cursor-default flex items-center gap-4">
                    {/* Logo or initials fallback */}
                    <PartnerLogo src={p.logo} alt={p.name} initials={p.initials} badgeClass={badgeClass} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
                        {p.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-snug">{p.role}</div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
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
                className="text-sm text-gray-600 hover:text-teal-600 transition-colors hidden sm:flex items-center gap-2 group"
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
                  className="flex items-center gap-4 p-4 liquid-glass group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-600">{article.date}</span>
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
          <div className="max-w-2xl mx-auto text-center relative liquid-glass-dark p-12 sm:p-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-white">
              {t("cta.title1")}{" "}
              <em className="font-playfair italic font-semibold text-gradient-emerald">
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
