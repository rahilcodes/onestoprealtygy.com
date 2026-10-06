import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CATEGORIES, SERVICES, SITE } from "@/lib/site";

const NAVIGATE = [
  ["Home", "/"],
  ["About us", "/about"],
  ["Our team", "/team"],
  ["Services", "/services"],
  ["All listings", "/listings"],
  ["Blog", "/blog"],
  ["Mortgage calculator", "/mortgage-calculator"],
  ["Contact", "/contact"],
] as const;

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" />
    </svg>
  );
}

export function SiteFooter({ addressLine }: { addressLine: string }) {
  return (
    <footer className="surface-navy">
      <div className="container-1200 relative pb-7 pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-10 gap-y-12 nav:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-5 sm:max-nav:col-span-2">
            <Logo onDark size="footer" href={null} />
            <p className="m-0 max-w-[340px] text-[14.5px] leading-[1.7] text-white/[0.78]">
              A Georgetown real estate firm helping clients buy, sell, rent and invest in residential and commercial property across Demerara.{" "}
              <span className="font-serif italic text-accent-soft">{SITE.tagline}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {SITE.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${SITE.shortName} on ${s.label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent hover:text-accent"
                >
                  <FacebookIcon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent-soft">Navigate</div>
            <ul className="m-0 flex list-none flex-col p-0 text-[14.5px] font-medium">
              {NAVIGATE.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="list-link text-white/[0.85] hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent-soft">Services</div>
            <ul className="m-0 flex list-none flex-col p-0 text-[14.5px] font-medium">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="list-link text-white/[0.85] hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent-soft">Properties</div>
            <ul className="m-0 flex list-none flex-col p-0 text-[14.5px] font-medium">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/listings?category=${c.slug}`} className="list-link text-white/[0.85] hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-accent-soft">Ways to reach us</div>
            <address className="text-[14.5px] font-normal not-italic leading-[1.7] text-white/[0.85]">
              <a href={SITE.address.mapsUrl} target="_blank" rel="noreferrer" className="text-white/[0.85] no-underline hover:text-white">
                {addressLine}
                <br />
                {SITE.address.country}
              </a>
            </address>
            <div className="mt-3 flex flex-col text-[15px] font-semibold">
              {SITE.phones.map((p) => (
                <a key={p.href} href={p.href} className="list-link text-white hover:text-accent-soft">
                  {p.label}
                </a>
              ))}
              <a href={`mailto:${SITE.email}`} className="list-link break-all text-white hover:text-accent-soft">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/[0.14] pt-6 text-[12.5px] font-medium text-white/60">
          <span>
            © {new Date().getFullYear()} {SITE.name} All rights reserved.
          </span>
          <span>
            Designed and developed by{" "}
            <a href="https://creativals.com" target="_blank" rel="noreferrer" className="text-white/75 no-underline hover:text-white hover:underline">
              creativals.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
