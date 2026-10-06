"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import type { ListingDetail } from "@/types/listing";
import { upcomingDays } from "@/lib/format";
import { useLeadForm } from "@/lib/leads";
import { SITE } from "@/lib/site";
import { FormStatus } from "@/components/FormStatus";

interface Props {
  listing: ListingDetail;
  /** ISO date from the server so the day tiles are deterministic across SSR/CSR. */
  today: string;
}

type Mode = "viewing" | "ask";

/**
 * Company card + segmented "Schedule a viewing / Ask a question" form.
 * Viewing mode shows a 4-day picker plus a native date input; the message is
 * pre-filled from the selection and stays editable until the user types.
 */
export function InquiryCard({ listing, today }: Props) {
  const id = useId();
  const [mode, setMode] = useState<Mode>("viewing");
  const days = useMemo(() => upcomingDays(today, 4, true), [today]);
  const [date, setDate] = useState(days[0].iso);
  const [custom, setCustom] = useState<string | null>(null);

  const selected = days.find((d) => d.iso === date);
  const dateLabel = selected
    ? `${selected.dow} ${selected.num} ${selected.month}`
    : new Date(date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

  const defaultMessage =
    mode === "viewing"
      ? `I would like to view ${listing.title} (${listing.ref}) on ${dateLabel}.`
      : `I have a question about ${listing.title} (${listing.ref}).`;
  const message = custom ?? defaultMessage;

  const { onSubmit, sending, sent, error } = useLeadForm(mode === "viewing" ? "property-viewing" : "property-question", () => ({
    listingId: listing.id,
    ref: listing.ref,
    title: listing.title,
    price: listing.priceFmt,
    requestType: mode,
    viewingDate: mode === "viewing" ? date : undefined,
  }));

  function pick(next: Mode) {
    setMode(next);
    setCustom(null);
  }
  function pickDate(iso: string) {
    setDate(iso);
    setCustom(null);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      <div className="flex items-center gap-3.5 border-b border-hairline px-5 py-[18px]">
        <Image src="/brand/emblem.png" alt="" width={48} height={48} className="h-12 w-12 flex-none" />
        <div>
          <div className="text-[15px] font-bold text-navy">{SITE.name}</div>
          <div className="text-[12.5px] font-medium text-meta">Listing agent · {SITE.address.area}, {SITE.address.city}</div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2.5 px-5 pb-5 pt-[18px]">
        <div role="group" aria-label="Request type" className="seg grid-cols-2">
          <button type="button" onClick={() => pick("viewing")} aria-pressed={mode === "viewing"} className="seg-btn">
            Schedule a viewing
          </button>
          <button type="button" onClick={() => pick("ask")} aria-pressed={mode === "ask"} className="seg-btn">
            Ask a question
          </button>
        </div>

        <FormStatus
          sent={sent}
          error={error}
          sentMessage={mode === "viewing" ? "Viewing requested. Our office will confirm a time with you shortly." : "Question sent. We will reply as soon as possible."}
        />

        {!sent && (
          <>
            {mode === "viewing" && (
              <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="sr-only">Preferred viewing date</legend>
                <div className="grid grid-cols-4 gap-1.5">
                  {days.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => pickDate(d.iso)}
                      aria-pressed={date === d.iso}
                      aria-label={`${d.dow} ${d.num} ${d.month}`}
                      className="tile min-h-11 px-1 py-2.5 text-center text-[12px] font-bold leading-[1.3]"
                    >
                      {d.dow}
                      <br />
                      <span className="text-[16px]">{d.num}</span>
                    </button>
                  ))}
                </div>
                <label htmlFor={`${id}-date`} className="mt-2 flex items-center gap-2 text-[12.5px] font-semibold text-slate">
                  <span className="whitespace-nowrap">Or pick a date</span>
                  <input
                    id={`${id}-date`}
                    type="date"
                    min={days[0].iso}
                    value={date}
                    onChange={(e) => e.target.value && pickDate(e.target.value)}
                    className="input h-11 text-[13.5px]"
                  />
                </label>
              </fieldset>
            )}

            <label htmlFor={`${id}-name`} className="sr-only">
              Full name
            </label>
            <input id={`${id}-name`} name="name" type="text" required autoComplete="name" placeholder="Full name" className="input" />
            <label htmlFor={`${id}-email`} className="sr-only">
              Email
            </label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="Email" className="input" />
            <label htmlFor={`${id}-phone`} className="sr-only">
              Phone or WhatsApp
            </label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Phone or WhatsApp" className="input" />
            <label htmlFor={`${id}-msg`} className="sr-only">
              Message
            </label>
            <textarea id={`${id}-msg`} name="message" rows={3} value={message} onChange={(e) => setCustom(e.target.value)} className="textarea" />
            <button type="submit" disabled={sending} className="btn-accent w-full disabled:opacity-70">
              {sending ? "Sending…" : mode === "viewing" ? "Request this viewing" : "Send question"}
            </button>
          </>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-4 text-[14px] font-bold text-navy">
          {SITE.phones.map((p) => (
            <a key={p.href} href={p.href} className="inline-flex min-h-11 items-center no-underline hover:underline">
              {p.label}
            </a>
          ))}
        </div>
        <div className="text-[11.5px] leading-[1.5] text-meta">By submitting, you agree to be contacted by {SITE.name} about this property. We never share your details.</div>
      </form>
    </div>
  );
}
