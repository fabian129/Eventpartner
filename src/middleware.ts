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
