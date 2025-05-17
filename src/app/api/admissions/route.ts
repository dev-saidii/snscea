import { connectDB } from '@/lib/db';
import { generateAdmissionNumber } from '@/lib/idGenerator';
import { authenticateModuleAccess } from '@/middlewares/moduleAuth';
import Admission from '@/models/admission.model';
import { AdmissionSchema } from '@/validations/admission';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const result = authenticateModuleAccess(req, 'student');
    if (result instanceof Response) return result;
    const body = await req.json();

    const parsed = AdmissionSchema.parse(body);

    if (!parsed) {
      return NextResponse.json(
        { success: false, errors: "wrong input" },
        { status: 400 }
      );
    }
    const idNo = await generateAdmissionNumber();
    parsed.admissionNumber = idNo;

    const admission = await Admission.create(parsed);

    return NextResponse.json({ success: true, admission }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
