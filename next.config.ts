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

/** gnuboard list pages served as /bbs/board.php?bo_table=<id>. */
const BO_TABLE_MAP: Record<string, string> = {
  m06_02: "/contact", // 고객문의
  m07_01: "/news", // 공지사항
};

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

  return rules;
}

const nextConfig: NextConfig = {
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
