"use client";

import Image from "next/image";
import { useState } from "react";

export function PartnerLogo({
  src,
  alt,
  initials,
  badgeClass,
}: {
  src: string;
  alt: string;
  initials: string;
  badgeClass: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${badgeClass}`}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="w-full h-full object-contain p-1"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs font-bold">{initials}</span>
      )}
    </div>
  );
}
