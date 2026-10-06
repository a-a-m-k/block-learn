/** Side-eye offset in face pixels (−1 | 0 | 1). */
export type FaceGaze = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
};

export type FaceMood = "neutral" | "happy" | "disappointed" | "angry";

export type FaceVariant = "mustache" | "beard" | "spiky" | "short";

export const FACE_PALETTE: Record<
  FaceVariant,
  { hair: string; hairShade: string; mouth: string; facialHair: string }
> = {
  short: {
    hair: "#5ec8ff",
    hairShade: "#3aa0d8",
    mouth: "#ff7ab8",
    facialHair: "#5ec8ff",
  },
  mustache: {
    hair: "#ffb347",
    hairShade: "#e09220",
    mouth: "#ff6b6b",
    facialHair: "#e09220",
  },
  spiky: {
    hair: "#b794f6",
    hairShade: "#8b5cf6",
    mouth: "#67e8f9",
    facialHair: "#b794f6",
  },
  beard: {
    hair: "#4ade80",
    hairShade: "#22c55e",
    mouth: "#fb923c",
    facialHair: "#22c55e",
  },
};
