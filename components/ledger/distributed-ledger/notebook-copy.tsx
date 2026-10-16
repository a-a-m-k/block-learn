"use client";

import { LedgerEntryRow } from "@/components/ledger/ledger-entry-row";
import {
  LedgerStatusChip,
  NotebookColumns,
  NotebookHeading,
  NotebookTotal,
} from "@/components/ledger/notebook-frame";
import type { NotebookTone } from "@/components/ledger/notebook";
import type {
  FaceGaze,
  FaceMood,
  FaceVariant,
} from "@/components/ledger/person-face";
import {
  FACE_CHROME_CLASS,
  FACE_INSET_CLASS,
  LedgerPersonFace,
} from "@/components/ledger/person-face";
import { cn } from "@/lib/utils";

import { MAX_AMOUNT, type AmountEntry } from "./model";

type NotebookCopyProps = {
  name: string;
  variant: FaceVariant;
  mood: FaceMood;
  gaze?: FaceGaze;
  entries: AmountEntry[];
  editable?: boolean;
  tone?: NotebookTone;
  amountTone?: "default" | "brand" | "destructive";
  newRowIndex: number | null;
  onAmountChange?: (index: number, amount: number) => void;
  /** Grid slot, used to aim the network lines. */
  position?: string;
  className?: string;
};

const TONE_BORDER = {
  default: "border-border",
  brand: "border-brand",
  destructive: "border-destructive",
} as const;

export function NotebookCopy({
  name,
  variant,
  mood,
  gaze,
  entries,
  editable,
  tone = "default",
  amountTone = "default",
  newRowIndex,
  onAmountChange,
  position,
  className,
}: NotebookCopyProps) {
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const mismatch = tone === "destructive";

  return (
    <div
      data-notebook-copy
      data-network-node={position}
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-surface",
        TONE_BORDER[tone],
        className,
      )}
    >
      <div data-notebook-body className="flex flex-1 flex-col">
      <NotebookHeading
        face={
          <div className={cn(FACE_CHROME_CLASS, "size-9 rounded-lg")}>
            <LedgerPersonFace
              variant={variant}
              mood={mood}
              gaze={gaze}
              className={FACE_INSET_CLASS}
            />
          </div>
        }
        title={`${name}'s copy`}
        detail="Shared ledger"
        status={<LedgerStatusChip mismatch={mismatch} />}
      />
      <NotebookColumns />
      <ul className="flex flex-col py-1">
        {entries.map((entry, index) => {
          const isNew = newRowIndex === index;
          return (
            <LedgerEntryRow
              key={`${entry.from}-${entry.to}-${index}`}
              from={entry.from}
              to={entry.to}
              amount={entry.amount}
              maxAmount={MAX_AMOUNT}
              isLast={index === entries.length - 1}
              rowTone={isNew ? "brand" : "default"}
              amountTone={
                amountTone !== "default"
                  ? amountTone
                  : isNew
                    ? "brand"
                    : "default"
              }
              editable={editable}
              onAmountChange={
                onAmountChange
                  ? (amount) => onAmountChange(index, amount)
                  : undefined
              }
            />
          );
        })}
      </ul>
      <div className="mt-auto">
        <NotebookTotal
          total={total}
          tone={mismatch ? "destructive" : "brand"}
        />
      </div>
      </div>
    </div>
  );
}
