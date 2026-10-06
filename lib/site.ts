import type { Route } from "next";

import type { ChapterSlug } from "@/lib/course";

const fallbackUrl = "http://localhost:3000";

export const siteConfig = {
  name: "BlockLearn",
  title: "BlockLearn — Blockchain Basics",
  description:
    "Change the diagrams in a short course on shared ledgers, hashes, consensus, transactions, and smart contracts.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, ""),
  locale: "en_US",
} as const;

export const portfolioNote =
  "The diagrams are the product: you change them, the rules are tested functions, and each correct quiz answer moves progress in the browser.";

export const siteCredit = {
  handle: "a-a-m-k",
  profileUrl: "https://github.com/a-a-m-k",
  repoUrl: "https://github.com/a-a-m-k/block-learn",
} as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

export function chapterPath<T extends ChapterSlug>(slug: T) {
  return `/chapters/${slug}` as Route<`/chapters/${T}`>;
}

export const siteOgImage = {
  url: "/images/og.jpg",
  width: 1280,
  height: 720,
  alt: "BlockLearn — Blockchain Basics",
} as const;
