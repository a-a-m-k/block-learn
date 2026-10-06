import { describe, expect, it } from "vitest";

import { rovingKeyAction } from "./roving-focus";

describe("roving focus", () => {
  it("moves with arrows and stops at the ends", () => {
    expect(rovingKeyAction("ArrowDown", 0, 3)).toEqual({
      type: "move",
      index: 1,
    });
    expect(rovingKeyAction("ArrowRight", 2, 3)).toEqual({
      type: "move",
      index: 2,
    });
    expect(rovingKeyAction("ArrowUp", 0, 3)).toEqual({
      type: "move",
      index: 0,
    });
    expect(rovingKeyAction("Home", 2, 3)).toEqual({ type: "move", index: 0 });
    expect(rovingKeyAction("End", 0, 3)).toEqual({ type: "move", index: 2 });
  });

  it("selects on Enter only when the control asks for it", () => {
    expect(rovingKeyAction("Enter", 1, 3)).toEqual({ type: "none" });
    expect(rovingKeyAction(" ", 1, 3)).toEqual({ type: "none" });
    expect(
      rovingKeyAction("Enter", 1, 3, { selectOnEnter: true }),
    ).toEqual({ type: "select", index: 1 });
  });

  it("ignores other keys and an empty list", () => {
    expect(rovingKeyAction("a", 0, 3)).toEqual({ type: "none" });
    expect(rovingKeyAction("ArrowDown", 0, 0)).toEqual({ type: "none" });
  });
});
