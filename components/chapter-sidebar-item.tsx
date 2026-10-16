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
          "relative h-[62px] min-h-[62px] items-center justify-start gap-[10px] rounded-[7px] px-[10px] py-[9px] font-medium hover:bg-foreground/4",
          isActive && "bg-sidebar-accent text-foreground",
        )}
      >
        {isActive ? (
          <span
            className="absolute top-[9px] left-0 h-11 w-0.5 bg-brand shadow-brand"
            aria-hidden
          />
        ) : null}
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-[6px] border border-border font-mono text-[8px] leading-none font-bold text-muted-foreground",
            isActive && "border-brand/50 bg-accent text-brand-text",
          )}
        >
          {completed ? (
            <CheckIcon className="size-3 text-success" aria-hidden />
          ) : (
            chapter.number
          )}
        </span>
        <span className="flex min-w-0 flex-col gap-[5px]">
          <span
            className={cn(
              "truncate text-[10px] leading-[15px] text-muted-foreground",
              isActive && "text-foreground",
            )}
            title={chapter.title}
          >
            {completed ? <span className="sr-only">Completed. </span> : null}
            {chapter.title}
          </span>
          <span className="inline-flex items-center gap-1 caption leading-3 text-muted-foreground">
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
