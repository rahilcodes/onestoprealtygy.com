"use client";

import { useCallback, useState, type FormEvent } from "react";
import { PRIMARY_PHONE } from "@/lib/site";

export type LeadStatus = "idle" | "sending" | "sent" | "error";

export interface LeadResult {
  ok: boolean;
  id?: string;
  error?: string;
  field?: string;
}

/** POST a lead to /api/leads with its source page. */
export async function submitLead(source: string, data: Record<string, unknown>): Promise<LeadResult> {
  const page = typeof window !== "undefined" ? window.location.pathname + window.location.hash : undefined;
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, page, submittedAt: new Date().toISOString(), ...data }),
    });
    const json = (await res.json()) as LeadResult;
    return res.ok ? { ...json, ok: true } : { ok: false, error: json.error ?? "Something went wrong.", field: json.field };
  } catch {
    return { ok: false, error: `Network error. Please try again or call ${PRIMARY_PHONE.label}.` };
  }
}

export function formDataToObject(form: HTMLFormElement): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const fd = new FormData(form);
  fd.forEach((value, key) => {
    if (key in out) {
      const prev = out[key];
      out[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
    } else {
      out[key] = value;
    }
  });
  return out;
}

/**
 * Small hook that wires a <form onSubmit> to the leads endpoint and tracks
 * sending / sent / error state for inline status messages.
 */
export function useLeadForm(source: string, extra?: () => Record<string, unknown>) {
  const [status, setStatus] = useState<LeadStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (!form.reportValidity()) return;
      setStatus("sending");
      setError(null);
      const result = await submitLead(source, { ...formDataToObject(form), ...(extra ? extra() : {}) });
      if (result.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(result.error ?? "Something went wrong.");
      }
    },
    [source, extra],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { status, error, onSubmit, reset, sending: status === "sending", sent: status === "sent" };
}
