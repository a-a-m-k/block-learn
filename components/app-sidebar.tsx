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
import { Progress, ProgressValue } from "@/components/ui/progress";
import { ChapterSidebarItem } from "@/components/chapter-sidebar-item";
import { chapters, totalChapters } from "@/lib/course";
import { chapterPath } from "@/lib/site";
import { useProgress } from "@/components/progress-provider";
import { formatCompletedQuestions } from "@/lib/progress";
import { XIcon } from "lucide-react";
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
  } = useProgress();

  function closeMobileSidebar() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Sidebar
      {...props}
      className={cn("border-r border-sidebar-border bg-sidebar", props.className)}
    >
      <SidebarHeader className="gap-0 p-0">
        <div className="flex h-18 w-full items-center justify-between gap-3 border-b border-sidebar-border px-4.5">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className="flex min-w-0 items-center gap-3 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#3989ff,#1458c5)] shadow-brand">
              <Image
                src="/assets/design-7-5/sidebar-logo.svg"
                alt=""
                width={18}
                height={18}
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-['DM_Sans:Bold'] text-xs leading-[18px] text-sidebar-foreground">
                Blockchain basics
              </span>
              <span className="font-['DM_Sans:Regular'] text-[9px] leading-[13.5px] text-[#6f7782]">
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
        <div className="border-b border-sidebar-border px-4.5 py-4.5">
          <Progress
            label="Your progress"
            value={hydrated ? progressPercent : 0}
            aria-busy={!hydrated || undefined}
            className="gap-0 font-['DM_Sans:Bold'] text-[11px] leading-[16.5px] [&_[data-slot=progress-indicator]]:bg-brand [&_[data-slot=progress-label]]:py-0 [&_[data-slot=progress-track]]:mt-3 [&_[data-slot=progress-track]]:h-[3px] [&_[data-slot=progress-track]]:bg-[#25282d] [&_[data-slot=progress-value]]:font-['Space_Mono:Bold'] [&_[data-slot=progress-value]]:text-[10px] [&_[data-slot=progress-value]]:text-brand-text"
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
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <nav aria-label="Course chapters">
              <SidebarMenu className="flex flex-col gap-0 px-2 py-3">
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
