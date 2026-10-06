"use client";

import { motion, useReducedMotion } from "motion/react";
import { WireCube } from "@/components/hash-chain/visuals";
import { cn } from "@/lib/utils";

import { accentText } from "./compare-layout";
import { springPop } from "./motion";
import type { CompareAccent } from "./types";

export function MiniChain({
  accent,
  pending = false,
}: {
  accent: CompareAccent;
  pending?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const cubeClass = cn("size-full", accentText(accent));

  return (
    <div
      className="flex h-8 w-[7rem] items-center @[28rem]/stage:h-10 @[28rem]/stage:w-[8.5rem]"
      aria-hidden
    >
      {[0, 1, 2].map((index) => {
        const incoming = index === 2;
        const hidden = incoming && pending;

        return (
          <div key={index} className="flex items-center">
            {index > 0 ? (
              <motion.div
                className="h-px w-2 origin-left bg-muted-foreground/50"
                initial={false}
                animate={{
                  transform:
                    hidden && !shouldReduceMotion ? "scaleX(0)" : "scaleX(1)",
                  opacity: hidden ? 0 : 1,
                }}
                transition={springPop}
              />
            ) : null}
            <motion.div
              className="flex size-8 shrink-0 items-center justify-center @[28rem]/stage:size-10"
              initial={false}
              animate={
                shouldReduceMotion
                  ? { opacity: hidden ? 0 : 1 }
                  : {
                      opacity: hidden ? 0 : 1,
                      transform: hidden
                        ? "translateX(8px) scale(0.7)"
                        : "translateX(0px) scale(1)",
                    }
              }
              transition={springPop}
            >
              <WireCube className={cubeClass} />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
