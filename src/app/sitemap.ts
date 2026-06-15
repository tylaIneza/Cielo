import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cielofashion.rw";

  const staticPages = [
    "",
    "/shop",
    "/women",
    "/men",
    "/kids",
    "/african",
    "/fabrics",
    "/lookbook",
    "/tailoring",
    "/showroom",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/size-guide",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return staticPages;
}
