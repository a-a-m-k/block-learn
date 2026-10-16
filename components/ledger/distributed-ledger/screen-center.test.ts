import { describe, expect, it } from "vitest";

import { screenCenterTop } from "./place-on-screen";

describe("screenCenterTop", () => {
  const frame = { top: 100, bottom: 1100 };

  it("sits on the viewport center while that point is inside the diagram", () => {
    expect(screenCenterTop(frame, 100, 450)).toBe(300);
  });

  it("stays inside the diagram when the viewport center is above it", () => {
    expect(screenCenterTop(frame, 100, 40, 16)).toBe(16);
  });

  it("stays inside the diagram when the viewport center is below it", () => {
    expect(screenCenterTop(frame, 100, 2000, 16)).toBe(884);
  });
});
