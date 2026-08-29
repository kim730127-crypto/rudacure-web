import Image from "next/image";
import Link from "next/link";
import { type Locale, getTranslations, toDataLocale } from "@/lib/i18n";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Trpv1Hero } from "@/components/trpv1-hero";
import { PartnerLogo } from "@/components/partner-logo";
import { RecruitPopup } from "@/components/recruit-popup";
import newsKo from "@/data/news.json";
import newsEn from "@/data/news_en.json";
import newsZh from "@/data/news_zh.json";
import newsJa from "@/data/news_ja.json";
import newsEs from "@/data/news_es.json";
import newsFr from "@/data/news_fr.json";

const PIPELINE = {
  ko: [
    {
      id: "RCI001",
      name: "RCI001",
      indication: "Dry Eye Disease",
      target: "TRPV1-Rac1",
      status: "US FDA Phase 2",
      progress: 75,
      color: "teal" as const,
      milestone: "Phase 2 IND Q2 2026",
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
      milestone: "Tox Study 3Q 2026",
      description:
        "TRPV1과 MOR을 동시 조절하는 MOR biased 듀얼 타깃 비마약성 진통제. 이상발열 Zero, 중독/내성 위험 없이 장기 지속 통증 완화.",
    },
  ],
  en: [
    {
      id: "RCI001",
      name: "RCI001",
      indication: "Dry Eye Disease",
      target: "TRPV1-Rac1",
      status: "US FDA Phase 2",
      progress: 75,
      color: "teal" as const,
      milestone: "Phase 2 IND Q2 2026",
      description:
        "Anti-inflammatory/antioxidant mechanism targeting Rac1 via TRPV1 downstream signal modulation. Overcomes steroid limitations with rapid tear secretion and corneal wound healing.",
    },
    {
      id: "RCI002",
      name: "RCI002",
      indication: "Non-Opioid Pain",
      target: "TRPV1-MOR Biased Dual",
      status: "Pre-clinical / IND",
      progress: 40,
      color: "blue" as const,
      milestone: "Tox Study 3Q 2026",
      description:
        "MOR biased dual-target non-opioid analgesic simultaneously modulating TRPV1 and MOR. Zero hyperthermia, long-lasting pain relief without addiction or tolerance risk.",
    },
  ],
};

/* Several locale strings bake a directional arrow into the copy
   ("파이프라인 상세 →", "← عرض الكل"), and the link component renders its own
   SVG arrow, so every one of these links showed two arrows. Strip the glyph at
   render time rather than editing seven locale tables. */
const stripArrow = (s: string) =>
  s.replace(/[\u2190\u2192\u27a1\u2b05]/g, "").trim();

type Partner = {
  name: string;
  role: string;
  logo: string;
  initials: string;
  color: string;
};
const PARTNERS: Record<string, Partner[]> = {
  ko: [
    {
      name: "서울대학교 병원",
      role: "임상시험 수행 기관, 제3자 검증기관",
      logo: "/images/partners/snuh.jpg",
      initials: "SNUH",
      color: "blue",
    },
    {
      name: "POSTECH",
      role: "Cryo-EM, MoA 검증기관",
      logo: "/images/partners/postech.png",
      initials: "POST",
      color: "red",
    },
    {
      name: "한림제약",
      role: "RCI001 국내 라이선싱(공동연구)",
      logo: "/images/partners/hanlim.png",
      initials: "HL",
      color: "teal",
    },
    {
      name: "프랑스 동물의약품 회사",
      role: "동물의약품 공동개발",
      logo: "pictogram:animal",
      initials: "VP",
      color: "indigo",
    },
    {
      name: "WuXi AppTec",
      role: "CDMO, Process Development",
      logo: "/images/partners/wuxi.jpg",
      initials: "WX",
      color: "emerald",
    },
    {
      name: "한미정밀화학",
      role: "RCI001/RCI002 GMP 생산",
      logo: "/images/partners/hanmi.gif",
      initials: "HM",
      color: "violet",
    },
    {
      name: "동아ST",
      role: "CDMO",
      logo: "/images/partners/dongast.png",
      initials: "DA",
      color: "orange",
    },
    {
      name: "Pharmaron",
      role: "CDMO",
      logo: "/images/partners/pharmaron.svg",
      initials: "PR",
      color: "cyan",
    },
    {
      name: "DT&CRO",
      role: "독성시험 평가기관",
      logo: "/images/partners/dtcro.png",
      initials: "DT",
      color: "rose",
    },
  ],
  en: [
    {
      name: "Seoul National Univ. Hospital",
      role: "Clinical Trial Conducting Org, Third-Party Validation",
      logo: "/images/partners/snuh.jpg",
      initials: "SNUH",
      color: "blue",
    },
    {
      name: "POSTECH",
      role: "Cryo-EM, MoA Validation",
      logo: "/images/partners/postech.png",
      initials: "POST",
      color: "red",
    },
    {
      name: "Hanlim Pharma",
      role: "RCI001 Domestic Licensing (Co-research)",
      logo: "/images/partners/hanlim.png",
      initials: "HL",
      color: "teal",
    },
    {
      name: "French Veterinary Pharma",
      role: "Veterinary Co-development",
      logo: "pictogram:animal",
      initials: "VP",
      color: "indigo",
    },
    {
      name: "WuXi AppTec",
      role: "CDMO, Process Development",
      logo: "/images/partners/wuxi.jpg",
      initials: "WX",
      color: "emerald",
    },
    {
      name: "Hanmi Fine Chemical",
      role: "RCI001/RCI002 GMP Production",
      logo: "/images/partners/hanmi.gif",
      initials: "HM",
      color: "violet",
    },
    {
      name: "Dong-A ST",
      role: "CDMO",
      logo: "/images/partners/dongast.png",
      initials: "DA",
      color: "orange",
    },
    {
      name: "Pharmaron",
      role: "CDMO",
      logo: "/images/partners/pharmaron.svg",
      initials: "PR",
      color: "cyan",
    },
    {
      name: "DT&CRO",
      role: "Toxicology Testing Agency",
      logo: "/images/partners/dtcro.png",
      initials: "DT",
      color: "rose",
    },
  ],
  zh: [
    {
      name: "Seoul National Univ. Hospital",
      role: "临床试验执行机构，第三方验证机构",
      logo: "/images/partners/snuh.jpg",
      initials: "SNUH",
      color: "blue",
    },
    {
      name: "POSTECH",
      role: "冷冻电镜，作用机制验证机构",
      logo: "/images/partners/postech.png",
      initials: "POST",
      color: "red",
    },
    {
      name: "Hanlim Pharma",
      role: "RCI001 国内许可（合作研究）",
      logo: "/images/partners/hanlim.png",
      initials: "HL",
      color: "teal",
    },
    {
      name: "French Veterinary Pharma",
      role: "动物药品联合开发",
      logo: "pictogram:animal",
      initials: "VP",
      color: "indigo",
    },
    {
      name: "WuXi AppTec",
      role: "CDMO，工艺开发",
      logo: "/images/partners/wuxi.jpg",
      initials: "WX",
      color: "emerald",
    },
    {
      name: "Hanmi Fine Chemical",
      role: "RCI001/RCI002 GMP生产",
      logo: "/images/partners/hanmi.gif",
      initials: "HM",
      color: "violet",
    },
    {
      name: "Dong-A ST",
      role: "CDMO",
      logo: "/images/partners/dongast.png",
      initials: "DA",
      color: "orange",
    },
    {
      name: "Pharmaron",
      role: "CDMO",
      logo: "/images/partners/pharmaron.svg",
      initials: "PR",
      color: "cyan",
    },
    {
      name: "DT&CRO",
      role: "毒理试验评估机构",
      logo: "/images/partners/dtcro.png",
      initials: "DT",
      color: "rose",
    },
  ],
  ja: [
    {
      name: "Seoul National Univ. Hospital",
      role: "臨床試験実施機関、第三者検証機関",
      logo: "/images/partners/snuh.jpg",
      initials: "SNUH",
      color: "blue",
    },
    {
      name: "POSTECH",
      role: "Cryo-EM、MoA検証機関",
      logo: "/images/partners/postech.png",
      initials: "POST",
      color: "red",
    },
    {
      name: "Hanlim Pharma",
      role: "RCI001 国内ライセンシング（共同研究）",
      logo: "/images/partners/hanlim.png",
      initials: "HL",
      color: "teal",
    },
    {
      name: "French Veterinary Pharma",
      role: "動物用医薬品共同開発",
      logo: "pictogram:animal",
      initials: "VP",
      color: "indigo",
    },
    {
      name: "WuXi AppTec",
      role: "CDMO、プロセス開発",
      logo: "/images/partners/wuxi.jpg",
      initials: "WX",
      color: "emerald",
    },
    {
      name: "Hanmi Fine Chemical",
      role: "RCI001/RCI002 GMP製造",
      logo: "/images/partners/hanmi.gif",
      initials: "HM",
      color: "violet",
    },
    {
      name: "Dong-A ST",
      role: "CDMO",
      logo: "/images/partners/dongast.png",
      initials: "DA",
      color: "orange",
    },
    {
      name: "Pharmaron",
      role: "CDMO",
      logo: "/images/partners/pharmaron.svg",
      initials: "PR",
      color: "cyan",
    },
    {
      name: "DT&CRO",
      role: "毒性試験評価機関",
      logo: "/images/partners/dtcro.png",
      initials: "DT",
      color: "rose",
    },
  ],
  es: [
    {
      name: "Seoul National Univ. Hospital",
      role: "Organización de ensayos clínicos, validación independiente",
      logo: "/images/partners/snuh.jpg",
      initials: "SNUH",
      color: "blue",
    },
    {
      name: "POSTECH",
      role: "Cryo-EM, validación de MoA",
      logo: "/images/partners/postech.png",
      initials: "POST",
      color: "red",
    },
    {
      name: "Hanlim Pharma",
      role: "Licencia nacional de RCI001 (investigación conjunta)",
      logo: "/images/partners/hanlim.png",
      initials: "HL",
      color: "teal",
    },
    {
      name: "French Veterinary Pharma",
      role: "Codesarrollo veterinario",
      logo: "pictogram:animal",
      initials: "VP",
      color: "indigo",
    },
    {
      name: "WuXi AppTec",
      role: "CDMO, desarrollo de procesos",
      logo: "/images/partners/wuxi.jpg",
      initials: "WX",
      color: "emerald",
    },
    {
      name: "Hanmi Fine Chemical",
      role: "Producción GMP de RCI001/RCI002",
      logo: "/images/partners/hanmi.gif",
      initials: "HM",
      color: "violet",
    },
    {
      name: "Dong-A ST",
      role: "CDMO",
      logo: "/images/partners/dongast.png",
      initials: "DA",
      color: "orange",
    },
    {
      name: "Pharmaron",
      role: "CDMO",
      logo: "/images/partners/pharmaron.svg",
      initials: "PR",
      color: "cyan",
    },
    {
      name: "DT&CRO",
      role: "Agencia de evaluación toxicológica",
      logo: "/images/partners/dtcro.png",
      initials: "DT",
      color: "rose",
    },
  ],
  fr: [
    {
      name: "Seoul National Univ. Hospital",
      role: "Organisation d'essais cliniques, validation tierce",
      logo: "/images/partners/snuh.jpg",
      initials: "SNUH",
      color: "blue",
    },
    {
      name: "POSTECH",
      role: "Cryo-EM, validation du MoA",
      logo: "/images/partners/postech.png",
      initials: "POST",
      color: "red",
    },
    {
      name: "Hanlim Pharma",
      role: "Licence nationale RCI001 (recherche conjointe)",
      logo: "/images/partners/hanlim.png",
      initials: "HL",
      color: "teal",
    },
    {
      name: "French Veterinary Pharma",
      role: "Co-développement vétérinaire",
      logo: "pictogram:animal",
      initials: "VP",
      color: "indigo",
    },
    {
      name: "WuXi AppTec",
      role: "CDMO, développement de procédés",
      logo: "/images/partners/wuxi.jpg",
      initials: "WX",
      color: "emerald",
    },
    {
      name: "Hanmi Fine Chemical",
      role: "Production GMP RCI001/RCI002",
      logo: "/images/partners/hanmi.gif",
      initials: "HM",
      color: "violet",
    },
    {
      name: "Dong-A ST",
      role: "CDMO",
      logo: "/images/partners/dongast.png",
      initials: "DA",
      color: "orange",
    },
    {
      name: "Pharmaron",
      role: "CDMO",
      logo: "/images/partners/pharmaron.svg",
      initials: "PR",
      color: "cyan",
    },
    {
      name: "DT&CRO",
      role: "Agence d'évaluation toxicologique",
      logo: "/images/partners/dtcro.png",
      initials: "DT",
      color: "rose",
    },
  ],
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const loc = toDataLocale(locale as Locale);
  const partners = PARTNERS[locale] ?? PARTNERS.en;
  const pipeline = PIPELINE[loc];

  /* The first two entries are capabilities, not measurements. They were
     previously rendered in the same large numeral style as the market figure
     using invented abbreviations ("EP", "MT"), which gave a label the visual
     authority of data. Capabilities and the one real figure are now typed
     differently. */
  const CAPABILITIES = [
    {
      title: t("rucia.metric.time"),
      sub: t("rucia.metric.time.sub"),
    },
    {
      title: t("rucia.metric.selectivity"),
      sub: t("rucia.metric.selectivity.sub"),
    },
  ];

  const MARKET_STAT = {
    value: t("rucia.metric.market"),
    sub: t("rucia.metric.market.sub"),
  };

  return (
    <>
      {/* 구인 팝업: 한국어 홈에서만, 세션당 1회 (충원 시 recruit-popup.tsx의 ACTIVE=false) */}
      {locale === "ko" && <RecruitPopup />}

      {/* ===== Hero =====
          Identity, not indication. The previous hero was a full-bleed dry-eye
          photograph, which represents RCI001 alone; the company is a membrane
          -protein drug discovery platform. The bilayer/ion-channel canvas below
          carries that identity and stays valid as the pipeline expands. */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#080c11]">
        {/* Depth: one cool wash, one warm accent. No competing hues. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,#122c31_0%,#0b1419_42%,#070a0e_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#060a0d] via-[#060a0d]/60 to-transparent" />

        <Trpv1Hero />

        <div className="container-rc relative z-10 w-full pt-36 pb-32">
          <div className="max-w-[46rem]">
            <p className="section-label on-dark animate-hero-blur-in">
              {t("hero.tagline")}
            </p>

            <div className="hero-line-accent mt-6 mb-8 h-px w-14 bg-teal-400/60" />

            <h1
              className="type-h1 brand-line animate-hero-blur-in text-white"
              style={{ animationDelay: "0.12s" }}
            >
              {t("hero.title1")}
              <br />
              <span className="text-teal-300">{t("hero.title2")}</span>
            </h1>

            <p
              className="animate-hero-blur-in measure mt-8 text-[1.0625rem] leading-[1.75] text-slate-300/90"
              style={{ animationDelay: "0.24s" }}
            >
              {t("hero.description")}
            </p>

            <div
              className="animate-hero-blur-in mt-11 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.36s" }}
            >
              <Link
                href={`/${locale}/pipeline`}
                className="btn btn-primary"
              >
                {t("hero.cta.pipeline")}
              </Link>
              <Link
                href={`/${locale}/science`}
                className="btn btn-ghost-light"
              >
                {t("hero.cta.science")}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-scroll-hint absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-white/45">
            Scroll
          </span>
          <div className="h-9 w-px bg-gradient-to-b from-white/35 to-transparent" />
        </div>
      </section>

      {/* ===== Core technology ===== */}
      <section className="section section-sunken">
        <div className="container-rc grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal animation="reveal-left">
            <p className="section-label">{t("rucia.tag")}</p>
            <h2 className="section-heading mt-5">
              {t("rucia.title1")} <em>{t("rucia.title2")}</em>
            </h2>
            <p className="type-body measure mt-6">{t("rucia.description")}</p>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="stat">
                  <dt className="text-[0.9375rem] font-semibold leading-snug tracking-[-0.015em] text-[var(--rc-ink-900)]">
                    {c.title}
                  </dt>
                  <dd className="stat-sub mt-2">{c.sub}</dd>
                </div>
              ))}
              <div className="stat">
                <dt className="stat-value num text-[1.75rem] leading-none">
                  {MARKET_STAT.value}
                </dt>
                <dd className="stat-sub mt-2">{MARKET_STAT.sub}</dd>
              </div>
            </dl>
          </ScrollReveal>

          <ScrollReveal animation="scale-in" delay={160}>
            {/* RudaCure's own molecular-dynamics output, not an illustration.
                The previous figure was an AI-generated diagram with baked-in
                English labels and rendering artefacts — the least credible
                asset on a page whose argument is computational rigour. A real
                simulation frame carries the same message and survives
                technical scrutiny from a partner or an underwriter. */}
            <figure className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src="/images/science/membrane-md.jpg"
                  alt="Molecular dynamics simulation of a membrane protein embedded in an explicit lipid bilayer, produced on the RuCIA platform"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="type-caption border-t border-[var(--rc-hairline)] px-5 py-3.5">
                RuCIA — membrane protein in an explicit lipid bilayer (MD)
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Pipeline ===== */}
      <section className="section">
        <div className="container-rc">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between gap-8">
              <div>
                <p className="section-label">{t("pipeline.tag")}</p>
                <h2 className="section-heading mt-5">
                  {t("pipeline.title1")} <em>{t("pipeline.title2")}</em>
                </h2>
              </div>
              <Link
                href={`/${locale}/pipeline`}
                className="link-arrow hidden shrink-0 sm:inline-flex"
              >
                {stripArrow(t("pipeline.view_news"))}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pipeline.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 150}>
                <Link
                  href={`/${locale}/pipeline`}
                  className="card card-interactive group block p-7 sm:p-9"
                >
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="pill pill-accent num">{p.id}</span>
                    <span className="type-caption num">{p.status}</span>
                  </div>

                  {/* Indication */}
                  <h3 className="type-h3 transition-colors group-hover:text-[var(--rc-accent-deep)]">
                    {p.indication}
                  </h3>
                  <p className="type-body mt-3 line-clamp-2 text-[0.9375rem] leading-[1.7]">
                    {p.description}
                  </p>

                  {/* Progress */}
                  <div className="mt-8">
                    <div className="type-caption mb-2.5 flex justify-between">
                      <span>Progress</span>
                      <span className="num font-medium text-[var(--rc-ink-700)]">
                        {p.progress}%
                      </span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-7 flex items-center justify-between border-t border-[var(--rc-hairline)] pt-5">
                    <span className="type-caption num">
                      Target: {p.target}
                    </span>
                    <span className="type-caption flex items-center gap-1.5 transition-colors group-hover:text-[var(--rc-accent-deep)]">
                      {p.milestone}
                      <svg
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Partners ===== */}
      <section className="section section-sunken">
        <div className="container-rc">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="section-label">{t("home.partners.tag")}</p>
              <h2 className="section-heading mt-5">
                {t("home.partners.title1")}
                <em>{t("home.partners.title2")}</em>
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
              const badgeClass =
                colorMap[p.color] || "bg-gray-50 text-gray-600";
              return (
                <ScrollReveal key={p.name} delay={i * 70}>
                  <div className="card flex h-full cursor-default items-center gap-4 px-5 py-4.5">
                    {/* Logo or initials fallback */}
                    <PartnerLogo
                      src={p.logo}
                      alt={p.name}
                      initials={p.initials}
                      badgeClass={badgeClass}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[0.9375rem] font-semibold leading-tight text-[var(--rc-ink-800)]">
                        {p.name}
                      </div>
                      <div className="type-caption mt-1">{p.role}</div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Recent News ===== */}
      <section className="section">
        <div className="container-rc">
          <ScrollReveal>
            <div className="mb-10 flex items-end justify-between gap-8">
              <div>
                <p className="section-label">{t("home.news.tag")}</p>
                <h2 className="section-heading mt-5">
                  {t("home.news.title1")}
                  <em>{t("home.news.title2")}</em>
                </h2>
              </div>
              <Link
                href={`/${locale}/news`}
                className="link-arrow hidden shrink-0 sm:inline-flex"
              >
                {stripArrow(t("home.news.viewAll"))}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
          {/* A flush hairline list, not nine floating cards. Lists of
              same-shaped links read faster without per-item chrome. */}
          <div className="border-t border-[var(--rc-hairline)]">
            {(
              {
                ko: newsKo,
                en: newsEn,
                zh: newsZh,
                ja: newsJa,
                es: newsEs,
                fr: newsFr,
              }[locale] ?? newsEn
            )
              .slice(0, 5)
              .map(
                (
                  article: {
                    id: number;
                    title: string;
                    date: string;
                    category: string;
                  },
                  i: number,
                ) => (
                  <ScrollReveal key={article.id} delay={i * 60}>
                    <Link
                      href={`/${locale}/news/${article.id}`}
                      className="row group -mx-4 flex items-center gap-5 rounded-lg px-4 py-5"
                    >
                      {/* Fixed width so every headline starts on the same
                          optical column regardless of category length. */}
                      <span className="pill pill-accent w-[78px] shrink-0 justify-center">
                        {article.category}
                      </span>
                      <h3 className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-[var(--rc-ink-800)] transition-colors group-hover:text-[var(--rc-accent-deep)]">
                        {article.title}
                      </h3>
                      <span className="type-caption num hidden shrink-0 sm:block">
                        {article.date}
                      </span>
                      <svg
                        className="h-4 w-4 shrink-0 text-[var(--rc-ink-400)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--rc-accent)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </ScrollReveal>
                ),
              )}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section relative overflow-hidden bg-[#080c11] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#122c31_0%,transparent_70%)]" />

        <ScrollReveal>
          <div className="container-rc relative text-center">
            <h2 className="section-heading on-dark">
              {t("cta.title1")}{" "}
              <span className="text-teal-300">{t("cta.title2")}</span>
            </h2>
            <p className="measure mx-auto mt-5 text-[1.0625rem] leading-[1.75] text-slate-400">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="btn btn-primary mt-10"
            >
              {t("cta.button")}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
