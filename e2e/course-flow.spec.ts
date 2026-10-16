import { expect, test, type Locator, type Page } from "@playwright/test";

import { getTotalQuizQuestions } from "../lib/quiz-meta";

async function openChapter(page: Page, slug: string) {
  await page.goto(`/chapters/${slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

async function editAmount(scope: Locator, who: string, value: string) {
  const label = `Amount ${who}`;
  const editor = scope.getByRole("button", { name: new RegExp(`Edit ${label}`) });
  await editor.click();
  const field = scope.getByRole("textbox", { name: label });
  await field.fill(value);
  await field.blur();
}

test("editing a block changes its fingerprint and a correct answer moves progress", async ({
  page,
}) => {
  await openChapter(page, "blocks-and-hashes");

  const figure = page.getByRole("figure", {
    name: /Change a transaction in a block/,
  });
  await expect(figure.getByRole("status")).toContainText("Hash matches");

  await editAmount(figure, "Alice owes Bob", "23");

  await expect(figure.getByRole("status")).toContainText("Hash doesn't match");
  await expect(figure.getByText("Demo fingerprint, not SHA-256")).toBeVisible();

  await openChapter(page, "what-is-blockchain");
  await page
    .getByRole("radio", {
      name: /if Bob changes a debt or loses the notebook/,
    })
    .click();

  await expect(
    page.getByRole("status").filter({
      hasText: `1 of ${getTotalQuizQuestions()} questions complete`,
    }),
  ).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: "Correct" })).toBeVisible();
});

test("a wrong answer can be retried and a correct one survives reload", async ({
  page,
}) => {
  await openChapter(page, "what-is-blockchain");

  const correct = page.getByRole("radio", {
    name: /if Bob changes a debt or loses the notebook/,
  });
  await correct.click();

  const progress = page.getByRole("status").filter({
    hasText: `1 of ${getTotalQuizQuestions()} questions complete`,
  });
  await expect(progress).toBeVisible();

  const wrong = page.getByRole("radio", {
    name: /magically corrects the amounts/,
  });
  await wrong.click();

  await expect(
    page.getByRole("status").filter({ hasText: "Incorrect" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
  await expect(wrong).toBeChecked();
  await expect(
    page.getByRole("radio", { name: /garbage in can become garbage/ }),
  ).toHaveAccessibleName(/Correct answer/);

  await page.reload();

  await expect(progress).toBeVisible();
  await expect(correct).toBeChecked();
  await expect(
    page.getByRole("status").filter({ hasText: "Incorrect" }),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Try again" })).toHaveCount(0);
});

test("Bob's notebook amounts can move up or down", async ({ page }) => {
  await openChapter(page, "what-is-blockchain");

  const ledger = page.getByRole("figure", {
    name: "Bob's notebook that others read from",
  });
  const aliceAmount = ledger.getByRole("button", {
    name: /Edit Amount Alice owes Bob/,
  });
  await expect(aliceAmount).toContainText("10");
  await editAmount(ledger, "Alice owes Bob", "9");
  await expect(aliceAmount).toContainText("9");

  const emmaAmount = ledger.getByRole("button", {
    name: /Edit Amount Emma owes Bob/,
  });
  await expect(emmaAmount).toContainText("25");
  await editAmount(ledger, "Emma owes Bob", "26");
  await expect(emmaAmount).toContainText("26");
});

test("distributed notebooks do not overflow on a phone width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openChapter(page, "what-is-blockchain");

  const stage = page.getByRole("figure", {
    name: /Distributed notebooks/,
  });
  await expect(stage).toBeVisible();

  await editAmount(stage, "Alice owes Bob", "300");

  // Nested overflow:hidden can clip amounts without growing scrollWidth.
  // Measure immediately: Alice's edit snaps back, so don't wait on the value.
  const amountFullyVisible = await stage
    .getByRole("button", { name: /Edit Amount Alice owes Bob/ })
    .evaluate((el) => {
    const chip = el.closest("[data-amount-field]") ?? el;
    const notebook = chip.closest("[data-notebook-copy]");
    if (!notebook) return false;
    const amountBox = chip.getBoundingClientRect();
    const notebookBox = notebook.getBoundingClientRect();
    return (
      amountBox.left >= notebookBox.left - 1 &&
      amountBox.right <= notebookBox.right + 1
    );
  });
  expect(amountFullyVisible).toBe(true);

  const pageOverflows = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(pageOverflows).toBe(false);
});

test("a broadcast lands on every shared copy", async ({ page }) => {
  await openChapter(page, "what-is-blockchain");

  const stage = page.getByRole("figure", {
    name: /Distributed notebooks/,
  });
  await expect(
    stage.getByRole("listitem").filter({ hasText: "Alex → Alice" }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Broadcast Alex → Alice $8" }).click();

  await expect(page.getByText("Broadcasting…")).toBeVisible();
  await expect(
    stage.getByRole("listitem").filter({ hasText: "Alex → Alice" }),
  ).toHaveCount(4, { timeout: 10_000 });
  await expect(
    page.getByRole("button", { name: "Broadcast Emma → Bob $12" }),
  ).toBeEnabled();
});

test("Alice's quiet edit is rejected", async ({ page }) => {
  await openChapter(page, "what-is-blockchain");

  const stage = page.getByRole("figure", {
    name: /Distributed notebooks/,
  });
  const aliceAmount = stage.getByRole("button", {
    name: /Edit Amount Alice owes Bob/,
  });
  await editAmount(stage, "Alice owes Bob", "11");

  await expect(page.getByText("Mismatch detected.")).toBeVisible();
  await expect(page.getByText("Mismatch detected.")).toBeHidden();
  await expect(aliceAmount).toContainText("10");
});

test("the hash chain shows how a block is linked", async ({ page }) => {
  await openChapter(page, "blocks-and-hashes");

  const figure = page.getByRole("figure", {
    name: /How a blockchain works/,
  });
  await expect(
    figure.getByRole("heading", { name: "Transactions arrive" }),
  ).toBeVisible();
  await expect(
    figure.getByRole("heading", { name: "Hash is created" }),
  ).toBeVisible();
  await expect(
    figure.getByRole("heading", { name: "Block added to chain" }),
  ).toBeVisible();
});

test("consensus can switch methods and play the demo", async ({ page }) => {
  await openChapter(page, "consensus");

  await page.getByRole("button", { name: "Proof of Stake" }).click();
  await expect(
    page.getByRole("heading", { name: "Proof of Stake", level: 3 }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Play demo" }).click();
  await expect(page.getByText("Alice is selected!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Replay" })).toBeEnabled();
});

test("signing a transaction starts the send", async ({ page }) => {
  await openChapter(page, "transactions");

  const figure = page.getByRole("figure", {
    name: /Create a transaction from Alice to Bob/,
  });
  await expect(figure.getByRole("status")).toHaveText("Ready to sign and send.");

  await figure.getByRole("button", { name: "Sign & send" }).click();

  await expect(figure.getByRole("status")).toContainText("Signed");
  await expect(figure.getByRole("button", { name: "Next step" })).toBeVisible();

  await figure.getByRole("button", { name: "Next step" }).click();
  await expect(figure.getByRole("status")).toContainText("Broadcast");

  await figure.getByRole("button", { name: "Next step" }).click();
  await expect(figure.getByRole("status")).toContainText("In mempool");

  await figure.getByRole("button", { name: "Next step" }).click();
  await expect(figure.getByRole("status")).toContainText("Added to block");
  await expect(figure.getByRole("button", { name: "Replay" })).toBeEnabled();
});

test("transaction fields can be stepped through", async ({ page }) => {
  await openChapter(page, "transactions");

  const figure = page.getByRole("figure", {
    name: "Explore the fields inside a transaction",
  });
  await expect(figure.getByRole("heading", { name: "From", level: 3 })).toBeVisible();

  await figure.getByRole("button", { name: "Next field" }).click();

  await expect(figure.getByRole("heading", { name: "To", level: 3 })).toBeVisible();
  await expect(figure.getByText("2 of 5")).toBeVisible();
  await expect(
    figure.getByText("To is the destination on the shared ledger."),
  ).toBeVisible();
});

test("the smart-contract path advances one step at a time", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openChapter(page, "smart-contracts");

  const figure = page.getByRole("figure", {
    name: "How a smart contract runs, step by step",
  });
  await expect(figure.getByRole("status")).toContainText("Step 1 of 5");

  await figure.getByRole("button", { name: "Next step" }).click();

  await expect(figure.getByRole("status")).toContainText("Step 2 of 5");
  await expect(
    figure.getByRole("heading", { name: "Smart Contract", level: 3 }),
  ).toBeVisible();
});

test("confirming the swap runs the if-then rule", async ({ page }) => {
  await openChapter(page, "smart-contracts");

  const figure = page.getByRole("figure", {
    name: "If-this-then-that swap contract demo",
  });
  await figure.getByRole("button", { name: "Confirm swap" }).click();

  await expect(figure.getByText("Condition met")).toBeVisible();
  await expect(figure.getByText("~220 USDC sent to Alice")).toBeVisible();
  await expect(figure.getByRole("button", { name: "Replay" })).toBeEnabled();
});

test("the staking lock returns the ETH after the wait", async ({ page }) => {
  await openChapter(page, "smart-contracts");

  const figure = page.getByRole("figure", {
    name: "Staking lock smart contract",
  });
  await figure.getByRole("button", { name: "10 days later" }).click();
  await expect(figure.getByRole("status")).toContainText("10 days have passed");

  await figure.getByRole("button", { name: "Try to withdraw" }).click();
  await expect(figure.getByRole("status")).toContainText(
    "ETH returned to Alice",
  );
});

test("smart-contract use cards reveal a different example", async ({ page }) => {
  await openChapter(page, "smart-contracts");

  const figure = page.getByRole("figure", {
    name: "What smart contracts can do",
  });
  await figure.getByRole("button", { name: "Token approvals" }).click();

  await expect(
    figure.getByRole("button", { name: "Token approvals" }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(
    figure.getByText("Allow this site to spend your USDC."),
  ).toBeVisible();
});

test("the rule builder runs the matching swap", async ({ page }) => {
  await openChapter(page, "smart-contracts");

  const figure = page.getByRole("figure", {
    name: "Build a smart contract rule",
  });
  await figure.getByRole("radio", { name: "ethIn >= 0.1" }).click();
  await figure.getByRole("radio", { name: "sendUSDC()" }).click();
  await figure.getByRole("button", { name: "Run rule" }).click();

  await expect(figure.getByText("You made it.")).toBeVisible();
  await expect(figure.getByText("State updated")).toBeVisible();
});

test("the rule builder shows a fail result for a wrong combo", async ({
  page,
}) => {
  await openChapter(page, "smart-contracts");

  const figure = page.getByRole("figure", {
    name: "Build a smart contract rule",
  });
  await figure.getByRole("radio", { name: "time > 7 days" }).click();
  await figure.getByRole("radio", { name: "refund()" }).click();
  await figure.getByRole("button", { name: "Run rule" }).click();

  await expect(figure.getByText("Rule didn’t run.")).toBeVisible();
  await expect(figure.getByText("No action")).toBeVisible();
});
