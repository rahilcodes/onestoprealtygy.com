import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListing, getListingIds, getSimilarListings } from "@/lib/data";
import { formatDate, todayISO } from "@/lib/format";
import { SITE } from "@/lib/site";
import { Photo } from "@/components/Photo";
import { ListingCard } from "@/components/ListingCard";
import { PropertyActions } from "@/components/property/PropertyActions";
import { InquiryCard } from "@/components/property/InquiryCard";

export async function generateStaticParams() {
  const ids = await getListingIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/listings/[id]">): Promise<Metadata> {
  const { id } = await params;
  const l = await getListing(id);
  if (!l) return { title: "Property not found" };
  return {
    title: `${l.title} · ${l.priceFmt}`,
    description: `${l.type} ${l.purpose === "rent" ? "for rent" : "for sale"} in ${l.locationFmt}. ${l.specs ? l.specs + ". " : ""}${l.summary}`,
    alternates: { canonical: `/listings/${l.id}` },
    openGraph: l.photoSrc ? { images: [{ url: l.photoSrc, alt: l.photo }] } : undefined,
  };
}

export default async function PropertyPage({ params }: PageProps<"/listings/[id]">) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();
  const similar = await getSimilarListings(listing.id);
  const today = todayISO();
  const isClosed = listing.status === "Sold" || listing.status === "Rented";
  const statusColor = isClosed ? "text-meta" : listing.status === "Under Offer" ? "text-slate" : "text-success";
  const [mainPhoto, ...thumbs] = listing.photos;
  const single = thumbs.length === 0;
  const purposeLabel = listing.purpose === "rent" ? "For rent" : "For sale";
  const categoryHref = `/listings?purpose=${listing.purpose}&category=${listing.category === "land" ? "land" : listing.category + (listing.purpose === "rent" ? "-rent" : "")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    url: `${SITE.url}/listings/${listing.id}`,
    description: listing.summary,
    datePosted: listing.listedAt,
    image: listing.photoSrc ? `${SITE.url}${listing.photoSrc}` : undefined,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: listing.currency,
      availability: isClosed ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      businessFunction: listing.purpose === "rent" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
    },
    address: { "@type": "PostalAddress", addressLocality: listing.area, addressRegion: listing.region, addressCountry: "GY" },
  };

  return (
    <>
      <div className="container-1200 pt-[18px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[13px] font-medium text-meta">
          <Link href="/listings" className="inline-flex min-h-11 items-center text-meta no-underline hover:text-navy">
            Listings
          </Link>
          <span aria-hidden="true" className="inline-flex min-h-11 items-center">
            /
          </span>
          <Link href={categoryHref} className="inline-flex min-h-11 items-center text-meta no-underline hover:text-navy">
            {purposeLabel}
          </Link>
          <span aria-hidden="true" className="inline-flex min-h-11 items-center">
            /
          </span>
          <Link href={`/listings?region=${encodeURIComponent(listing.region)}`} className="inline-flex min-h-11 items-center text-meta no-underline hover:text-navy">
            {listing.region}
          </Link>
          <span aria-hidden="true" className="inline-flex min-h-11 items-center">
            /
          </span>
          <span className="inline-flex min-h-11 items-center text-navy" aria-current="page">
            {listing.title}
          </span>
        </nav>

        {/* GALLERY */}
        <div className={`mt-3 overflow-hidden rounded-2xl ${single ? "" : "grid grid-cols-2 gap-2 sm:grid-cols-4 sm:auto-rows-[minmax(120px,auto)]"}`}>
          <Photo
            label={mainPhoto.label}
            src={mainPhoto.src}
            className={single ? "aspect-[4/3] sm:aspect-[16/9] nav:aspect-[2/1]" : "col-span-2 row-span-2 aspect-[4/3]"}
            priority
            labelPosition="icon"
            sizes={single ? "(max-width: 1200px) 100vw, 1200px" : "(max-width: 640px) 100vw, 600px"}
          >
            <div className="absolute left-3.5 top-3.5 flex gap-1.5">
              <span className={`badge badge-${listing.badgeKind} shadow-badge`}>{listing.badge}</span>
              <span className="badge bg-white/[0.92] text-navy shadow-badge">{listing.type}</span>
            </div>
            {single && (
              <a href="#inquiry" className="btn absolute bottom-3 right-3 h-11 rounded-lg bg-white px-3.5 text-[13px] font-bold text-navy shadow-btn hover:bg-cloud">
                Request more photos
              </a>
            )}
          </Photo>
          {thumbs.map((t, i) => (
            <Photo key={t.label + i} label={t.label} src={t.src} tone={i % 2 ? "warm" : "cool"} labelPosition="icon" className="aspect-[4/3] sm:aspect-auto" sizes="(max-width: 640px) 50vw, 300px">
              {i === thumbs.length - 1 && (
                <a href="#inquiry" className="btn absolute bottom-2.5 right-2.5 h-11 rounded-lg bg-white px-3.5 text-[13px] font-bold text-navy shadow-btn hover:bg-cloud">
                  Request more photos
                </a>
              )}
            </Photo>
          ))}
        </div>
      </div>

      {/* MAIN + SIDEBAR: single column below 1000px (header → inquiry card → sections). */}
      <div className="container-1200 grid grid-cols-1 items-start gap-x-10 gap-y-10 pb-[72px] pt-7 nav:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <header className="flex flex-col gap-3.5 nav:col-start-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] ${statusColor}`}>
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />
                  {listing.status}
                </span>
                <span className="text-[12.5px] font-semibold text-meta">
                  {purposeLabel} · Ref {listing.ref} · Listed {formatDate(listing.listedAt)}
                </span>
              </div>
              <h1 className="mt-2 font-serif font-medium leading-[1.1] tracking-[-0.02em] text-navy" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>
                {listing.title}
              </h1>
              <div className="mt-2 flex items-center gap-1.5 text-[16px] font-medium text-slate">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 flex-none text-accent" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.4" />
                </svg>
                {listing.locationFmt}
              </div>
              <div className="mt-3 text-[30px] font-extrabold tracking-[-0.02em] text-navy sm:text-[34px]">{listing.priceFmt}</div>
              {listing.specs && (
                <dl className="mt-2.5 flex flex-wrap gap-x-[18px] gap-y-1 text-[15px] font-semibold">
                  {listing.specs.split(" · ").map((s) => (
                    <div key={s} className="flex gap-1">
                      <dd className="m-0 font-extrabold text-navy">{s}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <PropertyActions id={listing.id} title={listing.title} price={listing.priceFmt} />
          </div>
        </header>

        <aside id="inquiry" className="flex scroll-mt-24 flex-col gap-4 nav:sticky nav:top-24 nav:col-start-2 nav:row-span-2 nav:row-start-1" aria-label="Contact us about this property">
          <InquiryCard listing={listing} today={today} />
          {listing.purpose === "sale" && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border px-5 py-4">
              <div>
                <div className="text-[14px] font-bold text-navy">Planning to finance?</div>
                <div className="text-[13px] font-medium text-meta">Estimate a monthly mortgage payment.</div>
              </div>
              <Link href={`/mortgage-calculator?price=${listing.price}`} className="btn-outline btn-44 whitespace-nowrap px-3.5 text-[13px]">
                Calculator
              </Link>
            </div>
          )}
        </aside>

        <div className="flex min-w-0 flex-col gap-10 nav:col-start-1">
          <section aria-labelledby="about">
            <h2 id="about" className="mb-3.5 font-serif text-[26px] font-medium leading-[1.2] text-navy">
              About this property
            </h2>
            <p className="m-0 text-[16px] leading-[1.75] text-slate text-pretty">{listing.description}</p>
          </section>

          {listing.features.length > 0 && (
            <section aria-labelledby="features">
              <h2 id="features" className="mb-4 font-serif text-[26px] font-medium leading-[1.2] text-navy">
                Features
              </h2>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-x-6 gap-y-2.5 p-0">
                {listing.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] font-medium text-slate">
                    <span aria-hidden="true" className="mt-[7px] h-2 w-2 flex-none rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="facts">
            <h2 id="facts" className="mb-4 font-serif text-[26px] font-medium leading-[1.2] text-navy">
              Property details
            </h2>
            <dl className="m-0 grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-x-8 gap-y-0">
              {listing.facts.map((f) => (
                <div key={f.k} className="flex justify-between gap-3 border-b border-hairline py-3 text-[14.5px] font-medium">
                  <dt className="text-meta">{f.k}</dt>
                  <dd className="m-0 text-right font-semibold text-navy">{f.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="location" className="rounded-2xl border border-line bg-cloud p-6 sm:p-7">
            <h2 id="location" className="m-0 font-serif text-[24px] font-medium leading-[1.2] text-navy">
              Location
            </h2>
            <p className="mb-0 mt-2 text-[15px] leading-[1.65] text-slate">
              {listing.area}, {listing.region}. Exact addresses are shared once a viewing is arranged. Our office is at {SITE.address.street},{" "}
              {SITE.address.area}, {SITE.address.city}, and we accompany every viewing.
            </p>
            <Link href={`/listings?region=${encodeURIComponent(listing.region)}`} className="text-link mt-2">
              More properties in {listing.region}
            </Link>
          </section>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="bg-ivory">
          <div className="container-1200 py-16">
            <div className="section-head mb-6">
              <h2 className="h2-sm m-0">Similar properties</h2>
              <Link href={categoryHref} className="text-link">
                See all {purposeLabel.toLowerCase()}
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-5">
              {similar.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
