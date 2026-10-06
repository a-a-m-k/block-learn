"use client";

import { AMOUNT_DIGITS } from "@/components/ledger/types";
import { MobileEditableNumeric } from "@/components/mobile-editable-numeric";
import { cn } from "@/lib/utils";

type EditableAmountProps = {
  from: string;
  to: string;
  amount: number;
  minAmount: number;
  maxAmount: number;
  amountClass: string;
  onAmountChange: (amount: number) => void;
};

export function EditableAmount({
  from,
  to,
  amount,
  minAmount,
  maxAmount,
  amountClass,
  onAmountChange,
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
      shellClassName={cn("w-fit", amountClass)}
      prefixClassName={amountClass}
    />
  );
}
