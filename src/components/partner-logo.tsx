"use client";

import Image from "next/image";
import { useState } from "react";

function AnimalPictogram() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      {/* Dog/animal silhouette */}
      <path d="M12 36c0-2 1-4 3-5l2-6c1-3 3-5 6-6l1-3c0-1 1-2 2-2s2 1 2 2l1 3c3 1 5 3 6 6l2 6c2 1 3 3 3 5v2H12v-2z" fill="currentColor" opacity="0.8"/>
      {/* Ears */}
      <path d="M16 14c-1-3-3-5-5-6 0 0-1 3 0 6s3 5 3 5l2-5z" fill="currentColor" opacity="0.6"/>
      <path d="M32 14c1-3 3-5 5-6 0 0 1 3 0 6s-3 5-3 5l-2-5z" fill="currentColor" opacity="0.6"/>
      {/* Eyes */}
      <circle cx="20" cy="22" r="1.5" fill="white"/>
      <circle cx="28" cy="22" r="1.5" fill="white"/>
      {/* Nose */}
      <ellipse cx="24" cy="26" rx="2" ry="1.5" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

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
  const isPictogram = src === "pictogram:animal";

  return (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${badgeClass}`}>
      {isPictogram ? (
        <AnimalPictogram />
      ) : !failed ? (
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
