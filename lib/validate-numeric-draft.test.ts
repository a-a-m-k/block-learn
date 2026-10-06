import { describe, expect, it } from "vitest";

import { validateNumericDraft } from "@/lib/validate-numeric-draft";

describe("validateNumericDraft", () => {
  it("keeps an in-range integer", () => {
    expect(validateNumericDraft("23", 0, 300)).toEqual({
      ok: true,
      draft: "23",
      value: 23,
    });
  });

  it("treats an empty field as a cancelled edit", () => {
    expect(validateNumericDraft("  ", 0, 300)).toEqual({
      ok: true,
      draft: "",
      value: null,
    });
  });

  it("rejects separators instead of joining the digits", () => {
    expect(validateNumericDraft("12.5", 0, 300)).toEqual({ ok: false });
    expect(validateNumericDraft("1,000", 0, 300)).toEqual({ ok: false });
    expect(validateNumericDraft("-4", 0, 300)).toEqual({ ok: false });
  });

  it("clamps a pasted number that is over the max", () => {
    expect(validateNumericDraft("1000", 0, 300)).toEqual({
      ok: true,
      draft: "300",
      value: 300,
    });
    expect(validateNumericDraft("1000", 0, 300, "10")).toEqual({
      ok: true,
      draft: "300",
      value: 300,
    });
    expect(validateNumericDraft("10", 0, 8)).toEqual({
      ok: true,
      draft: "8",
      value: 8,
    });
  });

  it("rejects one extra digit that crosses the max", () => {
    expect(validateNumericDraft("1000", 0, 300, "100")).toEqual({ ok: false });
    expect(validateNumericDraft("90", 0, 25, "9")).toEqual({ ok: false });
    expect(validateNumericDraft("250", 0, 25, "25")).toEqual({ ok: false });
  });

  it("leaves a below-min draft editable and commits the min", () => {
    expect(validateNumericDraft("5", 10, 300)).toEqual({
      ok: true,
      draft: "5",
      value: 10,
    });
  });

  it("commits leading zeros as the integer they spell", () => {
    expect(validateNumericDraft("007", 0, 300)).toEqual({
      ok: true,
      draft: "007",
      value: 7,
    });
  });
});
