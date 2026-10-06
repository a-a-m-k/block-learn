"use client";

import { Fragment } from "react";

import { FlowArrow } from "@/components/flow-arrow";
import { formatAmount } from "@/components/ledger/amounts";
import { cn } from "@/lib/utils";

import {
  CHAIN,
  CURRENT_BLOCK,
  FACE_BY_NAME,
  TRANSACTIONS,
  blockLabel,
} from "./model";
import {
  BlockCard,
  ChainCubes,
  HashStamp,
  MiniFace,
  VISUAL_FRAME,
} from "./visuals";

const STEPS: { title: string; description?: string }[] = [
  {
    title: "Transactions arrive",
  },
  {
    title: "Network builds a block",
    description:
      "Computers on the network collect and verify the transactions, then group them into a block.",
  },
  {
    title: "Hash is created",
    description:
      "The payments are written as one line, in a fixed order: who paid whom, and how much. A set calculation turns that line into this short fingerprint. Same line, same hash.",
  },
  {
    title: "Block added to chain",
    description:
      "The block is added to the chain. Each block points to the one before it.",
  },
];

export function HashChainBlock() {
  return (
    <figure
      className="w-full min-w-0 overflow-x-hidden text-foreground"
      aria-label="How a blockchain works: transactions are grouped into a block, hashed, and linked onto the chain."
    >
      <div role="list" className="flex flex-col gap-3 sm:gap-5">
        {STEPS.map((step, index) => (
          <Fragment key={step.title}>
            <div
              role="listitem"
              className="diagram-panel diagram-pad grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch sm:gap-5"
            >
              <div className="flex min-w-0 items-start gap-2">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand caption font-semibold text-brand-foreground sm:size-6">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-body font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <StepCopy index={index} description={step.description} />
                </div>
              </div>
              <div className="flex h-full w-full min-w-0">
                <StepVisual index={index} />
              </div>
            </div>

            {index < STEPS.length - 1 ? (
              <div
                className="flex shrink-0 items-center justify-center"
                aria-hidden
              >
                <FlowArrow className="text-muted-foreground" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </figure>
  );
}

function StepCopy({
  index,
  description,
}: {
  index: number;
  description?: string;
}) {
  if (index === 0) {
    return (
      <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-muted-foreground">
        {TRANSACTIONS.map((entry) => (
          <li key={`${entry.from}-${entry.to}`}>
            {entry.from} sends {entry.to} {formatAmount(entry.amount)}
          </li>
        ))}
      </ul>
    );
  }

  if (!description) return null;

  return (
    <p className="mt-2 text-body text-muted-foreground">{description}</p>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <ul className={cn(VISUAL_FRAME, "flex-col gap-2")}>
        {TRANSACTIONS.map((entry) => (
          <li
            key={`${entry.from}-${entry.to}`}
            className="flex min-h-0 flex-1 items-center gap-2 rounded-lg border border-muted-foreground/50 px-2 py-1.5 caption"
          >
            <MiniFace variant={FACE_BY_NAME[entry.from]} />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {entry.from} → {entry.to}
            </span>
            <span className="shrink-0 font-medium tabular-nums text-foreground">
              {formatAmount(entry.amount)}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (index === 1) {
    return (
      <BlockCard>
        <p className="text-body font-semibold text-brand-text">
          Block {blockLabel(CURRENT_BLOCK.number)}
        </p>
        <ul className="mt-3 flex flex-col gap-1.5 caption text-muted-foreground">
          {TRANSACTIONS.map((entry) => (
            <li
              key={`${entry.from}-${entry.to}`}
              className="flex items-center justify-between gap-3"
            >
              <span>
                {entry.from} → {entry.to}
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {formatAmount(entry.amount)}
              </span>
            </li>
          ))}
        </ul>
      </BlockCard>
    );
  }

  if (index === 2) {
    return <HashStamp hash={CURRENT_BLOCK.hash} />;
  }

  return <ChainCubes blocks={CHAIN} />;
}
