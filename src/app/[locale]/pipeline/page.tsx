import { type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Pipeline | RudaCure" : "파이프라인 | RudaCure",
    description: "RCI001 (Dry Eye Disease, FDA Phase 2), RCI002 (Non-Opioid Pain), RCI0165 (Osteoarthritis)",
  };
}

const HEADER = {
  ko: { tag: "신약개발", title1: "Therapeutic", title2: "Pipeline", description: "이온채널 표적 비마약성 치료제 파이프라인. RuCIA 플랫폼으로 발굴한 후보물질들이 글로벌 임상으로 진입하고 있습니다." },
  en: { tag: "Drug Development", title1: "Therapeutic", title2: "Pipeline", description: "Ion channel-targeted non-opioid therapeutic pipeline. Candidates discovered through our RuCIA platform are advancing into global clinical trials." },
};

const PIPELINE = [
  {
    name: "RCI001",
    indication: "Dry Eye Disease",
    target: "Rac1 / NLRP3 Inflammasome",
    mechanism: "Multi-target (TRPV1, CB1R, GPCR) — promotes tear secretion and corneal healing",
    status: "US FDA Phase 2",
    progress: 75,
    color: "emerald",
    milestones: [
      "FDA Phase 2 Approved (2025)",
      "NCT07068958 Registered",
      "Hanlim Pharma Licensing (2024)",
      "Interim Analysis Q1 2026",
    ],
    details: [
      "0.25% ophthalmic solution formulation",
      "Faster tear secretion vs traditional steroids",
      "Sjögren's syndrome model: tear secretion increase within 1 week",
      "Japanese patent registered for TRPV1 active disease treatment",
    ],
  },
  {
    name: "RCI002",
    indication: "Non-Opioid Chronic Pain",
    target: "TRPV1 Selective Antagonist",
    mechanism: "Next-gen TRPV1 antagonist with zero hyperthermia risk + optional MOR dual-target",
    status: "Pre-clinical / IND Prep",
    progress: 40,
    color: "blue",
    milestones: [
      "Pre-clinical Studies Complete",
      "Dual-target (TRPV1+MOR) Formulation",
      "Global IND Filing Q2 2026",
      "Phase 1 Initiation H2 2026",
    ],
    details: [
      "Indications: OA, diabetic neuropathy, RA, CIPN, fibromyalgia",
      "Single dose: 2+ weeks pain reduction in OA model",
      "No abnormal fever side effect (solved 1st-gen TRPV1 issue)",
      "Long-acting injectable formulation (multi-month relief)",
    ],
  },
  {
    name: "RCI0165",
    indication: "Osteoarthritis (Advanced)",
    target: "TRPV1 / MOR Dual Mechanism",
    mechanism: "Cartilage protection + joint damage suppression beyond pain relief",
    status: "Discovery",
    progress: 15,
    color: "indigo",
    milestones: [
      "Target Validation",
      "Lead Identification",
      "Pre-clinical Studies (Planned)",
    ],
    details: [
      "Dual mechanism for structural disease modification",
      "Not just symptom relief — cartilage preservation",
      "AI-driven compound optimization via RuCIA",
    ],
  },
];

const STAGES = ["Discovery", "Pre-clinical", "IND", "Phase 1", "Phase 2", "Phase 3", "Approval"];

export default async function PipelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "en" ? "en" : "ko") as Locale;
  const h = HEADER[locale];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-medium tracking-widest uppercase mb-4">
            {h.tag}
          </p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6">
            {h.title1}{" "}
            <em className="font-['Playfair_Display'] italic font-semibold text-gradient-emerald">
              {h.title2}
            </em>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            {h.description}
          </p>
        </div>
      </section>

      {/* Stage overview bar */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-6 overflow-x-auto">
            <div className="flex items-center min-w-[600px]">
              {STAGES.map((stage, i) => (
                <div key={stage} className="flex-1 flex items-center">
                  <div className="text-center flex-1">
                    <div className="text-[10px] text-gray-300 uppercase tracking-wider">{stage}</div>
                  </div>
                  {i < STAGES.length - 1 && <div className="w-px h-4 bg-gray-200" />}
                </div>
              ))}
            </div>
            {/* Pipeline bars */}
            <div className="mt-6 space-y-3">
              {PIPELINE.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500 w-16">{p.name}</span>
                  <div className="flex-1 h-6 bg-gray-50 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full flex items-center px-3 ${
                        p.color === "emerald"
                          ? "bg-teal-100"
                          : p.color === "blue"
                          ? "bg-blue-100"
                          : "bg-indigo-100"
                      }`}
                      style={{ width: `${p.progress}%` }}
                    >
                      <span className={`text-[10px] font-medium ${
                        p.color === "emerald" ? "text-teal-700" : p.color === "blue" ? "text-blue-700" : "text-indigo-700"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed cards */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto space-y-8">
          {PIPELINE.map((p) => (
            <div key={p.name} className="glass-card p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        p.color === "emerald"
                          ? "bg-teal-50 text-teal-600"
                          : p.color === "blue"
                          ? "bg-blue-50 text-blue-400"
                          : "bg-indigo-50 text-indigo-400"
                      }`}
                    >
                      {p.indication}
                    </span>
                    <span className="text-xs text-gray-300">{p.status}</span>
                  </div>

                  <h2 className="text-2xl font-semibold mb-2">{p.name}</h2>
                  <p className="text-sm text-gray-500 mb-1">Target: {p.target}</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.mechanism}</p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          p.color === "emerald" ? "bg-emerald-500" : p.color === "blue" ? "bg-blue-500" : "bg-indigo-500"
                        }`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Key Details
                    </h4>
                    <ul className="space-y-1.5">
                      {p.details.map((d, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-teal-600 mt-1">&#8226;</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Milestones */}
                <div className="md:w-64 shrink-0">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Milestones
                  </h4>
                  <div className="space-y-2">
                    {p.milestones.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.color === "emerald" ? "bg-emerald-400" : p.color === "blue" ? "bg-blue-400" : "bg-indigo-400"
                          }`}
                        />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
