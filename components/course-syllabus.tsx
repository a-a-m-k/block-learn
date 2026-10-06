"use client";

import Link from "next/link";
import { CheckIcon, ClockIcon } from "lucide-react";

import { useProgress } from "@/components/progress-provider";
import {
  chapters,
  getResumeChapterSlug,
  totalChapters,
} from "@/lib/course";
import { chapterPath } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CourseSyllabus() {
  const { completedSlugs, completedChapterCount, hydrated, isComplete } =
    useProgress();
  const resumeSlug = getResumeChapterSlug(completedSlugs);
  const courseFinished = hydrated && completedChapterCount >= totalChapters;

  return (
    <nav aria-label="Course chapters" className="w-full text-left">
      <h2 className="sr-only">Chapters</h2>
      <ol className="flex flex-col gap-2 lg:grid lg:grid-cols-5 lg:items-stretch lg:gap-3">
        {chapters.map((chapter) => {
          const completed = hydrated && isComplete(chapter.slug);
          const upNext =
            hydrated && !courseFinished && chapter.slug === resumeSlug;
          const Icon = chapter.icon;

          return (
            <li key={chapter.slug} className="min-w-0">
              <Link
                href={chapterPath(chapter.slug)}
                aria-current={upNext ? "step" : undefined}
                className={cn(
                  "flex h-full items-start gap-3 rounded-xl border px-3 py-3 outline-none transition-colors hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-4",
                  "lg:flex-col lg:p-4",
                  upNext ? "border-brand bg-brand/10" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "flex size-control shrink-0 items-center justify-center rounded-lg",
                    upNext
                      ? "bg-brand text-brand-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {completed ? (
                    <CheckIcon className="size-icon text-success" aria-hidden />
                  ) : (
                    <Icon className="size-icon" aria-hidden />
                  )}
                  {completed ? <span className="sr-only">Completed</span> : null}
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-body font-medium text-foreground">
                      <span className="tabular-nums text-muted-foreground">
                        {chapter.number}.{" "}
                      </span>
                      {chapter.title}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-chrome-meta whitespace-nowrap text-muted-foreground lg:hidden">
                      <ClockIcon className="size-icon-sm" aria-hidden />
                      {chapter.readMinutes} min
                    </span>
                  </span>
                  {upNext ? (
                    <span className="text-chrome-meta font-medium text-brand-text">
                      Up next
                    </span>
                  ) : null}
                  <span className="text-chrome text-pretty text-muted-foreground">
                    {chapter.description}
                  </span>
                  <span className="mt-auto hidden items-center gap-1 pt-3 text-chrome-meta text-muted-foreground lg:inline-flex">
                    <ClockIcon className="size-icon-sm" aria-hidden />
                    {chapter.readMinutes} min
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
