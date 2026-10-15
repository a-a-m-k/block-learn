import { describe, expect, it } from "vitest";

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

const questions = [
  { correctOptionId: "shared" },
  { correctOptionId: "hash" },
];

describe("quiz attempt", () => {
  it("keeps a stored correct answer selected across a reload", () => {
    expect(selectionsAfterProgress(questions, [null, null], [true, false])).toEqual([
      "shared",
      null,
    ]);
    expect(
      selectionsAfterProgress(questions, ["wrong", null], [false, false]),
    ).toEqual(["wrong", null]);
  });

  it("clears a correct answer once it is no longer stored", () => {
    expect(
      selectionsAfterProgress(questions, ["shared", "hash"], [false, true]),
    ).toEqual([null, "hash"]);
  });

  it("records progress only for the correct option", () => {
    const selected = applySelection([null, null], 0, "shared");
    expect(recordsProgress("shared", "shared")).toBe(true);
    expect(recordsProgress("private", "shared")).toBe(false);
    expect(correctAnswerCount(selected, ["shared", "hash"])).toBe(1);
  });

  it("lets a wrong answer retry and locks a correct one", () => {
    const wrong = questionAttempt({
      selectedId: "private",
      correctOptionId: "shared",
      storedCorrect: false,
      chapterComplete: false,
      explanation: "One writer is the weak point.",
    });
    expect(wrong).toMatchObject({
      isCorrect: false,
      locked: false,
      showRetry: true,
      feedback: "Incorrect — One writer is the weak point.",
    });
    expect(optionState({ answered: true, isSelected: true, isAnswer: false })).toBe(
      "incorrect",
    );

    const cleared = clearSelection(["private", null], 0);
    expect(cleared).toEqual([null, null]);
    expect(
      questionAttempt({
        selectedId: null,
        correctOptionId: "shared",
        storedCorrect: false,
        chapterComplete: false,
      }).showRetry,
    ).toBe(false);

    const right = questionAttempt({
      selectedId: "shared",
      correctOptionId: "shared",
      storedCorrect: true,
      chapterComplete: false,
    });
    expect(right).toMatchObject({
      isCorrect: true,
      locked: true,
      showRetry: false,
      feedback: "Correct",
    });
  });

  it("shows the chapter bar once any answer on the page is right", () => {
    expect(showQuizProgress(0, 3, false)).toBe(false);
    expect(showQuizProgress(1, 3, false)).toBe(true);
    expect(showQuizProgress(0, 3, true)).toBe(true);
  });
});
