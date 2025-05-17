// src/utils/sendEmail.ts
import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"SNSCEA Developer" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
}
