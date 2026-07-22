import { ProgressBar } from "@/components/progress-bar";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Per-locale SERP title + description. Non-en/ko locales previously fell back
  // to the Korean string; now each locale is localized (fallback = English).
  const META: Record<string, { title: string; description: string }> = {
    en: {
      title: "Pipeline: Dry Eye (FDA Phase 2) & Non-Opioid Pain | RudaCure",
      description:
        "RudaCure's ion channel & gene-therapy pipeline: RCI001 dry eye (FDA Phase 2, NCT07068958), RCI002 non-opioid pain, RC0125 TRPV4 gene therapy for CMT2C.",
    },
    ko: {
      title: "파이프라인: 안구건조증(FDA 2상)·비마약성 진통제 | RudaCure",
      description:
        "루다큐어의 이온채널·유전자치료 파이프라인: RCI001 안구건조증(FDA 2상, NCT07068958), RCI002 비마약성 진통제, RC0125 TRPV4 유전자치료제(CMT2C).",
    },
    zh: {
      title: "研发管线：干眼症（FDA 2期）与非阿片类镇痛 | RudaCure",
      description:
        "RudaCure离子通道与基因疗法管线：RCI001干眼症（FDA 2期，NCT07068958）、RCI002非阿片类镇痛、RC0125靶向TRPV4的CMT2C基因疗法。",
    },
    ja: {
      title:
        "パイプライン：ドライアイ（FDA第2相）・非オピオイド鎮痛 | RudaCure",
      description:
        "RudaCureのイオンチャネル・遺伝子治療パイプライン：RCI001ドライアイ（FDA第2相、NCT07068958）、RCI002非オピオイド鎮痛、RC0125 TRPV4標的CMT2C遺伝子治療。",
    },
    es: {
      title: "Pipeline: Ojo Seco (Fase 2 FDA) y Dolor No Opioide | RudaCure",
      description:
        "Pipeline de canales iónicos y terapia génica de RudaCure: RCI001 ojo seco (Fase 2 FDA, NCT07068958), RCI002 dolor no opioide, RC0125 terapia génica TRPV4 para CMT2C.",
    },
    fr: {
      title:
        "Pipeline : Œil Sec (Phase 2 FDA) et Douleur Non Opioïde | RudaCure",
      description:
        "Pipeline canaux ioniques et thérapie génique de RudaCure : RCI001 œil sec (Phase 2 FDA, NCT07068958), RCI002 douleur non opioïde, RC0125 thérapie génique TRPV4 pour la CMT2C.",
    },
  };
  const m = META[locale] ?? META.en;
  const { title, description } = m;
  return {
    // `absolute` so the SERP <title> is exactly this string (no template doubling).
    title: { absolute: title },
    description,
    alternates: localizedAlternates(locale, "/pipeline"),
    openGraph: {
      title,
      description,
      images: [
        { url: "/og-image-pipeline.jpg", width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image-pipeline.jpg"],
    },
  };
}

const HEADER: Record<
  string,
  { tag: string; title1: string; title2: string; description: string }
> = {
  ko: {
    tag: "신약개발",
    title1: "Therapeutic",
    title2: "Pipeline",
    description:
      "이온채널 표적 비마약성 치료제 파이프라인. RuCIA 플랫폼으로 발굴한 후보물질들이 글로벌 임상으로 진입하고 있습니다.",
  },
  en: {
    tag: "Drug Development",
    title1: "Therapeutic",
    title2: "Pipeline",
    description:
      "Ion channel-targeted non-opioid therapeutic pipeline. Candidates discovered through our RuCIA platform are advancing into global clinical trials.",
  },
  zh: {
    tag: "药物开发",
    title1: "Therapeutic",
    title2: "Pipeline",
    description:
      "离子通道靶向非阿片类治疗管线。通过RuCIA AI平台发现的候选药物正进入全球临床试验阶段。",
  },
  ja: {
    tag: "医薬品開発",
    title1: "Therapeutic",
    title2: "Pipeline",
    description:
      "イオンチャネル標的非オピオイド治療パイプライン。RuCIA AIプラットフォームで発見された候補物質がグローバル臨床試験に進んでいます。",
  },
  es: {
    tag: "Desarrollo de Fármacos",
    title1: "Therapeutic",
    title2: "Pipeline",
    description:
      "Pipeline terapéutico no opioide dirigido a canales iónicos. Los candidatos descubiertos a través de nuestra plataforma RuCIA están avanzando hacia ensayos clínicos globales.",
  },
  fr: {
    tag: "Développement de Médicaments",
    title1: "Therapeutic",
    title2: "Pipeline",
    description:
      "Pipeline thérapeutique non opioïde ciblant les canaux ioniques. Les candidats découverts via notre plateforme RuCIA progressent vers les essais cliniques mondiaux.",
  },
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
      target: "TRPV1-Rac1 하부 신호 조절제",
      mechanism:
        "TRPV1 채널을 직접 차단하는 기존 antagonist와 달리, RCI001은 TRPV1 하부의 Rac1/NLRP3 염증 캐스케이드를 조절하여 눈물막 항상성과 각막 상피 치유를 회복합니다. 온도감각 차단 없이 염증의 근본 원인을 해결하는 차별화된 작용기전.",
      status: "US FDA Phase 2 / 국내 임상 2상",
      progress: 62,
      color: "emerald",
      milestones: [
        "US FDA Phase 2 IND 승인 (2025.08)",
        "NCT07068958 등록 완료",
        "국내 임상 2상 진행 예정 (2026 상반기)",
        "국내 한림제약과 공동연구 (RCI001/RCI001U)",
        "중간 분석 2026 Q1",
      ],
      details: [
        "차별화된 작용기전: 직접 TRPV1 antagonist가 아닌 하부 신호 조절제",
        "글로벌 개발: US FDA Phase 2 + 국내 임상 2상 (2026)",
        "0.25% 점안액 제형 — 비스테로이드성, 우수한 내약성",
        "쇼그렌 증후군 모델: 1주 내 눈물 분비량 증가 확인",
        "4주 이내 치료 효과 발현 (스테로이드 대안 대비 8-12주 단축)",
        "스테로이드 부작용 극복 — 안압 상승·충혈·작열감 없음",
        "1세대 TRPV1 antagonist의 온도감각 차단 부작용 회피",
        "TRPV1 활성 질환 치료 특허 한국·일본·미국 등록 완료",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
    {
      name: "RCI001AH",
      indication: "동물용 안구건조증 (건성각결막염, KCS)",
      target: "TRPV1-Rac1 하부 신호 조절제",
      mechanism:
        "작용기전은 RCI001과 동일 — TRPV1 하부의 Rac1/NLRP3 염증 캐스케이드를 조절합니다. 반려동물(개/고양이) 안구건조증을 표적으로 하는 동물의약품.",
      status: "PoC 완료 / 동물용 임상 준비",
      progress: 45,
      color: "emerald",
      milestones: [
        "PoC study 완료",
        "FastOnset 확인 완료",
        "동물용 cyclosporin 비교시험 — 우수한 효과 확인",
        "동물용 임상시험 준비 중",
        "프랑스 동물의약품 회사와 공동개발 중 (2030년 시장 목표)",
      ],
      details: [
        "RCI001과 동일한 작용기전 (TRPV1-Rac1/NLRP3 하부 신호 조절)",
        "반려동물(개/고양이) 안구건조증(건성각결막염, KCS) 표적",
        "PoC study 완료 — 유효성 확인",
        "FastOnset: 빠른 효과 발현 확인 완료",
        "동물용 cyclosporin 대비 비교시험에서 우수한 효과 확인",
        "프랑스 동물의약품 회사와 공동개발, 2030년 시장 진입 목표",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
    {
      name: "RCI002",
      indication: "비마약성 만성통증 치료제",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism:
        "TRPV1과 MOR을 동시 조절하는 MOR biased 듀얼 타깃 비마약성 진통제 — CRPS 희귀질환 ODD 제출 완료",
      status: "비임상 / IND 준비 (CRPS ODD 제출 완료)",
      progress: 40,
      color: "blue",
      milestones: [
        "비임상 효력시험 완료",
        "제형 연구 (강원대 장동진 박사)",
        "CRPS(복합부위통증증후군) ODD 신청 제출 완료",
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
        "CRPS FDA Orphan Drug Designation(ODD) 제출 완료",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
    {
      name: "RCI003",
      indication: "건선 치료제",
      target: "건선 표적 단백질 선택적 조절제",
      mechanism:
        "AI 신약 플랫폼 기반 건선 표적 단백질 선택적 조절 — TRPV1 이온채널 연구 노하우 활용",
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
      mechanism:
        "AAV(아데노부속바이러스) 벡터를 이용한 TRPV1 표적 유전자 치료제 — 1회 투여로 장기간 통증 완화",
      status: "CMC 진행 및 약리독성 진행 중",
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
    {
      name: "RC0125 AAV",
      indication:
        "CMT2C (샤르코마리투스병 2C형), 골격이형성증, 척추측만증, 골격기형",
      target: "TRPV4 Intracellular Target (AAV 벡터)",
      mechanism:
        "AAV 벡터 기반의 TRPV4 세포 내 표적 유전자치료제 — 희귀질환으로 개발하여 연관 질환 치료제로 확장 예정",
      status: "약물 최적화 (Optimization)",
      progress: 25,
      color: "teal",
      milestones: [
        "골관절염(OA) 동물모델에서 진통 효능 확인 완료",
        "TRPV4 세포 내 표적(Intracellular target) 기전 검증",
        "AAV 유전자치료제 약물 최적화(Optimization) 진행 중",
        "희귀질환(CMT2C) 대상 개발 및 연관 질환 파이프라인 확장 예정",
      ],
      details: [
        "AAV 벡터 기반 유전자치료제로 TRPV4 세포 내 표적 작용",
        "골관절염(OA) 마우스 모델에서 뛰어난 진통 효능 입증 완료",
        "현재 후보물질 최적화(Optimization) 연구 진행 중",
        "희귀 난치성 신경질환인 CMT2C 치료제로 우선 개발 후 연관 질환으로 적응증 확대",
      ],
      detailsLabel: "주요 특징",
      milestonesLabel: "마일스톤",
    },
  ],
  en: [
    {
      name: "RCI001",
      indication: "Dry Eye Disease",
      target: "TRPV1-Rac1 Downstream Modulator",
      mechanism:
        "Unlike direct TRPV1 channel antagonists, RCI001 modulates the TRPV1 downstream Rac1/NLRP3 inflammatory cascade — restoring tear film homeostasis and corneal epithelial healing without blocking thermosensation. Differentiated MoA addresses root inflammatory cause, not just symptoms.",
      status: "US FDA Phase 2 / Korea Phase 2",
      progress: 62,
      color: "emerald",
      milestones: [
        "FDA Phase 2 IND Approved (2025.08)",
        "NCT07068958 Registered",
        "Korea Phase 2 Planned (H1 2026)",
        "Domestic Co-research with Hanlim Pharma (RCI001/RCI001U)",
        "Interim Analysis Q1 2026",
      ],
      details: [
        "Differentiated MoA: downstream signal modulator (not a direct TRPV1 antagonist)",
        "Global development: US FDA Phase 2 + Korea Phase 2 (2026)",
        "0.25% topical ophthalmic solution — non-steroidal, well-tolerated",
        "Sjögren's syndrome model: tear secretion increase within 1 week",
        "Therapeutic onset within 4 weeks (vs 8-12 weeks for steroid alternatives)",
        "Overcomes steroid side effects: no IOP elevation, no redness, no burning",
        "Avoids thermosensation blockade common to first-gen TRPV1 antagonists",
        "TRPV1 active-disease treatment patents granted in Korea, Japan, US",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
    {
      name: "RCI001AH",
      indication: "Veterinary Dry Eye (Keratoconjunctivitis Sicca)",
      target: "TRPV1-Rac1 Downstream Modulator",
      mechanism:
        "Same mechanism of action as RCI001 — modulates the TRPV1 downstream Rac1/NLRP3 inflammatory cascade. Veterinary formulation targeting dry eye in companion animals (dogs/cats).",
      status: "PoC Complete / Preparing Veterinary Trials",
      progress: 45,
      color: "emerald",
      milestones: [
        "PoC study complete",
        "FastOnset confirmed",
        "Comparative study vs veterinary cyclosporine — superior efficacy confirmed",
        "Preparing veterinary clinical trials",
        "Co-development with French veterinary pharma (targeting 2030 market)",
      ],
      details: [
        "Same mechanism of action as RCI001 (TRPV1-Rac1/NLRP3 downstream modulation)",
        "Targets dry eye (KCS) in companion animals (dogs/cats)",
        "PoC study complete — efficacy confirmed",
        "FastOnset: rapid onset of action confirmed",
        "Superior efficacy vs veterinary cyclosporine in comparative testing",
        "Co-development with French veterinary pharma, targeting 2030 market entry",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
    {
      name: "RCI002",
      indication: "Non-Opioid Chronic Pain",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism:
        "MOR biased dual-target non-opioid analgesic simultaneously modulating TRPV1 and MOR — CRPS Orphan Drug Designation submitted",
      status: "Pre-clinical / IND Prep (CRPS ODD Submitted)",
      progress: 40,
      color: "blue",
      milestones: [
        "Pre-clinical Efficacy Studies Complete",
        "Formulation Research (Dr. Dongjin Jang, Gangwon Univ.)",
        "CRPS Orphan Drug Designation (ODD) Submitted",
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
        "FDA Orphan Drug Designation (ODD) for CRPS submitted",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
    {
      name: "RCI003",
      indication: "Psoriasis",
      target: "Selective Modulator of Psoriasis Target Proteins",
      mechanism:
        "AI drug platform-based selective modulation of psoriasis target proteins — leveraging TRPV1 ion channel expertise",
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
      mechanism:
        "AAV vector-based TRPV1-targeted gene therapy — single administration for long-term pain relief in animals",
      status: "CMC & Pharmacology/Toxicology in Progress",
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
    {
      name: "RC0125 AAV",
      indication:
        "CMT2C (Charcot-Marie-Tooth Disease 2C), Skeletal Dysplasia, Scoliosis, Skeletal Malformations",
      target: "TRPV4 Intracellular Target (AAV Vector)",
      mechanism:
        "AAV vector-based gene therapy targeting intracellular TRPV4 — developed as an orphan drug with plans to expand to related diseases",
      status: "Drug Optimization",
      progress: 25,
      color: "teal",
      milestones: [
        "Analgesic efficacy confirmed in OA (Osteoarthritis) models",
        "Validation of intracellular TRPV4 targeting mechanism",
        "Ongoing AAV gene therapy drug optimization",
        "Orphan disease (CMT2C) development with plans to expand to related indications",
      ],
      details: [
        "AAV vector-based gene therapy targeting intracellular TRPV4 channel",
        "Proven analgesic efficacy in osteoarthritis (OA) animal models",
        "Currently undergoing candidate drug optimization",
        "Initial development targets rare orphan disease CMT2C, with plans for expansion to related disorders",
      ],
      detailsLabel: "Key Details",
      milestonesLabel: "Milestones",
    },
  ],
  zh: [
    {
      name: "RCI001",
      indication: "干眼症",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "通过TRPV1下游信号调节抑制Rac1/NLRP3炎症 — 促进泪液分泌和角膜愈合",
      status: "US FDA 2期 / 韩国2期",
      progress: 62,
      color: "emerald",
      milestones: [
        "FDA 2期 IND获批 (2025.08)",
        "NCT07068958注册完成",
        "韩国2期计划 (2026上半年)",
        "与韩林制药国内共同研究 (RCI001/RCI001U)",
        "中期分析 2026 Q1",
      ],
      details: [
        "0.25%滴眼液制剂",
        "比传统类固醇更快的泪液分泌效果",
        "干燥综合征模型：1周内泪液分泌量增加",
        "日本TRPV1原始专利已注册",
        "克服类固醇副作用（眼压升高、充血、灼热感）",
        "4周内出现治疗效果",
      ],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RCI001AH",
      indication: "动物用干眼症（干性角结膜炎, KCS）",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "作用机制与RCI001相同——调节TRPV1下游Rac1/NLRP3炎症级联。针对伴侣动物（犬/猫）干眼症的动物用制剂。",
      status: "PoC完成 / 动物临床准备中",
      progress: 45,
      color: "emerald",
      milestones: [
        "PoC研究完成",
        "FastOnset确认完成",
        "与动物用cyclosporin比较试验——确认更优疗效",
        "动物临床试验准备中",
        "与法国动物制药公司共同开发中（目标2030年市场）",
      ],
      details: [
        "作用机制与RCI001相同（TRPV1-Rac1/NLRP3下游信号调节）",
        "针对伴侣动物（犬/猫）干眼症（干性角结膜炎, KCS）",
        "PoC研究完成——确认有效性",
        "FastOnset：确认快速起效",
        "在比较试验中相较动物用cyclosporin确认更优疗效",
        "与法国动物制药公司共同开发，目标2030年进入市场",
      ],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RCI002",
      indication: "非阿片类慢性疼痛治疗药",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism:
        "同时调节TRPV1和MOR的MOR biased双靶点非阿片类镇痛药 — CRPS孤儿药认定已提交",
      status: "临床前 / IND准备 (CRPS ODD已提交)",
      progress: 40,
      color: "blue",
      milestones: [
        "临床前药效试验完成",
        "制剂研究 (江原大学 张东镇博士)",
        "CRPS孤儿药认定(ODD)申请已提交",
        "SfN学会研究成果发表 (2025.11)",
        "Scale-up TIPS 12亿韩元支持 (2024)",
        "全球IND提交 2026 Q2",
        "1期临床启动 2026下半年",
      ],
      details: [
        "适应症：CRPS、骨关节炎、糖尿病性神经病变、CIPN、纤维肌痛",
        "MOR biased agonism最大限度降低成瘾/耐受风险",
        "单次给药：骨关节炎模型中疼痛减轻2周以上",
        "无异常发热副作用（解决第一代TRPV1问题）",
        "比现有治疗药低650倍浓度即有效",
        "FDA CRPS孤儿药认定(ODD)已提交",
      ],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RCI003",
      indication: "银屑病治疗药",
      target: "银屑病靶蛋白选择性调节剂",
      mechanism:
        "基于AI新药平台的银屑病靶蛋白选择性调节 — 利用TRPV1离子通道研究经验",
      status: "候选药物发现",
      progress: 15,
      color: "violet",
      milestones: [
        "新特科生物产学研Collabo R&D第2阶段入选 (2026)",
        "新特科生物产学研Collabo R&D入选 (2024)",
        "西江大学·仁济大学联合研究",
        "AI平台(STB)靶点分析",
        "候选化合物合成及优化进行中",
        "体外/体内药效评价计划中",
      ],
      details: [
        "新特科生物AI平台(STB)进行靶蛋白分析",
        "利用RudaCure TRPV1调控技术专长（皮肤病离子通道）",
        "西江大学：化合物合成与优化",
        "仁济大学：候选化合物药效评价",
        "研究期间：2026.04 ~ 2028.03",
      ],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RCI0165",
      indication: "动物用疼痛治疗药（基因治疗）",
      target: "TRPV1 Only Target (AAV载体)",
      mechanism: "利用AAV载体的TRPV1靶向基因治疗药 — 单次给药实现长期疼痛缓解",
      status: "CMC及药理毒理进行中",
      progress: 20,
      color: "indigo",
      milestones: [
        "民间投资规模化支持事业入选 (2026.4)",
        "农食品创业育成事业入选 (2025)",
        "AAV载体PoC完成",
        "单次给药3个月以上镇痛效果确认",
        "目标：宠物·赛马应用",
      ],
      details: [
        "AAV（腺相关病毒）载体基因治疗药",
        "TRPV1离子通道单一靶点",
        "单次给药3个月以上持续疼痛缓解",
        "宠物及高价值动物（赛马）慢性疼痛管理",
        "全球动物用疼痛治疗市场每年约$2B规模",
      ],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RC0125 AAV",
      indication: "CMT2C (腓骨肌萎缩症 2C型), 骨骼发育不良, 脊柱侧弯, 骨骼畸形",
      target: "TRPV4 Intracellular Target (AAV 载体)",
      mechanism:
        "基于AAV载体的靶向细胞内TRPV4基因疗法 — 作为罕见病药物开发，计划扩展至相关疾病",
      status: "药物优化中",
      progress: 25,
      color: "teal",
      milestones: [
        "在骨关节炎 (OA) 模型中确认了镇痛疗效",
        "验证了细胞内 TRPV4 靶向机制",
        "AAV 基因疗法药物优化进行中",
        "针对罕见病 (CMT2C) 开发并计划扩展至相关适应症",
      ],
      details: [
        "基于 AAV 载体靶向细胞内 TRPV4 通道的基因疗法",
        "在骨关节炎 (OA) 动物模型中证实了卓越之镇痛效果",
        "目前正在进行候选药物的优化研究",
        "优先开发治疗罕见难治性神经疾病 CMT2C，并计划扩大到相关疾病",
      ],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
  ],
  ja: [
    {
      name: "RCI001",
      indication: "ドライアイ",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "TRPV1下流シグナル調節によるRac1/NLRP3炎症抑制 — 涙液分泌促進および角膜治癒",
      status: "US FDA Phase 2 / 韓国2相",
      progress: 62,
      color: "emerald",
      milestones: [
        "FDA Phase 2 IND承認 (2025.08)",
        "NCT07068958登録完了",
        "韓国2相計画 (2026上半期)",
        "Hanlim Pharmaとの国内共同研究 (RCI001/RCI001U)",
        "中間解析 2026 Q1",
      ],
      details: [
        "0.25%点眼液製剤",
        "従来のステロイドより速い涙液分泌効果",
        "シェーグレン症候群モデル：1週間以内に涙液分泌量増加確認",
        "日本TRPV1基本特許登録完了",
        "ステロイド副作用（眼圧上昇、充血、灼熱感）を克服",
        "4週間以内に治療効果発現",
      ],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RCI001AH",
      indication: "動物用ドライアイ（乾性角結膜炎, KCS）",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "作用機序はRCI001と同一 — TRPV1下流のRac1/NLRP3炎症カスケードを調節します。伴侶動物（犬・猫）のドライアイを標的とする動物用製剤。",
      status: "PoC完了 / 動物用臨床準備中",
      progress: 45,
      color: "emerald",
      milestones: [
        "PoC study完了",
        "FastOnset確認完了",
        "動物用cyclosporinとの比較試験 — 優れた効果を確認",
        "動物用臨床試験準備中",
        "フランス動物医薬品会社と共同開発中（2030年市場目標）",
      ],
      details: [
        "RCI001と同一の作用機序（TRPV1-Rac1/NLRP3下流シグナル調節）",
        "伴侶動物（犬・猫）のドライアイ（乾性角結膜炎, KCS）を標的",
        "PoC study完了 — 有効性を確認",
        "FastOnset：迅速な効果発現を確認",
        "動物用cyclosporinとの比較試験で優れた効果を確認",
        "フランス動物医薬品会社と共同開発、2030年市場参入目標",
      ],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RCI002",
      indication: "非オピオイド系慢性疼痛治療薬",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism:
        "TRPV1とMORを同時調節するMOR biasedデュアルターゲット非オピオイド系鎮痛薬 — CRPS希少疾患ODD提出完了",
      status: "前臨床 / IND準備 (CRPS ODD提出完了)",
      progress: 40,
      color: "blue",
      milestones: [
        "前臨床有効性試験完了",
        "製剤研究 (江原大学 張東鎮博士)",
        "CRPS孤児薬指定(ODD)申請提出完了",
        "SfN学会研究成果発表 (2025.11)",
        "Scale-up TIPS 12億ウォン支援 (2024)",
        "グローバルIND提出 2026 Q2",
        "Phase 1開始 2026下半期",
      ],
      details: [
        "適応症：CRPS、変形性関節症、糖尿病性神経障害、CIPN、線維筋痛症",
        "MOR biased agonismで依存症/耐性リスクを最小化",
        "単回投与：変形性関節症モデルで2週間以上の疼痛軽減",
        "異常発熱副作用なし（第1世代TRPV1の問題を解決）",
        "既存治療薬の650分の1の濃度で効果",
        "FDA CRPS孤児薬指定(ODD)提出完了",
      ],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RCI003",
      indication: "乾癬治療薬",
      target: "乾癬ターゲットタンパク質選択的モジュレーター",
      mechanism:
        "AI創薬プラットフォーム基盤の乾癬ターゲットタンパク質選択的調節 — TRPV1イオンチャネル研究ノウハウ活用",
      status: "候補物質発掘",
      progress: 15,
      color: "violet",
      milestones: [
        "Syntekabio産学研Collabo R&D第2段階選定 (2026)",
        "Syntekabio産学研Collabo R&D選定 (2024)",
        "西江大学・仁済大学コンソーシアム共同研究",
        "AIプラットフォーム(STB)ターゲット分析",
        "候補化合物合成・最適化進行中",
        "In-vitro/In-vivo有効性評価予定",
      ],
      details: [
        "Syntekabio AIプラットフォーム(STB)でターゲットタンパク質分析",
        "RudaCure TRPV1調節技術の専門性活用（皮膚疾患イオンチャネル）",
        "西江大学：化合物合成・最適化",
        "仁済大学：候補化合物有効性評価",
        "研究期間：2026.04 ~ 2028.03",
      ],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RCI0165",
      indication: "動物用疼痛治療薬（遺伝子治療）",
      target: "TRPV1 Only Target (AAVベクター)",
      mechanism:
        "AAVベクターを用いたTRPV1標的遺伝子治療薬 — 1回投与で長期間の疼痛緩和",
      status: "CMC・薬理毒性試験進行中",
      progress: 20,
      color: "indigo",
      milestones: [
        "民間投資ベーススケールアップ支援事業選定 (2026.4)",
        "農食品ベンチャー育成事業選定 (2025)",
        "AAVベクターベースPoC完了",
        "単回投与3ヶ月以上の鎮痛効果確認",
        "コンパニオンアニマル・競走馬への適用目標",
      ],
      details: [
        "AAV（アデノ随伴ウイルス）ベクター基盤遺伝子治療薬",
        "TRPV1イオンチャネル単一ターゲット",
        "1回投与で3ヶ月以上の持続的疼痛緩和",
        "コンパニオンアニマルおよび高価値動物（競走馬）の慢性疼痛管理",
        "グローバル動物用疼痛治療市場 年間約$2B規模",
      ],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RC0125 AAV",
      indication:
        "CMT2C (シャルコー・マリー・トゥース病 2C型), 骨格異形成症, 脊椎側弯症, 骨格奇形",
      target: "TRPV4 Intracellular Target (AAV ベクター)",
      mechanism:
        "AAVベクターベースの細胞内TRPV4標的遺伝子治療薬 — 希少疾患薬として開発、関連疾患への拡大を計画",
      status: "薬物最適化中",
      progress: 25,
      color: "teal",
      milestones: [
        "変形性関節症(OA)モデルでの鎮痛効果確認済み",
        "細胞内TRPV4標的メカニズムの検証",
        "AAV遺伝子治療薬の最適化(Optimization)進行中",
        "希少疾患(CMT2C)対象の開発および関連疾患へのパイプライン拡大予定",
      ],
      details: [
        "AAVベクターベースの細胞内TRPV4チャネル標的遺伝子治療薬",
        "変形性関節症(OA)動物モデルにおいて優れた鎮痛効果を立証済み",
        "現在、候補物質の最適化(Optimization)研究が進行中",
        "希少難治性神経疾患であるCMT2C治療薬として優先的に開発後、関連疾患への適応症拡大を計画",
      ],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
  ],
  es: [
    {
      name: "RCI001",
      indication: "Enfermedad del Ojo Seco",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "Modulación de señal downstream de TRPV1 inhibiendo inflamación Rac1/NLRP3 — promueve secreción lagrimal y curación corneal",
      status: "US FDA Fase 2 / Corea Fase 2",
      progress: 62,
      color: "emerald",
      milestones: [
        "FDA Fase 2 IND Aprobado (2025.08)",
        "NCT07068958 Registrado",
        "Corea Fase 2 Planificado (H1 2026)",
        "Investigación conjunta nacional con Hanlim Pharma (RCI001/RCI001U)",
        "Análisis Intermedio Q1 2026",
      ],
      details: [
        "Formulación de solución oftálmica 0.25%",
        "Secreción lagrimal más rápida vs esteroides tradicionales",
        "Modelo Sjögren: aumento de secreción lagrimal en 1 semana",
        "Patente japonesa registrada para tratamiento TRPV1",
        "Supera efectos secundarios de esteroides (PIO, enrojecimiento, ardor)",
        "Efectos terapéuticos en 4 semanas",
      ],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RCI001AH",
      indication: "Ojo Seco Veterinario (Queratoconjuntivitis Seca, KCS)",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "Mismo mecanismo de acción que RCI001 — modula la cascada inflamatoria Rac1/NLRP3 aguas abajo de TRPV1. Formulación veterinaria dirigida al ojo seco en animales de compañía (perros/gatos).",
      status: "PoC Completado / Preparación de Ensayos Veterinarios",
      progress: 45,
      color: "emerald",
      milestones: [
        "Estudio PoC completado",
        "FastOnset confirmado",
        "Estudio comparativo vs cyclosporina veterinaria — eficacia superior confirmada",
        "Preparación de ensayos clínicos veterinarios",
        "Co-desarrollo con farmacéutica veterinaria francesa (objetivo mercado 2030)",
      ],
      details: [
        "Mismo mecanismo de acción que RCI001 (modulación aguas abajo TRPV1-Rac1/NLRP3)",
        "Dirigido al ojo seco (KCS) en animales de compañía (perros/gatos)",
        "Estudio PoC completado — eficacia confirmada",
        "FastOnset: inicio de acción rápido confirmado",
        "Eficacia superior vs cyclosporina veterinaria en estudio comparativo",
        "Co-desarrollo con farmacéutica veterinaria francesa, objetivo entrada al mercado 2030",
      ],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RCI002",
      indication: "Dolor Crónico No Opioide",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism:
        "Analgésico no opioide de doble diana MOR biased modulando simultáneamente TRPV1 y MOR — Designación de Medicamento Huérfano para CRPS presentada",
      status: "Preclínico / Preparación IND (CRPS ODD presentada)",
      progress: 40,
      color: "blue",
      milestones: [
        "Estudios de Eficacia Preclínica Completados",
        "Investigación de Formulación (Dr. Dongjin Jang, Univ. Gangwon)",
        "Designación de Medicamento Huérfano (ODD) para CRPS Presentada",
        "Presentación en Conferencia SfN (2025.11)",
        "Scale-up TIPS KRW 1.2B (2024)",
        "Presentación IND Global Q2 2026",
        "Inicio Fase 1 H2 2026",
      ],
      details: [
        "Indicaciones: CRPS, OA, neuropatía diabética, CIPN, fibromialgia",
        "Agonismo MOR biased minimiza riesgo de adicción/tolerancia",
        "Dosis única: reducción del dolor 2+ semanas en modelo OA",
        "Sin efecto secundario de fiebre anormal (resolvió problema TRPV1 1ª gen)",
        "Eficacia a concentración 650x menor vs tratamientos existentes",
        "Designación FDA ODD para CRPS presentada",
      ],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RCI003",
      indication: "Psoriasis",
      target: "Modulador Selectivo de Proteínas Diana de Psoriasis",
      mechanism:
        "Modulación selectiva de proteínas diana de psoriasis basada en plataforma AI — aprovechando experiencia en canales iónicos TRPV1",
      status: "Descubrimiento",
      progress: 15,
      color: "violet",
      milestones: [
        "Syntekabio Collabo R&D Fase 2 Seleccionado (2026)",
        "Syntekabio Collabo R&D Seleccionado (2024)",
        "Consorcio Univ. Sogang & Univ. Inje",
        "Análisis de Dianas con Plataforma AI (STB)",
        "Síntesis de Compuestos Candidatos en Progreso",
        "Evaluación de Eficacia In-vitro/In-vivo Planificada",
      ],
      details: [
        "Plataforma AI Syntekabio (STB) para análisis de proteínas diana",
        "Experiencia TRPV1 de RudaCure aplicada a canales iónicos en enfermedades cutáneas",
        "Universidad Sogang: síntesis y optimización de compuestos",
        "Universidad Inje: evaluación de eficacia de compuestos candidatos",
        "Período de investigación: Abr 2026 – Mar 2028",
      ],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RCI0165",
      indication: "Tratamiento del Dolor Veterinario (Terapia Génica)",
      target: "TRPV1 Only Target (Vector AAV)",
      mechanism:
        "Terapia génica dirigida a TRPV1 basada en vector AAV — administración única para alivio del dolor a largo plazo en animales",
      status: "CMC y farmacología/toxicología en curso",
      progress: 20,
      color: "indigo",
      milestones: [
        "Programa de Escalamiento con Inversión Privada Seleccionado (2026.4)",
        "Programa de Emprendimiento Agro-Alimentario Seleccionado (2025)",
        "PoC Basado en Vector AAV Completado",
        "Efecto Analgésico 3+ Meses Confirmado con Dosis Única",
        "Objetivo: Animales de Compañía y Caballos de Carrera",
      ],
      details: [
        "Terapia génica basada en vector AAV (virus adeno-asociado)",
        "Diana única de canal iónico TRPV1",
        "Administración única proporciona 3+ meses de alivio sostenido del dolor",
        "Para manejo del dolor crónico en animales de compañía y alto valor (caballos de carrera)",
        "Mercado global de tratamiento del dolor veterinario ~$2B anuales",
      ],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RC0125 AAV",
      indication:
        "CMT2C (Enfermedad de Charcot-Marie-Tooth 2C), Displasia Esquelética, Escoliosis, Malformaciones Esqueléticas",
      target: "TRPV4 Intracellular Target (Vector AAV)",
      mechanism:
        "Terapia génica basada en vector AAV dirigida a TRPV4 intracelular — desarrollada como medicamento huérfano con planes de expansión a enfermedades relacionadas",
      status: "Optimización de Fármaco",
      progress: 25,
      color: "teal",
      milestones: [
        "Eficacia analgésica confirmada en modelos de OA (artrosis)",
        "Validación del mecanismo de direccionamiento intracelular de TRPV4",
        "Optimización en curso del fármaco de terapia génica AAV",
        "Desarrollo para enfermedad huérfana (CMT2C) con planes de expandirse a indicaciones relacionadas",
      ],
      details: [
        "Terapia génica basada en vector AAV dirigida al canal TRPV4 intracelular",
        "Eficacia analgésica probada en modelos animales de osteoartritis (OA)",
        "Actualmente en proceso de optimización del candidato a fármaco",
        "Desarrollo inicial enfocado en la enfermedad huérfana rara CMT2C, con planes de expansión a trastornos relacionados",
      ],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
  ],
  fr: [
    {
      name: "RCI001",
      indication: "Sécheresse Oculaire",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "Modulation du signal en aval de TRPV1 inhibant l'inflammation Rac1/NLRP3 — favorise la sécrétion lacrymale et la cicatrisation cornéenne",
      status: "US FDA Phase 2 / Corée Phase 2",
      progress: 62,
      color: "emerald",
      milestones: [
        "FDA Phase 2 IND Approuvé (2025.08)",
        "NCT07068958 Enregistré",
        "Corée Phase 2 Prévu (S1 2026)",
        "Recherche conjointe nationale avec Hanlim Pharma (RCI001/RCI001U)",
        "Analyse Intermédiaire Q1 2026",
      ],
      details: [
        "Solution ophtalmique 0.25%",
        "Sécrétion lacrymale plus rapide vs stéroïdes traditionnels",
        "Modèle Sjögren : augmentation de la sécrétion lacrymale en 1 semaine",
        "Brevet japonais TRPV1 enregistré",
        "Surmonte les effets secondaires des stéroïdes (PIO, rougeur, brûlure)",
        "Effets thérapeutiques en 4 semaines",
      ],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RCI001AH",
      indication: "Œil Sec Vétérinaire (Kératoconjonctivite Sèche, KCS)",
      target: "TRPV1-Rac1 Target",
      mechanism:
        "Même mécanisme d'action que RCI001 — module la cascade inflammatoire Rac1/NLRP3 en aval de TRPV1. Formulation vétérinaire ciblant l'œil sec chez les animaux de compagnie (chiens/chats).",
      status: "PoC Terminé / Préparation d'Essais Vétérinaires",
      progress: 45,
      color: "emerald",
      milestones: [
        "Étude PoC terminée",
        "FastOnset confirmé",
        "Étude comparative vs cyclosporine vétérinaire — efficacité supérieure confirmée",
        "Préparation d'essais cliniques vétérinaires",
        "Co-développement avec pharma vétérinaire française (objectif marché 2030)",
      ],
      details: [
        "Même mécanisme d'action que RCI001 (modulation en aval TRPV1-Rac1/NLRP3)",
        "Cible l'œil sec (KCS) chez les animaux de compagnie (chiens/chats)",
        "Étude PoC terminée — efficacité confirmée",
        "FastOnset : apparition rapide de l'effet confirmée",
        "Efficacité supérieure vs cyclosporine vétérinaire en étude comparative",
        "Co-développement avec pharma vétérinaire française, objectif entrée sur le marché 2030",
      ],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RCI002",
      indication: "Douleur Chronique Non Opioïde",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism:
        "Analgésique non opioïde à double cible MOR biased modulant simultanément TRPV1 et MOR — Désignation de Médicament Orphelin pour le CRPS soumise",
      status: "Préclinique / Préparation IND (CRPS ODD soumise)",
      progress: 40,
      color: "blue",
      milestones: [
        "Études d'Efficacité Précliniques Terminées",
        "Recherche de Formulation (Dr. Dongjin Jang, Univ. Gangwon)",
        "Désignation de Médicament Orphelin (ODD) pour CRPS Soumise",
        "Présentation Conférence SfN (2025.11)",
        "Scale-up TIPS 1,2 Mrd KRW (2024)",
        "Dépôt IND Global Q2 2026",
        "Début Phase 1 S2 2026",
      ],
      details: [
        "Indications : CRPS, arthrose, neuropathie diabétique, CIPN, fibromyalgie",
        "Agonisme MOR biased minimise le risque d'addiction/tolérance",
        "Dose unique : réduction de la douleur 2+ semaines dans le modèle arthrose",
        "Pas d'effet secondaire de fièvre anormale (problème TRPV1 1ère gén. résolu)",
        "Efficacité à concentration 650x inférieure vs traitements existants",
        "Désignation FDA ODD pour CRPS soumise",
      ],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RCI003",
      indication: "Psoriasis",
      target: "Modulateur Sélectif des Protéines Cibles du Psoriasis",
      mechanism:
        "Modulation sélective des protéines cibles du psoriasis basée sur plateforme IA — exploitant l'expertise TRPV1 en canaux ioniques",
      status: "Découverte",
      progress: 15,
      color: "violet",
      milestones: [
        "Syntekabio Collabo R&D Phase 2 Sélectionné (2026)",
        "Syntekabio Collabo R&D Sélectionné (2024)",
        "Consortium Univ. Sogang & Univ. Inje",
        "Analyse des Cibles avec Plateforme IA (STB)",
        "Synthèse de Composés Candidats en Cours",
        "Évaluation d'Efficacité In-vitro/In-vivo Prévue",
      ],
      details: [
        "Plateforme IA Syntekabio (STB) pour analyse des protéines cibles",
        "Expertise TRPV1 de RudaCure appliquée aux canaux ioniques des maladies cutanées",
        "Université Sogang : synthèse et optimisation des composés",
        "Université Inje : évaluation d'efficacité des composés candidats",
        "Période de recherche : Avr 2026 – Mar 2028",
      ],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RCI0165",
      indication: "Traitement Vétérinaire de la Douleur (Thérapie Génique)",
      target: "TRPV1 Only Target (Vecteur AAV)",
      mechanism:
        "Thérapie génique ciblant TRPV1 basée sur vecteur AAV — administration unique pour soulagement durable de la douleur chez les animaux",
      status: "CMC et pharmacologie/toxicologie en cours",
      progress: 20,
      color: "indigo",
      milestones: [
        "Programme de Scale-Up à Investissement Privé Sélectionné (2026.4)",
        "Programme d'Entrepreneuriat Agro-Alimentaire Sélectionné (2025)",
        "PoC Basé sur Vecteur AAV Terminé",
        "Effet Analgésique 3+ Mois Confirmé en Dose Unique",
        "Objectif : Animaux de Compagnie et Chevaux de Course",
      ],
      details: [
        "Thérapie génique basée sur vecteur AAV (virus adéno-associé)",
        "Cible unique du canal ionique TRPV1",
        "Administration unique offrant 3+ mois de soulagement durable",
        "Pour la gestion de la douleur chronique chez les animaux de compagnie et de haute valeur (chevaux de course)",
        "Marché mondial du traitement vétérinaire de la douleur ~2 Mrd $ par an",
      ],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RC0125 AAV",
      indication:
        "CMT2C (Maladie de Charcot-Marie-Tooth 2C), Dysplasie Squelettique, Scoliose, Malformations Squelettiques",
      target: "TRPV4 Intracellular Target (Vecteur AAV)",
      mechanism:
        "Thérapie génique basée sur un vecteur AAV ciblant TRPV4 intracellulaire — développée comme médicament orphelin avec des projets d'extension aux maladies apparentées",
      status: "Optimisation du Médicament",
      progress: 25,
      color: "teal",
      milestones: [
        "Efficacité analgésique confirmée dans les modèles d'arthrose (OA)",
        "Validation du mécanisme de ciblage intracellulaire de TRPV4",
        "Optimisation en cours du médicament de thérapie génique AAV",
        "Développement pour la maladie orpheline (CMT2C) avec projets d'extension aux indications apparentées",
      ],
      details: [
        "Thérapie génique basée sur un vecteur AAV ciblant le canal TRPV4 intracellulaire",
        "Efficacité analgésique prouvée dans les modèles animaux d'arthrose (OA)",
        "Actuellement en phase d'optimisation du candidat médicament",
        "Développement initial ciblant la maladie orpheline rare CMT2C, avec des projets d'extension aux troubles apparentés",
      ],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
  ],
};

const STAGES: Record<string, string[]> = {
  ko: [
    "후보물질 탐색",
    "비임상",
    "IND",
    "임상 1상",
    "임상 2상",
    "임상 3상",
    "허가",
  ],
  en: [
    "Discovery",
    "Pre-clinical",
    "IND",
    "Phase 1",
    "Phase 2",
    "Phase 3",
    "Approval",
  ],
  zh: ["候选发现", "临床前", "IND", "1期", "2期", "3期", "批准"],
  ja: ["候補発見", "前臨床", "IND", "第1相", "第2相", "第3相", "承認"],
  es: [
    "Descubrimiento",
    "Preclínico",
    "IND",
    "Fase 1",
    "Fase 2",
    "Fase 3",
    "Aprobación",
  ],
  fr: [
    "Découverte",
    "Préclinique",
    "IND",
    "Phase 1",
    "Phase 2",
    "Phase 3",
    "Approbation",
  ],
};

export default async function PipelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = (
    ["ko", "en", "zh", "ja", "es", "fr"].includes(loc) ? loc : "en"
  ) as string;
  const h = HEADER[locale] || HEADER.en;
  const pipeline = PIPELINE[locale] || PIPELINE.en;
  const stages = STAGES[locale] || STAGES.en;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ClinicalTrial",
                "@id": "https://clinicaltrials.gov/study/NCT07068958",
                name: "RCI001 for Dry Eye Disease — FDA Phase 2",
                identifier: "NCT07068958",
                description:
                  "Phase 2 randomized controlled trial of RCI001 (0.25% topical ophthalmic solution, TRPV1-Rac1/NLRP3 downstream modulator) for moderate-to-severe dry eye disease. IND approved August 2025.",
                url: "https://clinicaltrials.gov/study/NCT07068958",
                status: "Recruiting",
                phase: "Phase 2",
                sponsor: {
                  "@type": "Organization",
                  name: "RudaCure Co., Ltd.",
                  url: "https://www.rudacure.com",
                },
                studyDesign:
                  "Randomized, double-blind, placebo-controlled, multicenter",
                healthCondition: {
                  "@type": "MedicalCondition",
                  name: "Dry Eye Disease",
                  alternateName: ["DED", "Keratoconjunctivitis sicca"],
                },
                drug: {
                  "@type": "Drug",
                  name: "RCI001",
                  description:
                    "TRPV1 downstream signal modulator (not a direct TRPV1 antagonist). Modulates Rac1/NLRP3 inflammatory cascade to restore tear film homeostasis and corneal epithelial healing without blocking thermosensation.",
                  administrationRoute: "Topical ophthalmic",
                  dosageForm: "0.25% eye drop solution",
                  mechanismOfAction:
                    "TRPV1-Rac1/NLRP3 downstream pathway modulation — neurogenic inflammation suppression",
                  proprietaryName: "RCI001",
                  manufacturer: {
                    "@type": "Organization",
                    name: "RudaCure Co., Ltd.",
                  },
                },
              },
              {
                "@type": "Drug",
                name: "RCI001",
                description:
                  "Non-steroidal topical ophthalmic solution for dry eye disease. TRPV1 downstream modulator. FDA Phase 2 (NCT07068958). Korea Phase 2 planned 2026. Domestic co-research with Hanlim Pharma (KRW 15B). Patent granted: Korea, Japan, USA.",
                mechanismOfAction: "TRPV1-Rac1/NLRP3 pathway modulation",
                administrationRoute: "Topical ophthalmic",
                drugClass: "TRPV1 downstream modulator",
                clinicalPhase: "Phase 2",
                manufacturer: {
                  "@type": "Organization",
                  name: "RudaCure Co., Ltd.",
                  url: "https://www.rudacure.com",
                },
              },
              {
                "@type": "Drug",
                name: "RCI001AH",
                description:
                  "Veterinary formulation of RCI001 for dry eye (keratoconjunctivitis sicca, KCS) in companion animals (dogs/cats). Same mechanism of action as RCI001 (TRPV1-Rac1/NLRP3 downstream modulation). PoC study complete; FastOnset confirmed; superior efficacy vs veterinary cyclosporine in comparative testing. Preparing veterinary clinical trials. Co-developed with a French veterinary pharmaceutical company, targeting 2030 market.",
                mechanismOfAction: "TRPV1-Rac1/NLRP3 pathway modulation",
                administrationRoute: "Topical ophthalmic (veterinary)",
                drugClass: "TRPV1 downstream modulator",
                clinicalPhase: "Pre-clinical",
                manufacturer: {
                  "@type": "Organization",
                  name: "RudaCure Co., Ltd.",
                  url: "https://www.rudacure.com",
                },
              },
              {
                "@type": "Drug",
                name: "RCI002",
                description:
                  "Non-opioid chronic pain analgesic. MOR-biased dual TRPV1/MOR modulator. Indications: CRPS, osteoarthritis, diabetic neuropathy, CIPN, fibromyalgia. FDA Orphan Drug Designation (ODD) submitted for CRPS. No hyperthermia side effect. Efficacy at 650x lower concentration vs existing analgesics. Global IND Q2 2026.",
                mechanismOfAction:
                  "MOR-biased dual TRPV1/MOR modulation — pain relief without opioid side effects",
                drugClass: "Non-opioid analgesic",
                clinicalPhase: "Pre-clinical",
                manufacturer: {
                  "@type": "Organization",
                  name: "RudaCure Co., Ltd.",
                  url: "https://www.rudacure.com",
                },
              },
              {
                "@type": "Drug",
                name: "RCI0165",
                description:
                  "AAV vector-based TRPV1-targeted gene therapy for veterinary chronic pain (companion animals, racehorses). Single administration provides 3+ months sustained analgesia. CMC and pharmacology/toxicology studies in progress. Private investment scale-up program 2026.",
                mechanismOfAction:
                  "AAV-mediated TRPV1 gene modulation for sustained analgesia",
                drugClass: "Gene therapy — TRPV1 antagonist",
                administrationRoute: "Injection (veterinary)",
                clinicalPhase: "Pre-clinical",
                manufacturer: {
                  "@type": "Organization",
                  name: "RudaCure Co., Ltd.",
                  url: "https://www.rudacure.com",
                },
              },
              {
                "@type": "Drug",
                name: "RCI003",
                description:
                  "AI-discovered selective modulator of psoriasis target proteins. Leverages RudaCure's TRPV1 ion channel platform for skin disease. In collaboration with Syntekabio AI platform (STB), Sogang University, and Inje University. Discovery stage 2026-2028.",
                mechanismOfAction:
                  "Selective modulation of psoriasis target proteins via ion channel pathway",
                drugClass: "Psoriasis modulator",
                clinicalPhase: "Discovery",
                manufacturer: {
                  "@type": "Organization",
                  name: "RudaCure Co., Ltd.",
                  url: "https://www.rudacure.com",
                },
              },
            ],
          }),
        }}
      />
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
            <div className="liquid-glass p-6 overflow-x-auto">
              <div className="flex items-center min-w-[600px]">
                {stages.map((stage, i) => (
                  <div key={stage} className="flex-1 flex items-center">
                    <div className="text-center flex-1">
                      <div className="text-xs text-gray-600 uppercase tracking-wider font-medium">
                        {stage}
                      </div>
                    </div>
                    {i < stages.length - 1 && (
                      <div className="w-px h-4 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
              {/* Pipeline bars */}
              <div className="mt-6 space-y-3">
                {pipeline.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-sm font-mono font-semibold text-gray-700 w-20">
                      {p.name}
                    </span>
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
                        <span
                          className={`text-xs font-semibold whitespace-nowrap ${
                            p.color === "emerald"
                              ? "text-teal-700"
                              : p.color === "blue"
                                ? "text-blue-700"
                                : p.color === "violet"
                                  ? "text-violet-700"
                                  : "text-indigo-700"
                          }`}
                        >
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
              <div key={p.name} className="liquid-glass p-8">
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
                      <span className="text-sm text-gray-600 font-medium">
                        {p.status}
                      </span>
                    </div>

                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                      {p.name}
                    </h2>
                    <p className="text-base text-gray-600 mb-1">
                      <span className="font-medium">Target:</span> {p.target}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed mb-4">
                      {p.mechanism}
                    </p>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <ProgressBar
                          progress={p.progress}
                          className={`h-full rounded-full ${
                            p.color === "emerald"
                              ? "bg-emerald-500"
                              : p.color === "blue"
                                ? "bg-blue-500"
                                : p.color === "violet"
                                  ? "bg-violet-500"
                                  : "bg-indigo-500"
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
                          <li
                            key={i}
                            className="text-[15px] text-gray-600 flex items-start gap-2 leading-relaxed"
                          >
                            <span className="text-teal-600 mt-0.5">
                              &#8226;
                            </span>
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
                              p.color === "emerald"
                                ? "bg-emerald-400"
                                : p.color === "blue"
                                  ? "bg-blue-400"
                                  : p.color === "violet"
                                    ? "bg-violet-400"
                                    : "bg-indigo-400"
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
    </>
  );
}
