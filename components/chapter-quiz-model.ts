export type QuizOptionState = "idle" | "correct" | "incorrect";

export function optionState({
  answered,
  isSelected,
  isAnswer,
}: {
  answered: boolean;
  isSelected: boolean;
  isAnswer: boolean;
}): QuizOptionState {
  if (!answered) return "idle";
  if (isAnswer) return "correct";
  if (isSelected) return "incorrect";
  return "idle";
}

export function questionAttempt({
  selectedId,
  correctOptionId,
  storedCorrect,
  chapterComplete,
  explanation,
}: {
  selectedId: string | null;
  correctOptionId: string;
  storedCorrect: boolean;
  chapterComplete: boolean;
  explanation?: string;
}) {
  const answered = selectedId !== null;
  const isCorrect = selectedId === correctOptionId;
  const locked = storedCorrect || (answered && (isCorrect || chapterComplete));
  const feedback = answered
    ? `${isCorrect ? "Correct" : "Incorrect"}${
        explanation ? ` — ${explanation}` : ""
      }`
    : "";

  return {
    answered,
    isCorrect,
    locked,
    feedback,
    showRetry: answered && !locked,
  };
}

export function selectionsAfterProgress(
  questions: readonly { correctOptionId: string }[],
  previous: readonly (string | null)[],
  storedCorrect: readonly boolean[],
) {
  return questions.map((question, index) => {
    if (storedCorrect[index]) return question.correctOptionId;
    return previous[index] ?? null;
  });
}

export function applySelection(
  selectedIds: readonly (string | null)[],
  index: number,
  optionId: string,
) {
  const next = selectedIds.slice();
  next[index] = optionId;
  return next;
}

export function clearSelection(
  selectedIds: readonly (string | null)[],
  index: number,
) {
  const next = selectedIds.slice();
  next[index] = null;
  return next;
}

export function recordsProgress(optionId: string, correctOptionId: string) {
  return optionId === correctOptionId;
}

export function correctAnswerCount(
  selectedIds: readonly (string | null)[],
  correctOptionIds: readonly string[],
) {
  return correctOptionIds.reduce((count, correctOptionId, index) => {
    return selectedIds[index] === correctOptionId ? count + 1 : count;
  }, 0);
}

export function showQuizProgress(
  correctOnPage: number,
  total: number,
  chapterComplete: boolean,
) {
  const allCorrect = correctOnPage === total;
  return correctOnPage > 0 || chapterComplete || allCorrect;
}
