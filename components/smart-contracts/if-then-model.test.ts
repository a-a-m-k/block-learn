import { describe, expect, it } from "vitest";

import {
  SWAP_LINES,
  advanceSwapLine,
  beginSwapLines,
  ethInAmount,
  reducedSwap,
  requestSwap,
  swapLineAppearance,
} from "./if-then-model";

describe("if-then swap", () => {
  it("walks each line, then finishes on the last one", () => {
    expect(requestSwap("idle")).toEqual({ phase: "running", line: -1 });
    expect(requestSwap("running")).toBeNull();
    expect(beginSwapLines()).toEqual({ step: 0, phase: "running", line: 0 });

    const first = advanceSwapLine(0, SWAP_LINES.length);
    const second = advanceSwapLine(first.step, SWAP_LINES.length);
    const third = advanceSwapLine(second.step, SWAP_LINES.length);

    expect(first).toEqual({ step: 1, phase: "running", line: 1 });
    expect(second).toEqual({ step: 2, phase: "running", line: 2 });
    expect(third).toEqual({ step: 3, phase: "done" });
  });

  it("jumps to the last line when motion is reduced", () => {
    expect(reducedSwap(SWAP_LINES.length)).toEqual({ phase: "done", line: 2 });
  });

  it("highlights the current line and shows the incoming ETH once the swap starts", () => {
    expect(swapLineAppearance("idle", 0, -1)).toEqual({
      active: false,
      current: false,
    });
    expect(swapLineAppearance("running", 0, 0)).toEqual({
      active: true,
      current: true,
    });
    expect(swapLineAppearance("running", 1, 0)).toEqual({
      active: false,
      current: false,
    });
    expect(ethInAmount("idle")).toBe("0");
    expect(ethInAmount("running")).toBe("0.1");
    expect(ethInAmount("done")).toBe("0.1");
  });
});
