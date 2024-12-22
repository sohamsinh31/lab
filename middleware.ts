import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./components/action/getSession";

export default async function middleware(req: NextRequest) {
  const session = await getSession(req);
  const { pathname } = req.nextUrl;
  const loginPath = "/auth/login";
  if (pathname === loginPath || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(new URL(loginPath, req.nextUrl.origin));
  }
  return NextResponse.next();
}
