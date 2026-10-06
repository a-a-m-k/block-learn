import type { FaceGaze } from "@/components/ledger/person-face";

export type Vec2 = { x: number; y: number };

export function gazeAxis(value: number): -1 | 0 | 1 {
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}

/** Gaze from one vector position toward another. */
export function gazeBetween(from: Vec2, to: Vec2): FaceGaze {
  return {
    x: gazeAxis(to.x - from.x),
    y: gazeAxis(to.y - from.y),
  };
}

/** Gaze along a direction vector (e.g. outward from center). */
export function gazeAlong(direction: Vec2): FaceGaze {
  return {
    x: gazeAxis(direction.x),
    y: gazeAxis(direction.y),
  };
}

/** Gaze between two named positions using a vector map. */
export function gazeTowardFromMap<P extends string>(
  from: P,
  to: P,
  vecs: Record<P, Vec2>,
): FaceGaze {
  return gazeBetween(vecs[from], vecs[to]);
}
