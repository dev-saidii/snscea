import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admission from '@/models/admission.model';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';


export async function GET(req: NextRequest) {
    await connectDB();
    const access = await authenticateModuleAccess(req, 'student');
    if (!access) return NextResponse.json(
        { success: false, errors: "Not Allowed" },
        { status: 403 }
    );

    const { searchParams } = new URL(req.url);
    const session = searchParams.get('session');
    const currentClass = searchParams.get('currentClass');
    const section = searchParams.get('section');

    const filter = {};

    if (session) filter.session = session;
    if (currentClass) filter.currentClass = currentClass;
    if (section) filter.section = section;

    try {
        const students = await Admission.find(filter).sort({ admissionNumber: 1 });
        return NextResponse.json({ success: true, students });
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Failed to fetch students' }, { status: 500 });
    }
}