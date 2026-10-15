"use client";

import { useMemo, useState } from "react";

import {
  TransactionHintBanner,
  TransactionHintBubble,
  useAmountGuide,
} from "@/components/ledger/amount-guide";
import { CentralizedLedgerDiagram } from "@/components/ledger/diagram";
import { entriesFromBlock } from "@/components/ledger/entries";
import { LedgerEntryRow } from "@/components/ledger/ledger-entry-row";
import type { ContentBlock } from "@/lib/chapter-content";

import { amountBounds } from "./model";
import { buildOweScene } from "./scene";

type OweLedgerBlockProps = {
  block: Extract<ContentBlock, { type: "owe-ledger" }>;
};

export function OweLedgerBlock({ block }: OweLedgerBlockProps) {
  const baseline = useMemo(
    () => entriesFromBlock(block.entries),
    [block.entries],
  );

  const [amounts, setAmounts] = useState(() =>
    baseline.map((entry) => entry.amount),
  );

  const current = baseline.map((entry, index) => ({
    ...entry,
    amount: amounts[index] ?? entry.amount,
  }));

  const { keeper, readers } = buildOweScene(baseline, current);
  const total = current.reduce((sum, entry) => sum + entry.amount, 0);
  const guide = useAmountGuide();

  function setAmount(index: number, next: number) {
    const entry = block.entries[index];
    const baselineAmount = baseline[index]?.amount;
    if (!entry || baselineAmount === undefined) return;
    const { min, max } = amountBounds(entry, baselineAmount);
    setAmounts((prev) =>
      prev.map((value, i) =>
        i === index ? Math.min(max, Math.max(min, next)) : value,
      ),
    );
  }

  return (
    <CentralizedLedgerDiagram
      keeper={keeper}
      readers={readers}
      total={total}
      overlay={
        <>
          {guide.phase === "hint" ? (
            <TransactionHintBubble
              title="Try it"
              detail="Change any amount"
              className="absolute top-[62%] left-[calc(50%+13.5rem)] z-20 hidden w-auto -translate-y-1/2 md:block"
            />
          ) : null}
          <div className="absolute inset-x-3 bottom-[3%] z-20 md:hidden">
            <TransactionHintBanner
              phase={guide.phase}
              hint="Change any amount"
            />
          </div>
        </>
      }
    >
      <ul className="flex h-full flex-col justify-center py-1">
        {block.entries.map((entry, index) => {
          const amount = amounts[index] ?? baseline[index]?.amount ?? 0;
          const baselineAmount = baseline[index]?.amount ?? 0;
          const { min, max } = amountBounds(entry, baselineAmount);
          return (
            <LedgerEntryRow
              key={`${entry.from}-${entry.to}`}
              from={entry.from}
              to={entry.to}
              amount={amount}
              minAmount={min}
              maxAmount={max}
              isLast={index === block.entries.length - 1}
              amountTone={amount !== baselineAmount ? "brand" : "default"}
              editable
              cueClassName={
                index === 0 && guide.phase === "hint"
                  ? "max-md:[&_[data-amount-pill]]:border-brand max-md:[&_[data-amount-pill]]:bg-brand/15 max-md:[&_[data-amount-pill]]:ring-2 max-md:[&_[data-amount-pill]]:ring-brand/30 max-md:[&_svg]:text-brand-text"
                  : undefined
              }
              onEditSession={guide.onEditSession}
              onAmountChange={(next) => setAmount(index, next)}
            />
          );
        })}
      </ul>
    </CentralizedLedgerDiagram>
  );
}
