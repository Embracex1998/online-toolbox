import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-domain.com";
  const tools = [
    "json", "base64", "timestamp", "qrcode", "color", "url",
    "text-counter", "password", "regex", "hash", "text-diff",
    "markdown", "uuid", "number-base", "image-compress", "jwt",
  ];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
