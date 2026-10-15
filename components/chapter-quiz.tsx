"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cva } from "class-variance-authority";
import {
  CheckIcon,
  CircleHelpIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";

import type {
  ChapterQuiz as ChapterQuizData,
  QuizQuestion,
} from "@/lib/quizzes";
import type { ChapterSlug } from "@/lib/course";
import { rovingKeyAction } from "@/lib/roving-focus";
import { useProgress } from "@/components/progress-provider";
import { CourseProgress } from "@/components/course-progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  applySelection,
  clearSelection,
  correctAnswerCount,
  optionState,
  questionAttempt,
  recordsProgress,
  selectionsAfterProgress,
  showQuizProgress,
} from "./chapter-quiz-model";

const quizTone = {
  correct: {
    surface:
      "border-success bg-success/10 text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--success)_20%,transparent)]",
  },
  incorrect: {
    surface:
      "border-destructive bg-destructive/10 text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--destructive)_20%,transparent)]",
  },
} as const;

const quizOptionVariants = cva(
  "group/answer flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-foreground shadow-card transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none sm:px-4 sm:py-3.5",
  {
    variants: {
      state: {
        idle:
          "border-border bg-card hover:-translate-y-0.5 hover:border-brand/50 hover:bg-surface-raised hover:shadow-brand",
        correct: quizTone.correct.surface,
        incorrect: quizTone.incorrect.surface,
      },
    },
    defaultVariants: {
      state: "idle",
    },
  },
);

const quizFeedbackVariants = cva(
  "mt-4 flex items-start gap-3 rounded-xl border px-4 py-3 font-medium",
  {
    variants: {
      state: {
        correct: "border-success/30 bg-success/10 text-success",
        incorrect:
          "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
  },
);

type ChapterQuizProps = {
  quiz: ChapterQuizData;
  chapterSlug: ChapterSlug;
};

export function ChapterQuiz({ quiz, chapterSlug }: ChapterQuizProps) {
  const { markQuestionCorrect, isQuestionCorrect, isComplete } = useProgress();
  const chapterComplete = isComplete(chapterSlug);
  const total = quiz.questions.length;

  const [selectedIds, setSelectedIds] = useState<Array<string | null>>(() =>
    quiz.questions.map(() => null),
  );

  useEffect(() => {
    setSelectedIds((prev) =>
      selectionsAfterProgress(
        quiz.questions,
        prev,
        quiz.questions.map((_, index) => isQuestionCorrect(chapterSlug, index)),
      ),
    );
  }, [chapterSlug, isQuestionCorrect, quiz.questions]);

  const correctOnPage = correctAnswerCount(
    selectedIds,
    quiz.questions.map((question) => question.correctOptionId),
  );

  return (
    <section className="section-y relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface-raised p-4 text-body shadow-card sm:gap-5 sm:p-5 lg:p-6">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
        aria-hidden
      />
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-card sm:p-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand-text">
          <CircleHelpIcon className="size-6" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-title font-semibold">Quick check</h2>
          <p className="mt-1.5 text-muted-foreground">
            {total > 1
              ? `Each correct answer adds to your course progress. Answer all ${total} to finish this chapter.`
              : "Answer the question to finish this chapter."}
          </p>
        </div>
      </div>

      {quiz.questions.map((question, index) => (
        <QuizQuestionBlock
          key={`${chapterSlug}-${index}`}
          index={index}
          total={total}
          question={question}
          selectedId={selectedIds[index] ?? null}
          lockedCorrect={isQuestionCorrect(chapterSlug, index)}
          chapterComplete={chapterComplete}
          onSelect={(optionId) => {
            setSelectedIds((prev) => applySelection(prev, index, optionId));
            if (recordsProgress(optionId, question.correctOptionId)) {
              markQuestionCorrect(chapterSlug, index);
            }
          }}
          onRetry={() => {
            setSelectedIds((prev) => clearSelection(prev, index));
          }}
        />
      ))}

      {showQuizProgress(correctOnPage, total, chapterComplete) ? (
        <div className="flex justify-center border-t border-border pt-4">
          <CourseProgress />
        </div>
      ) : null}
    </section>
  );
}

type QuizQuestionBlockProps = {
  index: number;
  total: number;
  question: QuizQuestion;
  selectedId: string | null;
  lockedCorrect: boolean;
  chapterComplete: boolean;
  onSelect: (optionId: string) => void;
  onRetry: () => void;
};

function QuizQuestionBlock({
  index,
  total,
  question,
  selectedId,
  lockedCorrect,
  chapterComplete,
  onSelect,
  onRetry,
}: QuizQuestionBlockProps) {
  const questionId = useId();
  const feedbackId = `${questionId}-feedback`;
  const [focusIndex, setFocusIndex] = useState(0);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const attempt = questionAttempt({
    selectedId,
    correctOptionId: question.correctOptionId,
    storedCorrect: lockedCorrect,
    chapterComplete,
    explanation: question.explanation,
  });
  const { answered, isCorrect, locked, feedback } = attempt;

  function focusOption(nextIndex: number) {
    const next = Math.max(0, Math.min(question.options.length - 1, nextIndex));
    setFocusIndex(next);
    optionRefs.current[next]?.focus();
  }

  function handleRadiogroupKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (locked) return;

    const action = rovingKeyAction(
      event.key,
      focusIndex,
      question.options.length,
      { selectOnEnter: true },
    );
    if (action.type === "none") return;

    event.preventDefault();
    if (action.type === "move") {
      focusOption(action.index);
      return;
    }

    const option = question.options[action.index];
    if (option) onSelect(option.id);
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-background/40 p-4 transition-colors sm:p-5",
        locked && "border-success/30",
        answered && !isCorrect && "border-destructive/30",
        !answered && !locked && "border-border",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg border caption font-semibold tabular-nums",
            locked
              ? "border-success/30 bg-success/10 text-success"
              : "border-brand/30 bg-brand/10 text-brand-text",
          )}
          aria-hidden
        >
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          {total > 1 ? (
            <p className="caption font-medium text-muted-foreground">
              Question {index + 1} of {total}
            </p>
          ) : null}
          <p
            id={questionId}
            className={cn(
              "font-medium text-foreground",
              total > 1 && "mt-1",
            )}
          >
            {question.question}
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-labelledby={questionId}
        aria-describedby={answered ? feedbackId : undefined}
        aria-disabled={locked || undefined}
        className="mt-4 flex flex-col gap-2.5"
        onKeyDown={handleRadiogroupKeyDown}
      >
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedId === option.id;
          const isAnswer = option.id === question.correctOptionId;
          const state = optionState({ answered, isSelected, isAnswer });

          return (
            <button
              key={option.id}
              ref={(node) => {
                optionRefs.current[optionIndex] = node;
              }}
              type="button"
              role="radio"
              tabIndex={locked ? -1 : focusIndex === optionIndex ? 0 : -1}
              aria-checked={isSelected}
              disabled={locked}
              onClick={() => {
                onSelect(option.id);
                setFocusIndex(optionIndex);
              }}
              onFocus={() => setFocusIndex(optionIndex)}
              className={quizOptionVariants({ state })}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg border caption font-semibold uppercase transition-colors",
                  state === "correct" &&
                    "border-success/40 bg-success/15 text-success",
                  state === "incorrect" &&
                    "border-destructive/40 bg-destructive/15 text-destructive",
                  state === "idle" &&
                    "border-border bg-surface-raised text-muted-foreground group-hover/answer:border-brand/40 group-hover/answer:text-brand-text",
                )}
                aria-hidden
              >
                {option.id}
              </span>
              <span className="min-w-0 flex-1">{option.text}</span>
              {state === "correct" ? (
                <CheckIcon className="size-5 shrink-0 text-success" aria-hidden />
              ) : null}
              {state === "incorrect" ? (
                <XIcon
                  className="size-5 shrink-0 text-destructive"
                  aria-hidden
                />
              ) : null}
              {answered && isAnswer ? (
                <span className="sr-only"> Correct answer</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        id={feedbackId}
        role="status"
        aria-live="polite"
        className={
          answered
            ? quizFeedbackVariants({
                state: isCorrect ? "correct" : "incorrect",
              })
            : "sr-only"
        }
      >
        {answered ? (
          isCorrect ? (
            <CheckIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
          ) : (
            <XIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
          )
        ) : null}
        <span>{feedback}</span>
      </div>

      {attempt.showRetry ? (
        <Button
          type="button"
          variant="outline"
          size="default"
          className="mt-4"
          icon={RotateCcwIcon}
          onClick={() => {
            onRetry();
            focusOption(focusIndex);
          }}
        >
          Try again
        </Button>
      ) : null}
    </div>
  );
}
