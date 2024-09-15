import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const session = req.cookies.get('JSESSIONID');

    console.log(session)
    // If no session and trying to access protected routes, redirect to login
    if (!session && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

// Specify routes to run the middleware
export const config = {
    matcher: ['/dashboard', '/profile', '/protected-route', '/'],
};
