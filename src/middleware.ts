import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const token = !!req.nextauth.token;
    const tokenData = req.nextauth.token;

    if (pathname.startsWith("/admin")) {
      if (token && tokenData?.email === process.env.ADMIN_EMAIL) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/login")) {
      if (token && tokenData?.email === process.env.ADMIN_EMAIL) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      return NextResponse.next();
    }

    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/social-media-downloader", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
