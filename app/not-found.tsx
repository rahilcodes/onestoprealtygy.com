import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-1200 py-24 text-center">
      <div className="eyebrow justify-center">Page not found</div>
      <h1 className="h2 mt-3">We couldn&apos;t find that page.</h1>
      <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-[1.6] text-slate-2">
        The link may be out of date. Try the listings, or get in touch and we will point you in the right direction.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/listings" className="btn-primary">
          View listings
        </Link>
        <Link href="/contact" className="btn-outline">
          Contact us
        </Link>
      </div>
    </div>
  );
}
