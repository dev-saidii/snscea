import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admission from "@/models/admission.model";
import { authenticateModuleAccess } from "@/middlewares/moduleAuth";

export async function DELETE(req: NextRequest, { params }) {
  try {
    await connectDB();
    const result = authenticateModuleAccess(req, 'student');
    if (result instanceof Response) return result;

    const deleted = await Admission.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: deleted._id });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
