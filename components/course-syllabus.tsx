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
      id="learning-path"
      aria-label="Course chapters"
      className="flex w-full scroll-mt-6 flex-col gap-4 text-left"
    >
      <h2 className="sr-only">Learning path</h2>
      <ol className="grid snap-x snap-mandatory grid-flow-col auto-cols-56 gap-3 overflow-x-auto py-1 pb-4 xl:grid-flow-row xl:auto-cols-auto xl:grid-cols-5">
        {chapters.map((chapter) => {
          const completed = hydrated && isComplete(chapter.slug);
          const upNext =
            hydrated && !courseFinished && chapter.slug === resumeSlug;
          const Icon = chapter.icon;

          return (
            <li key={chapter.slug} className="min-w-0 snap-start">
              <Link
                href={chapterPath(chapter.slug)}
                aria-current={upNext ? "step" : undefined}
                className={cn(
                  "group relative flex min-h-72 flex-col overflow-hidden rounded-2xl border bg-card/20 shadow-sm outline-none transition-all hover:-translate-y-1 hover:border-brand/60 hover:bg-card/50 hover:shadow-xl hover:shadow-brand/10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transform-none",
                  upNext ? "border-brand bg-brand/10" : "border-border",
                )}
              >
                <span className="relative flex h-24 w-full shrink-0 items-center overflow-hidden border-b bg-brand/5 px-4">
                  <span
                    className="pointer-events-none absolute inset-y-0 left-1/4 w-px bg-border"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-border"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute inset-y-0 left-3/4 w-px bg-border"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-border"
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "relative z-10 flex size-control-lg shrink-0 items-center justify-center rounded-lg border shadow-lg",
                      upNext
                        ? "border-brand bg-brand text-brand-foreground shadow-brand/20"
                        : "border-brand/40 bg-background/80 text-brand-text",
                    )}
                  >
                    {completed ? (
                      <CheckIcon className="size-icon text-success" aria-hidden />
                    ) : (
                      <Icon className="size-icon" aria-hidden />
                    )}
                    {completed ? (
                      <span className="sr-only">Completed</span>
                    ) : null}
                  </span>
                  <span
                    className="h-px flex-1 bg-gradient-to-r from-brand/70 to-brand/10"
                    aria-hidden
                  />
                  <span
                    className="size-2 shrink-0 rounded-full bg-brand shadow-md shadow-brand/40"
                    aria-hidden
                  />
                </span>

                <span
                  className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-brand/50"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-3 left-3 size-3 border-b border-l border-brand/30"
                  aria-hidden
                />

                <span className="flex min-w-0 flex-1 flex-col gap-2 p-4">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-body font-medium text-foreground">
                      <span className="tabular-nums text-muted-foreground">
                        {chapter.number}.{" "}
                      </span>
                      {chapter.title}
                    </span>
                  </span>
                  {upNext ? (
                    <span className="text-chrome-meta font-medium text-brand-text">
                      Up next
                    </span>
                  ) : null}
                  <span className="line-clamp-3 text-chrome text-pretty text-muted-foreground">
                    {chapter.description}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-chrome-meta text-muted-foreground">
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
