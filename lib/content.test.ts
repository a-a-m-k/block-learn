import { describe, expect, it } from "vitest";

import type { ContentBlock } from "@/lib/chapter-content";
import { getContentBySlug } from "@/lib/chapter-content";
import {
  chapters,
  getAdjacentChapters,
  getResumeChapterSlug,
  isChapterSlug,
  totalChapters,
} from "@/lib/course";
import { getQuizByChapterSlug } from "@/lib/quizzes";
import {
  getQuizQuestionCount,
  getTotalQuizQuestions,
} from "@/lib/quiz-meta";
import { estimateReadMinutes } from "@/lib/reading-time";
import { chapterPath } from "@/lib/site";

function walkBlocks(
  blocks: ContentBlock[],
  visit: (block: ContentBlock) => void,
) {
  for (const block of blocks) {
    visit(block);
    if (block.type === "section") {
      walkBlocks(block.blocks, visit);
    }
  }
}

describe("course catalog", () => {
  it("has unique sequential chapter numbers and slugs", () => {
    const slugs = chapters.map((chapter) => chapter.slug);
    const numbers = chapters.map((chapter) => chapter.number);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(numbers).size).toBe(numbers.length);
    expect(totalChapters).toBe(chapters.length);
    expect(numbers).toEqual(
      Array.from({ length: totalChapters }, (_, index) => index + 1),
    );
  });

  it("resolves adjacent and resume helpers", () => {
    const first = chapters[0];
    const second = chapters[1];
    const last = chapters[chapters.length - 1];

    if (!first || !second || !last) {
      throw new Error("course catalog needs at least three chapters");
    }

    expect(getAdjacentChapters(first.slug)).toEqual({
      prev: undefined,
      next: second,
    });
    expect(getAdjacentChapters(last.slug).next).toBeUndefined();
    expect(getResumeChapterSlug([])).toBe(first.slug);
    expect(getResumeChapterSlug([first.slug])).toBe(second.slug);
    expect(
      getResumeChapterSlug(chapters.map((chapter) => chapter.slug)),
    ).toBe(first.slug);
    expect(isChapterSlug(first.slug)).toBe(true);
    expect(isChapterSlug("not-a-chapter")).toBe(false);
    expect(chapterPath(first.slug)).toBe(`/chapters/${first.slug}`);
  });
});

describe("chapter content contracts", () => {
  it("provides content for every chapter slug", () => {
    for (const chapter of chapters) {
      const content = getContentBySlug(chapter.slug);
      expect(content.slug).toBe(chapter.slug);
      expect(content.blocks.length).toBeGreaterThan(0);
    }
  });

  it("keeps explore-transaction fields fully described", () => {
    const content = getContentBySlug("transactions");
    const exploreBlocks: Extract<
      ContentBlock,
      { type: "explore-transaction" }
    >[] = [];

    walkBlocks(content.blocks, (block) => {
      if (block.type === "explore-transaction") {
        exploreBlocks.push(block);
      }
    });

    expect(exploreBlocks.length).toBeGreaterThan(0);

    for (const block of exploreBlocks) {
      expect(block.whyItMatters.title.length).toBeGreaterThan(0);
      expect(block.fields.length).toBeGreaterThan(0);

      for (const field of block.fields) {
        expect(field.id.length).toBeGreaterThan(0);
        expect(field.label.length).toBeGreaterThan(0);
        expect(field.value.length).toBeGreaterThan(0);
        expect(field.description.length).toBeGreaterThan(0);
        expect(field.whyItMatters.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("quiz contracts", () => {
  it("matches course slugs and question shape", () => {
    let total = 0;

    for (const chapter of chapters) {
      const quiz = getQuizByChapterSlug(chapter.slug);
      const count = getQuizQuestionCount(chapter.slug);

      expect(quiz.questions.length).toBe(count);
      expect(count).toBeGreaterThan(0);
      total += count;

      for (const question of quiz.questions) {
        expect(question.question.length).toBeGreaterThan(0);
        expect(question.options).toHaveLength(3);
        expect(
          question.options.map((option) => option.id),
        ).toContain(question.correctOptionId);

        for (const option of question.options) {
          expect(option.id.length).toBeGreaterThan(0);
          expect(option.text.length).toBeGreaterThan(0);
        }
      }
    }

    expect(getTotalQuizQuestions()).toBe(total);
  });
});

describe("reading times", () => {
  it("derives each chapter from its content and quiz", () => {
    for (const chapter of chapters) {
      const expected = estimateReadMinutes(
        getContentBySlug(chapter.slug).blocks,
        getQuizByChapterSlug(chapter.slug),
      );

      expect(chapter.readMinutes).toBe(expected);
      expect(chapter.readMinutes).toBeGreaterThan(0);
    }
  });
});
