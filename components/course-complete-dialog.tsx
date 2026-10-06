"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useProgress } from "@/components/progress-provider";
import { WireCube } from "@/components/hash-chain/visuals";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const CONFETTI = [
  { x: -78, y: -58, spin: -48, delay: 0.02, tone: "bg-brand" },
  { x: 76, y: -50, spin: 42, delay: 0.06, tone: "bg-success" },
  { x: -34, y: -78, spin: 22, delay: 0.1, tone: "bg-stake" },
  { x: 38, y: -74, spin: -26, delay: 0.04, tone: "bg-pow" },
  { x: -98, y: -16, spin: 58, delay: 0.12, tone: "bg-primary" },
  { x: 96, y: -12, spin: -34, delay: 0.08, tone: "bg-brand" },
  { x: -8, y: -86, spin: 14, delay: 0.14, tone: "bg-success" },
  { x: 14, y: -82, spin: -16, delay: 0.16, tone: "bg-stake" },
] as const;

const hop = {
  duration: 1.05,
  times: [0, 0.28, 0.5, 0.72, 1],
  ease: [0.22, 1, 0.36, 1] as const,
};

export function CourseCompleteDialog() {
  const { completedQuestionCount, totalQuestions, hydrated } = useProgress();
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);
  const ready = useRef(false);
  const wasComplete = useRef(false);

  useEffect(() => {
    if (!hydrated || totalQuestions === 0) return;

    const complete = completedQuestionCount >= totalQuestions;
    if (ready.current && !wasComplete.current && complete) {
      setBurst((value) => value + 1);
      setOpen(true);
    }
    wasComplete.current = complete;
    ready.current = true;
  }, [completedQuestionCount, hydrated, totalQuestions]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="items-center gap-3 px-4 py-6 text-center">
          <Celebration key={burst} />
          <AlertDialogTitle className="text-title font-medium text-foreground">
            You&apos;re done
          </AlertDialogTitle>
          <AlertDialogDescription className="text-body">
            Every quiz checks out. The chain accepted you — no forks, no
            do-overs, unless you hit Reset.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction variant="cta" size="cta">
            Nice
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Celebration() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative flex h-32 w-full items-end justify-center overflow-hidden"
      aria-hidden
    >
      {reduceMotion ? null : <Confetti />}
      <motion.div
        className="relative mb-2"
        initial={{
          opacity: 0,
          transform: "translateY(20px) scale(0.7)",
        }}
        animate={
          reduceMotion
            ? { opacity: 1, transform: "translateY(0px) scale(1)" }
            : {
                opacity: 1,
                transform: [
                  "translateY(20px) scale(0.7)",
                  "translateY(-22px) scale(1.12)",
                  "translateY(0px) scale(1)",
                  "translateY(-12px) scale(1.06)",
                  "translateY(0px) scale(1)",
                ],
              }
        }
        transition={reduceMotion ? { duration: 0.15 } : hop}
      >
        <motion.div
          className="relative"
          animate={
            reduceMotion
              ? undefined
              : { transform: ["rotate(-8deg)", "rotate(8deg)", "rotate(-8deg)"] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 0.55,
                  delay: hop.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <PartyHat />
          <WireCube accent className="size-16" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function PartyHat() {
  return (
    <svg
      viewBox="0 0 28 18"
      className="absolute -top-3 left-1/2 z-10 w-7 -translate-x-1/2 text-stake"
      aria-hidden
    >
      <path d="M14 1 L26 17 L2 17 Z" fill="currentColor" />
      <circle cx="14" cy="2.5" r="2.5" className="text-brand-text" fill="currentColor" />
    </svg>
  );
}

function Confetti() {
  return (
    <>
      {CONFETTI.map((bit) => (
        <motion.span
          key={`${bit.x}-${bit.y}`}
          className={cn(
            "absolute bottom-8 left-1/2 size-2 rounded-sm",
            bit.tone,
          )}
          initial={{
            opacity: 0,
            transform: "translate(-50%, 0px) rotate(0deg) scale(0.3)",
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            transform: [
              "translate(-50%, 0px) rotate(0deg) scale(0.3)",
              `translate(calc(-50% + ${bit.x}px), ${bit.y}px) rotate(${bit.spin}deg) scale(1)`,
              `translate(calc(-50% + ${bit.x}px), ${bit.y + 28}px) rotate(${bit.spin * 1.6}deg) scale(1)`,
              `translate(calc(-50% + ${bit.x}px), ${bit.y + 52}px) rotate(${bit.spin * 2}deg) scale(0.7)`,
            ],
          }}
          transition={{
            duration: 1.15,
            delay: bit.delay,
            times: [0, 0.32, 0.68, 1],
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}
