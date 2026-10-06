"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export function WaitingDots({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-hidden
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="size-1.5 rounded-full bg-muted-foreground"
          animate={
            shouldReduceMotion
              ? { opacity: 0.55 }
              : { opacity: [0.25, 1, 0.25] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.28,
                }
          }
        />
      ))}
    </span>
  );
}
