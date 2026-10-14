import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/inquiryValidation";
import { signaturePastries } from "@/data/pastries";
import { orderItems } from "@/data/orderItems";
import { honeyvaultLocations } from "@/data/locations";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const json = await request.json();
    if (!json || typeof json !== "object" || Array.isArray(json)) throw new Error("Invalid body");
    body = json;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request.", code: "invalid-request" }, { status: 400 });
  }
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true, demo: true });
  }
  const { payload, errors, valid } = validateInquiry(body);
  if (!valid) return NextResponse.json({ ok: false, code: "validation", errors }, { status: 400 });
  const shop = honeyvaultLocations.find(location => location.id === payload.pickupLocation);
  const pastry = signaturePastries.find(item => item.id === payload.pastryId);
  const summary = {
    ...payload,
    shop: shop?.name ?? null,
    products: [pastry?.name, ...orderItems.filter(item => payload.specialItemIds.includes(item.id)).map(item => item.name)].filter((name): name is string => Boolean(name)),
  };
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: true, demo: true, summary });
  try {
    const response = await fetch(webhook, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "honeyvault-large-order", ...summary }),
      cache: "no-store", signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("Lead delivery failed");
    return NextResponse.json({ ok: true, demo: false, summary });
  } catch {
    return NextResponse.json({ ok: false, code: "delivery-failed" }, { status: 502 });
  }
}
