import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchData } from './components/services/CallAPI';
import { useEffect, useState } from 'react';

export function middleware(req: NextRequest) {
    const session = req.cookies.get('jwtoken');

    // console.log(session)
    // If no session and trying to access protected routes, redirect to login
    if (!session && req.nextUrl.pathname !== '/auth/login') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

// Specify routes to run the middleware
export const config = {
    matcher: ['/dashboard', '/profile', '/protected-route', '/'],
};
