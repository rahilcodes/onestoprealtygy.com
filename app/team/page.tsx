import type { Metadata } from "next";
import Link from "next/link";
import { getTeam } from "@/lib/data";
import { PRIMARY_PHONE, SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Our team",
  description:
    "Meet the One Stop Realty Investment Inc. team: founder and broker Steven Persaud, office manager Monalisa Sammy-Persaud and business development manager Suraj Singh.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Professional and experienced people, focused on your goals."
        lede="With experience in real estate, banking and mortgage financing, our team is equipped to handle every real estate matter, from a first apartment to a commercial investment."
        compact
      />

      <section className="container-1200 pt-[72px]">
        <div className="flex flex-col gap-16">
          {team.map((m, i) => (
            <article
              key={m.slug}
              id={m.slug}
              className={`reveal grid scroll-mt-24 grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-10 ${i % 2 ? "nav:[&>*:first-child]:order-last" : ""}`}
            >
              <div className="relative max-w-[440px]">
                <div aria-hidden="true" className="absolute -bottom-3 -right-3 left-3 top-3 rounded-[16px] border-[1.5px] border-accent/50" />
                <Photo label={`${m.name} portrait`} kind="portrait" tone="warm" src={m.photoSrc} labelPosition="icon" className="aspect-[4/3] rounded-[16px] sm:aspect-[4/5]" sizes="(max-width: 800px) 100vw, 440px" />
              </div>
              <div>
                <div className="eyebrow">{m.role}</div>
                <h2 className="h2 mt-3">{m.name}</h2>
                <div className="mt-5 flex flex-col gap-4 text-[16px] leading-[1.75] text-slate">
                  {m.bio.map((p) => (
                    <p key={p.slice(0, 40)} className="m-0 text-pretty">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-1200 reveal pb-[96px] pt-24">
        <div className="surface-navy rounded-[20px]" style={{ padding: "clamp(28px, 5vw, 64px)" }}>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-8">
            <div>
              <div className="eyebrow-light">Consultancy</div>
              <h2 className="mt-3 font-serif font-medium leading-[1.12] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(26px, 3.2vw, 38px)" }}>
                You&rsquo;re not alone.
              </h2>
              <p className="mt-4 max-w-[560px] text-[16px] leading-[1.65] text-white/80">
                Our team will ensure you receive the best advice and guidance in acquiring or selling your property. With over 10 years of
                combined experience in the real estate market, 17 years of banking and financing, and 10 years of mortgage financing, we are
                well equipped and knowledgeable in handling all real estate matters.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:max-w-[340px] sm:justify-self-end">
              <Link href="/contact" className="btn-accent h-[54px] w-full">
                Contact us
              </Link>
              <a href={PRIMARY_PHONE.href} className="btn-outline-light h-[54px] w-full rounded-[10px] text-[15px]">
                Call {PRIMARY_PHONE.label}
              </a>
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center justify-center break-all text-[14.5px] font-semibold text-white no-underline hover:text-accent-soft">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
