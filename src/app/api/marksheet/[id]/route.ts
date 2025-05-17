import { connectDB } from "@/lib/db";
import { authenticateModuleAccess } from "@/middlewares/moduleAuth";
import marksheetModel from "@/models/marksheet.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }
) {
  try {
    await connectDB();
    const { id } = params;
    const result = authenticateModuleAccess(req, "marksheet");
    if (result instanceof Response) return result;

    const deleted = await marksheetModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Marksheet not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: deleted._id });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}