/* ── Locale helper: default to "en" for unsupported locales ── */
type SupportedLocale = "ko" | "en" | "zh" | "ja" | "es" | "fr";
const SUPPORTED: readonly SupportedLocale[] = [
  "ko",
  "en",
  "zh",
  "ja",
  "es",
  "fr",
];
function safeLocale(loc: string): SupportedLocale {
  return SUPPORTED.includes(loc as SupportedLocale)
    ? (loc as SupportedLocale)
    : "en";
}

/* ── Patent Families (grouped by product, from Excel data) ── */
type PatentFamily = {
  pipeline: string;
  pipelineColor: string;
  ko: { title: string };
  en: { title: string };
  zh: { title: string };
  ja: { title: string };
  es: { title: string };
  fr: { title: string };
  filings: {
    country: string;
    countryEn: string;
    number: string;
    filed: string;
    registered: string;
    status: "granted" | "filed" | "pct" | "expired" | "transferred";
  }[];
  inventors: string;
};

const PATENT_FAMILIES: PatentFamily[] = [
  {
    pipeline: "RCI001",
    pipelineColor: "emerald",
    ko: {
      title:
        "8-옥소-데옥시구아노신(8-oxo-2'-deoxyguanosine) 또는 이의 약학적으로 허용 가능한 염을 유효성분으로 함유하는 각막 손상 치료용 약학적 조성물",
    },
    en: {
      title:
        "Pharmaceutical Composition Containing 8-oxo-2'-deoxyguanosine for Treating Corneal Disease",
    },
    zh: {
      title:
        "含有8-oxo-2'-deoxyguanosine或其药学上可接受的盐作为有效成分的角膜损伤治疗用药学组合物",
    },
    ja: {
      title:
        "8-oxo-2'-deoxyguanosineまたはその薬学的に許容可能な塩を有効成分として含有する角膜損傷治療用薬学的組成物",
    },
    es: {
      title:
        "Composición farmacéutica que contiene 8-oxo-2'-deoxyguanosine para el tratamiento de enfermedades corneales",
    },
    fr: {
      title:
        "Composition pharmaceutique contenant de la 8-oxo-2'-deoxyguanosine pour le traitement des maladies cornéennes",
    },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-1816277",
        filed: "2016.10.06",
        registered: "2018.01.02",
        status: "granted",
      },
      {
        country: "PCT",
        countryEn: "PCT",
        number: "KR2017/011068",
        filed: "2017.09.29",
        registered: "-",
        status: "pct",
      },
      {
        country: "미국",
        countryEn: "USA",
        number: "US10675294",
        filed: "2019.04.05",
        registered: "2020.06.09",
        status: "granted",
      },
    ],
    inventors: "정명희, 김동현",
  },
  {
    pipeline: "RCI001",
    pipelineColor: "emerald",
    ko: {
      title:
        "8-옥소-2'-데옥시구아노신 또는 이의 약학적으로 허용가능한 염을 포함하는 수용액 형태의 점안제",
    },
    en: {
      title:
        "Eye Drop Formulations in Aqueous Solution Comprising 8-oxo-2'-deoxyguanosine",
    },
    zh: {
      title: "含有8-oxo-2'-deoxyguanosine或其药学上可接受的盐的水溶液滴眼剂",
    },
    ja: {
      title:
        "8-oxo-2'-deoxyguanosineまたはその薬学的に許容可能な塩を含む水溶液形態の点眼剤",
    },
    es: {
      title:
        "Formulaciones de gotas oftálmicas en solución acuosa que comprenden 8-oxo-2'-deoxyguanosine",
    },
    fr: {
      title:
        "Formulations de collyre en solution aqueuse comprenant de la 8-oxo-2'-deoxyguanosine",
    },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2023-0121513",
        filed: "2023.09.13",
        registered: "-",
        status: "filed",
      },
      {
        country: "PCT",
        countryEn: "PCT",
        number: "PCT/KR2023/018842",
        filed: "2023.11.22",
        registered: "-",
        status: "pct",
      },
      {
        country: "미국",
        countryEn: "USA",
        number: "18/813,805",
        filed: "2024.08.23",
        registered: "-",
        status: "filed",
      },
      {
        country: "유럽",
        countryEn: "Europe",
        number: "EP24197366.8",
        filed: "2024.08.29",
        registered: "-",
        status: "filed",
      },
      {
        country: "중국",
        countryEn: "China",
        number: "202380069678.2",
        filed: "2025.03.28",
        registered: "-",
        status: "filed",
      },
      {
        country: "일본",
        countryEn: "Japan",
        number: "2025-518592",
        filed: "2025.03.28",
        registered: "-",
        status: "filed",
      },
      {
        country: "호주",
        countryEn: "Australia",
        number: "2023465099",
        filed: "2026.01.30",
        registered: "-",
        status: "filed",
      },
      {
        country: "뉴질랜드",
        countryEn: "New Zealand",
        number: "829708",
        filed: "2026.01.30",
        registered: "-",
        status: "filed",
      },
      {
        country: "캐나다",
        countryEn: "Canada",
        number: "3302629",
        filed: "2026.02.23",
        registered: "-",
        status: "filed",
      },
      {
        country: "브라질",
        countryEn: "Brazil",
        number: "11-2026-002888-2",
        filed: "2026.02.05",
        registered: "-",
        status: "filed",
      },
      {
        country: "멕시코",
        countryEn: "Mexico",
        number: "26/02889",
        filed: "2026.03.10",
        registered: "-",
        status: "filed",
      },
      {
        country: "태국",
        countryEn: "Thailand",
        number: "2601001700",
        filed: "2026.03.12",
        registered: "-",
        status: "filed",
      },
    ],
    inventors: "김동현, 박설규, 이동진, 김선경",
  },
  {
    pipeline: "RCI001U",
    pipelineColor: "emerald",
    ko: {
      title:
        "2'-데옥시구아노신 유도체 또는 이의 염 및 이를 포함하는 약학 조성물",
    },
    en: {
      title:
        "2'-Deoxyguanosine Derivatives or Salts Thereof and Pharmaceutical Compositions",
    },
    zh: { title: "2'-Deoxyguanosine衍生物或其盐及含有其的药学组合物" },
    ja: {
      title: "2'-Deoxyguanosine誘導体またはその塩およびそれを含む薬学的組成物",
    },
    es: {
      title:
        "Derivados de 2'-deoxyguanosine o sus sales y composiciones farmacéuticas",
    },
    fr: {
      title:
        "Dérivés de 2'-deoxyguanosine ou leurs sels et compositions pharmaceutiques",
    },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2023-0167240",
        filed: "2023.11.27",
        registered: "-",
        status: "filed",
      },
      {
        country: "PCT",
        countryEn: "PCT",
        number: "PCT/KR2024/018577",
        filed: "2024.11.22",
        registered: "-",
        status: "pct",
      },
    ],
    inventors: "김용호, 김승훈, 구영아, 김완훈",
  },
  {
    pipeline: "RCI002",
    pipelineColor: "blue",
    ko: { title: "TRPV1 활성 매개 질환 치료용 약학적 조성물 (GDF11 유효성분)" },
    en: {
      title:
        "Pharmaceutical Composition for Treating TRPV1-Mediated Diseases (GDF11 Active Ingredient)",
    },
    zh: { title: "用于治疗TRPV1介导疾病的药学组合物（GDF11有效成分）" },
    ja: { title: "TRPV1活性媒介疾患治療用薬学的組成物（GDF11有効成分）" },
    es: {
      title:
        "Composición farmacéutica para el tratamiento de enfermedades mediadas por TRPV1 (ingrediente activo GDF11)",
    },
    fr: {
      title:
        "Composition pharmaceutique pour le traitement des maladies médiées par TRPV1 (principe actif GDF11)",
    },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2339414",
        filed: "2021.01.18",
        registered: "2021.12.09",
        status: "granted",
      },
      {
        country: "PCT",
        countryEn: "PCT",
        number: "PCT/KR2020/018895",
        filed: "2020.12.22",
        registered: "-",
        status: "pct",
      },
      {
        country: "미국",
        countryEn: "USA",
        number: "17/137392",
        filed: "2020.12.30",
        registered: "-",
        status: "filed",
      },
      {
        country: "유럽",
        countryEn: "Europe",
        number: "20914763.6",
        filed: "2021.07.28",
        registered: "-",
        status: "filed",
      },
      {
        country: "중국",
        countryEn: "China",
        number: "2020800866718",
        filed: "2022.06.14",
        registered: "-",
        status: "filed",
      },
      {
        country: "일본",
        countryEn: "Japan",
        number: "JP 7663882",
        filed: "2022.07.19",
        registered: "2025.04.09",
        status: "granted",
      },
    ],
    inventors: "김용호, 김승훈, 전하원, 하유승",
  },
  {
    pipeline: "RCI002",
    pipelineColor: "blue",
    ko: { title: "신규 펩타이드 및 이의 용도" },
    en: { title: "A Novel Peptide and the Use Thereof" },
    zh: { title: "新型肽及其用途" },
    ja: { title: "新規ペプチドおよびその用途" },
    es: { title: "Un péptido novedoso y su uso" },
    fr: { title: "Un nouveau peptide et son utilisation" },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2023-0026404",
        filed: "2023.02.28",
        registered: "-",
        status: "filed",
      },
      {
        country: "PCT",
        countryEn: "PCT",
        number: "PCT/KR2023/016946",
        filed: "2023.10.27",
        registered: "-",
        status: "pct",
      },
      {
        country: "미국",
        countryEn: "USA",
        number: "18/686,660",
        filed: "2024.02.27",
        registered: "-",
        status: "filed",
      },
      {
        country: "유럽",
        countryEn: "Europe",
        number: "23855750.8",
        filed: "2024.02.27",
        registered: "-",
        status: "filed",
      },
      {
        country: "일본",
        countryEn: "Japan",
        number: "2024-513214",
        filed: "2024.02.27",
        registered: "-",
        status: "filed",
      },
      {
        country: "중국",
        countryEn: "China",
        number: "202380094047.6",
        filed: "2025.08.13",
        registered: "-",
        status: "filed",
      },
    ],
    inventors: "김용호, 김승훈, 전하원, 장예원",
  },
  {
    pipeline: "RCI002",
    pipelineColor: "blue",
    ko: { title: "통증 치료용 조성물" },
    en: { title: "Composition for Pain Treatment" },
    zh: { title: "疼痛治疗用组合物" },
    ja: { title: "疼痛治療用組成物" },
    es: { title: "Composición para el tratamiento del dolor" },
    fr: { title: "Composition pour le traitement de la douleur" },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2025-0122722",
        filed: "2025.08.29",
        registered: "-",
        status: "filed",
      },
      {
        country: "PCT",
        countryEn: "PCT",
        number: "PCT/KR2025/013324",
        filed: "2025.08.29",
        registered: "-",
        status: "pct",
      },
    ],
    inventors: "김승훈, 김윤연, 김재승, 최승혁",
  },
  {
    pipeline: "RCI003",
    pipelineColor: "violet",
    ko: { title: "8-옥소-2'-데옥시구아노신 유도체" },
    en: { title: "8-oxo-2'-Deoxyguanosine Derivatives" },
    zh: { title: "8-oxo-2'-Deoxyguanosine衍生物" },
    ja: { title: "8-oxo-2'-Deoxyguanosine誘導体" },
    es: { title: "Derivados de 8-oxo-2'-deoxyguanosine" },
    fr: { title: "Dérivés de 8-oxo-2'-deoxyguanosine" },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2023-0195845",
        filed: "2023.12.28",
        registered: "-",
        status: "filed",
      },
    ],
    inventors: "김용호, 김승훈, 강혜린, 조하늘, 용혜임, 김완훈",
  },
  {
    pipeline: "RCI009",
    pipelineColor: "rose",
    ko: {
      title: "TRPV1 길항제를 포함하는 소양증 예방 또는 치료용 약학적 조성물",
    },
    en: {
      title:
        "Pharmaceutical Composition for Prevention or Treatment of Pruritus Comprising TRPV1 Antagonist",
    },
    zh: { title: "含有TRPV1拮抗剂的瘙痒症预防或治疗用药学组合物" },
    ja: { title: "TRPV1拮抗剤を含む掻痒症の予防または治療用薬学的組成物" },
    es: {
      title:
        "Composición farmacéutica para la prevención o tratamiento del prurito que comprende un antagonista de TRPV1",
    },
    fr: {
      title:
        "Composition pharmaceutique pour la prévention ou le traitement du prurit comprenant un antagoniste de TRPV1",
    },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2026-0043871",
        filed: "2026.03.11",
        registered: "-",
        status: "filed",
      },
    ],
    inventors: "김승훈, 신지윤, 김윤연, 용혜임, 구연수",
  },
  {
    pipeline: "RCI009",
    pipelineColor: "rose",
    ko: {
      title:
        "TRPV1 길항제를 포함하는 안구건조증의 예방 또는 치료용 약학적 조성물",
    },
    en: {
      title:
        "Pharmaceutical Composition for Prevention or Treatment of Dry Eye Disease Comprising TRPV1 Antagonist",
    },
    zh: { title: "含有TRPV1拮抗剂的干眼症预防或治疗用药学组合物" },
    ja: {
      title: "TRPV1拮抗剤を含む乾燥性眼疾患の予防または治療用薬学的組成物",
    },
    es: {
      title:
        "Composición farmacéutica para la prevención o tratamiento del ojo seco que comprende un antagonista de TRPV1",
    },
    fr: {
      title:
        "Composition pharmaceutique pour la prévention ou le traitement de la sécheresse oculaire comprenant un antagoniste de TRPV1",
    },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2026-0043872",
        filed: "2026.03.11",
        registered: "-",
        status: "filed",
      },
    ],
    inventors: "김승훈, 신지윤, 김윤연, 구영아, 최가은",
  },
  {
    pipeline: "기타",
    pipelineColor: "gray",
    ko: { title: "시상하부-뇌하수체 바이오칩 및 이의 제조방법" },
    en: {
      title: "Hypothalamus-Pituitary Biochip and Manufacturing Method Thereof",
    },
    zh: { title: "下丘脑-垂体生物芯片及其制造方法" },
    ja: { title: "視床下部-下垂体バイオチップおよびその製造方法" },
    es: { title: "Biochip hipotálamo-hipófisis y su método de fabricación" },
    fr: {
      title: "Biopuce hypothalamus-hypophyse et son procédé de fabrication",
    },
    filings: [
      {
        country: "대한민국",
        countryEn: "Korea",
        number: "10-2902348",
        filed: "-",
        registered: "2025.12.16",
        status: "transferred",
      },
    ],
    inventors: "-",
  },
];

/* ── Trademarks ── */
const TRADEMARKS = [
  {
    name: "RUDACURE",
    cls: "42류",
    country: "대한민국",
    countryEn: "Korea",
    number: "40-1790156",
    filed: "2020.07.27",
    registered: "2021.10.21",
    status: "granted" as const,
  },
  {
    name: "MEDDIXON",
    cls: "05류",
    country: "대한민국",
    countryEn: "Korea",
    number: "40-1790164",
    filed: "2020.07.27",
    registered: "2021.10.21",
    status: "granted" as const,
  },
  {
    name: "RuCIA",
    cls: "42류",
    country: "대한민국",
    countryEn: "Korea",
    number: "40-2025-0146222",
    filed: "2025.08.11",
    registered: "-",
    status: "filed" as const,
  },
];

/* ── Papers (from actual PDF files) ──
   pdf: filename in /public/papers/ (shows download button)
   doi: DOI identifier (shows external link button)
*/
type PaperLocale = {
  title: string;
  journal: string;
  authors: string;
  type: string;
};
const PAPERS: {
  year: number;
  ko: PaperLocale;
  en: PaperLocale;
  zh: PaperLocale;
  ja: PaperLocale;
  es: PaperLocale;
  fr: PaperLocale;
  doi: string;
  pdf: string;
}[] = [
  {
    year: 2025,
    ko: {
      title: "안구 표면 질환 치료 후보물질 RCI001의 효능 평가",
      journal: "Cornea",
      authors: "김승훈 외",
      type: "원저",
    },
    en: {
      title:
        "Efficacy of RCI001 as a Therapeutic Candidate in Ocular Surface Diseases",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Original Article",
    },
    zh: {
      title: "RCI001作为眼表疾病治疗候选药物的疗效评估",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著论文",
    },
    ja: {
      title: "眼表面疾患治療候補物質RCI001の有効性評価",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著論文",
    },
    es: {
      title:
        "Eficacia de RCI001 como candidato terapéutico en enfermedades de la superficie ocular",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Artículo Original",
    },
    fr: {
      title:
        "Efficacité du RCI001 en tant que candidat thérapeutique dans les maladies de la surface oculaire",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Article Original",
    },
    doi: "10.1097/ICO.0000000000003696",
    pdf: "efficacy_of_rci001_as_a_therapeutic_candidate_in_a.685.pdf",
  },
  {
    year: 2023,
    ko: {
      title:
        "마우스 안구 알칼리 화상 모델에서 RCI001, Solcoseryl, Polydeoxyribonucleotide의 각막 상피 창상 치유 비교",
      journal: "Cornea",
      authors: "김승훈 외",
      type: "원저",
    },
    en: {
      title:
        "Comparison of Corneal Epithelial Wound Healing between Topical RCI001, Solcoseryl, and Polydeoxyribonucleotide in the Murine Ocular Alkali Burn Model",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Original Article",
    },
    zh: {
      title:
        "小鼠眼碱烧伤模型中RCI001、Solcoseryl和Polydeoxyribonucleotide的角膜上皮创面愈合比较",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著论文",
    },
    ja: {
      title:
        "マウス眼アルカリ熱傷モデルにおけるRCI001、Solcoseryl、Polydeoxyribonucleotideの角膜上皮創傷治癒の比較",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著論文",
    },
    es: {
      title:
        "Comparación de la cicatrización epitelial corneal entre RCI001 tópico, Solcoseryl y Polydeoxyribonucleotide en el modelo murino de quemadura alcalina ocular",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Artículo Original",
    },
    fr: {
      title:
        "Comparaison de la cicatrisation épithéliale cornéenne entre le RCI001 topique, le Solcoseryl et le Polydeoxyribonucleotide dans le modèle murin de brûlure alcaline oculaire",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Article Original",
    },
    doi: "10.3341/kjo.2023.0019",
    pdf: "Comparison of Corneal Epithelial Wound Healing between Topical RCI001, Solcoseryl, and Polydeoxyribonucleotide in the Murine Ocular Alkali Burn Model.pdf",
  },
  {
    year: 2022,
    ko: {
      title:
        "안구 표면 질환 치료를 위한 RCI001의 항염증 효과 연구 — 작용 기전에 대한 고찰",
      journal: "Investigative Ophthalmology & Visual Science",
      authors: "김승훈 외",
      type: "원저",
    },
    en: {
      title:
        "Investigating the Anti-Inflammatory Effects of RCI001 for Treating Ocular Surface Diseases: Insight Into the Mechanism of Action",
      journal: "Investigative Ophthalmology & Visual Science",
      authors: "Kim SH et al.",
      type: "Original Article",
    },
    zh: {
      title: "RCI001治疗眼表疾病的抗炎效果研究——作用机制探讨",
      journal: "Investigative Ophthalmology & Visual Science",
      authors: "Kim SH et al.",
      type: "原著论文",
    },
    ja: {
      title:
        "眼表面疾患治療のためのRCI001の抗炎症効果の研究——作用機序に関する考察",
      journal: "Investigative Ophthalmology & Visual Science",
      authors: "Kim SH et al.",
      type: "原著論文",
    },
    es: {
      title:
        "Investigación de los efectos antiinflamatorios de RCI001 para el tratamiento de enfermedades de la superficie ocular: perspectiva del mecanismo de acción",
      journal: "Investigative Ophthalmology & Visual Science",
      authors: "Kim SH et al.",
      type: "Artículo Original",
    },
    fr: {
      title:
        "Étude des effets anti-inflammatoires du RCI001 pour le traitement des maladies de la surface oculaire : aperçu du mécanisme d'action",
      journal: "Investigative Ophthalmology & Visual Science",
      authors: "Kim SH et al.",
      type: "Article Original",
    },
    doi: "10.3389/fimmu.2022.850287",
    pdf: "Investigating the Anti-Inflammatory Effects of RCI001 for Treating Ocular Surface Diseases Insight Into the Mechanism of Action.pdf",
  },
  {
    year: 2022,
    ko: {
      title:
        "8-Oxo-2'-Deoxyguanosine 점안제와 코르티코스테로이드의 안구 알칼리 화상 모델에서의 치료 효과 비교",
      journal: "Cornea",
      authors: "김승훈 외",
      type: "원저",
    },
    en: {
      title:
        "Comparison of Therapeutic Effects between Topical 8-oxo-2'-deoxyguanosine and Corticosteroid in Ocular Alkali Burn Model",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Original Article",
    },
    zh: {
      title:
        "眼碱烧伤模型中局部8-oxo-2'-deoxyguanosine与皮质类固醇的治疗效果比较",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著论文",
    },
    ja: {
      title:
        "眼アルカリ熱傷モデルにおける局所8-oxo-2'-deoxyguanosineとコルチコステロイドの治療効果の比較",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著論文",
    },
    es: {
      title:
        "Comparación de los efectos terapéuticos entre 8-oxo-2'-deoxyguanosine tópico y corticosteroides en el modelo de quemadura alcalina ocular",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Artículo Original",
    },
    fr: {
      title:
        "Comparaison des effets thérapeutiques entre la 8-oxo-2'-deoxyguanosine topique et les corticostéroïdes dans le modèle de brûlure alcaline oculaire",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Article Original",
    },
    doi: "10.1038/s41598-021-86440-7",
    pdf: "Comparison of therapeutic effects between topical 8-oxo-2′-deoxyguanosine and corticosteroid in ocular alkali burn model..pdf",
  },
  {
    year: 2022,
    ko: {
      title:
        "8-Oxo-2'-Deoxyguanosine의 안구 분포 및 약동학 — 안구 표면 질환의 새로운 치료 후보물질",
      journal: "Translational Vision Science & Technology",
      authors: "김승훈 외",
      type: "원저",
    },
    en: {
      title:
        "Ocular Distribution and Pharmacokinetics of 8-Oxo-2'-Deoxyguanosine: A Novel Therapeutic Candidate of Ocular Surface Diseases",
      journal: "Translational Vision Science & Technology",
      authors: "Kim SH et al.",
      type: "Original Article",
    },
    zh: {
      title:
        "8-Oxo-2'-Deoxyguanosine的眼部分布及药代动力学——眼表疾病的新型治疗候选药物",
      journal: "Translational Vision Science & Technology",
      authors: "Kim SH et al.",
      type: "原著论文",
    },
    ja: {
      title:
        "8-Oxo-2'-Deoxyguanosineの眼内分布および薬物動態——眼表面疾患の新規治療候補物質",
      journal: "Translational Vision Science & Technology",
      authors: "Kim SH et al.",
      type: "原著論文",
    },
    es: {
      title:
        "Distribución ocular y farmacocinética de 8-Oxo-2'-Deoxyguanosine: un nuevo candidato terapéutico para enfermedades de la superficie ocular",
      journal: "Translational Vision Science & Technology",
      authors: "Kim SH et al.",
      type: "Artículo Original",
    },
    fr: {
      title:
        "Distribution oculaire et pharmacocinétique de la 8-Oxo-2'-Deoxyguanosine : un nouveau candidat thérapeutique pour les maladies de la surface oculaire",
      journal: "Translational Vision Science & Technology",
      authors: "Kim SH et al.",
      type: "Article Original",
    },
    doi: "10.1089/jop.2022.0054",
    pdf: "Ocular Distribution and Pharmacokinetics of 8-Oxo-2′-Deoxyguanosine A Novel Therapeutic Candidate of Ocular Surface Diseases (Publish).pdf",
  },
  {
    year: 2022,
    ko: {
      title:
        "난치성 안구건조증에 대한 코르티코스테로이드 단기 치료 효과 — MMP-9 검사의 반응 예측 마커로서의 유용성",
      journal: "Cornea",
      authors: "김승훈 외",
      type: "원저",
    },
    en: {
      title:
        "Short-Term Therapeutic Effects of Topical Corticosteroids on Refractory Dry Eye Disease: Clinical Usefulness of Matrix Metalloproteinase 9 Testing as a Response Prediction Marker",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Original Article",
    },
    zh: {
      title:
        "局部皮质类固醇对难治性干眼症的短期治疗效果——MMP-9检测作为反应预测标志物的临床实用性",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著论文",
    },
    ja: {
      title:
        "難治性ドライアイに対するコルチコステロイドの短期治療効果——MMP-9検査の反応予測マーカーとしての有用性",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "原著論文",
    },
    es: {
      title:
        "Efectos terapéuticos a corto plazo de los corticosteroides tópicos en la enfermedad del ojo seco refractario: utilidad clínica de la prueba de MMP-9 como marcador de predicción de respuesta",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Artículo Original",
    },
    fr: {
      title:
        "Effets thérapeutiques à court terme des corticostéroïdes topiques sur la sécheresse oculaire réfractaire : utilité clinique du test MMP-9 comme marqueur de prédiction de la réponse",
      journal: "Cornea",
      authors: "Kim SH et al.",
      type: "Article Original",
    },
    doi: "10.2147/OPTH.S300047",
    pdf: "Short-Term Therapeutic Effects of Topical Corticosteroids on Refractory Dry Eye Disease Clinical Usefulness of Matrix Metalloproteinase 9 Testing as a Response Prediction Marker.pdf",
  },
  {
    year: 2022,
    ko: {
      title: "안구건조증 수술 전 관리를 통한 인공수정체 도수 계산 정확도 향상",
      journal: "Journal of Cataract & Refractive Surgery",
      authors: "김승훈 외",
      type: "원저",
    },
    en: {
      title:
        "Improved Accuracy of Intraocular Lens Power Calculation by Preoperative Management of Dry Eye Disease",
      journal: "Journal of Cataract & Refractive Surgery",
      authors: "Kim SH et al.",
      type: "Original Article",
    },
    zh: {
      title: "通过术前干眼症管理提高人工晶体屈光度计算精度",
      journal: "Journal of Cataract & Refractive Surgery",
      authors: "Kim SH et al.",
      type: "原著论文",
    },
    ja: {
      title: "ドライアイの術前管理による眼内レンズ度数計算精度の向上",
      journal: "Journal of Cataract & Refractive Surgery",
      authors: "Kim SH et al.",
      type: "原著論文",
    },
    es: {
      title:
        "Mejora de la precisión del cálculo de potencia de lentes intraoculares mediante el manejo preoperatorio de la enfermedad del ojo seco",
      journal: "Journal of Cataract & Refractive Surgery",
      authors: "Kim SH et al.",
      type: "Artículo Original",
    },
    fr: {
      title:
        "Amélioration de la précision du calcul de la puissance des lentilles intraoculaires par la gestion préopératoire de la sécheresse oculaire",
      journal: "Journal of Cataract & Refractive Surgery",
      authors: "Kim SH et al.",
      type: "Article Original",
    },
    doi: "10.1186/s12886-021-02129-5",
    pdf: "Improved accuracy of intraocular lens power calculation by preoperative management of dry eye disease.pdf",
  },
];

/* ── UI Content ── */
type ContentBlock = {
  tag: string;
  title1: string;
  title2: string;
  description: string;
  patentsTitle: string;
  patentsDescription: string;
  papersTitle: string;
  papersDescription: string;
  trademarksTitle: string;
  totalFamilies: string;
  totalFilings: string;
  grantedFilings: string;
  globalCountries: string;
  totalPapers: string;
  家: string;
  件: string;
  국: string;
  편: string;
  filed: string;
  granted: string;
  pct: string;
  expired: string;
  transferred: string;
  familyUnit: string;
  inventorsLabel: string;
  viewJournal: string;
  metaTitle: string;
};

const CONTENT: Record<SupportedLocale, ContentBlock> = {
  ko: {
    tag: "Publications",
    title1: "특허 & ",
    title2: "논문",
    description:
      "루다큐어의 핵심 기술과 연구 성과를 보호하는 특허 포트폴리오 및 주요 학술 논문입니다.",
    patentsTitle: "특허 포트폴리오",
    patentsDescription:
      "이온채널 신약개발 핵심 기술에 대한 글로벌 지식재산권을 확보하고 있습니다.",
    papersTitle: "주요 연구 논문",
    papersDescription:
      "국내외 SCI급 저널에 게재된 루다큐어의 핵심 연구 성과입니다.",
    trademarksTitle: "상표 등록",
    totalFamilies: "특허 패밀리",
    totalFilings: "총 출원/등록",
    grantedFilings: "등록 완료",
    globalCountries: "진출 국가",
    totalPapers: "총 논문",
    家: "건",
    件: "건",
    국: "개국",
    편: "편",
    filed: "출원",
    granted: "등록",
    pct: "PCT",
    expired: "소멸",
    transferred: "기술이전",
    familyUnit: "패밀리",
    inventorsLabel: "발명자",
    viewJournal: "저널 보기",
    metaTitle: "특허 & 논문 | RudaCure",
  },
  en: {
    tag: "Publications",
    title1: "Patents & ",
    title2: "Papers",
    description:
      "Our patent portfolio and key academic publications protecting and advancing RudaCure's core technology and research achievements.",
    patentsTitle: "Patent Portfolio",
    patentsDescription:
      "Securing global intellectual property rights for core ion channel drug discovery technologies.",
    papersTitle: "Key Research Papers",
    papersDescription:
      "RudaCure's key research achievements published in domestic and international SCI-indexed journals.",
    trademarksTitle: "Trademarks",
    totalFamilies: "Patent Families",
    totalFilings: "Total Filings",
    grantedFilings: "Granted",
    globalCountries: "Countries",
    totalPapers: "Total Papers",
    家: "",
    件: "",
    국: "",
    편: "",
    filed: "Filed",
    granted: "Granted",
    pct: "PCT",
    expired: "Expired",
    transferred: "Transferred",
    familyUnit: "family",
    inventorsLabel: "Inventors",
    viewJournal: "View Journal",
    metaTitle: "Patents & Papers | RudaCure",
  },
  zh: {
    tag: "Publications",
    title1: "专利 & ",
    title2: "论文",
    description:
      "保护和推进RudaCure核心技术与研究成果的专利组合及重要学术论文。",
    patentsTitle: "专利组合",
    patentsDescription: "为离子通道新药开发核心技术获取全球知识产权。",
    papersTitle: "重要研究论文",
    papersDescription: "RudaCure发表在国内外SCI级期刊上的核心研究成果。",
    trademarksTitle: "商标注册",
    totalFamilies: "专利家族",
    totalFilings: "总申请/注册",
    grantedFilings: "已授权",
    globalCountries: "覆盖国家",
    totalPapers: "论文总数",
    家: "项",
    件: "件",
    국: "个国家",
    편: "篇",
    filed: "已申请",
    granted: "已授权",
    pct: "PCT",
    expired: "已过期",
    transferred: "技术转让",
    familyUnit: "个家族",
    inventorsLabel: "发明人",
    viewJournal: "查看期刊",
    metaTitle: "专利 & 论文 | RudaCure",
  },
  ja: {
    tag: "Publications",
    title1: "特許 & ",
    title2: "論文",
    description:
      "RudaCureのコア技術と研究成果を保護する特許ポートフォリオおよび主要な学術論文です。",
    patentsTitle: "特許ポートフォリオ",
    patentsDescription:
      "イオンチャネル新薬開発のコア技術に関するグローバルな知的財産権を確保しています。",
    papersTitle: "主要研究論文",
    papersDescription:
      "国内外のSCI級ジャーナルに掲載されたRudaCureの主要な研究成果です。",
    trademarksTitle: "商標登録",
    totalFamilies: "特許ファミリー",
    totalFilings: "総出願/登録",
    grantedFilings: "登録済み",
    globalCountries: "進出国",
    totalPapers: "論文総数",
    家: "件",
    件: "件",
    국: "カ国",
    편: "編",
    filed: "出願",
    granted: "登録",
    pct: "PCT",
    expired: "消滅",
    transferred: "技術移転",
    familyUnit: "ファミリー",
    inventorsLabel: "発明者",
    viewJournal: "ジャーナルを見る",
    metaTitle: "特許 & 論文 | RudaCure",
  },
  es: {
    tag: "Publications",
    title1: "Patentes & ",
    title2: "Publicaciones",
    description:
      "Nuestro portafolio de patentes y publicaciones académicas clave que protegen y avanzan la tecnología central y los logros de investigación de RudaCure.",
    patentsTitle: "Portafolio de Patentes",
    patentsDescription:
      "Asegurando derechos de propiedad intelectual globales para las tecnologías centrales de descubrimiento de fármacos de canales iónicos.",
    papersTitle: "Publicaciones de Investigación Clave",
    papersDescription:
      "Logros de investigación clave de RudaCure publicados en revistas indexadas SCI nacionales e internacionales.",
    trademarksTitle: "Marcas Registradas",
    totalFamilies: "Familias de Patentes",
    totalFilings: "Solicitudes Totales",
    grantedFilings: "Concedidas",
    globalCountries: "Países",
    totalPapers: "Total de Publicaciones",
    家: "",
    件: "",
    국: "",
    편: "",
    filed: "Solicitada",
    granted: "Concedida",
    pct: "PCT",
    expired: "Expirada",
    transferred: "Transferida",
    familyUnit: "familia",
    inventorsLabel: "Inventores",
    viewJournal: "Ver Revista",
    metaTitle: "Patentes & Publicaciones | RudaCure",
  },
  fr: {
    tag: "Publications",
    title1: "Brevets & ",
    title2: "Publications",
    description:
      "Notre portefeuille de brevets et nos publications académiques clés protégeant et faisant avancer la technologie centrale et les réalisations de recherche de RudaCure.",
    patentsTitle: "Portefeuille de Brevets",
    patentsDescription:
      "Sécurisation des droits de propriété intellectuelle mondiaux pour les technologies de découverte de médicaments ciblant les canaux ioniques.",
    papersTitle: "Publications de Recherche Clés",
    papersDescription:
      "Réalisations de recherche clés de RudaCure publiées dans des revues indexées SCI nationales et internationales.",
    trademarksTitle: "Marques Déposées",
    totalFamilies: "Familles de Brevets",
    totalFilings: "Dépôts Totaux",
    grantedFilings: "Accordés",
    globalCountries: "Pays",
    totalPapers: "Total des Publications",
    家: "",
    件: "",
    국: "",
    편: "",
    filed: "Déposé",
    granted: "Accordé",
    pct: "PCT",
    expired: "Expiré",
    transferred: "Transféré",
    familyUnit: "famille",
    inventorsLabel: "Inventeurs",
    viewJournal: "Voir la Revue",
    metaTitle: "Brevets & Publications | RudaCure",
  },
};

/* ── Pluralized family count label ── */
const familyCountLabel = (count: number, locale: SupportedLocale): string => {
  const labels: Record<SupportedLocale, (n: number) => string> = {
    ko: (n) => `${n} 패밀리`,
    en: (n) => (n > 1 ? `${n} families` : `${n} family`),
    zh: (n) => `${n} 个家族`,
    ja: (n) => `${n} ファミリー`,
    es: (n) => (n > 1 ? `${n} familias` : `${n} familia`),
    fr: (n) => (n > 1 ? `${n} familles` : `${n} famille`),
  };
  return labels[locale](count);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = safeLocale(rawLocale);
  const c = CONTENT[locale];
  return {
    title: c.metaTitle,
    description: c.description,
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = safeLocale(rawLocale);
  const c = CONTENT[locale];

  const totalFilings = PATENT_FAMILIES.reduce(
    (sum, f) => sum + f.filings.length,
    0,
  );
  const grantedFilings = PATENT_FAMILIES.reduce(
    (sum, f) => sum + f.filings.filter((fl) => fl.status === "granted").length,
    0,
  );
  const countries = new Set(
    PATENT_FAMILIES.flatMap((f) =>
      f.filings.map((fl) => fl.country).filter((co) => co !== "PCT"),
    ),
  );

  const pipelineColorMap: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    emerald: {
      bg: "bg-teal-50",
      text: "text-teal-700",
      border: "border-teal-200",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-700",
      border: "border-violet-200",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
    },
    gray: {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
    },
  };

  const statusStyle: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    granted: {
      bg: "bg-teal-50",
      text: "text-teal-700",
      border: "border-teal-200",
    },
    filed: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
    },
    pct: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    expired: {
      bg: "bg-gray-100",
      text: "text-gray-500",
      border: "border-gray-200",
    },
    transferred: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  };

  const statusLabel = (s: string) => (c[s as keyof typeof c] as string) || s;

  /* Use ko for country display only when locale is ko, otherwise use countryEn */
  const countryName = (fl: { country: string; countryEn: string }) =>
    locale === "ko" ? fl.country : fl.countryEn;

  // Group patent families by pipeline
  const pipelineGroups: Record<string, PatentFamily[]> = {};
  for (const fam of PATENT_FAMILIES) {
    const key = fam.pipeline;
    if (!pipelineGroups[key]) pipelineGroups[key] = [];
    pipelineGroups[key].push(fam);
  }

  const grantedPatents = PATENT_FAMILIES.flatMap((fam) =>
    fam.filings
      .filter((fl) => fl.status === "granted")
      .map((fl) => ({
        "@type": "Patent",
        name: fam.en.title,
        applicationNumber: fl.number,
        countryOfOrigin: fl.countryEn,
        datePublished:
          fl.registered !== "-" ? fl.registered.replace(/\./g, "-") : undefined,
        inventor: fam.inventors !== "-" ? fam.inventors.split(", ") : undefined,
        assignee: { "@type": "Organization", name: "RudaCure Co., Ltd." },
      })),
  );

  const scholarlyArticles = PAPERS.filter((p) => p.doi).map((p) => ({
    "@type": "ScholarlyArticle",
    name: p.en.title,
    author: p.en.authors,
    datePublished: String(p.year),
    isPartOf: { "@type": "Periodical", name: p.en.journal },
    identifier: { "@type": "PropertyValue", propertyID: "doi", value: p.doi },
    url: `https://doi.org/${p.doi}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [...scholarlyArticles, ...grantedPatents],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-24">
        {/* Hero */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {c.tag}
            </p>
            <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
              {c.title1}
              <em className="font-playfair italic font-semibold text-gradient-emerald">
                {c.title2}
              </em>
            </h1>
            <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
              {c.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
              {[
                {
                  label: c.totalFamilies,
                  value: `${PATENT_FAMILIES.length}${c.家}`,
                  accent: false,
                },
                {
                  label: c.totalFilings,
                  value: `${totalFilings}${c.件}`,
                  accent: true,
                },
                {
                  label: c.grantedFilings,
                  value: `${grantedFilings}${c.件}`,
                  accent: false,
                },
                {
                  label: c.globalCountries,
                  value: `${countries.size}${c.국}`,
                  accent: true,
                },
                {
                  label: c.totalPapers,
                  value: `${PAPERS.length}${c.편}`,
                  accent: false,
                },
              ].map((s) => (
                <div key={s.label} className="liquid-glass p-5 text-center">
                  <p
                    className={`text-3xl font-bold mb-1 ${s.accent ? "text-teal-600" : "text-gray-900"}`}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Patents by Pipeline */}
        <section className="py-16 px-6 bg-gray-50/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <h2 className="text-3xl font-light text-gray-900">
                {c.patentsTitle}
              </h2>
            </div>
            <p className="text-gray-500 mb-10 ml-9">{c.patentsDescription}</p>

            {Object.entries(pipelineGroups).map(([pipeline, families]) => {
              const pc =
                pipelineColorMap[families[0].pipelineColor] ||
                pipelineColorMap.gray;
              return (
                <div key={pipeline} className="mb-10">
                  {/* Pipeline header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${pc.bg} ${pc.text} border ${pc.border}`}
                    >
                      {pipeline}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">
                      {familyCountLabel(families.length, locale)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {families.map((fam, fi) => (
                      <div
                        key={fi}
                        className="liquid-glass p-6 hover:shadow-md transition-shadow"
                      >
                        {/* Title */}
                        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-1">
                          {fam[locale].title}
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">
                          {c.inventorsLabel}: {fam.inventors}
                        </p>

                        {/* Filing country badges */}
                        <div className="flex flex-wrap gap-2">
                          {fam.filings.map((fl, i) => {
                            const ss =
                              statusStyle[fl.status] || statusStyle.filed;
                            return (
                              <div
                                key={i}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border ${ss.bg} ${ss.border}`}
                              >
                                <span className={`font-semibold ${ss.text}`}>
                                  {countryName(fl)}
                                </span>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-500 font-mono text-[11px]">
                                  {fl.number}
                                </span>
                                {fl.status === "granted" && (
                                  <>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-teal-600 font-medium">
                                      {statusLabel(fl.status)}
                                    </span>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Trademarks */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                  {c.trademarksTitle}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="liquid-glass p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {TRADEMARKS.map((tm) => {
                    const ss = statusStyle[tm.status];
                    return (
                      <div
                        key={tm.number}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${ss.bg} ${ss.border}`}
                      >
                        <div>
                          <span className="text-base font-bold text-gray-900">
                            {tm.name}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {tm.cls}
                          </span>
                          <div className="text-xs text-gray-500 mt-0.5">
                            <span className="font-mono">{tm.number}</span>
                            {tm.registered !== "-" && (
                              <span className={`ml-2 font-medium ${ss.text}`}>
                                {statusLabel(tm.status)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Papers */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <h2 className="text-3xl font-light text-gray-900">
                {c.papersTitle}
              </h2>
            </div>
            <p className="text-gray-500 mb-8 ml-9">{c.papersDescription}</p>

            {[2025, 2024, 2023, 2022].map((year) => {
              const yearPapers = PAPERS.filter((p) => p.year === year);
              if (yearPapers.length === 0) return null;
              return (
                <div key={year} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-teal-600">
                      {year}
                    </span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                  <div className="space-y-4">
                    {yearPapers.map((paper) => {
                      const pp = paper[locale];
                      return (
                        <div
                          key={paper.pdf}
                          className="liquid-glass p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  pp.type === "원저" ||
                                  pp.type === "Original Article" ||
                                  pp.type === "原著论文" ||
                                  pp.type === "原著論文" ||
                                  pp.type === "Artículo Original" ||
                                  pp.type === "Article Original"
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : pp.type === "리뷰" ||
                                        pp.type === "Review" ||
                                        pp.type === "综述" ||
                                        pp.type === "総説" ||
                                        pp.type === "Revisión" ||
                                        pp.type === "Revue"
                                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                                      : "bg-gray-50 text-gray-700 border border-gray-200"
                                }`}
                              >
                                {pp.type}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2">
                                {pp.title}
                              </h3>
                              <p className="text-sm text-gray-500 mb-1">
                                {pp.authors}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="font-medium text-gray-600 italic">
                                  {pp.journal}
                                </span>
                                {paper.doi && (
                                  <>
                                    <span>·</span>
                                    <span className="font-mono">
                                      {paper.doi}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                                {paper.doi && (
                                  <a
                                    href={`https://doi.org/${paper.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-600 hover:text-teal-800 transition-colors"
                                  >
                                    <svg
                                      className="w-3.5 h-3.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                      />
                                    </svg>
                                    {c.viewJournal}
                                  </a>
                                )}

                                {paper.pdf && (
                                  <a
                                    href={`/papers/${paper.pdf}`}
                                    download
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
                                  >
                                    <svg
                                      className="w-3.5 h-3.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                      />
                                    </svg>
                                    PDF
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
