export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ko";

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

    // RuCIA section
    "rucia.tag": "Core Technology",
    "rucia.title1": "AI-Driven",
    "rucia.title2": "Selectivity",
    "rucia.description":
      "RuCIA(Rudacure Ion Channel Innovative Assessment)는 AI 기반 분자 시뮬레이션으로 이온채널-리간드 상호작용을 예측합니다. 기존 신약개발의 시행착오를 제거하고, TRPV1 길항제의 고질적 부작용인 고체온증을 완전히 해결했습니다.",
    "rucia.metric.time": "Time Reduction",
    "rucia.metric.time.sub": "vs Traditional Drug Discovery",
    "rucia.metric.selectivity": "Target Selectivity",
    "rucia.metric.selectivity.sub": "Zero Off-Target Effects",
    "rucia.metric.market": "Market Opportunity",
    "rucia.metric.market.sub": "Global Chronic Pain by 2030",

    // Pipeline section
    "pipeline.tag": "Therapeutic Programs",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "View News & Media →",

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

    // RuCIA section
    "rucia.tag": "Core Technology",
    "rucia.title1": "AI-Driven",
    "rucia.title2": "Selectivity",
    "rucia.description":
      "RuCIA (Rudacure Ion Channel Innovative Assessment) uses AI-based molecular simulation to predict ion channel-ligand interactions. It eliminates trial-and-error in drug development, fully resolving the hyperthermia side effect of first-generation TRPV1 antagonists.",
    "rucia.metric.time": "Time Reduction",
    "rucia.metric.time.sub": "vs Traditional Drug Discovery",
    "rucia.metric.selectivity": "Target Selectivity",
    "rucia.metric.selectivity.sub": "Zero Off-Target Effects",
    "rucia.metric.market": "Market Opportunity",
    "rucia.metric.market.sub": "Global Chronic Pain by 2030",

    // Pipeline section
    "pipeline.tag": "Therapeutic Programs",
    "pipeline.title1": "The",
    "pipeline.title2": "Pipeline",
    "pipeline.view_news": "View News & Media →",

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
} as const;

type TranslationKey = keyof (typeof translations)["ko"];

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.ko[key] ?? key;
}

export function getTranslations(locale: Locale) {
  return (key: TranslationKey) => t(locale, key);
}
