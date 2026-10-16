import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function LedgerStatusChip({ mismatch = false }: { mismatch?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 caption font-semibold tracking-wide uppercase",
        mismatch
          ? "bg-destructive/15 text-destructive"
          : "bg-success/15 text-success",
      )}
    >
      {mismatch ? "Mismatch" : "Current"}
    </span>
  );
}

export function NotebookHeading({
  face,
  title,
  detail,
  status,
}: {
  face: ReactNode;
  title: ReactNode;
  detail: ReactNode;
  status?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
      {face}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-chrome font-semibold text-foreground">
          {title}
        </span>
        <span className="block caption text-muted-foreground">{detail}</span>
      </span>
      {status}
    </div>
  );
}

export function NotebookColumns() {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-1 caption font-medium tracking-[0.14em] text-muted-foreground uppercase">
      <span>Entry</span>
      <span>Amount</span>
    </div>
  );
}

export function NotebookTotal({
  total,
  tone = "brand",
}: {
  total: number;
  tone?: "brand" | "destructive";
}) {
  return (
    <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-3 text-chrome">
      <span className="tracking-[0.12em] text-muted-foreground uppercase">
        Total recorded
      </span>
      <span
        className={cn(
          "font-semibold",
          tone === "destructive" ? "text-destructive" : "text-brand-text",
        )}
      >
        ${total}
      </span>
    </div>
  );
}
