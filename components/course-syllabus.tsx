"use client";

import Link from "next/link";
import { ArrowRightIcon, CheckIcon, ClockIcon } from "lucide-react";

import styles from "@/app/landing.module.css";
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
    art: styles.blocks,
  },
  "blocks-and-hashes": {
    title: "Blocks & Hashes",
    description:
      "Give every block a unique fingerprint and watch one small edit break the entire chain.",
    art: styles.hash,
  },
  consensus: {
    title: "Consensus",
    description:
      "Explore how a distributed network agrees on which block gets added next.",
    art: styles.nodes,
  },
  transactions: {
    title: "Transactions",
    description:
      "Sign, broadcast, and verify a payment as it moves through the network.",
    art: styles.transfer,
  },
  "smart-contracts": {
    title: "Smart Contracts",
    description:
      "Build a tiny program that moves value automatically when its rules are met.",
    art: styles.code,
  },
} as const;

export function CourseSyllabus() {
  const { completedSlugs, completedChapterCount, hydrated, isComplete } =
    useProgress();
  const resumeSlug = getResumeChapterSlug(completedSlugs);
  const courseFinished = hydrated && completedChapterCount >= totalChapters;

  return (
    <nav aria-label="Course chapters">
      <div className={styles.pathHeading}>
        <div>
          <span className={styles.sectionTag}>YOUR LEARNING PATH</span>
          <h2>Learn it one block at a time.</h2>
        </div>
        <p>
          <span>01</span>
          Start here, or jump
          <br />
          to any chapter.
        </p>
      </div>

      <ol className={styles.chapterGrid}>
        {chapters.map((chapter) => {
          const completed = hydrated && isComplete(chapter.slug);
          const upNext =
            hydrated && !courseFinished && chapter.slug === resumeSlug;
          const copy = landingChapterCopy[chapter.slug];
          const Icon = chapter.icon;

          return (
            <li key={chapter.slug}>
              <Link
                href={chapterPath(chapter.slug)}
                aria-current={upNext ? "step" : undefined}
                className={cn(
                  styles.chapterCard,
                  upNext && styles.current,
                )}
              >
                <div className={styles.chapterTop}>
                  <span>{String(chapter.number).padStart(2, "0")}</span>
                  {upNext ? <i>IN PROGRESS</i> : null}
                </div>

                <div className={cn(styles.chapterArt, copy.art)} aria-hidden>
                  <span />
                  <span />
                  <span />
                  {completed ? <CheckIcon /> : <Icon />}
                </div>

                <div className={styles.chapterCopy}>
                  <h3>
                    {completed ? (
                      <span className="sr-only">Completed. </span>
                    ) : null}
                    {copy.title}
                  </h3>
                  <p>{copy.description}</p>
                </div>

                <div className={styles.chapterFooter}>
                  <span>
                    <ClockIcon aria-hidden />
                    {chapter.readMinutes} min
                  </span>
                  <i>
                    <ArrowRightIcon aria-hidden />
                  </i>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
