import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeam } from "@/lib/data";
import { PRIMARY_PHONE, SERVICES, SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "About One Stop Realty Investment Inc.",
  description:
    "One Stop Realty Investment Inc. is a Georgetown real estate firm founded in 2021 by Steven Persaud, dedicated to helping clients buy, sell, rent and invest in property. You Deserve It.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  ["Customer-focused approach", "Putting the needs of our clients first and providing them with the highest level of personalised service."],
  ["Expertise and knowledge", "Continuously staying informed about the real estate market and providing our clients with expert and comprehensive advice."],
  ["Integrity and honesty", "Building strong relationships with our clients based on trust and open communication, and always acting in their best interests."],
  ["Community impact", "Making a positive impact on the communities we serve by helping people achieve their goals of property ownership."],
  ["Continuous improvement", "Staying ahead of the curve in the industry and continuously improving our services to meet the evolving needs of our clients."],
  ["Teamwork and collaboration", "Working together as a team to provide our clients with the best possible experience, while supporting each other and fostering a positive work culture."],
];

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A real estate firm dedicated to helping clients buy, sell, rent and invest."
        lede="Incorporated in 2021 and based in Subryanville, Georgetown, One Stop Realty Investment Inc. brings banking-grade financial insight and a trusted network of professionals to every property decision."
        image={{ src: "/images/stock/house-exterior.jpg", alt: "", position: "center 60%" }}
      >
        <Link href="/team" className="btn-accent px-7">
          Meet the team
        </Link>
        <Link href="/contact" className="btn-outline-light h-[52px] rounded-[10px] px-6 text-[15px]">
          Contact us
        </Link>
      </PageHero>

      {/* STORY */}
      <section className="container-1200 reveal grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-12 pt-[80px]">
        <div>
          <div className="eyebrow">Our story</div>
          <h2 className="h2 mt-3">Born from 17 years of helping people finance their homes</h2>
          <p className="lede mt-5">
            The company was incorporated in 2021 after its founder and lead real estate broker, Steven Persaud, developed a love for real
            estate while working in the banking sector. He served the banking sector for 17 years, where he developed his skills in customer
            service, mortgage financing and commercial credit facilities.
          </p>
          <p className="lede mt-4">
            As a mortgage advisor he helped hundreds of people own their homes by providing financial assistance and advice. He felt people
            deserved their homes, which gave birth to the company&rsquo;s slogan: <em className="font-serif text-navy">&ldquo;You Deserve It.&rdquo;</em>
          </p>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute -bottom-4 -right-4 left-4 top-4 rounded-[18px] border-[1.5px] border-accent/60" />
          <Photo label="the One Stop Realty office team" tone="warm" labelPosition="icon" className="aspect-[4/3] rounded-[18px]" sizes="(max-width: 800px) 100vw, 560px" />
          <figure className="absolute -bottom-5 left-5 right-5 m-0 flex items-center gap-3.5 rounded-xl bg-white px-[18px] py-4 shadow-float">
            <Image src="/brand/emblem.png" alt="" width={44} height={44} className="h-11 w-11 flex-none" />
            <blockquote className="m-0 font-serif text-[15px] italic leading-[1.45] text-navy">
              &ldquo;You Deserve It.&rdquo; <cite className="text-[12.5px] font-semibold not-italic text-meta">Company slogan since 2021</cite>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* VISION */}
      <section className="container-1200 reveal pt-24">
        <div className="surface-navy rounded-[20px]" style={{ padding: "clamp(28px, 5vw, 64px)" }}>
          <div className="relative max-w-[760px]">
            <div className="eyebrow-light">Our vision</div>
            <p className="mt-4 font-serif font-medium leading-[1.25] tracking-[-0.01em] text-white" style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}>
              To be the number one reliable and customer-centric real estate company, known for its passion in helping clients achieve their
              real estate goals.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="container-1200 reveal pt-24">
        <div className="max-w-[640px]">
          <div className="eyebrow">Core values</div>
          <h2 className="h2 mt-3">What guides the way we work</h2>
        </div>
        <ul className="m-0 mt-8 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 p-0">
          {VALUES.map(([t, d], i) => (
            <li key={t} className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-7">
              <span className="font-serif text-[13px] font-medium tracking-[0.14em] text-accent-deep">0{i + 1}</span>
              <h3 className="h3 m-0 text-[22px]">{t}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-slate-2">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* WHAT WE DO */}
      <section className="reveal mt-24 bg-ivory">
        <div className="container-1200 py-[80px]">
          <div className="section-head">
            <div>
              <div className="eyebrow">What we do</div>
              <h2 className="h2 mt-3">A genuine one-stop service</h2>
            </div>
            <Link href="/services" className="text-link">
              All services
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={s.href} className="flex flex-col gap-2 rounded-[14px] border border-ivory-border bg-white p-6 text-ink no-underline transition-[border-color,box-shadow] hover:border-navy hover:shadow-card">
                <h3 className="m-0 text-[17px] font-bold text-navy">{s.title}</h3>
                <p className="m-0 text-[14px] leading-[1.55] text-slate-2">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="container-1200 reveal pb-[96px] pt-24">
        <div className="section-head">
          <div>
            <div className="eyebrow">Our team</div>
            <h2 className="h2 mt-3">Professional and experienced</h2>
          </div>
          <Link href="/team" className="btn-outline btn-44">
            Meet the team →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
          {team.map((m) => (
            <Link key={m.slug} href={`/team#${m.slug}`} className="zoom-parent overflow-hidden rounded-[14px] border border-border bg-white text-ink no-underline transition-shadow hover:shadow-card">
              <Photo label={`${m.name} portrait`} kind="portrait" tone="warm" src={m.photoSrc} zoom labelPosition="icon" className="aspect-[4/5]" sizes="(max-width: 700px) 100vw, 300px" />
              <div className="px-[18px] pb-[18px] pt-4">
                <div className="font-serif text-[20px] font-medium text-navy">{m.name}</div>
                <div className="mt-[3px] text-[13px] font-semibold text-accent-deep">{m.role}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[16px] border border-border bg-cloud px-6 py-5 text-[15px] text-slate">
          <span>
            Visit us at {SITE.address.street}, {SITE.address.area}, {SITE.address.city}.
          </span>
          <a href={PRIMARY_PHONE.href} className="font-bold text-navy no-underline hover:underline">
            {PRIMARY_PHONE.label}
          </a>
          <a href={`mailto:${SITE.email}`} className="font-bold text-navy no-underline hover:underline">
            {SITE.email}
          </a>
        </div>
      </section>
    </>
  );
}
