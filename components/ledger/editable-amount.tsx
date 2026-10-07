"use client";

import { AMOUNT_DIGITS } from "@/components/ledger/types";
import {
  MobileEditableNumeric,
  type AmountEditSession,
} from "@/components/mobile-editable-numeric";
import { cn } from "@/lib/utils";

type EditableAmountProps = {
  from: string;
  to: string;
  amount: number;
  minAmount: number;
  maxAmount: number;
  amountClass: string;
  onAmountChange: (amount: number) => void;
  cueClassName?: string;
  onEditSession?: (event: AmountEditSession) => void;
};

export function EditableAmount({
  from,
  to,
  amount,
  minAmount,
  maxAmount,
  amountClass,
  onAmountChange,
  cueClassName,
  onEditSession,
}: EditableAmountProps) {
  return (
    <MobileEditableNumeric
      label={`Amount ${from} owes ${to}`}
      value={amount}
      min={minAmount}
      max={maxAmount}
      prefix="$"
      digits={AMOUNT_DIGITS}
      onCommit={onAmountChange}
      cueClassName={cueClassName}
      onEditSession={onEditSession}
      shellClassName={cn("w-fit", amountClass)}
      prefixClassName={amountClass}
    />
  );
}
