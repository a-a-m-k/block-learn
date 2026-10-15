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

const learner = {
  name: "Alex Morgan",
  initials: "AM",
  xp: "1,240 XP",
};

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
                Blockchain basics
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
      <div className="mt-auto border-t border-[#202328]">
        <div className="flex h-[62px] items-center gap-[10px] px-[18px]">
          <span className="flex size-[29px] shrink-0 items-center justify-center rounded-full bg-[#142b4d] font-['DM_Sans:Bold'] text-[8px] leading-3 text-[#91b9f7]">
            {learner.initials}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-['DM_Sans:Bold'] text-[9px] leading-[13.5px] text-[#f2f4f8]">
              {learner.name}
            </span>
            <span className="pt-0.5 font-['Space_Mono:Bold'] text-[7px] leading-none text-[#4c89e7]">
              {learner.xp}
            </span>
          </span>
        </div>
      </div>
      <SidebarRail className="hidden" />
    </Sidebar>
  );
}
