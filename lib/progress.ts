import { chapters, isChapterSlug, type ChapterSlug } from "@/lib/course";
import {
  getQuizQuestionCount,
  getTotalQuizQuestions,
  quizQuestionKey,
} from "@/lib/quiz-meta";

const PROGRESS_STORAGE_KEY = "blocklearn:completed-questions";
const LEGACY_CHAPTERS_KEY = "blocklearn:completed-chapters";

export type ProgressStore = {
  completedSlugs: ChapterSlug[];
  completedQuestionKeys: readonly string[];
  completedQuestionCount: number;
  totalQuestions: number;
  completedChapterCount: number;
  progressPercent: number;
  hydrated: boolean;
  markQuestionCorrect: (slug: ChapterSlug, questionIndex: number) => void;
  reset: () => void;
  isQuestionCorrect: (slug: ChapterSlug, questionIndex: number) => boolean;
  isComplete: (slug: ChapterSlug) => boolean;
};

export function formatCompletedQuestions(
  completedQuestionCount: number,
  total = getTotalQuizQuestions(),
) {
  return `${completedQuestionCount} of ${total} questions complete`;
}

function keysForChapter(slug: ChapterSlug): string[] {
  const count = getQuizQuestionCount(slug);
  return Array.from({ length: count }, (_, index) =>
    quizQuestionKey(slug, index),
  );
}

function allValidQuestionKeys(): Set<string> {
  return new Set(chapters.flatMap((chapter) => keysForChapter(chapter.slug)));
}

export function sanitizeQuestionKeys(keys: readonly string[]): string[] {
  const valid = allValidQuestionKeys();
  const unique: string[] = [];
  for (const key of keys) {
    if (valid.has(key) && !unique.includes(key)) {
      unique.push(key);
    }
  }
  return unique;
}

export function isChapterComplete(
  slug: ChapterSlug,
  keys: ReadonlySet<string> | readonly string[],
) {
  const set = keys instanceof Set ? keys : new Set(keys);
  return keysForChapter(slug).every((key) => set.has(key));
}

export function completedSlugsFromQuestionKeys(
  keys: readonly string[],
): ChapterSlug[] {
  const set = new Set(keys);
  return chapters
    .map((chapter) => chapter.slug)
    .filter((slug) => isChapterComplete(slug, set));
}

function readLegacyChapterSlugs(): ChapterSlug[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LEGACY_CHAPTERS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is ChapterSlug => isChapterSlug(value));
  } catch {
    return [];
  }
}

export function readCompletedQuestionKeys(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return sanitizeQuestionKeys(
          parsed.filter((value): value is string => typeof value === "string"),
        );
      }
    }

    const legacy = readLegacyChapterSlugs();
    if (legacy.length === 0) return [];
    return sanitizeQuestionKeys(legacy.flatMap((slug) => keysForChapter(slug)));
  } catch {
    return [];
  }
}

export function writeCompletedQuestionKeys(keys: readonly string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(sanitizeQuestionKeys(keys)),
    );
    localStorage.removeItem(LEGACY_CHAPTERS_KEY);
  } catch {
    // Quota exceeded or private browsing — progress stays in memory only.
  }
}

export function getProgressPercent(completedQuestionCount: number) {
  const total = getTotalQuizQuestions();
  if (total === 0) return 0;
  const boundedCount = Math.min(Math.max(completedQuestionCount, 0), total);
  return (boundedCount / total) * 100;
}
