export type StakeValidator = {
  name: string;
  stake: number;
  winner: boolean;
};

export type ValidatorMood = "neutral" | "happy" | "disappointed";

export function maxStakeIndex(validators: readonly { stake: number }[]) {
  let best = 0;
  for (let i = 1; i < validators.length; i++) {
    if (validators[i].stake > validators[best].stake) best = i;
  }
  return best;
}

/** Flagged winner, otherwise the largest stake. Ties keep the earlier index. */
export function selectedIndex(
  validators: readonly { stake: number; winner: boolean }[],
) {
  const flagged = validators.findIndex((validator) => validator.winner);
  if (flagged >= 0) return flagged;
  return maxStakeIndex(validators);
}

export function stakeStepMs(validatorCount: number, revealWaitMs: number) {
  return Math.max(280, Math.floor(revealWaitMs / (validatorCount + 1)));
}

export type StakeSnapshot =
  | { mode: "instant"; highlightedIndex: number; locked: true }
  | { mode: "idle"; highlightedIndex: -1; locked: false }
  | { mode: "walking"; highlightedIndex: 0; locked: false; stepMs: number };

export function stakeSnapshot(input: {
  playing: boolean;
  done: boolean;
  reduceMotion: boolean;
  validators: readonly StakeValidator[];
  revealWaitMs: number;
}): StakeSnapshot {
  const winnerIndex = selectedIndex(input.validators);

  if (input.reduceMotion || input.done) {
    return { mode: "instant", highlightedIndex: winnerIndex, locked: true };
  }

  if (!input.playing) {
    return { mode: "idle", highlightedIndex: -1, locked: false };
  }

  return {
    mode: "walking",
    highlightedIndex: 0,
    locked: false,
    stepMs: stakeStepMs(input.validators.length, input.revealWaitMs),
  };
}

/** Walk one validator forward. Past the last index, lock onto the winner. */
export function advanceStakeHighlight(
  index: number,
  length: number,
  winnerIndex: number,
) {
  const next = index + 1;
  if (next < length) {
    return { highlightedIndex: next, locked: false, finished: false };
  }
  return { highlightedIndex: winnerIndex, locked: true, finished: true };
}

export function validatorMood(input: {
  selected: boolean;
  locked: boolean;
  active: boolean;
}): ValidatorMood {
  if (input.selected) return "happy";
  if (input.locked) return "disappointed";
  if (input.active) return "happy";
  return "neutral";
}

export function coinCount(stake: number, maxStake: number) {
  return Math.round((stake / maxStake) * 5);
}

export function stakeLabel(idle: boolean) {
  return idle ? "Ready" : "Stake";
}
