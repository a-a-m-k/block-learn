"use client";

import { amountDigitsStyle, amountSlotClass } from "@/components/ledger/amount-slot";
import { EditableAmount } from "@/components/ledger/editable-amount";
import type { AmountEditSession } from "@/components/mobile-editable-numeric";
import { cn } from "@/lib/utils";

type AmountTone = "default" | "brand" | "destructive";

type LedgerEntryRowProps = {
  from: string;
  to: string;
  amount: number;
  maxAmount: number;
  minAmount?: number;
  isLast?: boolean;
  rowTone?: "default" | "brand";
  amountTone?: AmountTone;
  editable?: boolean;
  /** Tighter type/padding for narrow block diagrams. */
  compact?: boolean;
  /** Shown beside the names when this line no longer matches the original. */
  edited?: boolean;
  /** Absolute amount (already preferred over delta bumps). */
  onAmountChange?: (amount: number) => void;
  /** Resting highlight while a hint points at this amount. */
  cueClassName?: string;
  onEditSession?: (event: AmountEditSession) => void;
  className?: string;
};

const AMOUNT_TONE_CLASS: Record<AmountTone, string> = {
  default: "text-foreground",
  brand: "text-brand-text",
  destructive: "text-destructive",
};

export function LedgerEntryRow({
  from,
  to,
  amount,
  maxAmount,
  minAmount = 0,
  isLast,
  rowTone = "default",
  amountTone = "default",
  editable = false,
  compact = false,
  edited = false,
  onAmountChange,
  cueClassName,
  onEditSession,
  className,
}: LedgerEntryRowProps) {
  const amountClass = cn(
    "font-medium tabular-nums",
    AMOUNT_TONE_CLASS[amountTone],
  );

  const canEdit = editable && !!onAmountChange;

  return (
    <li
      className={cn(
        !isLast && "border-b border-muted-foreground/50",
        rowTone === "brand" && "bg-brand/15",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full min-w-0 items-center justify-between leading-tight",
          compact
            ? "gap-1 px-3 py-1.5 caption sm:gap-1.5 sm:py-1.5 sm:text-body md:gap-2 md:px-2.5 md:py-2 lg:px-3"
            : "gap-2 px-2 py-2 text-body sm:gap-2.5 sm:px-2.5 sm:py-2.5 md:gap-3 md:px-3 md:py-2.5",
        )}
      >
        <span className="flex min-w-0 flex-1 items-baseline gap-1.5">
          <span
            className="min-w-0 truncate text-muted-foreground"
            title={`${from} → ${to}`}
          >
            {from} → {to}
          </span>
          {edited ? (
            <span className="shrink-0 caption text-foreground">edited</span>
          ) : null}
        </span>
        {canEdit ? (
          <EditableAmount
            from={from}
            to={to}
            amount={amount}
            minAmount={minAmount}
            maxAmount={maxAmount}
            amountClass={amountClass}
            onAmountChange={onAmountChange}
            cueClassName={cueClassName}
            onEditSession={onEditSession}
          />
        ) : (
          <span className={cn(amountSlotClass(compact), amountClass)}>
            <span>$</span>
            <span className="text-right" style={amountDigitsStyle()}>
              {amount}
            </span>
          </span>
        )}
      </div>
    </li>
  );
}
