import { CURRENT_BLOCK, TRANSACTIONS } from "@/components/hash-chain/model";
import {
  HASH_CHECK_MAX_AMOUNT,
  type AmountEntry,
} from "@/components/ledger/types";
import { hashHex, serializeBlock } from "@/lib/fingerprint";

export type { AmountEntry as BlockTx };

export const BLOCK_NUMBER = CURRENT_BLOCK.number;
export const MAX_AMOUNT = HASH_CHECK_MAX_AMOUNT;

export const INITIAL_TXS: AmountEntry[] = TRANSACTIONS.map((tx) => ({ ...tx }));

/** Fingerprint the next block expects for the untouched chapter block. */
export const EXPECTED_HASH = CURRENT_BLOCK.hash;

/** Teaching fingerprint of this block. An edit produces a different result. */
export function hashBlock(number: number, txs: readonly AmountEntry[]): string {
  return hashHex(serializeBlock(number, txs));
}
