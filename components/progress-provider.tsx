"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  completedSlugsFromQuestionKeys,
  getProgressPercent,
  isChapterComplete,
  readCompletedQuestionKeys,
  writeCompletedQuestionKeys,
  type ProgressStore,
} from "@/lib/progress";
import type { ChapterSlug } from "@/lib/course";
import { getTotalQuizQuestions, quizQuestionKey } from "@/lib/quiz-meta";

const ProgressContext = createContext<ProgressStore | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedQuestionKeys, setCompletedQuestionKeys] = useState<string[]>(
    [],
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompletedQuestionKeys(readCompletedQuestionKeys());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeCompletedQuestionKeys(completedQuestionKeys);
  }, [completedQuestionKeys, hydrated]);

  const markQuestionCorrect = useCallback(
    (slug: ChapterSlug, questionIndex: number) => {
      const key = quizQuestionKey(slug, questionIndex);
      setCompletedQuestionKeys((prev) =>
        prev.includes(key) ? prev : [...prev, key],
      );
    },
    [],
  );

  const reset = useCallback(() => {
    setCompletedQuestionKeys([]);
  }, []);

  const isQuestionCorrect = useCallback(
    (slug: ChapterSlug, questionIndex: number) =>
      completedQuestionKeys.includes(quizQuestionKey(slug, questionIndex)),
    [completedQuestionKeys],
  );

  const isComplete = useCallback(
    (slug: ChapterSlug) => isChapterComplete(slug, completedQuestionKeys),
    [completedQuestionKeys],
  );

  const completedSlugs = useMemo(
    () => completedSlugsFromQuestionKeys(completedQuestionKeys),
    [completedQuestionKeys],
  );

  const value = useMemo<ProgressStore>(
    () => ({
      completedSlugs,
      completedQuestionKeys,
      completedQuestionCount: completedQuestionKeys.length,
      totalQuestions: getTotalQuizQuestions(),
      completedChapterCount: completedSlugs.length,
      progressPercent: getProgressPercent(completedQuestionKeys.length),
      hydrated,
      markQuestionCorrect,
      reset,
      isQuestionCorrect,
      isComplete,
    }),
    [
      completedSlugs,
      completedQuestionKeys,
      hydrated,
      markQuestionCorrect,
      reset,
      isQuestionCorrect,
      isComplete,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
