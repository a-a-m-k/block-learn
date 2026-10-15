"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import type { Chapter } from "@/lib/course";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useProgress } from "@/components/progress-provider";
import { CheckIcon } from "lucide-react";

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
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={href} onClick={onNavigate} />}
        isActive={isActive}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative min-h-[3.875rem] items-center justify-start gap-2.5 rounded-md px-2.5 py-2 font-['DM_Sans:Medium'] hover:bg-sidebar-accent",
          isActive &&
            "bg-[linear-gradient(90deg,#182c4b,#111722)] text-sidebar-foreground ring-1 ring-[#23456f]",
        )}
      >
        {isActive ? (
          <span
            className="absolute inset-y-2 left-0 w-0.5 bg-[#3d8cff] shadow-[0_0_7px_#3d8cff]"
            aria-hidden
          />
        ) : null}
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-md border border-[#2c3138] font-['Space_Mono:Bold'] text-[8px] text-[#626a75]",
            isActive && "border-[#2b5d9f] bg-[#102347] text-[#6ea7ff]",
          )}
        >
          {completed ? (
            <CheckIcon className="size-3 text-success" aria-hidden />
          ) : (
            chapter.number
          )}
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span
            className={cn(
              "truncate text-[10px] leading-[15px] text-[#9ba1aa]",
              isActive && "text-[#f1f5fb]",
            )}
            title={chapter.title}
          >
            {completed ? <span className="sr-only">Completed. </span> : null}
            {chapter.title}
          </span>
          <span className="inline-flex items-center gap-1 font-['DM_Sans:Regular'] text-[8px] leading-3 text-[#59616c]">
            <Image
              src="/assets/design-7-5/clock.svg"
              alt=""
              width={11}
              height={11}
            />
            {chapter.readMinutes} min
          </span>
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export { ChapterSidebarItem };
