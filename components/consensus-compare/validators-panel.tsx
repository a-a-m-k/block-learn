"use client";

import { useEffect, useRef, useState } from "react";
import { CoinsIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { faceFor } from "@/components/ledger/characters";
import {
  FACE_CHROME_CLASS,
  FACE_INSET_CLASS,
  LedgerPersonFace,
} from "@/components/ledger/person-face";
import { cn } from "@/lib/utils";

import { CompareResultCard } from "./result-card";
import { COMPARE_CARD_SHELL, CompareSplit } from "./compare-layout";
import { springHighlight } from "./motion";
import { REVEAL_WAIT_MS } from "./reveal-cycle";
import {
  advanceStakeHighlight,
  coinCount,
  selectedIndex,
  stakeLabel,
  stakeSnapshot,
  validatorMood,
} from "./stake-model";
import type { CompareAccent, ConsensusMethod, ConsensusResult } from "./types";

type Validators = NonNullable<ConsensusMethod["validators"]>;

function useStakeHighlight(
  validators: Validators,
  playing: boolean,
  done: boolean,
  onComplete?: () => void,
) {
  const shouldReduceMotion = useReducedMotion();
  const winnerIndex = selectedIndex(validators);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [locked, setLocked] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const snapshot = stakeSnapshot({
      playing,
      done,
      reduceMotion: Boolean(shouldReduceMotion),
      validators,
      revealWaitMs: REVEAL_WAIT_MS,
    });

    if (snapshot.mode !== "walking") {
      setHighlightedIndex(snapshot.highlightedIndex);
      setLocked(snapshot.locked);
      return;
    }

    let stepId = 0;
    let index: number = snapshot.highlightedIndex;

    setLocked(snapshot.locked);
    setHighlightedIndex(snapshot.highlightedIndex);

    const tick = () => {
      const next = advanceStakeHighlight(index, validators.length, winnerIndex);
      index = next.highlightedIndex;
      setHighlightedIndex(next.highlightedIndex);
      setLocked(next.locked);
      if (next.finished) {
        onCompleteRef.current?.();
        return;
      }
      stepId = window.setTimeout(tick, snapshot.stepMs);
    };

    stepId = window.setTimeout(tick, snapshot.stepMs);

    return () => {
      window.clearTimeout(stepId);
    };
  }, [done, playing, shouldReduceMotion, validators, winnerIndex]);

  return {
    highlightedIndex,
    locked,
    pending: !locked && !shouldReduceMotion && !done,
    winnerName: validators[winnerIndex]?.name,
  };
}

export function StakeVisual({
  title,
  validators,
  result,
  accent,
  playing = false,
  done = false,
  idle = false,
  onComplete,
}: {
  title?: string;
  validators: Validators;
  result: ConsensusResult;
  accent: CompareAccent;
  playing?: boolean;
  done?: boolean;
  idle?: boolean;
  onComplete?: () => void;
}) {
  const selection = useStakeHighlight(
    validators,
    playing,
    done,
    onComplete,
  );

  return (
    <CompareSplit
      start={
        <ValidatorsPanel
          title={title}
          validators={validators}
          highlightedIndex={selection.highlightedIndex}
          locked={selection.locked}
          idle={idle}
        />
      }
      end={
        <CompareResultCard
          result={result}
          accent={accent}
          pending={selection.pending}
          winnerName={selection.winnerName}
          followName={validators[selection.highlightedIndex]?.name}
        />
      }
    />
  );
}

export function ValidatorsPanel({
  title,
  validators,
  highlightedIndex,
  locked = false,
  idle = false,
}: {
  title?: string;
  validators: Validators;
  highlightedIndex?: number;
  locked?: boolean;
  idle?: boolean;
}) {
  const maxStake = Math.max(...validators.map((v) => v.stake));
  const winnerIndex = selectedIndex(validators);

  return (
    <div className={cn(COMPARE_CARD_SHELL, "gap-3 border-stake/50")}>
      {title ? (
        <p className="min-h-6 text-center text-foreground">{title}</p>
      ) : null}
      <div className="grid flex-1 grid-cols-[repeat(3,minmax(5rem,1fr))] items-start gap-3">
        {validators.map((validator, index) => {
          const active = highlightedIndex === index;
          const selected = locked && index === winnerIndex;
          const emphasized = active || selected;

          return (
            <motion.div
              key={validator.name}
              className="flex flex-col items-center gap-1.5 rounded-lg px-1 py-1"
              initial={false}
              animate={{
                transform: emphasized ? "scale(1.06)" : "scale(1)",
                opacity: locked && !selected ? 0.55 : 1,
              }}
              transition={springHighlight}
            >
              <p
                className={cn(
                  "text-body font-medium",
                  emphasized ? "text-stake" : "text-foreground",
                )}
              >
                {validator.name}
              </p>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    FACE_CHROME_CLASS,
                    "size-12",
                    emphasized && "border-stake",
                  )}
                >
                  <LedgerPersonFace
                    variant={faceFor(validator.name)}
                    mood={validatorMood({ selected, locked, active })}
                    className={FACE_INSET_CLASS}
                  />
                </div>
                <CoinsIcon
                  className={cn(
                    "size-6",
                    emphasized ? "text-stake" : "text-muted-foreground",
                  )}
                  strokeWidth={1.25}
                  aria-hidden
                />
              </div>
              <p
                className={cn(
                  "caption",
                  idle || emphasized ? "text-stake" : "text-muted-foreground",
                )}
              >
                {stakeLabel(idle)}
              </p>
              <p
                className={cn(
                  "text-body font-semibold tabular-nums leading-none",
                  idle && "invisible",
                  emphasized ? "text-stake" : "text-foreground",
                )}
              >
                {validator.stake}
              </p>
              <div
                className={cn(
                  "flex flex-wrap justify-center gap-0.5",
                  idle && "invisible",
                )}
                aria-hidden
              >
                {Array.from({ length: coinCount(validator.stake, maxStake) }).map(
                  (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-sm",
                        emphasized ? "text-stake" : "text-muted-foreground",
                      )}
                    >
                      $
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
