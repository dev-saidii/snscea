import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('saidii-accessToken');
    console.log('Cookies:', request.cookies.getAll());

    const isLoggedIn = !!accessToken?.value;
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/dashboard') && !isLoggedIn) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*'],
};
