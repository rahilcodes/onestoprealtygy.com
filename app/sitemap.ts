import type { MetadataRoute } from "next";
import { getListingIds } from "@/lib/data";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids = await getListingIds();
  const now = new Date();
  const pages = ["", "/listings", "/buy", "/rent", "/sell", "/services", "/about", "/team", "/blog", "/mortgage-calculator", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...ids.map((id) => ({ url: `${SITE.url}/listings/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
