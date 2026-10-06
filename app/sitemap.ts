import type { MetadataRoute } from "next";

import { chapters } from "@/lib/course";
import { absoluteUrl, chapterPath, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...chapters.map((chapter) => ({
      url: absoluteUrl(chapterPath(chapter.slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
