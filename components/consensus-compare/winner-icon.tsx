import { ShieldCheckIcon, StarIcon, TrophyIcon } from "lucide-react";
import {
  FACE_CHROME_CLASS,
  FACE_INSET_CLASS,
  LedgerPersonFace,
  type FaceVariant,
} from "@/components/ledger/person-face";
import { cn } from "@/lib/utils";

import { accentBorder, accentText } from "./compare-layout";
import type { CompareAccent } from "./types";

export function WinnerIcon({
  variant,
  accent,
  showTrophy = true,
}: {
  variant: FaceVariant | null;
  accent: CompareAccent;
  showTrophy?: boolean;
}) {
  const isPow = accent === "pow";

  if (variant) {
    return (
      <div className="relative size-full">
        <div
          className={cn(FACE_CHROME_CLASS, "size-full", accentBorder(accent))}
        >
          <LedgerPersonFace
            variant={variant}
            mood="happy"
            className={FACE_INSET_CLASS}
          />
        </div>
        {showTrophy ? (
          <TrophyIcon
            className={cn(
              "absolute -bottom-0.5 -right-0.5 size-4 @[28rem]/stage:size-6",
              accentText(accent),
            )}
            strokeWidth={1.75}
            aria-hidden
          />
        ) : null}
      </div>
    );
  }

  return isPow ? (
    <ResultTrophy />
  ) : (
    <ShieldCheckIcon
      className={cn("size-full", accentText(accent))}
      strokeWidth={1.25}
      aria-hidden
    />
  );
}

function ResultTrophy() {
  return (
    <div className="relative size-full">
      <TrophyIcon
        className="size-full text-foreground"
        strokeWidth={1.25}
        aria-hidden
      />
      <StarIcon
        className="absolute left-1/2 top-[32%] size-3.5 -translate-x-1/2 fill-pow text-pow"
        aria-hidden
      />
    </div>
  );
}
