import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    if (path.endsWith('/profile')) {
        const cookie = request.cookies.get('session');
        if (!cookie) {
            const loginUrl = new URL('/login/', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }
}
