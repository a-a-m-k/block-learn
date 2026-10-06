"use client";

import { cn } from "@/lib/utils";

export type ConnectorLine = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type ConnectorLinesProps = {
  lines: ConnectorLine[];
  className?: string;
  strokeOpacity?: number;
  /**
   * Map 0–100 onto the element even when it is not square.
   * The default viewBox keeps its own aspect inside the element.
   */
  stretch?: boolean;
};

/** Dashed SVG connectors in a 0–100 viewBox overlay. */
export function ConnectorLines({
  lines,
  className,
  strokeOpacity = 0.55,
  stretch = false,
}: ConnectorLinesProps) {
  return (
    <svg
      className={cn("absolute inset-0", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio={stretch ? "none" : undefined}
      aria-hidden
    >
      {lines.map((line) => (
        <line
          key={line.id}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="currentColor"
          strokeOpacity={strokeOpacity}
          strokeWidth={stretch ? 2 : 0.4}
          strokeDasharray={stretch ? "4 4" : "0.7 0.7"}
          vectorEffect={stretch ? "non-scaling-stroke" : undefined}
        />
      ))}
    </svg>
  );
}
