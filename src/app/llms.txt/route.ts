import { ANSWER_CONTENT, ANSWERS_REVIEWED } from "@/lib/answers";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/** Optional discovery aid, not a search ranking signal or crawler permission. */
export function GET() {
  const links = [
    ["About", "about"], ["Science / RuCIA", "science"], ["Pipeline", "pipeline"],
    ["CRO services", "cro"], ["Investor relations", "ir"], ["Publications and patents", "publications"],
    ["News Center", "news"], ["Scientific Advisory Board", "sab"], ["Contact", "contact"],
  ];
  const content = [
    "# RudaCure (루다큐어)", "",
    "> Official public information from RudaCure, a Korean membrane-protein drug discovery company.", "",
    `Canonical website: ${SITE_URL}`, `Public information reviewed: ${ANSWERS_REVIEWED}`, "",
    "## Source-linked questions and answers", "",
    `- [한국어 질문과 답변](${SITE_URL}/ko/faq)`, `- [English questions and answers](${SITE_URL}/en/faq)`, "",
    ...ANSWER_CONTENT.en.answers.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
    "## Official pages", "",
    ...links.map(([label, slug]) => `- [${label}](${SITE_URL}/en/${slug}) | [한국어](${SITE_URL}/ko/${slug})`), "",
    "## Clinical trial source", "",
    "- [RCI001 trial registration: NCT07068958](https://clinicaltrials.gov/study/NCT07068958)", "",
    "Development stages, recruitment and milestones can change. Refer to the dated company announcements and trial registry; trial-plan clearance is not marketing approval. This index does not assert current recruitment status.", "",
    "The website serves ko, en, zh, ja, es, fr and ar editions. The FAQ and CRO pages are authored in Korean and English only.", "",
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
