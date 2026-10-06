export type AmountEntry = { from: string; to: string; amount: number };

/** Highest amount a numeric field will accept. Negatives are rejected. */
export const MAX_AMOUNT = 300;

/** Digit columns shared by every amount, typed or static. */
export const AMOUNT_DIGITS = String(MAX_AMOUNT).length;

/** Hash-check uses the same ceiling as the ledgers. */
export const HASH_CHECK_MAX_AMOUNT = MAX_AMOUNT;
