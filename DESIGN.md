# RudaCure - Style Reference

> 임상 단계 신약 자산의 증빙 서류. 흰 지면, 청록 한 색, 머리카락 굵기의 구분선.

**Theme:** light 단일. 다크 테마는 없다. OS 다크모드에서도 같은 화면이 나와야 한다.

이 파일은 rudacure.com 의 디자인 기준이다. 코딩 에이전트는 화면을 만들거나 고치기 전에 이 파일과 `PRODUCT.md` 를 읽는다. 무엇을 보여 줄지는 `PRODUCT.md` 가, 어떻게 보이게 할지는 이 파일이 정한다. 둘이 부딪히면 `PRODUCT.md` 가 이긴다.

값은 전부 `src/app/globals.css` 의 `--rc-*` 토큰에서 옮겼다. 파일 형식은 Refero Styles 의 DESIGN.md 구성(Tokens, Components, Do/Don't, Agent Prompt Guide)을 따랐지만, 다른 회사 스타일의 색·글꼴·수치는 하나도 들여오지 않았다. 토큰을 바꾸면 이 파일도 같은 커밋에서 고친다.

방문자는 제약사 BD 담당자와 투자자다. 화면은 광고가 아니라 실사 자료처럼 읽혀야 한다. 색은 청록 하나가 행동과 강조를 맡고 나머지는 잉크 계열 무채색이다. 면은 불투명하고, 구분은 1px 반투명 선이 한다. 글자는 Pretendard 하나로 크기와 굵기만 바꿔 위계를 만든다. 개발 단계는 숫자 백분율이 아니라 단계 레일로 보여 준다.

## Tokens - Colors

| Name | Value | Token | Utility | Role |
|------|-------|-------|---------|------|
| Accent | `#0b7c72` | `--rc-accent` | `bg-accent` | 주 버튼 배경, 포커스 링, 진행 표시. 채도 있는 색은 이 계열뿐이다 |
| Accent Deep | `#0a5f58` | `--rc-accent-deep` | `text-accent-deep` | 흰 바탕 위 청록 글자(링크, 이메일, 제목 강조 `em`, section label). 글자에 쓰는 청록은 이것만 |
| Accent Bright | `#14b8a6` | `--rc-accent-bright` | - | 어두운 면 위 강조에만. 흰 바탕 글자에는 쓰지 않는다(대비 부족) |
| Accent Tint | `rgba(11,124,114,0.08)` | `--rc-accent-tint` | `bg-accent-tint` | 선택 영역, 성공 안내 배경, pill-accent 배경 |
| Accent Line | `rgba(11,124,114,0.22)` | `--rc-accent-line` | `border-accent-line` | 청록 계열 안내 상자와 pill 의 테두리 |
| Accent on Dark | `#5eead4` | `--rc-accent-on-dark` | `text-accent-on-dark` | 어두운 면 위의 청록 글자와 hover. 밝은 면에는 쓰지 않는다 |
| Ink 900 | `#0a0f14` | `--rc-ink-900` | `text-ink-900` | 제목 |
| Ink 800 | `#16202b` | `--rc-ink-800` | `text-ink` / `text-ink-800` | 본문 기본색, 입력값 |
| Ink 700 | `#2b3a49` | `--rc-ink-700` | `text-ink-700` | 폼 라벨, 보조 제목 |
| Ink 600 | `#4a5b6d` | `--rc-ink-600` | `text-ink-600` | 본문 설명, 주소, 카드 본문 |
| Ink 500 | `#6b7b8c` | `--rc-ink-500` | `text-ink-500` | 캡션, 단계 표시, 메타 정보 |
| Ink 400 | `#8e9cab` | `--rc-ink-400` | `text-ink-400` | placeholder, 비활성 글자. 읽어야 하는 글자에는 쓰지 않는다 |
| Surface | `#ffffff` | `--rc-surface` | `bg-surface` | 페이지와 카드 |
| Surface Sunken | `#f7f8f9` | `--rc-surface-sunken` | `bg-surface-sunken` | 입력칸, 교차 섹션, 보조 버튼, 진행 막대 트랙 |
| Surface Muted | `#eef0f2` | `--rc-surface-muted` | `bg-surface-muted` | 이미지 자리, sunken 위 hover, 만료 상태 pill |
| Surface Dark | `#080c11` | `--rc-surface-dark` | `bg-surface-dark` | CTA 띠와 IR 하이라이트. 한 페이지 안의 "반전 섹션"이 아니라 페이지 끝 띠에만 |
| Hairline | `rgba(10,15,20,0.08)` | `--rc-hairline` | `border-hairline` | 카드·행 구분선, 입력칸 테두리 |
| Hairline Strong | `rgba(10,15,20,0.14)` | `--rc-hairline-strong` | `border-hairline-strong` / `bg-hairline-strong` | hover 테두리, 무채색 pill 테두리, 1px 세로·가로 구분선 |
| On Dark Strong | `#e2e8f0` | `--rc-on-dark-strong` | `text-on-dark-strong` | 어두운 면의 소제목, 히어로 본문 |
| On Dark Muted | `rgba(226,232,240,0.72)` | `--rc-on-dark-muted` | `text-on-dark-muted` | 어두운 면의 본문, 푸터 링크 (`.on-dark .type-body` 와 같은 값) |
| On Dark Subtle | `rgba(226,232,240,0.55)` | `--rc-on-dark-subtle` | `text-on-dark-subtle` | 어두운 면의 캡션, 저작권 줄 |
| Danger | `#dc2626` | `--rc-danger` | `text-danger` / `border-danger` | 폼 오류 문구와 오류 입력칸 테두리. 장식에는 쓰지 않는다 |
| Danger Tint | `rgba(220,38,38,0.06)` | `--rc-danger-tint` | `bg-danger-tint` | 오류 안내 상자 배경 |
| Danger Line | `rgba(220,38,38,0.28)` | `--rc-danger-line` | `border-danger-line` | 오류 안내 상자 테두리 |

성공 상태는 따로 초록을 두지 않고 Accent 계열로 표시한다. 한 화면에 청록과 초록이 같이 뜨면 브랜드 색이 둘로 보인다.

**어두운 면 위에서는 ink 토큰을 쓰지 않는다.** ink 는 흰 바탕용이다. 푸터, 홈 히어로, 과학 페이지 MD 섹션처럼 `bg-surface-dark` 위에서는 On Dark 세 단계와 Accent on Dark 만 쓰고, 제목에는 `on-dark` 클래스를 붙여 `em` 강조가 밝은 청록으로 바뀌게 한다.

**분류 색은 두지 않는다.** 자산, 특허 상태, 뉴스 카테고리, 논문 유형을 색으로 나누지 않는다. 한 무리에서 강조할 자리 하나만 Accent Tint pill(등록 특허, Clinical 카테고리, 원저, 선도 자산군, 선택된 탭)로 두고, 나머지는 무채색 pill(`bg-surface-sunken text-ink-700 border-hairline-strong`)이다. 구분은 라벨 글자가 한다.

## Tokens - Typography

### Pretendard Variable - 모든 글자. `--font-sans`
- **Weights:** 400(본문), 500(링크, 강조 라벨), 600(제목, 버튼, label)
- **Line height:** 제목 1.06-1.25, 본문 1.75(`type-body`), 캡션 1.5
- **Letter spacing:** 본문 -0.011em. 라틴 제목은 크기에 따라 -0.02em 에서 -0.035em. **ko/ja/zh 제목은 -0.02em 에서 멈춘다** (`:lang()` 규칙이 이미 있다). 대문자 label 의 넓은 자간 0.14em 은 라틴 전용이고 CJK 는 0.02em
- **Italic:** 없다. Pretendard 에 이탤릭 면이 없어서 `em` 은 굵기와 Accent Deep 으로만 강조한다. `font-playfair`, `italic` 을 새로 붙이지 않는다

### ui-monospace - 코드, 파일명. `--font-mono`
- 자산 코드(RCI001), 단계 약어, 숫자는 mono 가 아니라 `.num` / `.tabular` (tabular figures)로 맞춘다

### Type Scale

| Role | Class | Size | Weight | Line height |
|------|-------|------|--------|-------------|
| display | `type-display` | 페이지별 지정 | 600 | 1.06 |
| h1 | `type-h1` | clamp(2.5rem, 5.5vw, 4.25rem) | 600 | 1.08 |
| h2 | `type-h2` / `section-heading` | clamp(1.875rem, 3.4vw, 2.875rem) | 600 | 1.14 |
| h3 | `type-h3` | clamp(1.25rem, 2vw, 1.5rem) | 600 | 1.25 |
| body | `type-body` | 1rem | 400 | 1.75 |
| caption | `type-caption` | 0.8125rem | 400 | 1.5 |
| label | `section-label` | 0.75rem | 600 | 1 |

제목은 Tailwind `text-5xl font-light` 같은 임의 조합이 아니라 위 클래스로 잡는다.

## Tokens - Spacing & Shapes

**Base unit:** 4px. 간격은 4의 배수(4, 8, 12, 16, 24, 32, 48)로만 잡는다.

| Purpose | Value | Token / Class |
|---------|-------|---------------|
| 섹션 상하 | 88px, 넓은 화면 128px | `--rc-section-y`, `--rc-section-y-lg`, `.section` |
| 컨테이너 | `.container-rc` | - |
| 본문 폭 | 42em, 좁게 34em | `.measure`, `.measure-tight` |

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| 입력칸, 작은 상자, 지도 | 8px | `--rc-radius-sm` (`rounded-lg` 와 같다) |
| 안내 상자 | 12px | `--rc-radius-md` |
| 카드 | 18px | `--rc-radius-lg` |
| 어두운 카드 | 24px | `--rc-radius-xl` |
| 버튼, pill | 999px | `.btn`, `.pill` |

버튼은 언제나 알약형이다. `rounded-lg` 버튼을 새로 만들지 않는다.

## Components

### Primary Button
`.btn .btn-primary`. 높이 48px, 좌우 26px, Accent 배경에 흰 글자, hover 시 Accent Deep. 누르면 scale 0.97. 그라디언트를 넣지 않는다. 폼 안에서 폭을 채울 때만 `w-full` 을 더한다.

### Secondary Button
`.btn .btn-secondary`. Surface Sunken 배경, Hairline 테두리, Ink 800 글자. "이전", "취소" 처럼 주 행동이 아닌 버튼.

### Content Card
`.card`. 흰 면, Hairline 테두리, 18px, `--rc-shadow-sm`. 클릭되는 카드만 `.card-interactive` 를 더해 hover 시 2px 뜬다. **입력 폼이나 주소처럼 클릭되지 않는 카드는 뜨지 않는다.** 예전 이름 `.liquid-glass` 는 남아 있는 31곳 호환용이다. hover 상승은 `a`·`button` 요소일 때만 걸리게 CSS 에서 막아 두었다. 새 코드는 `.card` 를 쓴다.

### Input Field
Surface Sunken 배경, Hairline 테두리, 8px, 좌우 16px 상하 10px, 글자 Ink 800 14px, placeholder Ink 400. 포커스 시 테두리 Accent, 링 `ring-2 ring-accent/20`. 오류 시 테두리 Danger, 링 `ring-danger/20`, 아래 12px Danger 문구.

### Status Notice
12px 모서리, 16px 안쪽 여백, 14px 글자. 성공: Accent Tint 배경, Accent Line 테두리, Accent Deep 글자. 오류: Danger Tint 배경, Danger Line 테두리, Danger 글자. 이모지 아이콘을 쓰지 않는다.

### Step Progress
3칸 막대, 높이 4px, 간격 8px, 알약형. 현재와 지난 단계는 Accent, 남은 단계는 Hairline Strong. 지난 단계를 다른 색으로 칠하지 않는다.

### Section Label
`.section-label`. 12px, 600, Accent Deep, 라틴은 대문자·0.14em. 섹션 제목 위에 한 번.

### Pill
`.pill` 과 `.pill-accent`. 개발 단계, 적응증, 문의 유형 같은 분류 표시.

### Stage Rail
`.stage-track` / `.stage-seg`. Disc, Pre, P1, P2, P3, NDA 여섯 칸. 근거 문서가 있는 단계만 채운다. 백분율 진행 막대로 바꾸지 않는다.

### Email / Link
이메일 주소와 URL 은 반드시 `<a>` 로 건다(`mailto:`). Accent Deep, 500, hover 시 밑줄.

## Do's and Don'ts

### Do
- 색은 위 표의 토큰 유틸리티(`text-ink-600`, `bg-surface-sunken`, `border-hairline`, `bg-accent` ...)로만 쓴다
- 청록 글자는 Accent Deep, 청록 면은 Accent 로 나눠 쓴다
- 주 행동은 화면당 한 종류의 Primary Button 으로 둔다
- 구분은 Hairline 1px 과 면 색 차이로 한다
- 한국어 문단은 `word-break: keep-all` 을 유지하고(`html` 에 이미 있다) 42em 을 넘기지 않는다
- 화면에 나오는 모든 문구는 7개 언어 데이터에서 가져온다. ar 은 RTL 이므로 좌우 대신 `start`/`end` 유틸리티를 쓴다
- 모션은 `--rc-ease` 와 `--rc-dur-*` 로, 속성을 명시해서(`transition-colors`, `transition-[border-color,box-shadow]`) 건다
- 개발 단계, 특허, 논문은 근거 문서가 있는 것만 싣는다

### Don't
- Tailwind 기본 팔레트(`slate-*`, `gray-*`, `cyan-*`, `emerald-*`, `teal-*`, `blue-*` ...)를 쓰지 않는다. 2026-09-30 에 562곳을 걷어 내 0곳이 됐다. 아래 점검 명령이 아무것도 출력하지 않아야 한다
- `dark:` 변형을 쓰지 않는다. 다크 테마가 없는데 `dark:` 만 있으면 OS 다크모드 방문자에게 흰 카드 위 흰 글자가 나온다(문의 페이지에서 실제로 났다). 현재 0곳
- 임의 색 값(`bg-[#080c11]`, `text-[#...]`)을 쓰지 않는다. 같은 값의 토큰이 있으면 토큰으로, 없으면 토큰을 먼저 만든다. 예외는 홈 히어로의 radial-gradient 배경 한 곳이다
- `.pill`, `.btn`, `.card`, `.section-label` 위에 크기·여백·상태 유틸리티를 얹어 덮어쓰려 하지 않는다. `globals.css` 의 컴포넌트 클래스는 레이어 밖이라 Tailwind 유틸리티보다 **항상 이긴다**(`.pill` 위의 `text-sm`, `.btn` 위의 `disabled:active:scale-100` 이 무시됐다). 변형이 필요하면 `globals.css` 에 변형 클래스를 만든다
- 버튼에 그라디언트, `rounded-lg`, `hover:shadow-lg` 를 쓰지 않는다
- 두 번째 채도 색(초록 성공색, 파랑 링크색, 보라 장식)을 들이지 않는다
- 이모지(🔒 ✓ ⌛)를 UI 아이콘 대신 쓰지 않는다
- 순수 `#000000` 을 쓰지 않는다. 흰색은 `--rc-surface` 로 쓴다
- em dash 와 구분자용 en dash 를 쓰지 않는다. 범위도 하이픈 `2018-2026`
- `transition-all`, `scale(0)` 또는 `scale(0.5)` 에서 시작하는 등장, 300ms 를 넘는 UI 전환을 쓰지 않는다
- 근거 없는 수치, 가짜 후기, 장비 사진 대용 일러스트를 만들지 않는다
- 다른 회사의 디자인 시스템 값을 통째로 들이지 않는다. IPO 준비 회사 사이트가 타사 외관을 닮으면 그 자체가 질문거리가 된다

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Page | `--rc-surface` | 기본 지면 |
| 1 | Sunken | `--rc-surface-sunken` | 교차 섹션, 입력칸 |
| 2 | Card | `--rc-surface` + Hairline + shadow-sm | 내용 묶음 |
| 3 | Chrome | `.material-chrome` (72% 흰색 + blur) | 내비게이션, 팝오버만 |
| - | Dark band | `--rc-surface-dark` | 페이지 끝 CTA, IR 하이라이트 |

반투명 blur 는 내비게이션 같은 chrome 에만 쓰고 내용 카드에는 쓰지 않는다.

## Elevation

`--rc-shadow-sm` (카드 기본), `--rc-shadow-md` (클릭 카드 hover), `--rc-shadow-lg` (팝오버). 세 단계 외의 그림자를 만들지 않는다.

## Imagery

사진은 NAS `02_회사소개자료/05_사진` 의 실물 사진을 스톡보다 먼저 쓴다. 라벨에 사내 코드명이나 lot 번호가 읽히는 사진은 게시 전에 확인한다. 히어로는 캔버스(`membrane-hero`, `trpv1-hero`)이며 PDB 좌표 기반이다. 장식용 손그림 SVG, 가짜 제품 화면을 만들지 않는다.

## Motion

- 이징: `--rc-ease` cubic-bezier(0.16, 1, 0.3, 1) 하나. 왕복 전환만 `--rc-ease-inout`
- 길이: 200ms(버튼·색), 400ms(카드), 700ms(스크롤 등장)
- 등장: `.reveal-*` + `ScrollReveal`. 시작 상태는 opacity 0 과 8-16px 이동, 또는 scale 0.95 이상
- `prefers-reduced-motion: reduce` 에서는 전부 끈다

## Layout

- 최대 폭은 `.container-rc`. 문의·폼 페이지는 `max-w-4xl`
- 2단은 `md:grid-cols-2 gap-8`. 모바일은 1단
- 섹션 사이는 `.section` 의 88/128px

## Agent Prompt Guide

화면을 새로 만들 때:

```
DESIGN.md 와 PRODUCT.md 를 읽고 그 규칙대로 만들어라.
색은 Tokens - Colors 의 유틸리티만 쓰고 Tailwind 기본 팔레트와 dark: 는 쓰지 마라.
버튼은 .btn, 카드는 .card, 제목은 type-* 클래스로 잡아라.
화면 문구는 7개 언어 데이터에 넣고 컴포넌트에 영어를 직접 쓰지 마라.
끝나면 바뀐 파일마다 지킨 Do / Don't 를 한 줄씩 적어라.
```

기존 화면을 고칠 때:

```
DESIGN.md 기준으로 <파일> 을 검토해라.
어긋난 곳을 표로 뽑고(현재 클래스, 바꿀 토큰, 이유) 그대로 고쳐라.
```

점검 명령(저장소 루트에서):

```
grep -rEc "\b(bg|text|border|ring|from|to|via)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}" src --include=*.tsx | grep -v ":0$"
grep -rc "dark:" src --include=*.tsx | grep -v ":0$"
grep -rnE "(bg|text|border)-\[#" src --include=*.tsx
```

세 명령 모두 결과가 없어야 한다(세 번째는 홈 히어로 radial-gradient 한 줄만 허용).
