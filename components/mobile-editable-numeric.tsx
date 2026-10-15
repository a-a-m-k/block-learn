"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { validateNumericDraft } from "@/lib/validate-numeric-draft";

/** Border and padding shared with the static amount column. */
export const amountFieldChromeClass =
  "inline-flex shrink-0 items-center justify-end gap-0 border py-0.5 pr-1.5 pl-2 md:py-1";

/** Shared by the resting pill and the edit controls so a row does not grow. */
const amountControlHeightClass = "h-[1.75em] max-h-[1.75em]";

export type AmountEditSession = "start" | "commit" | "cancel";

type MobileEditableNumericProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  prefix?: string;
  /** Visual column width. Wider than this field's max so digits stack with sibling rows. */
  digits?: number;
  onCommit: (value: number) => void;
  /** Blue cue on the resting amount, used while a hint is pointing at it. */
  cueClassName?: string;
  onEditSession?: (event: AmountEditSession) => void;
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
  cueClassName,
  onEditSession,
  shellClassName,
  inputClassName,
  prefixClassName,
  ...inputProps
}: MobileEditableNumericProps) {
  const floor = Math.max(0, min);
  const ceiling = Math.max(floor, max);
  const [draft, setDraft] = useState(String(value));
  const [editing, setEditing] = useState(false);
  const skipBlur = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxDigits = String(Math.max(0, Math.floor(ceiling))).length;
  const columnDigits = Math.max(maxDigits, digits ?? maxDigits);
  const digitStyle = { width: `${columnDigits}ch` };

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  useEffect(() => {
    if (!editing) return;
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    input.select();
  }, [editing]);

  function commitDraft() {
    const result = validateNumericDraft(draft, floor, ceiling);
    if (!result.ok || result.value === null) {
      setDraft(String(value));
      return false;
    }

    if (result.value !== value) onCommit(result.value);
    setDraft(String(result.value));
    return result.value !== value;
  }

  function closeEdit(event: AmountEditSession) {
    skipBlur.current = true;
    setEditing(false);
    onEditSession?.(event);
  }

  function saveEdit() {
    const changed = commitDraft();
    closeEdit(changed ? "commit" : "cancel");
  }

  function cancelEdit() {
    setDraft(String(value));
    closeEdit("cancel");
  }

  function startEdit() {
    setDraft(String(value));
    setEditing(true);
    onEditSession?.("start");
  }

  if (!editing) {
    return (
      <button
        type="button"
        data-amount-field=""
        aria-label={`Edit ${label}, ${prefix}${value}`}
        onClick={startEdit}
        className={cn(
          amountControlHeightClass,
          "group inline-flex w-fit shrink-0 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-semibold leading-none text-foreground tabular-nums",
          "focus-visible:outline-none",
          cueClassName,
          shellClassName,
        )}
      >
        <span
          data-amount-pill=""
          className="inline-flex h-full min-h-0 items-center gap-1 rounded-md border border-border bg-card px-2 shadow-card transition-all group-hover:border-brand group-hover:bg-brand/10 group-focus-visible:border-brand group-focus-visible:ring-2 group-focus-visible:ring-brand/40"
        >
          {prefix ? (
            <span className={cn("select-none", prefixClassName)} aria-hidden>
              {prefix}
            </span>
          ) : null}
          <span className="text-right" style={digitStyle}>
            {value}
          </span>
        </span>
        <PencilIcon
          className="size-[1.15em] shrink-0 text-muted-foreground transition-colors group-hover:text-brand-text"
          aria-hidden
        />
      </button>
    );
  }

  return (
    <div
      data-amount-field=""
      className={cn(
        amountControlHeightClass,
        "inline-flex min-h-0 shrink-0 items-center gap-2",
      )}
    >
      <label
        className={cn(
          "inline-flex h-full min-h-0 items-center rounded-md border border-brand bg-card px-2 leading-none shadow-brand ring-2 ring-brand/15",
          shellClassName,
        )}
      >
        <span className="sr-only">{label}</span>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draft}
          aria-label={label}
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
            if (skipBlur.current) {
              skipBlur.current = false;
              return;
            }
            const changed = commitDraft();
            setEditing(false);
            onEditSession?.(changed ? "commit" : "cancel");
          }}
          onKeyDown={(event) => {
            if (event.key === "-" || event.key === "Minus") {
              event.preventDefault();
              return;
            }
            if (event.key === "Enter") {
              event.preventDefault();
              saveEdit();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              cancelEdit();
            }
          }}
          className={cn(
            "m-0 h-full min-h-0 shrink-0 border-0 bg-transparent p-0 text-right text-inherit leading-none outline-none",
            "tabular-nums max-md:text-base focus-visible:ring-0",
            inputClassName,
          )}
          {...inputProps}
          style={digitStyle}
        />
      </label>
      <button
        type="button"
        aria-label="Save amount"
        onMouseDown={(event) => event.preventDefault()}
        onClick={saveEdit}
        className="grid aspect-square h-full min-h-0 shrink-0 place-items-center rounded-md border border-brand bg-brand text-brand-foreground shadow-card transition-colors hover:bg-brand/80 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
      >
        <CheckIcon className="size-[1em]" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Cancel amount edit"
        onMouseDown={(event) => event.preventDefault()}
        onClick={cancelEdit}
        className="grid aspect-square h-full min-h-0 shrink-0 place-items-center rounded-md border border-border bg-card text-muted-foreground shadow-card transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
      >
        <XIcon className="size-[1em]" aria-hidden />
      </button>
    </div>
  );
}
