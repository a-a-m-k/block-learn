"use client";

import { useCallback, useState } from "react";
import { ArrowLeftIcon, CircleCheckIcon, PointerIcon } from "lucide-react";

import type { AmountEditSession } from "@/components/mobile-editable-numeric";
import { cn } from "@/lib/utils";

export type AmountGuidePhase = "hint" | "confirm" | "saved";

export function useAmountGuide() {
  const [phase, setPhase] = useState<AmountGuidePhase>("hint");

  const onEditSession = useCallback((event: AmountEditSession) => {
    setPhase((current) => {
      if (event === "start") return "confirm";
      if (event === "commit") return "saved";
      return current === "saved" ? "saved" : "hint";
    });
  }, []);

  const reset = useCallback(() => setPhase("hint"), []);

  return { phase, onEditSession, reset };
}

/** Desktop callout that points at the first amount’s pencil. */
export function TransactionHintBubble({
  className,
  title = "Try changing a transaction",
  detail,
}: {
  className?: string;
  title?: string;
  detail?: string;
}) {
  return (
    <div className={cn("pointer-events-none flex items-center", className)}>
      <ArrowLeftIcon className="size-icon shrink-0 text-brand" aria-hidden />
      <aside
        role="note"
        className="callout flex w-max max-w-56 items-start border-brand/40 bg-surface-raised text-foreground shadow-brand"
      >
        <PointerIcon className="size-icon shrink-0 text-brand-text" aria-hidden />
        <p className="min-w-0">
          <span className="block font-semibold text-brand-text">{title}</span>
          {detail ? (
            <span className="block text-chrome text-muted-foreground">{detail}</span>
          ) : null}
        </p>
      </aside>
    </div>
  );
}

/** Phone banner for the hint, the confirm step, and the saved step. */
export function TransactionHintBanner({
  phase,
  className,
  hint = "Try changing a transaction",
  compact = false,
}: {
  phase: AmountGuidePhase;
  className?: string;
  hint?: string;
  compact?: boolean;
}) {
  const saved = phase === "saved";
  const Icon = phase === "hint" ? PointerIcon : saved ? CircleCheckIcon : null;

  return (
    <aside
      aria-live="polite"
      className={cn(
        "flex items-center border border-brand/40 bg-surface-raised text-brand-text motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200",
        compact
          ? "gap-1.5 rounded-md px-2.5 py-1.5 text-chrome leading-snug"
          : "callout shadow-brand",
        className,
      )}
    >
      {Icon ? (
        <Icon
          className={cn("shrink-0", compact ? "size-icon-sm" : "size-icon")}
          aria-hidden
        />
      ) : null}
      <p className="min-w-0 font-medium">
        {saved ? (
          <>
            <span className="block">Transaction updated!</span>
            <span className="block font-normal">
              See how it affects the next block.
            </span>
          </>
        ) : phase === "confirm" ? (
          "Change the amount and confirm."
        ) : (
          hint
        )}
      </p>
    </aside>
  );
}
