import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://audovtc.fr";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/reservation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cgv`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
