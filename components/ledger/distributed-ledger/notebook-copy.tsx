"use client";

import { LedgerEntryRow } from "@/components/ledger/ledger-entry-row";
import { Notebook, type NotebookTone } from "@/components/ledger/notebook";
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
  className?: string;
};

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
  className,
}: NotebookCopyProps) {
  const avatarTone =
    tone === "destructive"
      ? "border-destructive"
      : tone === "brand"
        ? "border-brand"
        : "border-border";

  return (
    <div className={cn("relative min-w-0 pt-5 sm:pt-6", className)}>
      <div
        className={cn(
          FACE_CHROME_CLASS,
          "absolute left-4 top-0 z-10 size-11 border-2 transition-colors duration-300 sm:left-5 sm:size-12 lg:size-14",
          avatarTone,
        )}
      >
        <LedgerPersonFace
          variant={variant}
          mood={mood}
          gaze={gaze}
          className={FACE_INSET_CLASS}
        />
      </div>
      <Notebook
        name={name}
        label="copy"
        variant={variant}
        mood={mood}
        gaze={gaze}
        tone={tone}
        showAvatar={false}
        className="w-full rounded-xl bg-card shadow-card [&>div:first-child]:pl-16 sm:[&>div:first-child]:pl-20"
      >
        <ul className="flex min-w-0 flex-col">
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
                compact
                className="min-h-0 min-w-0"
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
      </Notebook>
    </div>
  );
}
