/**
 * Vercel Web Analytics custom events.
 *
 * Why this file exists: page-view data alone cannot separate "opened the IR
 * page" from "asked for the IR material". The 2026-08/09 traffic review could
 * see that a handful of visitors swept every section on investor-meeting days,
 * but not what they were trying to do. Every event below closes one of those
 * gaps, and the names are frozen here so the dashboard does not fill up with
 * near-duplicate strings.
 *
 * Rules:
 *  - Event names are snake_case and past/neutral tense, never UI wording.
 *  - Properties stay low-cardinality. Vercel groups by exact value, so a raw
 *    URL or a free-text field makes the report unreadable.
 *  - Never put anything identifying in a property. No email, no name, no
 *    message body. `contact_submit` carries the enquiry *type*, not the sender.
 */

import { track } from "@vercel/analytics";

export type PipelineCtaTarget = "ir" | "contact";
export type IrContactChannel = "email" | "form";

/** A visitor followed the pipeline page's closing call to action. */
export function trackPipelineCta(target: PipelineCtaTarget, locale: string) {
  track("pipeline_cta_click", { target, locale });
}

/** A visitor used one of the IR page's two contact routes. */
export function trackIrContact(channel: IrContactChannel, locale: string) {
  track("ir_contact_click", { channel, locale });
}

/** A visitor downloaded a patent certificate or a paper PDF. */
export function trackDocumentDownload(
  kind: "patent" | "paper",
  id: string,
  locale: string,
) {
  track("document_download", { kind, id, locale });
}

/** A visitor typed into the contact form for the first time in this session. */
export function trackContactFormStart(locale: string) {
  track("contact_form_start", { locale });
}

/**
 * Fires `fn` once the Vercel Analytics stub exists.
 *
 * Click handlers never need this - by the time a visitor clicks, the stub is
 * long since installed. Mount-time events do. On a 404 the effect runs in the
 * same commit as the `<Analytics/>` component, and `track()` reaches
 * `window.va?.()` before that global is assigned, so the call is dropped with
 * no error. Observed on production 2026-09-16: `pipeline_cta_click` arrived,
 * `not_found` did not, while the page itself rendered correctly.
 *
 * Polls for up to ~3s, then gives up. A dropped 404 event is not worth holding
 * a timer open on a page the visitor is about to leave.
 */
function whenAnalyticsReady(fn: () => void) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { va?: unknown };
  if (typeof w.va === "function") {
    fn();
    return;
  }
  let tries = 0;
  const id = setInterval(() => {
    tries += 1;
    if (typeof w.va === "function") {
      clearInterval(id);
      fn();
    } else if (tries >= 20) {
      clearInterval(id);
    }
  }, 150);
}

/**
 * A request landed on the catch-all 404.
 *
 * `path` is normalised before it is sent: the locale segment is dropped and any
 * numeric segment becomes `:n`, so `/en/news/1832` and `/ja/news/9` collapse to
 * one row. Without that the event list grows one row per broken link and stops
 * being usable.
 */
export function trackNotFound(pathname: string, locale: string) {
  const path = normaliseNotFoundPath(pathname);
  whenAnalyticsReady(() => track("not_found", { path, locale }));
}

const LOCALE_SEGMENT = /^(ko|en|zh|ja|es|fr|ar)$/;

export function normaliseNotFoundPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && LOCALE_SEGMENT.test(segments[0])) segments.shift();
  const normalised = segments
    .map((s) => (/^\d+$/.test(s) ? ":n" : s.slice(0, 32)))
    .slice(0, 4)
    .join("/");
  return normalised ? `/${normalised}` : "/";
}
