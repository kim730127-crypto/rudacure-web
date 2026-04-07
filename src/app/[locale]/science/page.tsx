import Image from "next/image";
import { type Locale } from "@/lib/i18n";

type ScienceLocale = "ko" | "en" | "zh" | "ja" | "es" | "fr";

function toScienceLocale(locale: string): ScienceLocale {
  const supported: ScienceLocale[] = ["ko", "en", "zh", "ja", "es", "fr"];
  return supported.includes(locale as ScienceLocale)
    ? (locale as ScienceLocale)
    : "en";
}

const CAPABILITIES: Record<
  ScienceLocale,
  { title: string; description: string; image: string }[]
> = {
  ko: [
    {
      title: "이온채널 전문성",
      description:
        "TRPV1, TRPA1 등 통증/감각 신호를 조절하는 이온채널에 특화. AI가 채널-리간드 상호작용을 예측하여 선택적 후보물질을 발굴합니다.",
      image: "/images/science/ion-channel.jpg",
    },
    {
      title: "AI 분자 시뮬레이션",
      description:
        "분자 수준 시뮬레이션으로 오프타겟 효과를 사전 제거. 1세대 TRPV1 차단제의 고체온증 부작용을 원천 해결했습니다.",
      image: "/images/science/ai-simulation.jpg",
    },
    {
      title: "전기생리학 검증",
      description:
        "패치클램프 기반 고처리량 전기생리학 검증. AI 예측 결과를 실제 이온채널 활성 데이터로 확인합니다.",
      image: "/images/science/electrophysiology.jpg",
    },
    {
      title: "CRO 서비스",
      description:
        "전기생리학 전문 CRO 서비스 제공. 안구/감각 질환 특화 동물모델과 맞춤형 약효평가를 수행합니다.",
      image: "/images/science/cro-lab.jpg",
    },
  ],
  en: [
    {
      title: "Ion Channel Mastery",
      description:
        "Specialized in ion channels governing pain and sensory signals including TRPV1 and TRPA1. AI predicts channel-ligand interactions to discover selective drug candidates.",
      image: "/images/science/ion-channel.jpg",
    },
    {
      title: "AI Molecular Simulation",
      description:
        "Molecular-level simulation eliminates off-target effects preemptively. Fully resolved the hyperthermia side effect of first-generation TRPV1 antagonists.",
      image: "/images/science/ai-simulation.jpg",
    },
    {
      title: "Electrophysiology Validation",
      description:
        "High-throughput electrophysiology validation using patch clamp technology. Confirms AI predictions against actual ion channel activity data.",
      image: "/images/science/electrophysiology.jpg",
    },
    {
      title: "CRO Services",
      description:
        "Specialized electrophysiology CRO services. Customized efficacy evaluation with animal models for ocular and sensory diseases.",
      image: "/images/science/cro-lab.jpg",
    },
  ],
  zh: [
    {
      title: "离子通道专业能力",
      description:
        "专注于调控疼痛与感觉信号的离子通道，包括TRPV1和TRPA1。AI预测通道-配体相互作用，发现高选择性候选药物。",
      image: "/images/science/ion-channel.jpg",
    },
    {
      title: "AI分子模拟",
      description:
        "分子层面模拟提前消除脱靶效应。彻底解决了第一代TRPV1拮抗剂的高热副作用。",
      image: "/images/science/ai-simulation.jpg",
    },
    {
      title: "电生理学验证",
      description:
        "基于膜片钳的高通量电生理学验证。以实际离子通道活性数据确认AI预测结果。",
      image: "/images/science/electrophysiology.jpg",
    },
    {
      title: "CRO服务",
      description:
        "专业电生理学CRO服务。提供眼科及感觉疾病专用动物模型与定制化药效评估。",
      image: "/images/science/cro-lab.jpg",
    },
  ],
  ja: [
    {
      title: "イオンチャネル専門性",
      description:
        "TRPV1、TRPA1など痛覚・感覚シグナルを制御するイオンチャネルに特化。AIがチャネル-リガンド相互作用を予測し、選択的候補物質を発掘します。",
      image: "/images/science/ion-channel.jpg",
    },
    {
      title: "AI分子シミュレーション",
      description:
        "分子レベルのシミュレーションでオフターゲット効果を事前排除。第一世代TRPV1拮抗薬の高体温症副作用を根本的に解決しました。",
      image: "/images/science/ai-simulation.jpg",
    },
    {
      title: "電気生理学検証",
      description:
        "パッチクランプベースのハイスループット電気生理学検証。AI予測結果を実際のイオンチャネル活性データで確認します。",
      image: "/images/science/electrophysiology.jpg",
    },
    {
      title: "CROサービス",
      description:
        "電気生理学専門CROサービスを提供。眼科・感覚疾患に特化した動物モデルとカスタマイズ薬効評価を実施します。",
      image: "/images/science/cro-lab.jpg",
    },
  ],
  es: [
    {
      title: "Dominio de Canales Iónicos",
      description:
        "Especializados en canales iónicos que regulan señales de dolor y sensoriales, incluyendo TRPV1 y TRPA1. La IA predice interacciones canal-ligando para descubrir candidatos farmacológicos selectivos.",
      image: "/images/science/ion-channel.jpg",
    },
    {
      title: "Simulación Molecular con IA",
      description:
        "La simulación a nivel molecular elimina efectos fuera de diana de forma preventiva. Resolvió completamente el efecto secundario de hipertermia de los antagonistas TRPV1 de primera generación.",
      image: "/images/science/ai-simulation.jpg",
    },
    {
      title: "Validación Electrofisiológica",
      description:
        "Validación electrofisiológica de alto rendimiento mediante tecnología patch clamp. Confirma las predicciones de IA con datos reales de actividad de canales iónicos.",
      image: "/images/science/electrophysiology.jpg",
    },
    {
      title: "Servicios CRO",
      description:
        "Servicios CRO especializados en electrofisiología. Evaluación de eficacia personalizada con modelos animales para enfermedades oculares y sensoriales.",
      image: "/images/science/cro-lab.jpg",
    },
  ],
  fr: [
    {
      title: "Expertise en Canaux Ioniques",
      description:
        "Spécialisés dans les canaux ioniques régulant les signaux de douleur et sensoriels, notamment TRPV1 et TRPA1. L'IA prédit les interactions canal-ligand pour découvrir des candidats médicaments sélectifs.",
      image: "/images/science/ion-channel.jpg",
    },
    {
      title: "Simulation Moléculaire par IA",
      description:
        "La simulation au niveau moléculaire élimine préventivement les effets hors cible. A entièrement résolu l'effet secondaire d'hyperthermie des antagonistes TRPV1 de première génération.",
      image: "/images/science/ai-simulation.jpg",
    },
    {
      title: "Validation Électrophysiologique",
      description:
        "Validation électrophysiologique à haut débit par technologie patch clamp. Confirme les prédictions de l'IA avec les données réelles d'activité des canaux ioniques.",
      image: "/images/science/electrophysiology.jpg",
    },
    {
      title: "Services CRO",
      description:
        "Services CRO spécialisés en électrophysiologie. Évaluation d'efficacité personnalisée avec des modèles animaux pour les maladies oculaires et sensorielles.",
      image: "/images/science/cro-lab.jpg",
    },
  ],
};

const ADVANTAGES: Record<
  ScienceLocale,
  { label: string; before: string; after: string; reduction: string }[]
> = {
  ko: [
    { label: "개발 기간", before: "10~15년", after: "3~5년", reduction: "70%" },
    {
      label: "후보물질 선택성",
      before: "Trial & Error",
      after: "AI 예측 100%",
      reduction: "",
    },
    {
      label: "부작용 (고체온증)",
      before: "미해결",
      after: "완전 해결",
      reduction: "",
    },
    {
      label: "비용 효율",
      before: "$2.6B 평균",
      after: "대폭 절감",
      reduction: "",
    },
  ],
  en: [
    {
      label: "Development Time",
      before: "10-15 years",
      after: "3-5 years",
      reduction: "70%",
    },
    {
      label: "Candidate Selectivity",
      before: "Trial & Error",
      after: "100% AI-Predicted",
      reduction: "",
    },
    {
      label: "Side Effects (Hyperthermia)",
      before: "Unresolved",
      after: "Fully Resolved",
      reduction: "",
    },
    {
      label: "Cost Efficiency",
      before: "$2.6B Average",
      after: "Significantly Reduced",
      reduction: "",
    },
  ],
  zh: [
    { label: "开发周期", before: "10~15年", after: "3~5年", reduction: "70%" },
    {
      label: "候选药物选择性",
      before: "试错法",
      after: "AI预测 100%",
      reduction: "",
    },
    {
      label: "副作用（高热症）",
      before: "未解决",
      after: "完全解决",
      reduction: "",
    },
    {
      label: "成本效率",
      before: "平均$2.6B",
      after: "大幅降低",
      reduction: "",
    },
  ],
  ja: [
    {
      label: "開発期間",
      before: "10〜15年",
      after: "3〜5年",
      reduction: "70%",
    },
    {
      label: "候補物質選択性",
      before: "Trial & Error",
      after: "AI予測 100%",
      reduction: "",
    },
    {
      label: "副作用（高体温症）",
      before: "未解決",
      after: "完全解決",
      reduction: "",
    },
    {
      label: "コスト効率",
      before: "平均$2.6B",
      after: "大幅削減",
      reduction: "",
    },
  ],
  es: [
    {
      label: "Tiempo de Desarrollo",
      before: "10-15 años",
      after: "3-5 años",
      reduction: "70%",
    },
    {
      label: "Selectividad de Candidatos",
      before: "Prueba y Error",
      after: "100% Predicción IA",
      reduction: "",
    },
    {
      label: "Efectos Secundarios (Hipertermia)",
      before: "Sin resolver",
      after: "Completamente resuelto",
      reduction: "",
    },
    {
      label: "Eficiencia de Costos",
      before: "Promedio $2.6B",
      after: "Significativamente reducido",
      reduction: "",
    },
  ],
  fr: [
    {
      label: "Durée de Développement",
      before: "10-15 ans",
      after: "3-5 ans",
      reduction: "70%",
    },
    {
      label: "Sélectivité des Candidats",
      before: "Essai-erreur",
      after: "100% Prédiction IA",
      reduction: "",
    },
    {
      label: "Effets Secondaires (Hyperthermie)",
      before: "Non résolu",
      after: "Entièrement résolu",
      reduction: "",
    },
    {
      label: "Efficacité des Coûts",
      before: "Moyenne $2.6B",
      after: "Significativement réduit",
      reduction: "",
    },
  ],
};

const CONTENT: Record<
  ScienceLocale,
  {
    tag: string;
    title: string[];
    description: string;
    compTag: string;
    compTitle: string[];
    thMetric: string;
    thTraditional: string;
    thRucia: string;
    thGap: string;
    beyondTitle: string[];
    beyondP1: string;
    beyondP2: string;
  }
> = {
  ko: {
    tag: "기술 플랫폼",
    title: ["The ", "RuCIA", " Platform"],
    description:
      "Rudacure Ion Channel Innovative Assessment — AI 기반 분자 예측과 고처리량 전기생리학 검증을 통합한 이온채널 신약개발 핵심 엔진입니다.",
    compTag: "경쟁 우위",
    compTitle: ["RuCIA vs ", "기존", " 신약개발"],
    thMetric: "지표",
    thTraditional: "기존",
    thRucia: "RuCIA",
    thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1:
      "이온채널은 통증, 온도 감각, 안구 표면 항상성의 핵심 조절자입니다. RuCIA는 이 신호의 근원을 정밀하게 조절하여, 증상이 아닌 원인을 치료합니다.",
    beyondP2:
      "Post-opioid 시대, FDA/EMA가 비중독성 대안을 우선시하는 규제 환경에서 RudaCure의 TRPV1 플랫폼은 글로벌 제약사의 핵심 파트너십 대상입니다.",
  },
  en: {
    tag: "Technology Platform",
    title: ["The ", "RuCIA", " Platform"],
    description:
      "Rudacure Ion Channel Innovative Assessment — the core engine integrating AI-driven molecular prediction with high-throughput electrophysiological validation.",
    compTag: "Competitive Advantage",
    compTitle: ["RuCIA vs ", "Traditional", " Drug Discovery"],
    thMetric: "Metric",
    thTraditional: "Traditional",
    thRucia: "RuCIA",
    thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1:
      "Ion channels are key regulators of pain, temperature sensation, and ocular surface homeostasis. RuCIA precisely modulates the source of these signals, treating causes rather than symptoms.",
    beyondP2:
      "In the post-opioid era, where FDA/EMA prioritize non-addictive alternatives, RudaCure's TRPV1 platform is a strategic partnership target for global pharmaceutical companies.",
  },
  zh: {
    tag: "技术平台",
    title: ["The ", "RuCIA", " Platform"],
    description:
      "Rudacure Ion Channel Innovative Assessment — 整合AI分子预测与高通量电生理学验证的离子通道新药开发核心引擎。",
    compTag: "竞争优势",
    compTitle: ["RuCIA vs ", "传统", "药物发现"],
    thMetric: "指标",
    thTraditional: "传统",
    thRucia: "RuCIA",
    thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1:
      "离子通道是疼痛、温度感觉和眼表稳态的关键调节因子。RuCIA精准调控这些信号的源头，治疗病因而非症状。",
    beyondP2:
      "在后阿片时代，FDA/EMA优先考虑非成瘾性替代方案的监管环境下，RudaCure的TRPV1平台是全球制药企业的核心合作目标。",
  },
  ja: {
    tag: "技術プラットフォーム",
    title: ["The ", "RuCIA", " Platform"],
    description:
      "Rudacure Ion Channel Innovative Assessment — AI駆動の分子予測とハイスループット電気生理学検証を統合したイオンチャネル創薬コアエンジン。",
    compTag: "競争優位性",
    compTitle: ["RuCIA vs ", "従来型", "創薬"],
    thMetric: "指標",
    thTraditional: "従来型",
    thRucia: "RuCIA",
    thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1:
      "イオンチャネルは痛覚、温度感覚、眼表面恒常性の重要な調節因子です。RuCIAはこれらのシグナルの根源を精密に調節し、症状ではなく原因を治療します。",
    beyondP2:
      "ポストオピオイド時代、FDA/EMAが非依存性代替薬を優先する規制環境において、RudaCureのTRPV1プラットフォームはグローバル製薬企業の戦略的パートナーシップ対象です。",
  },
  es: {
    tag: "Plataforma Tecnológica",
    title: ["The ", "RuCIA", " Platform"],
    description:
      "Rudacure Ion Channel Innovative Assessment — el motor central que integra predicción molecular impulsada por IA con validación electrofisiológica de alto rendimiento.",
    compTag: "Ventaja Competitiva",
    compTitle: ["RuCIA vs ", "Descubrimiento", " Tradicional de Fármacos"],
    thMetric: "Indicador",
    thTraditional: "Tradicional",
    thRucia: "RuCIA",
    thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1:
      "Los canales iónicos son reguladores clave del dolor, la sensación térmica y la homeostasis de la superficie ocular. RuCIA modula con precisión la fuente de estas señales, tratando causas en lugar de síntomas.",
    beyondP2:
      "En la era post-opioide, donde FDA/EMA priorizan alternativas no adictivas, la plataforma TRPV1 de RudaCure es un objetivo estratégico de asociación para empresas farmacéuticas globales.",
  },
  fr: {
    tag: "Plateforme Technologique",
    title: ["The ", "RuCIA", " Platform"],
    description:
      "Rudacure Ion Channel Innovative Assessment — le moteur central intégrant la prédiction moléculaire par IA avec la validation électrophysiologique à haut débit.",
    compTag: "Avantage Concurrentiel",
    compTitle: ["RuCIA vs ", "Découverte", " Traditionnelle de Médicaments"],
    thMetric: "Indicateur",
    thTraditional: "Traditionnel",
    thRucia: "RuCIA",
    thGap: "Gap",
    beyondTitle: ["Beyond the ", "Signal"],
    beyondP1:
      "Les canaux ioniques sont des régulateurs clés de la douleur, de la sensation thermique et de l'homéostasie de la surface oculaire. RuCIA module avec précision la source de ces signaux, traitant les causes plutôt que les symptômes.",
    beyondP2:
      "Dans l'ère post-opioïde, où la FDA/EMA priorisent les alternatives non addictives, la plateforme TRPV1 de RudaCure est un objectif stratégique de partenariat pour les entreprises pharmaceutiques mondiales.",
  },
};

const META_TITLES: Record<ScienceLocale, string> = {
  ko: "기술 플랫폼 | RudaCure",
  en: "Science | RudaCure",
  zh: "技术平台 | RudaCure",
  ja: "技術プラットフォーム | RudaCure",
  es: "Ciencia | RudaCure",
  fr: "Science | RudaCure",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sl = toScienceLocale(locale);
  const title = META_TITLES[sl];
  const description = CONTENT[sl].description;
  return {
    title,
    description,
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

export default async function SciencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = toScienceLocale(loc);
  const c = CONTENT[locale];
  const caps = CAPABILITIES[locale];
  const advs = ADVANTAGES[locale];

  return (
    <div className="pt-24">
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {c.tag}
            </p>
            <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
              {c.title[0]}
              <em className="font-playfair italic font-semibold text-gradient-emerald">
                {c.title[1]}
              </em>
              {c.title[2]}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              {c.description}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/science/hero-platform.jpg"
              alt="RuCIA Drug Discovery Platform"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {caps.map((cap) => (
            <div key={cap.title} className="liquid-glass overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {cap.title}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.compTag}
          </p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            {c.compTitle[0]}
            <em className="font-playfair italic font-semibold">
              {c.compTitle[1]}
            </em>
            {c.compTitle[2]}
          </h2>
          <div className="liquid-glass overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider p-4">
                    {c.thMetric}
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-600 uppercase tracking-wider p-4">
                    {c.thTraditional}
                  </th>
                  <th className="text-center text-xs font-semibold text-teal-600 uppercase tracking-wider p-4">
                    {c.thRucia}
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-600 uppercase tracking-wider p-4 w-20">
                    {c.thGap}
                  </th>
                </tr>
              </thead>
              <tbody>
                {advs.map((a) => (
                  <tr key={a.label} className="border-b border-gray-50">
                    <td className="p-4 text-sm text-gray-600 font-medium">
                      {a.label}
                    </td>
                    <td className="p-4 text-sm text-gray-600 text-center">
                      {a.before}
                    </td>
                    <td className="p-4 text-sm text-teal-600 text-center font-medium">
                      {a.after}
                    </td>
                    <td className="p-4 text-sm text-teal-500 text-center font-mono">
                      {a.reduction || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-light mb-6 text-gray-900">
              {c.beyondTitle[0]}
              <em className="font-playfair italic font-semibold">
                {c.beyondTitle[1]}
              </em>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{c.beyondP1}</p>
            <p className="text-gray-600 leading-relaxed">{c.beyondP2}</p>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/Gemini_Generated_Image_2hkt252hkt252hkt.png"
              alt="Ion Channel Research"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
}
