import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./components/action/getSession";

export default async function middleware(req: NextRequest) {
  const session = await getSession(req);
  const { pathname } = req.nextUrl;
  const protectedPaths = ["/", "/dashboard"]; // Add paths to protect
  const loginPath = "/auth/login";
  // Only run middleware for protected paths
  if (!protectedPaths.includes(pathname)) {
    return NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(new URL(loginPath, req.nextUrl.origin));
  }
  return NextResponse.next();
}
