import { hashHex, serializeBlock } from "@/lib/fingerprint";
import type { AmountEntry } from "@/components/ledger/types";

export {
  FACE_BY_NAME,
  faceFor,
  faceIfKnown,
} from "@/components/ledger/characters";

export const TRANSACTIONS = [
  { from: "Alice", to: "Bob", amount: 22 },
  { from: "Bob", to: "Emma", amount: 2 },
  { from: "Emma", to: "Alice", amount: 5 },
] as const satisfies readonly AmountEntry[];

export const CURRENT_BLOCK = {
  number: 101,
  hash: hashHex(serializeBlock(101, TRANSACTIONS)),
};

export const CHAIN = [
  { number: 101, hash: CURRENT_BLOCK.hash, current: true },
  // Earlier links are fixed display strings. Only #101 is hashHex(serializeBlock(...)).
  { number: 100, hash: "d4e5f6a7b8c9d0e1", current: false },
  { number: 99, hash: "1a2b3c4d5e6f7890", current: false },
] as const;

export function hashLines(hash: string) {
  return [hash.slice(0, 8), hash.slice(8, 16)] as const;
}

export function blockLabel(number: number) {
  return `#${String(number).padStart(3, "0")}`;
}
