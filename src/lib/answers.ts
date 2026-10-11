/** Public answers only. Keep visible FAQ and the optional llms index in sync. */
export const ANSWER_LOCALES = ["ko", "en"] as const;
export type AnswerLocale = (typeof ANSWER_LOCALES)[number];
export const ANSWERS_REVIEWED = "2026-10-12";

type Source = { path: string; label: string };
type Answer = { id: string; question: string; answer: string; sources: Source[] };
type AnswerContent = { title: string; description: string; reviewed: string; sourcesLabel: string; answers: Answer[] };

export const ANSWER_CONTENT: Record<AnswerLocale, AnswerContent> = {
  ko: {
    title: "루다큐어 핵심 질문과 답변",
    description: "루다큐어의 신약개발 분야, RuCIA 플랫폼, RCI001 개발 단계와 협력 문의를 공개 자료에서 확인할 수 있습니다.",
    reviewed: "공개 자료 확인일",
    sourcesLabel: "근거 및 상세 자료",
    answers: [
      { id: "company", question: "루다큐어는 어떤 회사인가요?", answer: "루다큐어(RudaCure)는 2018년에 설립한 한국 신약개발 기업입니다. 막단백질인 이온채널과 GPCR(G protein-coupled receptor)을 표적으로 안구건조증, 만성통증, 건선과 희귀 신경질환 치료제를 개발합니다.", sources: [{ path: "/about", label: "회사 소개와 연혁" }, { path: "/pipeline", label: "개발 파이프라인" }] },
      { id: "platform", question: "RuCIA는 무엇인가요?", answer: "RuCIA(RudaCure Ion Channel Innovative Assessment)는 루다큐어의 신약개발 플랫폼입니다. AI 기반 분자 예측, 구조 기반 설계와 분자동역학 시뮬레이션을 전기생리학·약효 평가와 연결해 후보물질을 연구합니다.", sources: [{ path: "/science", label: "RuCIA 기술 소개" }] },
      { id: "rci001-stage", question: "RCI001은 어떤 치료제이며, 개발 단계는 어디인가요?", answer: "RCI001은 안구건조증 치료를 목표로 개발하는 점안제 후보물질입니다. 회사 발표 기준으로 미국 FDA(Food and Drug Administration) 임상 2상 IND(Investigational New Drug) 승인과 국내 임상 2상 시험계획 승인을 받았습니다. 국내 승인일은 2026년 9월 22일입니다. 임상시험 계획 승인은 판매 허가나 환자에서의 유효성 입증을 뜻하지 않습니다.", sources: [{ path: "/pipeline#RCI001", label: "RCI001 개발 현황" }, { path: "/news/192", label: "국내 임상 2상 승인 발표" }, { path: "/news/36", label: "미국 임상 2상 승인 발표" }, { path: "https://clinicaltrials.gov/study/NCT07068958", label: "미국 임상시험 등록 NCT07068958" }] },
      { id: "pipeline", question: "공개된 개발 파이프라인은 무엇인가요?", answer: "현재 파이프라인 페이지에는 RCI001(사람용 안구건조증), RCI001AH(동물용 안구건조증), RCI002(관절강 국소 투여 만성통증 치료제), RCI003(건선), RC0125 AAV(adeno-associated virus, 아데노연관바이러스) 유전자치료 프로그램을 소개합니다. 각 후보의 개발 단계와 마일스톤은 상세 페이지에서 확인할 수 있습니다.", sources: [{ path: "/pipeline", label: "전체 파이프라인과 개발 단계" }] },
      { id: "evidence", question: "연구 논문과 특허는 어디에서 확인할 수 있나요?", answer: "Publications 페이지에서 연구 논문과 특허 목록을 공개합니다. 논문은 원문 링크로, 특허는 국가별 출원·등록 정보를 통해 확인할 수 있습니다. 전임상 연구 결과와 임상시험에서 확인한 결과는 구분해서 읽어야 합니다.", sources: [{ path: "/publications", label: "논문 및 특허 목록" }, { path: "/news", label: "개발 소식과 발표 자료" }] },
      { id: "cro", question: "루다큐어는 어떤 CRO 서비스를 제공하나요?", answer: "루다큐어는 CRO(Contract Research Organization) 서비스로 약효 평가, in vivo·in vitro 시험, 이온채널 스크리닝과 안구질환 동물모델 평가를 소개합니다. 필요한 시험 범위와 수행 조건은 서비스 담당자에게 문의할 수 있습니다.", sources: [{ path: "/cro", label: "CRO 서비스 안내" }, { path: "/contact", label: "서비스 문의" }] },
      { id: "contact", question: "파트너십과 라이센싱, 투자 문의는 어떻게 하나요?", answer: "Contact 페이지에서 파트너십·라이센싱, 투자와 CRO 문의를 보낼 수 있습니다. 사업 제휴 담당 이메일은 sh.kim@rudacure.com입니다. 본사는 인천광역시 연수구 송도미래로 9, 1동 302호이며, 서울사무소는 서울시 금천구 가산디지털1로 145, 1001호입니다.", sources: [{ path: "/contact", label: "담당 연락처와 오시는 길" }, { path: "/ir", label: "투자 정보" }] },
    ],
  },
  en: {
    title: "Key questions about RudaCure",
    description: "Source-linked answers about RudaCure, the RuCIA platform, RCI001 development and partnering enquiries.",
    reviewed: "Public information reviewed",
    sourcesLabel: "Sources and details",
    answers: [
      { id: "company", question: "What is RudaCure?", answer: "RudaCure is a Korean drug discovery company founded in 2018. It targets membrane proteins, including ion channels and GPCRs (G protein-coupled receptors), to develop therapeutics for dry eye disease, chronic pain, psoriasis and rare neurological disease.", sources: [{ path: "/about", label: "Company profile and history" }, { path: "/pipeline", label: "Development pipeline" }] },
      { id: "platform", question: "What is RuCIA?", answer: "RuCIA (RudaCure Ion Channel Innovative Assessment) is RudaCure's drug discovery platform. It connects AI-based molecular prediction, structure-based design and molecular dynamics simulations with electrophysiology and pharmacology evaluation to investigate drug candidates.", sources: [{ path: "/science", label: "RuCIA technology" }] },
      { id: "rci001-stage", question: "What is RCI001 and what is its development stage?", answer: "RCI001 is an investigational ophthalmic drug candidate for dry eye disease. According to company announcements, it has received US FDA (Food and Drug Administration) Phase 2 IND (Investigational New Drug) clearance and Korean Phase 2 clinical trial plan approval. The Korean approval was announced on September 22, 2026. Permission to conduct a trial is not marketing approval or proof of efficacy in patients.", sources: [{ path: "/pipeline#RCI001", label: "RCI001 development status" }, { path: "/news/192", label: "Korean Phase 2 announcement" }, { path: "/news/36", label: "US Phase 2 announcement" }, { path: "https://clinicaltrials.gov/study/NCT07068958", label: "US trial registration NCT07068958" }] },
      { id: "pipeline", question: "Which programmes are listed in the public pipeline?", answer: "The pipeline page lists RCI001 for human dry eye disease, RCI001AH for veterinary dry eye, RCI002 for chronic pain via intra-articular administration, RCI003 for psoriasis, and RC0125 AAV (adeno-associated virus) gene therapy. The detailed pipeline page describes the stage and milestones of each candidate.", sources: [{ path: "/pipeline", label: "Full pipeline and development stages" }] },
      { id: "evidence", question: "Where can I find research publications and patents?", answer: "The Publications page lists research papers and patents, with links to papers and country-specific filing and grant information. Preclinical research findings should be distinguished from results demonstrated in clinical trials.", sources: [{ path: "/publications", label: "Publications and patents" }, { path: "/news", label: "Development announcements" }] },
      { id: "cro", question: "What CRO services does RudaCure offer?", answer: "RudaCure describes CRO (Contract Research Organization) services including pharmacology evaluation, in vivo and in vitro assessment, ion-channel screening and ocular-disease animal models. Contact the service team to discuss study scope and execution requirements.", sources: [{ path: "/cro", label: "CRO services" }, { path: "/contact", label: "Service enquiries" }] },
      { id: "contact", question: "How can I contact RudaCure about partnering, licensing or investment?", answer: "The Contact page accepts partnership, licensing, investment and CRO enquiries. The business development email is sh.kim@rudacure.com. Headquarters are at Building 1, Room 302, 9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Korea. The Seoul office is at Room 1001, 145 Gasandigital 1-ro, Geumcheon-gu, Seoul, Korea.", sources: [{ path: "/contact", label: "Contacts and locations" }, { path: "/ir", label: "Investor relations" }] },
    ],
  },
};

export function answerSourceUrl(locale: AnswerLocale, sourcePath: string) {
  return sourcePath.startsWith("https://") ? sourcePath : `/${locale}${sourcePath}`;
}
