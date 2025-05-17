import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { token, newPassword } = await req.json();

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return NextResponse.json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });
    }
}
