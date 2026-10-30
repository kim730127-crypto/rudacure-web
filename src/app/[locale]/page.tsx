import { AnswersIntro } from "@/components/answers-intro";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { type Locale, getTranslations, toDataLocale } from "@/lib/i18n";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StageRail } from "@/components/stage-rail";
import { Trpv1Hero } from "@/components/trpv1-hero";
import { PartnerLogo } from "@/components/partner-logo";
import { PlatformRadial } from "@/components/platform-radial";
import { HeroJourney } from "@/components/hero-journey";
import { RecruitPopup } from "@/components/recruit-popup";
import newsKo from "@/data/news.json";
import newsEn from "@/data/news_en.json";
import newsZh from "@/data/news_zh.json";
import newsJa from "@/data/news_ja.json";
import newsEs from "@/data/news_es.json";
import newsFr from "@/data/news_fr.json";
import newsAr from "@/data/news_ar.json";

const PIPELINE = {
  ko: [
    {
      id: "RCI001",
      name: "RCI001",
      indication: "Dry Eye Disease",
      target: "TRPV1-Rac1",
      status: "미국 FDA·국내 임상 2상 IND 승인",
      progress: 75,
      color: "teal" as const,
      milestone: "국내 임상 2상 IND 승인 · 2026.09.22",
      description:
        "TRPV1 하부 시그널 조절을 통한 Rac1 타깃 항염증/항산화 기전. 빠른 눈물 분비 촉진과 각막 손상 회복으로 기존 스테로이드 한계를 극복.",
    },
    {
      id: "RCI001AH",
      name: "RCI001AH",
      indication: "Veterinary Dry Eye",
      target: "TRPV1-Rac1 하부 신호 조절제",
      status: "PoC 완료 / 동물용 임상 준비",
      progress: 45,
      color: "emerald" as const,
      milestone: "2030년 시장 진입 목표",
      description:
        "RCI001과 동일한 TRPV1-Rac1/NLRP3 하부 신호 조절 기전. 반려동물(개·고양이) 건성각결막염을 표적하며 다국적 동물의약품 회사와 공동개발 중.",
    },
    {
      id: "RCI002",
      name: "RCI002",
      indication: "Chronic Pain",
      target: "MOR 작용제 · 관절강 국소 투여",
      status: "Pre-clinical / IND",
      progress: 40,
      color: "blue" as const,
      milestone: "Tox Study 3Q 2026",
      description:
        "관절강에 국소 투여하는 고역가 MOR 작용제. 전신 노출을 최소화하면서 단회 투여로 장기 지속 통증 완화.",
    },
    {
      id: "RCI003",
      name: "RCI003",
      indication: "Psoriasis",
      target: "건선 표적 단백질 선택적 조절제",
      status: "후보물질 발굴",
      progress: 15,
      color: "violet" as const,
      milestone: "Collabo R&D 2단계 2026",
      description:
        "AI 신약 플랫폼 기반 건선 표적 단백질 선택적 조절. TRPV1 이온채널 연구 노하우를 피부질환에 적용, 서강대·인제대 컨소시엄 공동연구.",
    },
  ],
  en: [
    {
      id: "RCI001",
      name: "RCI001",
      indication: "Dry Eye Disease",
      target: "TRPV1-Rac1",
      status: "US FDA / Korea Phase 2 IND approved",
      progress: 75,
      color: "teal" as const,
      milestone: "Korea Phase 2 IND approved · 2026.09.22",
      description:
        "Anti-inflammatory/antioxidant mechanism targeting Rac1 via TRPV1 downstream signal modulation. Overcomes steroid limitations with rapid tear secretion and corneal wound healing.",
    },
    {
      id: "RCI001AH",
      name: "RCI001AH",
      indication: "Veterinary Dry Eye",
      target: "TRPV1-Rac1 Downstream Modulator",
      status: "PoC Complete / Preparing Trials",
      progress: 45,
      color: "emerald" as const,
      milestone: "Targeting 2030 market entry",
      description:
        "Same TRPV1-Rac1/NLRP3 downstream mechanism as RCI001. Targets keratoconjunctivitis sicca in companion animals, in co-development with a multinational veterinary pharma.",
    },
    {
      id: "RCI002",
      name: "RCI002",
      indication: "Chronic Pain",
      target: "MOR Agonist · Intra-articular",
      status: "Pre-clinical / IND",
      progress: 40,
      color: "blue" as const,
      milestone: "Tox Study 3Q 2026",
      description:
        "High-potency MOR agonist delivered by intra-articular injection. Long-lasting relief from a single dose with minimized systemic exposure.",
    },
    {
      id: "RCI003",
      name: "RCI003",
      indication: "Psoriasis",
      target: "Psoriasis Target Modulator",
      status: "Discovery",
      progress: 15,
      color: "violet" as const,
      milestone: "Collabo R&D Phase 2 2026",
      description:
        "AI platform-based selective modulation of psoriasis target proteins, applying TRPV1 ion channel expertise to skin disease. Sogang and Inje University consortium.",
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
      name: "다국적 동물의약품 회사",
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
    {
      name: "케이메디허브",
      role: "RCI002 주사제형 생산",
      logo: "/images/partners/kmedihub.png",
      initials: "KMH",
      color: "slate",
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
      name: "Multinational Veterinary Pharma",
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
    {
      name: "K-MEDI hub",
      role: "RCI002 Injectable Manufacturing",
      logo: "/images/partners/kmedihub.png",
      initials: "KMH",
      color: "slate",
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
      name: "Multinational Veterinary Pharma",
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
    {
      name: "K-MEDI hub",
      role: "RCI002 注射剂生产",
      logo: "/images/partners/kmedihub.png",
      initials: "KMH",
      color: "slate",
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
      name: "Multinational Veterinary Pharma",
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
    {
      name: "K-MEDI hub",
      role: "RCI002 注射剤製造",
      logo: "/images/partners/kmedihub.png",
      initials: "KMH",
      color: "slate",
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
      name: "Multinational Veterinary Pharma",
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
    {
      name: "K-MEDI hub",
      role: "Fabricación del inyectable RCI002",
      logo: "/images/partners/kmedihub.png",
      initials: "KMH",
      color: "slate",
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
      name: "Multinational Veterinary Pharma",
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
    {
      name: "K-MEDI hub",
      role: "Fabrication de la forme injectable RCI002",
      logo: "/images/partners/kmedihub.png",
      initials: "KMH",
      color: "slate",
    },
  ],
};

/* RCI001 국내 임상 2상 실시기관. 식약처 의약품안전나라 임상시험정보(의뢰자
   루다큐어, 승인일 2026-09-22)의 실시기관 6곳과 대조했다. 로고는 각 병원
   공식 홈페이지 헤더 이미지다. PI 이름은 공개 페이지에 올리지 않는다. */
type Site = { name: string; initials: string; logo: string; w: number; h: number };
const SITE_LOGOS = {
  kbsmc: { logo: "/images/partners/kbsmc.png", w: 344, h: 50 },
  yish: { logo: "/images/partners/yish.png", w: 588, h: 80 },
  snubh: { logo: "/images/partners/snubh.png", w: 288, h: 27 },
  kugh: { logo: "/images/partners/kugh.svg", w: 307, h: 138 },
  cnuh: { logo: "/images/partners/cnuh.jpg", w: 198, h: 42 },
  schmc: { logo: "/images/partners/schmc.png", w: 220, h: 36 },
};
const CLINICAL_SITES: Record<"ko" | "en", Site[]> = {
  ko: [
    { name: "강북삼성병원", initials: "KBSMC", ...SITE_LOGOS.kbsmc },
    { name: "용인세브란스병원", initials: "YISH", ...SITE_LOGOS.yish },
    { name: "분당서울대학교병원", initials: "SNUBH", ...SITE_LOGOS.snubh },
    { name: "고려대학교 구로병원", initials: "KUGH", ...SITE_LOGOS.kugh },
    { name: "전남대학교병원", initials: "CNUH", ...SITE_LOGOS.cnuh },
    { name: "순천향대학교 서울병원", initials: "SCHMC", ...SITE_LOGOS.schmc },
  ],
  en: [
    { name: "Kangbuk Samsung Hospital", initials: "KBSMC", ...SITE_LOGOS.kbsmc },
    { name: "Yongin Severance Hospital", initials: "YISH", ...SITE_LOGOS.yish },
    { name: "Seoul National University Bundang Hospital", initials: "SNUBH", ...SITE_LOGOS.snubh },
    { name: "Korea University Guro Hospital", initials: "KUGH", ...SITE_LOGOS.kugh },
    { name: "Chonnam National University Hospital", initials: "CNUH", ...SITE_LOGOS.cnuh },
    { name: "Soonchunhyang University Seoul Hospital", initials: "SCHMC", ...SITE_LOGOS.schmc },
  ],
};

/* ─── Design pilot "Lab Index" (2026-09) ───────────────────────────────────
   Structure borrowed from two CC0 prompt specs in the Superdesign library
   (superdesigndev/superdesign-prompts, LICENSE-DATA = CC0 1.0):
     - swiss-grid-agency-layout  : index meta row over a 2px accent rule,
       strict 12-column grid, mono micro-labels, numbered index lists,
       hairline-gap card grid.
     - laboratory-skincare       : paper/ink palette, 1px hairline grid,
       no shadows or rounded corners, annotation label on the figure.
   Adapted to the RudaCure tokens: the brand teal replaces cobalt as the one
   accent, Pretendard stays the only face (no new font licences), and Hangul
   gets its own tracking/leading instead of the Latin -0.04em / 0.84 values.
   Every number on this page comes from the data arrays above or from an
   existing i18n string. Nothing new is claimed. */

/* Micro-labels that did not exist before. ko and en only; the other locales
   fall back to English, which is also how the pipeline data behaves. */
/* Hero scroll-journey captions. They describe only what is drawn: the public
   cryo-EM structure of human TRPV1 (RCSB PDB 8GFA, CC0) in its lipid belt
   with the reference antagonist SB-366791 bound. No RudaCure compound, MoA
   or result is implied. The third card restates the RuCIA sentence already
   in hero.description. */
const JOURNEY: Record<
  string,
  { cards: { title: string; body: string }[]; source: string; hint: string }
> = {
  ko: {
    cards: [
      { title: "지질막 속의 이온채널", body: "인간 TRPV1 채널의 cryo-EM 구조입니다. 청록색 띠가 채널을 감싼 세포막, 곧 지질 이중층입니다." },
      { title: "리간드가 앉는 자리", body: "밝게 빛나는 점은 결합 부위에 놓인 저분자 화합물(SB-366791)입니다. 막단백질 신약개발은 이런 자리를 원자 단위로 다룹니다." },
      { title: "RuCIA", body: "루다큐어는 RuCIA 플랫폼으로 이온채널과 수용체의 선택성을 예측해 후보물질을 고릅니다." },
    ],
    source: "구조: 인간 TRPV1, RCSB PDB 8GFA (CC0). 화면의 리간드는 공개 구조의 참고 길항제입니다.",
    hint: "스크롤해서 구조 살펴보기",
  },
  en: {
    cards: [
      { title: "An ion channel in its membrane", body: "The cryo-EM structure of human TRPV1. The teal band around it is the cell membrane, the lipid bilayer." },
      { title: "Where a ligand sits", body: "The bright points are a small molecule (SB-366791) in the binding site. Membrane-target drug discovery works on sites like this atom by atom." },
      { title: "RuCIA", body: "RudaCure uses the RuCIA platform to predict ion channel and receptor selectivity when choosing candidates." },
    ],
    source: "Structure: human TRPV1, RCSB PDB 8GFA (CC0). The ligand shown is the reference antagonist in that public structure.",
    hint: "Scroll to explore the structure",
  },
  zh: {
    cards: [
      { title: "脂膜中的离子通道", body: "人源 TRPV1 通道的冷冻电镜结构。环绕通道的青色带是细胞膜，即脂质双分子层。" },
      { title: "配体结合的位置", body: "发亮的点是位于结合位点的小分子化合物（SB-366791）。膜蛋白新药研发正是在原子层面处理这样的位点。" },
      { title: "RuCIA", body: "RudaCure 利用 RuCIA 平台预测离子通道和受体的选择性，以此筛选候选物质。" },
    ],
    source: "结构：人源 TRPV1，RCSB PDB 8GFA（CC0）。图中配体为该公开结构中的参考拮抗剂。",
    hint: "滚动查看结构",
  },
  ja: {
    cards: [
      { title: "脂質膜の中のイオンチャネル", body: "ヒト TRPV1 チャネルのクライオ電顕構造です。チャネルを取り巻く青緑の帯が細胞膜、つまり脂質二重層です。" },
      { title: "リガンドが収まる場所", body: "明るく光る点は結合部位にある低分子化合物（SB-366791）です。膜タンパク質創薬はこうした部位を原子レベルで扱います。" },
      { title: "RuCIA", body: "RudaCure は RuCIA プラットフォームでイオンチャネルと受容体の選択性を予測し、候補物質を選びます。" },
    ],
    source: "構造：ヒト TRPV1、RCSB PDB 8GFA（CC0）。表示されているリガンドは公開構造中の参照アンタゴニストです。",
    hint: "スクロールして構造を見る",
  },
  es: {
    cards: [
      { title: "Un canal iónico en su membrana", body: "Estructura de crio-EM del TRPV1 humano. La banda verde azulada que lo rodea es la membrana celular, la bicapa lipídica." },
      { title: "Donde se aloja un ligando", body: "Los puntos brillantes son una molécula pequeña (SB-366791) en el sitio de unión. El descubrimiento de fármacos contra dianas de membrana trabaja estos sitios átomo a átomo." },
      { title: "RuCIA", body: "RudaCure usa la plataforma RuCIA para predecir la selectividad de canales iónicos y receptores al elegir candidatos." },
    ],
    source: "Estructura: TRPV1 humano, RCSB PDB 8GFA (CC0). El ligando mostrado es el antagonista de referencia de esa estructura pública.",
    hint: "Desplácese para explorar la estructura",
  },
  fr: {
    cards: [
      { title: "Un canal ionique dans sa membrane", body: "Structure cryo-EM du TRPV1 humain. La bande bleu-vert qui l'entoure est la membrane cellulaire, la bicouche lipidique." },
      { title: "Là où se loge un ligand", body: "Les points lumineux sont une petite molécule (SB-366791) dans le site de liaison. La découverte de médicaments sur cibles membranaires travaille ces sites atome par atome." },
      { title: "RuCIA", body: "RudaCure utilise la plateforme RuCIA pour prédire la sélectivité des canaux ioniques et des récepteurs lors du choix des candidats." },
    ],
    source: "Structure : TRPV1 humain, RCSB PDB 8GFA (CC0). Le ligand affiché est l'antagoniste de référence de cette structure publique.",
    hint: "Faites défiler pour explorer la structure",
  },
  ar: {
    cards: [
      { title: "قناة أيونية داخل غشائها", body: "بنية المجهر الإلكتروني بالتبريد لقناة TRPV1 البشرية. الشريط الأخضر المزرق المحيط بها هو غشاء الخلية، أي الطبقة الدهنية المزدوجة." },
      { title: "حيث يستقر الربيط", body: "النقاط المضيئة جزيء صغير (SB-366791) في موقع الارتباط. يتعامل اكتشاف الأدوية المستهدفة لبروتينات الغشاء مع مثل هذه المواقع على مستوى الذرة." },
      { title: "RuCIA", body: "تستخدم RudaCure منصة RuCIA للتنبؤ بانتقائية القنوات الأيونية والمستقبلات عند اختيار المرشحين." },
    ],
    source: "البنية: TRPV1 البشري، RCSB PDB 8GFA (CC0). الربيط المعروض هو المضاد المرجعي في تلك البنية العامة.",
    hint: "مرّر لاستكشاف البنية",
  },
};

const LAB_LABELS = {
  ko: {
    assets: "파이프라인 에셋",
    lead: "RCI001 임상 단계",
    leadValue: "Phase 2",
    partners: "협력 기관",
    areas: "치료 영역 (안과·통증·피부)",
    sitesTag: "Clinical Sites",
    sitesTitle: "RCI001 국내 임상 2상 실시기관",
    sitesRole: "RCI001 국내 임상 2상",
    colAsset: "Asset",
    colIndication: "Indication",
    colTarget: "Target / Modality",
    colStage: "Stage",
    colMilestone: "Milestone",
    figure: "RuCIA 분자동역학 시뮬레이션",
    radialCenter: "막단백질 표적 플랫폼",
    radialFigure: "RuCIA 플랫폼과 파이프라인 에셋",
  },
  en: {
    assets: "Pipeline assets",
    lead: "RCI001 clinical stage",
    leadValue: "Phase 2",
    partners: "Partner organisations",
    areas: "Therapeutic areas (eye, pain, skin)",
    sitesTag: "Clinical Sites",
    sitesTitle: "RCI001 Korea Phase 2 investigational sites",
    sitesRole: "RCI001 Korea Phase 2",
    colAsset: "Asset",
    colIndication: "Indication",
    colTarget: "Target / Modality",
    colStage: "Stage",
    colMilestone: "Milestone",
    figure: "RuCIA molecular dynamics",
    radialCenter: "Membrane-target platform",
    radialFigure: "RuCIA platform and pipeline assets",
  },
};

/* Disciplines for the marquee. Each term is already claimed elsewhere on the
   site (Science, Pipeline, CRO pages); none is new. */
const DISCIPLINES = [
  "Membrane Protein",
  "Ion Channel",
  "GPCR",
  "TRPV1",
  "Molecular Dynamics",
  "Electrophysiology",
  "Ophthalmology",
  "Pain",
  "Dermatology",
  "Veterinary",
];

function ArrowOut({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`rtl:-scale-x-100 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <path strokeLinecap="square" d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/* Hero headline words. Splitting on spaces keeps each Korean eojeol whole;
   CJK titles without spaces animate as one unit per line. */
function wordCount(text: string) {
  return text.split(" ").filter(Boolean).length;
}
function heroWords(text: string, start: number) {
  const words = text.split(" ").filter(Boolean);
  return words.map((w, i) => (
    <span key={`${w}-${i}`}>
      <span className="hero-word" style={{ animationDelay: `${(start + i * 0.08).toFixed(2)}s` }}>
        {w}
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}

function SectionHead({
  no,
  total,
  tag,
  title,
  link,
}: {
  no: number;
  total: number;
  tag: string;
  title: ReactNode;
  link?: { href: string; label: string };
}) {
  return (
    <div className="lab-sechead">
      <div className="lab-grid items-end pb-3">
        <span className="lab-label col-span-6 md:col-span-3">
          No. {String(no).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="lab-label lab-label-i18n lab-muted col-span-6 text-end md:col-span-9">
          {tag}
        </span>
      </div>
      <div className="lab-rule-accent" />
      <div className="lab-grid items-end pt-8 pb-10 md:pt-10 md:pb-12">
        <h2 className="lab-h2 col-span-12 md:col-span-9">{title}</h2>
        {link && (
          <Link
            href={link.href}
            className="lab-link col-span-12 mt-5 md:col-span-3 md:mt-0 md:justify-self-end"
          >
            {link.label}
            <ArrowOut className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

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
  const L = LAB_LABELS[loc];
  const sites = CLINICAL_SITES[loc];
  const news = (
    {
      ko: newsKo,
      en: newsEn,
      zh: newsZh,
      ja: newsJa,
      es: newsEs,
      fr: newsFr,
      ar: newsAr,
    }[locale] ?? newsEn
  ).slice(0, 5) as {
    id: number;
    title: string;
    date: string;
    category: string;
    content: string;
  }[];

  /* News feature: the newest of the five items that carries a photo in its
     article body. Certificates and posters are skipped because they crop
     badly as a cover; the item then leaves the list so it is shown once. */
  const photoOf = (html: string) => {
    const m = html.match(/<img[^>]+src="([^"]+)"/);
    if (!m) return null;
    const src = m[1];
    if (!src.startsWith("/images/") || /cert|poster/i.test(src)) return null;
    return src;
  };
  const featureIdx = news.findIndex((a) => photoOf(a.content));
  const feature = featureIdx >= 0 ? { ...news[featureIdx], photo: photoOf(news[featureIdx].content)! } : null;
  const newsRows = feature ? news.filter((_, i) => i !== featureIdx) : news;

  const CAPABILITIES = [
    { title: t("rucia.metric.time"), sub: t("rucia.metric.time.sub") },
    {
      title: t("rucia.metric.selectivity"),
      sub: t("rucia.metric.selectivity.sub"),
    },
  ];
  const MARKET_STAT = {
    value: t("rucia.metric.market"),
    sub: t("rucia.metric.market.sub"),
  };

  /* Hero stat block: counts are derived from the arrays on this page and
     the stage from the RCI001 record. The $94B chronic-pain market figure is
     deliberately kept out of the hero: the company is positioned as a
     membrane-protein platform, not a pain company, and the first number a
     visitor reads should not pull it back. It stays in section 02. The
     three areas are ophthalmology (RCI001, RCI001AH), pain (RCI002) and
     dermatology (RCI003). */
  const HERO_STATS = [
    { value: String(pipeline.length), label: L.assets },
    { value: L.leadValue, label: L.lead },
    { value: "3", label: L.areas },
    { value: String(partners.length + sites.length), label: L.partners },
  ];

  const TOTAL = 5;

  return (
    <div className="lab">
      {locale === "ko" && <RecruitPopup />}

      {/* ===== Hero ===== The TRPV1 point cloud stays: it is the one visual
          asset built from real coordinates. What changes is the type system
          laid over it. */}
      <HeroJourney
        cards={(JOURNEY[locale] ?? JOURNEY.en).cards}
        source={(JOURNEY[locale] ?? JOURNEY.en).source}
        hint={(JOURNEY[locale] ?? JOURNEY.en).hint}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,#122c31_0%,#0b1419_42%,#070a0e_100%)]" />
        <Trpv1Hero />

        <div className="lab-container hero-exit relative z-10 w-full pt-36 pb-16 md:pb-20">
          <div className="lab-grid items-end pb-3 animate-hero-blur-in">
            <span className="lab-label col-span-6 text-white/80 md:col-span-3">
              No. 01 / {String(TOTAL).padStart(2, "0")}
            </span>
            <span className="lab-label lab-label-i18n col-span-6 text-end text-white/55 md:col-span-9">
              {t("hero.tagline")}
            </span>
          </div>
          <div className="lab-rule-accent lab-rule-draw" />
          <div className="lab-grid pt-3">
            <span className="lab-label col-span-12 text-white/50 md:col-span-8">
              {pipeline.map((p) => p.id).join(" · ")}
            </span>
          </div>

          {/* Words rise one after another (ref. MotionSites "Cognitra"). The
              text stays a single h1; spaces remain real text nodes so Korean
              keep-all wrapping is unchanged. */}
          <h1 className="lab-display mt-10 max-w-[15ch] md:mt-14">
            {heroWords(t("hero.title1"), 0.12)}
            <br />
            <span className="text-teal-300">
              {heroWords(t("hero.title2"), 0.12 + 0.08 * wordCount(t("hero.title1")))}
            </span>
          </h1>

          <div
            className="hero-body lab-grid animate-hero-blur-in mt-10 gap-y-10 md:mt-14"
            style={{ animationDelay: "0.24s" }}
          >
            <div className="col-span-12 md:col-span-6">
              <p className="measure text-[1.0625rem] leading-[1.75] text-slate-300/90">
                {t("hero.description")}
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link href={`/${locale}/pipeline`} className="lab-btn lab-btn-accent">
                  {t("hero.cta.pipeline")}
                  <ArrowOut className="h-4 w-4" />
                </Link>
                <Link href={`/${locale}/science`} className="lab-btn lab-btn-ghost">
                  {t("hero.cta.science")}
                </Link>
              </div>
            </div>
            <dl className="col-span-12 grid grid-cols-2 border-t border-white/15 md:col-span-5 md:col-start-8 md:self-end">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`border-b border-white/15 py-5 ${i % 2 === 0 ? "pe-4 border-e" : "ps-5"}`}
                >
                  <dt className="num text-[2rem] font-semibold leading-none tracking-[-0.03em] text-white md:text-[2.5rem]">
                    {/^\d+$/.test(s.value) ? (
                      <>
                        <span className="sr-only">{s.value}</span>
                        <span
                          aria-hidden="true"
                          className="count-up"
                          style={{ ["--to" as string]: s.value, ["--count-delay" as string]: `${0.45 + i * 0.1}s` }}
                        />
                      </>
                    ) : (
                      s.value
                    )}
                  </dt>
                  <dd className="lab-label lab-label-i18n mt-3 text-white/55 normal-case tracking-[0.02em]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </HeroJourney>

      {/* ===== Discipline strip ===== */}
      <div className="lab-marquee" aria-hidden="true">
        <div className="lab-marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="flex shrink-0 items-center gap-10 py-3.5 pe-10">
              {DISCIPLINES.map((d, i) => (
                <span
                  key={d}
                  className={`lab-label ${i % 2 ? "text-[var(--rc-accent)]" : ""}`}
                >
                  {d}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnswersIntro locale={locale as Locale} />

      {/* ===== 02 Core technology ===== */}
      <section className="lab-section">
        <div className="lab-container">
          <ScrollReveal>
            <SectionHead
              no={2}
              total={TOTAL}
              tag={t("rucia.tag")}
              title={
                <>
                  {t("rucia.title1")} <em>{t("rucia.title2")}</em>
                </>
              }
              link={{ href: `/${locale}/science`, label: t("hero.cta.science") }}
            />
          </ScrollReveal>

          <div className="lab-grid gap-y-12">
            <ScrollReveal className="col-span-12 md:col-span-5">
              <p className="type-body measure">{t("rucia.description")}</p>
              <dl className="mt-10 border-t border-[var(--lab-ink)]">
                {CAPABILITIES.map((c) => (
                  <div key={c.title} className="lab-spec-row">
                    <dt className="text-[0.9375rem] font-semibold text-[var(--lab-ink)]">
                      {c.title}
                    </dt>
                    <dd className="type-caption text-end">{c.sub}</dd>
                  </div>
                ))}
                <div className="lab-spec-row">
                  <dt className="num text-[1.5rem] font-semibold leading-none tracking-[-0.02em] text-[var(--rc-accent-deep)]">
                    {MARKET_STAT.value}
                  </dt>
                  <dd className="type-caption text-end">{MARKET_STAT.sub}</dd>
                </div>
              </dl>
            </ScrollReveal>

            <ScrollReveal className="col-span-12 md:col-span-6 md:col-start-7" delay={120}>
              <figure className="lab-figure">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/science/membrane-md.jpg"
                    alt="Molecular dynamics simulation of a membrane protein embedded in an explicit lipid bilayer, produced on the RuCIA platform"
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-contain mix-blend-multiply"
                  />
                  <div className="lab-annot">
                    <span>SYSTEM: MEMBRANE PROTEIN</span>
                    <span>ENV: EXPLICIT LIPID BILAYER</span>
                  </div>
                </div>
                <figcaption className="lab-label lab-label-i18n lab-muted flex justify-between border-t border-[var(--lab-line)] px-4 py-3 normal-case tracking-[0.02em]">
                  <span>Fig. 01</span>
                  <span>{L.figure}</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>

          {/* Fig. 02: platform-to-asset map. Spokes are the four pipeline
              records rendered in section 03; stage text is their status. */}
          <figure className="lab-figure mt-14 md:mt-20">
            <div className="px-5 py-8 md:px-10 md:py-6">
              <PlatformRadial
                items={pipeline.map((p) => ({
                  id: p.id,
                  indication: p.indication,
                  status: p.status,
                  href: `/${locale}/pipeline#${p.id}`,
                }))}
                centerTitle="RuCIA"
                centerCaption={L.radialCenter}
                label={L.radialFigure}
              />
            </div>
            <figcaption className="lab-label lab-label-i18n lab-muted flex justify-between border-t border-[var(--lab-line)] px-4 py-3 normal-case tracking-[0.02em]">
              <span>Fig. 02</span>
              <span>{L.radialFigure}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ===== 03 Pipeline index ===== */}
      <section className="lab-section lab-section-paper">
        <div className="lab-container">
          <ScrollReveal>
            <SectionHead
              no={3}
              total={TOTAL}
              tag={t("pipeline.tag")}
              title={
                <>
                  {t("pipeline.title1")} <em>{t("pipeline.title2")}</em>
                </>
              }
              link={{
                href: `/${locale}/pipeline`,
                label: stripArrow(t("pipeline.view_news")),
              }}
            />
          </ScrollReveal>

          <div className="border-t border-[var(--lab-ink)]">
            <div className="lab-grid lab-label lab-muted hidden border-b border-[var(--lab-line)] py-3 md:grid">
              <span className="col-span-1">№</span>
              <span className="col-span-2">{L.colAsset}</span>
              <span className="col-span-3">{L.colIndication}</span>
              <span className="col-span-3">{L.colStage}</span>
              <span className="col-span-2">{L.colMilestone}</span>
              <span className="col-span-1 text-end">↗</span>
            </div>
            {pipeline.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <Link href={`/${locale}/pipeline`} className="lab-row lab-grid group items-start py-7">
                  <span className="lab-label col-span-2 pt-1.5 text-[var(--rc-accent)] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="num col-span-10 text-[1.625rem] font-semibold leading-none tracking-[-0.02em] text-[var(--lab-ink)] transition-colors duration-200 group-hover:text-[var(--rc-accent-deep)] md:col-span-2 md:text-[1.75rem]">
                    {p.id}
                  </span>
                  <span className="col-span-12 mt-3 md:col-span-3 md:mt-0">
                    <span className="block text-[1.0625rem] font-semibold text-[var(--lab-ink)]">
                      {p.indication}
                    </span>
                    <span className="lab-label lab-label-i18n lab-muted mt-2 block normal-case tracking-[0.02em]">
                      {p.target}
                    </span>
                  </span>
                  <span className="col-span-12 mt-4 md:col-span-3 md:mt-0">
                    <span className="block text-[0.875rem] text-[var(--rc-ink-700)]">
                      {p.status}
                    </span>
                    <StageRail asset={p.id} showLabels={false} className="mt-3" />
                  </span>
                  <span className="lab-label lab-label-i18n col-span-10 mt-4 normal-case tracking-[0.02em] text-[var(--rc-ink-600)] md:col-span-2 md:mt-0">
                    {p.milestone}
                  </span>
                  <span className="col-span-2 mt-4 flex justify-end md:col-span-1 md:mt-0">
                    <ArrowOut className="lab-row-arrow h-6 w-6 text-[var(--rc-accent)]" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 04 Partners: hairline-gap grid ===== */}
      <section className="lab-section">
        <div className="lab-container">
          <ScrollReveal>
            <SectionHead
              no={4}
              total={TOTAL}
              tag={t("home.partners.tag")}
              title={
                <>
                  {t("home.partners.title1")}
                  <em>{t("home.partners.title2")}</em>
                </>
              }
            />
          </ScrollReveal>
          {/* 8 partners -> 4 columns, 6 clinical sites -> 3 columns: both
              fill their rows exactly, so the hairline-gap grid never shows
              an empty grey cell. */}
          <div className="lab-cells grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <div key={p.name} className="partner-card lab-cell">
                <span className="lab-label lab-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-6 flex items-center gap-4">
                  <PartnerLogo src={p.logo} alt={p.name} initials={p.initials} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.9375rem] font-semibold leading-tight text-[var(--lab-ink)]">
                      {p.name}
                    </div>
                    <div className="type-caption mt-1">{p.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-20">
            <div className="lab-grid items-end pb-3">
              <span className="lab-label col-span-6 text-[var(--rc-accent)] md:col-span-3">
                {L.sitesTag}
              </span>
              <span className="lab-label lab-label-i18n lab-muted col-span-6 text-end md:col-span-9">
                {sites.length} sites
              </span>
            </div>
            <div className="border-t border-[var(--lab-ink)]" />
            <h3 className="pt-6 pb-8 text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--lab-ink)]">
              {L.sitesTitle}
            </h3>
            <div className="lab-cells grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sites.map((c, i) => (
                <div key={c.name} className="lab-cell lab-site-cell">
                  <span className="lab-label lab-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Hospital marks are long wordmarks (up to 10:1), so they
                      get a full-width slot above the name instead of the
                      96px partner slot, where they would be unreadable. */}
                  <div className="lab-site-logo mt-5">
                    <Image
                      src={c.logo}
                      alt={c.name}
                      width={c.w}
                      height={c.h}
                      unoptimized
                    />
                  </div>
                  <div className="mt-5 text-[0.9375rem] font-semibold leading-tight text-[var(--lab-ink)]">
                    {c.name}
                  </div>
                  <div className="type-caption mt-1">{L.sitesRole}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 News index ===== */}
      <section className="lab-section lab-section-paper">
        <div className="lab-container">
          <ScrollReveal>
            <SectionHead
              no={5}
              total={TOTAL}
              tag={t("home.news.tag")}
              title={
                <>
                  {t("home.news.title1")}
                  <em>{t("home.news.title2")}</em>
                </>
              }
              link={{
                href: `/${locale}/news`,
                label: stripArrow(t("home.news.viewAll")),
              }}
            />
          </ScrollReveal>
          <div className={feature ? "lab-grid gap-y-8 md:items-start" : ""}>
          {feature && (
            <ScrollReveal className="col-span-12 md:col-span-5">
              <Link
                href={`/${locale}/news/${feature.id}`}
                className="news-feature group block border-t border-[var(--lab-ink)] pt-5"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--lab-line)]">
                  <Image
                    src={feature.photo}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 440px, 100vw"
                    className="news-feature-img object-cover object-top"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="lab-label num text-[var(--rc-ink-600)]">{feature.date}</span>
                  <span className="lab-label text-[var(--rc-accent)]">{feature.category}</span>
                </div>
                <h3 className="mt-3 text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-[var(--lab-ink)] transition-colors duration-200 group-hover:text-[var(--rc-accent-deep)]">
                  {feature.title}
                </h3>
              </Link>
            </ScrollReveal>
          )}
          <div className={`border-t border-[var(--lab-ink)] ${feature ? "col-span-12 md:col-span-7" : ""}`}>
            {newsRows.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 50}>
                {feature ? (
                  /* Beside the photo card the column is narrow, so the title
                     gets its own line and wraps instead of truncating. */
                  <Link href={`/${locale}/news/${a.id}`} className="lab-row group block py-5">
                    <span className="flex items-center gap-6">
                      <span className="lab-label num text-[var(--rc-ink-600)]">{a.date}</span>
                      <span className="lab-label text-[var(--rc-accent)]">{a.category}</span>
                      <ArrowOut className="lab-row-arrow ms-auto h-5 w-5 text-[var(--rc-accent)]" />
                    </span>
                    <h3 className="mt-2.5 line-clamp-2 text-[1rem] font-medium leading-snug text-[var(--lab-ink)] transition-colors duration-200 group-hover:text-[var(--rc-accent-deep)]">
                      {a.title}
                    </h3>
                  </Link>
                ) : (
                <Link href={`/${locale}/news/${a.id}`} className="lab-row lab-grid group items-center py-5">
                  <span className="lab-label num col-span-6 text-[var(--rc-ink-600)] md:col-span-2">
                    {a.date}
                  </span>
                  <span className="lab-label col-span-6 text-end text-[var(--rc-accent)] md:col-span-2 md:text-start">
                    {a.category}
                  </span>
                  <h3 className="col-span-11 mt-2 min-w-0 text-[1rem] font-medium leading-snug text-[var(--lab-ink)] transition-colors duration-200 group-hover:text-[var(--rc-accent-deep)] md:col-span-7 md:mt-0 md:truncate">
                    {a.title}
                  </h3>
                  <span className="col-span-1 flex justify-end">
                    <ArrowOut className="lab-row-arrow h-5 w-5 text-[var(--rc-accent)]" />
                  </span>
                </Link>
                )}
              </ScrollReveal>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ===== Contact line ===== */}
      <section className="lab-section">
        <div className="lab-container">
          <div className="lab-rule-accent" />
          <div className="lab-grid items-end gap-y-8 pt-10 md:pt-14">
            <h2 className="lab-contact col-span-12 md:col-span-9">
              {t("cta.title1")}{" "}
              <span className="text-[var(--rc-accent)]">{t("cta.title2")}</span>
              <span className="text-[var(--rc-accent)]">.</span>
            </h2>
            <div className="col-span-12 md:col-span-3 md:justify-self-end">
              <Link href={`/${locale}/contact`} className="lab-btn lab-btn-ink">
                {t("cta.button")}
                <ArrowOut className="h-4 w-4" />
              </Link>
            </div>
            <p className="type-body measure col-span-12 md:col-span-7">
              {t("cta.description")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
