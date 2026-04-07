#!/usr/bin/env node
/**
 * Notify search engines after a successful production deploy.
 *
 * 1) Submits the sitemap URL to Google + Bing legacy ping endpoints.
 * 2) Pushes the full URL list to IndexNow (Bing, Yandex, NAVER, Seznam).
 *
 * Run after each deploy: `node scripts/notify-search-engines.mjs`
 *
 * Required env (with fallbacks):
 *   SITE_URL              default: https://www.rudacure.com
 *   INDEXNOW_KEY          default: 389da52ef996f0b07c2fd146b724b816
 *   INDEXNOW_KEY_LOCATION default: ${SITE_URL}/${INDEXNOW_KEY}.txt
 */

const SITE_URL = (process.env.SITE_URL || "https://www.rudacure.com").replace(/\/$/, "");
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "389da52ef996f0b07c2fd146b724b816";
const INDEXNOW_KEY_LOCATION =
  process.env.INDEXNOW_KEY_LOCATION || `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const LOCALES = ["ko", "en", "zh", "ja", "es", "fr"];
const PATHS = [
  "",
  "/science",
  "/pipeline",
  "/ir",
  "/news",
  "/publications",
  "/sab",
  "/about",
  "/contact",
];

const URLS = LOCALES.flatMap((l) => PATHS.map((p) => `${SITE_URL}/${l}${p}`));
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

async function pingSitemap() {
  const targets = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ];
  const results = await Promise.allSettled(
    targets.map((url) => fetch(url, { method: "GET" }).then((r) => `${r.status} ${url}`))
  );
  for (const r of results) {
    if (r.status === "fulfilled") console.log(`[ping] ${r.value}`);
    else console.log(`[ping] ERR ${r.reason}`);
  }
}

async function submitIndexNow() {
  const body = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: URLS,
  };

  // IndexNow distributes to Bing, Yandex, Seznam, NAVER, Yep automatically.
  const endpoint = "https://api.indexnow.org/IndexNow";
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(
    `[indexnow] ${resp.status} ${resp.statusText} (${URLS.length} URLs submitted)`
  );
}

async function main() {
  console.log(`Notifying search engines for ${SITE_URL}`);
  await pingSitemap();
  await submitIndexNow();
}

main().catch((err) => {
  console.error("notify-search-engines failed:", err);
  process.exit(1);
});
