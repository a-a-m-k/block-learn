import { describe, expect, it } from "vitest";

import {
  FAIL_PATH,
  SUCCESS_PATH,
  describeRule,
  failReason,
  isOutcomeStep,
  isSwapRule,
} from "./rule-model";

describe("swap rule", () => {
  it("accepts enough ETH followed by sendUSDC", () => {
    expect(isSwapRule("payment", "unlock")).toBe(true);
    expect(describeRule("payment", "unlock", true)).toEqual({
      ready: true,
      status: null,
      result: { tone: "success", path: SUCCESS_PATH },
    });
  });

  it("names each wrong pair", () => {
    expect(failReason("time", "refund")).toMatch(/timeout refund/);
    expect(failReason("time", "unlock")).toMatch(/ethIn/);
    expect(failReason("payment", "refund")).toMatch(/sendUSDC/);
    expect(describeRule("time", "refund", true).result).toMatchObject({
      tone: "fail",
      path: FAIL_PATH,
      reason: failReason("time", "refund"),
    });
  });

  it("waits for both choices, then for the run", () => {
    expect(describeRule(null, null, false)).toMatchObject({
      ready: false,
      result: null,
    });
    expect(describeRule("payment", null, true)).toMatchObject({
      ready: false,
      result: null,
    });
    expect(describeRule("payment", "unlock", false)).toMatchObject({
      ready: true,
      status: expect.stringMatching(/Run rule/),
      result: null,
    });
  });

  it("highlights the step that shows the outcome", () => {
    expect(isOutcomeStep("Condition ✓", "success")).toBe(true);
    expect(isOutcomeStep("Action", "success")).toBe(false);
    expect(isOutcomeStep("Condition ✗", "fail")).toBe(true);
    expect(isOutcomeStep("No action", "fail")).toBe(true);
    expect(isOutcomeStep("Alice", "fail")).toBe(false);
  });
});
