import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/user.model';
import { authenticate } from '@/middlewares/moduleAuth';


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const isLogin = await authenticate(req);

        if (!isLogin) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
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
