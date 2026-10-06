"use client";

import { useEffect, useState } from "react";
import { CircleCheckIcon, ShieldIcon, UsersIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

import type { CompareAccent, ConsensusFooter } from "./types";
import { accentBgSoft, accentText } from "./compare-layout";
import { HASH_TICK_MS, REVEAL_WAIT_MS } from "./reveal-cycle";

const pulseTransition = {
  duration: 1.1,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

/** Miners hashing in the PoW race demo. */
const POW_WORKERS = 3;

export function MethodFooter({
  footer,
  accent,
  playing = false,
  done = false,
}: {
  footer: ConsensusFooter;
  accent: CompareAccent;
  playing?: boolean;
  done?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const accentClass = accentText(accent);
  const accentBg = accentBgSoft(accent);
  const highlightVerifying = playing && !done;
  const highlightStatus = done;
  const pulse = highlightVerifying && !shouldReduceMotion;
  const isPow = accent === "pow";

  return (
    <div className="caption grid overflow-hidden rounded-lg border border-muted-foreground/50 md:grid-cols-3">
      <p className="flex min-w-0 items-center gap-2 px-3 py-2.5 text-muted-foreground sm:px-4">
        {accent === "stake" ? (
          <UsersIcon
            className="size-5 shrink-0"
            strokeWidth={1.5}
            aria-hidden
          />
        ) : null}
        <span>
          {footer.attemptsLabel}:{" "}
          <AttemptCount
            target={footer.attempts}
            workers={isPow ? POW_WORKERS : 1}
            playing={playing}
            done={done}
          />
        </span>
      </p>
      <motion.p
        className={cn(
          "flex min-w-0 items-center gap-2 border-muted-foreground/50 px-3 py-2.5 max-md:border-t md:border-l sm:px-4",
          highlightVerifying
            ? cn(accentClass, accentBg)
            : "text-muted-foreground",
        )}
        initial={false}
        animate={pulse ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
        transition={pulse ? pulseTransition : { duration: 0.2 }}
      >
        <ShieldIcon
          className="size-5 shrink-0"
          strokeWidth={1.5}
          aria-hidden
        />
        {footer.verifying}
      </motion.p>
      <p
        className={cn(
          "flex min-w-0 items-center gap-2 border-muted-foreground/50 px-3 py-2.5 max-md:border-t md:border-l sm:px-4",
          highlightStatus
            ? cn(accentClass, accentBg)
            : "text-muted-foreground",
        )}
      >
        <CircleCheckIcon className="size-5 shrink-0" aria-hidden />
        {footer.status}
      </p>
    </div>
  );
}

/**
 * Ticks up with the hash race: each interval, every worker adds another batch
 * of tries. Lands exactly on `target` when mining finishes.
 */
function AttemptCount({
  target,
  workers,
  playing,
  done,
}: {
  target: number;
  workers: number;
  playing: boolean;
  done: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const showFinal = Boolean(shouldReduceMotion) || done;
  const [display, setDisplay] = useState(showFinal ? target : 0);

  useEffect(() => {
    if (shouldReduceMotion || done) {
      setDisplay(target);
      return;
    }

    if (!playing) {
      setDisplay(0);
      return;
    }

    const countingOneByOne = target <= 20;
    const tickMs = countingOneByOne
      ? Math.max(280, Math.floor(REVEAL_WAIT_MS / (target + 1)))
      : HASH_TICK_MS;
    const tickCount = Math.max(1, Math.floor(REVEAL_WAIT_MS / tickMs));
    const perWorker = Math.max(1, Math.ceil(target / (tickCount * workers)));
    const perTick = countingOneByOne ? 1 : perWorker * workers;

    let attempts = 0;
    setDisplay(0);

    const intervalId = window.setInterval(() => {
      attempts = Math.min(target, attempts + perTick);
      setDisplay(attempts);
      if (attempts >= target) {
        window.clearInterval(intervalId);
      }
    }, tickMs);

    const settleId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      setDisplay(target);
    }, REVEAL_WAIT_MS);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(settleId);
    };
  }, [done, playing, shouldReduceMotion, target, workers]);

  return (
    <span className="tabular-nums">{display.toLocaleString("en-US")}</span>
  );
}
