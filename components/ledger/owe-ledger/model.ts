import { MAX_AMOUNT, type AmountEntry } from "@/components/ledger/types";

export type { AmountEntry };
export { MAX_AMOUNT };

export const KEEPER_NAME = "Bob";

export function uniquePeople(entries: { from: string; to: string }[]) {
  const names: string[] = [];
  for (const entry of entries) {
    if (!names.includes(entry.from)) names.push(entry.from);
    if (!names.includes(entry.to)) names.push(entry.to);
  }
  return names;
}

export function getNets(entries: AmountEntry[]) {
  const nets: Record<string, number> = {};
  for (const entry of entries) {
    nets[entry.from] = (nets[entry.from] ?? 0) - entry.amount;
    nets[entry.to] = (nets[entry.to] ?? 0) + entry.amount;
  }
  return nets;
}

/**
 * Bob can only move amounts in his favor:
 * others-owe-Bob can rise; Bob-owes-others can fall.
 */
export function amountBounds(
  entry: { from: string; to: string },
  baselineAmount: number,
) {
  if (entry.from === KEEPER_NAME) {
    return { min: 0, max: baselineAmount };
  }
  if (entry.to === KEEPER_NAME) {
    return { min: baselineAmount, max: MAX_AMOUNT };
  }
  return { min: 0, max: MAX_AMOUNT };
}
