"use client";

import Image from "next/image";
import { useState } from "react";

/* Every logo here is a wide wordmark (625×209, 380×170, 1200×631 …). The
   previous tile was a 48×48 square tinted with one of nine pastel background
   colours, so a wordmark rendered roughly 40px wide by 14px tall — illegible —
   inside what read as a rainbow. Two changes fix both halves: a 3:1 slot that
   matches the shape of a wordmark, and one neutral surface for every partner
   instead of nine.

   Marks are desaturated at rest and restored on hover. A partner wall reads as
   one object that way rather than as nine competing brand palettes, and no
   trademark is permanently altered. */

function MonogramTile({ initials }: { initials: string }) {
  return (
    <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-[var(--rc-ink-500)]">
      {initials}
    </span>
  );
}

export function PartnerLogo({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  /* A partner the page deliberately does not name has no mark to show. The
     previous placeholder was a cartoon dog with white eyes, which is the one
     element on this page that could not survive a diligence screenshot. */
  const isAnonymous = src.startsWith("pictogram:");
  const showMonogram = isAnonymous || failed;

  return (
    <div className="partner-mark">
      {showMonogram ? (
        <MonogramTile initials={initials} />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={132}
          height={44}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
