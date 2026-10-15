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
    <nav
      aria-label="Course chapters"
      className="flex w-full flex-col gap-4 text-left"
    >
      <h2 className="text-title font-semibold text-foreground">
        Learning path
      </h2>
      <ol className="flex flex-col gap-2 lg:grid lg:grid-cols-6 lg:items-stretch lg:gap-3 xl:grid-cols-5">
        {chapters.map((chapter) => {
          const completed = hydrated && isComplete(chapter.slug);
          const upNext =
            hydrated && !courseFinished && chapter.slug === resumeSlug;
          const Icon = chapter.icon;

          return (
            <li
              key={chapter.slug}
              className={cn(
                "min-w-0 lg:col-span-2 xl:col-span-1",
                chapter.number === 4 && "lg:col-start-2 xl:col-start-auto",
              )}
            >
              <Link
                href={chapterPath(chapter.slug)}
                aria-current={upNext ? "step" : undefined}
                className={cn(
                  "flex h-full items-start gap-3 rounded-xl border px-3 py-3 outline-none transition-colors hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-4",
                  "lg:min-h-56 lg:flex-col lg:p-4 xl:min-h-60",
                  upNext ? "border-brand bg-brand/5" : "border-border",
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
                    <span className="text-chrome-meta font-medium text-brand-text lg:hidden">
                      Up next
                    </span>
                  ) : null}
                  <span className="text-chrome text-pretty text-muted-foreground lg:line-clamp-3">
                    {chapter.description}
                  </span>
                  <span className="mt-auto hidden w-full items-center justify-between gap-2 pt-3 text-chrome-meta lg:flex">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <ClockIcon className="size-icon-sm" aria-hidden />
                      {chapter.readMinutes} min
                    </span>
                    {upNext ? (
                      <span className="font-medium text-brand-text">
                        Up next
                      </span>
                    ) : null}
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
