import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // audovtc.com → redirige vers /reservation (sauf si déjà sur /reservation, /admin ou /api)
  if (
    hostname.includes("audovtc.com") &&
    pathname === "/"
  ) {
    return NextResponse.redirect(new URL("/reservation", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
