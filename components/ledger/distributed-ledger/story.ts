import {
  BROADCAST_QUEUE,
  MAX_AMOUNT,
  type AmountEntry,
  type NetworkStatus,
} from "./model";

export type NotebookStory = {
  shared: AmountEntry[];
  cheatAmounts: number[] | null;
  status: NetworkStatus;
  broadcastIndex: number;
  newRowIndex: number | null;
};

export type PendingBroadcast = {
  entry: AmountEntry;
  rowIndex: number;
};

export function createNotebookStory(
  shared: readonly AmountEntry[],
): NotebookStory {
  return {
    shared: shared.map((entry) => ({ ...entry })),
    cheatAmounts: null,
    status: "synced",
    broadcastIndex: 0,
    newRowIndex: null,
  };
}

function clampAmount(amount: number) {
  return Math.min(MAX_AMOUNT, Math.max(0, amount));
}

/** Alice's copy diverges. Ignored while a broadcast is in flight. */
export function editAliceAmount(
  story: NotebookStory,
  index: number,
  amount: number,
): NotebookStory {
  if (story.status === "broadcasting") return story;

  const base = story.cheatAmounts ?? story.shared.map((entry) => entry.amount);
  return {
    ...story,
    cheatAmounts: base.map((value, i) =>
      i === index ? clampAmount(amount) : value,
    ),
  };
}

/** The other notebooks have noticed. Alice's copy has not snapped back yet. */
export function revealMismatch(story: NotebookStory): NotebookStory {
  return { ...story, status: "mismatch" };
}

/** Drop Alice's private amounts. Every copy shows the shared record again. */
export function revertCheat(story: NotebookStory): NotebookStory {
  return { ...story, cheatAmounts: null, status: "synced" };
}

export function aliceEntries(story: NotebookStory): AmountEntry[] {
  if (!story.cheatAmounts) return story.shared;
  return story.shared.map((entry, i) => ({
    ...entry,
    amount: story.cheatAmounts?.[i] ?? entry.amount,
  }));
}

export function isMismatching(story: NotebookStory) {
  return (
    story.cheatAmounts !== null &&
    story.cheatAmounts.some((amount, i) => amount !== story.shared[i]?.amount)
  );
}

export function canBroadcast(
  story: NotebookStory,
  queue: readonly AmountEntry[] = BROADCAST_QUEUE,
) {
  return (
    story.broadcastIndex < queue.length &&
    story.status === "synced" &&
    story.cheatAmounts === null
  );
}

/**
 * Start a broadcast. Rejected while Alice is ahead of the others, or while
 * one is already on the way. The pending row is the same entry for every copy.
 */
export function beginBroadcast(
  story: NotebookStory,
  queue: readonly AmountEntry[] = BROADCAST_QUEUE,
): { story: NotebookStory; pending: PendingBroadcast } | null {
  const next = queue[story.broadcastIndex];
  if (
    !next ||
    story.status === "mismatch" ||
    story.status === "broadcasting" ||
    story.cheatAmounts
  ) {
    return null;
  }

  return {
    story: {
      ...story,
      cheatAmounts: null,
      newRowIndex: null,
      status: "broadcasting",
    },
    pending: { entry: next, rowIndex: story.shared.length },
  };
}

/** Append that one entry to the shared record every notebook reads. */
export function commitBroadcast(
  story: NotebookStory,
  pending: PendingBroadcast,
): NotebookStory {
  return {
    ...story,
    shared: [...story.shared, pending.entry],
    newRowIndex: pending.rowIndex,
    broadcastIndex: story.broadcastIndex + 1,
    status: "synced",
  };
}

export function clearNewRow(story: NotebookStory): NotebookStory {
  return { ...story, newRowIndex: null };
}
