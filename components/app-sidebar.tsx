"use client";

import type * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
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
import { Progress, ProgressValue } from "@/components/ui/progress";
import { ChapterSidebarItem } from "@/components/chapter-sidebar-item";
import { chapters, totalChapters } from "@/lib/course";
import { chapterPath } from "@/lib/site";
import { useProgress } from "@/components/progress-provider";
import { formatCompletedQuestions } from "@/lib/progress";
import { RotateCcwIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const {
    progressPercent,
    completedQuestionCount,
    totalQuestions,
    hydrated,
    reset,
  } = useProgress();

  function closeMobileSidebar() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Sidebar
      {...props}
      className={cn("border-r border-[#22252a] bg-sidebar", props.className)}
    >
      <SidebarHeader className="gap-0 p-0">
        <div className="flex h-[72px] w-full items-center justify-between gap-[11px] border-b border-[#202328] px-[18px]">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className="flex min-w-0 items-center gap-[11px] rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="flex size-[37px] shrink-0 items-center justify-center rounded-[9px] bg-[linear-gradient(145deg,#3989ff_6%,#1458c5_94%)]">
              <Image
                src="/assets/design-7-5/sidebar-logo.svg"
                alt=""
                width={18}
                height={18}
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-['DM_Sans:Bold'] text-[12px] leading-[18px] text-white">
                Blocklearn
              </span>
              <span className="pt-[3px] font-['DM_Sans:Regular'] text-[9px] leading-[13.5px] text-[#6f7782]">
                {totalChapters} chapters
              </span>
            </span>
          </Link>
          <Button
            onClick={closeMobileSidebar}
            variant="ghost"
            size="icon-sm"
            aria-label="Close sidebar"
            className="shrink-0 text-muted-foreground lg:hidden"
          >
            <XIcon className="size-icon" aria-hidden />
          </Button>
        </div>
        <div className="border-b border-[#202328] px-[18px] pt-[19px] pb-[17px]">
          <Progress
            label="Your progress"
            value={hydrated ? progressPercent : 0}
            aria-busy={!hydrated || undefined}
            className="gap-0 font-['DM_Sans:Bold'] text-[11px] leading-[16.5px] text-[#f2f4f8] [&_[data-slot=progress-indicator]]:bg-[#3282ff] [&_[data-slot=progress-indicator]]:shadow-[0_0_7px_#3282ff] [&_[data-slot=progress-label]]:py-0 [&_[data-slot=progress-track]]:mt-3 [&_[data-slot=progress-track]]:h-[3px] [&_[data-slot=progress-track]]:rounded-[4px] [&_[data-slot=progress-track]]:bg-[#25282d] [&_[data-slot=progress-value]]:font-['Space_Mono:Bold'] [&_[data-slot=progress-value]]:text-[10px] [&_[data-slot=progress-value]]:text-[#61a0ff]"
          >
            <ProgressValue />
          </Progress>
          <p
            role="status"
            aria-live="polite"
            className="mt-2 font-['DM_Sans:Regular'] text-[8px] leading-3 text-[#525a65]"
          >
            {hydrated
              ? formatCompletedQuestions(
                  completedQuestionCount,
                  totalQuestions,
                )
              : "\u00a0"}
          </p>
          {hydrated && completedQuestionCount > 0 ? (
            <AlertDialog>
              <AlertDialogTrigger
                variant="ghost"
                size="xs"
                icon={RotateCcwIcon}
                className="-ml-2 mt-2 text-muted-foreground"
              >
                Reset progress
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader className="items-center gap-3 px-5 py-6 text-center">
                  <span className="flex size-mark items-center justify-center rounded-xl bg-destructive/15 text-destructive ring-1 ring-destructive/30">
                    <RotateCcwIcon className="size-icon-lg" aria-hidden />
                  </span>
                  <AlertDialogTitle className="text-title font-medium text-foreground">
                    Reset progress?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-body">
                    This clears every correct answer on this device. You can
                    start the course again anytime.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="softOutline" size="cta">
                    <XIcon aria-hidden />
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    size="cta"
                    onClick={reset}
                  >
                    <RotateCcwIcon aria-hidden />
                    Reset progress
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <nav aria-label="Course chapters">
              <SidebarMenu className="flex flex-col gap-0 px-[9px] py-[11px]">
                {chapters.map((chapter) => (
                  <ChapterSidebarItem
                    key={chapter.id}
                    chapter={chapter}
                    href={chapterPath(chapter.slug)}
                    isActive={pathname === chapterPath(chapter.slug)}
                    onNavigate={closeMobileSidebar}
                  />
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail className="hidden" />
    </Sidebar>
  );
}
