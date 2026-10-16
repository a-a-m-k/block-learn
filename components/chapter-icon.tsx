import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ChapterIconProps = {
  icon: LucideIcon;
  className?: string;
};

export function ChapterIcon({ icon: Icon, className }: ChapterIconProps) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg border border-brand/40 bg-accent text-brand-text",
        className,
      )}
    >
      <Icon className="size-1/2" aria-hidden />
    </div>
  );
}
