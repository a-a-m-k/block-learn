import type { ReactNode } from "react";
import { FingerprintIcon } from "lucide-react";

import {
  FACE_CHROME_CLASS,
  FACE_INSET_CLASS,
  LedgerPersonFace,
  type FaceVariant,
} from "@/components/ledger/person-face";
import { cn } from "@/lib/utils";

import { blockLabel, hashLines } from "./model";

/** Shared step-visual frame — padding lives inside this height. */
export const VISUAL_FRAME = "flex h-full min-h-36 w-full min-w-0 sm:min-h-48";

export function MiniFace({
  variant,
  className,
}: {
  variant: FaceVariant;
  className?: string;
}) {
  return (
    <div className={cn(FACE_CHROME_CLASS, "size-7 sm:size-8", className)}>
      <LedgerPersonFace
        variant={variant}
        mood="happy"
        className={FACE_INSET_CLASS}
      />
    </div>
  );
}

export function HashPill({
  hash,
  accent = false,
  compact = false,
  tone,
}: {
  hash: string;
  accent?: boolean;
  compact?: boolean;
  tone?: "brand" | "destructive" | "muted";
}) {
  const [top, bottom] = hashLines(hash);
  const resolved = tone ?? (accent ? "brand" : "muted");

  return (
    <div
      className={cn(
        "min-w-0 rounded-md border font-mono caption leading-tight",
        compact
          ? "w-full px-1 py-0.5 text-center"
          : "px-2 py-1 sm:px-3 sm:py-1.5",
        resolved === "brand" && "border-brand text-brand-text",
        resolved === "destructive" && "border-destructive text-destructive",
        resolved === "muted" &&
          "border-muted-foreground/50 text-muted-foreground",
      )}
    >
      <p className="truncate">{top}</p>
      <p className="truncate">{bottom}</p>
    </div>
  );
}

export function BlockCard({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        VISUAL_FRAME,
        "flex-col justify-center rounded-xl border border-muted-foreground/50 px-3 py-2.5 sm:px-5 sm:py-4 lg:px-6 lg:py-5",
      )}
    >
      {children}
    </div>
  );
}

export function WireCube({
  accent = false,
  className,
}: {
  accent?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        accent ? "text-brand-text" : "text-muted-foreground/70",
        "fill-panel/45",
        className ??
          "size-14 sm:size-24 md:size-28 lg:size-32",
      )}
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden
    >
      <polygon points="50,6 88,28 50,50 12,28" />
      <polygon points="12,28 50,50 50,94 12,72" />
      <polygon points="88,28 50,50 50,94 88,72" />
    </svg>
  );
}

export function HashStamp({ hash }: { hash: string }) {
  return (
    <div
      className={cn(
        VISUAL_FRAME,
        "flex-col items-center justify-center gap-2 sm:gap-4",
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-lg border border-muted-foreground/50 sm:size-24 sm:rounded-xl lg:size-28">
        <FingerprintIcon className="size-7 text-brand-text sm:size-12 lg:size-14" />
      </div>
      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
        <p className="text-body font-medium text-foreground">Hash</p>
        <div className="rounded-md border border-brand px-2 py-1 font-mono caption text-brand-text sm:rounded-lg sm:px-4 sm:py-2 sm:text-body">
          {hash}
        </div>
      </div>
    </div>
  );
}

export function ChainCubes({
  blocks,
}: {
  blocks: readonly { number: number; hash: string; current: boolean }[];
}) {
  return (
    <div className={cn(VISUAL_FRAME, "items-center")}>
      {blocks.map((block, index) => (
        <div key={block.number} className="flex min-w-0 flex-1 items-center">
          {index > 0 ? (
            <div
              className="w-2 shrink-0 border-t border-dashed border-muted-foreground/50 sm:w-4"
              aria-hidden
            />
          ) : null}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-1 sm:gap-1.5">
            <p
              className={cn(
                "font-mono caption font-semibold",
                block.current ? "text-brand-text" : "text-muted-foreground",
              )}
            >
              {blockLabel(block.number)}
            </p>
            <WireCube accent={block.current} />
            <HashPill hash={block.hash} accent={block.current} compact />
          </div>
        </div>
      ))}
    </div>
  );
}
