"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { useLeadForm } from "@/lib/leads";
import { CONTACT_SUBJECTS, SITE } from "@/lib/site";
import { FormStatus } from "@/components/FormStatus";

export type Subject = (typeof CONTACT_SUBJECTS)[number];

const PLACEHOLDER: Partial<Record<Subject, string>> = {
  "Sale of Properties": "e.g. Looking for a 3-bedroom house on the East Bank under US$200K.",
  "Rental of Properties": "e.g. Need a furnished 2-bedroom apartment in Georgetown from next month.",
  "Property Management": "e.g. I live overseas and own an apartment in Georgetown that I would like managed.",
  "Real Estate Investment": "e.g. Interested in land or rental property along the East Coast.",
  Consultancy: "e.g. I want to understand what I could borrow before I start looking.",
  Other: "Tell us how we can help.",
};

/** Contact form mirroring the original site's subjects, with a subject-aware placeholder. */
export function ContactForm({ initialSubject = "Sale of Properties" }: { initialSubject?: Subject }) {
  const searchParams = useSearchParams();
  const querySubject = searchParams.get("subject");
  const validSubject = querySubject && (CONTACT_SUBJECTS as readonly string[]).includes(querySubject)
    ? (querySubject as Subject)
    : initialSubject;

  const id = useId();
  const [userSubject, setUserSubject] = useState<Subject | null>(null);
  const subject = userSubject ?? validSubject;
  const setSubject = (s: Subject) => setUserSubject(s);

  const { onSubmit, sending, sent, error } = useLeadForm("contact");

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Send us a message"
      className="flex flex-col gap-3.5 rounded-[18px] border border-border bg-white shadow-soft"
      style={{ padding: "clamp(20px, 3vw, 32px)" }}
    >
      <div className="font-serif text-[24px] font-medium leading-[1.2] text-navy">Send us a message</div>
      <FormStatus sent={sent} error={error} sentMessage="Thanks, your message is in. We will reply as soon as possible." />
      {!sent && (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-3">
            <label htmlFor={`${id}-name`} className="field">
              Full name
              <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className="input" />
            </label>
            <label htmlFor={`${id}-phone`} className="field">
              Phone or WhatsApp
              <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="input" />
            </label>
          </div>
          <label htmlFor={`${id}-email`} className="field">
            Email
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className="input" />
          </label>
          <label htmlFor={`${id}-subject`} className="field">
            Subject
            <select id={`${id}-subject`} name="subject" value={subject} onChange={(e) => setSubject(e.target.value as Subject)} className="select">
              {CONTACT_SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label htmlFor={`${id}-msg`} className="field">
            Message
            <textarea id={`${id}-msg`} name="message" rows={5} required placeholder={PLACEHOLDER[subject] ?? "Tell us how we can help."} className="textarea" />
          </label>
          <button type="submit" disabled={sending} className="btn-accent btn-54 rounded-[10px] text-[15px] disabled:opacity-70">
            {sending ? "Sending…" : "Send message"}
          </button>
          <div className="text-[11.5px] leading-[1.5] text-meta">By submitting you agree to be contacted by {SITE.name}. We never share your information.</div>
        </>
      )}
    </form>
  );
}
