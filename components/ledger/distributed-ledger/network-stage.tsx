"use client";

import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { NetworkIcon } from "lucide-react";

import {
  ConnectorLines,
  type ConnectorLine,
} from "@/components/ledger/connector-lines";
import { cn } from "@/lib/utils";

import type { NetworkStatus } from "./model";
import { CONNECTIONS, NODE } from "./scene";

const NETWORK_LINES: ConnectorLine[] = CONNECTIONS.map(([from, to]) => ({
  id: `${from}-${to}`,
  x1: NODE[from].x,
  y1: NODE[from].y,
  x2: NODE[to].x,
  y2: NODE[to].y,
}));

type NetworkStageProps = {
  status: NetworkStatus;
  children: ReactNode;
  overlay?: ReactNode;
};

const DASH_Y =
  "w-px bg-[length:1px_6px] bg-repeat-y [background-image:linear-gradient(to_bottom,currentColor_3px,transparent_3px)]";

/** Equal joins on a shared rail: peers, with no parent above the first card. */
function MobilePeerJoint({
  index,
  count,
  status,
}: {
  index: number;
  count: number;
  status: NetworkStatus;
}) {
  const tone = cn(
    "transition-colors duration-300 motion-reduce:transition-none",
    status === "mismatch" && "text-destructive",
    status === "broadcasting" && "text-brand-text",
  );
  const lineOpacity = status === "synced" ? "opacity-70" : "opacity-90";

  return (
    <div className={cn("relative md:hidden", tone)} aria-hidden>
      {count > 1 ? (
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2",
            DASH_Y,
            lineOpacity,
            index === 0 ? "top-1/2" : "top-[calc(var(--peer-gap-y)/-2)]",
            index === count - 1
              ? "bottom-1/2"
              : "bottom-[calc(var(--peer-gap-y)/-2)]",
          )}
        />
      ) : null}
      <span
        className="absolute top-1/2 left-[calc(50%+0.25rem)] h-0.5 w-[calc(50%-0.25rem+var(--peer-gap-x))] -translate-y-1/2 bg-current"
      />
      <span className="absolute top-1/2 left-1/2 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-current bg-background" />
    </div>
  );
}

export function NetworkStage({ status, children, overlay }: NetworkStageProps) {
  return (
    <figure
      className={cn(
        "@container relative mx-auto w-full overflow-hidden text-muted-foreground",
        "md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl",
      )}
      aria-label="Distributed notebooks. Edit Alice's copy to cheat, or broadcast a new transaction to everyone."
    >
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 text-grid opacity-35 [background-image:radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:1.5rem_1.5rem]"
          aria-hidden
        />
        <ConnectorLines
          lines={NETWORK_LINES}
          stretch
          className={cn(
            "pointer-events-none z-0 hidden transition-colors duration-300 motion-reduce:transition-none md:block",
            status === "mismatch" && "text-destructive",
            status === "broadcasting" && "text-brand-text",
          )}
          strokeOpacity={status === "synced" ? 0.5 : 0.85}
        />

        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-card shadow-card md:flex lg:size-24",
            status === "mismatch" && "border-destructive text-destructive",
            status === "broadcasting" &&
              "border-brand bg-accent text-brand-text",
            status === "synced" && "border-border text-muted-foreground",
          )}
          aria-hidden
        >
          <span
            className={cn(
              "absolute inset-2 rounded-full border border-current opacity-30",
              status === "broadcasting" && "animate-pulse",
            )}
          />
          <NetworkIcon className="size-8 lg:size-10" strokeWidth={1.4} />
        </div>

        <div
          className={cn(
            "relative z-10 mx-auto grid w-full max-w-sm grid-cols-[0.75rem_minmax(0,1fr)] items-stretch",
            "gap-x-(--peer-gap-x) gap-y-(--peer-gap-y) px-3 py-5 pr-4 [--peer-gap-x:1rem] [--peer-gap-y:1rem]",
            "md:aspect-[16/10] md:max-w-none md:grid-cols-2 md:place-items-center md:gap-0 md:p-4 lg:p-6",
            "md:grid-rows-[minmax(auto,1fr)_minmax(auto,1fr)]",
          )}
        >
          {Children.map(children, (child, index) => (
            <Fragment
              key={isValidElement(child) ? (child.key ?? index) : index}
            >
              <MobilePeerJoint
                index={index}
                count={Children.count(children)}
                status={status}
              />
              {child}
            </Fragment>
          ))}
        </div>
      </div>

      {overlay}
    </figure>
  );
}
