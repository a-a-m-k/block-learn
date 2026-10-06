import { describe, expect, it } from "vitest";

import { BROADCAST_QUEUE } from "./model";
import {
  aliceEntries,
  beginBroadcast,
  canBroadcast,
  clearNewRow,
  commitBroadcast,
  createNotebookStory,
  editAliceAmount,
  isMismatching,
  revealMismatch,
  revertCheat,
} from "./story";

const shared = [
  { from: "Alice", to: "Bob", amount: 10 },
  { from: "Bob", to: "Emma", amount: 4 },
];

describe("shared notebooks", () => {
  it("lets Alice diverge, then snaps her copy back to the shared record", () => {
    const edited = editAliceAmount(createNotebookStory(shared), 0, 11);

    expect(edited.shared).toEqual(shared);
    expect(aliceEntries(edited)[0]?.amount).toBe(11);
    expect(edited.status).toBe("synced");
    expect(isMismatching(edited)).toBe(true);

    const noticed = revealMismatch(edited);
    expect(noticed.status).toBe("mismatch");
    expect(aliceEntries(noticed)[0]?.amount).toBe(11);

    const snapped = revertCheat(noticed);
    expect(snapped.cheatAmounts).toBeNull();
    expect(snapped.status).toBe("synced");
    expect(aliceEntries(snapped)).toEqual(shared);
    expect(isMismatching(snapped)).toBe(false);
  });

  it("clamps an edit and ignores one during a broadcast", () => {
    const high = editAliceAmount(createNotebookStory(shared), 0, 999);
    expect(aliceEntries(high)[0]?.amount).toBe(300);

    const low = editAliceAmount(createNotebookStory(shared), 0, -5);
    expect(aliceEntries(low)[0]?.amount).toBe(0);

    const broadcasting = {
      ...createNotebookStory(shared),
      status: "broadcasting" as const,
    };
    expect(editAliceAmount(broadcasting, 0, 11)).toBe(broadcasting);
  });

  it("appends one broadcast entry onto the record every copy reads", () => {
    const story = createNotebookStory(shared);
    const started = beginBroadcast(story);

    expect(started).not.toBeNull();
    expect(started?.story.status).toBe("broadcasting");
    expect(started?.pending).toEqual({
      entry: BROADCAST_QUEUE[0],
      rowIndex: shared.length,
    });

    const committed = commitBroadcast(started!.story, started!.pending);
    expect(committed.shared).toEqual([...shared, BROADCAST_QUEUE[0]]);
    expect(aliceEntries(committed)).toEqual(committed.shared);
    expect(committed.newRowIndex).toBe(shared.length);
    expect(committed.broadcastIndex).toBe(1);
    expect(canBroadcast(committed)).toBe(true);

    const flashed = clearNewRow(committed);
    expect(flashed.newRowIndex).toBeNull();
    expect(flashed.shared).toEqual(committed.shared);
  });

  it("refuses a broadcast while Alice is ahead or one is already running", () => {
    const cheating = editAliceAmount(createNotebookStory(shared), 0, 11);
    expect(beginBroadcast(cheating)).toBeNull();
    expect(canBroadcast(cheating)).toBe(false);

    const mismatch = revealMismatch(cheating);
    expect(beginBroadcast({ ...mismatch, cheatAmounts: null })).toBeNull();

    const started = beginBroadcast(createNotebookStory(shared));
    expect(beginBroadcast(started!.story)).toBeNull();
  });

  it("lands the second queued entry after the first", () => {
    const first = beginBroadcast(createNotebookStory(shared))!;
    const afterFirst = clearNewRow(commitBroadcast(first.story, first.pending));
    const second = beginBroadcast(afterFirst)!;
    const done = commitBroadcast(second.story, second.pending);

    expect(done.shared.slice(-2)).toEqual([
      BROADCAST_QUEUE[0],
      BROADCAST_QUEUE[1],
    ]);
    expect(canBroadcast(done)).toBe(false);
    expect(beginBroadcast(done)).toBeNull();
  });
});
