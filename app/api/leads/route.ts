import { NextResponse } from "next/server";

/**
 * Lead intake stub.
 *
 * Every form on the site POSTs here with a `source` (the page / widget the
 * lead came from) plus the form fields. Phase 2 forwards this to the CRM.
 */
export interface LeadPayload {
  source: string;
  page?: string;
  submittedAt?: string;
  [field: string]: unknown;
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body.source !== "string" || !body.source) {
    return NextResponse.json({ ok: false, error: "Missing lead source." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address.", field: "email" }, { status: 422 });
  }

  const lead = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    ...body,
  };

  // Stub: log server-side. Phase 2 → CRM / email notification.
  console.info("[leads] new lead", JSON.stringify(lead));

  return NextResponse.json({ ok: true, id: lead.id });
}
