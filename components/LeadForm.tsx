"use client";

import { useId } from "react";
import { useLeadForm } from "@/lib/leads";
import { FormStatus } from "@/components/FormStatus";

export interface SelectField {
  name: string;
  label: string;
  options: readonly string[];
  /** Pre-selected option. */
  value?: string;
}

interface Props {
  source: string;
  title?: string;
  /** Extra select fields rendered between the contact fields and the message. */
  selects?: SelectField[];
  /** Optional free-text field rendered before the selects (e.g. property location). */
  text?: { name: string; label: string; placeholder?: string; value?: string };
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel: string;
  sentMessage: string;
  note?: string;
  /** "light" on dark surfaces (card is white); "flat" for bordered card on light pages. */
  surface?: "panel" | "flat";
  className?: string;
}

/** Configurable enquiry form used by the Buy, Rent, Sell and Services pages. */
export function LeadForm({
  source,
  title,
  selects = [],
  text,
  messageLabel = "Tell us more",
  messagePlaceholder,
  submitLabel,
  sentMessage,
  note = "No obligation. We never share your details.",
  surface = "panel",
  className = "",
}: Props) {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm(source);
  const shell = surface === "panel" ? "rounded-2xl bg-white p-6 text-ink shadow-panel" : "rounded-[18px] border border-border bg-white p-6 text-ink shadow-soft sm:p-8";
  return (
    <form onSubmit={onSubmit} aria-label={title ?? submitLabel} className={`flex flex-col gap-3 ${shell} ${className}`}>
      {title && <div className="font-serif text-[24px] font-medium leading-[1.2] text-navy">{title}</div>}
      <FormStatus sent={sent} error={error} sentMessage={sentMessage} />
      {!sent && (
        <>
          {text && (
            <label htmlFor={`${id}-${text.name}`} className="field">
              {text.label}
              <input id={`${id}-${text.name}`} name={text.name} type="text" defaultValue={text.value} placeholder={text.placeholder} className="input h-[52px] text-[15px]" />
            </label>
          )}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-2.5">
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
          {selects.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-2.5">
              {selects.map((s) => (
                <label key={s.name} htmlFor={`${id}-${s.name}`} className="field">
                  {s.label}
                  <select id={`${id}-${s.name}`} name={s.name} defaultValue={s.value} className="select">
                    {s.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          )}
          <label htmlFor={`${id}-msg`} className="field">
            {messageLabel}
            <textarea id={`${id}-msg`} name="message" rows={3} placeholder={messagePlaceholder} className="textarea" />
          </label>
          <button type="submit" disabled={sending} className="btn-accent btn-54 w-full disabled:opacity-70">
            {sending ? "Sending…" : submitLabel}
          </button>
          <div className="text-center text-[12px] font-medium text-meta">{note}</div>
        </>
      )}
    </form>
  );
}
