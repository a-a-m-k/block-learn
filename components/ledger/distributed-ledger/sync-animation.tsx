"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RefreshCwIcon } from "lucide-react";

import { SYNC_ANIM_S } from "./model";
import { ScreenCenter } from "./screen-center";

type CenterSyncAnimationProps = {
  onComplete?: () => void;
  /** Extra note under the badge. Rendered on the stacked layout only. */
  detail?: ReactNode;
};

export function CenterSyncAnimation({
  onComplete,
  detail,
}: CenterSyncAnimationProps) {
  const done = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-background/70 md:hidden"
        aria-hidden
      />
      <ScreenCenter
        trackViewport={Boolean(detail)}
        className={detail ? "w-[min(100%-2rem,20rem)]" : "w-max"}
      >
        <motion.div
          className="flex w-full flex-col items-center gap-2"
          aria-live="polite"
          initial={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: [0, 1, 1, 0] }
              : { opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.96] }
          }
          transition={{
            duration: shouldReduceMotion ? 0.4 : SYNC_ANIM_S,
            times: [0, 0.12, 0.8, 1],
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            if (done.current) return;
            done.current = true;
            onComplete?.();
          }}
        >
          <div className="relative flex size-20 items-center justify-center sm:size-24">
            {!shouldReduceMotion && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border border-brand/70"
                  initial={{ scale: 0.55, opacity: 0.85 }}
                  animate={{ scale: 1.55, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    repeat: Infinity,
                  }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-brand/40"
                  initial={{ scale: 0.55, opacity: 0.85 }}
                  animate={{ scale: 1.55, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                />
              </>
            )}
            <div className="relative flex size-14 items-center justify-center rounded-full border border-brand bg-card shadow-card sm:size-16">
              {shouldReduceMotion ? (
                <RefreshCwIcon className="size-6 text-brand-text sm:size-7" />
              ) : (
                <motion.span
                  className="inline-flex"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.1,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <RefreshCwIcon className="size-6 text-brand-text sm:size-7" />
                </motion.span>
              )}
            </div>
          </div>
          <p className="rounded-full border border-brand/40 bg-card px-3 py-1 caption font-semibold tracking-wide text-brand-text uppercase shadow-card">
            Syncing…
          </p>
          {detail}
        </motion.div>
      </ScreenCenter>
    </>
  );
}
