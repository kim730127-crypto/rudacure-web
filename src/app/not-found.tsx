import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center text-white px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-teal-400 mb-4">404</div>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/ko"
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
      <div className="mt-12 text-xs text-gray-600">
        © 2026 RudaCure Inc. All rights reserved.
      </div>
    </div>
  );
}
