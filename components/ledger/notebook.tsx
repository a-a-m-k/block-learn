"use client";

import type { ReactNode } from "react";

import {
  FACE_CHROME_CLASS,
  FACE_INSET_CLASS,
  LedgerPersonFace,
  type FaceGaze,
  type FaceMood,
  type FaceVariant,
} from "@/components/ledger/person-face";
import { cn } from "@/lib/utils";

const TONE_BORDER = {
  default: "border-muted-foreground",
  brand: "border-brand",
  destructive: "border-destructive",
} as const;

export type NotebookTone = keyof typeof TONE_BORDER;

type NotebookProps = {
  name: string;
  /** Shown after the name: “Alice’s notebook” / “Alice’s copy”. */
  label: "notebook" | "copy";
  variant: FaceVariant;
  mood: FaceMood;
  gaze?: FaceGaze;
  tone?: NotebookTone;
  children: ReactNode;
  className?: string;
};

/** Shared ledger notebook shell (header face, title, spine, content). */
export function Notebook({
  name,
  label,
  variant,
  mood,
  gaze,
  tone = "default",
  children,
  className,
}: NotebookProps) {
  const isCopy = label === "copy";

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-md border-2 bg-panel transition-colors duration-300 motion-reduce:transition-none",
        TONE_BORDER[tone],
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center border-b border-muted-foreground/50",
          isCopy
            ? "h-8 gap-1.5 px-1.5 sm:h-10 sm:gap-2 sm:px-2.5 md:h-14 md:px-4"
            : "gap-2.5 px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-3",
        )}
      >
        <div
          className={cn(
            FACE_CHROME_CLASS,
            isCopy ? "size-5 sm:size-7 md:size-8" : "aspect-square w-1/4",
          )}
        >
          <LedgerPersonFace
            variant={variant}
            mood={mood}
            gaze={gaze}
            className={FACE_INSET_CLASS}
          />
        </div>
        <p
          className={cn(
            "min-w-0 truncate font-semibold tracking-wide text-foreground",
            isCopy ? "caption sm:text-body" : "text-body",
          )}
          title={`${name}'s ${label}`}
        >
          {name}&apos;s {label}
        </p>
      </div>

      <div className={cn("flex", isCopy ? "shrink-0" : "min-h-0 flex-1")}>
        <div
          className={cn(
            "flex shrink-0 flex-col items-center justify-evenly border-r border-muted-foreground/50",
            isCopy
              ? "w-[8%] min-w-2.5 py-0.5 sm:w-[10%] sm:min-w-3 sm:py-1.5 md:min-w-3.5"
              : "w-[10%] min-w-3 py-1 sm:min-w-3.5 sm:py-2",
          )}
          aria-hidden
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-1/2 rounded-full bg-muted-foreground/70",
                isCopy
                  ? "h-1 min-w-1 sm:h-1.5 sm:min-w-1.5"
                  : "h-1 min-w-1.5 sm:h-1.5",
              )}
            />
          ))}
        </div>
        <div
          className={cn(
            "min-w-0 flex-1 overflow-x-hidden",
            isCopy ? "overflow-y-visible" : "min-h-0 overflow-y-auto",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
