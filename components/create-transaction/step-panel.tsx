"use client";

import { useEffect, useState, type ReactNode } from "react";

import { AddedToBlockVisual } from "./added-to-block-visual";
import { CreateForm } from "./create-form";
import { MempoolVisual } from "./mempool-visual";
import { IDLE_HOLD_MS } from "./motion";
import { NetworkVisual } from "./network-visual";
import { SignedVisual } from "./signed-visual";
import type { CreateTransactionContent } from "./types";

type StepPanelProps = {
  step: CreateTransactionContent["steps"][number];
  index: number;
  stepCount: number;
  block: CreateTransactionContent;
  reducedMotion: boolean;
  runId: number;
  active: boolean;
  onSend: () => void;
  footer?: ReactNode;
};

export function StepPanel({
  step,
  index,
  stepCount,
  block,
  reducedMotion,
  runId,
  active,
  onSend,
  footer,
}: StepPanelProps) {
  const revealed = useDelayedReveal(active, reducedMotion, runId);

  return (
    <div
      role="listitem"
      data-step={index}
      className="diagram-panel diagram-pad flex min-w-0 flex-col gap-3 sm:gap-5"
    >
      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:items-stretch sm:gap-5">
        <div className="min-w-0">
          <p className="caption font-medium tracking-wide text-brand-text uppercase">
            Step {index + 1} of {stepCount}
          </p>
          <h3 className="mt-1 text-body font-semibold text-foreground">
            {step.title}
          </h3>
          {step.text ? (
            <p className="mt-1 text-body text-muted-foreground sm:mt-2">
              {step.text}
            </p>
          ) : null}
        </div>
        <div className="flex h-full w-full min-w-0">
          <StepVisual
            key={`${runId}-${index}`}
            index={index}
            block={block}
            reducedMotion={reducedMotion}
            active={revealed}
            onSend={onSend}
          />
        </div>
      </div>
      {footer}
    </div>
  );
}

function StepVisual({
  index,
  block,
  reducedMotion,
  active,
  onSend,
}: {
  index: number;
  block: CreateTransactionContent;
  reducedMotion: boolean;
  active: boolean;
  onSend: () => void;
}) {
  if (index === 0) {
    return (
      <CreateForm
        block={block}
        reducedMotion={reducedMotion}
        onSend={onSend}
      />
    );
  }
  if (index === 1) {
    return <SignedVisual signature={block.signature} active={active} />;
  }
  if (index === 2) return <NetworkVisual active={active} />;
  if (index === 3) {
    return (
      <MempoolVisual
        from={block.from}
        to={block.to}
        amount={block.amount}
        otherCount={block.otherMempoolCount}
        active={active}
      />
    );
  }
  return <AddedToBlockVisual active={active} />;
}

function useDelayedReveal(
  active: boolean,
  reducedMotion: boolean,
  resetKey: number,
) {
  const [revealed, setRevealed] = useState(reducedMotion && active);

  useEffect(() => {
    if (reducedMotion || !active) {
      setRevealed(active);
      return;
    }

    setRevealed(false);
    const timeout = window.setTimeout(() => setRevealed(true), IDLE_HOLD_MS);
    return () => window.clearTimeout(timeout);
  }, [active, reducedMotion, resetKey]);

  return revealed;
}
