import type { Metadata } from "next";
import { getPosts, POST_CATEGORIES } from "@/lib/data";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Blog & guides",
  description: "Practical guidance on buying, renting, selling and investing in property in Guyana from One Stop Realty Investment Inc.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <section className="container-1200 pt-14 sm:pt-16">
        <BlogIndex posts={posts} categories={POST_CATEGORIES} />
      </section>

      <section className="container-1200 mt-20 pb-[96px]">
        <div className="surface-navy rounded-[20px]" style={{ padding: "clamp(28px, 4vw, 48px)" }}>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-8">
            <div>
              <div className="eyebrow-light">New listings by email</div>
              <h2 className="mt-3 font-serif font-medium leading-[1.15] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(26px, 3vw, 34px)" }}>
                Hear about new properties before they are widely advertised.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-white/80">Occasional emails with new listings and guides. Unsubscribe any time.</p>
            </div>
            <NewsletterForm source="blog-newsletter" layout="row" />
          </div>
        </div>
      </section>
    </>
  );
}
