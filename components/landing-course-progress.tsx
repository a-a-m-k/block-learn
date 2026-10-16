"use client";

import { CheckIcon } from "lucide-react";

import styles from "@/app/landing.module.css";
import { useProgress } from "@/components/progress-provider";

export function LandingCourseProgress() {
  const {
    completedQuestionCount,
    totalQuestions,
    progressPercent,
    hydrated,
  } = useProgress();
  const completed = hydrated ? completedQuestionCount : 0;
  const percent = hydrated ? progressPercent : 0;

  return (
    <div className={styles.homeProgress}>
      <div>
        <span>
          <CheckIcon aria-hidden />
          {completed} of {totalQuestions} questions
        </span>
        <strong>{Math.round(percent)}%</strong>
      </div>
      <i>
        <span style={{ width: `${percent}%` }} />
      </i>
    </div>
  );
}
