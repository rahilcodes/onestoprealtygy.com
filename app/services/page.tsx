import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_SUBJECTS } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sales, rentals, property management, real estate investment, consultancy, architectural and interior design services from One Stop Realty Investment Inc. in Georgetown, Guyana.",
  alternates: { canonical: "/services" },
};

interface Service {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
  photo: { src?: string; label: string };
}

const SERVICES: Service[] = [
  {
    id: "sales",
    eyebrow: "Sale of properties",
    title: "Buying and selling residential, commercial and land",
    body: "We represent buyers and sellers of houses, apartments, commercial buildings and land across Georgetown and Demerara. Buyers get shortlists, accompanied viewings and financing guidance; sellers get honest pricing, marketing and screened offers.",
    points: ["Houses, apartments and townhouses", "Office and commercial buildings", "Residential and commercial land", "Negotiation and completion support"],
    cta: { label: "Properties for sale", href: "/listings?purpose=sale" },
    photo: { src: "/images/stock/house-exterior.jpg", label: "house exterior" },
  },
  {
    id: "rentals",
    eyebrow: "Rental of properties",
    title: "Homes and workspaces to rent",
    body: "Furnished and unfurnished apartments and houses for professionals, families and expatriate tenants, plus office and commercial space for businesses. We arrange viewings, references and tenancy agreements.",
    points: ["Furnished and unfurnished rentals", "Corporate and expatriate tenants", "Offices, shops and warehouses", "Lease agreements and inventories"],
    cta: { label: "Properties for rent", href: "/listings?purpose=rent" },
    photo: { src: "/images/listings/atlantic-towers.webp", label: "furnished apartment" },
  },
  {
    id: "property-management",
    eyebrow: "Property management",
    title: "Looking after your property, wherever you are",
    body: "For owners at home or overseas, we source and screen tenants, collect rent, coordinate maintenance and keep you informed, so the property earns without becoming a second job.",
    points: ["Tenant sourcing and screening", "Rent collection and reporting", "Maintenance coordination", "Regular inspections"],
    cta: { label: "Talk to us about management", href: "/contact?subject=Property%20Management" },
    photo: { src: "/images/listings/la-parfaite-harmonie-2br.jpg", label: "apartment building at La Parfaite Harmonie" },
  },
  {
    id: "investment",
    eyebrow: "Real estate investment",
    title: "Guidance for investors in Guyana's property market",
    body: "From income-producing apartments to land along the East Bank, East Coast and West Bank corridors, we help investors evaluate opportunities with realistic figures and an understanding of financing.",
    points: ["Income property and rental yields", "Land and development parcels", "Commercial buildings", "Financing structures"],
    cta: { label: "Discuss an investment", href: "/contact?subject=Real%20Estate%20Investment" },
    photo: { src: "/images/listings/garnett-street.webp", label: "multi-storey building on Garnett Street, Georgetown" },
  },
  {
    id: "consultancy",
    eyebrow: "Consultancy",
    title: "Mortgage and financing advice from 17 years in banking",
    body: "Our founder spent 17 years in the banking sector as a mortgage advisor and in commercial credit. We help clients understand what lenders require, prepare applications and plan a purchase or sale around realistic financing.",
    points: ["Mortgage eligibility and preparation", "Bank requirements and documentation", "Commercial credit facilities", "Attorneys, appraisers and insurers in our network"],
    cta: { label: "Book a consultation", href: "/contact?subject=Consultancy" },
    photo: { label: "consultation meeting" },
  },
  {
    id: "design",
    eyebrow: "Architectural and interior services",
    title: "Plans, drawings and interiors through our partners",
    body: "Through partner architects, contractors, building-material suppliers and interior designers, we support new builds, renovations and the presentation of a property for sale or rent.",
    points: ["Architectural plans and drawings", "Renovation and extension support", "Interior design and staging", "Contractor and supplier introductions"],
    cta: { label: "Ask about design services", href: "/contact?subject=Architectural%20Services" },
    photo: { src: "/images/stock/living-room.jpg", label: "interior living space" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One team for every stage of a property decision."
        lede="Sales, rentals, property management, investment guidance, consultancy and design support, coordinated by one firm with a trusted network of attorneys, appraisers, architects and contractors."
        image={{ src: "/images/stock/living-room.jpg", alt: "", position: "center 40%" }}
      >
        <a href="#sales" className="btn-accent px-7">
          Explore services
        </a>
        <Link href="/contact" className="btn-outline-light h-[52px] rounded-[10px] px-6 text-[15px]">
          Contact us
        </Link>
      </PageHero>

      <nav aria-label="Services" className="border-b border-line bg-white">
        <div className="container-1200 rail flex gap-1 overflow-x-auto py-2">
          {SERVICES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-11 flex-none items-center whitespace-nowrap rounded-full px-3.5 text-[13.5px] font-semibold text-slate no-underline hover:bg-cloud hover:text-navy">
              {s.eyebrow}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-1200 flex flex-col gap-20 pt-[72px]">
        {SERVICES.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-h`}
            className={`reveal grid scroll-mt-32 grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-10 ${i % 2 ? "nav:[&>*:first-child]:order-last" : ""}`}
          >
            <Photo label={s.photo.label} src={s.photo.src} tone={i % 2 ? "warm" : "cool"} labelPosition="icon" className="aspect-[4/3] rounded-[18px]" sizes="(max-width: 800px) 100vw, 560px" />
            <div>
              <div className="eyebrow">{s.eyebrow}</div>
              <h2 id={`${s.id}-h`} className="h2 mt-3">
                {s.title}
              </h2>
              <p className="lede mt-4">{s.body}</p>
              <ul className="m-0 mt-5 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-6 gap-y-2 p-0">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] font-medium text-slate">
                    <span aria-hidden="true" className="mt-[7px] h-2 w-2 flex-none rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href={s.cta.href} className="btn-primary mt-7">
                {s.cta.label}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="container-1200 reveal mt-24 pb-[96px]">
        <div className="surface-navy rounded-[20px]" style={{ padding: "clamp(28px, 5vw, 64px)" }}>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-10">
            <div>
              <div className="eyebrow-light">Get in touch</div>
              <h2 className="mt-3 font-serif font-medium leading-[1.12] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
                Tell us what you need help with.
              </h2>
              <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.6] text-white/80">
                Choose a service and leave a short message. We will reply with next steps, or call you back if you prefer.
              </p>
            </div>
            <LeadForm
              source="services-enquiry"
              selects={[{ name: "subject", label: "Service", options: CONTACT_SUBJECTS }]}
              messageLabel="How can we help?"
              submitLabel="Send enquiry"
              sentMessage="Thanks. Your enquiry is in and we will be in touch shortly."
            />
          </div>
        </div>
      </section>
    </>
  );
}
