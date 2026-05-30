# LinkedIn Playbook — Seunghoon Kim (Personal Account)

> Companion to `04-linkedin-content-calendar.md`. That file = company-page calendar + pillars.
> This file = the **personal-account** voice + the repeatable weekly drafting workflow.

## Identity / byline
- **Name:** Seunghoon Kim
- **Title:** Vice President, RudaCure (루다큐어 부사장)
- **Credentials:** Ph.D., PMP
- **Profile:** https://www.linkedin.com/ (Seunghoon Kim — 루다큐어 부사장, 서울/인천)
- **Default sign-off:** `— Seunghoon Kim, Ph.D., PMP · Vice President, RudaCure`
- **Authority:** VP who runs RudaCure's **actual day-to-day operations** — so this account speaks with real strategic/operational weight, not as a secondary voice. Primary lane = **business / BD / platform strategy / investor narrative**. (Bench-science explainers can stay on the company page / founder's account; this account owns the operator-and-dealmaker POV.)

## Audience priority (drives topic selection)
1. **Global pharma BD / licensing** (primary) — partnering, platform value, de-risking
2. **Investors** (IPO prep, KOSDAQ) — milestones, market, validation
3. Scientific KOLs / peers (secondary)
4. Talent (occasional)

## Voice rules
- First person, conversational, confident but not hype. "I", not "we, the company".
- Lead with a hook / mild contrarian take ("Most people still file us under 'the TRPV1 company.'").
- Concrete > adjectives: NCT07068958, ~60% of drug targets, 650×, 19+ CRO contracts, FDA Phase 2.
- 1 idea per post. 120–220 words. Short lines, scannable bullets.
- **English only.**
- **No outbound link in the body** (LinkedIn suppresses reach) → put the URL in the **first comment**.
- 6–8 hashtags, mix big + niche (see calendar file).
- End with a soft CTA to *conversation*, not a sell ("I'd like to compare notes").

## Cadence (user-driven topics)
- **2×/week**, suggested **Tue + Thu** (personal-account days in the calendar).
- Posting time: 9 AM KST or 9 AM EST (test both).
- The **user supplies the issue**; drafting is on-demand (see workflow). No auto-posting — LinkedIn personal profiles have no post API; drafts are copy-paste.

## Pillar rotation for this account (pick to fit the issue)
| Pillar | Example angle |
|---|---|
| Platform strategy | "membrane proteins = ~60% of targets, hardest to screen — that's the moat" |
| Pipeline/BD | RCI001 FDA Ph2, RCI002 non-opioid, RC0125 AAV — partnering angle |
| Industry POV | reaction to a competitor approval / FDA decision / market data |
| Investor narrative | IPO path, validation (Hanlim KRW 15B tech transfer), ODD strategy |
| Behind-the-platform | how RuCIA works, why electrophysiology + AI |

## Workflow — how to use this each week
**You give me an issue in 1–2 lines** (e.g. "competitor X got FDA approval for dry eye" / "we filed ODD for RCI002" / "JPM week, want a BD post"). I return, ready to paste:
1. **Post body** (English, your voice, ≤220 words)
2. **First comment** (the link + 1-line CTA)
3. **Hashtags** (6–8)
4. **Image/visual suggestion** (1 line)
5. (if useful) an alternate hook to A/B test

Then you paste into LinkedIn and publish. I log the topic below so we don't repeat and keep the 2×/week rhythm.

## Posted log (append each time)
| Date | Pillar | Topic | Link |
|---|---|---|---|
| 2026-04-07 | Pipeline | RCI001 FDA Phase 2 milestone (Post #1, EN) | urn:li:activity:7447160810772103168 |
| 2026-05-30 | Platform strategy | "Not just the TRPV1 company" — membrane-protein (ion channels + GPCRs), FDA Ph2, image: RCI002 MoA graphic | urn:li:share:7466303209867776000 |
| _next_ | | | |

> **API note:** auto-posting works (text + image), but the **first comment fails with 403** — comment creation (`socialActions`) is not in the self-serve "Share on LinkedIn" scope. **Add the first comment (the link) manually** after each post. Also set `LINKEDIN_VERSION` to a current YYYYMM (~last 12 months); 202505 is expired — use 202601+ (override: `LINKEDIN_VERSION=202601 node ...`).

## Guardrails (accuracy)
- Only public, approved facts. Safe source of truth = the site's pipeline page + FAQ JSON-LD (`src/app/layout.tsx`) — vetted talking points (NCT07068958, mechanisms, partners, ODD strategy).
- Do **not** state GPCR work beyond MOR (RCI002); platform spans ion channels + GPCR (MOR) — no other GPCR/transporter programs claimed.
- Numbers must match the site (70% faster, $94B market, 650×, 19+ CRO).
