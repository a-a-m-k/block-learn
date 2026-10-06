import type { ChapterSlug } from "@/lib/course";

/**
 * Client-safe quiz metadata. Progress and the provider import this file so
 * they do not pull question text from `lib/quizzes.ts`.
 *
 * Keep counts in sync with `quizzesByChapterSlug` — `lib/content.test.ts` checks.
 */
export const quizQuestionCounts = {
  "what-is-blockchain": 3,
  "blocks-and-hashes": 3,
  consensus: 3,
  transactions: 3,
  "smart-contracts": 3,
} as const satisfies Record<ChapterSlug, number>;

export function getQuizQuestionCount(slug: ChapterSlug) {
  return quizQuestionCounts[slug];
}

export function getTotalQuizQuestions() {
  return (Object.keys(quizQuestionCounts) as ChapterSlug[]).reduce(
    (total, slug) => total + getQuizQuestionCount(slug),
    0,
  );
}

export function quizQuestionKey(slug: ChapterSlug, questionIndex: number) {
  return `${slug}:${questionIndex}`;
}
