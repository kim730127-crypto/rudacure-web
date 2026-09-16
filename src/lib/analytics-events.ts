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
 * A request landed on the catch-all 404.
 *
 * `path` is normalised before it is sent: the locale segment is dropped and any
 * numeric segment becomes `:n`, so `/en/news/1832` and `/ja/news/9` collapse to
 * one row. Without that the event list grows one row per broken link and stops
 * being usable.
 */
export function trackNotFound(pathname: string, locale: string) {
  track("not_found", { path: normaliseNotFoundPath(pathname), locale });
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
