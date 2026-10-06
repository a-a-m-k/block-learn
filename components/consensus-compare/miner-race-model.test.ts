import { describe, expect, it } from "vitest";

import {
  hashWindow,
  minerAttemptLabel,
  minerMood,
  minerWon,
  raceSnapshot,
  scrambleHash,
  settleRaceHashes,
  tickRaceHashes,
} from "./miner-race-model";

const miners = [
  { name: "Bob", hash: "published-bob", solved: true },
  { name: "Emma", hash: "published-emma", solved: false },
] as const;

describe("miner race", () => {
  it("scrambles a new attempt for each nonce", () => {
    expect(scrambleHash("Bob", 1)).toBe(scrambleHash("Bob", 1));
    expect(scrambleHash("Bob", 1)).not.toBe(scrambleHash("Bob", 2));
    expect(tickRaceHashes(miners, 3)).toEqual([
      scrambleHash("Bob", 3),
      scrambleHash("Emma", 3),
    ]);
  });

  it("settles on the winner’s published hash and keeps the others’ last attempt", () => {
    const current = ["attempt-bob", "attempt-emma"];

    expect(settleRaceHashes(miners, current)).toEqual([
      "published-bob",
      "attempt-emma",
    ]);
    expect(settleRaceHashes(miners, [])).toEqual([
      "published-bob",
      "published-emma",
    ]);
  });

  it("shows published hashes immediately when motion is reduced or the demo is already done", () => {
    expect(
      raceSnapshot({ playing: true, done: false, reduceMotion: true }, miners),
    ).toEqual({
      mode: "instant",
      phase: "solved",
      hashes: ["published-bob", "published-emma"],
      announcedSolved: true,
    });
    expect(
      raceSnapshot({ playing: false, done: true, reduceMotion: false }, miners)
        .mode,
    ).toBe("instant");
  });

  it("idles on the first attempt until play starts", () => {
    const idle = raceSnapshot(
      { playing: false, done: false, reduceMotion: false },
      miners,
    );

    expect(idle).toEqual({
      mode: "idle",
      phase: "mining",
      hashes: tickRaceHashes(miners, 0),
      announcedSolved: false,
    });
    expect(
      raceSnapshot({ playing: true, done: false, reduceMotion: false }, miners),
    ).toEqual({
      mode: "racing",
      phase: "mining",
      announcedSolved: false,
    });
  });

  it("maps the race outcome onto faces, labels, and the hash window", () => {
    expect(minerMood(false, true)).toBe("neutral");
    expect(minerMood(true, true)).toBe("happy");
    expect(minerMood(true, false)).toBe("disappointed");
    expect(minerWon(true, true)).toBe(true);
    expect(minerWon(true, false)).toBe(false);
    expect(minerAttemptLabel(true, "Trying guesses")).toBe("Ready");
    expect(minerAttemptLabel(false, "Trying guesses")).toBe("Trying guesses");
    expect(hashWindow("abcd...wxyz", 4, 2)).toEqual({
      head: "abcd",
      tail: "yz",
    });
  });
});
