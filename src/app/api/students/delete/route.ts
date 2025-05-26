import { connectDB } from "@/lib/db";
import { authenticateModuleAccess } from "@/middlewares/moduleAuth";
import Admission from "@/models/admission.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const access = await authenticateModuleAccess(req, 'student');
    if (!access) return NextResponse.json(
      { success: false, errors: "Not Allowed" },
      { status: 403 }
    );

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid request. Expecting 'ids' array." }, { status: 400 });
    }

    const deleted = await Admission.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({ success: true, deletedCount: deleted.deletedCount });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}