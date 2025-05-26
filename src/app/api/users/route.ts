import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/lib/db';
import { generateEmployeeId } from '@/lib/idGenerator';
import { sendEmail } from '@/lib/sendEmail';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';

const roleAccessMap = {
    superadmin: ['student', 'marksheet', 'setting'],
    admin: ['student', 'marksheet'],
    teacher: ['marksheet'],
};

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const data = await req.json();
        const access = await authenticateModuleAccess(req, 'setting');
        if (!access) return NextResponse.json(
            { success: false, errors: "Not Allowed" },
            { status: 403 }
        );

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

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const access = await authenticateModuleAccess(req, 'setting');
        if (!access) return NextResponse.json(
            { success: false, errors: "Not Allowed" },
            { status: 403 }
        );
        const users = await User.find().select('-password');
        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
