import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const HIDE_DOWN = {
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
} as const;

const SHOW_RIGHT = {
  lg: "hidden lg:block",
  xl: "hidden xl:block",
  "2xl": "hidden 2xl:block",
} as const;

type FlowBreakpoint = keyof typeof HIDE_DOWN;

type FlowArrowProps = {
  /** Viewport where the layout switches from stacked to side-by-side. Omit to always show a down arrow. */
  at?: FlowBreakpoint;
  className?: string;
  downClassName?: string;
  rightClassName?: string;
};

/** Responsive down→right arrow for stacked / split diagram flows. */
export function FlowArrow({
  at,
  className,
  downClassName,
  rightClassName,
}: FlowArrowProps) {
  if (!at) {
    return (
      <ArrowDownIcon
        className={cn(
          "size-6 shrink-0 self-center text-foreground",
          className,
          downClassName,
        )}
        strokeWidth={1.75}
        aria-hidden
      />
    );
  }

  return (
    <>
      <ArrowDownIcon
        className={cn(
          "size-6 shrink-0 self-center text-foreground",
          HIDE_DOWN[at],
          className,
          downClassName,
        )}
        strokeWidth={1.75}
        aria-hidden
      />
      <ArrowRightIcon
        className={cn(
          "size-6 shrink-0 self-center text-foreground",
          SHOW_RIGHT[at],
          className,
          rightClassName,
        )}
        strokeWidth={1.75}
        aria-hidden
      />
    </>
  );
}
