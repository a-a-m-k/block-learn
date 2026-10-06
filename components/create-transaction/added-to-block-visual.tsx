"use client";

import { motion, useReducedMotion } from "motion/react";

import { WireCube } from "@/components/hash-chain/visuals";
import { cn } from "@/lib/utils";

import { appear, ringFade, VISUAL_FRAME } from "./motion";

export function AddedToBlockVisual({ active = false }: { active?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        VISUAL_FRAME,
        "flex-col items-center justify-center gap-2 sm:gap-3",
      )}
    >
      <div className="relative flex size-24 items-center justify-center sm:size-32">
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{
            opacity: active || shouldReduceMotion ? 0 : 1,
          }}
          transition={shouldReduceMotion ? { duration: 0.2 } : ringFade}
          aria-hidden
        >
          {!shouldReduceMotion ? <WaitingBlockRings /> : null}
        </motion.div>
        <WireCube accent className="relative size-14 sm:size-20" />
      </div>

      {active ? (
        <motion.div
          className="flex items-center gap-1.5"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.2 } : appear}
        >
          <ChainPiece />
          <ChainLink />
          <ChainPiece />
          <ChainLink />
          <ChainPiece accent />
        </motion.div>
      ) : (
        <div className="flex h-7 items-center gap-1.5" aria-hidden />
      )}
    </div>
  );
}

function WaitingBlockRings() {
  return (
    <>
      <motion.span
        className="absolute inset-1 rounded-full border-2 border-dashed border-brand"
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.span
        className="absolute -inset-1 rounded-full border border-dashed border-brand"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.25,
        }}
      />
    </>
  );
}

function ChainPiece({ accent = false }: { accent?: boolean }) {
  return <WireCube accent={accent} className="size-7" />;
}

function ChainLink() {
  return (
    <div
      className="w-3 origin-left border-t border-dashed border-muted-foreground/50"
      aria-hidden
    />
  );
}
