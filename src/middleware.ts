import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

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
