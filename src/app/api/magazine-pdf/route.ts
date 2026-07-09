import { NextRequest, NextResponse } from "next/server";

// Magazine PDFs are not in the repo (gitignored); they live on a GitHub
// release. Browsers can't fetch that host (no CORS header), so pdf.js reads
// through this same-origin proxy instead.
const RELEASE_BASE =
  "https://github.com/kim730127-crypto/rudacure-web/releases/download/magazines-v1";

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("vol");
  const vol = Number(raw);

  // Only accept a bare positive integer — blocks path traversal / SSRF.
  if (!Number.isInteger(vol) || vol < 1 || vol > 999) {
    return NextResponse.json({ error: "Invalid vol" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${RELEASE_BASE}/vol${vol}.pdf`, {
      // Cache the release asset at the edge for a day.
      next: { revalidate: 86400 },
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Magazine not found" },
        { status: 404 },
      );
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
  }
}
