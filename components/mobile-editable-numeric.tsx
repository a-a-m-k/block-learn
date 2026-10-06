"use client";

import { useEffect, useState, type ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { validateNumericDraft } from "@/lib/validate-numeric-draft";

/** Border and padding shared with the static amount column. */
export const amountFieldChromeClass =
  "inline-flex shrink-0 items-center justify-end gap-0 border py-0.5 pr-1.5 pl-2 md:py-1";

/** Gray fill and a border so the amount reads as something you can type. */
export function mobileEditableNumericShellClass(className?: string) {
  return cn(
    amountFieldChromeClass,
    "rounded-sm border-muted-foreground/75 bg-muted",
    "transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
    className,
  );
}

export function mobileEditableNumericInputClass(className?: string) {
  return cn(
    "m-0 min-h-0 shrink-0 border-0 bg-transparent p-0 text-right text-inherit leading-tight outline-none",
    "tabular-nums max-md:focus:text-base focus-visible:ring-0",
    className,
  );
}

type MobileEditableNumericProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  prefix?: string;
  /** Visual column width. Wider than this field's max so digits stack with sibling rows. */
  digits?: number;
  onCommit: (value: number) => void;
  shellClassName?: string;
  inputClassName?: string;
  prefixClassName?: string;
} & Omit<ComponentProps<"input">, "value" | "onChange" | "type" | "className">;

export function MobileEditableNumeric({
  label,
  value,
  min,
  max,
  prefix = "",
  digits,
  onCommit,
  shellClassName,
  inputClassName,
  prefixClassName,
  ...inputProps
}: MobileEditableNumericProps) {
  const floor = Math.max(0, min);
  const ceiling = Math.max(floor, max);
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const maxDigits = String(Math.max(0, Math.floor(ceiling))).length;
  const columnDigits = Math.max(maxDigits, digits ?? maxDigits);

  useEffect(() => {
    if (!focused) setDraft(String(value));
  }, [value, focused]);

  function commitDraft() {
    const result = validateNumericDraft(draft, floor, ceiling);
    if (!result.ok || result.value === null) {
      setDraft(String(value));
      return;
    }

    if (result.value !== value) onCommit(result.value);
    setDraft(String(result.value));
  }

  return (
    <label className={mobileEditableNumericShellClass(shellClassName)}>
      <span className="sr-only">{label}</span>
      {prefix ? (
        <span className={cn("select-none", prefixClassName)} aria-hidden>
          {prefix}
        </span>
      ) : null}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={draft}
        onFocus={() => setFocused(true)}
        onChange={(event) => {
          const result = validateNumericDraft(
            event.target.value,
            floor,
            ceiling,
            draft,
          );
          if (!result.ok) {
            event.target.value = draft;
            return;
          }
          setDraft(result.draft);
        }}
        onBlur={() => {
          commitDraft();
          setFocused(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "-" || event.key === "Minus") {
            event.preventDefault();
            return;
          }
          if (event.key === "Enter") event.currentTarget.blur();
        }}
        className={mobileEditableNumericInputClass(inputClassName)}
        {...inputProps}
        style={{ width: `${columnDigits}ch` }}
      />
    </label>
  );
}
