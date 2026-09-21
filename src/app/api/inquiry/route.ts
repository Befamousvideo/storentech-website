import { NextResponse } from "next/server";

type Inquiry = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  broken?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Inquiry;
  try {
    body = (await request.json()) as Inquiry;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const company = asString(body.company);
  const broken = asString(body.broken);

  if (!name || !email || !company || !broken) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || company.length > 200 || broken.length > 8000) {
    return NextResponse.json({ ok: false, error: "A field is too long." }, { status: 400 });
  }

  const payload = {
    source: "storentech-website",
    submittedAt: new Date().toISOString(),
    name,
    email,
    company,
    broken,
  };

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        return NextResponse.json(
          { ok: false, error: "The office did not receive this. Call Sarah." },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "The office did not receive this. Call Sarah." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
