import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("keeps a custom text size next to a text color", () => {
    expect(cn("text-body text-muted-foreground")).toBe(
      "text-body text-muted-foreground",
    );
    expect(cn("text-chrome-meta text-foreground")).toBe(
      "text-chrome-meta text-foreground",
    );
  });

  it("still lets a later size replace an earlier one", () => {
    expect(cn("text-body text-lead")).toBe("text-lead");
    expect(cn("text-sm text-body")).toBe("text-body");
  });
});
