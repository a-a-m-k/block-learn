import { cn } from "@/lib/utils";

import {
  Brows,
  Eyes,
  FacialHair,
  HairBack,
  HairFront,
  Mouth,
  Nose,
} from "./face-parts";
import {
  FACE_PALETTE,
  type FaceGaze,
  type FaceMood,
  type FaceVariant,
} from "./face-types";

export type { FaceGaze, FaceMood, FaceVariant };

/** Face artwork inset inside its avatar crop. */
export const FACE_INSET_CLASS = "absolute inset-[4%]";

/** Shared avatar chrome used by notebooks and interactive diagrams. */
export const FACE_CHROME_CLASS =
  "relative shrink-0 overflow-hidden rounded-full border border-border bg-surface-raised shadow-card";

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
      viewBox="0 0 64 64"
      className={cn(
        "overflow-hidden transition-all duration-300 motion-reduce:transition-none",
        className,
      )}
      shapeRendering="geometricPrecision"
      aria-hidden
    >
      <circle cx="32" cy="32" r="32" fill="#111318" />
      <circle cx="32" cy="30" r="27" fill="#171a20" />

      <path
        d="M7 64c2-11 11.5-17 25-17s23 6 25 17H7Z"
        fill={palette.clothing}
      />
      <path d="M27 43h10v10H27z" fill={palette.skinShade} />

      <HairBack variant={variant} palette={palette} />

      <circle cx="16.5" cy="32.5" r="4.5" fill={palette.skinShade} />
      <circle cx="47.5" cy="32.5" r="4.5" fill={palette.skinShade} />
      <path
        d="M16 27c0-11 6.5-18 16-18s16 7 16 18v10c0 10-7.2 17-16 17s-16-7-16-17V27Z"
        fill={palette.skin}
      />
      <path
        d="M18 40c2.2 7.5 7.3 12 14 12 6.5 0 11.5-4.2 14-11.5-1.2 9-6.8 15-14 15-7.5 0-13-6.2-14-15.5Z"
        fill={palette.skinShade}
        opacity="0.24"
      />

      <HairFront variant={variant} palette={palette} />
      <Brows mood={mood} color={palette.hairShade} />
      <Eyes mood={mood} gaze={gaze} />
      <Nose color={palette.skinShade} />
      <FacialHair variant={variant} color={palette.facialHair} />
      <Mouth mood={mood} color={palette.mouth} />

      {variant === "short" || variant === "spiky" ? (
        <>
          <circle cx="16.5" cy="37" r="1.5" fill={palette.mouth} />
          <circle cx="47.5" cy="37" r="1.5" fill={palette.mouth} />
        </>
      ) : null}
    </svg>
  );
}
