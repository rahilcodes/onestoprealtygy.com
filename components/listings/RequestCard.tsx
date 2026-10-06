"use client";

import { useId } from "react";
import { useLeadForm } from "@/lib/leads";

/** Inline lead capture in the results grid: tell us what you need and we search for you. */
export function RequestCard() {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm("listings-request", () => ({
    search: typeof window !== "undefined" ? window.location.search : "",
  }));
  return (
    <div className="surface-navy flex min-h-[340px] flex-col justify-center gap-3 rounded-[14px] p-7">
      <div className="relative">
        <div className="eyebrow-light">Can&rsquo;t see it here?</div>
        <div className="mt-2 font-serif text-[24px] font-medium leading-[1.2]">Tell us what you need and we will find it.</div>
        <p className="m-0 mt-2 text-[14px] leading-[1.55] text-white/80">
          Many properties are matched before they are listed. Leave your email and a line about what you are after.
        </p>
        {sent ? (
          <p role="status" className="m-0 mt-4 rounded-lg bg-white/10 px-4 py-3 text-[14px] font-semibold text-accent-soft">
            Thanks. We will be in touch with matching properties.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2">
            <label htmlFor={`${id}-email`} className="sr-only">
              Email
            </label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@email.com" className="input-dark h-[46px]" />
            <label htmlFor={`${id}-need`} className="sr-only">
              What are you looking for?
            </label>
            <input id={`${id}-need`} name="message" type="text" placeholder="e.g. 3-bed house to rent, East Bank" className="input-dark h-[46px]" />
            <button type="submit" disabled={sending} className="btn focus-white h-[46px] rounded-lg bg-accent text-[14px] font-extrabold text-navy-deep hover:bg-accent-hover disabled:opacity-70">
              {sending ? "Sending…" : "Request a property"}
            </button>
            {error && (
              <p role="alert" className="m-0 text-[12.5px] font-medium text-[#F3B8B0]">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
