import { NextResponse } from "next/server";

const MAX_LENGTHS = {
  name: 100,
  contact: 160,
  occasion: 100,
  date: 32,
  quantity: 80,
  fulfillment: 80,
  message: 1500,
};

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true, demo: true });
    }

    const payload = {
      name: clean(body.name, MAX_LENGTHS.name),
      contact: clean(body.contact, MAX_LENGTHS.contact),
      occasion: clean(body.occasion, MAX_LENGTHS.occasion),
      date: clean(body.date, MAX_LENGTHS.date),
      quantity: clean(body.quantity, MAX_LENGTHS.quantity),
      fulfillment: clean(body.fulfillment, MAX_LENGTHS.fulfillment),
      message: clean(body.message, MAX_LENGTHS.message),
    };

    const required = [
      payload.name,
      payload.contact,
      payload.occasion,
      payload.date,
      payload.quantity,
      payload.fulfillment,
    ];

    if (required.some((value) => !value)) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const webhook = process.env.LEAD_WEBHOOK_URL;

    if (!webhook) {
      return NextResponse.json({ ok: true, demo: true });
    }

    const webhookResponse = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "honeyvault-large-order", ...payload }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "Lead delivery failed." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, demo: false });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
}
