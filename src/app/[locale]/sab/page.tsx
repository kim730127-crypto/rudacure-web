import Image from "next/image";
/* ── Local locale helper ── */
type SABLocale = "ko" | "en" | "zh" | "ja" | "es" | "fr";
const SAB_SUPPORTED: ReadonlySet<string> = new Set(["ko", "en", "zh", "ja", "es", "fr"]);
function toSABLocale(locale: string): SABLocale {
  return SAB_SUPPORTED.has(locale) ? (locale as SABLocale) : "en";
}

type AdvisorItem = {
  name: string;
  title: string;
  affiliation: string;
  expertise: string[];
  description: string;
  image?: string;
};

const HEADER: Record<SABLocale, {
  tag: string;
  title1: string;
  title2: string;
  description: string;
  roleTitle: string;
  roleItems: string[];
}> = {
  ko: {
    tag: "과학자문위원회",
    title1: "Science Advisory",
    title2: "Board",
    description: "루다큐어의 Science Advisory Board(SAB)는 이온채널 약리학, 통증 연구, 안과학, AI 신약개발 분야의 세계적 전문가들로 구성되어 핵심 파이프라인의 과학적 방향성을 자문합니다.",
    roleTitle: "SAB의 역할",
    roleItems: [
      "파이프라인 과학적 타당성 검증 및 전략 자문",
      "임상시험 설계 및 규제 전략 자문",
      "글로벌 학술 네트워크 연계",
      "신규 적응증 발굴 및 기술 확장 자문",
    ],
  },
  en: {
    tag: "Science Advisory Board",
    title1: "Science Advisory",
    title2: "Board",
    description: "RudaCure's Science Advisory Board (SAB) comprises world-class experts in ion channel pharmacology, pain research, ophthalmology, and AI-driven drug discovery, providing strategic guidance for our core pipeline.",
    roleTitle: "Role of the SAB",
    roleItems: [
      "Scientific validation and strategic guidance for pipeline programs",
      "Clinical trial design and regulatory strategy advisory",
      "Global academic network connectivity",
      "New indication discovery and technology expansion advisory",
    ],
  },
  zh: {
    tag: "科学顾问委员会",
    title1: "Science Advisory",
    title2: "Board",
    description: "RudaCure的科学顾问委员会（SAB）由离子通道药理学、疼痛研究、眼科学和AI驱动药物发现领域的世界级专家组成，为我们的核心管线提供战略指导。",
    roleTitle: "SAB的职责",
    roleItems: [
      "管线项目的科学验证和战略指导",
      "临床试验设计和监管策略咨询",
      "全球学术网络连接",
      "新适应症发现和技术扩展咨询",
    ],
  },
  ja: {
    tag: "科学諮問委員会",
    title1: "Science Advisory",
    title2: "Board",
    description: "RudaCureの科学諮問委員会（SAB）は、イオンチャネル薬理学、疼痛研究、眼科学、AI創薬分野の世界的な専門家で構成され、コアパイプラインの戦略的方向性を助言します。",
    roleTitle: "SABの役割",
    roleItems: [
      "パイプラインプログラムの科学的妥当性検証と戦略的助言",
      "臨床試験設計および規制戦略の助言",
      "グローバル学術ネットワークとの連携",
      "新規適応症の発掘と技術拡張に関する助言",
    ],
  },
  es: {
    tag: "Comité Científico Asesor",
    title1: "Science Advisory",
    title2: "Board",
    description: "El Comité Científico Asesor (SAB) de RudaCure está compuesto por expertos de clase mundial en farmacología de canales iónicos, investigación del dolor, oftalmología y descubrimiento de fármacos impulsado por IA, proporcionando orientación estratégica para nuestro pipeline principal.",
    roleTitle: "Rol del SAB",
    roleItems: [
      "Validación científica y orientación estratégica para los programas del pipeline",
      "Asesoramiento en diseño de ensayos clínicos y estrategia regulatoria",
      "Conectividad con redes académicas globales",
      "Asesoramiento en descubrimiento de nuevas indicaciones y expansión tecnológica",
    ],
  },
  fr: {
    tag: "Comité Consultatif Scientifique",
    title1: "Science Advisory",
    title2: "Board",
    description: "Le Comité Consultatif Scientifique (SAB) de RudaCure est composé d'experts de renommée mondiale en pharmacologie des canaux ioniques, recherche sur la douleur, ophtalmologie et découverte de médicaments par IA, fournissant des orientations stratégiques pour notre pipeline principal.",
    roleTitle: "Rôle du SAB",
    roleItems: [
      "Validation scientifique et orientation stratégique des programmes du pipeline",
      "Conseil en conception d'essais cliniques et stratégie réglementaire",
      "Connexion aux réseaux académiques mondiaux",
      "Conseil en découverte de nouvelles indications et expansion technologique",
    ],
  },
};

const ADVISORS: Record<SABLocale, AdvisorItem[]> = {
  ko: [
    {
      name: "김용호 박사",
      title: "SAB 의장 / 대표이사",
      affiliation: "가천대학교 의과대학 교수",
      expertise: ["이온채널 약리학", "통증 연구", "TRPV1"],
      description: "15년 이상 통증과 감각 질환 관련 기초의학 연구를 수행한 전문가. TRPV1 이온채널 조절 기반 신약개발 플랫폼의 창시자.",
      image: "/images/sab/yongho-kim.jpg",
    },
    {
      name: "신지윤 박사",
      title: "연구소장",
      affiliation: "루다큐어 중앙연구소",
      expertise: ["AI 신약개발", "분자 시뮬레이션", "컴퓨터 약물설계"],
      description: "AI를 이용한 약물개발 효율화 전문가. RuCIA 플랫폼의 핵심 기술 개발을 주도하며 구조생물학 기반 분자 설계를 담당.",
    },
    {
      name: "김동현 교수",
      title: "전무 / 임상 자문",
      affiliation: "고려대학교 안암병원 안과",
      expertise: ["안과학", "안구건조증", "각막질환"],
      description: "RCI001 장기 안전성 연구 및 쇼그렌 증후군 치료효과를 입증. 한국외안부학회 학술상, 태준안과논문상 최우수상 수상.",
      image: "/images/sab/donghyun-kim.jpg",
    },
    {
      name: "권도훈 교수",
      title: "외부 자문",
      affiliation: "POSTECH (포항공과대학교)",
      expertise: ["TRPV1 구조분석", "단백질 구조생물학", "Cryo-EM"],
      description: "TRPV1 이온채널 구조 분석 전문가. 루다큐어와 TRPV1 구조-활성 관계 공동연구 수행 중.",
      image: "/images/sab/dohun-kwon.jpg",
    },
    {
      name: "Dr. Anat Galor, MD, MSPH",
      title: "외부 자문",
      affiliation: "Bascom Palmer Eye Institute, University of Miami",
      expertise: ["안구건조증", "안구 통증", "안구 표면 질환"],
      description: "Bascom Palmer Eye Institute 안과학 교수. 안구건조증 및 신경병성 안구 통증 분야 세계적 권위자. NIH 다수 연구과제 수행, 논문 355편 이상 발표 (h-index 51). The Ophthalmologist Power List 선정.",
      image: "/images/sab/anat-galor.jpg",
    },
    {
      name: "Dr. Victor L. Perez, MD",
      title: "외부 자문",
      affiliation: "Bascom Palmer Eye Institute, University of Miami",
      expertise: ["안구 면역학", "각막질환", "안구건조증"],
      description: "Bascom Palmer Eye Institute 안과학 교수, 각막 연구 디렉터. TFOS DEWS III 글로벌 안구건조증 가이드라인을 주도. Harvard Medical School 수련, NIH/CDC 연구원 경력. The Ophthalmologist Power List 2026 선정.",
      image: "/images/sab/victor-perez.jpg",
    },
  ],
  en: [
    {
      name: "Dr. Yong-ho Kim",
      title: "SAB Chair / CEO",
      affiliation: "Professor, Gachon University College of Medicine",
      expertise: ["Ion Channel Pharmacology", "Pain Research", "TRPV1"],
      description: "Over 15 years of basic medical research in pain and sensory disorders. Founder of the TRPV1 ion channel modulation-based drug development platform.",
      image: "/images/sab/yongho-kim.jpg",
    },
    {
      name: "Dr. Jiyoon Shin",
      title: "Research Director",
      affiliation: "RudaCure Central Research Institute",
      expertise: ["AI Drug Discovery", "Molecular Simulation", "Computational Drug Design"],
      description: "Expert in AI-driven drug development efficiency. Leads core technology development of the RuCIA platform with structure-based molecular design.",
    },
    {
      name: "Prof. Donghyun Kim",
      title: "EVP / Clinical Advisor",
      affiliation: "Korea University Anam Hospital, Dept. of Ophthalmology",
      expertise: ["Ophthalmology", "Dry Eye Disease", "Corneal Disorders"],
      description: "Demonstrated RCI001 long-term safety and Sjögren's syndrome efficacy. Recipient of KOES Academic Award and Taejun Best Ophthalmology Paper Award.",
      image: "/images/sab/donghyun-kim.jpg",
    },
    {
      name: "Prof. Dohun Kwon",
      title: "External Advisor",
      affiliation: "POSTECH (Pohang University of Science and Technology)",
      expertise: ["TRPV1 Structural Analysis", "Protein Structural Biology", "Cryo-EM"],
      description: "Expert in TRPV1 ion channel structural analysis. Conducting joint research with RudaCure on TRPV1 structure-activity relationships.",
      image: "/images/sab/dohun-kwon.jpg",
    },
    {
      name: "Dr. Anat Galor, MD, MSPH",
      title: "External Advisor",
      affiliation: "Bascom Palmer Eye Institute, University of Miami",
      expertise: ["Dry Eye Disease", "Ocular Pain", "Ocular Surface Disease"],
      description: "Professor of Ophthalmology at Bascom Palmer Eye Institute. World-renowned authority on dry eye disease and neuropathic ocular pain. PI on multiple NIH grants, 355+ publications (h-index 51). Named to The Ophthalmologist Power List.",
      image: "/images/sab/anat-galor.jpg",
    },
    {
      name: "Dr. Victor L. Perez, MD",
      title: "External Advisor",
      affiliation: "Bascom Palmer Eye Institute, University of Miami",
      expertise: ["Ocular Immunology", "Corneal Disease", "Dry Eye Disease"],
      description: "Professor of Ophthalmology and Director of Cornea Research at Bascom Palmer Eye Institute. Led the TFOS DEWS III global dry eye consensus guidelines. Harvard Medical School trained, NIH/CDC research fellow. The Ophthalmologist Power List 2026.",
      image: "/images/sab/victor-perez.jpg",
    },
  ],
  zh: [
    {
      name: "Dr. Yong-ho Kim",
      title: "SAB主席 / 首席执行官",
      affiliation: "嘉泉大学医学院教授",
      expertise: ["离子通道药理学", "疼痛研究", "TRPV1"],
      description: "在疼痛和感觉障碍领域拥有超过15年的基础医学研究经验。TRPV1离子通道调控药物开发平台的创始人。",
      image: "/images/sab/yongho-kim.jpg",
    },
    {
      name: "Dr. Jiyoon Shin",
      title: "研究总监",
      affiliation: "RudaCure中央研究院",
      expertise: ["AI药物发现", "分子模拟", "计算药物设计"],
      description: "AI驱动药物开发效率化专家。主导RuCIA平台核心技术开发，负责基于结构的分子设计。",
    },
    {
      name: "Prof. Donghyun Kim",
      title: "执行副总裁 / 临床顾问",
      affiliation: "高丽大学安岩医院眼科",
      expertise: ["眼科学", "干眼症", "角膜疾病"],
      description: "验证了RCI001的长期安全性和干燥综合征疗效。荣获韩国外眼部学会学术奖和太俊眼科最佳论文奖。",
      image: "/images/sab/donghyun-kim.jpg",
    },
    {
      name: "Prof. Dohun Kwon",
      title: "外部顾问",
      affiliation: "浦项工科大学（POSTECH）",
      expertise: ["TRPV1结构分析", "蛋白质结构生物学", "冷冻电镜"],
      description: "TRPV1离子通道结构分析专家。与RudaCure合作开展TRPV1构效关系联合研究。",
      image: "/images/sab/dohun-kwon.jpg",
    },
    {
      name: "Dr. Anat Galor, MD, MSPH",
      title: "外部顾问",
      affiliation: "迈阿密大学Bascom Palmer眼科研究所",
      expertise: ["干眼症", "眼部疼痛", "眼表疾病"],
      description: "Bascom Palmer眼科研究所眼科学教授。干眼症和神经性眼部疼痛领域的世界权威。主持多项NIH资助项目，发表论文355篇以上（h指数51）。入选The Ophthalmologist Power List。",
      image: "/images/sab/anat-galor.jpg",
    },
    {
      name: "Dr. Victor L. Perez, MD",
      title: "外部顾问",
      affiliation: "迈阿密大学Bascom Palmer眼科研究所",
      expertise: ["眼部免疫学", "角膜疾病", "干眼症"],
      description: "Bascom Palmer眼科研究所眼科学教授兼角膜研究主任。主导TFOS DEWS III全球干眼症共识指南。哈佛医学院培训，NIH/CDC研究员。入选The Ophthalmologist Power List 2026。",
      image: "/images/sab/victor-perez.jpg",
    },
  ],
  ja: [
    {
      name: "Dr. Yong-ho Kim",
      title: "SAB議長 / CEO",
      affiliation: "嘉泉大学医学部教授",
      expertise: ["イオンチャネル薬理学", "疼痛研究", "TRPV1"],
      description: "疼痛および感覚障害に関する15年以上の基礎医学研究実績を持つ専門家。TRPV1イオンチャネル調節に基づく創薬プラットフォームの創設者。",
      image: "/images/sab/yongho-kim.jpg",
    },
    {
      name: "Dr. Jiyoon Shin",
      title: "研究所長",
      affiliation: "RudaCure中央研究所",
      expertise: ["AI創薬", "分子シミュレーション", "計算薬物設計"],
      description: "AI駆動型創薬効率化の専門家。RuCIAプラットフォームのコア技術開発を主導し、構造ベースの分子設計を担当。",
    },
    {
      name: "Prof. Donghyun Kim",
      title: "専務 / 臨床アドバイザー",
      affiliation: "高麗大学安岩病院眼科",
      expertise: ["眼科学", "ドライアイ", "角膜疾患"],
      description: "RCI001の長期安全性およびシェーグレン症候群の治療効果を実証。韓国外眼部学会学術賞、太俊眼科論文最優秀賞を受賞。",
      image: "/images/sab/donghyun-kim.jpg",
    },
    {
      name: "Prof. Dohun Kwon",
      title: "外部アドバイザー",
      affiliation: "POSTECH（浦項工科大学）",
      expertise: ["TRPV1構造解析", "タンパク質構造生物学", "クライオ電子顕微鏡"],
      description: "TRPV1イオンチャネル構造解析の専門家。RudaCureとTRPV1の構造活性相関に関する共同研究を実施中。",
      image: "/images/sab/dohun-kwon.jpg",
    },
    {
      name: "Dr. Anat Galor, MD, MSPH",
      title: "外部アドバイザー",
      affiliation: "マイアミ大学Bascom Palmer Eye Institute",
      expertise: ["ドライアイ", "眼痛", "眼表面疾患"],
      description: "Bascom Palmer Eye Institute眼科学教授。ドライアイおよび神経障害性眼痛分野の世界的権威。NIH複数研究課題を遂行、論文355編以上発表（h指数51）。The Ophthalmologist Power Listに選出。",
      image: "/images/sab/anat-galor.jpg",
    },
    {
      name: "Dr. Victor L. Perez, MD",
      title: "外部アドバイザー",
      affiliation: "マイアミ大学Bascom Palmer Eye Institute",
      expertise: ["眼免疫学", "角膜疾患", "ドライアイ"],
      description: "Bascom Palmer Eye Institute眼科学教授兼角膜研究ディレクター。TFOS DEWS IIIグローバルドライアイコンセンサスガイドラインを主導。ハーバード大学医学部修練、NIH/CDC研究員。The Ophthalmologist Power List 2026に選出。",
      image: "/images/sab/victor-perez.jpg",
    },
  ],
  es: [
    {
      name: "Dr. Yong-ho Kim",
      title: "Presidente del SAB / CEO",
      affiliation: "Profesor, Facultad de Medicina de la Universidad Gachon",
      expertise: ["Farmacología de canales iónicos", "Investigación del dolor", "TRPV1"],
      description: "Más de 15 años de investigación médica básica en dolor y trastornos sensoriales. Fundador de la plataforma de desarrollo de fármacos basada en la modulación del canal iónico TRPV1.",
      image: "/images/sab/yongho-kim.jpg",
    },
    {
      name: "Dr. Jiyoon Shin",
      title: "Directora de Investigación",
      affiliation: "Instituto Central de Investigación de RudaCure",
      expertise: ["Descubrimiento de fármacos con IA", "Simulación molecular", "Diseño computacional de fármacos"],
      description: "Experta en eficiencia del desarrollo de fármacos impulsado por IA. Lidera el desarrollo de la tecnología central de la plataforma RuCIA con diseño molecular basado en estructuras.",
    },
    {
      name: "Prof. Donghyun Kim",
      title: "Vicepresidente ejecutivo / Asesor clínico",
      affiliation: "Hospital Anam de la Universidad de Corea, Departamento de Oftalmología",
      expertise: ["Oftalmología", "Ojo seco", "Trastornos corneales"],
      description: "Demostró la seguridad a largo plazo de RCI001 y la eficacia en el síndrome de Sjögren. Galardonado con el Premio Académico KOES y el Premio al Mejor Artículo Oftalmológico Taejun.",
      image: "/images/sab/donghyun-kim.jpg",
    },
    {
      name: "Prof. Dohun Kwon",
      title: "Asesor externo",
      affiliation: "POSTECH (Universidad de Ciencia y Tecnología de Pohang)",
      expertise: ["Análisis estructural de TRPV1", "Biología estructural de proteínas", "Cryo-EM"],
      description: "Experto en análisis estructural del canal iónico TRPV1. Realiza investigación conjunta con RudaCure sobre relaciones estructura-actividad de TRPV1.",
      image: "/images/sab/dohun-kwon.jpg",
    },
    {
      name: "Dr. Anat Galor, MD, MSPH",
      title: "Asesora externa",
      affiliation: "Bascom Palmer Eye Institute, Universidad de Miami",
      expertise: ["Ojo seco", "Dolor ocular", "Enfermedad de la superficie ocular"],
      description: "Profesora de Oftalmología en el Bascom Palmer Eye Institute. Autoridad mundial en ojo seco y dolor ocular neuropático. Investigadora principal en múltiples subvenciones del NIH, más de 355 publicaciones (índice h 51). Nombrada en The Ophthalmologist Power List.",
      image: "/images/sab/anat-galor.jpg",
    },
    {
      name: "Dr. Victor L. Perez, MD",
      title: "Asesor externo",
      affiliation: "Bascom Palmer Eye Institute, Universidad de Miami",
      expertise: ["Inmunología ocular", "Enfermedad corneal", "Ojo seco"],
      description: "Profesor de Oftalmología y Director de Investigación Corneal en el Bascom Palmer Eye Institute. Lideró las guías de consenso global TFOS DEWS III sobre ojo seco. Formado en Harvard Medical School, investigador del NIH/CDC. The Ophthalmologist Power List 2026.",
      image: "/images/sab/victor-perez.jpg",
    },
  ],
  fr: [
    {
      name: "Dr. Yong-ho Kim",
      title: "Président du SAB / PDG",
      affiliation: "Professeur, Faculté de Médecine de l'Université Gachon",
      expertise: ["Pharmacologie des canaux ioniques", "Recherche sur la douleur", "TRPV1"],
      description: "Plus de 15 ans de recherche médicale fondamentale sur la douleur et les troubles sensoriels. Fondateur de la plateforme de développement de médicaments basée sur la modulation du canal ionique TRPV1.",
      image: "/images/sab/yongho-kim.jpg",
    },
    {
      name: "Dr. Jiyoon Shin",
      title: "Directrice de recherche",
      affiliation: "Institut Central de Recherche de RudaCure",
      expertise: ["Découverte de médicaments par IA", "Simulation moléculaire", "Conception computationnelle de médicaments"],
      description: "Experte en efficacité du développement de médicaments par IA. Dirige le développement technologique central de la plateforme RuCIA avec conception moléculaire basée sur les structures.",
    },
    {
      name: "Prof. Donghyun Kim",
      title: "Vice-président exécutif / Conseiller clinique",
      affiliation: "Hôpital Anam de l'Université de Corée, Département d'Ophtalmologie",
      expertise: ["Ophtalmologie", "Sécheresse oculaire", "Maladies cornéennes"],
      description: "A démontré la sécurité à long terme du RCI001 et l'efficacité dans le syndrome de Sjögren. Lauréat du Prix Académique KOES et du Prix du Meilleur Article Ophtalmologique Taejun.",
      image: "/images/sab/donghyun-kim.jpg",
    },
    {
      name: "Prof. Dohun Kwon",
      title: "Conseiller externe",
      affiliation: "POSTECH (Université des Sciences et Technologies de Pohang)",
      expertise: ["Analyse structurale de TRPV1", "Biologie structurale des protéines", "Cryo-EM"],
      description: "Expert en analyse structurale du canal ionique TRPV1. Mène des recherches conjointes avec RudaCure sur les relations structure-activité de TRPV1.",
      image: "/images/sab/dohun-kwon.jpg",
    },
    {
      name: "Dr. Anat Galor, MD, MSPH",
      title: "Conseillère externe",
      affiliation: "Bascom Palmer Eye Institute, Université de Miami",
      expertise: ["Sécheresse oculaire", "Douleur oculaire", "Maladie de la surface oculaire"],
      description: "Professeure d'Ophtalmologie au Bascom Palmer Eye Institute. Autorité mondiale en sécheresse oculaire et douleur oculaire neuropathique. Chercheuse principale sur plusieurs subventions du NIH, plus de 355 publications (indice h 51). Nommée dans The Ophthalmologist Power List.",
      image: "/images/sab/anat-galor.jpg",
    },
    {
      name: "Dr. Victor L. Perez, MD",
      title: "Conseiller externe",
      affiliation: "Bascom Palmer Eye Institute, Université de Miami",
      expertise: ["Immunologie oculaire", "Maladie cornéenne", "Sécheresse oculaire"],
      description: "Professeur d'Ophtalmologie et Directeur de la Recherche Cornéenne au Bascom Palmer Eye Institute. A dirigé les lignes directrices consensuelles mondiales TFOS DEWS III sur la sécheresse oculaire. Formé à Harvard Medical School, chercheur NIH/CDC. The Ophthalmologist Power List 2026.",
      image: "/images/sab/victor-perez.jpg",
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sl = toSABLocale(locale);
  return {
    title: locale === "ko" ? "과학자문위원회 | RudaCure" : "Science Advisory Board | RudaCure",
    description: HEADER[sl].description,
  };
}

export default async function SABPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = toSABLocale(loc);
  const h = HEADER[locale];
  const advisors = ADVISORS[locale];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{h.tag}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {h.title1}{" "}
            <em className="font-playfair italic font-semibold text-gradient-emerald">{h.title2}</em>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">{h.description}</p>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisors.map((advisor) => (
            <div key={advisor.name} className="liquid-glass p-8">
              <div className="flex items-start gap-5 mb-4">
                {advisor.image ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                    <Image src={advisor.image} alt={advisor.name} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center shrink-0">
                    <span className="text-teal-600 text-lg font-semibold">{advisor.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{advisor.name}</h3>
                  <p className="text-teal-600 text-sm font-medium mt-1">{advisor.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{advisor.affiliation}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {advisor.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[15px] text-gray-600 leading-relaxed">{advisor.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAB Role */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-8 text-gray-900">
            {h.roleTitle.split(" ")[0]}{" "}
            <em className="font-playfair italic font-semibold">
              {h.roleTitle.split(" ").slice(1).join(" ")}
            </em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {h.roleItems.map((item, i) => (
              <div key={i} className="liquid-glass p-6 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                  <span className="text-teal-600 text-sm font-semibold">{i + 1}</span>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
