
import { NextRequest, NextResponse } from 'next/server';
import Admission from '@/models/admission.model';
import { connectDB } from '@/lib/db';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const access = await authenticateModuleAccess(req, 'student');
        if (!access) return NextResponse.json(
            { success: false, errors: "Not Allowed" },
            { status: 403 }
        );

        const { searchParams } = new URL(req.url);

        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const currentClass = searchParams.get('currentClass');
        const section = searchParams.get('section');
        const session = searchParams.get('session');
        const gender = searchParams.get('gender');

        // Build filter query
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { fatherName: { $regex: search, $options: 'i' } },
                { motherName: { $regex: search, $options: 'i' } },
                { admissionNumber: { $regex: search, $options: 'i' } },
                { mobile: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        if (currentClass) query.currentClass = currentClass;
        if (section) query.section = section;
        if (session) query.session = session;
        if (gender) query.gender = gender;

        // Pagination
        const skip = (page - 1) * limit;

        const students = await Admission.find(query)
            .select(
                "admissionNumber name gender dob photo fatherName motherName currentClass section rollNumber session mobile email admittedAt"
            )
            .skip(skip)
            .limit(limit)
            .sort({ currentClass: 1, section: 1, admittedAt: -1 });

        const total = await Admission.countDocuments(query);

        return NextResponse.json({
            success: true,
            students,
            pagination: {
                totalPage: Math.ceil(total / limit),
                currentPage: page,
                total,
                pageSize: limit,
            },
        });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}


