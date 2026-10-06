import type { ReactNode } from "react";
import { FlowArrow } from "@/components/flow-arrow";
import { cn } from "@/lib/utils";

import type { CompareAccent } from "./types";

export const COMPARE_CARD_SHELL =
  "@container/stage diagram-shell flex size-full min-w-0 flex-col gap-2 border border-muted-foreground/50 px-3 py-2.5 @[28rem]/stage:gap-3 @[28rem]/stage:px-4 @[28rem]/stage:py-4";

export const COMPARE_SPLIT =
  "flex min-w-0 flex-col gap-3 xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-stretch";

/** Name, visual, label, data, footer — shared by miners and the result card. */
export const COMPARE_STAGE_ROWS =
  "grid-rows-[minmax(1.25rem,auto)_auto_minmax(1.25rem,auto)_minmax(2rem,auto)_minmax(1.5rem,auto)] @[28rem]/stage:grid-rows-[minmax(1.5rem,auto)_auto_minmax(1.5rem,auto)_2.5rem_minmax(3rem,auto)]";

export const COMPARE_VISUAL_SLOT =
  "flex h-16 items-center justify-center @[32rem]/stage:h-20";

export const COMPARE_STAGE_LABEL =
  "flex max-w-full min-w-0 items-center truncate px-0.5 caption";

export function accentText(accent: CompareAccent) {
  return accent === "pow" ? "text-pow" : "text-stake";
}

export function accentBorder(accent: CompareAccent) {
  return accent === "pow" ? "border-pow" : "border-stake";
}

export function accentBgSoft(accent: CompareAccent) {
  return accent === "pow" ? "bg-pow/10" : "bg-stake/10";
}

export function accentFill(accent: CompareAccent) {
  return accent === "pow"
    ? "bg-pow text-pow-foreground"
    : "bg-stake text-stake-foreground";
}

export function CompareSplit({
  start,
  end,
  align = "stretch",
}: {
  start?: ReactNode;
  end: ReactNode;
  align?: "stretch" | "center";
}) {
  return (
    <div
      className={cn(
        COMPARE_SPLIT,
        align === "center" && "xl:items-center",
      )}
    >
      {start ?? <div className="hidden xl:block" aria-hidden />}
      <FlowArrow at="xl" />
      {end}
    </div>
  );
}
