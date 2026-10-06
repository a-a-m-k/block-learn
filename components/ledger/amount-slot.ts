import { amountFieldChromeClass } from "@/components/mobile-editable-numeric";
import { AMOUNT_DIGITS } from "@/components/ledger/types";
import { cn } from "@/lib/utils";

export function amountSlotWidthClass(compact: boolean) {
  return compact ? "min-w-8 sm:min-w-12 md:min-w-14" : "min-w-16";
}

/** Right-aligned amount column for static `$10` text. */
export function amountSlotClass(compact: boolean) {
  return cn(
    amountFieldChromeClass,
    "border-transparent text-right",
    amountSlotWidthClass(compact),
  );
}

export function amountDigitsStyle() {
  return { width: `${AMOUNT_DIGITS}ch` } as const;
}
