import { useRef, type KeyboardEvent } from "react";

import { rovingKeyAction } from "@/lib/roving-focus";
import { cn } from "@/lib/utils";

import {
  CARD_HEADING,
  FIELD_ICONS,
  PANEL,
  type TransactionField,
} from "./constants";

type FieldListProps = {
  fields: TransactionField[];
  activeIndex: number;
  onSelectField: (index: number) => void;
};

export function FieldList({
  fields,
  activeIndex,
  onSelectField,
}: FieldListProps) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveSelection(nextIndex: number) {
    const clamped = Math.max(0, Math.min(fields.length - 1, nextIndex));
    onSelectField(clamped);
    optionRefs.current[clamped]?.focus({ preventScroll: true });
  }

  function moveFromKey(event: KeyboardEvent, index: number) {
    const action = rovingKeyAction(event.key, index, fields.length);
    if (action.type !== "move") return;
    event.preventDefault();
    moveSelection(action.index);
  }

  return (
    <div data-part="list" className={cn(PANEL, "flex h-full flex-col gap-4")}>
      <h3 className={CARD_HEADING}>Transaction</h3>
      <ul
        role="listbox"
        aria-label="Transaction fields"
        tabIndex={-1}
        className="flex flex-col gap-2 outline-none"
        onKeyDown={(event) => moveFromKey(event, activeIndex)}
      >
        {fields.map((item, index) => {
          const Icon = FIELD_ICONS[item.icon];
          const selected = index === activeIndex;

          return (
            <li
              key={item.id}
              className={cn(
                "group flex flex-col rounded-md border transition-colors",
                selected
                  ? "border-brand"
                  : "border-muted-foreground/50 hover:border-brand/40",
              )}
            >
              <button
                id={`tx-field-${item.id}`}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="option"
                tabIndex={selected ? 0 : -1}
                className="flex min-h-(--size-control-lg) w-full min-w-0 items-center gap-3 overflow-hidden rounded-md px-3 py-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-selected={selected}
                data-selected={selected ? "" : undefined}
                onClick={() => onSelectField(index)}
                onKeyDown={(event) => moveFromKey(event, index)}
                onFocus={() => {
                  if (!selected) onSelectField(index);
                }}
              >
                <span className="flex shrink-0 items-center gap-2">
                  <Icon
                    aria-hidden
                    className={cn(
                      "size-icon-lg shrink-0",
                      selected ? "text-brand-text" : "text-muted-foreground",
                    )}
                  />
                  <span className="text-body font-medium text-foreground">
                    {item.label}
                  </span>
                </span>
                <span
                  className="min-w-0 flex-1 truncate text-end text-body font-medium text-muted-foreground"
                  title={item.value}
                >
                  {item.value}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
