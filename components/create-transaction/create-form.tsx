"use client";

import type { ReactNode } from "react";

import { faceFor } from "@/components/ledger/characters";
import { MiniFace } from "@/components/hash-chain/visuals";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { VISUAL_FRAME } from "./motion";
import type { CreateTransactionContent } from "./types";

export function CreateForm({
  block,
  reducedMotion,
  onSend,
}: {
  block: CreateTransactionContent;
  reducedMotion: boolean;
  onSend: () => void;
}) {
  return (
    <div className={cn(VISUAL_FRAME, "flex-col justify-between gap-2")}>
      <dl className="grid grid-cols-2 gap-2 sm:gap-3">
        <FormRow label="From">
          <span className="flex min-w-0 items-center gap-2">
            <MiniFace variant={faceFor(block.from)} className="size-6" />
            <span className="min-w-0 truncate font-medium text-foreground">
              {block.from}
            </span>
          </span>
        </FormRow>
        <FormRow label="Balance">
          <span className="shrink-0 text-muted-foreground">
            {block.balance}
          </span>
        </FormRow>
        <FormRow label="To">
          <span className="flex min-w-0 items-center gap-2">
            <MiniFace variant={faceFor(block.to)} className="size-6" />
            <span className="font-medium text-foreground">{block.to}</span>
          </span>
        </FormRow>
        <FormRow label="Amount">
          <span className="font-medium tabular-nums text-foreground">
            {block.amount}
          </span>
        </FormRow>
        <FormRow label="Fee" className="col-span-2">
          <span className="font-medium tabular-nums text-foreground">
            {block.fee}
          </span>
        </FormRow>
      </dl>
      {reducedMotion ? (
        <p className="caption text-muted-foreground">
          Animation is off, so this shows the finished result.
        </p>
      ) : (
        <Button
          type="button"
          variant="cta"
          size="sm"
          className="h-10 w-full"
          onClick={onSend}
        >
          Sign & send
        </Button>
      )}
    </div>
  );
}

function FormRow({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <dt className="caption text-muted-foreground">{label}</dt>
      <dd className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-muted-foreground/50 px-2 sm:px-1.5">
        {children}
      </dd>
    </div>
  );
}
