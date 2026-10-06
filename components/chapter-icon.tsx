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
        "flex size-mark shrink-0 items-center justify-center rounded-lg bg-brand/15",
        className,
      )}
    >
      <Icon className="size-1/2 text-brand-text" aria-hidden />
    </div>
  );
}
