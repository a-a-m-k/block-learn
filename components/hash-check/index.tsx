"use client";

import { useMemo, useState } from "react";
import {
  AlertCircleIcon,
  CheckIcon,
  InfoIcon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react";

import { FlowArrow } from "@/components/flow-arrow";
import { blockLabel } from "@/components/hash-chain/model";
import { HashPill } from "@/components/hash-chain/visuals";
import {
  TransactionHintBanner,
  TransactionHintBubble,
  useAmountGuide,
} from "@/components/ledger/amount-guide";
import { LedgerEntryRow } from "@/components/ledger/ledger-entry-row";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  BLOCK_NUMBER,
  EXPECTED_HASH,
  INITIAL_TXS,
  MAX_AMOUNT,
  hashBlock,
  type BlockTx,
} from "./model";

export function HashCheckBlock() {
  const [txs, setTxs] = useState<BlockTx[]>(() =>
    INITIAL_TXS.map((tx) => ({ ...tx })),
  );

  const guide = useAmountGuide();
  const currentHash = useMemo(() => hashBlock(BLOCK_NUMBER, txs), [txs]);
  const isValid = currentHash === EXPECTED_HASH;
  const isChanged = txs.some((tx, i) => tx.amount !== INITIAL_TXS[i]?.amount);
  const statusLines = isValid
    ? (["Hash matches.", "Block is valid."] as const)
    : (["Hash doesn't match.", "Block is invalid."] as const);

  function setAmount(index: number, amount: number) {
    setTxs((prev) =>
      prev.map((tx, i) => (i === index ? { ...tx, amount } : tx)),
    );
  }

  function resetBlock() {
    setTxs(INITIAL_TXS.map((tx) => ({ ...tx })));
    guide.reset();
  }

  return (
    <figure
      className="flex w-full min-w-0 flex-col gap-4 text-foreground xl:flex-row xl:items-stretch"
      aria-label="Change a transaction in a block and watch its hash stop matching what the next block expects."
    >
      <div className="diagram-panel diagram-pad w-full min-w-0 xl:w-80 xl:shrink-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full sm:size-6",
                isChanged
                  ? "bg-destructive text-destructive-foreground"
                  : "border border-brand text-brand-text",
              )}
            >
              {isChanged ? (
                <AlertCircleIcon className="size-icon-sm" aria-hidden />
              ) : (
                <InfoIcon className="size-icon-sm" aria-hidden />
              )}
            </span>
            <h3 className="text-body font-semibold text-foreground">
              Change one thing, change the hash
            </h3>
          </div>
          {isChanged ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={RefreshCwIcon}
              className="w-full shrink-0 sm:w-auto"
              onClick={resetBlock}
            >
              Reset
            </Button>
          ) : null}
        </div>

        <div className="relative mt-5">
          <div className="mb-2">
            <p
              className={cn(
                "font-semibold",
                isChanged ? "text-destructive" : "text-brand-text",
              )}
            >
              Block {blockLabel(BLOCK_NUMBER)}
            </p>
            {isChanged ? (
              <p className="caption text-destructive">(changed)</p>
            ) : (
              <p className="caption text-muted-foreground">
                Edit an amount to break the hash.
              </p>
            )}
          </div>
          <ul>
            {txs.map((tx, index) => {
              const original = INITIAL_TXS[index]?.amount;
              const changed = original !== undefined && tx.amount !== original;
              return (
                <LedgerEntryRow
                  key={`${tx.from}-${tx.to}`}
                  from={tx.from}
                  to={tx.to}
                  amount={tx.amount}
                  maxAmount={MAX_AMOUNT}
                  isLast={index === txs.length - 1}
                  amountTone={changed ? "destructive" : "default"}
                  edited={changed}
                  editable
                  compact
                  cueClassName={
                    index === 0 && guide.phase === "hint"
                      ? "max-xl:[&_[data-amount-pill]]:border-brand max-xl:[&_[data-amount-pill]]:bg-brand/15 max-xl:[&_[data-amount-pill]]:ring-2 max-xl:[&_[data-amount-pill]]:ring-brand/30 max-xl:[&_svg]:text-brand-text"
                      : undefined
                  }
                  onEditSession={guide.onEditSession}
                  onAmountChange={(amount) => setAmount(index, amount)}
                />
              );
            })}
            <li
              className="px-1.5 py-1 caption text-muted-foreground sm:px-2"
              aria-hidden
            >
              …
            </li>
          </ul>
          {guide.phase === "hint" ? (
            <TransactionHintBubble className="absolute top-16 -right-1 z-20 hidden translate-x-[calc(100%+1.25rem)] xl:block" />
          ) : null}
          <TransactionHintBanner
            phase={guide.phase}
            className="mt-4 xl:hidden"
          />
        </div>
      </div>

      <FlowArrow at="xl" downClassName="mx-auto" />

      <div className="diagram-panel diagram-pad flex min-w-0 flex-1 flex-col items-center justify-center gap-5">
        <div className="flex w-full min-w-0 flex-col items-center justify-center gap-5 sm:flex-row sm:flex-wrap sm:gap-6">
          <HashColumn
            label={isChanged ? "New hash" : "Hash"}
            hash={currentHash}
            tone={isValid ? "brand" : "destructive"}
          />

          <div
            className="h-6 w-px border-l border-dashed border-muted-foreground/50 sm:h-px sm:w-6 sm:border-l-0 sm:border-t"
            aria-hidden
          />

          <HashColumn
            label="Next block expects"
            hash={EXPECTED_HASH}
            tone="brand"
          />
        </div>

        <p className="caption max-w-sm text-center text-muted-foreground">
          Demo fingerprint, not SHA-256. The same block always gives this
          result. Change it, and the result changes.
        </p>

        <div className="flex items-center justify-center gap-3">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full border",
              isValid
                ? "border-brand text-brand-text"
                : "border-destructive bg-destructive text-destructive-foreground",
            )}
            aria-hidden
          >
            {isValid ? (
              <CheckIcon className="size-icon" />
            ) : (
              <XIcon className="size-icon" />
            )}
          </span>
          <p
            role="status"
            aria-live="polite"
            className="text-body text-foreground"
          >
            {statusLines[0]}
            <br />
            {statusLines[1]}
          </p>
        </div>
      </div>
    </figure>
  );
}

function HashColumn({
  label,
  hash,
  tone,
}: {
  label: string;
  hash: string;
  tone: "brand" | "destructive";
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <p className="text-body font-medium text-foreground">{label}</p>
      <HashPill hash={hash} tone={tone} />
    </div>
  );
}
