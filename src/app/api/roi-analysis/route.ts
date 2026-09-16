import { NextResponse } from "next/server";

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  businessType?: unknown;
  size?: unknown;
  location?: unknown;
  pain?: unknown;
  solutions?: unknown;
  timeline?: unknown;
  budget?: unknown;
  skipSchedule?: unknown;
  scheduleMethod?: unknown;
  preferredTimes?: unknown;
  inferred?: unknown;
  website?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  if (asString(body.website)) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const company = asString(body.company);
  const pain = asString(body.pain);

  if (!name || !email || !company || !pain) {
    return NextResponse.json({ ok: false, error: "Name, work email, company, and what’s broken are required." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid work email." }, { status: 400 });
  }

  const payload = {
    source: "roi-analysis",
    to: "vincent@storentech.com",
    submittedAt: new Date().toISOString(),
    pricing:
      "ROI analysis starts at $1,000. Higher if complex. Fee may be credited toward implementation. Not free. If they cannot pay, we do not do the work.",
    name,
    email,
    phone: asString(body.phone),
    company,
    businessType: asString(body.businessType),
    size: asString(body.size),
    location: asString(body.location),
    pain,
    solutions: Array.isArray(body.solutions) ? body.solutions.map(asString).filter(Boolean) : [],
    timeline: asString(body.timeline),
    budget: asString(body.budget),
    scheduling: {
      skipped: Boolean(body.skipSchedule),
      method: asString(body.scheduleMethod),
      preferredTimes: asString(body.preferredTimes),
      windows:
        "Office hours: 8:00 AM – 6:00 PM Pacific. Bookable Zoom or in-person: Monday–Thursday, 10:00 AM – 4:00 PM Pacific. Other times by special request. OC bias for in-person.",
    },
    inferred: body.inferred ?? null,
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
          { ok: false, delivered: false, error: "The office did not receive this. Email vincent@storentech.com or call +1 714-794-9199." },
          { status: 502 },
        );
      }
      return NextResponse.json({ ok: true, delivered: true });
    } catch {
      return NextResponse.json(
        { ok: false, delivered: false, error: "The office did not receive this. Email vincent@storentech.com or call +1 714-794-9199." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    delivered: false,
    error: "Handoff email is not wired yet. Copy the summary and send it to vincent@storentech.com, or call +1 714-794-9199.",
  });
}
