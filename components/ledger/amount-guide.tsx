"use client";

import { useCallback, useState } from "react";
import { CircleCheckIcon, PointerIcon } from "lucide-react";

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
    <div className={cn("pointer-events-none relative w-44", className)}>
      <div className="rounded-lg bg-blue-600 px-3 py-2 text-white shadow-lg">
        <p className="text-sm leading-snug font-semibold">{title}</p>
        {detail ? (
          <p className="mt-0.5 text-xs font-normal text-blue-100">{detail}</p>
        ) : null}
      </div>
      <svg
        viewBox="0 0 28 16"
        className="absolute top-1/2 right-full h-4 w-7 -translate-y-1/2 text-blue-500"
        aria-hidden
      >
        <path
          d="M26 8H10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M12 3.5 5 8l7 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Phone banner for the hint, the confirm step, and the saved step. */
export function TransactionHintBanner({
  phase,
  className,
  hint = "Try changing a transaction",
}: {
  phase: AmountGuidePhase;
  className?: string;
  hint?: string;
}) {
  const saved = phase === "saved";
  const Icon = phase === "hint" ? PointerIcon : saved ? CircleCheckIcon : null;

  return (
    <aside
      aria-live="polite"
      className={cn(
        "flex items-center gap-2.5 rounded-lg border border-brand/70 bg-brand/15 px-3 py-2.5 text-brand-text motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200",
        className,
      )}
    >
      {Icon ? <Icon className="size-icon shrink-0" aria-hidden /> : null}
      <p className="min-w-0 text-sm leading-snug font-medium">
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
