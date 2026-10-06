import { describe, expect, it } from "vitest";

import type { ContentBlock } from "@/lib/chapter-content";
import { estimateReadMinutes } from "@/lib/reading-time";

describe("estimateReadMinutes", () => {
  it("counts prose at about 200 words per minute", () => {
    const words = Array.from({ length: 200 }, () => "word").join(" ");
    const blocks: ContentBlock[] = [{ type: "paragraph", text: words }];

    expect(estimateReadMinutes(blocks)).toBe(1);
  });

  it("adds time for interactive diagrams", () => {
    const words = Array.from({ length: 200 }, () => "word").join(" ");
    const blocks: ContentBlock[] = [
      { type: "paragraph", text: words },
      { type: "hash-check" },
    ];

    expect(estimateReadMinutes(blocks)).toBe(2);
  });
});
