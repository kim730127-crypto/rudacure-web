import type { NextConfig } from "next";

/**
 * 301s for the two previous rudacure.com generations.
 *
 * Search Console still reports these as 404s, so external links and residual
 * index entries point at dead paths. Recovered from archive.org snapshots: the
 * gnuboard site (/m04_02, /bbs/page.php?hid=..., captured 2026-02-15) that ran
 * until March 2026, and the QUV builder site (numeric paths, captured
 * 2020-09-21) before it.
 *
 * Deliberately NOT redirected, per the site owner: the 인재채용 pages
 * (/m05_01, /m05_02, /m05_03, /21) and the APS 2019 conference microsite
 * (/4, /5, /6, /10, /15, /aps2019). That content is deleted with no successor,
 * and pointing it at an unrelated URL would be a soft 404. Those stay 404 on
 * purpose — do not "fix" them.
 */

const LOCALE_GROUP = "ko|en|zh|ja|es|fr|ar";
const DEFAULT_LOCALE = "ko";

/**
 * Legacy path -> locale-relative destination ("" is the homepage).
 * A bare legacy path lands on the Korean page; a locale-prefixed one (which is
 * what the i18n middleware produced, and what Search Console recorded as
 * /en/home, /en/11, /en/17) keeps the visitor's locale.
 */
const PATH_MAP: Record<string, string> = {
  // QUV site, 2018-2020, numeric paths
  "/home": "",
  "/17": "/about", // 기업소개: 인사말·비전·연혁·회사개요·People·Advisors
  "/20": "/about", // OUR Members
  "/14": "/about", // 조직도
  "/11": "/pipeline", // Development Stage
  "/8": "/pipeline", // RCI001
  "/9": "/pipeline", // RCI002
  "/16": "/news", // 게시판
  "/18": "/news", // 게시판
  "/19": "/contact", // 오시는 길

  // gnuboard site, until 2026-03
  "/m01_04": "/contact", // 회사소개 > 본사/연구소
  "/m04_01": "/news", // 홍보센터 > 뉴스
  "/m04_02": "/news", // 홍보센터 > 매거진
  "/m04_03": "/publications", // 홍보센터 > 특허/인증
  "/m04_04": "/news", // 홍보센터 > 행사일정
  "/m06_02": "/contact", // 고객문의
  "/m07_01": "/news", // 공지사항
};

/** gnuboard list boards whose article pages were /<board>/<id>. */
const BOARD_MAP: Record<string, string> = {
  "/m04_01": "/news",
  "/m04_02": "/news",
  "/m04_03": "/publications",
  "/m04_04": "/news",
  "/m06_02": "/contact",
  "/m07_01": "/news",
};

/** gnuboard static pages served as /bbs/page.php?hid=<id>. */
const HID_MAP: Record<string, string> = {
  m01_01: "/about", // 회사소개 > 비전 & 문화
  m01_02: "/about", // 회사소개 > 회사연혁
  m01_03: "/about", // 회사소개 > 조직구성
  m02_01: "/pipeline", // 연구소개 > 파이프라인
  m03_01: "/cro", // CRO 서비스 > CRO 소개
  m06_01: "/contact", // 오시는 길
};

/**
 * gnuboard list pages served as /bbs/board.php?bo_table=<id>.
 *
 * 목록과 기사 항목이 같은 질의어를 쓴다. `wr_id` 는 버린다 - 구 기사 번호와 새 뉴스
 * 아이디는 대상이 달라서, 개별 기사로 보내면 다른 내용을 보여준다. 목록이 정답이다.
 * 여기 없는 보드와 `download.php` · `login.php` 등은 middleware 가 410 으로 닫는다.
 */
const BO_TABLE_MAP: Record<string, string> = {
  m04_01: "/news", // 홍보센터 > 뉴스
  m04_02: "/news", // 홍보센터 > 매거진
  m04_03: "/publications", // 홍보센터 > 특허/인증
  m04_04: "/news", // 홍보센터 > 행사일정
  m06_02: "/contact", // 고객문의
  m07_01: "/news", // 공지사항
};

/**
 * English vanity paths that visitors type or that external sites guess.
 *
 * These never existed on any rudacure.com generation. They turn up because
 * hyphenated forms are the house style on most pharma sites, so a reader who
 * has our About page in mind types /about-us. The 2026-08/09 traffic review
 * counted them landing on the catch-all alongside the real legacy paths.
 *
 * Each mapping is a literal synonym of an existing route. Nothing here is a
 * guess about vanished content, which is the line the legacy maps above also
 * hold.
 */
const VANITY_MAP: Record<string, string> = {
  "/about-us": "/about",
  "/aboutus": "/about",
  "/company": "/about",
  "/contact-us": "/contact",
  "/contactus": "/contact",
  "/our-pipeline": "/pipeline",
  "/pipelines": "/pipeline",
  "/investors": "/ir",
  "/investor-relations": "/ir",
  "/press": "/news",
  "/newsroom": "/news",
  "/patents": "/publications",
  "/research": "/science",
};

/**
 * The QUV builder emitted a `/page/` prefix on some menu items, which is how
 * /en/page/pipeline reached the catch-all. Only routes that exist today are
 * listed; an unknown slug stays a 404 rather than being sent somewhere plausible.
 */
const PAGE_PREFIX_ROUTES = [
  "about",
  "pipeline",
  "science",
  "cro",
  "ir",
  "news",
  "publications",
  "sab",
  "contact",
] as const;

type Rule = {
  source: string;
  destination: string;
  statusCode: 301;
  has?: { type: "query"; key: string; value: string }[];
};

// `permanent: true` emits 308. 308 is equivalent to 301 for Google, but 301 is
// what every other tool and log analyser expects from a site migration, so it
// is set explicitly.
function rule(source: string, destination: string, has?: Rule["has"]): Rule {
  return has
    ? { source, destination, statusCode: 301, has }
    : { source, destination, statusCode: 301 };
}

function buildRedirects(): Rule[] {
  const rules: Rule[] = [];

  for (const [from, to] of Object.entries(PATH_MAP)) {
    rules.push(rule(from, `/${DEFAULT_LOCALE}${to}`));
    rules.push(rule(`/:locale(${LOCALE_GROUP})${from}`, `/:locale${to}`));
  }

  for (const [from, to] of Object.entries(BOARD_MAP)) {
    rules.push(rule(`${from}/:id`, `/${DEFAULT_LOCALE}${to}`));
    rules.push(rule(`/:locale(${LOCALE_GROUP})${from}/:id`, `/:locale${to}`));
  }

  for (const [hid, to] of Object.entries(HID_MAP)) {
    rules.push(
      rule("/bbs/page.php", `/${DEFAULT_LOCALE}${to}`, [
        { type: "query", key: "hid", value: hid },
      ]),
    );
  }

  for (const [board, to] of Object.entries(BO_TABLE_MAP)) {
    rules.push(
      rule("/bbs/board.php", `/${DEFAULT_LOCALE}${to}`, [
        { type: "query", key: "bo_table", value: board },
      ]),
    );
  }

  for (const [from, to] of Object.entries(VANITY_MAP)) {
    rules.push(rule(from, `/${DEFAULT_LOCALE}${to}`));
    rules.push(rule(`/:locale(${LOCALE_GROUP})${from}`, `/:locale${to}`));
  }

  for (const slug of PAGE_PREFIX_ROUTES) {
    rules.push(rule(`/page/${slug}`, `/${DEFAULT_LOCALE}/${slug}`));
    rules.push(
      rule(`/:locale(${LOCALE_GROUP})/page/${slug}`, `/:locale/${slug}`),
    );
  }

  // A duplicated locale segment (/zh/zh, /en/en) comes from links built by
  // concatenating a locale onto an already-localised URL. Collapse it instead of
  // letting the second segment fall through to the catch-all.
  rules.push(
    rule(
      `/:locale(${LOCALE_GROUP})/:dup(${LOCALE_GROUP})`,
      "/:locale",
    ),
  );

  return rules;
}

/**
 * 보안 헤더.
 *
 * 2026-11-04 CSP 를 추가했다(보안 점검 F-05). 넣기 전에 운영 16개 페이지(7개 언어 홈,
 * 회사·문의·뉴스·뉴스 상세·파이프라인·사이언스·CRO·IR·논문·SAB·FAQ)를 브라우저로 열어
 * 실제로 불러오는 출처를 모았다. 외부 출처는 문의 페이지의 Google 지도 iframe 하나였다.
 * 2026-09-22 주석에 적혀 있던 TMap 지도와 Google Analytics 는 지금 코드에 없다.
 *
 * - script-src: Next 가 페이지마다 인라인 스크립트(하이드레이션 데이터, JSON-LD)를 넣고
 *   대부분 페이지가 정적 생성이라 nonce 를 쓸 수 없다. 그래서 'unsafe-inline' 은 남기되
 *   외부 스크립트 출처는 하나도 허용하지 않는다. 'wasm-unsafe-eval' 은 pdf.js 의 이미지
 *   디코더(WebAssembly)용이다.
 * - img-src https: : 뉴스 본문 사진 일부가 언론사 서버에서 바로 온다. 이미지는 스크립트를
 *   실행할 수 없으므로 출처를 넓게 둔다.
 * - frame-src: 문의 페이지 Google 지도.
 * - frame-ancestors 'self': X-Frame-Options SAMEORIGIN 과 같은 뜻. 구형 브라우저용으로 둘 다 둔다.
 * - preview 배포에는 Vercel 툴바(vercel.live)를 허용한다. 운영에는 넣지 않는다.
 */
const isPreview = process.env.VERCEL_ENV === "preview";
const isDev = process.env.NODE_ENV === "development";
const VERCEL_LIVE = isPreview ? ["https://vercel.live"] : [];

const CSP_DIRECTIVES: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'wasm-unsafe-eval'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    ...VERCEL_LIVE,
  ],
  "style-src": ["'self'", "'unsafe-inline'", ...VERCEL_LIVE],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:", ...(isPreview ? ["https://vercel.live", "https://assets.vercel.com"] : [])],
  "connect-src": [
    "'self'",
    ...(isPreview ? ["https://vercel.live", "wss://ws-us3.pusher.com"] : []),
    ...(isDev ? ["ws:"] : []),
  ],
  "media-src": ["'self'"],
  "worker-src": ["'self'", "blob:"],
  "frame-src": ["https://www.google.com", ...VERCEL_LIVE],
  "frame-ancestors": ["'self'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "manifest-src": ["'self'"],
};

const CONTENT_SECURITY_POLICY =
  Object.entries(CSP_DIRECTIVES)
    .map(([k, v]) => `${k} ${v.join(" ")}`)
    .join("; ") + (isDev ? "" : "; upgrade-insecure-requests");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return buildRedirects();
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
