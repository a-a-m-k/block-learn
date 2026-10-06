"use client";

import { FileTextIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { appear } from "./motion";
import { WaitingDots } from "./waiting-dots";

export function MempoolVisual({
  from,
  to,
  amount,
  otherCount,
  active = false,
}: {
  from: string;
  to: string;
  amount: string;
  otherCount: number;
  active?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex h-full w-full min-w-0 flex-col justify-around">
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-center rounded-t-xl border border-b-0 border-muted-foreground/50 px-2 py-1">
          <p className="caption font-semibold tracking-wide text-brand-text">
            MEMPOOL
          </p>
        </div>

        <div className="flex max-h-30 items-center border border-dashed border-muted-foreground/50 p-2 sm:p-3">
          <div className="flex min-h-16 w-full items-center justify-center gap-2 rounded-lg border border-muted-foreground/50 px-2.5 py-2 sm:px-3 sm:py-2.5">
            {active ? (
              <motion.div
                className="flex w-full items-center justify-center gap-2"
                initial={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0.2 } : appear}
              >
                <FileTextIcon
                  className="mt-0.5 size-8 shrink-0 text-muted-foreground sm:size-10"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {from} → {to}
                  </p>
                  <p className="font-medium tabular-nums text-foreground">
                    {amount}
                  </p>
                </div>
              </motion.div>
            ) : (
              <WaitingDots />
            )}
          </div>
        </div>

        <div className="flex items-center justify-center rounded-b-xl border border-t-0 border-dashed border-muted-foreground/50 px-3 py-1.5 sm:py-2.5">
          <p className="caption text-muted-foreground">
            +{otherCount} other transactions
          </p>
        </div>
      </div>
    </div>
  );
}
