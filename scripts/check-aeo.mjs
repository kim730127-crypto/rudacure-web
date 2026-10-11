#!/usr/bin/env node
import assert from "node:assert/strict";

const base = (process.argv[2] || "http://localhost:3217").replace(/\/$/, "");
let checks = 0;
function check(value, label) { assert.ok(value, label); checks++; console.log(`PASS ${label}`); }
async function get(path, agent = "OAI-SearchBot") {
  const response = await fetch(`${base}${path}`, { headers: { "User-Agent": agent } });
  assert.equal(response.status, 200, path);
  return { response, text: await response.text() };
}
function jsonLd(html) {
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}
function graph(nodes) { return nodes.flatMap((node) => node["@graph"] ?? [node]); }

const robots = await get("/robots.txt");
check(robots.text.includes("User-Agent: OAI-SearchBot\nAllow: /"), "AI search crawler allowed");
check(!robots.text.includes("Disallow: /_next"), "Rendering assets crawlable");
const sitemap = await get("/sitemap.xml");
check(sitemap.text.includes("/ko/faq</loc>") && sitemap.text.includes("/en/faq</loc>"), "FAQ in sitemap");
check(!sitemap.text.includes("/ja/faq</loc>"), "No fake translated FAQ URLs");
const llms = await get("/llms.txt");
check(llms.response.headers.get("content-type")?.includes("text/plain"), "llms index is text");
check(!llms.text.includes("RC0124") && !llms.text.includes("science@"), "No stale programme or contact in llms index");
for (const locale of ["ko", "en"]) {
  const faq = await get(`/${locale}/faq`);
  const nodes = graph(jsonLd(faq.text));
  const schema = nodes.find((node) => node["@type"] === "FAQPage");
  check(schema?.mainEntity.length === 7, `${locale}: seven source-linked answers`);
  check(schema.inLanguage === locale, `${locale}: schema language matches page`);
  for (const question of schema.mainEntity) {
    check(faq.text.includes(question.name.replaceAll("&", "&amp;").replaceAll("'", "&#x27;")) || faq.text.includes(question.name), `${locale}: visible question ${question["@id"].split("#")[1]}`);
    check(question.acceptedAnswer.citation.length > 0, `${locale}: answer has source links`);
    // Visible text and llms must derive from the exact same answer payload.
    check(faq.text.includes(question.acceptedAnswer.text.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', '&quot;')) || faq.text.includes(question.acceptedAnswer.text), `${locale}: answer matches schema`);
    if (locale === "en") check(llms.text.includes(question.acceptedAnswer.text), "llms matches visible English answer");
  }
  check(faq.text.includes("NCT07068958"), `${locale}: trial source linked`);
  check(faq.text.includes(`rel="canonical" href="https://www.rudacure.com/${locale}/faq"`), `${locale}: canonical correct`);
  for (const sourcePath of new Set(schema.mainEntity.flatMap((q) => q.acceptedAnswer.citation).filter((c) => new URL(c.url).host === "www.rudacure.com").map((c) => new URL(c.url).pathname))) {
    await get(sourcePath);
    check(true, `${locale}: source page available ${sourcePath}`);
  }
  const science = await get(`/${locale}/science`);
  const project = graph(jsonLd(science.text)).find((node) => node["@type"] === "ResearchProject");
  check(project?.url === `https://www.rudacure.com/${locale}/science`, `${locale}: platform schema uses canonical language URL`);
  check(!project.description.includes("60% of approved drug targets"), `${locale}: no schema-only target statistic`);
  const pipeline = await get(`/${locale}/pipeline`);
  const collection = graph(jsonLd(pipeline.text)).find((node) => node["@type"] === "CollectionPage");
  check(collection.mainEntity.numberOfItems === 5, `${locale}: all five public pipeline items structured`);
  check(!pipeline.text.includes('"status":"Recruiting"') && !pipeline.text.includes('"clinicalPhase"'), `${locale}: no stale recruitment or unsupported phase property`);
  for (const item of collection.mainEntity.itemListElement) check(pipeline.text.includes(`id="${item.item.name.split(" ")[0]}"`), `${locale}: candidate anchor exists`);
  const organization = graph(jsonLd(faq.text)).find((node) => node["@type"] === "Corporation");
  check(organization.address.addressLocality === "Incheon", `${locale}: headquarters matches visible Contact`);
  check(organization.contactPoint.some((point) => point.email === "jyshin@rudacure.com"), `${locale}: CRO contact matches Contact`);
}
for (const [locale, word] of [["ja", "未来を"], ["zh", "塑造"], ["ar", "المستقبل"]]) {
  const contact = await get(`/${locale}/contact`);
  check(contact.text.includes(word), `${locale}: Contact uses actual translation`);
}
for (const locale of ["ja", "zh", "ar"]) {
  const about = await get(`/${locale}/about`);
  const node = graph(jsonLd(about.text)).find((item) => item["@type"] === "AboutPage");
  const english = (await get("/en/about")).text;
  const enNode = graph(jsonLd(english)).find((item) => item["@type"] === "AboutPage");
  check(node.description !== enNode.description, `${locale}: About uses translated description`);
}
const redirect = await fetch(`${base}/ja/faq`, { redirect: "manual" });
check(redirect.status === 308 && redirect.headers.get("location") === "/en/faq", "Untranslated FAQ redirects to actual English edition");
const article = await get("/ko/news/192");
check(graph(jsonLd(article.text)).some((node) => node["@type"] === "NewsArticle"), "Article schema parses after safe serialization");
const home = await get("/ko");
check(home.text.includes("<noscript><style>") && home.text.includes("opacity:1!important"), "No-JS reveal fallback present");
console.log(`AEO checks passed: ${checks}`);
