import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  CARD_HEADING,
  FIELD_ICONS,
  NAV_BUTTON_BRAND,
  NAV_BUTTON_CLASS,
  NAV_BUTTON_MUTED,
  type TransactionField,
} from "./constants";

type FieldDetailPanelProps = {
  field: TransactionField;
  activeIndex: number;
  fieldCount: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export function FieldDetailPanel({
  field,
  activeIndex,
  fieldCount,
  onPrev,
  onNext,
  className,
}: FieldDetailPanelProps) {
  const FieldIcon = FIELD_ICONS[field.icon];
  const lastIndex = fieldCount - 1;

  return (
    <div
      data-part="detail"
      className={cn("flex flex-col justify-between gap-4", className)}
    >
      <div data-part="detail-body" className="flex flex-col gap-4">
        <h3 className={cn(CARD_HEADING, "text-foreground")}>{field.label}</h3>
        <div className="flex items-start gap-3">
          <span data-part="detail-icon" className="shrink-0">
            <FieldIcon aria-hidden className="size-mark text-brand-text" />
          </span>
          <p className="min-w-0 text-body text-muted-foreground">
            {field.description}
          </p>
        </div>
      </div>

      <div data-part="nav" className="flex items-center justify-around">
        <button
          type="button"
          aria-label="Previous field"
          className={cn(NAV_BUTTON_CLASS, NAV_BUTTON_MUTED)}
          disabled={activeIndex === 0}
          onClick={onPrev}
        >
          <ChevronLeftIcon aria-hidden className="size-icon-lg" />
        </button>
        <p className="text-body text-muted-foreground">
          {activeIndex + 1} of {fieldCount}
        </p>
        <button
          type="button"
          aria-label="Next field"
          className={cn(
            NAV_BUTTON_CLASS,
            activeIndex === lastIndex ? NAV_BUTTON_MUTED : NAV_BUTTON_BRAND,
          )}
          disabled={activeIndex === lastIndex}
          onClick={onNext}
        >
          <ChevronRightIcon aria-hidden className="size-icon-lg" />
        </button>
      </div>
    </div>
  );
}
