"use client";

import { useSavedListing } from "@/lib/saved";

interface Props {
  id: string;
  title: string;
  className?: string;
}

/** Heart toggle on listing cards. 44px tap target, aria-pressed reflects state. */
export function SaveHeart({ id, title, className = "" }: Props) {
  const [saved, toggle] = useSavedListing(id);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved properties` : `Save ${title}`}
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.94] shadow-badge transition-colors ${
          saved ? "text-accent" : "text-navy"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0112 7.6a4.3 4.3 0 017.5 2.9c0 5.4-7.5 10-7.5 10z" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
