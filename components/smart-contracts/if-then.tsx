"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  LINE_STEP_MS,
  SWAP_LINES,
  advanceSwapLine,
  beginSwapLines,
  ethInAmount,
  reducedSwap,
  requestSwap,
  swapLineAppearance,
  type IfThenPhase,
} from "./if-then-model";
import { SC_MONO, ScPanel } from "./shell";

export function SmartContractIfThen() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<IfThenPhase>("idle");
  const [line, setLine] = useState(-1);

  useEffect(() => {
    if (phase !== "running") return;

    if (reduced) {
      const done = reducedSwap(SWAP_LINES.length);
      setLine(done.line);
      setPhase(done.phase);
      return;
    }

    const started = beginSwapLines();
    let step = started.step;
    setLine(started.line);
    const id = window.setInterval(() => {
      const next = advanceSwapLine(step, SWAP_LINES.length);
      step = next.step;
      if (next.phase === "done") {
        window.clearInterval(id);
        setPhase("done");
        return;
      }
      setLine(next.line);
    }, LINE_STEP_MS);

    return () => window.clearInterval(id);
  }, [phase, reduced]);

  function handleSend() {
    const next = requestSwap(phase);
    if (!next) return;
    setLine(next.line);
    setPhase(next.phase);
  }

  return (
    <figure aria-label="If-this-then-that swap contract demo">
      <ScPanel>
        <p className="caption text-muted-foreground">
          Same check her wallet is asking her to sign: if enough ETH came in, send USDC to Alice.
        </p>

        <div className={SC_MONO} aria-hidden={false}>
          {SWAP_LINES.map((row, index) => {
            const { active, current } = swapLineAppearance(phase, index, line);
            return (
              <motion.p
                key={row.code}
                className={cn(
                  "whitespace-pre transition-colors",
                  active ? "text-foreground" : "text-muted-foreground/50",
                  current && "text-brand-text",
                )}
                animate={
                  current && !reduced
                    ? { opacity: [0.55, 1, 0.55] }
                    : { opacity: 1 }
                }
                transition={
                  current && !reduced
                    ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
              >
                {row.code}
              </motion.p>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="cta"
            size="sm"
            disabled={phase === "running"}
            onClick={handleSend}
          >
            {phase === "done" ? "Replay" : "Confirm swap"}
          </Button>
          <p className="caption text-muted-foreground">
            ethIn = {ethInAmount(phase)} ETH
          </p>
        </div>

        <AnimatePresence>
          {phase === "done" ? (
            <motion.div
              className="flex flex-col gap-2 border-t border-muted-foreground/40 pt-4"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="inline-flex items-center gap-2 text-body text-brand-text">
                <CheckIcon className="size-icon" aria-hidden />
                Condition met
              </p>
              <p className="inline-flex items-center gap-2 text-body text-foreground">
                <CheckIcon className="size-icon text-brand-text" aria-hidden />
                ~220 USDC sent to Alice
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </ScPanel>
    </figure>
  );
}
