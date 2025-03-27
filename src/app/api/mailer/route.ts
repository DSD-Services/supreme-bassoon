import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
    }
});


export async function POST(req: NextRequest) {
    try {
        const { to, subject, html } = await req.json();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);

        return Response.json({ success: true, messageId: info.messageId });
    } catch (error) {
    console.error('Error sending email:', error);
    return new NextResponse("Failed to send message.", { status: 500 })
    }
}