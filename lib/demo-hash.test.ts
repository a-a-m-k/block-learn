import { describe, expect, it } from "vitest";

import { CURRENT_BLOCK } from "@/components/hash-chain/model";
import { hashHex, serializeBlock } from "@/lib/fingerprint";
import {
  BLOCK_NUMBER,
  EXPECTED_HASH,
  INITIAL_TXS,
  hashBlock,
} from "@/components/hash-check/model";

describe("demo fingerprint", () => {
  it("matches the function for the untouched block", () => {
    const fingerprint = hashBlock(BLOCK_NUMBER, INITIAL_TXS);

    expect(fingerprint).toBe(hashHex(serializeBlock(BLOCK_NUMBER, INITIAL_TXS)));
    expect(fingerprint).toBe(CURRENT_BLOCK.hash);
    expect(fingerprint).toBe(EXPECTED_HASH);
    expect(fingerprint).not.toBe("a1b2c3d4e5f67890");
  });

  it("changes when an amount changes", () => {
    const edited = INITIAL_TXS.map((tx, index) =>
      index === 0 ? { ...tx, amount: tx.amount + 1 } : { ...tx },
    );

    expect(hashBlock(BLOCK_NUMBER, edited)).not.toBe(EXPECTED_HASH);
  });
});
