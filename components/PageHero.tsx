import Image from "next/image";
import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Background photograph; omitted renders a navy surface. */
  image?: { src: string; alt?: string; position?: string };
  children?: ReactNode;
  /** Compact variant for utility pages. */
  compact?: boolean;
}

/** Full-bleed page header shared by internal pages: photo (or navy) with title, lede and CTAs. */
export function PageHero({ eyebrow, title, lede, image, children, compact }: Props) {
  return (
    <section className="surface-navy">
      {image && (
        <>
          <Image src={image.src} alt={image.alt ?? ""} fill priority sizes="100vw" className="hero-img object-cover" style={{ objectPosition: image.position ?? "center" }} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-deep/[0.92] via-navy-deep/70 to-navy-deep/30" />
        </>
      )}
      <div className={`container-1200 relative ${compact ? "py-14 sm:py-16" : "py-16 sm:py-20 nav:py-24"}`}>
        <div className="max-w-[720px]">
          <div className="eyebrow-light hero-in">{eyebrow}</div>
          <h1 className="hero-in-2 mt-4 font-serif font-medium leading-[1.06] tracking-[-0.02em] text-white" style={{ fontSize: compact ? "clamp(32px, 4vw, 48px)" : "clamp(34px, 4.8vw, 58px)" }}>
            {title}
          </h1>
          {lede && <p className="hero-in-3 mt-5 max-w-[580px] text-[16px] leading-[1.65] text-white/[0.85] sm:text-[17px]">{lede}</p>}
          {children && <div className="hero-in-3 mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
