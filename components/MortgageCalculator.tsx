"use client";

import { useId, useState } from "react";
import type { Currency } from "@/types/listing";
import { money } from "@/lib/format";

interface Props {
  initialPrice?: number;
}

const TERMS = [10, 15, 20, 25, 30];

/**
 * Mortgage calculator: principal & interest only. Rates, deposit and term are
 * all editable because bank terms in Guyana vary by lender and borrower.
 */
export function MortgageCalculator({ initialPrice = 150000 }: Props) {
  const id = useId();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(7.5);
  const [term, setTerm] = useState(25);

  const loan = Math.max(0, price * (1 - down / 100));
  const r = rate / 100 / 12;
  const n = term * 12;
  const payment = r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
  const total = payment * n;
  const interest = total - loan;
  const downAmt = Math.round((price * down) / 100);
  const fmt = (v: number) => money(Math.round(v), currency);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 rounded-[18px] border border-border bg-white p-6 shadow-soft sm:p-7" aria-label="Mortgage inputs">
        <div role="group" aria-label="Currency" className="seg grid-cols-2">
          {(["USD", "GYD"] as Currency[]).map((c) => (
            <button key={c} type="button" onClick={() => setCurrency(c)} aria-pressed={currency === c} className="seg-btn">
              {c === "USD" ? "US dollars" : "Guyana dollars"}
            </button>
          ))}
        </div>
        <label htmlFor={`${id}-price`} className="field">
          Property price ({currency})
          <input
            id={`${id}-price`}
            type="number"
            inputMode="numeric"
            min={0}
            step={currency === "USD" ? 1000 : 100000}
            value={price}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
            className="input h-[52px] text-[16px] font-semibold"
          />
        </label>
        <div>
          <label htmlFor={`${id}-down`} className="text-[13px] font-semibold text-slate">
            Down payment: <strong>{down}%</strong> ({fmt(downAmt)})
          </label>
          <input
            id={`${id}-down`}
            type="range"
            min={0}
            max={60}
            step={5}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
            aria-valuetext={`${down} percent, ${fmt(downAmt)}`}
            className="range mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label htmlFor={`${id}-rate`} className="field">
            Interest rate (% per year)
            <input
              id={`${id}-rate`}
              type="number"
              inputMode="decimal"
              min={0}
              max={30}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              className="input"
            />
          </label>
          <label htmlFor={`${id}-term`} className="field">
            Term (years)
            <select id={`${id}-term`} value={term} onChange={(e) => setTerm(Number(e.target.value))} className="select">
              {TERMS.map((t) => (
                <option key={t} value={t}>
                  {t} years
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>

      <div className="surface-navy flex flex-col justify-center rounded-[18px] p-7 sm:p-8">
        <div className="relative">
          <div className="eyebrow-light">Estimated monthly payment</div>
          <div className="mt-3 font-serif font-medium leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(38px, 5vw, 56px)" }} aria-live="polite">
            {fmt(payment)}
            <span className="ml-1 text-[16px] font-sans font-semibold text-white/70">/ month</span>
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 text-[14px]">
            {[
              ["Loan amount", fmt(loan)],
              ["Down payment", fmt(downAmt)],
              ["Total interest", fmt(interest)],
              ["Total repaid", fmt(total)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-white/65">{k}</dt>
                <dd className="m-0 mt-0.5 text-[17px] font-bold text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mb-0 mt-6 text-[12.5px] leading-[1.6] text-white/60">
            Principal and interest only. Excludes legal fees, insurance, valuation and bank charges. Lenders set their own rates and terms;
            this estimate is not an offer of credit.
          </p>
        </div>
      </div>
    </div>
  );
}
