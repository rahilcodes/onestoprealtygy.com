import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Tone = "cool" | "warm" | "navy";

const TONES: Record<Tone, { fill: string; label: string }> = {
  cool: { fill: "#D9DEEA", label: "text-slate-2" },
  warm: { fill: "#E6E0D4", label: "text-sand-deep" },
  navy: { fill: "#1C2A85", label: "text-white/70" },
};

/** Solid, neutral placeholder image as a data URI. */
function placeholderSrc(fill: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12"><rect width="16" height="12" fill="${fill}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export interface PhotoProps {
  /** Photo description; used as alt text and as the visible placeholder label. */
  label: string;
  /** Prefix in the visible label, e.g. "photo", "portrait". */
  kind?: string;
  tone?: Tone;
  /** Real image source. Falls back to a neutral placeholder. */
  src?: string;
  className?: string;
  style?: CSSProperties;
  /** Where the placeholder caption sits; "icon" shows a faint centred house glyph instead of text. */
  labelPosition?: "bottom" | "top" | "none" | "icon";
  sizes?: string;
  priority?: boolean;
  /** Enables the hover zoom when an ancestor has `.zoom-parent`. */
  zoom?: boolean;
  children?: ReactNode;
}

/**
 * Imagery component. Renders next/image over a neutral fill and a small
 * caption with the photo description, so real photography can be dropped in
 * via `src` without changing layouts.
 */
export function Photo({
  label,
  kind = "photo",
  tone = "cool",
  src,
  className = "",
  style,
  labelPosition = "bottom",
  sizes = "(max-width: 1000px) 100vw, 50vw",
  priority,
  zoom,
  children,
}: PhotoProps) {
  const t = TONES[tone];
  const isPlaceholder = !src;
  // Callers that position the frame themselves (absolute inset-0) must not also get `relative`.
  const position = className.split(" ").includes("absolute") ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden ${className}`} style={style}>
      <Image
        src={src ?? placeholderSrc(t.fill)}
        alt={isPlaceholder ? `Placeholder image: ${label}` : label}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isPlaceholder}
        className={`object-cover ${zoom ? "zoom-img" : ""}`}
      />
      {isPlaceholder && labelPosition === "icon" && (
        <svg aria-hidden="true" viewBox="0 0 48 48" className={`pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 opacity-30 ${t.label}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M8 24L24 10l16 14" />
          <path d="M12 21v17h24V21" />
          <path d="M20 38V27h8v11" />
        </svg>
      )}
      {isPlaceholder && labelPosition !== "none" && labelPosition !== "icon" && (
        <span
          aria-hidden="true"
          className={`mono-label pointer-events-none absolute left-3 ${labelPosition === "top" ? "top-3" : "bottom-2.5"} ${t.label}`}
        >
          [ {kind}: {label} ]
        </span>
      )}
      {children}
    </div>
  );
}
