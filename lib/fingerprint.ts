/** Stable payload for the teaching fingerprint — order and formatting matter. */
export function serializeBlock(
  number: number,
  txs: readonly { from: string; to: string; amount: number }[],
) {
  const lines = txs.map((tx) => `${tx.from}>${tx.to}:${tx.amount}`);
  return `block:${number}|${lines.join(",")}`;
}

/**
 * Short teaching fingerprint. Same input always returns the same 16 hex
 * characters. This is not SHA-256.
 */
export function hashHex(input: string): string {
  let h1 = 2166136261;
  let h2 = 0x811c9dc5 ^ 0xa5a5a5a5;

  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 16777619);
    h2 ^= c + i * 131;
    h2 = Math.imul(h2, 2246822519);
  }

  h1 >>>= 0;
  h2 >>>= 0;

  return (
    h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0")
  ).slice(0, 16);
}
