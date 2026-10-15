"use client";

import { LedgerEntryRow } from "@/components/ledger/ledger-entry-row";
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
      <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <div className={cn(FACE_CHROME_CLASS, "size-9 rounded-lg")}>
          <LedgerPersonFace
            variant={variant}
            mood={mood}
            gaze={gaze}
            className={FACE_INSET_CLASS}
          />
        </div>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-white">
            {name}&apos;s copy
          </span>
          <span className="block text-xs text-gray-500">Shared ledger</span>
        </span>
        <span
          className={cn(
            "rounded-md px-2 py-1 text-[10px] font-semibold tracking-wide uppercase",
            mismatch
              ? "bg-red-950 text-red-400"
              : "bg-emerald-950 text-green-400",
          )}
        >
          {mismatch ? "Mismatch" : "Current"}
        </span>
      </div>
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] font-medium tracking-[0.14em] text-gray-600 uppercase">
        <span>Entry</span>
        <span>Amount</span>
      </div>
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
      <div className="mt-auto flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-4 py-3 text-xs">
        <span className="tracking-[0.12em] text-gray-600 uppercase">
          Total recorded
        </span>
        <span
          className={cn(
            "font-semibold",
            mismatch ? "text-red-400" : "text-blue-400",
          )}
        >
          ${total}
        </span>
      </div>
      </div>
    </div>
  );
}
