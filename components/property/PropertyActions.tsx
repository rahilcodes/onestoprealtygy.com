"use client";

import { useEffect, useState } from "react";
import { useSavedListing } from "@/lib/saved";
import { SITE } from "@/lib/site";

interface Props {
  id: string;
  title: string;
  price: string;
}

/** Save (persisted) and Share (Web Share API → clipboard fallback). */
export function PropertyActions({ id, title, price }: Props) {
  const [saved, toggleSaved] = useSavedListing(id);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");

  useEffect(() => {
    if (shareState === "idle") return;
    const t = setTimeout(() => setShareState("idle"), 2400);
    return () => clearTimeout(t);
  }, [shareState]);

  async function share() {
    const url = window.location.href;
    const data = { title: `${title} · ${price}`, text: `${title} · ${price} · ${SITE.name}`, url };
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        await navigator.share(data);
        setShareState("shared");
        return;
      }
    } catch {
      /* user cancelled */
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={toggleSaved} aria-pressed={saved} className="btn-outline btn-44 px-4">
        <span aria-hidden="true" className={saved ? "text-accent" : ""}>
          {saved ? "♥" : "♡"}
        </span>
        <span className="ml-1.5">{saved ? "Saved" : "Save"}</span>
      </button>
      <button type="button" onClick={share} className="btn-outline btn-44 px-4">
        {shareState === "copied" ? "Link copied" : shareState === "shared" ? "Shared" : "Share"}
      </button>
      <span role="status" className="sr-only">
        {shareState === "copied" ? "Listing link copied to clipboard." : saved ? "Listing saved." : ""}
      </span>
    </div>
  );
}
