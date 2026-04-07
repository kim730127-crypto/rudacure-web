import Link from "next/link";
import { type Locale } from "@/lib/i18n";

const SITE_URL = "https://www.rudacure.com";

type CROLocale = "ko" | "en";
function toCROLocale(locale: string): CROLocale {
  return locale === "ko" ? "ko" : "en";
}

/* ── Page metadata per locale ── */
const META: Record<CROLocale, { title: string; description: string }> = {
  ko: {
    title: "CRO 서비스 | RudaCure",
    description:
      "이온채널 약리학에 특화된 비임상 CRO. TRPV1, TRPA1, Nav 채널 표적 만성통증·안구건조증 후보물질의 효능 평가. 19+ 위탁과제 수행 실적, FLIPR Penta HTS, 13+ 동물모델 운용.",
  },
  en: {
    title: "CRO Services | RudaCure",
    description:
      "Ion channel-specialized preclinical CRO. Efficacy evaluation of TRPV1, TRPA1, Nav channel-targeted chronic pain and dry eye disease candidates. 19+ completed contracts, FLIPR Penta HTS, 13+ animal models.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = META[toCROLocale(locale)];
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      images: [
        {
          url: "/og-image-pipeline.jpg",
          width: 1200,
          height: 630,
          alt: m.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/og-image-pipeline.jpg"],
    },
  };
}

/* ── Content per locale ── */
type Content = {
  tag: string;
  title1: string;
  title2: string;
  description: string;
  stats: { value: string; label: string }[];
  intro: {
    tag: string;
    heading: string;
    body: string;
    sites: { name: string; address: string }[];
    head: { name: string; role: string };
  };
  servicesTag: string;
  servicesTitle: string;
  servicesSub: string;
  services: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }[];
  painTag: string;
  painTitle: string;
  painSub: string;
  painModels: {
    num: string;
    name: string;
    description: string;
    tags: string;
  }[];
  invivoTag: string;
  invivoTitle: string;
  invivoSub: string;
  invivoGroups: { title: string; items: string[] }[];
  hematology: { title: string; items: string[] };
  modelsTag: string;
  modelsTitle: string;
  modelsSub: string;
  modelGroups: { title: string; items: string[] }[];
  fliprTag: string;
  fliprTitle: string;
  fliprSub: string;
  fliprGroups: { title: string; description: string; items: string[] }[];
  trackTag: string;
  trackTitle: string;
  trackSub: string;
  trackGroups: { title: string; items: string[] }[];
  partnerTag: string;
  partnerTitle: string;
  partner: { period: string; title: string; description: string };
  ctaTag: string;
  ctaTitle: string;
  ctaBody: string;
  contactBtn: string;
};

const CONTENT: Record<CROLocale, Content> = {
  ko: {
    tag: "CRO 서비스",
    title1: "Ion Channel",
    title2: "Preclinical CRO",
    description:
      "TRPV1·TRPA1·Nav 이온채널을 중심으로 만성통증·안구건조증 후보물질의 비임상 효능을 평가하는 전문 CRO입니다. 전기생리학 기반 세포 실험부터 복잡한 동물 행동 평가까지, 약물 개발의 비임상 단계 전 과정을 체계적으로 지원합니다.",
    stats: [
      { value: "19+", label: "위탁과제 수행 실적" },
      { value: "13+", label: "질환 동물모델" },
      { value: "5", label: "만성통증 평가 모델" },
      { value: "3", label: "핵심 연구 플랫폼" },
    ],
    intro: {
      tag: "About",
      heading: "통증의 근원을 과학으로 추적합니다",
      body: "신경병증성 통증, 골관절염, 항암제 유발 신경병증, 안구건조증 — 루다큐어가 다루는 질환은 모두 일상을 무너뜨리는 만성 통증과 감각 이상에 관한 것들입니다. 이온채널 약리학에 특화된 19년간의 연구 노하우로, 약물 후보물질의 효능을 정밀하게 검증합니다.",
      sites: [
        {
          name: "송도연구소",
          address: "인천시 연수구 송도미래로 9, BRC연구소 1동 301-2호",
        },
        {
          name: "서울연구소",
          address:
            "서울시 금천구 가산디지털1로 145, 에이스하이엔드타워3차 1001호",
        },
      ],
      head: {
        name: "신지윤 연구소장",
        role: "Head of Central Research Laboratory",
      },
    },
    servicesTag: "Core Services",
    servicesTitle: "RudaCure CRO 3대 서비스",
    servicesSub:
      "세포 수준 스크리닝부터 전체 동물 연구까지, 비임상 효능 평가의 전 과정을 한 곳에서.",
    services: [
      {
        id: "01",
        title: "의약품 유효성 평가",
        description:
          "만성통증·뇌신경·안구건조증 동물모델에서 치료 후보물질의 약리학적 효능을 정밀하게 평가합니다. 5가지 통증 유형과 4가지 안구건조 모델을 운용합니다.",
        tags: ["신경병증성 통증", "골관절염", "안구건조증", "CIPN"],
      },
      {
        id: "02",
        title: "In Vivo / In Vitro 평가",
        description:
          "척수강내 투여를 포함한 7가지 약물 투여 경로, 4가지 채혈 방법, 신경조직 슬라이드 제작, 18개 항목의 혈액학적 분석까지 전 과정을 수행합니다.",
        tags: ["7가지 투여 경로", "혈액분석 18종", "조직 슬라이드"],
      },
      {
        id: "03",
        title: "FLIPR Penta 스크리닝",
        description:
          "이온채널 발현 세포주 기반 고속 스크리닝(HTS). 하루 수천 개 화합물의 칼슘 유입·막전위 반응을 자동으로 측정하고, hERG 등 심혈관 안전성도 초기 단계에서 평가합니다.",
        tags: ["TRPV1/TRPA1", "Nav1.7/1.8", "hERG Safety"],
      },
    ],
    painTag: "Service 01 — Efficacy",
    painTitle: "만성통증 평가 모델",
    painSub: "다섯 가지 통증 유형을 모두 다룹니다",
    painModels: [
      {
        num: "01",
        name: "신경병증성 통증",
        description:
          "말초신경 손상 모델(SNT, CCI, SNL)에서 기계적 이질통, 냉 과민, 열 과민 반응을 정량합니다. Von Frey filament로 역치를 측정하고, Plantar test로 열자극 반응 시간을 기록합니다.",
        tags: "Von Frey · Plantar test · Cold allodynia",
      },
      {
        num: "02",
        name: "골관절염 통증",
        description:
          "MIA(Monosodium iodoacetate) 유발 OA 모델에서 자발통증 행동 및 관절 운동기능 변화를 weight-bearing asymmetry와 gait analysis로 정량 평가합니다.",
        tags: "Weight-bearing · Gait analysis",
      },
      {
        num: "03",
        name: "수술 후 통증",
        description:
          "Brennan 발바닥 절개 모델로 급성 및 지속성 수술 후 통증을 재현합니다. 수술 직후부터 회복까지의 통증 역치 변화를 시계열로 추적합니다.",
        tags: "Incisional pain model (Brennan)",
      },
      {
        num: "04",
        name: "당뇨병성 신경병증 통증",
        description:
          "STZ(Streptozotocin) 유도 당뇨 모델에서 말초 감각신경의 과민 상태를 정량합니다. 혈당 수치와 통증 역치 변화를 동시에 모니터링합니다.",
        tags: "STZ-induced DPN model",
      },
      {
        num: "05",
        name: "항암제 유발 말초신경병증 (CIPN)",
        description:
          "Paclitaxel, Oxaliplatin, Cisplatin 처리 CIPN 모델에서 화학적 감각 이상(cold allodynia)과 기계적 이질통을 평가합니다. 항암 치료의 가장 흔한 부작용인 CIPN을 표적으로 하는 신약 개발 과제에 최적화된 모델입니다.",
        tags: "Paclitaxel · Oxaliplatin · Cisplatin",
      },
    ],
    invivoTag: "Service 02 — In Vivo / In Vitro",
    invivoTitle: "투여부터 분석까지 한 곳에서",
    invivoSub: "전 과정 자체 수행 — 외주 의존도 0",
    invivoGroups: [
      {
        title: "약물 투여 경로 (7종)",
        items: [
          "정맥주사 (IV)",
          "복강내 투여 (IP)",
          "경구투여 (PO)",
          "피하주사 (SC)",
          "근육주사 (IM)",
          "피부내 주사 (ID)",
          "척수강내 투여 (IT)",
        ],
      },
      {
        title: "채혈 방법 (4종)",
        items: ["경정맥 채혈", "심장 채혈", "안와 채혈", "대동맥 채혈"],
      },
      {
        title: "부검 및 조직",
        items: [
          "설치류 신경조직 부검",
          "조직 슬라이드 제작",
          "DRG 신경절 분리",
          "조직 고정·포매",
        ],
      },
      {
        title: "분석 장비",
        items: [
          "혈액학 자동분석기 Indiko",
          "생화학분석",
          "형광 현미경",
          "전기생리 기록 장비",
        ],
      },
    ],
    hematology: {
      title: "혈액학적 검사 항목 (18종)",
      items: [
        "WBC",
        "RBC",
        "HGB",
        "HCT",
        "MCV",
        "MCH",
        "MCHC",
        "RDW",
        "PLT",
        "MPV",
        "PDW",
        "PCT",
        "NEUT%",
        "LYMPH%",
        "MONO%",
        "EOS%",
        "BASO%",
        "생화학 패널",
      ],
    },
    modelsTag: "Disease Models",
    modelsTitle: "질환 동물모델",
    modelsSub: "Rat / Mouse 기반 전 질환 영역 커버",
    modelGroups: [
      {
        title: "통증 모델",
        items: [
          "SNT (Spinal nerve transection)",
          "CCI (Chronic constriction injury)",
          "SNL (Spinal nerve ligation)",
          "CIPN (Paclitaxel / Oxaliplatin)",
          "DPN (STZ-유발 당뇨병성)",
          "수술 후 통증",
          "골관절염 통증 (MIA)",
          "류마티스 관절염 (RA)",
          "염증성 통증 (CFA)",
        ],
      },
      {
        title: "안질환 / 기타 모델",
        items: [
          "환경성 건성안 모델",
          "BAC 유발 건성안",
          "알칼리 화상 각막 손상",
          "에탄올 유발 화상 모델",
          "LPS 유발 폐렴 모델",
          "통풍 모델",
          "허혈성 모델",
          "뇌졸중 (Stroke) 모델",
        ],
      },
      {
        title: "세포/신경 기반",
        items: [
          "Human DRG neurons",
          "Rodent DRG neurons",
          "Rodent TG neurons",
          "이온채널 고발현 세포주",
          "뇌·척수 급성 절편",
          "Human iPSC 심근세포",
          "Sprague-Dawley Rat",
          "C57BL/6 / ICR Mouse",
        ],
      },
    ],
    fliprTag: "Service 03 — HTS",
    fliprTitle: "FLIPR Penta 자동 스크리닝",
    fliprSub: "하루 수천 개 화합물을 자동으로 평가합니다",
    fliprGroups: [
      {
        title: "이온채널 효능 스크리닝",
        description: "HTS 기반 이온채널 기능 평가",
        items: [
          "Human TRPV1 / Rat TRPV1",
          "Human TRPA1",
          "Human Nav1.4",
          "Human Nav1.7",
          "Human Nav1.8",
          "Calcium influx",
          "칼슘 이미징",
        ],
      },
      {
        title: "심혈관 안전성 스크리닝",
        description: "초기 단계 심독성 안전성 평가",
        items: [
          "hERG channel",
          "Cav1.2 channel",
          "Nav1.5 channel",
          "Human iPSC 심근세포",
          "Cardiac safety",
        ],
      },
      {
        title: "분석법 포트폴리오",
        description: "원스톱 측정 방법론",
        items: [
          "Calcium assay (FURA-2 · FLUO-4)",
          "Potassium assay",
          "Luminescence Aequorin",
          "Membrane Potential dye",
          "GPCR assay",
        ],
      },
    ],
    trackTag: "Track Record",
    trackTitle: "위탁과제 수행 실적",
    trackSub: "제약사와 국가연구기관이 선택한 파트너",
    trackGroups: [
      {
        title: "제약사 위탁과제",
        items: [
          "골관절염 통증 완화 기전 연구",
          "신경병증성 통증모델 냉통각 반응 평가",
          "시험검체의 활동전위 조절 유효성 평가",
          "망상적혈구수 변화량 측정",
          "비임상 급성독성시험 (Non-GLP)",
          "세포독성 시험",
          "통증 이온채널 길항제 스크리닝",
          "약물동태 및 급성독성시험",
          "폐렴모델 시험검체 생존력 분석",
          "약물기전에 따른 효력시험",
        ],
      },
      {
        title: "국가연구과제 위탁 수행",
        items: [
          "정맥내피 세포에서 BK 채널 연관성 평가",
          "척수신경망 내 통증조절 유효성 평가",
          "TRPA1 이온채널 기능 억제 유효성 평가",
          "TRPV1 이온채널 기능 억제 효능 평가",
          "항암제 처리에 의한 시냅스 가소성 조절 평가",
          "가려움증 조절 핵심 단백 발굴",
          "당뇨병성 신경병증 치료 천연물질 약효 평가",
          "안구표면 손상 변화도 평가",
          "물리화학적 특성 분석 및 평가",
        ],
      },
    ],
    partnerTag: "Global Partnership",
    partnerTitle: "세계와 함께 연구합니다",
    partner: {
      period: "2026 · Jinshan, China",
      title: "WuXi AppTec & RudaCure MOU",
      description:
        "세계 최대 CDMO WuXi AppTec과의 전략적 파트너십 체결. 글로벌 임상 개발 네트워크와 연결됩니다.",
    },
    ctaTag: "Contact",
    ctaTitle: "함께 연구하겠습니다",
    ctaBody:
      "신규 위탁과제, 공동연구, 서비스 문의 모두 환영합니다. 루다큐어 CRO와 시작하세요.",
    contactBtn: "위탁과제 문의하기",
  },
  en: {
    tag: "CRO Services",
    title1: "Ion Channel",
    title2: "Preclinical CRO",
    description:
      "Specialized preclinical CRO evaluating chronic pain and dry eye disease candidates targeting TRPV1, TRPA1, and Nav ion channels. From electrophysiology-based cell assays to complex animal behavior studies, we cover the full preclinical drug development pipeline.",
    stats: [
      { value: "19+", label: "Completed Contracts" },
      { value: "13+", label: "Disease Animal Models" },
      { value: "5", label: "Chronic Pain Models" },
      { value: "3", label: "Core Research Platforms" },
    ],
    intro: {
      tag: "About",
      heading: "Tracing the Source of Pain Through Science",
      body: "Neuropathic pain, osteoarthritis, chemotherapy-induced peripheral neuropathy, dry eye disease — the conditions we address all involve chronic pain and sensory disorders that disrupt daily life. With 19 years of expertise specialized in ion channel pharmacology, we precisely validate the efficacy of drug candidates.",
      sites: [
        {
          name: "Songdo Research Center",
          address: "BRC 1-302, 9 Songdo Mirae-ro, Yeonsu-gu, Incheon",
        },
        {
          name: "Seoul Research Center",
          address:
            "Ace Hightower-3 #1001, 145 Gasandigital 1-ro, Geumcheon-gu, Seoul",
        },
      ],
      head: {
        name: "Dr. Jiyoon Shin",
        role: "Head of Central Research Laboratory",
      },
    },
    servicesTag: "Core Services",
    servicesTitle: "Three Core CRO Services",
    servicesSub:
      "From cellular screening to whole-animal studies — preclinical efficacy evaluation under one roof.",
    services: [
      {
        id: "01",
        title: "Drug Efficacy Evaluation",
        description:
          "Precise pharmacological evaluation of therapeutic candidates in chronic pain, neurological, and dry eye disease animal models. We operate 5 pain types and 4 dry eye models.",
        tags: ["Neuropathic Pain", "Osteoarthritis", "Dry Eye", "CIPN"],
      },
      {
        id: "02",
        title: "In Vivo / In Vitro Evaluation",
        description:
          "End-to-end execution: 7 drug administration routes including intrathecal, 4 blood sampling methods, neural tissue slide preparation, and 18-parameter hematological analysis.",
        tags: ["7 Routes", "18 Hematology Tests", "Tissue Slides"],
      },
      {
        id: "03",
        title: "FLIPR Penta Screening",
        description:
          "High-throughput screening (HTS) using ion channel-expressing cell lines. Automatically measures calcium influx and membrane potential responses for thousands of compounds per day, including early-stage hERG cardiac safety evaluation.",
        tags: ["TRPV1/TRPA1", "Nav1.7/1.8", "hERG Safety"],
      },
    ],
    painTag: "Service 01 — Efficacy",
    painTitle: "Chronic Pain Models",
    painSub: "Five distinct pain types — fully covered",
    painModels: [
      {
        num: "01",
        name: "Neuropathic Pain",
        description:
          "Quantification of mechanical allodynia, cold hypersensitivity, and thermal hypersensitivity in peripheral nerve injury models (SNT, CCI, SNL). Threshold measurement with Von Frey filaments and thermal response time recording with the Plantar test.",
        tags: "Von Frey · Plantar test · Cold allodynia",
      },
      {
        num: "02",
        name: "Osteoarthritis Pain",
        description:
          "Quantitative evaluation of spontaneous pain behavior and joint motor function changes in MIA (Monosodium iodoacetate)-induced OA models using weight-bearing asymmetry and gait analysis.",
        tags: "Weight-bearing · Gait analysis",
      },
      {
        num: "03",
        name: "Post-Surgical Pain",
        description:
          "The Brennan plantar incision model reproduces acute and persistent post-surgical pain. Pain threshold changes are tracked from immediately after surgery through recovery.",
        tags: "Incisional pain model (Brennan)",
      },
      {
        num: "04",
        name: "Diabetic Peripheral Neuropathy",
        description:
          "Quantification of peripheral sensory nerve hypersensitivity in STZ (Streptozotocin)-induced diabetic models. Blood glucose levels and pain thresholds are monitored simultaneously.",
        tags: "STZ-induced DPN model",
      },
      {
        num: "05",
        name: "Chemotherapy-Induced Peripheral Neuropathy (CIPN)",
        description:
          "Evaluation of chemical sensory abnormalities (cold allodynia) and mechanical allodynia in CIPN models treated with Paclitaxel, Oxaliplatin, and Cisplatin. Optimized model for novel drug projects targeting CIPN — the most common side effect of chemotherapy.",
        tags: "Paclitaxel · Oxaliplatin · Cisplatin",
      },
    ],
    invivoTag: "Service 02 — In Vivo / In Vitro",
    invivoTitle: "From Administration to Analysis",
    invivoSub: "Full pipeline in-house — zero outsourcing",
    invivoGroups: [
      {
        title: "Drug Administration Routes (7)",
        items: [
          "Intravenous (IV)",
          "Intraperitoneal (IP)",
          "Oral (PO)",
          "Subcutaneous (SC)",
          "Intramuscular (IM)",
          "Intradermal (ID)",
          "Intrathecal (IT)",
        ],
      },
      {
        title: "Blood Sampling (4)",
        items: ["Jugular vein", "Cardiac puncture", "Orbital sinus", "Aortic"],
      },
      {
        title: "Necropsy & Tissue",
        items: [
          "Rodent neural tissue necropsy",
          "Tissue slide preparation",
          "DRG ganglion isolation",
          "Tissue fixation & embedding",
        ],
      },
      {
        title: "Analysis Equipment",
        items: [
          "Indiko hematology analyzer",
          "Biochemistry analysis",
          "Fluorescence microscopy",
          "Electrophysiology recording",
        ],
      },
    ],
    hematology: {
      title: "Hematology Panel (18 parameters)",
      items: [
        "WBC",
        "RBC",
        "HGB",
        "HCT",
        "MCV",
        "MCH",
        "MCHC",
        "RDW",
        "PLT",
        "MPV",
        "PDW",
        "PCT",
        "NEUT%",
        "LYMPH%",
        "MONO%",
        "EOS%",
        "BASO%",
        "Biochemistry Panel",
      ],
    },
    modelsTag: "Disease Models",
    modelsTitle: "Disease Animal Models",
    modelsSub: "Full coverage on Rat / Mouse platforms",
    modelGroups: [
      {
        title: "Pain Models",
        items: [
          "SNT (Spinal nerve transection)",
          "CCI (Chronic constriction injury)",
          "SNL (Spinal nerve ligation)",
          "CIPN (Paclitaxel / Oxaliplatin)",
          "DPN (STZ-induced)",
          "Post-surgical pain",
          "Osteoarthritis pain (MIA)",
          "Rheumatoid arthritis (RA)",
          "Inflammatory pain (CFA)",
        ],
      },
      {
        title: "Eye / Other Models",
        items: [
          "Environmental dry eye",
          "BAC-induced dry eye",
          "Alkali burn corneal injury",
          "Ethanol burn model",
          "LPS-induced pneumonia",
          "Gout model",
          "Ischemic model",
          "Stroke model",
        ],
      },
      {
        title: "Cell / Neural-Based",
        items: [
          "Human DRG neurons",
          "Rodent DRG neurons",
          "Rodent TG neurons",
          "Ion channel-overexpressing cell lines",
          "Acute brain & spinal cord slices",
          "Human iPSC cardiomyocytes",
          "Sprague-Dawley Rat",
          "C57BL/6 / ICR Mouse",
        ],
      },
    ],
    fliprTag: "Service 03 — HTS",
    fliprTitle: "FLIPR Penta Automated Screening",
    fliprSub: "Thousands of compounds evaluated automatically per day",
    fliprGroups: [
      {
        title: "Ion Channel Efficacy Screening",
        description: "HTS-based functional ion channel evaluation",
        items: [
          "Human TRPV1 / Rat TRPV1",
          "Human TRPA1",
          "Human Nav1.4",
          "Human Nav1.7",
          "Human Nav1.8",
          "Calcium influx",
          "Calcium imaging",
        ],
      },
      {
        title: "Cardiac Safety Screening",
        description: "Early-stage cardiotoxicity evaluation",
        items: [
          "hERG channel",
          "Cav1.2 channel",
          "Nav1.5 channel",
          "Human iPSC cardiomyocytes",
          "Cardiac safety panel",
        ],
      },
      {
        title: "Assay Portfolio",
        description: "One-stop measurement methodology",
        items: [
          "Calcium assay (FURA-2 · FLUO-4)",
          "Potassium assay",
          "Luminescence Aequorin",
          "Membrane Potential dye",
          "GPCR assay",
        ],
      },
    ],
    trackTag: "Track Record",
    trackTitle: "Completed Contract Studies",
    trackSub:
      "Trusted by pharmaceutical companies and national research institutes",
    trackGroups: [
      {
        title: "Pharmaceutical Contracts",
        items: [
          "Osteoarthritis pain mechanism research",
          "Cold allodynia evaluation in neuropathic pain models",
          "Action potential modulation efficacy of test substances",
          "Reticulocyte count change measurement",
          "Preclinical acute toxicity testing (Non-GLP)",
          "Cytotoxicity testing",
          "Pain ion channel antagonist screening",
          "Pharmacokinetics & acute toxicity studies",
          "Pneumonia model test substance viability analysis",
          "Mechanism-based efficacy studies",
        ],
      },
      {
        title: "Government R&D Contracts",
        items: [
          "BK channel relevance evaluation in vascular endothelial cells",
          "Pain modulation efficacy in spinal neural circuits",
          "TRPA1 ion channel functional inhibition evaluation",
          "TRPV1 ion channel functional inhibition evaluation",
          "Synaptic plasticity modulation under chemotherapy treatment",
          "Discovery of key proteins regulating itch",
          "Natural compound efficacy for diabetic neuropathy treatment",
          "Ocular surface damage evaluation",
          "Physicochemical property analysis",
        ],
      },
    ],
    partnerTag: "Global Partnership",
    partnerTitle: "Researching With the World",
    partner: {
      period: "2026 · Jinshan, China",
      title: "WuXi AppTec & RudaCure MOU",
      description:
        "Strategic partnership signed with WuXi AppTec, the world's largest CDMO. Connected to global clinical development networks.",
    },
    ctaTag: "Contact",
    ctaTitle: "Let's Research Together",
    ctaBody:
      "New contract studies, joint research, and service inquiries are all welcome. Start with RudaCure CRO.",
    contactBtn: "Request a Contract Study",
  },
};

export default async function CROPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = toCROLocale(loc as Locale);
  const c = CONTENT[locale];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "RudaCure Preclinical CRO Services",
    serviceType: "Preclinical Contract Research Organization",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Place", name: "Global" },
    description: META.en.description,
    url: `${SITE_URL}/${loc}/cro`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Preclinical CRO Service Catalog",
      itemListElement: CONTENT.en.services.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-cyan-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.tag}
          </p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {c.title1}{" "}
            <em className="font-playfair italic font-semibold text-gradient-emerald">
              {c.title2}
            </em>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mb-12">
            {c.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.stats.map((s) => (
              <div key={s.label} className="liquid-glass p-5 text-center">
                <div className="text-3xl font-bold text-gradient-emerald mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-gray-600 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.intro.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-6 text-gray-900">
            <em className="italic font-semibold">{c.intro.heading}</em>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed mb-10">
            {c.intro.body}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.intro.sites.map((site) => (
              <div key={site.name} className="liquid-glass p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {site.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {site.address}
                </p>
              </div>
            ))}
            <div className="liquid-glass p-5 border border-teal-200">
              <h3 className="text-sm font-semibold text-teal-700 mb-2">
                {c.intro.head.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {c.intro.head.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Services */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-cyan-50/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.servicesTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
            <em className="italic font-semibold">{c.servicesTitle}</em>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed mb-12">
            {c.servicesSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.services.map((s) => (
              <div key={s.id} className="liquid-glass p-6">
                <div className="text-xs font-mono text-teal-600 mb-3">
                  {s.id}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 01 — Pain Models */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.painTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
            <em className="italic font-semibold">{c.painTitle}</em>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed mb-12">
            {c.painSub}
          </p>

          <div className="space-y-4">
            {c.painModels.map((p) => (
              <div key={p.num} className="liquid-glass p-6 flex gap-6">
                <div className="text-3xl font-bold text-gradient-emerald shrink-0 w-12">
                  {p.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <p className="text-xs font-mono text-teal-600">{p.tags}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 02 — In Vivo / In Vitro */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.invivoTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
            <em className="italic font-semibold">{c.invivoTitle}</em>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed mb-12">
            {c.invivoSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {c.invivoGroups.map((g) => (
              <div key={g.title} className="liquid-glass p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {g.title}
                </h3>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-teal-500 mt-0.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="liquid-glass p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {c.hematology.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {c.hematology.items.map((item) => (
                <span
                  key={item}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disease Models */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.modelsTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
            <em className="italic font-semibold">{c.modelsTitle}</em>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed mb-12">
            {c.modelsSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.modelGroups.map((g) => (
              <div key={g.title} className="liquid-glass p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {g.title}
                </h3>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-teal-500 mt-0.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 03 — FLIPR Penta */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-cyan-50/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.fliprTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
            <em className="italic font-semibold">{c.fliprTitle}</em>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed mb-12">
            {c.fliprSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.fliprGroups.map((g) => (
              <div key={g.title} className="liquid-glass p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {g.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {g.description}
                </p>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-cyan-500 mt-0.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.trackTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-gray-900">
            <em className="italic font-semibold">{c.trackTitle}</em>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed mb-12">
            {c.trackSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.trackGroups.map((g) => (
              <div key={g.title} className="liquid-glass p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  {g.title}
                </h3>
                <ul className="space-y-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-teal-500 mt-0.5 shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Partnership */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50/30 via-white to-cyan-50/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.partnerTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-12 text-gray-900">
            <em className="italic font-semibold">{c.partnerTitle}</em>
          </h2>

          <div className="liquid-glass p-8">
            <p className="text-xs font-mono text-cyan-600 mb-3">
              {c.partner.period}
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {c.partner.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {c.partner.description}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.ctaTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light mb-6 text-gray-900">
            <em className="italic font-semibold">{c.ctaTitle}</em>
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            {c.ctaBody}
          </p>
          <Link
            href={`/${loc}/contact?type=cro`}
            className="btn-primary inline-block px-8 py-3 rounded-full font-semibold text-sm"
          >
            {c.contactBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
