import User from '@/models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/lib/db';
import { generateEmployeeId } from '@/lib/idGenerator';
import { sendEmail } from '@/utils/sendEmail';

const roleAccessMap = {
    superadmin: ['student', 'account', 'marksheet', 'setting'],
    admin: ['student', 'account', 'marksheet'],
    teacher: ['student', 'marksheet'],
    accountant: ['account'],
};

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        // Validate role
        if (!roleAccessMap[data.role]) {
            return NextResponse.json(
                { success: false, message: 'Invalid role specified.' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const employeeNumber = await generateEmployeeId();

        const user = new User({
            ...data,
            password: hashedPassword,
            employeeNumber,
            access: roleAccessMap[data.role],
        });

        await user.save();
        user.password = "";

        // ✅ Send Welcome Email
        if (data.email) {
            await sendEmail({
                to: data.email,
                subject: `Welcome to SNSCEA, ${data.name || 'Employee'}`,
                html: `
          <h2>Hello ${data.name || 'Employee'},</h2>
          <p>Your account has been created successfully!</p>
          <p><strong>Employee Number:</strong> ${employeeNumber}</p>
          <p><strong>Login Email:</strong> ${data.email}</p>
          <p><strong>Password:</strong> ${data.password}</p>
          <p>Please change your password after login.</p>
          <br />
          <p>Regards,</p>
          <p><strong>SNSCEA Developer Team</strong></p>
        `
            });
        }

        return NextResponse.json({ success: true, user }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const users = await User.find();
        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
