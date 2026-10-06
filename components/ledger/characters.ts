import type { FaceVariant } from "@/components/ledger/person-face";

/** Shared cast for Alice, Bob, Emma, and Alex across every diagram. */
export const FACE_BY_NAME = {
  Alice: "short",
  Bob: "mustache",
  Emma: "spiky",
  Alex: "beard",
} as const satisfies Record<string, FaceVariant>;

export type CharacterName = keyof typeof FACE_BY_NAME;

export function faceFor(name: string): FaceVariant {
  if (name in FACE_BY_NAME) {
    return FACE_BY_NAME[name as CharacterName];
  }
  return "short";
}

export function faceIfKnown(name?: string): FaceVariant | null {
  if (name && name in FACE_BY_NAME) {
    return FACE_BY_NAME[name as CharacterName];
  }
  return null;
}
