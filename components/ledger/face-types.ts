/** Side-eye offset in face units (−1 | 0 | 1). */
export type FaceGaze = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
};

export type FaceMood = "neutral" | "happy" | "disappointed" | "angry";

/**
 * Legacy variant names are kept because they are part of the diagram model.
 * Each now maps to a complete, recognizable character silhouette.
 */
export type FaceVariant = "mustache" | "beard" | "spiky" | "short";

export type FacePalette = {
  skin: string;
  skinShade: string;
  hair: string;
  hairShade: string;
  mouth: string;
  facialHair: string;
  clothing: string;
};

export const FACE_PALETTE: Record<FaceVariant, FacePalette> = {
  short: {
    skin: "#8c5135",
    skinShade: "#6f3d29",
    hair: "#56c7f3",
    hairShade: "#238fbd",
    mouth: "#ff91b9",
    facialHair: "#238fbd",
    clothing: "#2477ff",
  },
  mustache: {
    skin: "#e0a071",
    skinShade: "#bd7955",
    hair: "#f6b84a",
    hairShade: "#be741c",
    mouth: "#a74343",
    facialHair: "#8d541d",
    clothing: "#d88428",
  },
  spiky: {
    skin: "#f0c6a5",
    skinShade: "#d79c78",
    hair: "#ae88ef",
    hairShade: "#7753be",
    mouth: "#c45376",
    facialHair: "#7753be",
    clothing: "#855fd1",
  },
  beard: {
    skin: "#a8694a",
    skinShade: "#865038",
    hair: "#4ecf83",
    hairShade: "#208f54",
    mouth: "#ef9d68",
    facialHair: "#28774d",
    clothing: "#23885b",
  },
};
