"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useProgress } from "@/components/progress-provider";
import { FACE_BY_NAME } from "@/components/ledger/characters";
import { PersonAvatar } from "@/components/ledger/person-avatar";
import { springPop } from "@/components/consensus-compare/motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

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
        <AlertDialogHeader className="items-center gap-4 px-6 pt-8 text-center">
          <CourseMark key={burst} />
          <Badge
            variant="accent"
            shape="pill"
            className="font-medium tracking-[0.12em] uppercase"
          >
            Course complete
          </Badge>
          <AlertDialogTitle className="text-display font-semibold text-foreground">
            You&apos;re done
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-sm text-lead">
            Every quiz checks out. The chain accepted you — no forks, no
            do-overs, unless you hit Reset.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-0 bg-transparent px-6 pt-2 pb-8 sm:justify-center">
          <AlertDialogAction variant="cta" size="cta">
            Nice
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const HAPPY_CAST = [
  { name: "Alice", variant: FACE_BY_NAME.Alice },
  { name: "Emma", variant: FACE_BY_NAME.Emma },
  { name: "Alex", variant: FACE_BY_NAME.Alex },
] as const;

function CourseMark() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-end justify-center gap-6" aria-hidden>
      {HAPPY_CAST.map((person, index) => (
        <motion.div
          key={person.name}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, transform: "translateY(8px) scale(0.92)" }
          }
          animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { ...springPop, delay: index * 0.06 }
          }
        >
          <PersonAvatar
            name={person.name}
            variant={person.variant}
            mood="happy"
            faceClassName="size-mark"
          />
        </motion.div>
      ))}
    </div>
  );
}
