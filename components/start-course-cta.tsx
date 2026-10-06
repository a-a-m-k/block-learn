"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { useProgress } from "@/components/progress-provider";
import { buttonVariants } from "@/components/ui/button-variants";
import { getResumeChapterSlug, totalChapters } from "@/lib/course";
import { chapterPath } from "@/lib/site";

function getCtaLabel(completedChapterCount: number) {
  if (completedChapterCount === 0) return "Let's get started";
  if (completedChapterCount >= totalChapters) return "Review course";
  return "Continue learning";
}

export function StartCourseCta() {
  const { completedSlugs, completedChapterCount, hydrated } = useProgress();
  const href = chapterPath(getResumeChapterSlug(completedSlugs));
  const label = hydrated
    ? getCtaLabel(completedChapterCount)
    : "Let's get started";

  return (
    <Link
      href={href}
      className={buttonVariants({ variant: "cta", size: "cta" })}
    >
      {label}
      <ArrowRightIcon
        data-icon="inline-end"
        className="size-icon"
        aria-hidden
      />
    </Link>
  );
}
