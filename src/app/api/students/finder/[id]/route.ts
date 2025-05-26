import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admission from '@/models/admission.model';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';

export async function GET(req: NextRequest, { params }) {
    await connectDB();
    const access = await authenticateModuleAccess(req, 'marksheet');
    if (!access) return NextResponse.json(
        { success: false, errors: "Not Allowed" },
        { status: 403 }
    );
    try {
        const { id } = params;
        const student = await Admission.findOne({ admissionNumber: id });
        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json(student, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}