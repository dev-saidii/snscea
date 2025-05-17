// src/app/api/users/[id]/route.ts
import { connectDB } from '@/lib/db';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest,{ params}) {
    try {
        await connectDB();

        // Get user by ID
        const user = await User.findById(params.id);
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest,{ params, request }) {
    try {
        await connectDB();

        const data = await request.json();

        // Update the user
        const user = await User.findByIdAndUpdate(params.id, data, { new: true });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}



export async function DELETE(
    request: NextRequest,
    { params }
) {
    try {
        await connectDB();
        const { id } = params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
