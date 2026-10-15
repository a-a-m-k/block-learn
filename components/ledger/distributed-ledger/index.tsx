"use client";

import { useLayoutEffect, useState } from "react";
import { RadioIcon, TriangleAlertIcon } from "lucide-react";

import { Callout } from "@/components/callout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ContentBlock } from "@/lib/chapter-content";

import { formatAmount } from "@/components/ledger/amounts";
import {
  CHEATER,
  gazeToward,
  moodFor,
  PEOPLE,
  POSITION_CLASS,
} from "./scene";
import { NetworkStage } from "./network-stage";
import { NotebookCopy } from "./notebook-copy";
import { CenterSyncAnimation } from "./sync-animation";
import { useDistributedLedger } from "./use-distributed-ledger";

type DistributedLedgerBlockProps = {
  block: Extract<ContentBlock, { type: "distributed-ledger" }>;
};

/** True while notebooks are stacked. Desktop network starts at md. */
function useStackedCopies() {
  const [stacked, setStacked] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = () => setStacked(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return stacked;
}

export function DistributedLedgerBlock({ block }: DistributedLedgerBlockProps) {
  const {
    shared,
    aliceEntries,
    status,
    mismatching,
    newRowIndex,
    canBroadcast,
    nextBroadcast,
    setAliceAmount,
    broadcastNext,
    finishBroadcast,
  } = useDistributedLedger(block);
  const stacked = useStackedCopies();

  const mismatchCallout =
    status === "mismatch" ? (
      <Callout
        tone="destructive"
        icon={TriangleAlertIcon}
        title="Mismatch detected."
        className="flex-col items-center border-2 border-destructive bg-background text-center shadow-xl [&_p]:text-center [&_svg]:mt-0 [&_svg]:size-icon-lg"
      >
        Bob, Emma, and Alex still have the shared record—Alice&apos;s edit is
        rejected and her copy snaps back.
      </Callout>
    ) : null;

  const broadcastCallout =
    status === "broadcasting" ? (
      <Callout
        tone="brand"
        title="Broadcasting…"
        className={stacked ? "caption bg-panel shadow-lg" : "caption"}
      >
        Every copy appends the same new entry—no one is left out.
      </Callout>
    ) : null;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-card">
      <NetworkStage
        status={status}
        overlay={
          <>
            {status === "broadcasting" ? (
              <CenterSyncAnimation
                key="sync"
                onComplete={() => void finishBroadcast()}
                detail={stacked ? broadcastCallout : null}
              />
            ) : null}
            {mismatchCallout ? (
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 z-20 flex justify-center bg-background/80 p-4",
                  stacked ? "items-start" : "items-center",
                )}
              >
                <div className="w-full max-w-sm rounded-lg bg-background">
                  {mismatchCallout}
                </div>
              </div>
            ) : null}
          </>
        }
      >
        {PEOPLE.map((person) => {
          const isCheater = person.name === CHEATER;
          const mood = moodFor(person.name, status, mismatching);
          const gaze =
            mood === "angry" || mood === "disappointed"
              ? gazeToward(person.position, "top-left")
              : undefined;

          return (
            <NotebookCopy
              key={person.name}
              name={person.name}
              position={person.position}
              variant={person.variant}
              mood={mood}
              gaze={gaze}
              entries={isCheater ? aliceEntries : shared}
              editable={isCheater && status !== "broadcasting"}
              tone={
                isCheater && status === "mismatch"
                  ? "destructive"
                  : status === "mismatch" || status === "broadcasting"
                    ? "brand"
                    : "default"
              }
              amountTone={
                isCheater && status === "mismatch" ? "destructive" : "default"
              }
              newRowIndex={newRowIndex}
              onAmountChange={isCheater ? setAliceAmount : undefined}
              className={POSITION_CLASS[person.position]}
            />
          );
        })}
      </NetworkStage>

      <div className="flex flex-col gap-3 border-t border-border bg-card p-4 sm:flex-row sm:items-center sm:p-5">
        <Button
          type="button"
          variant="default"
          className="w-full shrink-0 caption sm:w-auto"
          size="lg"
          icon={RadioIcon}
          disabled={!canBroadcast}
          onClick={broadcastNext}
        >
          {nextBroadcast
            ? `Broadcast ${nextBroadcast.from} → ${nextBroadcast.to} ${formatAmount(nextBroadcast.amount)}`
            : "All sample entries broadcast"}
        </Button>
        <p className="caption flex-1 text-muted-foreground">
          Edit Alice&apos;s amounts to try cheating, or broadcast a new
          who-owes-whom entry to every copy.
        </p>
      </div>

      {!stacked && broadcastCallout ? (
        <div className="border-t border-border p-4 sm:p-5">
          {broadcastCallout}
        </div>
      ) : null}
    </section>
  );
}
