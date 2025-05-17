import { connectDB } from "@/lib/db";
import Admission from "@/models/admission.model";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await connectDB();

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