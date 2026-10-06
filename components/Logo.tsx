import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface LogoProps {
  onDark?: boolean;
  size?: "nav" | "footer";
  href?: string | null;
  className?: string;
}

const SIZES = {
  nav: { emblem: 44, name: "text-[15px] sm:text-[17px]", sub: "text-[9px] sm:text-[9.5px]" },
  footer: { emblem: 56, name: "text-[19px]", sub: "text-[10px]" },
};

/**
 * Company emblem (from the client's original logo) beside an HTML wordmark,
 * so the mark reads correctly on both light and navy surfaces and can be
 * swapped for a single-file logo later without touching layouts.
 */
export function Logo({ onDark, size = "nav", href = "/", className = "" }: LogoProps) {
  const s = SIZES[size];
  const inner = (
    <>
      <Image
        src="/brand/emblem.png"
        alt=""
        width={s.emblem}
        height={s.emblem}
        priority={size === "nav"}
        className={`flex-none ${onDark ? "rounded-full bg-white p-[3px]" : ""}`}
        style={{ width: s.emblem, height: s.emblem }}
      />
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-serif font-semibold tracking-[-0.01em] ${s.name} ${onDark ? "text-white" : "text-navy"}`}>
          One Stop Realty
        </span>
        <span className={`mt-[4px] font-sans font-bold uppercase leading-none tracking-[0.22em] ${s.sub} ${onDark ? "text-accent-soft" : "text-accent-deep"}`}>
          Investment Inc.
        </span>
      </span>
    </>
  );
  const cls = `flex min-h-11 flex-none items-center gap-3 no-underline ${className}`;
  if (href === null) return <div className={cls}>{inner}</div>;
  return (
    <Link href={href} aria-label={`${SITE.name} — home`} className={cls} style={{ outlineOffset: 4 }}>
      {inner}
    </Link>
  );
}
