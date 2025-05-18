
import { sendEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, phone, message } = await req.json();

        const html = `
            <h2>New Admission Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message || "N/A"}</p>
        `;

        await sendEmail({
            to: process.env.NEXT_PUBLIC_INSTITUTE_EMAIL,
            subject: "New Admission Enquiry",
            html,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
    }
}
