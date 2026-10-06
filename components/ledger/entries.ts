import { parseAmount } from "@/components/ledger/amounts";
import type { AmountEntry } from "@/components/ledger/types";

export function entriesFromBlock(
  entries: { from: string; to: string; amount: string }[],
): AmountEntry[] {
  return entries.map((entry) => ({
    from: entry.from,
    to: entry.to,
    amount: parseAmount(entry.amount),
  }));
}
