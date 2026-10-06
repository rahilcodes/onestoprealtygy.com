import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PRIMARY_PHONE } from "@/lib/site";
import { Steps } from "@/components/Steps";
import { SellLeadForm } from "@/components/sell/SellLeadForm";

export const metadata: Metadata = {
  title: "Sell or let your property",
  description:
    "Sell or rent out your house, apartment, commercial building or land in Georgetown and Demerara. Pricing guidance, marketing, buyer and tenant screening from One Stop Realty Investment Inc.",
  alternates: { canonical: "/sell" },
};

const PILLARS = [
  ["01", "Honest pricing guidance", "We look at comparable sales, the condition of the property and current buyer demand before recommending an asking price, and we explain the reasoning."],
  ["02", "Marketing that reaches buyers", "Listing on our website and social channels, plus direct introductions to buyers and tenants already registered with us."],
  ["03", "Screened buyers and tenants", "We qualify interest before viewings, so your time is spent on serious buyers and reliable tenants."],
  ["04", "Paperwork carried through", "Attorneys, appraisers and banks in our network keep the agreement of sale, financing and transfer moving."],
];

const STEPS = [
  ["1", "Property review", "We visit the property, discuss your goals and timing, and recommend a price range."],
  ["2", "Preparation", "Practical advice on presentation and repairs, with interior and architectural partners if needed."],
  ["3", "Marketing", "Photography, a listing on our site and channels, and introductions to registered buyers or tenants."],
  ["4", "Viewings and offers", "Accompanied viewings, screened enquiries and negotiation on your behalf."],
  ["5", "Completion", "Agreement of sale or tenancy, financing coordination and hand-over."],
].map(([n, t, d]) => ({ n, t, d }));

export default function SellPage() {

  return (
    <>
      <section id="inquiry" className="surface-navy scroll-mt-[72px]">
        <div className="container-1200 relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-12 pb-16 pt-[64px] sm:pt-[72px]">
          <div>
            <div className="eyebrow-light hero-in">For property owners</div>
            <h1 className="hero-in-2 mt-4 font-serif font-medium leading-[1.06] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(34px, 4.6vw, 56px)" }}>
              Sell or let your property with a team that handles everything.
            </h1>
            <p className="hero-in-3 mt-5 max-w-[520px] text-[17px] leading-[1.65] text-white/[0.85]">
              Honest pricing guidance, marketing to registered buyers and tenants, and a network of attorneys and appraisers to carry the
              deal through. Start with a free, no-obligation property consultation.
            </p>
            <ul className="hero-in-3 m-0 mt-6 flex list-none flex-col gap-2.5 p-0 text-[15px] font-medium text-white/90">
              {["Residential, commercial and land", "Sales and rentals", "Owners overseas welcome: we can manage the property for you"].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-accent">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Suspense fallback={<div className="h-[400px] rounded-2xl bg-white/10 animate-pulse" />}>
            <SellLeadForm />
          </Suspense>
        </div>
      </section>

      <section className="container-1200 reveal pt-20">
        <div className="max-w-[640px]">
          <div className="eyebrow">Why list with One Stop Realty</div>
          <h2 className="h2 mt-3">A straightforward sale or letting, from pricing to hand-over</h2>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {PILLARS.map(([n, t, d]) => (
            <div key={n} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-7">
              <div className="font-serif text-[13px] font-medium uppercase tracking-[0.14em] text-accent-deep">{n}</div>
              <h3 className="h3 m-0">{t}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-slate-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal mt-20 bg-ivory">
        <div className="container-1200 py-[72px]">
          <div className="max-w-[640px]">
            <div className="eyebrow">The process</div>
            <h2 className="h2 mt-3">From property review to completion</h2>
          </div>
          <Steps steps={STEPS} />
        </div>
      </section>

      <section className="container-1200 reveal pb-[96px] pt-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-9 rounded-[20px] border border-border bg-white" style={{ padding: "clamp(28px, 4vw, 48px)" }}>
          <div>
            <div className="eyebrow">Landlords</div>
            <h2 className="mt-3 font-serif font-medium leading-[1.15] tracking-[-0.02em] text-navy" style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>
              Prefer to keep the property and earn from it?
            </h2>
            <p className="mt-3 max-w-[480px] text-[16px] leading-[1.6] text-slate-2">
              Our property management service finds and screens tenants, collects rent and looks after upkeep, which is especially useful for
              owners living overseas.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/services#property-management" className="btn-primary h-[54px] rounded-[10px] text-[15px] font-extrabold">
              Property management
            </Link>
            <a href={PRIMARY_PHONE.href} className="btn-outline h-[54px] rounded-[10px] text-[15px]">
              Call {PRIMARY_PHONE.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
