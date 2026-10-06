"use client";

import { useId } from "react";
import { useLeadForm } from "@/lib/leads";

interface Props {
  source: string;
  layout?: "stack" | "row";
  buttonLabel?: string;
}

/** Email-only subscribe form used on dark surfaces. */
export function NewsletterForm({ source, layout = "stack", buttonLabel = "Subscribe" }: Props) {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm(source);

  if (sent) {
    return (
      <p role="status" className="m-0 rounded-lg bg-white/10 px-4 py-3 text-[14px] font-semibold text-accent-soft">
        You&apos;re on the list. We will email you when new properties are listed.
      </p>
    );
  }

  const row = layout === "row";
  return (
    <form onSubmit={onSubmit} className={row ? "flex flex-wrap gap-2.5" : "flex flex-col gap-2"}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@email.com"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`input-dark ${row ? "h-[54px] flex-[1_1_220px] rounded-[10px] px-4 text-[15px]" : ""}`}
      />
      <button
        type="submit"
        disabled={sending}
        className={`btn focus-white bg-accent font-extrabold text-navy-deep hover:bg-accent-hover disabled:opacity-70 ${
          row ? "h-[54px] flex-none rounded-[10px] px-6 text-[15px]" : "h-12 rounded-lg text-[14px]"
        }`}
      >
        {sending ? "Sending…" : buttonLabel}
      </button>
      {error && (
        <p id={`${id}-err`} role="alert" className="m-0 w-full text-[12.5px] font-medium text-[#F3B8B0]">
          {error}
        </p>
      )}
    </form>
  );
}
