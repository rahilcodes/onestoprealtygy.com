import Link from "next/link";
import type { Listing } from "@/types/listing";
import { Photo } from "@/components/Photo";
import { SaveHeart } from "@/components/SaveHeart";
import { num } from "@/lib/format";

interface Props {
  item: Listing;
  priority?: boolean;
}

function Spec({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <strong className="text-[14px] font-extrabold text-navy">{value}</strong>
      <span className="text-[12.5px] font-medium text-meta">{label}</span>
    </span>
  );
}

/**
 * Shared property card. The whole card is the link (pseudo-element on the
 * title) with the save heart layered above it.
 */
export function ListingCard({ item, priority }: Props) {
  const href = `/listings/${item.id}`;
  const isLand = item.category === "land";
  return (
    <article className="card-hover zoom-parent relative flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-white">
      <Photo
        label={item.photo}
        src={item.photoSrc}
        className="aspect-[4/3]"
        priority={priority}
        zoom
        labelPosition="icon"
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
      >
        <div className="absolute left-3 right-14 top-3 flex flex-wrap gap-1.5">
          <span className={`badge badge-${item.badgeKind} shadow-badge`}>{item.badge}</span>
          <span className="badge bg-white/[0.92] text-navy shadow-badge">{item.type}</span>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-deep/60 to-transparent" />
        <div className="absolute bottom-3 left-3.5 text-[20px] font-extrabold tracking-[-0.01em] text-white drop-shadow">{item.priceFmt}</div>
      </Photo>
      <SaveHeart id={item.id} title={item.title} className="absolute right-2 top-2 z-10" />
      <div className="flex flex-1 flex-col gap-2 px-[18px] pb-[18px] pt-4">
        <h3 className="m-0 font-serif text-[19px] font-medium leading-[1.25] text-navy">
          <Link href={href} className="text-navy no-underline after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        </h3>
        <div className="flex items-center gap-1.5 text-[13.5px] text-slate-2">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none text-accent" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.4" />
          </svg>
          {item.locationFmt}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-hairline pt-3">
          {isLand ? (
            <>
              {item.lotArea && <Spec value={num(item.lotArea)} label="sq ft lot" />}
              <Spec value={item.type} label="" />
            </>
          ) : (
            <>
              {item.beds ? <Spec value={String(item.beds)} label={item.beds === 1 ? "bed" : "beds"} /> : null}
              {item.baths ? <Spec value={String(item.baths)} label={item.baths === 1 ? "bath" : "baths"} /> : null}
              {item.floorArea ? <Spec value={num(item.floorArea)} label="sq ft" /> : null}
              {item.furnished && item.purpose === "rent" ? <Spec value={item.furnished} label="" /> : null}
            </>
          )}
          <span className="ml-auto text-[12px] font-bold text-navy">View →</span>
        </div>
      </div>
    </article>
  );
}
