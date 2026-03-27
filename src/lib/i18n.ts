export const LOCALES = ["ko", "en", "zh", "ja", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export type DataLocale = "ko" | "en";
export const DEFAULT_LOCALE: Locale = "ko";

/** Map any locale to a data locale (ko or en) for page data lookups */
export function toDataLocale(locale: Locale): DataLocale {
  return locale === "ko" ? "ko" : "en";
}

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/* ── Translation dictionaries ── */

const translations = {
  ko: {
    // Nav
    "nav.science": "Science",
    "nav.pipeline": "Pipeline",
    "nav.ir": "IR",
    "nav.news": "News Center",
    "nav.publications": "Publications",
    "nav.sab": "SAB",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero
    "hero.tagline": "2026 Strategic Vision",
    "hero.title1": "Healing the",
    "hero.title2": "Source of Pain",
    "hero.description":
      "RuCIA 플랫폼 기반 AI 분자 설계로 이온채널 선택성을 예측하고, 비마약성 통증 치료제를 개발합니다. 기존 신약개발 대비 개발 기간 70% 단축, 표적 선택성 100%를 실현합니다.",
    "hero.cta.pipeline": "Explore Pipeline",
    "hero.cta.science": "Our Science",

    // Core Technology section
    "rucia.tag": "Core Technology",
    "rucia.title1": "Membrane Target",
    "rucia.title2": "Drug Discovery",
    "rucia.description":
      "전기생리학(Electrophysiology) 기반 이온채널 활성 측정 기술로 세포막(Membrane) 표적 약물을 개발합니다. 패치클램프와 고처리량 전기생리학 검증을 통해 TRPV1 등 이온채널의 선택적 조절제를 발굴하고, 비마약성 통증/감각질환 치료제의 효능과 안전성을 실데이터로 검증합니다.",
    "rucia.metric.time": "Electrophysiology",
    "rucia.metric.time.sub": "패치클램프 기반 고처리량 검증",
    "rucia.metric.selectivity": "Membrane Target",
    "rucia.metric.selectivity.sub": "이온채널 선택적 조절",
    "rucia.metric.market": "$94B",
    "rucia.metric.market.sub": "글로벌 만성통증 시장 (2030)",

    // Pipeline section
    "pipeline.tag": "Therapeutic Programs",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "파이프라인 상세 →",

    // CTA
    "cta.title1": "Partner with",
    "cta.title2": "RudaCure",
    "cta.description": "글로벌 제약사와의 라이선싱, 공동연구, 투자에 관심이 있으시면 연락해 주세요.",
    "cta.button": "Get in Touch",

    // About
    "about.tag": "Company",
    "about.title1": "Our",
    "about.title2": "Journey",
    "about.description":
      "2018년 이온채널 전문 연구실에서 출발하여, 2026년 AI 기반 글로벌 바이오텍으로 성장하고 있는 루다큐어의 여정입니다.",

    // Science
    "science.tag": "Technology Platform",
    "science.title1": "The",
    "science.title2": "RuCIA",
    "science.title3": "Platform",
    "science.description":
      "Rudacure Ion Channel Innovative Assessment — AI 기반 분자 예측과 고처리량 전기생리학 검증을 통합한 이온채널 신약개발 핵심 엔진입니다.",

    // Pipeline page
    "pipeline.page.tag": "Drug Development",
    "pipeline.page.title1": "Therapeutic",
    "pipeline.page.title2": "Pipeline",
    "pipeline.page.description":
      "이온채널 표적 비마약성 치료제 파이프라인. AI 기반 RuCIA 플랫폼으로 발굴한 후보물질들이 글로벌 임상으로 진입하고 있습니다.",

    // News
    "news.tag": "Press & Media",
    "news.title1": "News",
    "news.title2": "Center",
    "news.description": "루다큐어의 최신 소식과 보도자료를 확인하실 수 있습니다.",
    "news.back": "목록으로 돌아가기",

    // Contact
    "contact.tag": "Get in Touch",
    "contact.title1": "Contact",
    "contact.title2": "Us",
    "contact.description": "파트너십, 라이선싱, 투자, CRO 서비스에 관한 문의를 환영합니다.",
    "contact.form.name": "이름",
    "contact.form.email": "이메일",
    "contact.form.company": "회사",
    "contact.form.type": "문의 유형",
    "contact.form.message": "메시지",
    "contact.form.submit": "보내기",

    // Footer
    "footer.description":
      "AI 기반 이온채널 신약개발 플랫폼으로 비마약성 통증/감각 질환 치료제를 개발합니다.",
  },

  en: {
    // Nav
    "nav.science": "Science",
    "nav.pipeline": "Pipeline",
    "nav.ir": "IR",
    "nav.news": "News Center",
    "nav.publications": "Publications",
    "nav.sab": "SAB",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero
    "hero.tagline": "2026 Strategic Vision",
    "hero.title1": "Healing the",
    "hero.title2": "Source of Pain",
    "hero.description":
      "Our RuCIA platform leverages AI molecular design to predict ion channel selectivity, developing non-opioid pain therapeutics. 70% faster development timeline with 100% target selectivity.",
    "hero.cta.pipeline": "Explore Pipeline",
    "hero.cta.science": "Our Science",

    // Core Technology section
    "rucia.tag": "Core Technology",
    "rucia.title1": "Membrane Target",
    "rucia.title2": "Drug Discovery",
    "rucia.description":
      "We develop membrane-targeted therapeutics using electrophysiology-based ion channel activity measurement. Through patch clamp and high-throughput electrophysiology validation, we discover selective modulators of ion channels such as TRPV1, verifying efficacy and safety of non-opioid pain and sensory disease treatments with real data.",
    "rucia.metric.time": "Electrophysiology",
    "rucia.metric.time.sub": "Patch Clamp HT Validation",
    "rucia.metric.selectivity": "Membrane Target",
    "rucia.metric.selectivity.sub": "Selective Ion Channel Modulation",
    "rucia.metric.market": "$94B",
    "rucia.metric.market.sub": "Global Chronic Pain by 2030",

    // Pipeline section
    "pipeline.tag": "Therapeutic Programs",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "Pipeline Details →",

    // CTA
    "cta.title1": "Partner with",
    "cta.title2": "RudaCure",
    "cta.description":
      "We welcome inquiries regarding global licensing, collaborative research, and investment opportunities.",
    "cta.button": "Get in Touch",

    // About
    "about.tag": "Company",
    "about.title1": "Our",
    "about.title2": "Journey",
    "about.description":
      "From a specialized ion channel laboratory in 2018 to a global AI-driven biotech company in 2026 — the RudaCure story.",

    // Science
    "science.tag": "Technology Platform",
    "science.title1": "The",
    "science.title2": "RuCIA",
    "science.title3": "Platform",
    "science.description":
      "Rudacure Ion Channel Innovative Assessment — the core engine integrating AI-driven molecular prediction with high-throughput electrophysiological validation.",

    // Pipeline page
    "pipeline.page.tag": "Drug Development",
    "pipeline.page.title1": "Therapeutic",
    "pipeline.page.title2": "Pipeline",
    "pipeline.page.description":
      "Ion channel-targeted non-opioid therapeutic pipeline. Candidates discovered through our RuCIA AI platform are advancing into global clinical trials.",

    // News
    "news.tag": "Press & Media",
    "news.title1": "News",
    "news.title2": "Center",
    "news.description": "Stay updated with the latest press releases and news from RudaCure.",
    "news.back": "Back to List",

    // Contact
    "contact.tag": "Get in Touch",
    "contact.title1": "Contact",
    "contact.title2": "Us",
    "contact.description":
      "We welcome inquiries regarding partnerships, licensing, investment, and CRO services.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.company": "Company",
    "contact.form.type": "Inquiry Type",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",

    // Footer
    "footer.description":
      "AI-driven ion channel drug discovery platform developing non-opioid therapeutics for pain and sensory diseases.",
  },

  zh: {
    "nav.science": "Science",
    "nav.pipeline": "Pipeline",
    "nav.ir": "IR",
    "nav.news": "新闻中心",
    "nav.publications": "专利/论文",
    "nav.sab": "SAB",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    "hero.tagline": "2026 战略愿景",
    "hero.title1": "Healing the",
    "hero.title2": "Source of Pain",
    "hero.description": "基于RuCIA平台的AI分子设计预测离子通道选择性，开发非阿片类镇痛药物。与传统新药开发相比，开发周期缩短70%，靶点选择性达100%。",
    "hero.cta.pipeline": "探索管线",
    "hero.cta.science": "核心技术",
    "rucia.tag": "核心技术",
    "rucia.title1": "Membrane Target",
    "rucia.title2": "Drug Discovery",
    "rucia.description": "基于电生理学的离子通道活性测量技术开发细胞膜靶向药物。通过膜片钳和高通量电生理学验证，发现TRPV1等离子通道的选择性调节剂，以实际数据验证非阿片类镇痛药和感觉疾病治疗药物的疗效与安全性。",
    "rucia.metric.time": "Electrophysiology",
    "rucia.metric.time.sub": "膜片钳高通量验证",
    "rucia.metric.selectivity": "Membrane Target",
    "rucia.metric.selectivity.sub": "离子通道选择性调节",
    "rucia.metric.market": "$94B",
    "rucia.metric.market.sub": "全球慢性疼痛市场 (2030)",
    "pipeline.tag": "治疗项目",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "管线详情 →",
    "cta.title1": "Partner with",
    "cta.title2": "RudaCure",
    "cta.description": "欢迎咨询全球许可、合作研究和投资机会。",
    "cta.button": "联系我们",
    "about.tag": "公司介绍",
    "about.title1": "Our",
    "about.title2": "Journey",
    "about.description": "从2018年的离子通道专业实验室出发，到2026年成长为基于AI的全球生物科技公司——RudaCure的历程。",
    "science.tag": "技术平台",
    "science.title1": "The",
    "science.title2": "RuCIA",
    "science.title3": "Platform",
    "science.description": "Rudacure Ion Channel Innovative Assessment — 整合AI分子预测与高通量电生理学验证的离子通道新药开发核心引擎。",
    "pipeline.page.tag": "药物开发",
    "pipeline.page.title1": "Therapeutic",
    "pipeline.page.title2": "Pipeline",
    "pipeline.page.description": "离子通道靶向非阿片类治疗管线。通过RuCIA AI平台发现的候选药物正进入全球临床试验。",
    "news.tag": "新闻媒体",
    "news.title1": "News",
    "news.title2": "Center",
    "news.description": "查看RudaCure的最新新闻和新闻稿。",
    "news.back": "返回列表",
    "contact.tag": "联系我们",
    "contact.title1": "Contact",
    "contact.title2": "Us",
    "contact.description": "欢迎咨询合作、许可、投资和CRO服务。",
    "contact.form.name": "姓名",
    "contact.form.email": "邮箱",
    "contact.form.company": "公司",
    "contact.form.type": "咨询类型",
    "contact.form.message": "留言",
    "contact.form.submit": "发送",
    "footer.description": "基于AI的离子通道新药开发平台，开发非阿片类疼痛/感觉疾病治疗药物。",
  },

  ja: {
    "nav.science": "Science",
    "nav.pipeline": "Pipeline",
    "nav.ir": "IR",
    "nav.news": "ニュースセンター",
    "nav.publications": "特許/論文",
    "nav.sab": "SAB",
    "nav.about": "会社概要",
    "nav.contact": "お問い合わせ",
    "hero.tagline": "2026 戦略ビジョン",
    "hero.title1": "Healing the",
    "hero.title2": "Source of Pain",
    "hero.description": "RuCIAプラットフォームベースのAI分子設計によりイオンチャネル選択性を予測し、非オピオイド系鎮痛薬を開発しています。従来の新薬開発と比較して開発期間を70%短縮、ターゲット選択性100%を実現します。",
    "hero.cta.pipeline": "パイプライン",
    "hero.cta.science": "コア技術",
    "rucia.tag": "コアテクノロジー",
    "rucia.title1": "Membrane Target",
    "rucia.title2": "Drug Discovery",
    "rucia.description": "電気生理学ベースのイオンチャネル活性測定技術で細胞膜ターゲット薬物を開発しています。パッチクランプとハイスループット電気生理学検証を通じてTRPV1等のイオンチャネル選択的モジュレーターを発掘し、非オピオイド系鎮痛薬・感覚疾患治療薬の有効性と安全性を実データで検証します。",
    "rucia.metric.time": "Electrophysiology",
    "rucia.metric.time.sub": "パッチクランプHT検証",
    "rucia.metric.selectivity": "Membrane Target",
    "rucia.metric.selectivity.sub": "イオンチャネル選択的調節",
    "rucia.metric.market": "$94B",
    "rucia.metric.market.sub": "世界の慢性疼痛市場 (2030)",
    "pipeline.tag": "治療プログラム",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "パイプライン詳細 →",
    "cta.title1": "Partner with",
    "cta.title2": "RudaCure",
    "cta.description": "グローバルライセンシング、共同研究、投資に関するお問い合わせを歓迎いたします。",
    "cta.button": "お問い合わせ",
    "about.tag": "会社概要",
    "about.title1": "Our",
    "about.title2": "Journey",
    "about.description": "2018年のイオンチャネル専門研究室から、2026年にAIベースのグローバルバイオテック企業へ成長するRudaCureの歩み。",
    "science.tag": "技術プラットフォーム",
    "science.title1": "The",
    "science.title2": "RuCIA",
    "science.title3": "Platform",
    "science.description": "Rudacure Ion Channel Innovative Assessment — AI駆動の分子予測とハイスループット電気生理学検証を統合したイオンチャネル新薬開発のコアエンジン。",
    "pipeline.page.tag": "医薬品開発",
    "pipeline.page.title1": "Therapeutic",
    "pipeline.page.title2": "Pipeline",
    "pipeline.page.description": "イオンチャネル標的非オピオイド治療パイプライン。RuCIA AIプラットフォームで発見された候補物質がグローバル臨床試験に進んでいます。",
    "news.tag": "プレス＆メディア",
    "news.title1": "News",
    "news.title2": "Center",
    "news.description": "RudaCureの最新ニュースとプレスリリースをご覧ください。",
    "news.back": "一覧に戻る",
    "contact.tag": "お問い合わせ",
    "contact.title1": "Contact",
    "contact.title2": "Us",
    "contact.description": "パートナーシップ、ライセンシング、投資、CROサービスに関するお問い合わせを歓迎いたします。",
    "contact.form.name": "お名前",
    "contact.form.email": "メールアドレス",
    "contact.form.company": "会社名",
    "contact.form.type": "お問い合わせ種別",
    "contact.form.message": "メッセージ",
    "contact.form.submit": "送信",
    "footer.description": "AI駆動のイオンチャネル新薬開発プラットフォームで、非オピオイド系疼痛・感覚疾患治療薬を開発しています。",
  },

  es: {
    "nav.science": "Ciencia",
    "nav.pipeline": "Pipeline",
    "nav.ir": "IR",
    "nav.news": "Noticias",
    "nav.publications": "Publicaciones",
    "nav.sab": "SAB",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "hero.tagline": "Visión Estratégica 2026",
    "hero.title1": "Healing the",
    "hero.title2": "Source of Pain",
    "hero.description": "Nuestra plataforma RuCIA utiliza diseño molecular con IA para predecir la selectividad de canales iónicos, desarrollando analgésicos no opioides. Reducción del 70% en tiempo de desarrollo con 100% de selectividad sobre el objetivo.",
    "hero.cta.pipeline": "Ver Pipeline",
    "hero.cta.science": "Nuestra Ciencia",
    "rucia.tag": "Tecnología Central",
    "rucia.title1": "Membrane Target",
    "rucia.title2": "Drug Discovery",
    "rucia.description": "Desarrollamos fármacos dirigidos a la membrana celular utilizando tecnología de medición de actividad de canales iónicos basada en electrofisiología. A través de patch clamp y validación electrofisiológica de alto rendimiento, descubrimos moduladores selectivos de canales iónicos como TRPV1, verificando la eficacia y seguridad con datos reales.",
    "rucia.metric.time": "Electrophysiology",
    "rucia.metric.time.sub": "Validación HT Patch Clamp",
    "rucia.metric.selectivity": "Membrane Target",
    "rucia.metric.selectivity.sub": "Modulación Selectiva de Canales Iónicos",
    "rucia.metric.market": "$94B",
    "rucia.metric.market.sub": "Mercado Global de Dolor Crónico (2030)",
    "pipeline.tag": "Programas Terapéuticos",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "Detalles del Pipeline →",
    "cta.title1": "Partner with",
    "cta.title2": "RudaCure",
    "cta.description": "Damos la bienvenida a consultas sobre licencias globales, investigación colaborativa y oportunidades de inversión.",
    "cta.button": "Contáctenos",
    "about.tag": "Empresa",
    "about.title1": "Our",
    "about.title2": "Journey",
    "about.description": "Desde un laboratorio especializado en canales iónicos en 2018 hasta una empresa biotecnológica global impulsada por IA en 2026 — la historia de RudaCure.",
    "science.tag": "Plataforma Tecnológica",
    "science.title1": "The",
    "science.title2": "RuCIA",
    "science.title3": "Platform",
    "science.description": "Rudacure Ion Channel Innovative Assessment — el motor central que integra predicción molecular impulsada por IA con validación electrofisiológica de alto rendimiento.",
    "pipeline.page.tag": "Desarrollo de Fármacos",
    "pipeline.page.title1": "Therapeutic",
    "pipeline.page.title2": "Pipeline",
    "pipeline.page.description": "Pipeline terapéutico no opioide dirigido a canales iónicos. Los candidatos descubiertos a través de nuestra plataforma RuCIA están avanzando hacia ensayos clínicos globales.",
    "news.tag": "Prensa y Medios",
    "news.title1": "News",
    "news.title2": "Center",
    "news.description": "Manténgase actualizado con las últimas noticias y comunicados de prensa de RudaCure.",
    "news.back": "Volver a la lista",
    "contact.tag": "Contáctenos",
    "contact.title1": "Contact",
    "contact.title2": "Us",
    "contact.description": "Damos la bienvenida a consultas sobre alianzas, licencias, inversión y servicios CRO.",
    "contact.form.name": "Nombre",
    "contact.form.email": "Correo electrónico",
    "contact.form.company": "Empresa",
    "contact.form.type": "Tipo de consulta",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar",
    "footer.description": "Plataforma de descubrimiento de fármacos basada en IA para canales iónicos, desarrollando terapias no opioides para dolor y enfermedades sensoriales.",
  },

  fr: {
    "nav.science": "Science",
    "nav.pipeline": "Pipeline",
    "nav.ir": "IR",
    "nav.news": "Actualités",
    "nav.publications": "Publications",
    "nav.sab": "SAB",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "hero.tagline": "Vision Stratégique 2026",
    "hero.title1": "Healing the",
    "hero.title2": "Source of Pain",
    "hero.description": "Notre plateforme RuCIA utilise la conception moléculaire par IA pour prédire la sélectivité des canaux ioniques, développant des analgésiques non opioïdes. Réduction de 70 % du temps de développement avec une sélectivité cible de 100 %.",
    "hero.cta.pipeline": "Voir le Pipeline",
    "hero.cta.science": "Notre Science",
    "rucia.tag": "Technologie Clé",
    "rucia.title1": "Membrane Target",
    "rucia.title2": "Drug Discovery",
    "rucia.description": "Nous développons des médicaments ciblant la membrane cellulaire grâce à la technologie de mesure d'activité des canaux ioniques basée sur l'électrophysiologie. Par le patch clamp et la validation électrophysiologique à haut débit, nous découvrons des modulateurs sélectifs des canaux ioniques tels que TRPV1, vérifiant l'efficacité et la sécurité avec des données réelles.",
    "rucia.metric.time": "Electrophysiology",
    "rucia.metric.time.sub": "Validation HT Patch Clamp",
    "rucia.metric.selectivity": "Membrane Target",
    "rucia.metric.selectivity.sub": "Modulation Sélective des Canaux Ioniques",
    "rucia.metric.market": "$94B",
    "rucia.metric.market.sub": "Marché Mondial de la Douleur Chronique (2030)",
    "pipeline.tag": "Programmes Thérapeutiques",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "Détails du Pipeline →",
    "cta.title1": "Partner with",
    "cta.title2": "RudaCure",
    "cta.description": "Nous accueillons les demandes concernant les licences mondiales, la recherche collaborative et les opportunités d'investissement.",
    "cta.button": "Nous Contacter",
    "about.tag": "Entreprise",
    "about.title1": "Our",
    "about.title2": "Journey",
    "about.description": "D'un laboratoire spécialisé en canaux ioniques en 2018 à une entreprise biotech mondiale propulsée par l'IA en 2026 — l'histoire de RudaCure.",
    "science.tag": "Plateforme Technologique",
    "science.title1": "The",
    "science.title2": "RuCIA",
    "science.title3": "Platform",
    "science.description": "Rudacure Ion Channel Innovative Assessment — le moteur central intégrant la prédiction moléculaire par IA avec la validation électrophysiologique à haut débit.",
    "pipeline.page.tag": "Développement de Médicaments",
    "pipeline.page.title1": "Therapeutic",
    "pipeline.page.title2": "Pipeline",
    "pipeline.page.description": "Pipeline thérapeutique non opioïde ciblant les canaux ioniques. Les candidats découverts via notre plateforme RuCIA progressent vers les essais cliniques mondiaux.",
    "news.tag": "Presse et Médias",
    "news.title1": "News",
    "news.title2": "Center",
    "news.description": "Restez informé des dernières actualités et communiqués de presse de RudaCure.",
    "news.back": "Retour à la liste",
    "contact.tag": "Nous Contacter",
    "contact.title1": "Contact",
    "contact.title2": "Us",
    "contact.description": "Nous accueillons les demandes concernant les partenariats, les licences, l'investissement et les services CRO.",
    "contact.form.name": "Nom",
    "contact.form.email": "E-mail",
    "contact.form.company": "Entreprise",
    "contact.form.type": "Type de demande",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer",
    "footer.description": "Plateforme de découverte de médicaments par IA ciblant les canaux ioniques, développant des thérapies non opioïdes pour la douleur et les maladies sensorielles.",
  },
} as const;

type TranslationKey = keyof (typeof translations)["ko"];

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? translations.ko[key] ?? key;
}

export function getTranslations(locale: Locale) {
  return (key: TranslationKey) => t(locale, key);
}
