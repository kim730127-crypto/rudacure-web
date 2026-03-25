import { type Locale } from "@/lib/i18n";

type AdvisorItem = {
  name: string;
  title: string;
  affiliation: string;
  expertise: string[];
  description: string;
};

const HEADER = {
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
};

const ADVISORS: Record<string, AdvisorItem[]> = {
  ko: [
    {
      name: "김용호 박사",
      title: "SAB 의장 / 대표이사",
      affiliation: "가천대학교 의과대학 교수",
      expertise: ["이온채널 약리학", "통증 연구", "TRPV1"],
      description: "15년 이상 통증과 감각 질환 관련 기초의학 연구를 수행한 전문가. TRPV1 이온채널 조절 기반 신약개발 플랫폼의 창시자.",
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
    },
    {
      name: "권도훈 교수",
      title: "외부 자문",
      affiliation: "POSTECH (포항공과대학교)",
      expertise: ["TRPV1 구조분석", "단백질 구조생물학", "Cryo-EM"],
      description: "TRPV1 이온채널 구조 분석 전문가. 루다큐어와 TRPV1 구조-활성 관계 공동연구 수행 중.",
    },
  ],
  en: [
    {
      name: "Dr. Yong-ho Kim",
      title: "SAB Chair / CEO",
      affiliation: "Professor, Gachon University College of Medicine",
      expertise: ["Ion Channel Pharmacology", "Pain Research", "TRPV1"],
      description: "Over 15 years of basic medical research in pain and sensory disorders. Founder of the TRPV1 ion channel modulation-based drug development platform.",
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
    },
    {
      name: "Prof. Dohun Kwon",
      title: "External Advisor",
      affiliation: "POSTECH (Pohang University of Science and Technology)",
      expertise: ["TRPV1 Structural Analysis", "Protein Structural Biology", "Cryo-EM"],
      description: "Expert in TRPV1 ion channel structural analysis. Conducting joint research with RudaCure on TRPV1 structure-activity relationships.",
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Science Advisory Board | RudaCure" : "과학자문위원회 | RudaCure",
    description: HEADER[locale === "en" ? "en" : "ko"].description,
  };
}

export default async function SABPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "en" ? "en" : "ko") as Locale;
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
            <em className="font-['Playfair_Display'] italic font-semibold text-gradient-emerald">{h.title2}</em>
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">{h.description}</p>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisors.map((advisor) => (
            <div key={advisor.name} className="glass-card p-8">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{advisor.name}</h3>
                <p className="text-teal-600 text-sm font-medium mt-1">{advisor.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{advisor.affiliation}</p>
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
            <em className="font-['Playfair_Display'] italic font-semibold">
              {h.roleTitle.split(" ").slice(1).join(" ")}
            </em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {h.roleItems.map((item, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-4">
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
