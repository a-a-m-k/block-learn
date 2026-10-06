"use client";

import { cn } from "@/lib/utils";

import { VISUAL_FRAME } from "./motion";
import { NetworkBroadcastSvg } from "./network-broadcast-svg";

export function NetworkVisual({ active = false }: { active?: boolean }) {
  return (
    <div className={cn(VISUAL_FRAME, "items-center justify-center")}>
      <NetworkBroadcastSvg
        active={active}
        className="size-28 text-muted-foreground/70 sm:size-40"
      />
    </div>
  );
}
