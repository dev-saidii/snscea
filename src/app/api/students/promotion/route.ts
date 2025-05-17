import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admission from '@/models/admission.model';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';


export async function GET(req: NextRequest) {
    await connectDB();
    const result = authenticateModuleAccess(req, 'student');
    if (result instanceof Response) return result;

    const { searchParams } = new URL(req.url);
    const session = searchParams.get('session');
    const currentClass = searchParams.get('currentClass');
    const section = searchParams.get('section');

    const filter = {};

    if (session) filter.session = session;
    if (currentClass) filter.currentClass = currentClass;
    if (section) filter.section = section;

    try {
        const students = await Admission.find(filter).select("name gender admissionNumber rollNumber currentClass session section fatherName mobile").sort({ admissionNumber: 1 });
        return NextResponse.json(students);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    await connectDB();
    const result = authenticateModuleAccess(req, 'student');
    if (result instanceof Response) return result;

    try {
        const body = await req.json();
        const { studentIds, newSession, newClass, newSection } = body;

        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return NextResponse.json({ error: 'No student IDs provided' }, { status: 400 });
        }

        if (!newSession || !newClass || !newSection) {
            return NextResponse.json({ error: 'Missing new session/class/section' }, { status: 400 });
        }

        const result = await Admission.updateMany(
            { _id: { $in: studentIds } },
            {
                $set: {
                    session: newSession,
                    currentClass: newClass,
                    section: newSection,
                },
            }
        );

        return NextResponse.json({
            message: 'Students promoted successfully',
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
            console.log(error)
        return NextResponse.json(
            { error: 'Something went wrong during promotion' },
            { status: 500 }
        );
    }
}

