/** Hold the idle/waiting visual before a step plays. */
export const IDLE_HOLD_MS = 1000;

/** Shared entrance timing for create-transaction step visuals. */
export const appear = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Waiting-ring fade before reveal content. */
export const ringFade = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const VISUAL_FRAME =
  "flex h-full min-h-0 w-full min-w-0 sm:min-h-36";
