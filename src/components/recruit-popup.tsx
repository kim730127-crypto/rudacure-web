"use client";

import { useEffect, useRef, useState } from "react";

// 상시채용: 충원 완료 시 false 로 바꾸면 팝업이 사라집니다.
// ponytail: 단일 스위치라 충원 시 이 한 줄만 끄면 됨. 향후 여러 공고를 동시에
// 띄우거나 마감일 자동 종료가 필요해지면 배열/CMS 로 승격.
const ACTIVE = true;

const DISMISS_KEY = "recruit-bd-2026-dismissed";
const APPLY_EMAIL = "sh.kim@rudacure.com";

const MAILTO = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
  "[BD팀 지원] 성함 기재",
)}&body=${encodeURIComponent(
  "루다큐어 BD팀에 지원합니다.\n\n- 성함:\n- 연락처:\n\n※ 이력서와 자기소개서를 첨부해 주세요. 검토 후 개별 연락드리겠습니다.",
)}`;

export function RecruitPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // sessionStorage 는 클라이언트에서만 읽어야 SSR 하이드레이션 불일치를 피함.
  useEffect(() => {
    if (!ACTIVE) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    setOpen(true);
  }, []);

  // 열려 있는 동안: 배경 스크롤 잠금 + Esc 닫기 + 닫기 버튼에 포커스
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruit-title"
      onClick={close}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* panel */}
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5 sm:px-8">
          <div>
            <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              상시채용 · 충원 시 마감
            </span>
            <h2
              id="recruit-title"
              className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl"
            >
              BD팀 채용 (1명)
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={close}
            aria-label="채용 공고 닫기"
            className="-mr-1 shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* body (scrollable) */}
        <div className="space-y-6 overflow-y-auto px-6 py-6 text-sm leading-relaxed text-gray-700 sm:px-8">
          <Section title="담당 업무">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                국내외 사업화(기술이전, 공동연구)를 위한 파트너사 네트워킹
              </li>
              <li>국내외 전시회 참가 및 신규 파트너 발굴</li>
              <li>기존 공동개발 파트너사와의 협력</li>
              <li>기업 홍보</li>
            </ul>
          </Section>

          <Section title="자격 요건">
            <ul className="list-disc space-y-1 pl-5">
              <li>학력: 학사 이상</li>
              <li>
                경력: 바이오/의학/약학 관련 제약산업 전반에 지식을 보유하며, 5년
                이상의 BD 경력이 있는 분 (대리~과장 급)
              </li>
              <li>국내외 출장 가능한 분</li>
              <li>
                비즈니스 영어 회화 및 영문 문서 작성, 협상이 가능한 분 (영어
                능통자)
              </li>
            </ul>
          </Section>

          <Section title="우대 사항">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                신약 파이프라인 기술이전(L/O) 및 공동개발 계약 전 주기 경험자
              </li>
              <li>
                NPV 모델 등 재무 모델링을 활용한 신약 파이프라인 기술가치 평가
                경험자
              </li>
              <li>석·박사 학위 보유자</li>
              <li>해외 파트너사와 원활한 네트워킹 경험자</li>
            </ul>
          </Section>

          <Section title="주요 업무">
            <ol className="space-y-4">
              <li>
                <p className="font-semibold text-gray-900">
                  1. 신약 파이프라인 기술이전 및 공동연구 추진
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>
                    국내외 바이오 파트너링 행사 참가 및 파트너링 미팅 주도
                  </li>
                  <li>
                    주요 파이프라인 기술이전 및 공동개발 파트너십 발굴, 전략
                    수립
                  </li>
                  <li>
                    파트너십 구축을 위한 딜 구조 설계, 협상 및 계약서 검토 (CDA,
                    MTA 등)
                  </li>
                  <li>
                    Pitch deck 및 Non-confidential deck 기획, 업데이트,
                    프레젠테이션 진행
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-gray-900">
                  2. 신사업 기획 및 파트너십 관리
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>
                    기존 전략적 파트너사와의 네트워크 유지 및 협력 논의 주도
                  </li>
                  <li>
                    주요 타겟 질환의 최신 동향 파악 및 경쟁사 파이프라인 분석
                  </li>
                  <li>
                    신규 유효 물질 탐색, 파이프라인 초기 평가 및 타겟 시장성
                    분석
                  </li>
                  <li>
                    국내외 제약사, 연구기관 등 새로운 비즈니스 네트워크 발굴
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-gray-900">
                  3. 기업 홍보 및 대외 협력
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>
                    LinkedIn 등 온라인 플랫폼 및 오프라인 채널을 통한 기업 및
                    파이프라인 홍보
                  </li>
                  <li>
                    잠재적 투자자 및 파트너사 대상 기업 인지도 제고 및 활동 지원
                  </li>
                  <li>
                    주요 학회 및 전시회 참석을 통한 최신 시장 동향 파악,
                    비즈니스 인사이트 도출
                  </li>
                </ul>
              </li>
            </ol>
          </Section>
        </div>

        {/* footer / CTA */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-5 sm:px-8">
          <p className="mb-3 text-sm text-gray-600">
            이력서와 자기소개서를{" "}
            <span className="font-semibold text-gray-900">{APPLY_EMAIL}</span>{" "}
            으로 보내주시면 검토 후 개별적으로 연락드립니다.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={MAILTO}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-500"
            >
              이메일로 지원하기
            </a>
            <button
              onClick={close}
              className="rounded-lg px-6 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 text-base font-bold text-gray-900">{title}</h3>
      {children}
    </section>
  );
}
