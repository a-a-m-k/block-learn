"use client";

import {
  FACE_CHROME_CLASS,
  FACE_INSET_CLASS,
  LedgerPersonFace,
  type FaceGaze,
  type FaceMood,
  type FaceVariant,
} from "@/components/ledger/person-face";
import { cn } from "@/lib/utils";

type PersonAvatarProps = {
  name: string;
  variant: FaceVariant;
  mood: FaceMood;
  gaze?: FaceGaze;
  className?: string;
  /** Face circle size (defaults to fill the container). */
  faceClassName?: string;
  /**
   * `overlay` — name sits under the face without affecting layout (diagram).
   * `stack` — name flows below the face (distributed copies).
   */
  namePlacement?: "overlay" | "stack";
};

export function PersonAvatar({
  name,
  variant,
  mood,
  gaze,
  className,
  faceClassName = "size-full",
  namePlacement = "stack",
}: PersonAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center",
        namePlacement === "overlay" && "aspect-square",
        namePlacement === "stack" && "gap-1 md:gap-1.5",
        className,
      )}
    >
      <div className={cn(FACE_CHROME_CLASS, faceClassName)}>
        <LedgerPersonFace
          variant={variant}
          mood={mood}
          gaze={gaze}
          className={FACE_INSET_CLASS}
        />
      </div>
      <span
        className={cn(
          "font-medium tracking-wide text-muted-foreground",
          namePlacement === "stack" && "caption sm:text-body",
          namePlacement === "overlay" &&
            "caption pointer-events-none absolute top-full mt-1",
        )}
      >
        {name}
      </span>
    </div>
  );
}
