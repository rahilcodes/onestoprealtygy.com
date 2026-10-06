import type { Metadata } from "next";
import Link from "next/link";
import { first } from "@/lib/query";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Mortgage calculator",
  description: "Estimate a monthly mortgage payment in US or Guyana dollars, then talk to One Stop Realty about financing your purchase.",
  alternates: { canonical: "/mortgage-calculator" },
};

const TIPS = [
  ["Deposit", "Most lenders expect a deposit; a larger one lowers the loan, the monthly payment and the interest paid over the term."],
  ["Documents", "Proof of income, bank statements, identification and details of the property are typically required. We can help you prepare."],
  ["Total cost", "Budget for legal fees, valuation, insurance and bank charges on top of the price. These vary by lender and property."],
];

export default async function MortgageCalculatorPage({ searchParams }: PageProps<"/mortgage-calculator">) {
  const sp = await searchParams;
  const priceParam = Number(first(sp.price));
  const initialPrice = Number.isFinite(priceParam) && priceParam > 0 ? priceParam : undefined;

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Mortgage calculator"
        lede="Estimate what a purchase could cost each month, then talk to us about what lenders look for. Our founder spent 17 years in mortgage financing."
        compact
      />
      <section className="container-1200 pt-12">
        <MortgageCalculator initialPrice={initialPrice} />
      </section>
      <section className="container-1200 pb-[96px] pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {TIPS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-white p-6">
              <h2 className="m-0 text-[17px] font-bold text-navy">{t}</h2>
              <p className="m-0 mt-2 text-[14.5px] leading-[1.6] text-slate-2">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact?subject=Consultancy" className="btn-primary">
            Ask about financing
          </Link>
          <Link href="/listings?purpose=sale" className="btn-outline">
            Browse properties for sale
          </Link>
        </div>
      </section>
    </>
  );
}
