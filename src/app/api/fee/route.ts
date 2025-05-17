// app/api/fees/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Fee from '@/models/fee.model';
import { generateFeeReciptNumber } from '@/lib/idGenerator';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';

export async function POST(req: NextRequest) {

      const result = authenticateModuleAccess(req, 'account');
            if (result instanceof Response) return result;
    try {
        await connectDB(); // connect to MongoDB
        const body = await req.json();

        const {
            studentId,
            admissionNumber,
            name,
            fatherName,
            dob,
            session,
            class: currentClass,
            section,
            amount,
            feeType,
            paymentMode,
            remarks,
        } = body;

        // Validate required fields
        if (
            !studentId ||
            !admissionNumber ||
            !name ||
            !fatherName ||
            !session ||
            !currentClass ||
            !amount ||
            !feeType ||
            !paymentMode
        ) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }
        const receiptNumber = generateFeeReciptNumber();

        const fee = new Fee({
            studentId,
            admissionNumber,
            receiptNumber,
            name,
            fatherName,
            dob,
            session,
            class: currentClass,
            section,
            amount,
            feeType,
            paymentMode,
            remarks,
        });

        await fee.save();

        return NextResponse.json(
            { message: 'Fee collected successfully', data: fee },
            { status: 201 }
        );
    } catch (error) {
        console.error('Fee Collection Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
