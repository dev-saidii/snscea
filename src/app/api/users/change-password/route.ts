import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/user.model';
import { authenticate } from '@/middlewares/moduleAuth';
type Token = {
    userId: string,
    email: 'admin@gmail.com',
    name: 'Satish Kumar Maurya',
    access: ['student', 'account', 'marksheet', 'setting'],
    employeeNumber: 'EM2504',
    iat: 1747394370,
    exp: 1747480770
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const token = authenticate(req) as Token;
        console.log(token)
        if (!token || !token?.userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { oldPassword, newPassword } = await req.json();
        const user = await User.findById(token.userId);
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Incorrect old password' }, { status: 400 });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return NextResponse.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
