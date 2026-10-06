"use client";

import type { Route } from "next";
import Link from "next/link";

import type { Chapter } from "@/lib/course";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useProgress } from "@/components/progress-provider";
import { CheckIcon, ClockIcon } from "lucide-react";

type ChapterSidebarItemProps = {
  chapter: Chapter;
  href: Route<`/chapters/${string}`>;
  isActive: boolean;
  onNavigate?: () => void;
};

function ChapterSidebarItem({
  chapter,
  href,
  isActive,
  onNavigate,
}: ChapterSidebarItemProps) {
  const { isComplete, hydrated } = useProgress();
  const completed = hydrated && isComplete(chapter.slug);
  const Icon = chapter.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={href} onClick={onNavigate} />}
        isActive={isActive}
        aria-current={isActive ? "page" : undefined}
        className="h-auto items-start justify-start gap-[0.5em] p-[0.75em] text-chrome"
      >
        <div
          className={cn(
            "grid grid-cols-[auto_1fr] items-center gap-x-[0.5em] gap-y-[0.25em] text-sidebar-foreground group-hover/menu-button:text-brand-text",
            isActive && "text-brand-text",
          )}
        >
          {completed ? (
            <CheckIcon className="shrink-0 text-success" aria-hidden />
          ) : (
            <Icon className="shrink-0" aria-hidden />
          )}
          <span className="flex min-w-0 items-baseline gap-1 font-medium">
            {completed ? <span className="sr-only">Completed. </span> : null}
            <span className="shrink-0 tabular-nums">{chapter.number}.</span>
            <span className="truncate" title={chapter.title}>
              {chapter.title}
            </span>
          </span>
          <span className="col-start-2 inline-flex items-center gap-1 text-chrome-meta text-muted-foreground">
            <ClockIcon aria-hidden />
            {chapter.readMinutes} min
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export { ChapterSidebarItem };
