import { afterEach, describe, expect, it, vi } from "vitest";

import {
  completedSlugsFromQuestionKeys,
  formatCompletedQuestions,
  getProgressPercent,
  isChapterComplete,
  readCompletedQuestionKeys,
  sanitizeQuestionKeys,
  writeCompletedQuestionKeys,
} from "@/lib/progress";
import {
  getQuizQuestionCount,
  getTotalQuizQuestions,
  quizQuestionKey,
} from "@/lib/quiz-meta";

describe("progress helpers", () => {
  it("sanitizes unknown, invalid, and duplicate question keys", () => {
    const valid = quizQuestionKey("what-is-blockchain", 0);
    const duplicate = quizQuestionKey("what-is-blockchain", 0);
    const outOfRange = quizQuestionKey("what-is-blockchain", 99);
    const junk = "not-a-real-key";

    expect(
      sanitizeQuestionKeys([junk, valid, duplicate, outOfRange, valid]),
    ).toEqual([valid]);
  });

  it("marks a chapter complete only when every question key is present", () => {
    const slug = "what-is-blockchain";
    const count = getQuizQuestionCount(slug);
    const partial = [quizQuestionKey(slug, 0)];
    const complete = Array.from({ length: count }, (_, index) =>
      quizQuestionKey(slug, index),
    );

    expect(isChapterComplete(slug, partial)).toBe(false);
    expect(isChapterComplete(slug, complete)).toBe(true);
    expect(completedSlugsFromQuestionKeys(partial)).not.toContain(slug);
    expect(completedSlugsFromQuestionKeys(complete)).toContain(slug);
  });

  it("bounds progress percent and formats question counts", () => {
    const total = getTotalQuizQuestions();

    expect(getProgressPercent(0)).toBe(0);
    expect(getProgressPercent(total)).toBe(100);
    expect(getProgressPercent(total + 5)).toBe(100);
    expect(getProgressPercent(-3)).toBe(0);
    expect(getProgressPercent(1)).toBeCloseTo((1 / total) * 100);

    expect(formatCompletedQuestions(3, 10)).toBe("3 of 10 questions complete");
  });
});

const PROGRESS_KEY = "blocklearn:completed-questions";
const LEGACY_KEY = "blocklearn:completed-chapters";

function installLocalStorage() {
  const store = new Map<string, string>();
  const localStorage = {
    getItem(key: string) {
      return store.has(key) ? (store.get(key) ?? null) : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };

  vi.stubGlobal("window", globalThis);
  vi.stubGlobal("localStorage", localStorage);
  return localStorage;
}

describe("progress storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads and writes nothing when there is no window", () => {
    expect(readCompletedQuestionKeys()).toEqual([]);
    expect(() =>
      writeCompletedQuestionKeys(["what-is-blockchain:0"]),
    ).not.toThrow();
  });

  it("writes known keys and drops the rest", () => {
    const storage = installLocalStorage();

    writeCompletedQuestionKeys([
      "blocks-and-hashes:0",
      "junk",
      "blocks-and-hashes:0",
      "blocks-and-hashes:99",
    ]);

    expect(JSON.parse(storage.getItem(PROGRESS_KEY) ?? "[]")).toEqual([
      "blocks-and-hashes:0",
    ]);
    expect(readCompletedQuestionKeys()).toEqual(["blocks-and-hashes:0"]);
  });

  it("expands a legacy chapter list into question keys", () => {
    const storage = installLocalStorage();
    storage.setItem(
      LEGACY_KEY,
      JSON.stringify(["what-is-blockchain", "not-a-chapter"]),
    );

    expect(readCompletedQuestionKeys()).toEqual([
      "what-is-blockchain:0",
      "what-is-blockchain:1",
      "what-is-blockchain:2",
    ]);
  });

  it("prefers the question key list and removes the legacy key on write", () => {
    const storage = installLocalStorage();
    storage.setItem(LEGACY_KEY, JSON.stringify(["what-is-blockchain"]));
    storage.setItem(PROGRESS_KEY, JSON.stringify(["consensus:1", 4, null]));

    expect(readCompletedQuestionKeys()).toEqual(["consensus:1"]);

    writeCompletedQuestionKeys(["consensus:1"]);

    expect(storage.getItem(LEGACY_KEY)).toBeNull();
    expect(readCompletedQuestionKeys()).toEqual(["consensus:1"]);
  });

  it("returns an empty list for broken storage and ignores a failed write", () => {
    const storage = installLocalStorage();
    storage.setItem(PROGRESS_KEY, "{");

    expect(readCompletedQuestionKeys()).toEqual([]);

    storage.setItem = () => {
      throw new Error("quota");
    };

    expect(() => writeCompletedQuestionKeys(["consensus:0"])).not.toThrow();
    expect(readCompletedQuestionKeys()).toEqual([]);
  });
});
