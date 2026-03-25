import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";

const HIGHLIGHTS = {
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
};

const ROADMAP = {
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
};

const INVESTMENT_CASE = {
  ko: [
    { title: "검증된 라이선싱 실적", description: "한림제약 RCI001/RCI001U 국내 라이선싱 계약 완료. Ceva 동물의약품 라이선싱 계약 완료. 글로벌 파트너십 확대 중.", icon: "🤝" },
    { title: "다각화된 수익원", description: "인체 치료제 + 동물 건강(Ceva) + API 수출 + CRO/AI 플랫폼 서비스로 수익 다변화.", icon: "📊" },
    { title: "확장 가능한 AI 플랫폼", description: "RuCIA로 후보물질 발굴 시간/비용 대폭 절감. 감각 질환 전반으로 적용 확대.", icon: "🤖" },
    { title: "Non-Opioid 시장 선점", description: "FDA/EMA가 비중독성 대안을 우선시하는 규제 환경에서 TRPV1 플랫폼의 전략적 우위.", icon: "🎯" },
  ],
  en: [
    { title: "Proven Licensing Track Record", description: "Hanlim Pharma RCI001/RCI001U domestic licensing. Ceva veterinary pharmaceutical licensing completed. Expanding global partnerships.", icon: "🤝" },
    { title: "Diversified Revenue Streams", description: "Human therapeutics + Animal health (Ceva) + API export + CRO/AI platform services.", icon: "📊" },
    { title: "Scalable AI Platform", description: "RuCIA enables rapid candidate identification with significantly reduced cost and development time.", icon: "🤖" },
    { title: "Non-Opioid Market Leadership", description: "Strategic advantage in a regulatory environment where FDA/EMA prioritize non-addictive alternatives.", icon: "🎯" },
  ],
};

const FINANCIALS = {
  ko: [
    { label: "설립", value: "2018년" },
    { label: "누적 정부 과제", value: "약 50억원+" },
    { label: "주요 라이선싱", value: "한림제약 (RCI001/RCI001U), Ceva (동물용 RCI001AH)" },
    { label: "IPO 준비", value: "주관사 선정 완료 (2025)" },
    { label: "핵심 자산", value: "RuCIA 플랫폼 + 3개 파이프라인" },
    { label: "특허 포트폴리오", value: "한국/일본/미국 다수 등록" },
  ],
  en: [
    { label: "Founded", value: "2018" },
    { label: "Cumulative Gov't Grants", value: "~$4M+" },
    { label: "Key Licensing", value: "Hanlim Pharma (RCI001/RCI001U), Ceva (RCI001AH Vet)" },
    { label: "IPO Preparation", value: "Underwriter Selected (2025)" },
    { label: "Core Assets", value: "RuCIA Platform + 3 Pipelines" },
    { label: "Patent Portfolio", value: "Korea / Japan / US" },
  ],
};

const PARTNERS = [
  { name: "Hanlim Pharmaceuticals", type: "Licensing" },
  { name: "Ceva Animal Health", type: "Animal Health" },
  { name: "DT&CRO", type: "Research CRO" },
  { name: "WuXi AppTec", type: "CDMO" },
  { name: "Hanmi Fine Chemical", type: "CDMO" },
  { name: "Hallim Univ. Hospital", type: "Clinical Data" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Investor Relations | RudaCure" : "투자자 정보 | RudaCure",
    description: "RudaCure investment overview, pipeline milestones, market opportunity, and 2026 strategic roadmap.",
  };
}

export default async function IRPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "en" ? "en" : "ko") as Locale;
  const isEn = locale === "en";

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {isEn ? "Investors" : "투자자 정보"}
            </p>
            <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
              Investor{" "}
              <em className="font-playfair italic font-semibold text-gradient-emerald">Relations</em>
            </h1>
            <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
              {isEn
                ? "RudaCure is an AI-driven biotech company developing non-opioid therapeutics for pain and sensory diseases. We are preparing for IPO with a proven pipeline and scalable AI platform."
                : "루다큐어는 AI 기반 이온채널 신약개발 기업으로, 비마약성 통증/감각질환 치료제를 개발하고 있습니다. 검증된 파이프라인과 확장 가능한 AI 플랫폼으로 IPO를 준비하고 있습니다."}
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
            <div key={h.label} className="glass-card p-5 text-center">
              <div className="text-3xl font-bold text-gradient-emerald mb-1">{h.value}</div>
              <div className="text-sm text-gray-600">{h.label}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{h.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2026 Roadmap */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {isEn ? "Strategic Roadmap" : "전략 로드맵"}
          </p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            2026 <em className="font-playfair italic font-semibold">Milestones</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {ROADMAP[locale].map((item) => (
              <div key={item.quarter} className={`glass-card p-5 ${item.status === "active" ? "border-teal-400" : ""}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === "active" ? "bg-teal-500 animate-pulse" : "bg-gray-200"}`} />
                  <span className="text-xs font-mono text-gray-400">{item.quarter}</span>
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
            {isEn ? "Why Invest" : "투자 포인트"}
          </p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            The Investment <em className="font-playfair italic font-semibold">Case</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INVESTMENT_CASE[locale].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Snapshot */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {isEn ? "Company Snapshot" : "회사 개요"}
            </p>
            <h2 className="text-3xl font-light mb-8 text-gray-900">
              Key <em className="font-playfair italic font-semibold">Facts</em>
            </h2>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <tbody>
                  {FINANCIALS[locale].map((row, i) => (
                    <tr key={row.label} className={i < FINANCIALS[locale].length - 1 ? "border-b border-gray-100" : ""}>
                      <td className="p-4 text-sm text-gray-500">{row.label}</td>
                      <td className="p-4 text-sm text-gray-800 font-medium text-right">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {isEn ? "Strategic Partners" : "전략적 파트너"}
            </p>
            <h2 className="text-3xl font-light mb-8 text-gray-900">
              {isEn ? "Partners" : "파트너십"}
            </h2>
            <div className="space-y-3">
              {PARTNERS.map((p) => (
                <div key={p.name} className="glass-card p-4 flex items-center justify-between">
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
          <blockquote className="text-xl sm:text-2xl font-light italic text-gray-400 mb-8 font-playfair">
            &ldquo;We don&rsquo;t just treat symptoms; we heal the source of sensory signals.&rdquo;
          </blockquote>
          <p className="text-gray-400 mb-8">
            {isEn
              ? "For investor inquiries, partnership proposals, or IR materials, please contact us."
              : "투자 문의, 파트너십 제안, IR 자료 요청은 아래로 연락해 주세요."}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="mailto:ir@rudacure.com" className="btn-primary px-8 py-3 rounded-full font-semibold text-sm">
              ir@rudacure.com
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline px-8 py-3 rounded-full border text-sm font-medium">
              {isEn ? "Contact Us" : "문의하기"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
