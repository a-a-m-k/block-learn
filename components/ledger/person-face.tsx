import { cn } from "@/lib/utils";

import { Brows, Eyes, Hair, Mouth } from "./face-parts";
import {
  FACE_PALETTE,
  type FaceGaze,
  type FaceMood,
  type FaceVariant,
} from "./face-types";

export type { FaceGaze, FaceMood, FaceVariant };

/** Face artwork inset inside a circular crop. */
export const FACE_INSET_CLASS = "absolute inset-[6%]";

/** Circular crop chrome shared by avatars, notebooks, and diagram faces. */
export const FACE_CHROME_CLASS =
  "relative shrink-0 overflow-hidden rounded-full border border-muted-foreground/50 bg-panel";

type LedgerPersonFaceProps = {
  variant: FaceVariant;
  mood: FaceMood;
  gaze?: FaceGaze;
  className?: string;
};

export function LedgerPersonFace({
  variant,
  mood,
  gaze = { x: 0, y: 0 },
  className,
}: LedgerPersonFaceProps) {
  const palette = FACE_PALETTE[variant];

  return (
    <svg
      viewBox="0 0 16 16"
      className={cn(
        "overflow-hidden transition-all duration-300 motion-reduce:transition-none",
        className,
      )}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="3" y="3" width="10" height="11" fill="#f2f2f2" />

      <Hair variant={variant} hair={palette.hair} shade={palette.hairShade} />
      <Eyes mood={mood} gaze={gaze} />
      <Brows mood={mood} color={palette.hairShade} />
      {variant === "beard" ? (
        <>
          <rect x="5" y="13" width="6" height="1" fill={palette.facialHair} />
          <rect x="6" y="14" width="4" height="1" fill={palette.hairShade} />
        </>
      ) : null}
      <Mouth mood={mood} color={palette.mouth} />
    </svg>
  );
}
