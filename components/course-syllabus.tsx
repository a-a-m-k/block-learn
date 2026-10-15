"use client";

import Link from "next/link";
import { ArrowRightIcon, CheckIcon, ClockIcon } from "lucide-react";

import { useProgress } from "@/components/progress-provider";
import {
  chapters,
  getResumeChapterSlug,
  totalChapters,
} from "@/lib/course";
import { chapterPath } from "@/lib/site";
import { cn } from "@/lib/utils";

const landingChapterCopy = {
  "what-is-blockchain": {
    title: "What is Blockchain?",
    description:
      "See how matching copies let a group keep one trusted record—without a central keeper.",
  },
  "blocks-and-hashes": {
    title: "Blocks & Hashes",
    description:
      "Give every block a unique fingerprint and watch one small edit break the entire chain.",
  },
  consensus: {
    title: "Consensus",
    description:
      "Explore how a distributed network agrees on which block gets added next.",
  },
  transactions: {
    title: "Transactions",
    description:
      "Sign, broadcast, and verify a payment as it moves through the network.",
  },
  "smart-contracts": {
    title: "Smart Contracts",
    description:
      "Build a tiny program that moves value automatically when its rules are met.",
  },
} as const;

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
          const copy = landingChapterCopy[chapter.slug];

          return (
            <li key={chapter.slug} className="min-w-0 snap-start">
              <Link
                href={chapterPath(chapter.slug)}
                aria-current={upNext ? "step" : undefined}
                className={cn(
                  "group relative flex min-h-80 flex-col overflow-hidden rounded-xl border bg-card/20 p-4 text-left shadow-sm outline-none transition-all hover:-translate-y-1 hover:border-brand/60 hover:bg-card/50 hover:shadow-xl hover:shadow-brand/10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transform-none",
                  upNext ? "border-brand bg-brand/10" : "border-border",
                )}
              >
                <span className="landing-mono flex items-center justify-between text-chrome-meta font-bold text-muted-foreground">
                  <span className={cn(upNext && "text-brand-text")}>
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  {upNext ? (
                    <span className="rounded-md bg-brand/15 px-2 py-1 text-brand-text">
                      Up next
                    </span>
                  ) : null}
                </span>

                <span
                  className={cn(
                    "relative flex h-24 shrink-0 items-center justify-center text-muted-foreground",
                    upNext && "text-brand-text",
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "absolute size-8 -translate-x-5 translate-y-2 rotate-45 border border-current opacity-40",
                      chapter.number === 3 && "size-3 rounded-full",
                      chapter.number === 4 && "h-6 w-10 rotate-0",
                      chapter.number === 5 && "h-10 w-8 rotate-0 rounded-sm",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute size-6 translate-x-5 translate-y-1 rotate-45 border border-current opacity-50",
                      chapter.number === 3 && "size-3 rounded-full",
                      chapter.number === 4 && "h-6 w-10 rotate-0",
                      chapter.number === 5 && "h-10 w-8 -translate-x-1 translate-y-2 rotate-0 rounded-sm",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute size-4 -translate-y-6 rotate-45 border border-current opacity-50",
                      chapter.number === 3 && "size-3 rounded-full",
                      chapter.number > 3 && "hidden",
                    )}
                  />
                  <span className="relative z-10 flex size-control-lg items-center justify-center">
                    {completed ? (
                      <CheckIcon className="size-icon-lg text-success" />
                    ) : (
                      <Icon className="size-icon-lg" />
                    )}
                    {completed ? <span className="sr-only">Completed</span> : null}
                  </span>
                </span>

                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-body font-semibold leading-tight text-foreground">
                    {completed ? (
                      <span className="sr-only">Completed. </span>
                    ) : null}
                    {copy.title}
                  </span>
                  <span className="mt-2 line-clamp-3 text-chrome text-pretty text-muted-foreground">
                    {copy.description}
                  </span>
                  <span className="mt-auto flex items-center justify-between pt-4">
                    <span className="inline-flex items-center gap-1 text-chrome-meta text-muted-foreground">
                      <ClockIcon className="size-icon-sm" aria-hidden />
                      {chapter.readMinutes} min
                    </span>
                    <span
                      className={cn(
                        "flex size-control items-center justify-center rounded-full border text-muted-foreground transition-colors group-hover:border-brand/60 group-hover:text-foreground",
                        upNext &&
                          "border-brand bg-brand text-brand-foreground",
                      )}
                    >
                      <ArrowRightIcon className="size-icon-sm" aria-hidden />
                    </span>
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
