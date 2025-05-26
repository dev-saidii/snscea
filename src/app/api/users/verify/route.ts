import { connectDB } from "@/lib/db";
import { authenticate } from "@/middlewares/moduleAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
