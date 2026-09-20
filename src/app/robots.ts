import type { MetadataRoute } from "next";

const SITE_URL = "https://www.rudacure.com";

/**
 * robots.txt
 *
 * 왜 이 구조인가 - 규격을 한 번 잘못 읽으면 규칙이 통째로 죽는다.
 *
 * robots.txt 는 요청한 크롤러에 **가장 구체적으로 일치하는 그룹 하나만** 적용하고 나머지
 * 그룹은 전부 무시한다. 이전 판은 `User-agent: *` 에 `/api/`, `/_next/`, `/admin/` 을
 * 막아 두고 `Googlebot` 에는 `Allow: /` 만 있는 별도 그룹을 두었다. 그래서 Googlebot 은
 * 물론 Bingbot·Yeti·Baiduspider 와 여기 이름을 올린 AI 크롤러 전부가 그 세 줄을 한 번도
 * 본 적이 없다. 의도와 동작이 달랐다.
 *
 * 그 상태를 그대로 「고치면」 오히려 손해다. 두 경로는 막으면 안 된다.
 *   - `/_next/` : 페이지 렌더링에 필요한 JS·CSS 가 여기 있다. 막으면 크롤러가 빈 페이지를 본다.
 *   - `/api/image-proxy` : 뉴스 본문 이미지가 전부 이 경로를 거친다
 *     (news.json 의 cdn.quv.kr 참조 174건). 막으면 기사 이미지가 검색에서 사라진다.
 *
 * 그래서 막을 것만 남기고 모든 그룹에 같은 규칙을 준다.
 *
 * 이름 붙인 그룹을 남겨 두는 이유는 AI 크롤러를 명시적으로 허용한다는 방침을 파일 안에
 * 남기기 위해서다. 다만 규칙은 반드시 같은 배열을 공유한다 - 한쪽만 고치면 다시 갈라진다.
 *
 * 구 gnuboard 잔해(`/bbs/`, `/plugin/`, `/data/file/`, `/img/pdf/`)를 차단 목록에서
 * 뺀 이유 - 2026-09-20 Search Console 조치.
 *
 * 색인에서 URL 을 빼는 유일한 경로는 크롤러가 그 URL 을 **다시 읽고** 404·410·noindex 를
 * 확인하는 것이다. robots.txt 로 막으면 재방문 자체가 금지되므로 Google 은 삭제 여부를
 * 판정할 수 없고, 이미 물고 있는 항목을 그대로 유지한다. 실제로 「리디렉션이 포함된
 * 페이지」 30건 중 25건이 이 네 경로에 몰려 있었고, 2026-09-17 에 요청한 유효성 검사는
 * 09-19 에 두 건 모두 실패로 끝났다. 막아 둔 상태에서는 몇 번을 다시 요청해도 같다.
 *
 * 그래서 크롤링을 열고 middleware 에서 410 Gone 을 준다. 410 은 404 보다 색인에서
 * 빠지는 속도가 빠르고, 한 번 읽히고 나면 재방문 빈도도 스스로 떨어진다. 목록이 비워진
 * 뒤에 다시 차단할 필요는 없다 - 410 을 내는 경로는 비용이 거의 들지 않는다.
 */

/** 색인 대상이 아닌 경로. 모든 크롤러 그룹이 공유한다. */
const DISALLOW = ["/admin/"];

/**
 * 명시적으로 허용을 선언하는 크롤러.
 *
 * `*` 그룹만으로도 동작은 같지만, AI 어시스턴트 크롤러를 차단하지 않는다는 결정을
 * 파일 안에 남겨 두려는 목적이다.
 */
const NAMED_AGENTS = [
  "Googlebot",
  "Bingbot",
  "Yeti",
  "Baiduspider",
  // AI assistant crawlers - 인용 색인을 위해 전면 허용
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Gemini",
  "Google-Extended",
  "OAI-SearchBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...NAMED_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
