

import { connectDB } from '@/lib/db';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';
import marksheetModel from '@/models/marksheet.model';
import { calculateGrade } from '@/utils/helpher';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/marksheet
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const access = await authenticateModuleAccess(req, 'marksheet');
        if (!access) return NextResponse.json(
            { success: false, errors: "Not Allowed" },
            { status: 403 }
        );

        const data = await req.json();

        let totalObtainedMarks = 0;
        let totalMarks = 0;

        // Calculate per-subject total and overall totals
        const processedSubjects = data.subjectMarks.map((subject) => {
            const { term1, term2, term3 } = subject;

            const subjectMax = term1.max + term2.max + term3.max;
            const subjectObtained = term1.obtained + term2.obtained + term3.obtained;

            totalMarks += subjectMax;
            totalObtainedMarks += subjectObtained;

            return {
                ...subject,
                totalMax: subjectMax,
                totalObtained: subjectObtained,
                subjectGrade: calculateGrade(subjectObtained, subjectMax),
                term1: {
                    ...term1,
                    grade: calculateGrade(term1.obtained, term1.max),
                },
                term2: {
                    ...term2,
                    grade: calculateGrade(term2.obtained, term2.max),
                },
                term3: {
                    ...term3,
                    grade: calculateGrade(term3.obtained, term3.max),
                },
            };
        });

        const percentage = parseFloat(((totalObtainedMarks / totalMarks) * 100).toFixed(2));
        const grade = calculateGrade(totalObtainedMarks, totalMarks);
        const issueDate = new Date();
        const marksheet = await marksheetModel.create({
            ...data,
            subjectMarks: processedSubjects,
            totalMarks,
            totalObtainedMarks,
            percentage,
            grade,
            issueDate,
        });

        return NextResponse.json({ success: true, marksheet }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const access = await authenticateModuleAccess(req, 'marksheet');
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

        const marksheets
            = await marksheetModel.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ issueDate: -1 });

        const total = await marksheetModel.countDocuments(query);

        return NextResponse.json({
            success: true,
            marksheets,
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
