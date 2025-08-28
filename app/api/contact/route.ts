import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message, website } = await request.json();
    if (website) return NextResponse.json({ ok: true }); // honeypot

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const to = process.env.TO_EMAIL || 'rayancarre68@gmail.com';
    await transporter.sendMail({
      from: `Portfolio <${process.env.SMTP_USER}>`,
      to,
      subject: `Contact: ${name}`,
      replyTo: email,
      text: message
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

