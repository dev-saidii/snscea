import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admission from '@/models/admission.model';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';

export async function GET(req: NextRequest, { params }) {
    await connectDB();
    const result = authenticateModuleAccess(req, 'student');
    if (result instanceof Response) return result;
    const {id} = params
    try {
        const student = await Admission.findById(id);
        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json(student, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }) {
    await connectDB();
    const result = authenticateModuleAccess(req, 'student');
    if (result instanceof Response) return result;
    const {id} = params
    try {
        const data = await req.json();
        const updatedStudent = await Admission.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!updatedStudent) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Update failed', details: error }, { status: 400 });
    }
}
