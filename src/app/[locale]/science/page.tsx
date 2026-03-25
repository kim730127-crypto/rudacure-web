import Image from "next/image";
import { type Locale } from "@/lib/i18n";

const CAPABILITIES = {
  ko: [
    { title: "이온채널 전문성", description: "TRPV1, TRPA1 등 통증/감각 신호를 조절하는 이온채널에 특화. AI가 채널-리간드 상호작용을 예측하여 선택적 후보물질을 발굴합니다.", icon: "🧬" },
    { title: "AI 분자 시뮬레이션", description: "분자 수준 시뮬레이션으로 오프타겟 효과를 사전 제거. 1세대 TRPV1 차단제의 고체온증 부작용을 원천 해결했습니다.", icon: "🤖" },
    { title: "전기생리학 검증", description: "패치클램프 기반 고처리량 전기생리학 검증. AI 예측 결과를 실제 이온채널 활성 데이터로 확인합니다.", icon: "⚡" },
    { title: "CRO 서비스", description: "전기생리학 전문 CRO 서비스 제공. 안구/감각 질환 특화 동물모델과 맞춤형 약효평가를 수행합니다.", icon: "🔬" },
  ],
  en: [
    { title: "Ion Channel Mastery", description: "Specialized in ion channels governing pain and sensory signals including TRPV1 and TRPA1. AI predicts channel-ligand interactions to discover selective drug candidates.", icon: "🧬" },
    { title: "AI Molecular Simulation", description: "Molecular-level simulation eliminates off-target effects preemptively. Fully resolved the hyperthermia side effect of first-generation TRPV1 antagonists.", icon: "🤖" },
    { title: "Electrophysiology Validation", description: "High-throughput electrophysiology validation using patch clamp technology. Confirms AI predictions against actual ion channel activity data.", icon: "⚡" },
    { title: "CRO Services", description: "Specialized electrophysiology CRO services. Customized efficacy evaluation with animal models for ocular and sensory diseases.", icon: "🔬" },
  ],
};

const ADVANTAGES = {
  ko: [
    { label: "개발 기간", before: "10~15년", after: "3~5년", reduction: "70%" },
    { label: "후보물질 선택성", before: "Trial & Error", after: "AI 예측 100%", reduction: "" },
    { label: "부작용 (고체온증)", before: "미해결", after: "완전 해결", reduction: "" },
    { label: "비용 효율", before: "$2.6B 평균", after: "대폭 절감", reduction: "" },
  ],
  en: [
    { label: "Development Time", before: "10-15 years", after: "3-5 years", reduction: "70%" },
    { label: "Candidate Selectivity", before: "Trial & Error", after: "100% AI-Predicted", reduction: "" },
    { label: "Side Effects (Hyperthermia)", before: "Unresolved", after: "Fully Resolved", reduction: "" },
    { label: "Cost Efficiency", before: "$2.6B Average", after: "Significantly Reduced", reduction: "" },
  ],
};

const CONTENT = {
  ko: {
    tag: "기술 플랫폼", title: ["The ", "RuCIA", " Platform"],
    description: "Rudacure Ion Channel Innovative Assessment — AI 기반 분자 예측과 고처리량 전기생리학 검증을 통합한 이온채널 신약개발 핵심 엔진입니다.",
    compTag: "경쟁 우위", compTitle: ["RuCIA vs ", "기존", " 신약개발"],
    thMetric: "지표", thTraditional: "기존", thRucia: "RuCIA", thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1: "이온채널은 통증, 온도 감각, 안구 표면 항상성의 핵심 조절자입니다. RuCIA는 이 신호의 근원을 정밀하게 조절하여, 증상이 아닌 원인을 치료합니다.",
    beyondP2: "Post-opioid 시대, FDA/EMA가 비중독성 대안을 우선시하는 규제 환경에서 RudaCure의 TRPV1 플랫폼은 글로벌 제약사의 핵심 파트너십 대상입니다.",
  },
  en: {
    tag: "Technology Platform", title: ["The ", "RuCIA", " Platform"],
    description: "Rudacure Ion Channel Innovative Assessment — the core engine integrating AI-driven molecular prediction with high-throughput electrophysiological validation.",
    compTag: "Competitive Advantage", compTitle: ["RuCIA vs ", "Traditional", " Drug Discovery"],
    thMetric: "Metric", thTraditional: "Traditional", thRucia: "RuCIA", thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1: "Ion channels are key regulators of pain, temperature sensation, and ocular surface homeostasis. RuCIA precisely modulates the source of these signals, treating causes rather than symptoms.",
    beyondP2: "In the post-opioid era, where FDA/EMA prioritize non-addictive alternatives, RudaCure's TRPV1 platform is a strategic partnership target for global pharmaceutical companies.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Science | RudaCure" : "기술 플랫폼 | RudaCure", description: CONTENT[locale === "en" ? "en" : "ko"].description };
}

export default async function SciencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "en" ? "en" : "ko") as Locale;
  const c = CONTENT[locale];
  const caps = CAPABILITIES[locale];
  const advs = ADVANTAGES[locale];

  return (
    <div className="pt-24">
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{c.tag}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {c.title[0]}<em className="font-['Playfair_Display'] italic font-semibold text-gradient-emerald">{c.title[1]}</em>{c.title[2]}
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">{c.description}</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {caps.map((cap) => (
            <div key={cap.title} className="glass-card p-6">
              <div className="text-3xl mb-4">{cap.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{cap.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{c.compTag}</p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            {c.compTitle[0]}<em className="font-['Playfair_Display'] italic font-semibold">{c.compTitle[1]}</em>{c.compTitle[2]}
          </h2>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider p-4">{c.thMetric}</th>
                  <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider p-4">{c.thTraditional}</th>
                  <th className="text-center text-xs font-semibold text-teal-600 uppercase tracking-wider p-4">{c.thRucia}</th>
                  <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider p-4 w-20">{c.thGap}</th>
                </tr>
              </thead>
              <tbody>
                {advs.map((a) => (
                  <tr key={a.label} className="border-b border-gray-50">
                    <td className="p-4 text-sm text-gray-600 font-medium">{a.label}</td>
                    <td className="p-4 text-sm text-gray-400 text-center">{a.before}</td>
                    <td className="p-4 text-sm text-teal-600 text-center font-medium">{a.after}</td>
                    <td className="p-4 text-sm text-teal-500 text-center font-mono">{a.reduction || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-light mb-6 text-gray-900">
              {c.beyondTitle[0]}<em className="font-['Playfair_Display'] italic font-semibold">{c.beyondTitle[1]}</em>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">{c.beyondP1}</p>
            <p className="text-gray-500 leading-relaxed">{c.beyondP2}</p>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image src="/images/molecule_viz.jpg" alt="Molecular Visualization" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
}
