import { Suspense } from "react";
import type { Metadata } from "next";
import { ADDRESS_LINE, SITE } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Call, email or visit One Stop Realty Investment Inc. at ${ADDRESS_LINE}, Guyana. Phone 592-505-6807 or 592-629-0114.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(`${SITE.address.street}, ${SITE.address.area}, ${SITE.address.city}, ${SITE.address.country}`);

  return (
    <>
      <section className="container-1200 pb-[96px] pt-14 sm:pt-16">
        <div className="max-w-[680px]">
          <div className="eyebrow hero-in">Contact</div>
          <h1 className="h-display hero-in-2 mt-3.5">How can One Stop Realty help?</h1>
          <p className="lede hero-in-3 mt-4">
            Call, email, message or visit our Subryanville office. We reply to every enquiry, and we are happy to arrange viewings and
            consultations around your schedule.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-8">
          <Suspense fallback={<div className="h-[400px] rounded-[18px] bg-cloud animate-pulse" />}>
            <ContactForm />
          </Suspense>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[22px] rounded-[18px] border border-border p-[26px]">
              <div>
                <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent-deep">Phone</div>
                {SITE.phones.map((p) => (
                  <a key={p.href} href={p.href} className="mt-0.5 flex min-h-11 items-center text-[18px] font-bold text-navy no-underline hover:underline">
                    {p.label}
                  </a>
                ))}
                <div className="mt-0.5 text-[13px] font-medium text-meta">Call or WhatsApp</div>
              </div>
              <div>
                <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent-deep">Email</div>
                <a href={`mailto:${SITE.email}`} className="mt-1 inline-flex min-h-11 items-center break-all text-[16px] font-bold text-navy no-underline hover:underline">
                  {SITE.email}
                </a>
              </div>
              <div>
                <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent-deep">Office</div>
                <address className="mt-1.5 text-[15px] font-medium not-italic leading-[1.5] text-ink">
                  {SITE.address.street}
                  <br />
                  {SITE.address.area}, {SITE.address.city}
                  <br />
                  {SITE.address.country}
                </address>
              </div>
              <div>
                <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent-deep">Follow</div>
                {SITE.social.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="mt-1 inline-flex min-h-11 items-center text-[15px] font-bold text-navy no-underline hover:underline">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-border">
              <iframe
                title={`Map showing ${SITE.name} office in ${SITE.address.area}, ${SITE.address.city}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[300px] w-full border-0"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 text-[13.5px] text-slate">
                <span>{ADDRESS_LINE}</span>
                <a href={SITE.address.mapsUrl} target="_blank" rel="noreferrer" className="text-link">
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
