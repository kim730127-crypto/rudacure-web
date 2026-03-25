import { type Locale } from "@/lib/i18n";

const TIMELINE = {
  ko: [
    { year: "2026", title: "Series B & 글로벌 확장", description: "RCI001 FDA Phase 2 중간 결과. RuCIA 플랫폼 희귀 감각질환 확장. Pre-IPO 펀딩 및 일본/유럽 라이선싱.", highlight: true },
    { year: "2025", title: "임상 & IPO 마일스톤", description: "RCI001 FDA Phase 2 승인(NCT07068958). IPO 주관사 선정. 인천 우수기업 선정. 하이서울기업 인증. SfN 학회 발표." },
    { year: "2024", title: "임상 검증", description: "RCI001 US FDA Phase 2 진입. 한림제약 국내 라이선싱 계약. IBK Innovation Hub Europe 프로그램 선정." },
    { year: "2023", title: "전략적 파트너십", description: "Ion Cell CAR-T/ADC 공동연구 MOU. 서울형 기술사업화 지원사업. CRO 서비스 확대." },
    { year: "2022", title: "투자 & 수상", description: "신한 스퀘어브릿지 인천 선정. KIC 워싱턴 D.C. 바이오텍 프로그램. TIPS 스케일업 12억원 자금 지원." },
    { year: "2018", title: "창립", description: "김용호 대표(가천대학교) 설립. 이온채널 표적 통증/감각질환 치료제 연구 시작. TRPV1 연구 프로그램 착수." },
  ],
  en: [
    { year: "2026", title: "Series B & Global Expansion", description: "RCI001 FDA Phase 2 interim results. RuCIA platform expansion into rare sensory diseases. Pre-IPO funding and Japan/Europe licensing deals.", highlight: true },
    { year: "2025", title: "Clinical & IPO Milestones", description: "RCI001 FDA Phase 2 approval (NCT07068958). IPO underwriter selection. Incheon outstanding company award. Hi-Seoul company certification. SfN conference presentation." },
    { year: "2024", title: "Clinical Validation", description: "RCI001 enters US FDA Phase 2. Hanlim Pharmaceuticals licensing agreement for domestic commercialization. IBK Innovation Hub Europe accelerator program." },
    { year: "2023", title: "Strategic Partnerships", description: "Ion Cell CAR-T/ADC co-research MOU. Seoul tech commercialization program. Expanded CRO service offerings." },
    { year: "2022", title: "Investment & Recognition", description: "Shinhan Square Bridge Incheon selection. KIC Washington D.C. biotech program. TIPS Scale-up KRW 1.2B funding." },
    { year: "2018", title: "Foundation", description: "Founded by Dr. Yong-ho Kim (Gachon University). Focused on ion channel therapeutics for pain and sensory diseases. Initial TRPV1 research program." },
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
  return { title: locale === "en" ? "About | RudaCure" : "회사 소개 | RudaCure", description: CONTENT[locale === "en" ? "en" : "ko"].description };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "en" ? "en" : "ko") as Locale;
  const c = CONTENT[locale];
  const timeline = TIMELINE[locale];
  const leaders = LEADERSHIP[locale];

  return (
    <div className="pt-24">
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{c.tag}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {c.title1} <em className="font-['Playfair_Display'] italic font-semibold">{c.title2}</em>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">{c.description}</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-10">
                  <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${item.highlight ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white"}`} />
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className={`text-sm font-mono font-medium ${item.highlight ? "text-teal-600" : "text-gray-300"}`}>{item.year}</span>
                    <h3 className="text-xl font-semibold mt-1 mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
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
            Our <em className="font-['Playfair_Display'] italic font-semibold">{c.leaderTitle}</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaders.map((person) => (
              <div key={person.name} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                <p className="text-teal-600 text-sm mb-3">{person.role}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{person.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
