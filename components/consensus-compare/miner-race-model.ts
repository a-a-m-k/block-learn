import { hashHex } from "@/lib/fingerprint";

export type RaceMiner = {
  name: string;
  hash: string;
  solved: boolean;
};

export type MinerMood = "neutral" | "happy" | "disappointed";

export type RaceSnapshot =
  | {
      mode: "instant";
      phase: "solved";
      hashes: string[];
      announcedSolved: true;
    }
  | {
      mode: "idle";
      phase: "mining";
      hashes: string[];
      announcedSolved: false;
    }
  | {
      mode: "racing";
      phase: "mining";
      announcedSolved: false;
    };

/** One attempt during the race. Same name and nonce always match. */
export function scrambleHash(name: string, nonce: number) {
  return hashHex(`${name}:${nonce}`);
}

export function tickRaceHashes(
  miners: readonly Pick<RaceMiner, "name">[],
  nonce: number,
) {
  return miners.map((miner) => scrambleHash(miner.name, nonce));
}

/**
 * When the race ends, the winner shows the published hash.
 * Everyone else keeps the last attempt they were showing.
 */
export function settleRaceHashes(
  miners: readonly Pick<RaceMiner, "hash" | "solved">[],
  current: readonly string[],
) {
  return miners.map((miner, index) =>
    miner.solved ? miner.hash : (current[index] ?? miner.hash),
  );
}

export function raceSnapshot(
  input: { playing: boolean; done: boolean; reduceMotion: boolean },
  miners: readonly RaceMiner[],
): RaceSnapshot {
  if (input.reduceMotion || input.done) {
    return {
      mode: "instant",
      phase: "solved",
      hashes: miners.map((miner) => miner.hash),
      announcedSolved: true,
    };
  }

  if (!input.playing) {
    return {
      mode: "idle",
      phase: "mining",
      hashes: tickRaceHashes(miners, 0),
      announcedSolved: false,
    };
  }

  return { mode: "racing", phase: "mining", announcedSolved: false };
}

export function minerMood(raceSolved: boolean, minerSolved: boolean): MinerMood {
  if (!raceSolved) return "neutral";
  return minerSolved ? "happy" : "disappointed";
}

export function minerWon(raceSolved: boolean, minerSolved: boolean) {
  return raceSolved && minerSolved;
}

export function minerAttemptLabel(idle: boolean, trying: string) {
  return idle ? "Ready" : trying;
}

/** Drop placeholder dots, then take a short head and tail for the badge. */
export function hashWindow(hash: string, headLength: number, tailLength: number) {
  const compact = hash.replaceAll("...", "");
  return {
    head: compact.slice(0, headLength),
    tail: compact.slice(-tailLength),
  };
}
