import { type Locale } from "@/lib/i18n";
import { ProgressBar } from "@/components/progress-bar";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Pipeline | RudaCure" : "파이프라인 | RudaCure",
    description: "RCI001 (Dry Eye Disease, FDA Phase 2), RCI002 (Non-Opioid Pain), RCI003 (Psoriasis), RCI0165 (Osteoarthritis)",
  };
}

const HEADER = {
  ko: { tag: "신약개발", title1: "Therapeutic", title2: "Pipeline", description: "이온채널 표적 비마약성 치료제 파이프라인. RuCIA 플랫폼으로 발굴한 후보물질들이 글로벌 임상으로 진입하고 있습니다." },
  en: { tag: "Drug Development", title1: "Therapeutic", title2: "Pipeline", description: "Ion channel-targeted non-opioid therapeutic pipeline. Candidates discovered through our RuCIA platform are advancing into global clinical trials." },
};

type PipelineItem = {
  name: string;
  indication: string;
  target: string;
  mechanism: string;
  status: string;
  progress: number;
  color: string;
  milestones: string[];
  details: string[];
  detailsLabel: string;
  milestonesLabel: string;
};

const PIPELINE: Record<string, PipelineItem[]> = {
  ko: [
    {
      name: "RCI001",
      indication: "안구건조증",
      target: "TRPV1-Rac1 Target",
      mechanism: "TRPV1 하부 시그널 조절을 통한 Rac1/NLRP3 염증 억제 — 눈물 분비 촉진 및 각막 치유",
      status: "US FDA Phase 2 / 국내 임상 2상",
      progress: 75,
      color: "emerald",
      milestones: [
        "US FDA Phase 2 IND 승인 (2025.08)",
        "NCT07068958 등록 완료",
        "국내 임상 2상 진행 예정 (2026 상반기)",
        "한림제약 국내 라이선싱 (RCI001/RCI001U)",
        "프랑스 동물의약품 회사 공동개발 (RCI001AH)",
        "중간 분석 2026 Q1",
      ],
      details: [
        "0.25% 점안액 제형",
        "기존 스테로이드 대비 빠른 눈물 분비 효과",
        "쇼그렌 증후군 모델: 1주 내 눈물 분비량 증가 확인",
        "일본 TRPV1 원천 특허 등록 완료",
        "스테로이드 부작용(안압 상승, 충혈, 작열감) 극복",
        "4주 이내 치료 효과 발현",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
    {
      name: "RCI002",
      indication: "비마약성 만성통증 치료제",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism: "TRPV1과 MOR을 동시 조절하는 MOR biased 듀얼 타깃 비마약성 진통제 — CRPS 희귀질환 ODD 준비 중",
      status: "비임상 / IND 준비 (CRPS ODD 준비)",
      progress: 40,
      color: "blue",
      milestones: [
        "비임상 효력시험 완료",
        "제형 연구 (가원대 장동진 박사)",
        "CRPS(복합부위통증증후군) ODD 신청 준비 중",
        "SfN 학회 연구성과 발표 (2025.11)",
        "스케일업 TIPS 12억원 지원 (2024)",
        "글로벌 IND 제출 2026 Q2",
        "Phase 1 개시 2026 하반기",
      ],
      details: [
        "적응증: CRPS(복합부위통증증후군), 골관절염, 당뇨병성 신경병증, CIPN, 섬유근통",
        "MOR biased agonism으로 중독/내성 위험 최소화",
        "단회 투여: 골관절염 모델에서 2주 이상 통증 감소",
        "이상발열 부작용 없음 (1세대 TRPV1 문제 해결)",
        "기존 치료제 대비 650배 낮은 농도에서 효과",
        "CRPS FDA Orphan Drug Designation(ODD) 준비 중",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
    {
      name: "RCI003",
      indication: "건선 치료제",
      target: "건선 표적 단백질 선택적 조절제",
      mechanism: "AI 신약 플랫폼 기반 건선 표적 단백질 선택적 조절 — TRPV1 이온채널 연구 노하우 활용",
      status: "후보물질 발굴",
      progress: 15,
      color: "violet",
      milestones: [
        "신테카바이오 산학연 Collabo R&D 2단계 선정 (2026)",
        "신테카바이오 산학연 Collabo R&D 선정 (2024)",
        "서강대·인제대 컨소시엄 공동연구",
        "AI 플랫폼(STB) 기반 표적 분석",
        "후보 화합물 합성 및 최적화 진행 중",
        "In-vitro/In-vivo 효능 평가 예정",
      ],
      details: [
        "신테카바이오 AI 플랫폼(STB)으로 표적 단백질 분석",
        "루다큐어 TRPV1 조절 기술 전문성 활용 (피부질환 이온채널)",
        "서강대학교: 화합물 합성·최적화",
        "인제대학교: 후보 화합물 효능 평가",
        "연구기간: 2026.04 ~ 2028.03",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
    {
      name: "RCI0165",
      indication: "동물용 통증 치료제 (유전자치료)",
      target: "TRPV1 Only Target (AAV 벡터)",
      mechanism: "AAV(아데노부속바이러스) 벡터를 이용한 TRPV1 표적 유전자 치료제 — 1회 투여로 장기간 통증 완화",
      status: "비임상 / PoC",
      progress: 20,
      color: "indigo",
      milestones: [
        "민간투자기반 스케일업 지원사업 선정 (2026.4)",
        "농식품벤처육성사업 선정 (2025)",
        "AAV 벡터 기반 PoC 완료",
        "단회 투여 3개월 이상 진통 효과 확인",
        "반려동물·경주마 적용 목표",
      ],
      details: [
        "AAV(아데노부속바이러스) 벡터 기반 유전자 치료제",
        "TRPV1 이온채널 단일 표적 (only target)",
        "1회 투여로 3개월 이상 지속적 통증 완화",
        "반려동물 및 고가치 동물(경주마) 만성통증 관리",
        "글로벌 동물용 통증치료 시장 연 약 $2B 규모",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
  ],
  en: [
    {
      name: "RCI001",
      indication: "Dry Eye Disease",
      target: "TRPV1-Rac1 Target",
      mechanism: "TRPV1 downstream signal modulation inhibiting Rac1/NLRP3 inflammation — promotes tear secretion and corneal healing",
      status: "US FDA Phase 2 / Korea Phase 2",
      progress: 75,
      color: "emerald",
      milestones: [
        "FDA Phase 2 IND Approved (2025.08)",
        "NCT07068958 Registered",
        "Korea Phase 2 Planned (H1 2026)",
        "Hanlim Pharma Licensing (RCI001/RCI001U)",
        "French Veterinary Pharma Co-development (RCI001AH)",
        "Interim Analysis Q1 2026",
      ],
      details: [
        "0.25% ophthalmic solution formulation",
        "Faster tear secretion vs traditional steroids",
        "Sjögren's syndrome model: tear secretion increase within 1 week",
        "Japanese patent registered for TRPV1 active disease treatment",
        "Overcomes steroid side effects (IOP elevation, redness, burning)",
        "Therapeutic effects within 4 weeks",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
    {
      name: "RCI002",
      indication: "Non-Opioid Chronic Pain",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism: "MOR biased dual-target non-opioid analgesic simultaneously modulating TRPV1 and MOR — preparing CRPS Orphan Drug Designation",
      status: "Pre-clinical / IND Prep (CRPS ODD Prep)",
      progress: 40,
      color: "blue",
      milestones: [
        "Pre-clinical Efficacy Studies Complete",
        "Formulation Research (Dr. Dongjin Jang, Gawon Univ.)",
        "CRPS Orphan Drug Designation (ODD) in Preparation",
        "SfN Conference Presentation (2025.11)",
        "Scale-up TIPS KRW 1.2B Funded (2024)",
        "Global IND Filing Q2 2026",
        "Phase 1 Initiation H2 2026",
      ],
      details: [
        "Indications: CRPS, OA, diabetic neuropathy, CIPN, fibromyalgia",
        "MOR biased agonism minimizes addiction/tolerance risk",
        "Single dose: 2+ weeks pain reduction in OA model",
        "No abnormal fever side effect (solved 1st-gen TRPV1 issue)",
        "Efficacy at 650x lower concentration vs existing treatments",
        "FDA Orphan Drug Designation (ODD) for CRPS in preparation",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
    {
      name: "RCI003",
      indication: "Psoriasis",
      target: "Selective Modulator of Psoriasis Target Proteins",
      mechanism: "AI drug platform-based selective modulation of psoriasis target proteins — leveraging TRPV1 ion channel expertise",
      status: "Discovery",
      progress: 15,
      color: "violet",
      milestones: [
        "Syntekabio Collabo R&D Phase 2 Selected (2026)",
        "Syntekabio Collabo R&D Selected (2024)",
        "Sogang Univ. & Inje Univ. Consortium",
        "AI Platform (STB) Target Analysis",
        "Candidate Compound Synthesis in Progress",
        "In-vitro/In-vivo Efficacy Evaluation Planned",
      ],
      details: [
        "Syntekabio AI platform (STB) for target protein analysis",
        "RudaCure TRPV1 expertise applied to skin disease ion channels",
        "Sogang University: compound synthesis & optimization",
        "Inje University: candidate compound efficacy evaluation",
        "Research period: Apr 2026 – Mar 2028",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
    {
      name: "RCI0165",
      indication: "Veterinary Pain Treatment (Gene Therapy)",
      target: "TRPV1 Only Target (AAV Vector)",
      mechanism: "AAV vector-based TRPV1-targeted gene therapy — single administration for long-term pain relief in animals",
      status: "Pre-clinical / PoC",
      progress: 20,
      color: "indigo",
      milestones: [
        "Private Investment Scale-Up Program Selected (2026.4)",
        "Agri-Food Venture Program Selected (2025)",
        "AAV Vector-based PoC Complete",
        "Single Dose 3+ Month Analgesic Effect Confirmed",
        "Targeting Companion Animals & Racehorses",
      ],
      details: [
        "AAV (Adeno-Associated Virus) vector-based gene therapy",
        "TRPV1 ion channel single target (only target)",
        "Single administration provides 3+ months sustained pain relief",
        "For chronic pain management in companion animals and high-value animals (racehorses)",
        "Global veterinary pain treatment market ~$2B annually",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
  ],
};

const STAGES = {
  ko: ["후보물질 탐색", "비임상", "IND", "임상 1상", "임상 2상", "임상 3상", "허가"],
  en: ["Discovery", "Pre-clinical", "IND", "Phase 1", "Phase 2", "Phase 3", "Approval"],
};

export default async function PipelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "en" ? "en" : "ko") as Locale;
  const h = HEADER[locale];
  const pipeline = PIPELINE[locale];
  const stages = STAGES[locale];

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
            <em className="font-playfair italic font-semibold text-gradient-emerald">
              {h.title2}
            </em>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            {h.description}
          </p>
        </div>
      </section>

      {/* Stage overview bar */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-6 overflow-x-auto">
            <div className="flex items-center min-w-[600px]">
              {stages.map((stage, i) => (
                <div key={stage} className="flex-1 flex items-center">
                  <div className="text-center flex-1">
                    <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">{stage}</div>
                  </div>
                  {i < stages.length - 1 && <div className="w-px h-4 bg-gray-200" />}
                </div>
              ))}
            </div>
            {/* Pipeline bars */}
            <div className="mt-6 space-y-3">
              {pipeline.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-sm font-mono font-semibold text-gray-700 w-20">{p.name}</span>
                  <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden relative">
                    <ProgressBar
                      progress={p.progress}
                      delay={i * 200}
                      className={`h-full rounded-full flex items-center px-3 ${
                        p.color === "emerald"
                          ? "bg-teal-100"
                          : p.color === "blue"
                          ? "bg-blue-100"
                          : p.color === "violet"
                          ? "bg-violet-100"
                          : "bg-indigo-100"
                      }`}
                    >
                      <span className={`text-xs font-semibold whitespace-nowrap ${
                        p.color === "emerald" ? "text-teal-700" : p.color === "blue" ? "text-blue-700" : p.color === "violet" ? "text-violet-700" : "text-indigo-700"
                      }`}>
                        {p.status}
                      </span>
                    </ProgressBar>
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
          {pipeline.map((p) => (
            <div key={p.name} className="glass-card p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-sm font-medium px-4 py-1.5 rounded-full ${
                        p.color === "emerald"
                          ? "bg-teal-50 text-teal-600"
                          : p.color === "blue"
                          ? "bg-blue-50 text-blue-400"
                          : p.color === "violet"
                          ? "bg-violet-50 text-violet-500"
                          : "bg-indigo-50 text-indigo-400"
                      }`}
                    >
                      {p.indication}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">{p.status}</span>
                  </div>

                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">{p.name}</h2>
                  <p className="text-base text-gray-600 mb-1"><span className="font-medium">Target:</span> {p.target}</p>
                  <p className="text-base text-gray-600 leading-relaxed mb-4">{p.mechanism}</p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <ProgressBar
                        progress={p.progress}
                        className={`h-full rounded-full ${
                          p.color === "emerald" ? "bg-emerald-500" : p.color === "blue" ? "bg-blue-500" : p.color === "violet" ? "bg-violet-500" : "bg-indigo-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                      {p.detailsLabel}
                    </h4>
                    <ul className="space-y-2">
                      {p.details.map((d, i) => (
                        <li key={i} className="text-[15px] text-gray-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-teal-600 mt-0.5">&#8226;</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Milestones */}
                <div className="md:w-72 shrink-0">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                    {p.milestonesLabel}
                  </h4>
                  <div className="space-y-2.5">
                    {p.milestones.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[15px] text-gray-600"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.color === "emerald" ? "bg-emerald-400" : p.color === "blue" ? "bg-blue-400" : p.color === "violet" ? "bg-violet-400" : "bg-indigo-400"
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
