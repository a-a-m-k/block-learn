import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const SC_PANEL =
  "diagram-panel diagram-pad flex w-full min-w-0 flex-col gap-4 text-foreground";

export const SC_STEP =
  "rounded-lg border border-muted-foreground/50 px-3 py-2.5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export const SC_STEP_ACTIVE =
  "border-brand text-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--brand)_28%,transparent)]";

export const SC_MONO =
  "rounded-lg border border-muted-foreground/50 bg-panel px-3 py-3 font-mono caption sm:px-4 sm:py-4 sm:text-body";

export function ScPanel({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn(SC_PANEL, className)} {...props}>
      {children}
    </div>
  );
}
