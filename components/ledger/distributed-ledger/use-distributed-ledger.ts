"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { delay } from "motion";

import { entriesFromBlock } from "@/components/ledger/entries";
import type { ContentBlock } from "@/lib/chapter-content";

import { BROADCAST_QUEUE, NEW_ROW_FLASH_S, REVERT_S, WARN_S } from "./model";
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
  type PendingBroadcast,
} from "./story";

type CancelRef = MutableRefObject<VoidFunction | null>;

function wait(seconds: number, store: CancelRef) {
  return new Promise<void>((resolve) => {
    store.current?.();
    store.current = delay(() => {
      store.current = null;
      resolve();
    }, seconds);
  });
}

export function useDistributedLedger(
  block: Extract<ContentBlock, { type: "distributed-ledger" }>,
) {
  const [story, setStory] = useState(() =>
    createNotebookStory(entriesFromBlock(block.entries)),
  );

  const cancelCheat = useRef<VoidFunction | null>(null);
  const cancelFlash = useRef<VoidFunction | null>(null);
  const cheatGen = useRef(0);
  const syncGen = useRef(0);
  const pendingBroadcast = useRef<(PendingBroadcast & { gen: number }) | null>(
    null,
  );

  useEffect(() => {
    const cancelCheatFn = cancelCheat;
    const cancelFlashFn = cancelFlash;
    return () => {
      cancelCheatFn.current?.();
      cancelFlashFn.current?.();
      syncGen.current += 1;
      cheatGen.current += 1;
    };
  }, []);

  async function scheduleRevert() {
    const gen = ++cheatGen.current;
    cancelCheat.current?.();

    await wait(WARN_S, cancelCheat);
    if (gen !== cheatGen.current) return;

    setStory((current) => revealMismatch(current));

    await wait(REVERT_S - WARN_S, cancelCheat);
    if (gen !== cheatGen.current) return;

    setStory((current) => revertCheat(current));
  }

  function setAliceAmount(index: number, amount: number) {
    if (story.status === "broadcasting") return;

    setStory((current) => editAliceAmount(current, index, amount));
    void scheduleRevert();
  }

  function broadcastNext() {
    const started = beginBroadcast(story);
    if (!started) return;

    cheatGen.current += 1;
    cancelCheat.current?.();
    cancelFlash.current?.();

    const gen = ++syncGen.current;
    pendingBroadcast.current = { ...started.pending, gen };
    setStory(started.story);
  }

  async function finishBroadcast() {
    const pending = pendingBroadcast.current;
    if (!pending || pending.gen !== syncGen.current) return;
    pendingBroadcast.current = null;

    setStory((current) => commitBroadcast(current, pending));

    await wait(NEW_ROW_FLASH_S, cancelFlash);
    if (pending.gen !== syncGen.current) return;

    setStory((current) => clearNewRow(current));
  }

  return {
    shared: story.shared,
    aliceEntries: aliceEntries(story),
    status: story.status,
    mismatching: isMismatching(story),
    newRowIndex: story.newRowIndex,
    canBroadcast: canBroadcast(story),
    nextBroadcast: BROADCAST_QUEUE[story.broadcastIndex],
    setAliceAmount,
    broadcastNext,
    finishBroadcast,
  };
}
