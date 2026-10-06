import Image from "next/image";
import Link from "next/link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { ListingCard } from "@/components/ListingCard";
import { Photo } from "@/components/Photo";
import { getListings } from "@/lib/data";
import { CATEGORIES, PRIMARY_PHONE, REGIONS, SITE } from "@/lib/site";

const PATHS = [
  {
    eyebrow: "Buy",
    title: "Find a home or an investment",
    body: "Houses, apartments, commercial buildings and land for sale across Georgetown and Demerara, with financing guidance from day one.",
    href: "/buy",
    cta: "Explore properties for sale",
    photo: "/images/stock/house-exterior.jpg",
    alt: "White two-storey house with a lawn and palm trees",
  },
  {
    eyebrow: "Rent",
    title: "Move into a home that is ready",
    body: "Furnished and unfurnished apartments, houses and office space to rent, screened and shown by our team.",
    href: "/rent",
    cta: "See rentals",
    photo: "/images/listings/atlantic-towers.webp",
    alt: "Furnished apartment living room at Atlantic Towers, Georgetown",
  },
  {
    eyebrow: "Sell",
    title: "Sell or let with confidence",
    body: "Pricing advice, marketing, buyer and tenant screening, and a network of attorneys and appraisers to carry the deal through.",
    href: "/sell",
    cta: "Talk to us about selling",
    photo: "/images/stock/living-room.jpg",
    alt: "Bright living room with large windows",
  },
];

const WHY = [
  {
    title: "Banking and mortgage expertise",
    body: "Our founder spent 17 years in the banking sector as a mortgage advisor, so you get realistic guidance on financing before you fall in love with a property.",
  },
  {
    title: "A genuine one-stop service",
    body: "Attorneys, appraisers, architects, insurance agents, contractors and building-material suppliers in one network, coordinated for you.",
  },
  {
    title: "Residential, commercial and land",
    body: "From a first apartment to an office building or a development parcel, we handle every property type across Demerara.",
  },
  {
    title: "Customer-focused, always",
    body: "Personalised, attentive service that keeps buying, selling or renting as smooth and stress-free as possible.",
  },
];

const CATEGORY_PHOTOS: Record<string, { src?: string; label: string }> = {
  residential: { src: "/images/stock/home-dusk.jpg", label: "modern house at dusk" },
  commercial: { src: "/images/listings/brickdam-office.webp", label: "office interior on Brickdam" },
  "residential-land": { label: "cleared residential house lot" },
  "commercial-land": { label: "commercial land near the public road" },
  "residential-rent": { src: "/images/listings/atlantic-towers.webp", label: "furnished apartment living room" },
  "commercial-rent": { src: "/images/listings/garnett-street.webp", label: "multi-storey building in Campbellville" },
};

export default async function HomePage() {
  const featured = await getListings({ featured: true, limit: 6 });

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="hero relative flex items-end overflow-hidden bg-navy-deep text-white">
          <Image
            src="/images/stock/home-dusk.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-img object-cover object-[60%_40%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/20" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/80 to-transparent" />
          <div className="container-1200 relative pb-[150px] pt-16 sm:pb-[130px] sm:pt-20 nav:pb-[120px]">
            <div className="max-w-[700px]">
              <div className="eyebrow-light hero-in">
                Georgetown, Guyana<span className="hidden sm:inline"> · Residential · Commercial · Land</span>
              </div>
              <h1 className="hero-title hero-in-2 mt-4 font-serif font-medium leading-[1.04] tracking-[-0.02em] text-white">
                Experience the difference with One Stop Realty Investment Inc.
              </h1>
              <p className="hero-in-2 mt-3 font-serif text-[clamp(22px,2.6vw,30px)] italic leading-none text-accent">You deserve it.</p>
              <p className="hero-in-3 mt-5 max-w-[540px] text-[16px] leading-[1.6] text-white/[0.85] sm:text-[17px]">
                A one-stop real estate firm for buying, selling, renting and investing across Georgetown and Demerara, led by a broker with 17
                years in mortgage financing.
              </p>
              <div className="hero-in-3 mt-7 flex flex-wrap gap-3">
                <Link href="/listings" className="btn-accent px-7">
                  View listings
                </Link>
                <Link href="/contact" className="btn-outline-light h-[52px] rounded-[10px] px-6 text-[15px]">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search panel overlapping the hero edge */}
        <div className="container-1200 relative z-10 -mt-[110px] sm:-mt-[96px] nav:-mt-[84px]">
          <HeroSearch />
          <div className="rail mt-3 flex items-center gap-2 overflow-x-auto text-[13px] font-semibold text-meta">
            <span className="flex-none">Areas:</span>
            {REGIONS.map((r) => (
              <Link key={r} href={`/listings?region=${encodeURIComponent(r)}`} className="chip flex-none">
                {r}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="container-1200 reveal pt-[72px]">
        <div className="section-head">
          <div>
            <div className="eyebrow">New listings</div>
            <h2 className="h2 mt-3">Properties for sale and rent</h2>
          </div>
          <Link href="/listings" className="btn-outline btn-44">
            View all listings →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[22px]">
          {featured.map((item, i) => (
            <ListingCard key={item.id} item={item} priority={i < 3} />
          ))}
        </div>
      </section>

      {/* SERVICES: BUY / RENT / SELL */}
      <section className="container-1200 reveal pt-24">
        <div className="max-w-[640px]">
          <div className="eyebrow">Our services</div>
          <h2 className="h2 mt-3">Buy, rent or sell a home with one team</h2>
          <p className="lede mt-3.5">
            Whatever stage you are at, the same people guide you from the first viewing to the signed agreement.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="zoom-parent group flex flex-col overflow-hidden rounded-[16px] border border-border bg-white text-ink no-underline transition-shadow hover:shadow-card"
            >
              <Photo label={p.alt} src={p.photo} zoom labelPosition="none" className="aspect-[16/10]" sizes="(max-width: 700px) 100vw, 400px" />
              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <div className="eyebrow">{p.eyebrow}</div>
                <h3 className="h3 m-0">{p.title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-slate-2">{p.body}</p>
                <span className="arrow-link mt-auto pt-2">
                  {p.cta} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-[14.5px] text-slate-2">
          Also: property management, real estate investment, consultancy, architectural and interior design services.{" "}
          <Link href="/services" className="text-link">
            All services
          </Link>
        </div>
      </section>

      {/* WHY ONE STOP */}
      <section className="reveal mt-24 bg-ivory">
        <div className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-12 py-[80px]">
          <div>
            <div className="eyebrow">Why One Stop Realty</div>
            <h2 className="h2 mt-3">Everything you need for a property decision, under one roof</h2>
            <p className="lede mt-4">
              {SITE.name} was incorporated in 2021 by founder and lead broker Steven Persaud after 17 years in banking, where he helped
              hundreds of people finance their homes. The company slogan, &ldquo;You Deserve It,&rdquo; reflects a commitment to making sure
              every client gets the home they deserve.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                About the company
              </Link>
              <Link href="/team" className="btn-outline">
                Meet the team
              </Link>
            </div>
          </div>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4 p-0">
            {WHY.map((w, i) => (
              <li key={w.title} className="flex flex-col gap-2 rounded-[14px] border border-ivory-border bg-white p-6">
                <span className="font-serif text-[13px] font-medium tracking-[0.14em] text-accent-deep">0{i + 1}</span>
                <h3 className="m-0 text-[17px] font-bold text-navy">{w.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.6] text-slate-2">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-1200 reveal pt-24">
        <div className="section-head">
          <div>
            <div className="eyebrow">Browse by category</div>
            <h2 className="h2 mt-3">Residential, commercial and land</h2>
          </div>
          <Link href="/listings" className="text-link">
            All properties
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const p = CATEGORY_PHOTOS[c.slug];
            return (
              <Link
                key={c.slug}
                href={`/listings?category=${c.slug}`}
                className="zoom-parent group relative block aspect-[4/3] overflow-hidden rounded-[14px] bg-navy text-white no-underline sm:aspect-[16/10]"
              >
                <Photo label={p.label} src={p.src} zoom tone="navy" labelPosition="none" className="absolute inset-0" sizes="(max-width: 640px) 50vw, 400px" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-soft">{c.purpose === "rent" ? "For rent" : "For sale"}</div>
                  <div className="mt-1 font-serif text-[18px] font-medium leading-[1.15] sm:text-[22px]">{c.label}</div>
                  <div className="mt-1 hidden text-[13px] text-white/75 sm:block">{c.blurb}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container-1200 reveal pb-[96px] pt-24">
        <div className="surface-navy rounded-[20px]" style={{ padding: "clamp(32px, 5vw, 64px)" }}>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-8">
            <div>
              <div className="eyebrow-light">Let&rsquo;s talk property</div>
              <h2 className="mt-3 font-serif font-medium leading-[1.1] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
                Looking to buy, sell or rent? Start with a conversation.
              </h2>
              <p className="mt-4 max-w-[520px] text-[16px] leading-[1.6] text-white/80">
                Tell us what you need and we will come back with options, honest advice and next steps. Call, email or send a message and we
                will be in touch.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:max-w-[360px] sm:justify-self-end">
              <Link href="/listings" className="btn-accent h-[54px] w-full">
                Find a property
              </Link>
              <Link href="/sell" className="btn-outline-light h-[54px] w-full rounded-[10px] text-[15px]">
                Sell or let my property
              </Link>
              <a href={PRIMARY_PHONE.href} className="inline-flex min-h-11 items-center justify-center text-[15px] font-bold text-white no-underline hover:text-accent-soft">
                Call {PRIMARY_PHONE.label}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
