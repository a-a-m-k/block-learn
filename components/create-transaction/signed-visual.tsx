"use client";

import { CheckIcon, KeyRoundIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { appear, VISUAL_FRAME } from "./motion";
import { WaitingDots } from "./waiting-dots";

export function SignedVisual({
  signature,
  active = false,
}: {
  signature: string;
  active?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        VISUAL_FRAME,
        "grid grid-rows-[1fr_auto] items-center justify-items-center gap-2 sm:gap-3",
      )}
    >
      <div className="relative flex size-20 items-center justify-center rounded-full border border-dashed border-brand sm:size-25">
        <KeyRoundIcon
          className="size-10 text-brand-text sm:size-12"
          strokeWidth={1.5}
        />
        <motion.span
          className="absolute -right-0.5 -bottom-0.5 flex size-5 items-center justify-center rounded-full bg-brand text-brand-foreground"
          initial={false}
          animate={
            active
              ? { opacity: 1, scale: 1 }
              : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.85 }
          }
          transition={shouldReduceMotion ? { duration: 0.2 } : appear}
        >
          <CheckIcon className="size-3" aria-hidden />
        </motion.span>
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="caption text-muted-foreground">Signature</p>
        <div className="flex h-8 w-full items-center justify-center rounded-lg border border-muted-foreground/50 px-2">
          {active ? (
            <motion.p
              className="font-mono caption text-brand-text"
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0.2 } : appear}
            >
              {signature}
            </motion.p>
          ) : (
            <WaitingDots />
          )}
        </div>
      </div>
    </div>
  );
}
