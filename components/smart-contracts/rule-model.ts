export const RULE_CONDITIONS = [
  { id: "payment", label: "ethIn >= 0.1" },
  { id: "time", label: "time > 7 days" },
] as const;

export const RULE_ACTIONS = [
  { id: "unlock", label: "sendUSDC()" },
  { id: "refund", label: "refund()" },
] as const;

export const SUCCESS_PATH = [
  "Alice",
  "Transaction",
  "Smart Contract",
  "Condition ✓",
  "Action",
  "State updated",
] as const;

export const FAIL_PATH = [
  "Alice",
  "Transaction",
  "Smart Contract",
  "Condition ✗",
  "No action",
] as const;

export type ConditionId = (typeof RULE_CONDITIONS)[number]["id"];
export type ActionId = (typeof RULE_ACTIONS)[number]["id"];
export type RuleTone = "success" | "fail";

const PROMPT_INCOMPLETE =
  "Select one condition and one action below, then press Run rule.";
const PROMPT_READY = "Press Run rule to see whether that pair matches the swap.";

/** Alice’s swap: enough ETH arrived, then send her USDC. */
export function isSwapRule(
  condition: ConditionId | null,
  action: ActionId | null,
) {
  return condition === "payment" && action === "unlock";
}

export function failReason(
  condition: ConditionId | null,
  action: ActionId | null,
) {
  if (condition === "time" && action === "refund") {
    return "That’s a timeout refund path, not Alice’s ETH→USDC swap.";
  }
  if (condition === "time") {
    return "Waiting a week isn’t the swap condition—Alice’s rule checks ethIn.";
  }
  if (action === "refund") {
    return "refund() sends ETH back. The swap should call sendUSDC().";
  }
  return "That combo doesn’t match Alice’s swap.";
}

export type RuleResult =
  | { tone: "success"; path: typeof SUCCESS_PATH }
  | { tone: "fail"; path: typeof FAIL_PATH; reason: string };

/** Prompt before a run, or the path and reason once the pair has been run. */
export function describeRule(
  condition: ConditionId | null,
  action: ActionId | null,
  played: boolean,
): { ready: boolean; status: string | null; result: RuleResult | null } {
  const ready = condition !== null && action !== null;
  if (!ready || !played) {
    return {
      ready,
      status: ready ? PROMPT_READY : PROMPT_INCOMPLETE,
      result: null,
    };
  }

  if (isSwapRule(condition, action)) {
    return {
      ready: true,
      status: null,
      result: { tone: "success", path: SUCCESS_PATH },
    };
  }

  return {
    ready: true,
    status: null,
    result: {
      tone: "fail",
      path: FAIL_PATH,
      reason: failReason(condition, action),
    },
  };
}

/** The step that shows whether the rule fired. */
export function isOutcomeStep(label: string, tone: RuleTone) {
  if (tone === "success") return label.includes("✓");
  return label.includes("✗") || label === "No action";
}
