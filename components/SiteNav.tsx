"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { PRIMARY_PHONE, SITE } from "@/lib/site";

const LINKS = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Extra destinations that only appear in the mobile menu (desktop keeps six links). */
const MORE = [
  { label: "All listings", href: "/listings" },
  { label: "Our team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Mortgage calculator", href: "/mortgage-calculator" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const menuId = useId();

  // Close the mobile menu on navigation (derived-state reset during render, no effect needed).
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  // Close it when the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  // Subtle shadow once the page scrolls under the header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/[0.94] backdrop-blur-[10px] transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-line shadow-[0_8px_30px_rgba(11,18,63,0.08)]" : "border-transparent"
      }`}
    >
      <div className="container-1200 flex h-[72px] items-center justify-between gap-6">
        <Logo />

        {/* Desktop ≥ 1000px */}
        <nav aria-label="Primary" className="hidden gap-[28px] nav:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1.5 text-[14.5px] font-semibold no-underline transition-colors hover:text-navy ${
                  active ? "border-accent text-navy" : "border-transparent text-slate"
                }`}
                style={{ outlineOffset: 4 }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden flex-none items-center gap-4 nav:flex">
          <a href={PRIMARY_PHONE.href} className="text-[14px] font-bold text-navy no-underline hover:text-brand-blue">
            {PRIMARY_PHONE.label}
          </a>
          <Link href="/listings" className="btn-accent h-11 rounded-lg px-5 text-[14px]">
            View listings
          </Link>
        </div>

        {/* Mobile < 1000px */}
        <div className="flex items-center gap-1.5 nav:hidden">
          <Link href="/listings" className="btn-accent h-11 rounded-lg px-3.5 text-[13px]">
            Listings
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            className="relative z-[60] flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border-0 bg-transparent p-0"
          >
            <span className={`block h-0.5 w-5 bg-navy transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-navy transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-navy transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile panel: full-screen below the header. */}
      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 flex h-[calc(100svh-72px)] flex-col overflow-y-auto border-t border-line bg-white px-4 pb-8 pt-2 sm:px-6 nav:!hidden"
      >
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`focus-inset flex min-h-[54px] items-center justify-between border-b border-hairline font-serif text-[22px] font-medium no-underline ${
                active ? "text-navy" : "text-ink"
              }`}
            >
              {l.label}
              <span aria-hidden="true" className={`text-[18px] ${active ? "text-accent" : "text-muted"}`}>
                →
              </span>
            </Link>
          );
        })}
        <div className="mt-5 grid grid-cols-2 gap-x-4">
          {MORE.map((l) => (
            <Link key={l.href} href={l.href} className="focus-inset flex min-h-11 items-center text-[14.5px] font-semibold text-slate no-underline">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2.5">
          <Link href="/listings" className="btn-accent h-[52px]">
            View listings
          </Link>
          <Link href="/contact" className="btn-outline h-[52px] rounded-[10px] text-[15px]">
            Contact us
          </Link>
          <div className="mt-2 flex flex-wrap justify-center gap-x-5 text-[14.5px] font-semibold">
            {SITE.phones.map((p) => (
              <a key={p.href} href={p.href} className="list-link text-navy">
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
