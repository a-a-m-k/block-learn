import type { AmountEntry } from "@/components/ledger/types";

export type { AmountEntry };

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
