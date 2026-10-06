"use client";

import type * as React from "react";
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
import { Blocks, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const { progressPercent, hydrated } = useProgress();

  function closeMobileSidebar() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="gap-0 p-0">
        <div className="chrome-bar chrome-inset flex w-full items-center justify-between gap-(--spacing-chrome-gap) border-b">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className="flex min-w-0 items-center gap-(--spacing-chrome-gap) rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <div className="flex size-mark shrink-0 items-center justify-center rounded-lg bg-brand">
              <Blocks className="size-1/2" aria-hidden />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-chrome font-medium text-sidebar-foreground">
                Blockchain basics
              </span>
              <span className="text-chrome-meta text-muted-foreground">
                {totalChapters} chapters
              </span>
            </div>
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
        <div className="chrome-bar chrome-inset border-b">
          <Progress
            value={hydrated ? progressPercent : 0}
            aria-busy={!hydrated || undefined}
          >
            <ProgressValue />
          </Progress>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <nav aria-label="Course chapters">
              <SidebarMenu className="chrome-inset flex flex-col gap-[0.5em] pt-[var(--spacing-chrome-inset)] text-chrome">
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
      <SidebarRail />
    </Sidebar>
  );
}
