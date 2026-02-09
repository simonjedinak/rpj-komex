import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ensure Node runtime for nodemailer in Route Handlers [page:0]

type Payload = {
  name: string;
  email: string;
  phone?: string;
  brand: string;
  model: string;
  subject: "prehliadka" | "sklo" | "pneu" | "porucha" | "podozrenie";
  message: string;
  consent: boolean;
};

function isEmail(x: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    // Basic validation
    if (!data?.consent) {
      return NextResponse.json({ ok: false, error: "Consent required" }, { status: 400 });
    }
    if (!data.name?.trim() || data.name.trim().length < 2) {
      return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
    }
    if (!data.email?.trim() || !isEmail(data.email.trim())) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    if (!data.brand?.trim() || !data.model?.trim()) {
      return NextResponse.json({ ok: false, error: "Missing car brand/model" }, { status: 400 });
    }
    if (!data.message?.trim() || data.message.trim().length < 10) {
      return NextResponse.json({ ok: false, error: "Message too short" }, { status: 400 });
    }

    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const MAIL_TO = process.env.MAIL_TO || SMTP_USER;

    if (!SMTP_USER || !SMTP_PASS || !MAIL_TO) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing env vars. Set MAIL_TO, SMTP_USER, SMTP_PASS in .env.local and restart dev server.",
        },
        { status: 500 }
      );
    }

    // Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: SMTP_USER,
      to: MAIL_TO,
      replyTo: data.email,
      subject: `Kontakt: ${data.subject} | ${data.brand} ${data.model}`,
      text:
        `Meno: ${data.name}\n` +
        `E-mail: ${data.email}\n` +
        `Telefón: ${data.phone?.trim() || "-"}\n` +
        `Auto: ${data.brand} ${data.model}\n` +
        `Typ: ${data.subject}\n\n` +
        `${data.message}\n`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Server error",
        code: err?.code,
        response: err?.response,
        command: err?.command,
      },
      { status: 500 }
    );
  }
}
