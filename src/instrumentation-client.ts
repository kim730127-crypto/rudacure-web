import { initBotId } from "botid/client/core";

/*
 * Vercel BotID (2026-11-04, 보안 점검 F-04).
 * 문의 폼은 서버 액션이라 각 언어의 /contact 페이지로 POST 한다. 여기 등록한 경로의
 * 요청에만 BotID 헤더가 붙고, 서버의 checkBotId() 가 그 헤더로 판정한다. 경로를 빼면
 * 서버 판정이 실패하므로 문의 페이지 경로를 바꿀 때 같이 고친다.
 */
initBotId({
  protect: [{ path: "/*/contact", method: "POST" }],
});
