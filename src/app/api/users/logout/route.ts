import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logout successful',
        });

        // Clear the cookie
        response.cookies.set('saidii-accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/'
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ success: false, message: 'Server error during logout' }, { status: 500 });
    }
}
