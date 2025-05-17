import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/models/user.model';
import { sendEmail } from '@/lib/sendEmail';
import { getInstituteDetails } from '@/utils/helpher';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });

    const { instUrl, instName, instEmail } = getInstituteDetails();
    const resetLink = `${instUrl}/reset-password?token=${token}`;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2 style="color: #205D80;">${instName} - Password Reset</h2>
        <p>Hello ${user.name || 'User'},</p>
        <p>You recently requested to reset your password. Click the button below to continue:</p>
        <a href="${resetLink}" style="display: inline-block; margin-top: 12px; padding: 10px 20px; background-color: #205D80; color: white; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p style="margin-top: 16px;">If you did not request this, you can safely ignore this email.</p>
        <p style="margin-top: 24px; font-size: 12px; color: #888;">This link is valid for 15 minutes.</p>
        <hr style="margin-top: 32px;"/>
        <p style="font-size: 12px;">From, <br>${instName}<br><a href="mailto:${instEmail}">${instEmail}</a></p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: `${instName} | Password Reset Request`,
      html: emailContent,
    });

    return NextResponse.json({ success: true, message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('[SEND_RESET_LINK_ERROR]', error.message || error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
