# 메인 화면 디자인 파일럿 「Lab Index」

2026-09-28. 브랜치 `design/lab-index-pilot`. 메인 화면(`src/app/[locale]/page.tsx`)만 바꾸고, 다른 페이지와 navbar·footer는 건드리지 않았다.
스타일은 `globals.css` 맨 끝의 `.lab` 블록에만 있고 `@layer components` 안에 넣었다. 그래서 다른 라우트에는 영향이 없다.

## 1. 출처와 라이선스

Superdesign prompt library에서 명세 두 개를 골라 구조만 가져왔다.

| slug | 가져온 것 | 버린 것 |
|---|---|---|
| `swiss-grid-agency-layout` | 번호 붙은 index 행과 2px 강조선, 12칸 grid, mono micro-label, 번호 매긴 목록형 섹션, 1px 간격으로 선을 만드는 cell grid, marquee 띠 | cobalt 색, Inter·JetBrains Mono 웹폰트, 200px 제목, `leading 0.84`·`-0.04em` 자간 |
| `laboratory-skincare` | 종이·잉크 색 대비, 1px hairline, 그림자와 둥근 모서리 금지, 그림 위 annotation 라벨, `mix-blend-multiply` | Gambetta·Satoshi 글꼴, 갈색 계열 accent, 상품 판매용 섹션 |

라이선스는 저장소 `superdesigndev/superdesign-prompts`의 `LICENSE-DATA` 본문으로 확인했다. 명세 본문은 CC0 1.0이라 상업적으로 쓸 수 있고 출처 표기 의무도 없다. 명세 안에서 이름만 언급한 글꼴과 이미지는 각자의 라이선스를 따르므로 새 글꼴은 하나도 들이지 않았다. 웹 라이브러리의 design.md 메뉴에 있는 실제 기업 디자인 시스템(Apple, Stripe 등)은 쓰지 않았다.

## 2. 기존 토큰 (그대로 쓴 것)

| 항목 | 값 |
|---|---|
| accent | `--rc-accent #0b7c72`, `--rc-accent-deep #0a5f58` |
| ink | `--rc-ink-900 #0a0f14` ~ `--rc-ink-400 #8e9cab` |
| 글꼴 | Pretendard Variable 하나, mono는 `--font-mono` 시스템 스택 |
| easing | `--rc-ease cubic-bezier(0.16, 1, 0.3, 1)` |
| 폭 | `.container-rc` 최대 1120px, 좌우 24/40px |
| hero | TRPV1 point cloud (`Trpv1Hero`, PDB 8GFA, CC0) |

## 3. 파일럿에서 새로 정한 값

| 항목 | 값 | 이유 |
|---|---|---|
| paper | `#f5f3ef` / 본문 바탕 `#fbfaf8` | 순백을 피하고 연구노트 질감을 낸다 |
| ink | `#0f161d` | 기존 ink-900에 가깝게 맞췄다 |
| hairline | `rgba(15,22,29,0.14)` | 1px 선 하나로 구획한다 |
| 강조선 | 2px `--rc-accent` | 섹션 첫머리에만 둔다 |
| 모서리·그림자 | 0 / 없음 | 명세의 핵심 규칙이다 |
| 한글 제목 | 행간 1.12, 자간 -0.03em | 라틴 기준값(0.84, -0.04em)을 쓰면 음절이 겹친다 |
| 한글 라벨 | mono 대신 Pretendard 12px, 자간 0.01em | 넓은 자간은 라틴 전용 장치다. 한글에 쓰면 글자가 흩어진다 |

## 4. 내용 원칙

화면의 숫자는 모두 이 파일의 데이터 배열이나 기존 i18n 문자열에서 나온다. 새로 주장하는 사실은 없다.
hero 통계 네 칸은 에셋 수(`pipeline.length`), RCI001 단계(Phase 2), 치료 영역 수(안과·통증·피부 3개), 협력 기관 수(협력사 8곳과 임상 실시기관 6곳을 더한 14)다.
`$94B` 만성통증 시장 수치는 hero에 올리지 않았다. 회사 정체성을 막단백질 플랫폼으로 옮긴 뒤라서, 방문자가 처음 읽는 숫자가 통증 시장이면 예전 포지셔닝으로 되돌아간다. 이 수치는 02 섹션에 그대로 남아 있다.

## 5. 파트너 구성 변경 (2026-09-28 요청)

동아ST와 한미정밀화학을 뺐고 케이메디허브(K-MEDI hub)를 넣었다. RCI001 국내 임상 2상 실시기관 6곳은 별도 묶음으로 보여 준다. 협력사 8곳은 4열, 병원 6곳은 3열이라 두 grid 모두 줄이 빈칸 없이 찬다.
케이메디허브와 병원 6곳은 로고 사용 조건을 확인하지 않아 monogram으로 둔다. `PartnerLogo`는 `logo`가 빈 문자열이면 monogram을 그린다.
케이메디허브의 역할 문구 「비임상 평가」와 병원 목록은 사내 확인이 필요하다.

## 6. 검수 결과와 남은 일

- `next build --webpack` 통과(TypeScript 포함). 1440px 폭에서 가로 넘침 0건, navbar와 본문 좌측선이 160px로 일치한다.
- 모바일 폭은 이 환경에서 에뮬레이션할 수 없어 확인하지 못했다. 미리보기 URL을 휴대폰으로 열어 확인해야 한다.
- 새 micro-label은 ko·en만 번역했다. zh·ja·es·fr·ar은 영어로 나온다. pipeline 데이터가 원래 ko·en만 있는 것과 같은 방식이다.
- 아랍어 RTL은 논리 속성(`text-end`, `ps/pe`)과 화살표 반전으로 대응했지만 화면으로는 확인하지 않았다.
- marquee와 선 그리기 애니메이션은 `prefers-reduced-motion`에서 멈춘다.
