"use client";

import { LedgerEntryRow } from "@/components/ledger/ledger-entry-row";
import { Notebook, type NotebookTone } from "@/components/ledger/notebook";
import { PersonAvatar } from "@/components/ledger/person-avatar";
import type {
  FaceGaze,
  FaceMood,
  FaceVariant,
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
  return (
    <div className={cn("flex flex-col items-center gap-1 sm:gap-1 md:gap-1.5", className)}>
      <PersonAvatar
        name={name}
        variant={variant}
        mood={mood}
        gaze={gaze}
        className="hidden w-full shrink-0 md:flex"
        faceClassName="size-8 sm:h-auto sm:w-1/5 sm:max-w-12 sm:aspect-square md:max-w-14 lg:max-w-16"
        namePlacement="stack"
      />

      <Notebook
        name={name}
        label="copy"
        variant={variant}
        mood={mood}
        gaze={gaze}
        tone={tone}
        className="w-full"
      >
        <ul className="flex min-w-0 flex-col md:min-h-48">
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
