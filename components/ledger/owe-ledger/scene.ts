import { FACE_BY_NAME } from "@/components/ledger/characters";
import {
  gazeAlong,
  gazeTowardFromMap,
  type Vec2,
} from "@/components/ledger/gaze";
import type {
  FaceGaze,
  FaceMood,
  FaceVariant,
} from "@/components/ledger/person-face";

import {
  getNets,
  KEEPER_NAME,
  uniquePeople,
  type AmountEntry,
} from "./model";

export type ReaderPosition = "top" | "left" | "right" | "bottom";

type ScenePerson = {
  name: string;
  mood: FaceMood;
  variant: FaceVariant;
  gaze?: FaceGaze;
};

export type SceneKeeper = ScenePerson;
export type SceneReader = ScenePerson & { position: ReaderPosition };

export const ANGRY_DELTA = -1;

export const FACE_PRESETS: {
  variant: FaceVariant;
  position: ReaderPosition;
}[] = [
  { variant: FACE_BY_NAME.Alice, position: "top" },
  { variant: FACE_BY_NAME.Emma, position: "left" },
  { variant: FACE_BY_NAME.Alex, position: "right" },
];

const POSITION_VEC: Record<ReaderPosition, Vec2> = {
  top: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

const KEEPER_VARIANT: FaceVariant = FACE_BY_NAME.Bob;

export function moodFromDelta(delta: number): FaceMood {
  if (delta > 0) return "happy";
  if (delta <= ANGRY_DELTA) return "angry";
  if (delta < 0) return "disappointed";
  return "neutral";
}

function gazeToward(from: ReaderPosition, to: ReaderPosition): FaceGaze {
  return gazeTowardFromMap(from, to, POSITION_VEC);
}

function gazeAtNotebook(position: ReaderPosition): FaceGaze {
  const v = POSITION_VEC[position];
  return gazeAlong({ x: -v.x, y: -v.y });
}

function gazeFromCenter(to: ReaderPosition): FaceGaze {
  return gazeAlong(POSITION_VEC[to]);
}

/** Best counterpart by harm (owing more / owed less) or help (owing less / owed more). */
function findBestCounterpart(
  name: string,
  baseline: AmountEntry[],
  current: AmountEntry[],
  mode: "harm" | "help",
) {
  let bestOther: string | null = null;
  let best = 0;
  const sign = mode === "harm" ? 1 : -1;

  for (let i = 0; i < baseline.length; i++) {
    const before = baseline[i]!;
    const after = current[i]!;
    const amountDelta = after.amount - before.amount;

    if (name === before.from) {
      const score = sign * amountDelta;
      if (score > best) {
        best = score;
        bestOther = before.to;
      }
    }

    if (name === before.to) {
      const score = sign * -amountDelta;
      if (score > best) {
        best = score;
        bestOther = before.from;
      }
    }
  }

  return best > 0 ? bestOther : null;
}

function gazeFor(
  name: string,
  mood: FaceMood,
  positionByName: Map<string, ReaderPosition>,
  baseline: AmountEntry[],
  current: AmountEntry[],
  position?: ReaderPosition,
): FaceGaze | undefined {
  const toward = (targetName: string | null): FaceGaze | undefined => {
    if (!targetName) return undefined;

    if (name === KEEPER_NAME) {
      const targetPos = positionByName.get(targetName);
      return targetPos ? gazeFromCenter(targetPos) : undefined;
    }

    if (targetName === KEEPER_NAME && position) {
      return gazeAtNotebook(position);
    }

    const targetPos = positionByName.get(targetName);
    if (position && targetPos) {
      return gazeToward(position, targetPos);
    }
    return undefined;
  };

  if (mood === "angry" || mood === "disappointed") {
    return toward(findBestCounterpart(name, baseline, current, "harm"));
  }

  if (mood === "happy") {
    return toward(findBestCounterpart(name, baseline, current, "help"));
  }

  if (name === KEEPER_NAME) {
    return { x: 0, y: 0 };
  }

  return position ? gazeAtNotebook(position) : undefined;
}

/** Keeper and reader faces from how each person's net changed. */
export function buildOweScene(
  baseline: AmountEntry[],
  current: AmountEntry[],
): { keeper: SceneKeeper; readers: SceneReader[] } {
  const baselineNets = getNets(baseline);
  const currentNets = getNets(current);
  const readerNames = uniquePeople(baseline).filter(
    (name) => name !== KEEPER_NAME,
  );

  const positionByName = new Map<string, ReaderPosition>(
    readerNames.map((name, index) => [
      name,
      FACE_PRESETS[index % FACE_PRESETS.length]!.position,
    ]),
  );

  const variantByName = new Map<string, FaceVariant>([
    [KEEPER_NAME, KEEPER_VARIANT],
    ...readerNames.map(
      (name, index) =>
        [name, FACE_PRESETS[index % FACE_PRESETS.length]!.variant] as const,
    ),
  ]);

  const moodFor = (name: string) =>
    moodFromDelta((currentNets[name] ?? 0) - (baselineNets[name] ?? 0));

  const keeperMood = moodFor(KEEPER_NAME);
  const keeper: SceneKeeper = {
    name: KEEPER_NAME,
    variant: variantByName.get(KEEPER_NAME)!,
    mood: keeperMood,
    gaze: gazeFor(KEEPER_NAME, keeperMood, positionByName, baseline, current),
  };

  const readers: SceneReader[] = readerNames.map((name) => {
    const position = positionByName.get(name)!;
    const mood = moodFor(name);
    return {
      name,
      variant: variantByName.get(name)!,
      mood,
      gaze: gazeFor(name, mood, positionByName, baseline, current, position),
      position,
    };
  });

  return { keeper, readers };
}
