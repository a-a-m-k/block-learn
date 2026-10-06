import { MAX_AMOUNT, type AmountEntry } from "@/components/ledger/types";

export type { AmountEntry };
export { MAX_AMOUNT };

export type NetworkStatus = "synced" | "mismatch" | "broadcasting";

/** Delay before mismatch UI after Alice edits. */
export const WARN_S = 0.45;
/** Total cheat story length (warn + snap-back). */
export const REVERT_S = 1.8;
/** Finite sync overlay timeline; row appends when it completes. */
export const SYNC_ANIM_S = 1.4;
export const NEW_ROW_FLASH_S = 0.9;

/** New IOUs the learner can broadcast onto every copy. */
export const BROADCAST_QUEUE: AmountEntry[] = [
  { from: "Alex", to: "Alice", amount: 8 },
  { from: "Emma", to: "Bob", amount: 12 },
];
