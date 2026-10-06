import { describe, expect, it } from "vitest";

import { NODE, POSITION_CLASS, type PersonPosition } from "./scene";

const slots: Record<PersonPosition, { col: number; row: number }> = {
  "top-left": { col: 1, row: 1 },
  "top-right": { col: 2, row: 1 },
  "bottom-left": { col: 1, row: 2 },
  "bottom-right": { col: 2, row: 2 },
};

describe("distributed ledger stage slots", () => {
  it("places each copy on its own cell and aims the line at that cell's center", () => {
    for (const [position, slot] of Object.entries(slots) as [
      PersonPosition,
      { col: number; row: number },
    ][]) {
      expect(POSITION_CLASS[position]).toContain(`md:col-start-${slot.col}`);
      expect(POSITION_CLASS[position]).toContain(`md:row-start-${slot.row}`);
      expect(NODE[position]).toEqual({
        x: ((slot.col - 0.5) / 2) * 100,
        y: ((slot.row - 0.5) / 2) * 100,
      });
    }

    expect(new Set(Object.values(POSITION_CLASS)).size).toBe(4);
  });
});
