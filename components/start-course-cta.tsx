"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { useProgress } from "@/components/progress-provider";
import { buttonVariants } from "@/components/ui/button-variants";
import { getResumeChapterSlug, totalChapters } from "@/lib/course";
import { chapterPath } from "@/lib/site";
import { cn } from "@/lib/utils";

function getCtaLabel(completedChapterCount: number) {
  if (completedChapterCount === 0) return "Continue learning";
  if (completedChapterCount >= totalChapters) return "Review course";
  return "Continue learning";
}

export function StartCourseCta({ className }: { className?: string }) {
  const { completedSlugs, completedChapterCount, hydrated } = useProgress();
  const href = chapterPath(getResumeChapterSlug(completedSlugs));
  const label = hydrated
    ? getCtaLabel(completedChapterCount)
    : "Continue learning";

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "cta", size: "cta" }),
        className,
      )}
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
