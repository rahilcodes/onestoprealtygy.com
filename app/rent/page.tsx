import type { Metadata } from "next";
import Link from "next/link";
import { getListings } from "@/lib/data";
import { REGIONS } from "@/lib/site";
import { ListingCard } from "@/components/ListingCard";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Steps } from "@/components/Steps";

export const metadata: Metadata = {
  title: "Rent an apartment, house or office in Georgetown",
  description:
    "Furnished and unfurnished apartments, houses and commercial space to rent across Georgetown and Demerara. Accompanied viewings and lease support from One Stop Realty.",
  alternates: { canonical: "/rent" },
};

const STEPS = [
  ["1", "Share your requirements", "Budget, area, size, furnishing and move-in date. Corporate and expatriate tenants are welcome."],
  ["2", "Shortlist and viewings", "We shortlist suitable properties and arrange accompanied viewings at times that work for you."],
  ["3", "Application", "Straightforward tenant checks and references, handled discreetly."],
  ["4", "Lease and move-in", "A clear tenancy agreement, deposit handling and an inventory for furnished homes."],
].map(([n, t, d]) => ({ n, t, d }));

const BUDGETS = ["Under US$1,500 / mo", "US$1,500 – 3,000 / mo", "US$3,000 – 6,000 / mo", "US$6,000+ / mo", "Not sure yet"];
const TYPES = ["Apartment", "House / townhouse", "Office or commercial space", "Other"];
const MOVE = ["Within 2 weeks", "Within a month", "1–3 months", "Flexible"];

export default async function RentPage() {
  const rentals = await getListings({ purpose: "rent", limit: 6 });
  return (
    <>
      <PageHero
        eyebrow="Rent a home or workspace"
        title="Homes and offices to rent, ready when you are."
        lede="Furnished and unfurnished apartments, houses and commercial space across Georgetown and Demerara, with viewings arranged by our team."
        image={{ src: "/images/listings/atlantic-towers.webp", alt: "", position: "center 55%" }}
      >
        <Link href="/listings?purpose=rent" className="btn-accent px-7">
          Browse rentals
        </Link>
        <a href="#enquire" className="btn-outline-light h-[52px] rounded-[10px] px-6 text-[15px]">
          Request a rental
        </a>
      </PageHero>

      <section className="container-1200 reveal pt-[72px]">
        <div className="section-head">
          <div>
            <div className="eyebrow">For rent</div>
            <h2 className="h2 mt-3">Current rentals</h2>
          </div>
          <Link href="/listings?purpose=rent" className="btn-outline btn-44">
            All rentals →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[22px]">
          {rentals.map((item, i) => (
            <ListingCard key={item.id} item={item} priority={i < 3} />
          ))}
        </div>
        <div className="rail mt-6 flex items-center gap-2 overflow-x-auto text-[13px] font-semibold text-meta">
          <span className="flex-none">Filter:</span>
          <Link href="/listings?category=residential-rent" className="chip flex-none">
            Residential rentals
          </Link>
          <Link href="/listings?category=commercial-rent" className="chip flex-none">
            Commercial rentals
          </Link>
          {REGIONS.map((r) => (
            <Link key={r} href={`/listings?purpose=rent&region=${encodeURIComponent(r)}`} className="chip flex-none">
              {r}
            </Link>
          ))}
        </div>
      </section>

      <section className="reveal mt-20 bg-ivory">
        <div className="container-1200 py-[72px]">
          <div className="max-w-[640px]">
            <div className="eyebrow">How renting works</div>
            <h2 className="h2 mt-3">From enquiry to move-in</h2>
          </div>
          <Steps steps={STEPS} />
        </div>
      </section>

      <section className="container-1200 reveal pt-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-7">
            <div className="eyebrow">Corporate &amp; expatriate tenants</div>
            <h3 className="h3 m-0">Furnished homes close to the city</h3>
            <p className="m-0 text-[15px] leading-[1.6] text-slate-2">
              Secure, furnished apartments and houses in Georgetown and the surrounding areas, suited to professionals relocating to Guyana.
              We handle viewings, agreements and hand-over.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-7">
            <div className="eyebrow">Landlords</div>
            <h3 className="h3 m-0">Let your property with us</h3>
            <p className="m-0 text-[15px] leading-[1.6] text-slate-2">
              Tenant sourcing and screening, rent collection and property management for owners at home or abroad.
            </p>
            <Link href="/sell#inquiry" className="arrow-link mt-auto pt-1">
              List a property to rent <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="enquire" className="container-1200 reveal mt-20 scroll-mt-24 pb-[96px]">
        <div className="surface-navy rounded-[20px]" style={{ padding: "clamp(28px, 5vw, 64px)" }}>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-10">
            <div>
              <div className="eyebrow-light">Rental enquiry</div>
              <h2 className="mt-3 font-serif font-medium leading-[1.12] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
                Tell us what you need and when you need it.
              </h2>
              <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.6] text-white/80">
                We will send matching rentals and arrange viewings. If nothing on the site fits, we search on your behalf.
              </p>
            </div>
            <LeadForm
              source="rent-enquiry"
              selects={[
                { name: "propertyType", label: "Property type", options: TYPES },
                { name: "budget", label: "Monthly budget", options: BUDGETS },
                { name: "area", label: "Preferred area", options: ["Any area", ...REGIONS] },
                { name: "moveIn", label: "Move-in", options: MOVE },
              ]}
              messageLabel="Requirements"
              messagePlaceholder="e.g. 2 bedrooms, furnished, secure parking"
              submitLabel="Send my enquiry"
              sentMessage="Thanks. We will be in touch with suitable rentals and viewing times."
            />
          </div>
        </div>
      </section>
    </>
  );
}
