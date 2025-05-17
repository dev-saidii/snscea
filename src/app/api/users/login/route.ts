import { connectDB } from '@/lib/db';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { employeeNumber, password } = await req.json();

        const user = await User.findOne({ employeeNumber });
        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.name,
                access: user.access,
                employeeNumber: user.employeeNumber
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                access: user.access,
                employeeNumber: user.employeeNumber,
            },
        });

        // Set cookie
        response.cookies.set('saidii-accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24,
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
