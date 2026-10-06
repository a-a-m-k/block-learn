export const SWAP_LINES = [
  { code: "if (ethIn >= 0.1) {", kind: "cond" as const },
  { code: "  sendUSDC();", kind: "action" as const },
  { code: "}", kind: "end" as const },
];

export const LINE_STEP_MS = 550;

export type IfThenPhase = "idle" | "running" | "done";

export function requestSwap(phase: IfThenPhase) {
  if (phase === "running") return null;
  return { phase: "running" as const, line: -1 };
}

export function beginSwapLines() {
  return { step: 0, phase: "running" as const, line: 0 };
}

export function reducedSwap(lineCount: number) {
  return { phase: "done" as const, line: lineCount - 1 };
}

export function advanceSwapLine(step: number, lineCount: number) {
  const next = step + 1;
  if (next >= lineCount) {
    return { step: next, phase: "done" as const };
  }
  return { step: next, phase: "running" as const, line: next };
}

export function swapLineAppearance(
  phase: IfThenPhase,
  index: number,
  line: number,
) {
  return {
    active: phase !== "idle" && index <= line,
    current: phase === "running" && index === line,
  };
}

export function ethInAmount(phase: IfThenPhase) {
  return phase === "idle" ? "0" : "0.1";
}
