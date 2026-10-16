import { expect, test } from "@playwright/test";

import { chapters } from "../lib/course";

test("home shows the course title and chapter list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Blocklearn",
  );

  const syllabus = page.getByRole("navigation", { name: "Course chapters" });
  await expect(syllabus.getByRole("listitem")).toHaveCount(chapters.length);

  const first = chapters[0];
  if (!first) throw new Error("course catalog is empty");

  await expect(
    syllabus.getByRole("link", { name: first.title }),
  ).toHaveAttribute("href", `/chapters/${first.slug}`);
  await expect(syllabus.getByRole("link", { name: first.title })).toHaveAttribute(
    "aria-current",
    "step",
  );

  await expect(page.getByRole("link", { name: "Course outline" })).toHaveAttribute(
    "href",
    "#path",
  );
  await expect(page.getByRole("button", { name: "Sources" })).toBeVisible();
});
