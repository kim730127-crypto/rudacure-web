import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";

/* ── Helper: resolve locale to a data key, defaulting non-ko to "en" ── */
type IRLocale = "ko" | "en" | "zh" | "ja" | "es" | "fr";
const SUPPORTED: ReadonlySet<string> = new Set(["ko", "en", "zh", "ja", "es", "fr"]);
function toIRLocale(locale: string): IRLocale {
  return SUPPORTED.has(locale) ? (locale as IRLocale) : "en";
}

/* ── Per-locale label helper (ko-specific, all others default to en) ── */
function label(locale: IRLocale, texts: Record<IRLocale, string>): string {
  return texts[locale];
}

/* ── Data records ── */

const HIGHLIGHTS: Record<IRLocale, { value: string; label: string; sub: string }[]> = {
  ko: [
    { value: "$94B", label: "글로벌 만성통증 시장", sub: "2030년 전망" },
    { value: "Phase 2", label: "RCI001 FDA 임상", sub: "안구건조증 (진행 중)" },
    { value: "70%", label: "개발 기간 단축", sub: "RuCIA AI 플랫폼" },
    { value: "3", label: "핵심 파이프라인", sub: "RCI001 / RCI002 / RCI0165" },
  ],
  en: [
    { value: "$94B", label: "Global Chronic Pain Market", sub: "Projected by 2030" },
    { value: "Phase 2", label: "RCI001 FDA Clinical Trial", sub: "Dry Eye Disease (Ongoing)" },
    { value: "70%", label: "Development Time Reduction", sub: "RuCIA AI Platform" },
    { value: "3", label: "Core Pipelines", sub: "RCI001 / RCI002 / RCI0165" },
  ],
  zh: [
    { value: "$94B", label: "全球慢性疼痛市场", sub: "2030年预测" },
    { value: "Phase 2", label: "RCI001 FDA临床试验", sub: "干眼症（进行中）" },
    { value: "70%", label: "开发周期缩短", sub: "RuCIA AI平台" },
    { value: "3", label: "核心管线", sub: "RCI001 / RCI002 / RCI0165" },
  ],
  ja: [
    { value: "$94B", label: "世界の慢性疼痛市場", sub: "2030年予測" },
    { value: "Phase 2", label: "RCI001 FDA臨床試験", sub: "ドライアイ（進行中）" },
    { value: "70%", label: "開発期間短縮", sub: "RuCIA AIプラットフォーム" },
    { value: "3", label: "コアパイプライン", sub: "RCI001 / RCI002 / RCI0165" },
  ],
  es: [
    { value: "$94B", label: "Mercado Global de Dolor Cronico", sub: "Proyectado para 2030" },
    { value: "Phase 2", label: "Ensayo Clinico FDA RCI001", sub: "Ojo Seco (En curso)" },
    { value: "70%", label: "Reduccion del Tiempo de Desarrollo", sub: "Plataforma RuCIA AI" },
    { value: "3", label: "Pipelines Principales", sub: "RCI001 / RCI002 / RCI0165" },
  ],
  fr: [
    { value: "$94B", label: "Marche Mondial de la Douleur Chronique", sub: "Projection 2030" },
    { value: "Phase 2", label: "Essai Clinique FDA RCI001", sub: "Secheresse Oculaire (En cours)" },
    { value: "70%", label: "Reduction du Temps de Developpement", sub: "Plateforme RuCIA AI" },
    { value: "3", label: "Pipelines Principaux", sub: "RCI001 / RCI002 / RCI0165" },
  ],
};

const ROADMAP: Record<IRLocale, { quarter: string; title: string; status: string }[]> = {
  ko: [
    { quarter: "Q1 2026", title: "IPO 주관사 선정 및 본격 IPO 돌입", status: "active" },
    { quarter: "Q2 2026", title: "RCI001 국내 임상 2상 진입", status: "upcoming" },
    { quarter: "Q3 2026", title: "RCI002 ODD 지정 / 시리즈 투자 진행", status: "upcoming" },
    { quarter: "Q4 2026", title: "RCI002 글로벌 라이선싱", status: "upcoming" },
  ],
  en: [
    { quarter: "Q1 2026", title: "IPO Underwriter Selection & Full-Scale IPO Launch", status: "active" },
    { quarter: "Q2 2026", title: "RCI001 Korea Phase 2 Clinical Trial Entry", status: "upcoming" },
    { quarter: "Q3 2026", title: "RCI002 ODD Designation / Series Investment", status: "upcoming" },
    { quarter: "Q4 2026", title: "RCI002 Global Licensing", status: "upcoming" },
  ],
  zh: [
    { quarter: "Q1 2026", title: "IPO承销商选定及全面启动IPO", status: "active" },
    { quarter: "Q2 2026", title: "RCI001韩国二期临床试验启动", status: "upcoming" },
    { quarter: "Q3 2026", title: "RCI002 ODD认定 / 系列融资", status: "upcoming" },
    { quarter: "Q4 2026", title: "RCI002全球授权许可", status: "upcoming" },
  ],
  ja: [
    { quarter: "Q1 2026", title: "IPO主幹事選定及び本格IPO開始", status: "active" },
    { quarter: "Q2 2026", title: "RCI001韓国第2相臨床試験開始", status: "upcoming" },
    { quarter: "Q3 2026", title: "RCI002 ODD指定 / シリーズ投資", status: "upcoming" },
    { quarter: "Q4 2026", title: "RCI002グローバルライセンシング", status: "upcoming" },
  ],
  es: [
    { quarter: "Q1 2026", title: "Seleccion de Suscriptor de IPO y Lanzamiento Completo", status: "active" },
    { quarter: "Q2 2026", title: "RCI001 Entrada a Fase 2 en Corea", status: "upcoming" },
    { quarter: "Q3 2026", title: "RCI002 Designacion ODD / Inversion en Serie", status: "upcoming" },
    { quarter: "Q4 2026", title: "RCI002 Licenciamiento Global", status: "upcoming" },
  ],
  fr: [
    { quarter: "Q1 2026", title: "Selection du Souscripteur IPO et Lancement Complet", status: "active" },
    { quarter: "Q2 2026", title: "RCI001 Entree en Phase 2 en Coree", status: "upcoming" },
    { quarter: "Q3 2026", title: "RCI002 Designation ODD / Investissement en Serie", status: "upcoming" },
    { quarter: "Q4 2026", title: "RCI002 Licence Mondiale", status: "upcoming" },
  ],
};

const ICONS = {
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M20.5 11.5L14 18l-2.5-2.5" />
      <path d="M3.5 11.5L10 18l1.5-1.5" />
      <path d="M2 7.5h5l3-3 4 4 3-3h5" />
      <path d="M2 7.5l4 4" />
      <path d="M22 7.5l-4 4" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-6 4 3 5-7" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

const INVESTMENT_CASE: Record<IRLocale, { title: string; description: string; icon: "handshake" | "chart" | "ai" | "target" }[]> = {
  ko: [
    { title: "검증된 라이선싱 실적", description: "한림제약 RCI001/RCI001U 국내 라이선싱 계약 완료. 프랑스 동물의약품 회사 라이선싱 계약 완료. 글로벌 파트너십 확대 중.", icon: "handshake" },
    { title: "다각화된 수익원", description: "인체 의약품, 동물의약품, 의약품 원료 공급, CRO 서비스로 수익 다변화 및 지속가능기업 구현.", icon: "chart" },
    { title: "확장 가능한 AI 플랫폼", description: "RuCIA로 후보물질 발굴 시간/비용 대폭 절감. 감각 질환 전반으로 적용 확대.", icon: "ai" },
    { title: "Non-Opioid 시장 선점", description: "FDA/EMA가 비중독성 대안을 우선시하는 규제 환경에서 TRPV1 플랫폼의 전략적 우위.", icon: "target" },
  ],
  en: [
    { title: "Proven Licensing Track Record", description: "Hanlim Pharma RCI001/RCI001U domestic licensing. French veterinary pharmaceutical licensing completed. Expanding global partnerships.", icon: "handshake" },
    { title: "Diversified Revenue Streams", description: "Human pharmaceuticals, veterinary medicines, API supply, and CRO services for revenue diversification and sustainable growth.", icon: "chart" },
    { title: "Scalable AI Platform", description: "RuCIA enables rapid candidate identification with significantly reduced cost and development time.", icon: "ai" },
    { title: "Non-Opioid Market Leadership", description: "Strategic advantage in a regulatory environment where FDA/EMA prioritize non-addictive alternatives.", icon: "target" },
  ],
  zh: [
    { title: "经验证的授权许可业绩", description: "韩林制药RCI001/RCI001U国内授权许可完成。法国动物药品公司授权许可完成。全球合作伙伴关系持续扩大。", icon: "handshake" },
    { title: "多元化收入来源", description: "人用药品、动物药品、原料药供应及CRO服务，实现收入多元化与可持续发展。", icon: "chart" },
    { title: "可扩展的AI平台", description: "RuCIA大幅缩短候选药物发现时间与成本，向感觉疾病全领域扩展应用。", icon: "ai" },
    { title: "非阿片类市场先发优势", description: "在FDA/EMA优先考虑非成瘾替代方案的监管环境中，TRPV1平台具有战略优势。", icon: "target" },
  ],
  ja: [
    { title: "実績あるライセンシング", description: "韓林製薬RCI001/RCI001U国内ライセンシング契約完了。フランス動物薬品会社ライセンシング完了。グローバルパートナーシップ拡大中。", icon: "handshake" },
    { title: "多角化された収益源", description: "人体医薬品、動物用医薬品、原薬供給、CROサービスによる収益多角化と持続可能な成長の実現。", icon: "chart" },
    { title: "スケーラブルなAIプラットフォーム", description: "RuCIAにより候補物質の発掘時間とコストを大幅に削減。感覚疾患全般への適用拡大。", icon: "ai" },
    { title: "Non-Opioid市場のリーダーシップ", description: "FDA/EMAが非依存性代替薬を優先する規制環境におけるTRPV1プラットフォームの戦略的優位性。", icon: "target" },
  ],
  es: [
    { title: "Trayectoria Comprobada en Licencias", description: "Licencia domestica de Hanlim Pharma RCI001/RCI001U. Licencia de farmaceutica veterinaria francesa completada. Expansion de alianzas globales.", icon: "handshake" },
    { title: "Fuentes de Ingresos Diversificadas", description: "Farmaceuticos humanos, medicamentos veterinarios, suministro de API y servicios CRO para diversificacion de ingresos y crecimiento sostenible.", icon: "chart" },
    { title: "Plataforma de IA Escalable", description: "RuCIA permite la identificacion rapida de candidatos con reduccion significativa de costo y tiempo de desarrollo.", icon: "ai" },
    { title: "Liderazgo en el Mercado No Opioide", description: "Ventaja estrategica en un entorno regulatorio donde la FDA/EMA priorizan alternativas no adictivas.", icon: "target" },
  ],
  fr: [
    { title: "Bilan Eprouve en Licences", description: "Licence domestique Hanlim Pharma RCI001/RCI001U. Licence pharmaceutique veterinaire francaise completee. Expansion des partenariats mondiaux.", icon: "handshake" },
    { title: "Sources de Revenus Diversifiees", description: "Produits pharmaceutiques humains, medicaments veterinaires, fourniture d'API et services CRO pour la diversification des revenus et la croissance durable.", icon: "chart" },
    { title: "Plateforme IA Evolutive", description: "RuCIA permet l'identification rapide de candidats avec une reduction significative des couts et du temps de developpement.", icon: "ai" },
    { title: "Leadership sur le Marche Non Opioide", description: "Avantage strategique dans un environnement reglementaire ou la FDA/EMA privilegient les alternatives non addictives.", icon: "target" },
  ],
};

const FINANCIALS: Record<IRLocale, { label: string; value: string }[]> = {
  ko: [
    { label: "설립", value: "2018년" },
    { label: "누적 정부 과제", value: "약 50억원+" },
    { label: "주요 라이선싱", value: "한림제약 (RCI001/RCI001U), 프랑스 동물의약품 회사 (RCI001AH)" },
    { label: "IPO 준비", value: "주관사 선정 완료 (2025)" },
    { label: "핵심 자산", value: "RuCIA 플랫폼 + 3개 파이프라인" },
    { label: "특허 포트폴리오", value: "한국/일본/미국 다수 등록" },
  ],
  en: [
    { label: "Founded", value: "2018" },
    { label: "Cumulative Gov't Grants", value: "~$4M+" },
    { label: "Key Licensing", value: "Hanlim Pharma (RCI001/RCI001U), French Vet Pharma (RCI001AH)" },
    { label: "IPO Preparation", value: "Underwriter Selected (2025)" },
    { label: "Core Assets", value: "RuCIA Platform + 3 Pipelines" },
    { label: "Patent Portfolio", value: "Korea / Japan / US" },
  ],
  zh: [
    { label: "成立", value: "2018年" },
    { label: "累计政府资助", value: "约40亿韩元+" },
    { label: "主要授权许可", value: "韩林制药 (RCI001/RCI001U)，法国动物药品公司 (RCI001AH)" },
    { label: "IPO准备", value: "承销商已选定 (2025)" },
    { label: "核心资产", value: "RuCIA平台 + 3条管线" },
    { label: "专利组合", value: "韩国/日本/美国多项注册" },
  ],
  ja: [
    { label: "設立", value: "2018年" },
    { label: "累計政府助成金", value: "約50億ウォン+" },
    { label: "主要ライセンシング", value: "韓林製薬 (RCI001/RCI001U)、フランス動物薬品会社 (RCI001AH)" },
    { label: "IPO準備", value: "主幹事選定完了 (2025)" },
    { label: "コア資産", value: "RuCIAプラットフォーム + 3パイプライン" },
    { label: "特許ポートフォリオ", value: "韓国/日本/米国 多数登録" },
  ],
  es: [
    { label: "Fundada", value: "2018" },
    { label: "Subvenciones Gubernamentales Acumuladas", value: "~$4M+" },
    { label: "Licencias Principales", value: "Hanlim Pharma (RCI001/RCI001U), Farmaceutica Veterinaria Francesa (RCI001AH)" },
    { label: "Preparacion para IPO", value: "Suscriptor Seleccionado (2025)" },
    { label: "Activos Principales", value: "Plataforma RuCIA + 3 Pipelines" },
    { label: "Portafolio de Patentes", value: "Corea / Japon / EE.UU." },
  ],
  fr: [
    { label: "Fondee", value: "2018" },
    { label: "Subventions Gouvernementales Cumulees", value: "~4M$+" },
    { label: "Licences Principales", value: "Hanlim Pharma (RCI001/RCI001U), Pharma Veterinaire Francaise (RCI001AH)" },
    { label: "Preparation IPO", value: "Souscripteur Selectionne (2025)" },
    { label: "Actifs Principaux", value: "Plateforme RuCIA + 3 Pipelines" },
    { label: "Portefeuille de Brevets", value: "Coree / Japon / USA" },
  ],
};

const PARTNERS = [
  { name: "Hanlim Pharmaceuticals", type: "Licensing" },
  { name: "French Veterinary Pharma", type: "Animal Health" },
  { name: "DT&CRO", type: "Research CRO" },
  { name: "WuXi AppTec", type: "CDMO" },
  { name: "Hanmi Fine Chemical", type: "CDMO" },
  { name: "Hallym Univ. Hospital", type: "Clinical Data" },
];

/* ── Inline text records for section labels ── */

const TEXT_INVESTORS: Record<IRLocale, string> = {
  ko: "투자자 정보", en: "Investors", zh: "投资者信息", ja: "投資家情報", es: "Inversionistas", fr: "Investisseurs",
};

const TEXT_HEADER_DESC: Record<IRLocale, string> = {
  ko: "루다큐어는 AI 기반 이온채널 신약개발 기업으로, 비마약성 통증/감각질환 치료제를 개발하고 있습니다. 검증된 파이프라인과 확장 가능한 AI 플랫폼으로 IPO를 준비하고 있습니다.",
  en: "RudaCure is an AI-driven biotech company developing non-opioid therapeutics for pain and sensory diseases. We are preparing for IPO with a proven pipeline and scalable AI platform.",
  zh: "RudaCure是一家AI驱动的生物技术公司，致力于开发非阿片类疼痛和感觉疾病治疗药物。我们凭借成熟的管线和可扩展的AI平台正在准备IPO。",
  ja: "RudaCureはAI駆動のバイオテック企業として、非オピオイド系の疼痛・感覚疾患治療薬を開発しています。実績あるパイプラインとスケーラブルなAIプラットフォームでIPOを準備しています。",
  es: "RudaCure es una empresa biotecnologica impulsada por IA que desarrolla terapeuticos no opioides para el dolor y las enfermedades sensoriales. Nos preparamos para la IPO con un pipeline probado y una plataforma de IA escalable.",
  fr: "RudaCure est une entreprise biotech pilotee par l'IA qui developpe des therapeutiques non opioides pour la douleur et les maladies sensorielles. Nous preparons notre IPO avec un pipeline eprouve et une plateforme IA evolutive.",
};

const TEXT_STRATEGIC_ROADMAP: Record<IRLocale, string> = {
  ko: "전략 로드맵", en: "Strategic Roadmap", zh: "战略路线图", ja: "戦略ロードマップ", es: "Hoja de Ruta Estrategica", fr: "Feuille de Route Strategique",
};

const TEXT_WHY_INVEST: Record<IRLocale, string> = {
  ko: "투자 포인트", en: "Why Invest", zh: "投资亮点", ja: "投資ポイント", es: "Por Que Invertir", fr: "Pourquoi Investir",
};

const TEXT_COMPANY_SNAPSHOT: Record<IRLocale, string> = {
  ko: "회사 개요", en: "Company Snapshot", zh: "公司概览", ja: "会社概要", es: "Perfil de la Empresa", fr: "Apercu de l'Entreprise",
};

const TEXT_STRATEGIC_PARTNERS: Record<IRLocale, string> = {
  ko: "전략적 파트너", en: "Strategic Partners", zh: "战略合作伙伴", ja: "戦略的パートナー", es: "Socios Estrategicos", fr: "Partenaires Strategiques",
};

const TEXT_PARTNERS: Record<IRLocale, string> = {
  ko: "파트너십", en: "Partners", zh: "合作伙伴", ja: "パートナーシップ", es: "Socios", fr: "Partenaires",
};

const TEXT_CTA_DESC: Record<IRLocale, string> = {
  ko: "투자 문의, 파트너십 제안, IR 자료 요청은 아래로 연락해 주세요.",
  en: "For investor inquiries, partnership proposals, or IR materials, please contact us.",
  zh: "如有投资咨询、合作提案或IR资料需求，请联系我们。",
  ja: "投資に関するお問い合わせ、パートナーシップのご提案、IR資料のご請求は下記までご連絡ください。",
  es: "Para consultas de inversionistas, propuestas de alianzas o materiales de IR, contactenos.",
  fr: "Pour les demandes d'investisseurs, les propositions de partenariat ou les documents IR, veuillez nous contacter.",
};

const TEXT_CONTACT_US: Record<IRLocale, string> = {
  ko: "문의하기", en: "Contact Us", zh: "联系我们", ja: "お問い合わせ", es: "Contactenos", fr: "Nous Contacter",
};

const TEXT_META_TITLE: Record<IRLocale, string> = {
  ko: "투자자 정보 | RudaCure",
  en: "Investor Relations | RudaCure",
  zh: "投资者信息 | RudaCure",
  ja: "投資家情報 | RudaCure",
  es: "Relaciones con Inversionistas | RudaCure",
  fr: "Relations Investisseurs | RudaCure",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = toIRLocale(loc);
  return {
    title: TEXT_META_TITLE[locale],
    description: "RudaCure investment overview, pipeline milestones, market opportunity, and 2026 strategic roadmap.",
  };
}

export default async function IRPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = toIRLocale(loc as Locale);

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {label(locale, TEXT_INVESTORS)}
            </p>
            <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
              Investor{" "}
              <em className="italic font-semibold text-gradient-emerald">Relations</em>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              {label(locale, TEXT_HEADER_DESC)}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image src="/images/unnamed.jpg" alt="KOSDAQ IPO Listing Celebration" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="px-6 pb-20 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {HIGHLIGHTS[locale].map((h) => (
            <div key={h.label} className="liquid-glass p-5 text-center">
              <div className="text-3xl font-bold text-gradient-emerald mb-1">{h.value}</div>
              <div className="text-sm text-gray-600">{h.label}</div>
              <div className="text-xs text-gray-600 mt-0.5">{h.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2026 Roadmap */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {label(locale, TEXT_STRATEGIC_ROADMAP)}
          </p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            2026 <em className="italic font-semibold">Milestones</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {ROADMAP[locale].map((item) => (
              <div key={item.quarter} className={`liquid-glass p-5 ${item.status === "active" ? "border-teal-400" : ""}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === "active" ? "bg-teal-500 animate-pulse" : "bg-gray-200"}`} />
                  <span className="text-xs text-gray-600">{item.quarter}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Case */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {label(locale, TEXT_WHY_INVEST)}
          </p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            The Investment <em className="italic font-semibold">Case</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INVESTMENT_CASE[locale].map((item) => (
              <div key={item.title} className="liquid-glass p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-4">
                  {ICONS[item.icon]}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Snapshot */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {label(locale, TEXT_COMPANY_SNAPSHOT)}
            </p>
            <h2 className="text-3xl font-light mb-8 text-gray-900">
              Key <em className="italic font-semibold">Facts</em>
            </h2>
            <div className="liquid-glass overflow-hidden">
              <table className="w-full">
                <tbody>
                  {FINANCIALS[locale].map((row, i) => (
                    <tr key={row.label} className={i < FINANCIALS[locale].length - 1 ? "border-b border-gray-100" : ""}>
                      <td className="p-4 text-sm text-gray-600">{row.label}</td>
                      <td className="p-4 text-sm text-gray-800 font-medium text-right">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {label(locale, TEXT_STRATEGIC_PARTNERS)}
            </p>
            <h2 className="text-3xl font-light mb-8 text-gray-900">
              {label(locale, TEXT_PARTNERS)}
            </h2>
            <div className="space-y-3">
              {PARTNERS.map((p) => (
                <div key={p.name} className="liquid-glass p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">{p.name}</span>
                  <span className="text-xs text-teal-600 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">{p.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <blockquote className="text-xl sm:text-2xl font-light italic text-gray-600 mb-8">
            &ldquo;We don&rsquo;t just treat symptoms; we heal the source of sensory signals.&rdquo;
          </blockquote>
          <p className="text-gray-600 mb-8">
            {label(locale, TEXT_CTA_DESC)}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="mailto:js.shin@rudacure.com" className="btn-primary px-8 py-3 rounded-full font-semibold text-sm">
              js.shin@rudacure.com
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline px-8 py-3 rounded-full border text-sm font-medium">
              {label(locale, TEXT_CONTACT_US)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
