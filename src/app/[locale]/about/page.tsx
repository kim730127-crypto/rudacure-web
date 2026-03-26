import { type Locale, toDataLocale } from "@/lib/i18n";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
  events?: { month: string; text: string }[];
};

const TIMELINE: Record<string, TimelineItem[]> = {
  ko: [
    {
      year: "2026", title: "Series B & 글로벌 확장", highlight: true,
      description: "RCI001 FDA Phase 2 중간 결과. RuCIA 플랫폼 희귀 감각질환 확장. Pre-IPO 펀딩 및 일본/유럽 라이선싱.",
      events: [
        { month: "Q1", text: "Pre-IPO 펀딩 라운드 진행" },
        { month: "Q2", text: "RCI001 FDA Phase 2 중간 결과 발표 예정" },
      ],
    },
    {
      year: "2025", title: "임상 & IPO 마일스톤",
      description: "RCI001 FDA Phase 2 승인. IPO 주관사 선정. 인천 우수기업·하이서울기업 인증.",
      events: [
        { month: "01월", text: "2025 시무식 및 우수사원·모범사원 시상" },
        { month: "02월", text: "포스텍 권도훈 교수 TRPV1 구조분석 세미나" },
        { month: "03월", text: "RCI001 임상 2상 자문회의 (안과 전문의 13인). Bio-Europe Spring 참석 및 프랑스 동물의약품 회사 미팅" },
        { month: "04월", text: "ESG 경영 실천 — 안양천 플로깅 & 헌혈 캠페인" },
        { month: "05월", text: "농식품벤처육성사업 선정 (동물용 유전자 진통제). Bio-Korea 부스 운영. 신테카바이오 산학연 R&D 선정" },
        { month: "06월", text: "BIO-USA 글로벌 파트너링 (Santen·Thea). 유럽건성안학회 RCI001 발표" },
        { month: "07월", text: "7주년 창립기념식 및 5년 장기근속자 포상. 상반기 업무평가 워크샵" },
        { month: "08월", text: "RCI001 FDA Phase 2 IND 승인 획득. DT&CRO 연구협력 MOU. 일본 원천 특허 등록 완료" },
        { month: "10월", text: "하이서울기업 인증. Pain Therapeutics Summit 참석" },
        { month: "11월", text: "인천시 우수기업 선정. SfN 학회 차세대 진통제 연구 발표" },
        { month: "12월", text: "IPO 주관사 선정 PT. 유기묘 보호시설 사료 1톤 기부 (CSR)" },
      ],
    },
    {
      year: "2024", title: "임상 검증 & 유니콘 선정",
      description: "RCI001 국내 임상 1상 돌입. 아기유니콘 선정. 스케일업 TIPS 12억원.",
      events: [
        { month: "01월", text: "2024 시무식 개최" },
        { month: "03월", text: "RCI001 국내 임상 1상 승인. 프랑스 동물의약품 회사 방문 (동물용 RCI001AH 공동연구)" },
        { month: "04월", text: "IBK창공 유럽 액셀러레이팅 프로그램 선정" },
        { month: "05월", text: "ESG 경영 본격 실천. Bio-Korea 바이오헬스 특별관 참가" },
        { month: "06월", text: "중소벤처기업부 '아기유니콘' 선정. BIO-USA 2024 참석" },
        { month: "10월", text: "스케일업 TIPS 선정 (3년간 12억원). 쇼그렌 증후군 모델 RCI001 효능 입증" },
        { month: "12월", text: "코어 이노베이션 코리아 2024 최우수상. 신테카바이오 항암제 물질 발굴 계약" },
      ],
    },
    {
      year: "2023", title: "전략적 파트너십 & 글로벌 진출",
      description: "한림제약 기술이전 2건. 동물의약품 사업 착수. ACR 학회 발표.",
      events: [
        { month: "01월", text: "한림제약 각막손상 치료제 RCI001U 기술이전 계약. 한림제약 Rac1 저해제 70억 L/O" },
        { month: "02월", text: "통증 신규 펩타이드 특허 출원" },
        { month: "03월", text: "동물의약품 개발사 온힐·온힐펫과 협력. Bio-EU 파트너링" },
        { month: "04월", text: "고용노동부 강소기업 선정. 창업도약패키지 선정" },
        { month: "05월", text: "다래전략사업화센터 기술특례 컨설팅 계약" },
        { month: "06월", text: "ASCO 미국 임상종양학회 사절단 참석" },
        { month: "09월", text: "점안제 특허 출원 완료" },
        { month: "10월", text: "서울형 기술사업화 지원사업 선정. 안암병원 김동현 교수 RCI001 장기 안전성 입증. 싱가포르 Global Innovation Roadshow" },
        { month: "11월", text: "ACR 학회 TRPV1 골관절염 치료제 발표. KICDC/Defy Pitch 수상. 바이오유럽 2023 참석" },
        { month: "12월", text: "한림대춘천성심병원-이온셀 CAR-T/ADC 공동연구 MOU" },
      ],
    },
    {
      year: "2022", title: "투자유치 & 글로벌 인지도",
      description: "시리즈A 60억원 투자유치. RESI 3위 입상. 미국 임상 준비.",
      events: [
        { month: "02월", text: "JPM 미팅 성황. KIC 워싱턴 바이오 스타트업 챌린지" },
        { month: "04월", text: "신한 스퀘어브릿지 인천 선정. INNOBIZ 인증. KIC 워싱턴 협력 미팅" },
        { month: "05월", text: "시리즈A 60억원 투자유치. ARVO 학회 참석" },
        { month: "06월", text: "BIO-USA 한국관 참가. RCI001 안구건조증 혁신 신약 주목" },
        { month: "08월", text: "UKC 2022 IR Competition SBA상 수상. 서울 가산 사무소 이전. 가천대 공동연구 국가신약과제 선정" },
        { month: "09월", text: "RESI Innovator's Pitch Challenge 3위 입상" },
        { month: "10월", text: "TRPV1 특허 일본/중국 출원" },
        { month: "11월", text: "인재육성형 중소기업 선정" },
        { month: "12월", text: "가족친화인증 및 청년친화 강소기업 선정" },
      ],
    },
    {
      year: "2021", title: "기술이전 & 미국 법인 설립",
      description: "한림제약 150억원 규모 기술이전. RudaCure U.S.A. 설립. 다수 정부과제 선정.",
      events: [
        { month: "01월", text: "선바이오 비임상 CRO 연간계약. TRPV1 특허 미국 출원" },
        { month: "03월", text: "미국 임상 CRO(Ora) 업무계약. 인천스타트업파크 이주" },
        { month: "04월", text: "한림제약 150억원 규모 RCI001 기술이전 계약. 김동현 교수 Nature 자매지 논문 발표. 바이오의료기술개발사업 선정" },
        { month: "05월", text: "Big3 사업화 과제 선정. 의사창업 공동연구 기반구축" },
        { month: "06월", text: "김동현 전무 TOFS 위원회 멤버 선정. BioKorea 참석" },
        { month: "08월", text: "RudaCure U.S.A. Inc 설립. 과기부 감염병 대응 플랫폼 과제 선정. 바이오아이코어사업 선정" },
        { month: "12월", text: "국내 TRPV1 특허 확보. 김동현 교수 외안부학회 학술상·태준안과논문상 최우수상" },
      ],
    },
    {
      year: "2020", title: "파이프라인 구축",
      description: "RCI001 임상시험 기반 마련. BIG3 혁신성장 선정. 인천스타트업파크 입주.",
      events: [
        { month: "02월", text: "통증·안질환 신약연구 본격화" },
        { month: "06월", text: "R&D 재발견 프로젝트 선정. BIG3 혁신분야 창업패키지 선정" },
        { month: "07월", text: "RCI001 임상시험 기반 마련. 인천스타트업파크 입주 (Boost Startup Journey)" },
        { month: "08월", text: "글로벌 IP 지원 프로그램 선정" },
        { month: "12월", text: "선바이오 MucoPEG 미국임상 수탁 계약. 인천시 R&D 컨설팅 지원사업 선정" },
      ],
    },
    {
      year: "2019", title: "초기 연구 & 기술이전",
      description: "길병원 안질환 특허 기술이전. 아시아 통증 심포지엄 개최.",
      events: [
        { month: "12월", text: "길병원 노인성 안질환 특허 기술이전 계약. 아시아 통증 심포지엄 인천 송도 개최. 분당차병원 척추질환 재생치료제 공동개발" },
      ],
    },
    {
      year: "2018", title: "창립",
      description: "김용호 대표(가천대학교) 설립. 이온채널 표적 통증/감각질환 치료제 연구 시작.",
    },
  ],
  en: [
    {
      year: "2026", title: "Series B & Global Expansion", highlight: true,
      description: "RCI001 FDA Phase 2 interim results. RuCIA platform expansion into rare sensory diseases. Pre-IPO funding and Japan/Europe licensing deals.",
      events: [
        { month: "Q1", text: "Pre-IPO funding round in progress" },
        { month: "Q2", text: "RCI001 FDA Phase 2 interim results expected" },
      ],
    },
    {
      year: "2025", title: "Clinical & IPO Milestones",
      description: "RCI001 FDA Phase 2 IND approval. IPO underwriter selection. Incheon Outstanding Company & Hi-Seoul certification.",
      events: [
        { month: "Jan", text: "2025 New Year ceremony & Outstanding/Model Employee awards" },
        { month: "Feb", text: "POSTECH Prof. Kwon TRPV1 structural analysis seminar" },
        { month: "Mar", text: "RCI001 Phase 2 advisory meeting (13 ophthalmologists). Bio-Europe Spring & French Veterinary Pharma meeting" },
        { month: "Apr", text: "ESG activities — Anyang Stream plogging & blood donation campaign" },
        { month: "May", text: "Agri-Food Venture Program selected (veterinary gene therapy). Bio-Korea booth. Syntekabio Collabo R&D" },
        { month: "Jun", text: "BIO-USA global partnering (Santen, Thea). European Dry Eye Society — RCI001 presentation" },
        { month: "Jul", text: "7th anniversary celebration & 5-year service awards. H1 performance review workshop" },
        { month: "Aug", text: "RCI001 FDA Phase 2 IND approval. DT&CRO research MOU signed. Japan patent registered" },
        { month: "Oct", text: "Hi-Seoul Enterprise certification. Pain Therapeutics Summit attendance" },
        { month: "Nov", text: "Incheon Outstanding Company award. SfN next-gen pain therapeutics presentation" },
        { month: "Dec", text: "IPO underwriter selection. 1-ton cat food donation to stray cat shelter (CSR)" },
      ],
    },
    {
      year: "2024", title: "Clinical Validation & Unicorn Selection",
      description: "RCI001 domestic Phase 1 clinical trial. Baby Unicorn designation. Scale-up TIPS KRW 1.2B.",
      events: [
        { month: "Jan", text: "2024 New Year ceremony" },
        { month: "Mar", text: "RCI001 domestic Phase 1 clinical trial approval. Visit to French Veterinary Pharma (RCI001AH co-development)" },
        { month: "Apr", text: "IBK Innovation Hub Europe accelerator program" },
        { month: "May", text: "ESG management initiatives launched. Bio-Korea BioHealth pavilion" },
        { month: "Jun", text: "Selected as 'Baby Unicorn' by Ministry of SMEs. BIO-USA 2024 attendance" },
        { month: "Oct", text: "Scale-up TIPS selected (KRW 1.2B over 3 years). RCI001 efficacy in Sjögren's syndrome model" },
        { month: "Dec", text: "Core Innovation Korea 2024 Grand Prize. Syntekabio anticancer drug discovery contract" },
      ],
    },
    {
      year: "2023", title: "Strategic Partnerships & Global Reach",
      description: "Two Hanlim Pharma tech transfers. Veterinary pharma initiative. ACR conference presentation.",
      events: [
        { month: "Jan", text: "Hanlim Pharma corneal treatment RCI001U tech transfer. Rac1 inhibitor KRW 7B L/O deal" },
        { month: "Feb", text: "Novel pain peptide patent filed" },
        { month: "Mar", text: "Veterinary pharma partnership with Onheal/OnhealPet. Bio-EU partnering" },
        { month: "Apr", text: "Ministry of Employment Strong SME designation. Startup Leap Package selection" },
        { month: "May", text: "Darae Strategic Center tech consulting agreement" },
        { month: "Jun", text: "ASCO clinical oncology delegation" },
        { month: "Sep", text: "Eye drop formulation patent filed" },
        { month: "Oct", text: "Seoul tech commercialization program. Prof. Kim RCI001 long-term safety study. Singapore Global Innovation Roadshow" },
        { month: "Nov", text: "ACR — TRPV1 osteoarthritis therapeutic presentation. KICDC/Defy Pitch Prize. Bio-Europe 2023" },
        { month: "Dec", text: "Hallym Univ. Hospital-IonCell CAR-T/ADC co-research MOU" },
      ],
    },
    {
      year: "2022", title: "Investment & Global Recognition",
      description: "Series A KRW 6B raised. RESI 3rd place. US clinical preparations.",
      events: [
        { month: "Feb", text: "JPM conference meetings. KIC Washington bio startup challenge" },
        { month: "Apr", text: "Shinhan Square Bridge Incheon. INNOBIZ certification. KIC Washington partnership" },
        { month: "May", text: "Series A KRW 6B investment raised. ARVO conference" },
        { month: "Jun", text: "BIO-USA Korean pavilion. RCI001 dry eye innovation drug spotlight" },
        { month: "Aug", text: "UKC 2022 IR Competition SBA Award. Seoul Gasan office relocation. Gachon Univ. national drug project" },
        { month: "Sep", text: "RESI Innovator's Pitch Challenge — 3rd place" },
        { month: "Oct", text: "TRPV1 patent filed in Japan/China" },
        { month: "Nov", text: "Talent-Nurturing SME designation" },
        { month: "Dec", text: "Family-Friendly certification & Youth-Friendly Strong SME" },
      ],
    },
    {
      year: "2021", title: "Tech Transfer & US Subsidiary",
      description: "Hanlim Pharma KRW 15B tech transfer. RudaCure U.S.A. established. Multiple government grants.",
      events: [
        { month: "Jan", text: "SunBio preclinical CRO annual contract. TRPV1 US patent filed" },
        { month: "Mar", text: "US clinical CRO (Ora) contract. Relocated to Incheon Startup Park" },
        { month: "Apr", text: "Hanlim Pharma KRW 15B RCI001 tech transfer. Prof. Kim Nature sister journal paper. Bio-Medical Tech Development project" },
        { month: "May", text: "BIG3 commercialization project. Doctor-startup co-research program" },
        { month: "Jun", text: "EVP Kim selected as TOFS committee member. BioKorea 2021" },
        { month: "Aug", text: "RudaCure U.S.A. Inc. established. MSIT infectious disease platform project. Bio-iCore program" },
        { month: "Dec", text: "Domestic TRPV1 patent secured. Prof. Kim — KOES Academic Award & Taejun Best Paper Award" },
      ],
    },
    {
      year: "2020", title: "Pipeline Foundation",
      description: "RCI001 clinical trial groundwork. BIG3 Innovation Growth selection. Incheon Startup Park.",
      events: [
        { month: "Feb", text: "Pain & ophthalmic drug research fully launched" },
        { month: "Jun", text: "R&D Rediscovery Project selected. BIG3 Innovation Startup Package" },
        { month: "Jul", text: "RCI001 clinical trial foundation established. Incheon Startup Park entry (Boost Startup Journey)" },
        { month: "Aug", text: "Global IP Support Program selected" },
        { month: "Dec", text: "SunBio MucoPEG US clinical contract. Incheon R&D consulting program" },
      ],
    },
    {
      year: "2019", title: "Early Research & Tech Transfer",
      description: "Gil Hospital ophthalmic patent transfer. Asia Pain Symposium hosted.",
      events: [
        { month: "Dec", text: "Gil Hospital geriatric eye disease patent transfer. Asia Pain Symposium in Songdo. Bundang CHA Hospital spine regeneration co-development" },
      ],
    },
    {
      year: "2018", title: "Foundation",
      description: "Founded by Dr. Yong-ho Kim (Gachon University). Ion channel-targeted therapeutics for pain and sensory diseases.",
    },
  ],
};

const LEADERSHIP = {
  ko: [
    { name: "김용호 박사", role: "대표이사 / CEO", description: "가천대학교 교수. 이온채널 약리학 및 통증 연구 전문." },
    { name: "김승훈", role: "부사장 / VP", description: "CMC 운영, AI 플랫폼 개발, 기업 전략 총괄." },
  ],
  en: [
    { name: "Dr. Yong-ho Kim", role: "Founder & CEO", description: "Gachon University professor specializing in ion channel pharmacology and pain research." },
    { name: "Seung-hoon Kim", role: "Vice President", description: "CMC operations, AI platform development, and corporate strategy." },
  ],
};

const CONTENT = {
  ko: { tag: "회사 소개", title1: "Our", title2: "Journey", description: "2018년 이온채널 전문 연구실에서 출발하여, 2026년 글로벌 바이오텍으로 성장하고 있는 루다큐어의 여정입니다.", leaderTag: "경영진", leaderTitle: "Team" },
  en: { tag: "Company", title1: "Our", title2: "Journey", description: "From a specialized ion channel laboratory in 2018 to a global biotech company in 2026 — the RudaCure story.", leaderTag: "Leadership", leaderTitle: "Team" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "en" ? "About | RudaCure" : "회사 소개 | RudaCure", description: CONTENT[(locale === "ko" ? "ko" : "en") as "ko" | "en"].description };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = toDataLocale(loc as Locale);
  const c = CONTENT[locale];
  const timeline = TIMELINE[locale];
  const leaders = LEADERSHIP[locale];

  return (
    <div className="pt-24">
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{c.tag}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {c.title1} <em className="italic font-semibold">{c.title2}</em>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">{c.description}</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-10">
                  <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${item.highlight ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white"}`} />
                  <div className="liquid-glass p-6">
                    <span className={`text-sm font-medium ${item.highlight ? "text-teal-600" : "text-gray-600"}`}>{item.year}</span>
                    <h3 className="text-xl font-semibold mt-1 mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    {item.events && item.events.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {item.events.map((event, idx) => (
                          <div key={idx} className="flex gap-3 text-sm">
                            <span className="text-teal-600 font-medium w-10 shrink-0">{event.month}</span>
                            <span className="text-gray-600">{event.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{c.leaderTag}</p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            Our <em className="italic font-semibold">{c.leaderTitle}</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaders.map((person) => (
              <div key={person.name} className="liquid-glass p-6">
                <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                <p className="text-teal-600 text-sm mb-3">{person.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{person.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
