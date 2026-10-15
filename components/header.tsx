"use client";

import Link from "next/link";
import { RotateCcwIcon } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { formatCompletedQuestions } from "@/lib/progress";
import { useProgress } from "@/components/progress-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Header() {
  const { completedQuestionCount, totalQuestions, hydrated, reset } =
    useProgress();

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <div className="flex min-w-0 items-center gap-(--spacing-chrome-gap)">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <Link
            href="/"
            className="rounded-md font-['DM_Sans:Bold'] text-xs text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Blockchain basics
          </Link>
          <p
            role="status"
            aria-live="polite"
            className="truncate font-['DM_Sans:Regular'] text-[9px] text-muted-foreground"
          >
            {hydrated
              ? formatCompletedQuestions(completedQuestionCount, totalQuestions)
              : "\u00a0"}
          </p>
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger
          variant="ghost"
          size="sm"
          icon={RotateCcwIcon}
          className="shrink-0 gap-2 text-[10px] text-foreground"
        >
          Reset
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader className="gap-1 px-4 py-5">
            <AlertDialogTitle className="text-title font-medium text-foreground">
              Reset progress?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-body">
              This clears quiz progress on this device. You can start the course
              again anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="softOutline" size="cta">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              size="cta"
              onClick={reset}
            >
              Reset progress
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
