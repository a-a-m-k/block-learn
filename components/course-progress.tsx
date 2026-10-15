"use client";

import { CheckCircleIcon } from "lucide-react";
import { useProgress } from "@/components/progress-provider";
import { formatCompletedQuestions } from "@/lib/progress";

export function CourseProgress() {
  const { completedQuestionCount, totalQuestions, hydrated } = useProgress();

  if (!hydrated || completedQuestionCount === 0) {
    return null;
  }

  return (
    <p className="inline-flex flex-row items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 caption font-medium text-success">
      <CheckCircleIcon
        data-icon="inline-start"
        className="size-icon shrink-0"
        aria-hidden
      />
      {formatCompletedQuestions(completedQuestionCount, totalQuestions)}
    </p>
  );
}
