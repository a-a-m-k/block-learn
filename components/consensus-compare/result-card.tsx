"use client";

import { CoinsIcon, HourglassIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faceIfKnown } from "@/components/ledger/characters";
import { cn } from "@/lib/utils";

import {
  COMPARE_CARD_SHELL,
  COMPARE_STAGE_ROWS,
  COMPARE_VISUAL_SLOT,
  accentText,
} from "./compare-layout";
import { MiniChain } from "./mini-chain";
import { springPop } from "./motion";
import type { CompareAccent, ConsensusResult } from "./types";
import { useRevealCycle } from "./reveal-cycle";
import { WinnerIcon } from "./winner-icon";

function withWinnerName(template: string, name?: string) {
  if (!name) return template;
  return template.replaceAll("{name}", name);
}

export function CompareResultCard({
  result,
  accent,
  pending: pendingProp,
  cyclePending = false,
  winnerName,
  followName,
}: {
  result: ConsensusResult;
  accent: CompareAccent;
  pending?: boolean;
  cyclePending?: boolean;
  winnerName?: string;
  followName?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const cycle = useRevealCycle(cyclePending);
  const pending = cyclePending ? cycle.pending : Boolean(pendingProp);
  const scanningName = pending ? followName : undefined;
  const displayName = scanningName ?? winnerName;
  const headline = pending
    ? (scanningName ?? "Waiting")
    : withWinnerName(result.headline, winnerName);
  const text = pending
    ? (result.waitingText ?? result.text)
    : withWinnerName(result.text, winnerName);
  const showReward = Boolean(result.reward) && !pending;
  const showHourglass = pending && !scanningName;
  const displayVariant = faceIfKnown(displayName);

  return (
    <div className={cn(COMPARE_CARD_SHELL, "items-center")}>
      <p className={cn("min-h-6 text-center", accentText(accent))}>{headline}</p>
      <div
        className={cn(
          "grid w-full flex-1 justify-items-center gap-y-1",
          COMPARE_STAGE_ROWS,
        )}
      >
        <div className="min-h-6" aria-hidden />
        <div className={COMPARE_VISUAL_SLOT}>
          <AnimatePresence mode="popLayout" initial={false}>
            {showHourglass ? (
              <motion.span
                key="waiting"
                className="flex aspect-square h-full items-center justify-center"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "scale(0.85)" }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, transform: "scale(1)" }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "scale(0.85)" }
                }
                transition={springPop}
              >
                <HourglassIcon
                  className="size-full text-muted-foreground"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </motion.span>
            ) : (
              <motion.span
                key={displayName ?? "winner"}
                className="flex aspect-square h-full items-center justify-center"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "scale(0.85)" }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, transform: "scale(1)" }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "scale(0.85)" }
                }
                transition={springPop}
              >
                <WinnerIcon
                  variant={displayVariant}
                  accent={accent}
                  showTrophy={!pending}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <p className="flex min-h-6 items-center text-center text-foreground">
          {text}
        </p>
        <div className="flex h-full items-center">
          <MiniChain accent={accent} pending={pending} />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <AnimatePresence initial={false}>
            {showReward ? (
              <motion.div
                key="reward"
                className="flex w-full flex-col items-center gap-3"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "translateY(6px)" }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, transform: "translateY(0px)" }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "translateY(6px)" }
                }
                transition={springPop}
              >
                <div
                  className="w-full border-t border-muted-foreground/50"
                  aria-hidden
                />
                <p className="flex items-center gap-2 text-foreground">
                  <CoinsIcon
                    className="size-5 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {result.rewardLabel ? `${result.rewardLabel} ` : null}
                  {result.reward}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
