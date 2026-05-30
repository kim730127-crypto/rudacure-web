import type { NextConfig } from "next";

// Security headers for XSS, clickjacking, and MIME type sniffing protection
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff", // Prevent MIME type sniffing
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN", // Prevent clickjacking
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com", // Next.js, TailwindCSS, GA4 (gtag.js)
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // Pretendard (jsdelivr) CSS import; Google fonts self-hosted via next/font
      "img-src 'self' data: https:",
      "font-src 'self' https://cdn.jsdelivr.net", // Pretendard webfonts; Google fonts served same-origin (self) by next/font
      "connect-src 'self' https://api.resend.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com", // GA4 collect beacons
      "frame-src https://www.google.com", // Allow Google Maps embeds
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
