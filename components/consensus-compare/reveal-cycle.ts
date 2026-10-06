"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export const REVEAL_WAIT_MS = 2200;
export const REVEAL_HOLD_MS = 3200;
/** How often each miner tries a new hash during the PoW race. */
export const HASH_TICK_MS = 55;

/** Loops waiting → revealed so MiniChain can append a cube. */
export function useRevealCycle(enabled = true) {
  const shouldReduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(!enabled);

  useEffect(() => {
    if (!enabled || shouldReduceMotion) {
      setRevealed(true);
      return;
    }

    let waitId = 0;
    let holdId = 0;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      setRevealed(false);
      waitId = window.setTimeout(() => {
        setRevealed(true);
        holdId = window.setTimeout(start, REVEAL_HOLD_MS);
      }, REVEAL_WAIT_MS);
    };

    start();

    return () => {
      cancelled = true;
      window.clearTimeout(waitId);
      window.clearTimeout(holdId);
    };
  }, [enabled, shouldReduceMotion]);

  return {
    revealed,
    pending: enabled && !revealed && !shouldReduceMotion,
  };
}
