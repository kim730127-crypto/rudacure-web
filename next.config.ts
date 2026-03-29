import type { NextConfig } from "next";

// Security headers for XSS, clickjacking, and MIME type sniffing protection
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff', // Prevent MIME type sniffing
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN', // Prevent clickjacking
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js and TailwindCSS
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.resend.com",
      "frame-src https://www.google.com", // Allow Google Maps embeds
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
