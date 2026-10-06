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
    <p className="inline-flex flex-row items-center gap-1 text-body text-muted-foreground">
      <CheckCircleIcon
        data-icon="inline-start"
        className="size-icon shrink-0 text-success"
        aria-hidden
      />
      {formatCompletedQuestions(completedQuestionCount, totalQuestions)}
    </p>
  );
}
