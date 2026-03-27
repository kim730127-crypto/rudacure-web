import { type Locale, toDataLocale } from "@/lib/i18n";
import { ProgressBar } from "@/components/progress-bar";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Pipeline | RudaCure" : "파이프라인 | RudaCure",
    description: "RCI001 (Dry Eye Disease, FDA Phase 2), RCI002 (Non-Opioid Pain), RCI003 (Psoriasis), RCI0165 (Osteoarthritis)",
  };
}

const HEADER: Record<string, { tag: string; title1: string; title2: string; description: string }> = {
  ko: { tag: "신약개발", title1: "Therapeutic", title2: "Pipeline", description: "이온채널 표적 비마약성 치료제 파이프라인. RuCIA 플랫폼으로 발굴한 후보물질들이 글로벌 임상으로 진입하고 있습니다." },
  en: { tag: "Drug Development", title1: "Therapeutic", title2: "Pipeline", description: "Ion channel-targeted non-opioid therapeutic pipeline. Candidates discovered through our RuCIA platform are advancing into global clinical trials." },
  zh: { tag: "药物开发", title1: "Therapeutic", title2: "Pipeline", description: "离子通道靶向非阿片类治疗管线。通过RuCIA AI平台发现的候选药物正进入全球临床试验阶段。" },
  ja: { tag: "医薬品開発", title1: "Therapeutic", title2: "Pipeline", description: "イオンチャネル標的非オピオイド治療パイプライン。RuCIA AIプラットフォームで発見された候補物質がグローバル臨床試験に進んでいます。" },
  es: { tag: "Desarrollo de Fármacos", title1: "Therapeutic", title2: "Pipeline", description: "Pipeline terapéutico no opioide dirigido a canales iónicos. Los candidatos descubiertos a través de nuestra plataforma RuCIA están avanzando hacia ensayos clínicos globales." },
  fr: { tag: "Développement de Médicaments", title1: "Therapeutic", title2: "Pipeline", description: "Pipeline thérapeutique non opioïde ciblant les canaux ioniques. Les candidats découverts via notre plateforme RuCIA progressent vers les essais cliniques mondiaux." },
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
      progress: 62,
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
        "제형 연구 (강원대 장동진 박사)",
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
      progress: 62,
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
        "Formulation Research (Dr. Dongjin Jang, Gangwon Univ.)",
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
  zh: [
    {
      name: "RCI001",
      indication: "干眼症",
      target: "TRPV1-Rac1 Target",
      mechanism: "通过TRPV1下游信号调节抑制Rac1/NLRP3炎症 — 促进泪液分泌和角膜愈合",
      status: "US FDA 2期 / 韩国2期",
      progress: 62,
      color: "emerald",
      milestones: ["FDA 2期 IND获批 (2025.08)", "NCT07068958注册完成", "韩国2期计划 (2026上半年)", "韩林制药国内许可 (RCI001/RCI001U)", "法国动物制药合作开发 (RCI001AH)", "中期分析 2026 Q1"],
      details: ["0.25%滴眼液制剂", "比传统类固醇更快的泪液分泌效果", "干燥综合征模型：1周内泪液分泌量增加", "日本TRPV1原始专利已注册", "克服类固醇副作用（眼压升高、充血、灼热感）", "4周内出现治疗效果"],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RCI002",
      indication: "非阿片类慢性疼痛治疗药",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism: "同时调节TRPV1和MOR的MOR biased双靶点非阿片类镇痛药 — 准备CRPS孤儿药认定",
      status: "临床前 / IND准备 (CRPS ODD准备)",
      progress: 40,
      color: "blue",
      milestones: ["临床前药效试验完成", "制剂研究 (江原大学 张东镇博士)", "CRPS孤儿药认定(ODD)申请准备中", "SfN学会研究成果发表 (2025.11)", "Scale-up TIPS 12亿韩元支持 (2024)", "全球IND提交 2026 Q2", "1期临床启动 2026下半年"],
      details: ["适应症：CRPS、骨关节炎、糖尿病性神经病变、CIPN、纤维肌痛", "MOR biased agonism最大限度降低成瘾/耐受风险", "单次给药：骨关节炎模型中疼痛减轻2周以上", "无异常发热副作用（解决第一代TRPV1问题）", "比现有治疗药低650倍浓度即有效", "FDA CRPS孤儿药认定(ODD)准备中"],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RCI003",
      indication: "银屑病治疗药",
      target: "银屑病靶蛋白选择性调节剂",
      mechanism: "基于AI新药平台的银屑病靶蛋白选择性调节 — 利用TRPV1离子通道研究经验",
      status: "候选药物发现",
      progress: 15,
      color: "violet",
      milestones: ["新特科生物产学研Collabo R&D第2阶段入选 (2026)", "新特科生物产学研Collabo R&D入选 (2024)", "西江大学·仁济大学联合研究", "AI平台(STB)靶点分析", "候选化合物合成及优化进行中", "体外/体内药效评价计划中"],
      details: ["新特科生物AI平台(STB)进行靶蛋白分析", "利用RudaCure TRPV1调控技术专长（皮肤病离子通道）", "西江大学：化合物合成与优化", "仁济大学：候选化合物药效评价", "研究期间：2026.04 ~ 2028.03"],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
    {
      name: "RCI0165",
      indication: "动物用疼痛治疗药（基因治疗）",
      target: "TRPV1 Only Target (AAV载体)",
      mechanism: "利用AAV载体的TRPV1靶向基因治疗药 — 单次给药实现长期疼痛缓解",
      status: "临床前 / PoC",
      progress: 20,
      color: "indigo",
      milestones: ["民间投资规模化支持事业入选 (2026.4)", "农食品创业育成事业入选 (2025)", "AAV载体PoC完成", "单次给药3个月以上镇痛效果确认", "目标：宠物·赛马应用"],
      details: ["AAV（腺相关病毒）载体基因治疗药", "TRPV1离子通道单一靶点", "单次给药3个月以上持续疼痛缓解", "宠物及高价值动物（赛马）慢性疼痛管理", "全球动物用疼痛治疗市场每年约$2B规模"],
      detailsLabel: "主要特点",
      milestonesLabel: "里程碑",
    },
  ],
  ja: [
    {
      name: "RCI001",
      indication: "ドライアイ",
      target: "TRPV1-Rac1 Target",
      mechanism: "TRPV1下流シグナル調節によるRac1/NLRP3炎症抑制 — 涙液分泌促進および角膜治癒",
      status: "US FDA Phase 2 / 韓国2相",
      progress: 62,
      color: "emerald",
      milestones: ["FDA Phase 2 IND承認 (2025.08)", "NCT07068958登録完了", "韓国2相計画 (2026上半期)", "Hanlim Pharmaライセンシング (RCI001/RCI001U)", "フランス動物医薬品会社共同開発 (RCI001AH)", "中間解析 2026 Q1"],
      details: ["0.25%点眼液製剤", "従来のステロイドより速い涙液分泌効果", "シェーグレン症候群モデル：1週間以内に涙液分泌量増加確認", "日本TRPV1基本特許登録完了", "ステロイド副作用（眼圧上昇、充血、灼熱感）を克服", "4週間以内に治療効果発現"],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RCI002",
      indication: "非オピオイド系慢性疼痛治療薬",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism: "TRPV1とMORを同時調節するMOR biasedデュアルターゲット非オピオイド系鎮痛薬 — CRPS希少疾患ODD準備中",
      status: "前臨床 / IND準備 (CRPS ODD準備)",
      progress: 40,
      color: "blue",
      milestones: ["前臨床有効性試験完了", "製剤研究 (江原大学 張東鎮博士)", "CRPS孤児薬指定(ODD)申請準備中", "SfN学会研究成果発表 (2025.11)", "Scale-up TIPS 12億ウォン支援 (2024)", "グローバルIND提出 2026 Q2", "Phase 1開始 2026下半期"],
      details: ["適応症：CRPS、変形性関節症、糖尿病性神経障害、CIPN、線維筋痛症", "MOR biased agonismで依存症/耐性リスクを最小化", "単回投与：変形性関節症モデルで2週間以上の疼痛軽減", "異常発熱副作用なし（第1世代TRPV1の問題を解決）", "既存治療薬の650分の1の濃度で効果", "FDA CRPS孤児薬指定(ODD)準備中"],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RCI003",
      indication: "乾癬治療薬",
      target: "乾癬ターゲットタンパク質選択的モジュレーター",
      mechanism: "AI創薬プラットフォーム基盤の乾癬ターゲットタンパク質選択的調節 — TRPV1イオンチャネル研究ノウハウ活用",
      status: "候補物質発掘",
      progress: 15,
      color: "violet",
      milestones: ["Syntekabio産学研Collabo R&D第2段階選定 (2026)", "Syntekabio産学研Collabo R&D選定 (2024)", "西江大学・仁済大学コンソーシアム共同研究", "AIプラットフォーム(STB)ターゲット分析", "候補化合物合成・最適化進行中", "In-vitro/In-vivo有効性評価予定"],
      details: ["Syntekabio AIプラットフォーム(STB)でターゲットタンパク質分析", "RudaCure TRPV1調節技術の専門性活用（皮膚疾患イオンチャネル）", "西江大学：化合物合成・最適化", "仁済大学：候補化合物有効性評価", "研究期間：2026.04 ~ 2028.03"],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
    {
      name: "RCI0165",
      indication: "動物用疼痛治療薬（遺伝子治療）",
      target: "TRPV1 Only Target (AAVベクター)",
      mechanism: "AAVベクターを用いたTRPV1標的遺伝子治療薬 — 1回投与で長期間の疼痛緩和",
      status: "前臨床 / PoC",
      progress: 20,
      color: "indigo",
      milestones: ["民間投資ベーススケールアップ支援事業選定 (2026.4)", "農食品ベンチャー育成事業選定 (2025)", "AAVベクターベースPoC完了", "単回投与3ヶ月以上の鎮痛効果確認", "コンパニオンアニマル・競走馬への適用目標"],
      details: ["AAV（アデノ随伴ウイルス）ベクター基盤遺伝子治療薬", "TRPV1イオンチャネル単一ターゲット", "1回投与で3ヶ月以上の持続的疼痛緩和", "コンパニオンアニマルおよび高価値動物（競走馬）の慢性疼痛管理", "グローバル動物用疼痛治療市場 年間約$2B規模"],
      detailsLabel: "主な特徴",
      milestonesLabel: "マイルストーン",
    },
  ],
  es: [
    {
      name: "RCI001",
      indication: "Enfermedad del Ojo Seco",
      target: "TRPV1-Rac1 Target",
      mechanism: "Modulación de señal downstream de TRPV1 inhibiendo inflamación Rac1/NLRP3 — promueve secreción lagrimal y curación corneal",
      status: "US FDA Fase 2 / Corea Fase 2",
      progress: 62,
      color: "emerald",
      milestones: ["FDA Fase 2 IND Aprobado (2025.08)", "NCT07068958 Registrado", "Corea Fase 2 Planificado (H1 2026)", "Licencia Hanlim Pharma (RCI001/RCI001U)", "Co-desarrollo Farmacéutica Veterinaria Francesa (RCI001AH)", "Análisis Intermedio Q1 2026"],
      details: ["Formulación de solución oftálmica 0.25%", "Secreción lagrimal más rápida vs esteroides tradicionales", "Modelo Sjögren: aumento de secreción lagrimal en 1 semana", "Patente japonesa registrada para tratamiento TRPV1", "Supera efectos secundarios de esteroides (PIO, enrojecimiento, ardor)", "Efectos terapéuticos en 4 semanas"],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RCI002",
      indication: "Dolor Crónico No Opioide",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism: "Analgésico no opioide de doble diana MOR biased modulando simultáneamente TRPV1 y MOR — preparando Designación de Medicamento Huérfano para CRPS",
      status: "Preclínico / Preparación IND (CRPS ODD)",
      progress: 40,
      color: "blue",
      milestones: ["Estudios de Eficacia Preclínica Completados", "Investigación de Formulación (Dr. Dongjin Jang, Univ. Gangwon)", "Designación de Medicamento Huérfano (ODD) para CRPS en Preparación", "Presentación en Conferencia SfN (2025.11)", "Scale-up TIPS KRW 1.2B (2024)", "Presentación IND Global Q2 2026", "Inicio Fase 1 H2 2026"],
      details: ["Indicaciones: CRPS, OA, neuropatía diabética, CIPN, fibromialgia", "Agonismo MOR biased minimiza riesgo de adicción/tolerancia", "Dosis única: reducción del dolor 2+ semanas en modelo OA", "Sin efecto secundario de fiebre anormal (resolvió problema TRPV1 1ª gen)", "Eficacia a concentración 650x menor vs tratamientos existentes", "Designación FDA ODD para CRPS en preparación"],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RCI003",
      indication: "Psoriasis",
      target: "Modulador Selectivo de Proteínas Diana de Psoriasis",
      mechanism: "Modulación selectiva de proteínas diana de psoriasis basada en plataforma AI — aprovechando experiencia en canales iónicos TRPV1",
      status: "Descubrimiento",
      progress: 15,
      color: "violet",
      milestones: ["Syntekabio Collabo R&D Fase 2 Seleccionado (2026)", "Syntekabio Collabo R&D Seleccionado (2024)", "Consorcio Univ. Sogang & Univ. Inje", "Análisis de Dianas con Plataforma AI (STB)", "Síntesis de Compuestos Candidatos en Progreso", "Evaluación de Eficacia In-vitro/In-vivo Planificada"],
      details: ["Plataforma AI Syntekabio (STB) para análisis de proteínas diana", "Experiencia TRPV1 de RudaCure aplicada a canales iónicos en enfermedades cutáneas", "Universidad Sogang: síntesis y optimización de compuestos", "Universidad Inje: evaluación de eficacia de compuestos candidatos", "Período de investigación: Abr 2026 – Mar 2028"],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
    {
      name: "RCI0165",
      indication: "Tratamiento del Dolor Veterinario (Terapia Génica)",
      target: "TRPV1 Only Target (Vector AAV)",
      mechanism: "Terapia génica dirigida a TRPV1 basada en vector AAV — administración única para alivio del dolor a largo plazo en animales",
      status: "Preclínico / PoC",
      progress: 20,
      color: "indigo",
      milestones: ["Programa de Escalamiento con Inversión Privada Seleccionado (2026.4)", "Programa de Emprendimiento Agro-Alimentario Seleccionado (2025)", "PoC Basado en Vector AAV Completado", "Efecto Analgésico 3+ Meses Confirmado con Dosis Única", "Objetivo: Animales de Compañía y Caballos de Carrera"],
      details: ["Terapia génica basada en vector AAV (virus adeno-asociado)", "Diana única de canal iónico TRPV1", "Administración única proporciona 3+ meses de alivio sostenido del dolor", "Para manejo del dolor crónico en animales de compañía y alto valor (caballos de carrera)", "Mercado global de tratamiento del dolor veterinario ~$2B anuales"],
      detailsLabel: "Características Clave",
      milestonesLabel: "Hitos",
    },
  ],
  fr: [
    {
      name: "RCI001",
      indication: "Sécheresse Oculaire",
      target: "TRPV1-Rac1 Target",
      mechanism: "Modulation du signal en aval de TRPV1 inhibant l'inflammation Rac1/NLRP3 — favorise la sécrétion lacrymale et la cicatrisation cornéenne",
      status: "US FDA Phase 2 / Corée Phase 2",
      progress: 62,
      color: "emerald",
      milestones: ["FDA Phase 2 IND Approuvé (2025.08)", "NCT07068958 Enregistré", "Corée Phase 2 Prévu (S1 2026)", "Licence Hanlim Pharma (RCI001/RCI001U)", "Co-développement Pharma Vétérinaire Français (RCI001AH)", "Analyse Intermédiaire Q1 2026"],
      details: ["Solution ophtalmique 0.25%", "Sécrétion lacrymale plus rapide vs stéroïdes traditionnels", "Modèle Sjögren : augmentation de la sécrétion lacrymale en 1 semaine", "Brevet japonais TRPV1 enregistré", "Surmonte les effets secondaires des stéroïdes (PIO, rougeur, brûlure)", "Effets thérapeutiques en 4 semaines"],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RCI002",
      indication: "Douleur Chronique Non Opioïde",
      target: "TRPV1-MOR Biased Dual Target",
      mechanism: "Analgésique non opioïde à double cible MOR biased modulant simultanément TRPV1 et MOR — préparation de la Désignation de Médicament Orphelin pour le CRPS",
      status: "Préclinique / Préparation IND (CRPS ODD)",
      progress: 40,
      color: "blue",
      milestones: ["Études d'Efficacité Précliniques Terminées", "Recherche de Formulation (Dr. Dongjin Jang, Univ. Gangwon)", "Désignation de Médicament Orphelin (ODD) pour CRPS en Préparation", "Présentation Conférence SfN (2025.11)", "Scale-up TIPS 1,2 Mrd KRW (2024)", "Dépôt IND Global Q2 2026", "Début Phase 1 S2 2026"],
      details: ["Indications : CRPS, arthrose, neuropathie diabétique, CIPN, fibromyalgie", "Agonisme MOR biased minimise le risque d'addiction/tolérance", "Dose unique : réduction de la douleur 2+ semaines dans le modèle arthrose", "Pas d'effet secondaire de fièvre anormale (problème TRPV1 1ère gén. résolu)", "Efficacité à concentration 650x inférieure vs traitements existants", "Désignation FDA ODD pour CRPS en préparation"],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RCI003",
      indication: "Psoriasis",
      target: "Modulateur Sélectif des Protéines Cibles du Psoriasis",
      mechanism: "Modulation sélective des protéines cibles du psoriasis basée sur plateforme IA — exploitant l'expertise TRPV1 en canaux ioniques",
      status: "Découverte",
      progress: 15,
      color: "violet",
      milestones: ["Syntekabio Collabo R&D Phase 2 Sélectionné (2026)", "Syntekabio Collabo R&D Sélectionné (2024)", "Consortium Univ. Sogang & Univ. Inje", "Analyse des Cibles avec Plateforme IA (STB)", "Synthèse de Composés Candidats en Cours", "Évaluation d'Efficacité In-vitro/In-vivo Prévue"],
      details: ["Plateforme IA Syntekabio (STB) pour analyse des protéines cibles", "Expertise TRPV1 de RudaCure appliquée aux canaux ioniques des maladies cutanées", "Université Sogang : synthèse et optimisation des composés", "Université Inje : évaluation d'efficacité des composés candidats", "Période de recherche : Avr 2026 – Mar 2028"],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
    {
      name: "RCI0165",
      indication: "Traitement Vétérinaire de la Douleur (Thérapie Génique)",
      target: "TRPV1 Only Target (Vecteur AAV)",
      mechanism: "Thérapie génique ciblant TRPV1 basée sur vecteur AAV — administration unique pour soulagement durable de la douleur chez les animaux",
      status: "Préclinique / PoC",
      progress: 20,
      color: "indigo",
      milestones: ["Programme de Scale-Up à Investissement Privé Sélectionné (2026.4)", "Programme d'Entrepreneuriat Agro-Alimentaire Sélectionné (2025)", "PoC Basé sur Vecteur AAV Terminé", "Effet Analgésique 3+ Mois Confirmé en Dose Unique", "Objectif : Animaux de Compagnie et Chevaux de Course"],
      details: ["Thérapie génique basée sur vecteur AAV (virus adéno-associé)", "Cible unique du canal ionique TRPV1", "Administration unique offrant 3+ mois de soulagement durable", "Pour la gestion de la douleur chronique chez les animaux de compagnie et de haute valeur (chevaux de course)", "Marché mondial du traitement vétérinaire de la douleur ~2 Mrd $ par an"],
      detailsLabel: "Caractéristiques Clés",
      milestonesLabel: "Jalons",
    },
  ],
};

const STAGES: Record<string, string[]> = {
  ko: ["후보물질 탐색", "비임상", "IND", "임상 1상", "임상 2상", "임상 3상", "허가"],
  en: ["Discovery", "Pre-clinical", "IND", "Phase 1", "Phase 2", "Phase 3", "Approval"],
  zh: ["候选发现", "临床前", "IND", "1期", "2期", "3期", "批准"],
  ja: ["候補発見", "前臨床", "IND", "第1相", "第2相", "第3相", "承認"],
  es: ["Descubrimiento", "Preclínico", "IND", "Fase 1", "Fase 2", "Fase 3", "Aprobación"],
  fr: ["Découverte", "Préclinique", "IND", "Phase 1", "Phase 2", "Phase 3", "Approbation"],
};

export default async function PipelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (["ko", "en", "zh", "ja", "es", "fr"].includes(loc) ? loc : "en") as string;
  const h = HEADER[locale] || HEADER.en;
  const pipeline = PIPELINE[locale] || PIPELINE.en;
  const stages = STAGES[locale] || STAGES.en;

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
          <div className="liquid-glass p-6 overflow-x-auto">
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
