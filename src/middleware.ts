import { NextRequest, NextResponse } from "next/server";

const DOMAIN_APP = process.env.NEXT_PUBLIC_DRIVER_DOMAIN_APP || "audovtc.com";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // domaine app → redirige vers /reservation
  if (
    hostname.includes(DOMAIN_APP) &&
    pathname === "/"
  ) {
    return NextResponse.redirect(new URL("/reservation", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
