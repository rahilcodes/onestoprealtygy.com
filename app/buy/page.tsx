import type { Metadata } from "next";
import Link from "next/link";
import { getListings } from "@/lib/data";
import { CATEGORIES, REGIONS } from "@/lib/site";
import { ListingCard } from "@/components/ListingCard";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Steps } from "@/components/Steps";

export const metadata: Metadata = {
  title: "Buy property in Georgetown & Demerara",
  description:
    "Houses, apartments, commercial buildings and land for sale across Georgetown, East Bank, East Coast and West Bank Demerara, with mortgage and financing guidance from One Stop Realty.",
  alternates: { canonical: "/buy" },
};

const STEPS = [
  ["1", "Tell us what you need", "Location, property type, budget and timing. We shortlist what fits, including properties not yet advertised."],
  ["2", "Financing guidance", "Realistic advice on mortgage eligibility, deposits and bank requirements before you commit, drawn from 17 years in banking."],
  ["3", "Accompanied viewings", "We arrange and attend every viewing, and answer questions about the area, the building and the paperwork."],
  ["4", "Offer and due diligence", "Negotiation, title and transport checks, valuations and surveys, coordinated with attorneys and appraisers in our network."],
  ["5", "Completion", "We stay with you through the agreement of sale, financing approval and hand-over of keys."],
].map(([n, t, d]) => ({ n, t, d }));

const BUDGETS = ["Under US$100K", "US$100K – 250K", "US$250K – 500K", "US$500K+", "Not sure yet"];
const TYPES = ["House", "Apartment / townhouse", "Commercial building", "Residential land", "Commercial land"];
const TIMING = ["As soon as possible", "Within 3 months", "3–12 months", "Just exploring"];

export default async function BuyPage() {
  const forSale = await getListings({ purpose: "sale", limit: 6 });
  const saleCategories = CATEGORIES.filter((c) => c.purpose === "sale");
  return (
    <>
      <PageHero
        eyebrow="Buy a home or investment property"
        title="Buying in Guyana, guided from the first viewing to the keys."
        lede="Residential, commercial and land for sale across Georgetown and Demerara, with honest financing advice before you make an offer."
        image={{ src: "/images/stock/family-keys.jpg", alt: "", position: "center 30%" }}
      >
        <Link href="/listings?purpose=sale" className="btn-accent px-7">
          Browse properties for sale
        </Link>
        <a href="#enquire" className="btn-outline-light h-[52px] rounded-[10px] px-6 text-[15px]">
          Tell us what you need
        </a>
      </PageHero>

      <section className="container-1200 reveal pt-[72px]">
        <div className="section-head">
          <div>
            <div className="eyebrow">For sale</div>
            <h2 className="h2 mt-3">Current properties for sale</h2>
          </div>
          <Link href="/listings?purpose=sale" className="btn-outline btn-44">
            All properties for sale →
          </Link>
        </div>
        {forSale.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[22px]">
            {forSale.map((item, i) => (
              <ListingCard key={item.id} item={item} priority={i < 3} />
            ))}
          </div>
        ) : (
          <p className="text-[15px] text-slate-2">New sale listings are being added. Contact us for the current portfolio.</p>
        )}
      </section>

      <section className="container-1200 reveal pt-20">
        <div className="section-head">
          <div>
            <div className="eyebrow">Browse by category</div>
            <h2 className="h2 mt-3">What are you looking for?</h2>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          {saleCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/listings?category=${c.slug}`}
              className="flex flex-col gap-2 rounded-[14px] border border-border bg-white p-6 text-ink no-underline transition-[border-color,box-shadow] hover:border-navy hover:shadow-card"
            >
              <h3 className="m-0 font-serif text-[21px] font-medium text-navy">{c.label}</h3>
              <p className="m-0 text-[14px] leading-[1.55] text-slate-2">{c.blurb}</p>
              <span className="arrow-link mt-auto pt-1 text-[13.5px]">
                View <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="rail mt-5 flex items-center gap-2 overflow-x-auto text-[13px] font-semibold text-meta">
          <span className="flex-none">By area:</span>
          {REGIONS.map((r) => (
            <Link key={r} href={`/listings?purpose=sale&region=${encodeURIComponent(r)}`} className="chip flex-none">
              {r}
            </Link>
          ))}
        </div>
      </section>

      <section className="reveal mt-20 bg-ivory">
        <div className="container-1200 py-[72px]">
          <div className="max-w-[640px]">
            <div className="eyebrow">How buying works</div>
            <h2 className="h2 mt-3">Five steps from first enquiry to completion</h2>
          </div>
          <Steps steps={STEPS} />
        </div>
      </section>

      <section className="container-1200 reveal pt-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-7">
            <div className="eyebrow">Financing</div>
            <h3 className="h3 m-0">Mortgage guidance before you offer</h3>
            <p className="m-0 text-[14.5px] leading-[1.6] text-slate-2">
              Our founder worked as a mortgage advisor for 17 years. We help you understand what banks look for, what you can realistically
              borrow, and how to prepare an application.
            </p>
            <Link href="/mortgage-calculator" className="arrow-link mt-auto pt-2">
              Try the mortgage calculator <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-7">
            <div className="eyebrow">Investors</div>
            <h3 className="h3 m-0">Income property and land</h3>
            <p className="m-0 text-[14.5px] leading-[1.6] text-slate-2">
              Rental apartments, commercial buildings and development parcels along the East Bank, East Coast and West Bank corridors.
            </p>
            <Link href="/services#investment" className="arrow-link mt-auto pt-2">
              Investment services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-7">
            <div className="eyebrow">Overseas buyers</div>
            <h3 className="h3 m-0">Buying from abroad</h3>
            <p className="m-0 text-[14.5px] leading-[1.6] text-slate-2">
              Video viewings, coordination with attorneys and appraisers, and property management once you own, so you can buy with
              confidence from overseas.
            </p>
            <Link href="/contact" className="arrow-link mt-auto pt-2">
              Talk to us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="enquire" className="container-1200 reveal mt-20 scroll-mt-24 pb-[96px]">
        <div className="surface-navy rounded-[20px]" style={{ padding: "clamp(28px, 5vw, 64px)" }}>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-10">
            <div>
              <div className="eyebrow-light">Buyer enquiry</div>
              <h2 className="mt-3 font-serif font-medium leading-[1.12] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
                Tell us what you are looking for. We will bring options.
              </h2>
              <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.6] text-white/80">
                Share your budget, preferred areas and timing. We will come back with matching properties, including some that are not yet
                advertised, and realistic financing guidance.
              </p>
              <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 p-0 text-[15px] font-medium text-white/90">
                {["No obligation", "Accompanied viewings", "Attorneys, appraisers and banks coordinated for you"].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm
              source="buy-enquiry"
              selects={[
                { name: "propertyType", label: "Property type", options: TYPES },
                { name: "budget", label: "Budget", options: BUDGETS },
                { name: "area", label: "Preferred area", options: ["Any area", ...REGIONS] },
                { name: "timing", label: "Timing", options: TIMING },
              ]}
              messageLabel="Anything else we should know?"
              messagePlaceholder="e.g. 3 bedrooms, gated community, close to schools"
              submitLabel="Send my enquiry"
              sentMessage="Thanks. We will be in touch with matching properties and next steps."
            />
          </div>
        </div>
      </section>
    </>
  );
}
