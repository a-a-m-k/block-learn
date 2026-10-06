export type NumericDraft =
  | { ok: true; draft: string; value: number | null }
  | { ok: false };

/**
 * Integer draft for an amount field.
 * Empty cancels the edit. Digits only — separators are rejected, not deleted.
 * A pasted number over the max becomes the max. One extra typed digit that
 * crosses the max is rejected so the previous draft stays.
 * A number under the min is kept in the draft so typing can finish, and
 * raised to the min when committed.
 */
export function validateNumericDraft(
  raw: string,
  min: number,
  max: number,
  previous?: string,
): NumericDraft {
  const floor = Math.max(0, Math.trunc(min));
  const ceiling = Math.max(floor, Math.trunc(max));
  const text = raw.trim();

  if (text === "") return { ok: true, draft: "", value: null };
  if (!/^\d+$/.test(text)) return { ok: false };

  const parsed = Number(text);
  if (!Number.isFinite(parsed)) return { ok: false };

  if (parsed > ceiling) {
    if (previous !== undefined && isSingleDigitInsertion(previous, text)) {
      return { ok: false };
    }
    return { ok: true, draft: String(ceiling), value: ceiling };
  }

  return { ok: true, draft: text, value: Math.max(floor, parsed) };
}

/** True when `next` is `previous` with exactly one digit inserted. */
function isSingleDigitInsertion(previous: string, next: string) {
  if (next.length !== previous.length + 1) return false;

  let matched = 0;
  let skipped = 0;
  for (const char of next) {
    if (previous[matched] === char) matched += 1;
    else skipped += 1;
  }

  return skipped === 1 && matched === previous.length;
}
