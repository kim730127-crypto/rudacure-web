import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * 2026-03 이전 gnuboard 사이트가 남긴 기계용 경로. 후속 페이지가 없고 생길 예정도 없다.
 *
 * 목록을 짠 근거는 Search Console 「리디렉션이 포함된 페이지」 30건과 「찾을 수 없음
 * (404)」 22건에 실제로 올라온 주소다. 로그인, 회원가입, 첨부파일 내려받기, 캡차처럼
 * 새 사이트에 대응 기능이 아예 없는 것들이라, 없어졌다고 답하는 편이 정확하다.
 *
 * 새 사이트에 대응 페이지가 있는 경로(`/bbs/page.php?hid=m03_01` → `/ko/cro` 등)는
 * next.config.ts 의 301 이 여기까지 오기 전에 처리한다. Next 는 next.config 의 redirects 를
 * middleware 보다 앞에 실행한다 - 관찰로 확인했다(`/home` 은 middleware 가 만들 `/en/home`
 * 이 아니라 next.config 의 `/ko` 로 나간다). 그러니 이 그물에 걸리는 것은 매핑 대상이
 * 아닌 나머지뿐이다.
 *
 * 404 가 아니라 410 을 고른 이유. 404 는 「지금 없다」고 말하고 410 은 「의도적으로
 * 없앴다」고 말한다. Google 은 후자를 색인에서 더 빨리 빼고 재크롤링도 더 빨리 줄인다.
 */
const GONE_PREFIXES = [
  "/bbs/", // 게시판 엔진
  "/plugin/", // kcaptcha 등 gnuboard 플러그인
  "/data/file/", // 게시판 첨부파일 저장소
  "/data/editor/",
  "/skin/", // gnuboard 스킨 에셋
  "/img/pdf/", // 구 사이트 PDF
  "/cdn-cgi/", // Cloudflare email-protection 잔여물
  "/adm/",
];

/** 서버사이드 스크립트 확장자. 이 사이트에는 하나도 없다. */
const GONE_EXTENSION = /\.(php|php3|asp|aspx|jsp|cgi)$/i;

function isGone(pathname: string): boolean {
  return (
    GONE_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    GONE_EXTENSION.test(pathname)
  );
}

const GONE_BODY = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>410 Gone</title><meta name="robots" content="noindex, nofollow"></head><body><h1>410 Gone</h1><p>이 주소는 이전 홈페이지에서 쓰던 경로로, 대체할 페이지 없이 삭제되었습니다.</p><p><a href="https://www.rudacure.com/ko">루다큐어 홈으로 이동</a></p></body></html>`;

function gone(): NextResponse {
  return new NextResponse(GONE_BODY, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has a locale prefix
  const matchedLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (matchedLocale) {
    // 이미 로케일이 붙은 레거시 경로도 같이 잡는다. Search Console 이 기록한 것 중
    // /en/plugin/kcaptcha 처럼 middleware 가 직접 만들어 낸 형태가 섞여 있다.
    const rest = pathname.slice(`/${matchedLocale}`.length) || "/";
    if (isGone(rest)) return gone();
    return NextResponse.next();
  }

  // 죽은 레거시 경로는 로케일을 붙이기 전에 잘라 낸다. 확장자가 붙어 아래 정적파일
  // 분기로 빠지면 [locale] 라우트까지 흘러가 홈으로 리디렉션되고, 그 형태가 바로
  // Google 이 soft 404 로 읽는 패턴이다.
  if (isGone(pathname)) return gone();

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Detect preferred language from Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLang.includes("ko")
    ? "ko"
    : acceptLang.includes("zh")
      ? "zh"
      : acceptLang.includes("ja")
        ? "ja"
        : acceptLang.includes("es")
          ? "es"
          : acceptLang.includes("fr")
            ? "fr"
            : acceptLang.includes("ar")
              ? "ar"
              : "en";

  // Redirect to locale-prefixed path
  const locale = preferredLocale || DEFAULT_LOCALE;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url),
  );
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
