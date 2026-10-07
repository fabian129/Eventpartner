import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  if (host.startsWith("www.eventpartner.io")) {
    const url = request.nextUrl.clone();
    url.host = "eventpartner.io";
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  // Hidden digital business-card page (QR codes for Cvent CONNECT London).
  // Served from public/connect.html, outside the /en and /sv locale routing.
  const { pathname } = request.nextUrl;
  if (pathname === "/connect" || pathname === "/connect/") {
    const url = request.nextUrl.clone();
    url.pathname = "/connect.html";
    return NextResponse.rewrite(url);
  }

  return handleI18n(request);
}

export const config = {
  // Match all pathnames except:
  // - API routes (/api/...)
  // - Next.js internals (_next/...)
  // - Sanity Studio (/studio/...)
  // - Static files (favicon, images, etc.)
  matcher: [
    "/",
    "/(en|sv)/:path*",
    "/((?!api|_next|studio|_vercel|favicon\\.ico|.*\\..*).*)",
  ],
};
