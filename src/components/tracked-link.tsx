"use client";

/**
 * Link and anchor wrappers that fire a Vercel Analytics event on click.
 *
 * The pages that need instrumenting (pipeline, IR, publications) are server
 * components and should stay that way, so the click handler is isolated here
 * rather than turning a whole page into a client bundle.
 */

import Link from "next/link";
import { ReactNode } from "react";
import {
  trackPipelineCta,
  trackIrContact,
  trackDocumentDownload,
  type PipelineCtaTarget,
  type IrContactChannel,
} from "@/lib/analytics-events";

type Base = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function PipelineCtaLink({
  target,
  locale,
  ...rest
}: Base & { target: PipelineCtaTarget; locale: string }) {
  return (
    <Link
      {...rest}
      onClick={() => trackPipelineCta(target, locale)}
      prefetch={false}
    />
  );
}

export function IrContactLink({
  channel,
  locale,
  external,
  ...rest
}: Base & { channel: IrContactChannel; locale: string; external?: boolean }) {
  if (external) {
    const { href, className, children } = rest;
    return (
      <a
        href={href}
        className={className}
        onClick={() => trackIrContact(channel, locale)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      {...rest}
      onClick={() => trackIrContact(channel, locale)}
      prefetch={false}
    />
  );
}

export function DownloadLink({
  kind,
  id,
  locale,
  href,
  className,
  children,
  download,
  title,
}: Base & {
  kind: "patent" | "paper";
  id: string;
  locale: string;
  download?: boolean;
  title?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      {...(download ? { download: "" } : {})}
      onClick={() => trackDocumentDownload(kind, id, locale)}
    >
      {children}
    </a>
  );
}
