#!/usr/bin/env node
/**
 * 홈페이지 트래픽 집계 - 봇 제외 기준 B1-B3 적용.
 *
 * 왜 있는가
 *   Vercel Analytics 대시보드는 방문자 수를 날것으로 보여준다. 2026년 8-9월 집계에서
 *   그 숫자의 절반 가까이가 자동 수집이었다. 대외에 쓸 수치는 반드시 이 스크립트를
 *   거친다. 판정 규칙과 근거는 docs/analytics-conventions.md 1장.
 *
 * 쓰는 법
 *   1) API에서 직접 받기
 *        VERCEL_TOKEN=xxxx node scripts/analytics-report.mjs --from 2026-08-17 --to 2026-09-16
 *
 *   2) 저장해 둔 원자료로 돌리기 (토큰이 없거나 과거 회차를 다시 계산할 때)
 *        node scripts/analytics-report.mjs --input tmp/raw-2026-09.json
 *
 *   3) 원자료만 받아 저장하기
 *        VERCEL_TOKEN=xxxx node scripts/analytics-report.mjs --from ... --to ... --save raw.json
 *
 *   --json 을 붙이면 사람이 읽는 표 대신 JSON 을 낸다.
 *
 * 토큰
 *   Vercel 계정 설정 > Tokens 에서 발급한다. 팀 스코프를 ruda-cure 로 잡아야 한다.
 *   토큰이 막혀 있으면 대시보드를 연 브라우저에서 원자료를 받아 --input 으로 돌린다.
 *   받는 방법은 README_RAW 상수에 적어 두었다.
 */

const TEAM_ID = "team_Yv8mph1O94T9dOh8844z4Q2d";
const PROJECT = "rudacure-web";
const TZ = "Asia/Seoul";
const API = "https://vercel.com/api/web-analytics/v2";

/** 판정에 쓰는 차원. 하나라도 빠지면 집계를 중단한다. */
const DIMENSIONS = ["country", "os_name", "client_name", "path", "referrer"];

/** B1 - 서버에서 도는 크롤러의 운영체제. */
const BOT_OS = new Set(["GNU/Linux"]);

/** B2 - 사람의 브라우저 선택으로 설명되지 않는 클라이언트. */
const BOT_CLIENT = new Set(["curl", "Chromium", "UC Browser"]);

/** B3 - 국가별 방문자당 페이지뷰 경계. 근거는 conventions 1.2. */
const DEPTH_FLOOR = 1.25;

/**
 * 핵심 독자 경계.
 *
 * B1-B3 은 「확실히 봇인 것」을 걷어내는 음성 판정이라 경계선에 걸친 집단이 남는다.
 * 대외 인용에는 그 반대 방향, 즉 「확실히 읽은 것」만 세는 양성 판정을 쓴다.
 * 2026-08/09 분포에서 깊이 2.0 위는 한국 5.30 과 일본 2.79 뿐이고 그 아래는 1.7 이하로
 * 뚝 떨어진다. 이 값이 두 무리 사이의 빈 구간이다.
 */
const CORE_DEPTH = 2.0;

const README_RAW = `
원자료를 브라우저에서 받는 방법
  1. Vercel 대시보드에서 rudacure-web > Analytics 를 연다.
  2. 개발자 도구 콘솔에 아래를 붙여 넣는다. FROM/TO 만 바꾼다.

     (async () => {
       const FROM = "2026-08-17T00:00:00.000+09:00";
       const TO   = "2026-09-16T23:59:59.999+09:00";
       const q = t => \`/api/web-analytics/v2/stats?environment=production&filter=%7B%7D\`
         + \`&from=\${encodeURIComponent(FROM)}&limit=250&projectId=${PROJECT}\`
         + \`&teamId=${TEAM_ID}&to=\${encodeURIComponent(TO)}&type=\${t}&tz=Asia%2FSeoul\`;
       const out = { from: FROM, to: TO, stats: {} };
       for (const t of ${JSON.stringify(DIMENSIONS)}) {
         out.stats[t] = (await (await fetch(q(t))).json()).data;
       }
       copy(JSON.stringify(out));
       console.log("복사했다. 파일로 저장한 뒤 --input 으로 넘긴다.");
     })();

  3. 저장한 파일을 --input 으로 넘긴다.
`;

function parseArgs(argv) {
  const out = { json: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (a.startsWith("--")) out[a.slice(2)] = argv[++i];
  }
  return out;
}

function fail(message) {
  console.error(`\n오류: ${message}\n`);
  process.exit(1);
}

async function fetchStats(from, to, token) {
  const stats = {};
  for (const type of DIMENSIONS) {
    const url =
      `${API}/stats?environment=production&filter=%7B%7D` +
      `&from=${encodeURIComponent(from)}&limit=250&projectId=${PROJECT}` +
      `&teamId=${TEAM_ID}&to=${encodeURIComponent(to)}&type=${type}` +
      `&tz=${encodeURIComponent(TZ)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
    });
    if (!res.ok) {
      const body = await res.text();
      fail(
        `${type} 조회 실패 (HTTP ${res.status}).\n` +
          `${body.slice(0, 300)}\n` +
          `토큰이 막혀 있다면 아래 방법으로 원자료를 받아 --input 으로 돌린다.\n${README_RAW}`,
      );
    }
    const json = await res.json();
    stats[type] = json.data;
  }
  return stats;
}

/**
 * B1-B3 을 적용한다.
 *
 * 차원별 합계만 주어지므로 방문자 단위 교집합은 알 수 없다. 그래서 세 규칙을 더하지 않고
 * **가장 큰 하나를 취한 뒤 겹치지 않는 부분만 더한다.** B1 과 B3 은 크게 겹치므로
 * 단순 합산은 제외 인원을 부풀린다. 이 보수적 처리 때문에 결과는 하한이다.
 */
function applyExclusions(stats) {
  const country = stats.country ?? [];
  const os = stats.os_name ?? [];
  const client = stats.client_name ?? [];

  const totalVisitors = country.reduce((a, c) => a + c.devices, 0);
  const totalViews = country.reduce((a, c) => a + c.total, 0);

  const b1 = os
    .filter((o) => BOT_OS.has(o.key))
    .reduce((a, o) => a + o.devices, 0);

  const b2 = client
    .filter((c) => BOT_CLIENT.has(c.key))
    .reduce((a, c) => a + c.devices, 0);

  const shallowCountries = country.filter(
    (c) => c.devices > 0 && c.total / c.devices < DEPTH_FLOOR,
  );
  const b3 = shallowCountries.reduce((a, c) => a + c.devices, 0);
  const b3Views = shallowCountries.reduce((a, c) => a + c.total, 0);

  // 겹침을 알 수 없으므로 하한(가장 큰 규칙)과 상한(단순 합)을 모두 낸다.
  const excludedLow = Math.max(b1, b2, b3);
  const excludedHigh = Math.min(b1 + b2 + b3, totalVisitors);

  const coreCountries = country.filter(
    (c) => c.devices > 0 && c.total / c.devices >= CORE_DEPTH,
  );
  const coreVisitors = coreCountries.reduce((a, c) => a + c.devices, 0);
  const coreViews = coreCountries.reduce((a, c) => a + c.total, 0);

  return {
    coreVisitors,
    coreViews,
    coreCountries: coreCountries
      .map((c) => ({
        country: c.key,
        visitors: c.devices,
        views: c.total,
        depth: +(c.total / c.devices).toFixed(2),
      }))
      .sort((a, b) => b.visitors - a.visitors),
    totalVisitors,
    totalViews,
    b1,
    b2,
    b3,
    b3Views,
    shallowCountries: shallowCountries.map((c) => ({
      country: c.key,
      visitors: c.devices,
      views: c.total,
      depth: +(c.total / c.devices).toFixed(2),
    })),
    excludedLow,
    excludedHigh,
    citableLow: totalVisitors - excludedHigh,
    citableHigh: totalVisitors - excludedLow,
  };
}

function pad(s, n) {
  s = String(s);
  let w = 0;
  for (const ch of s) w += /[\u1100-\u11ff\u3000-\u9fff\uac00-\ud7af\uff00-\uffef]/.test(ch) ? 2 : 1;
  return s + " ".repeat(Math.max(0, n - w));
}

function report(r, from, to) {
  const L = [];
  L.push("");
  L.push(`홈페이지 트래픽 집계  ${from.slice(0, 10)} - ${to.slice(0, 10)}  (${TZ})`);
  L.push("=".repeat(72));
  L.push("");
  L.push(`  원자료 방문자        ${r.totalVisitors.toLocaleString()}명`);
  L.push(`  원자료 페이지뷰      ${r.totalViews.toLocaleString()}건`);
  L.push("");
  L.push("  봇 제외 판정");
  L.push(`    B1 GNU/Linux       ${pad(r.b1 + "명", 10)}`);
  L.push(`    B2 curl 등         ${pad(r.b2 + "명", 10)}`);
  L.push(`    B3 열람깊이 <${DEPTH_FLOOR}   ${pad(r.b3 + "명", 10)} (${r.shallowCountries.length}개국, ${r.b3Views}건)`);
  L.push("");
  L.push(`  제외 인원            ${r.excludedLow.toLocaleString()} - ${r.excludedHigh.toLocaleString()}명`);
  L.push(`  봇 제외 후 잔여      ${r.citableLow.toLocaleString()} - ${r.citableHigh.toLocaleString()}명`);
  L.push("");
  L.push("  * 차원별 합계만 제공되므로 방문자 단위 교집합은 알 수 없다. 제외 인원은");
  L.push("    「가장 큰 규칙 하나」를 하한, 「세 규칙 단순 합」을 상한으로 둔 구간이다.");
  L.push("    이 잔여값은 상한이지 인용값이 아니다. 경계선에 걸친 집단이 남아 있다.");
  L.push("");
  L.push("-".repeat(72));
  L.push(`  ▶ 대외 인용 수치 (핵심 독자)   ${r.coreVisitors.toLocaleString()}명 / ${r.coreViews.toLocaleString()}건`);
  L.push("-".repeat(72));
  L.push(`  방문자당 ${CORE_DEPTH}화면 이상을 연 국가만 합산한 값이다. 보고서와 사외 자료에는`);
  L.push("  이 숫자 하나를 쓴다. B1-B3 잔여값은 대조용으로만 둔다.");
  L.push("");
  L.push("  핵심 독자 구성");
  L.push("  " + "-".repeat(50));
  L.push("  " + pad("국가", 8) + pad("방문자", 10) + pad("페이지뷰", 12) + "깊이");
  for (const c of r.coreCountries) {
    L.push("  " + pad(c.country, 8) + pad(c.visitors, 10) + pad(c.views, 12) + c.depth);
  }
  L.push("");
  L.push("  B3에 걸린 국가");
  L.push("  " + "-".repeat(50));
  L.push("  " + pad("국가", 8) + pad("방문자", 10) + pad("페이지뷰", 12) + "깊이");
  for (const c of r.shallowCountries.sort((a, b) => b.visitors - a.visitors)) {
    L.push("  " + pad(c.country, 8) + pad(c.visitors, 10) + pad(c.views, 12) + c.depth);
  }
  L.push("");
  L.push("  기준: docs/analytics-conventions.md 1장");
  L.push("");
  return L.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(README_RAW);
    process.exit(0);
  }

  let raw;
  if (args.input) {
    const fs = await import("node:fs/promises");
    raw = JSON.parse(await fs.readFile(args.input, "utf8"));
    if (!raw.stats) fail(`${args.input} 에 stats 키가 없다.`);
  } else {
    const token = process.env.VERCEL_TOKEN || args.token;
    if (!token) fail(`VERCEL_TOKEN 이 없다. --input 으로 원자료를 넘기거나 토큰을 설정한다.\n${README_RAW}`);
    if (!args.from || !args.to) fail("--from 과 --to 가 필요하다. 예: --from 2026-08-17 --to 2026-09-16");
    const from = `${args.from}T00:00:00.000+09:00`;
    const to = `${args.to}T23:59:59.999+09:00`;
    raw = { from, to, stats: await fetchStats(from, to, token) };
    if (args.save) {
      const fs = await import("node:fs/promises");
      await fs.writeFile(args.save, JSON.stringify(raw, null, 1));
      console.error(`원자료 저장: ${args.save}`);
    }
  }

  for (const d of ["country", "os_name", "client_name"]) {
    if (!Array.isArray(raw.stats[d])) fail(`원자료에 ${d} 가 없다. 집계를 중단한다.`);
  }

  const result = applyExclusions(raw.stats);
  if (args.json) {
    console.log(JSON.stringify({ from: raw.from, to: raw.to, ...result }, null, 2));
  } else {
    console.log(report(result, raw.from, raw.to));
  }
}

main().catch((e) => fail(e.stack || String(e)));
