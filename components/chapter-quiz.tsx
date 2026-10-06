"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cva } from "class-variance-authority";
import type {
  ChapterQuiz as ChapterQuizData,
  QuizQuestion,
} from "@/lib/quizzes";
import { useProgress } from "@/components/progress-provider";
import { CourseProgress } from "@/components/course-progress";
import { Button } from "@/components/ui/button";
import type { ChapterSlug } from "@/lib/course";
import { rovingKeyAction } from "@/lib/roving-focus";

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
    surface: "border-success bg-success/10 text-success",
    text: "text-success",
  },
  incorrect: {
    surface: "border-destructive bg-destructive/10 text-destructive",
    text: "text-destructive",
  },
} as const;

const quizOptionVariants = cva(
  "rounded-lg border px-3 py-2.5 text-left transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none sm:px-4 sm:py-3",
  {
    variants: {
      state: {
        idle: "hover:bg-muted",
        correct: quizTone.correct.surface,
        incorrect: quizTone.incorrect.surface,
      },
    },
    defaultVariants: {
      state: "idle",
    },
  },
);

const quizFeedbackVariants = cva("mt-4 font-medium", {
  variants: {
    state: {
      correct: quizTone.correct.text,
      incorrect: quizTone.incorrect.text,
    },
  },
});

type ChapterQuizProps = {
  quiz: ChapterQuizData;
  chapterSlug: ChapterSlug;
};

export function ChapterQuiz({ quiz, chapterSlug }: ChapterQuizProps) {
  const {
    markQuestionCorrect,
    isQuestionCorrect,
    isComplete,
  } = useProgress();
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
    <section className="section-y flex w-full flex-col gap-8 rounded-xl border border-border p-5 text-body sm:gap-10 sm:p-6 lg:p-8">
      <div>
        <h2 className="text-title font-semibold">Quick check</h2>
        <p className="mt-2 text-muted-foreground">
          {total > 1
            ? `Each correct answer adds to your course progress. Answer all ${total} to finish this chapter.`
            : `Answer the question to finish this chapter.`}
        </p>
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

      {showQuizProgress(correctOnPage, total, chapterComplete) && (
        <div>
          <CourseProgress />
        </div>
      )}
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
    <div>
      {total > 1 ? (
        <p className="caption text-muted-foreground">
          Question {index + 1} of {total}
        </p>
      ) : null}
      <p
        id={questionId}
        className={
          total > 1 ? "mt-1 text-muted-foreground" : "text-muted-foreground"
        }
      >
        {question.question}
      </p>

      <div
        role="radiogroup"
        aria-labelledby={questionId}
        aria-describedby={answered ? feedbackId : undefined}
        aria-disabled={locked || undefined}
        className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-2.5"
        onKeyDown={handleRadiogroupKeyDown}
      >
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedId === option.id;
          const isAnswer = option.id === question.correctOptionId;
          const isChecked = isSelected;

          return (
            <button
              key={option.id}
              ref={(node) => {
                optionRefs.current[optionIndex] = node;
              }}
              type="button"
              role="radio"
              tabIndex={locked ? -1 : focusIndex === optionIndex ? 0 : -1}
              aria-checked={isChecked}
              disabled={locked}
              onClick={() => {
                onSelect(option.id);
                setFocusIndex(optionIndex);
              }}
              onFocus={() => setFocusIndex(optionIndex)}
              className={quizOptionVariants({
                state: optionState({ answered, isSelected, isAnswer }),
              })}
            >
              {option.text}
              {answered && isAnswer ? (
                <span className="sr-only"> Correct answer</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <p
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
        {feedback}
      </p>

      {attempt.showRetry && (
        <Button
          type="button"
          variant="outline"
          size="default"
          className="mt-4"
          onClick={() => {
            onRetry();
            focusOption(focusIndex);
          }}
        >
          Try again
        </Button>
      )}
    </div>
  );
}
