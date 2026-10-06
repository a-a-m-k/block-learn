import { describe, expect, it } from "vitest";

import {
  advanceStakeHighlight,
  coinCount,
  selectedIndex,
  stakeLabel,
  stakeSnapshot,
  stakeStepMs,
  validatorMood,
} from "./stake-model";

const validators = [
  { name: "Bob", stake: 32, winner: false },
  { name: "Alice", stake: 80, winner: true },
  { name: "Emma", stake: 80, winner: false },
];

describe("stake selection", () => {
  it("uses the flagged winner, then the earlier of a stake tie", () => {
    expect(selectedIndex(validators)).toBe(1);
    expect(
      selectedIndex([
        { stake: 10, winner: false },
        { stake: 40, winner: false },
        { stake: 40, winner: false },
      ]),
    ).toBe(1);
  });

  it("locks on the winner immediately when motion is reduced or the demo is done", () => {
    expect(
      stakeSnapshot({
        playing: false,
        done: true,
        reduceMotion: false,
        validators,
        revealWaitMs: 2200,
      }),
    ).toEqual({ mode: "instant", highlightedIndex: 1, locked: true });
  });

  it("idles until play, then walks every seat before locking the winner", () => {
    expect(
      stakeSnapshot({
        playing: false,
        done: false,
        reduceMotion: false,
        validators,
        revealWaitMs: 2200,
      }).mode,
    ).toBe("idle");

    const walking = stakeSnapshot({
      playing: true,
      done: false,
      reduceMotion: false,
      validators,
      revealWaitMs: 2200,
    });
    expect(walking).toMatchObject({
      mode: "walking",
      highlightedIndex: 0,
      stepMs: stakeStepMs(3, 2200),
    });

    expect(advanceStakeHighlight(0, 3, 1)).toEqual({
      highlightedIndex: 1,
      locked: false,
      finished: false,
    });
    expect(advanceStakeHighlight(2, 3, 1)).toEqual({
      highlightedIndex: 1,
      locked: true,
      finished: true,
    });
  });

  it("maps the highlight onto mood, coins, and the idle label", () => {
    expect(validatorMood({ selected: true, locked: true, active: false })).toBe(
      "happy",
    );
    expect(validatorMood({ selected: false, locked: true, active: false })).toBe(
      "disappointed",
    );
    expect(validatorMood({ selected: false, locked: false, active: true })).toBe(
      "happy",
    );
    expect(coinCount(40, 80)).toBe(3);
    expect(stakeLabel(true)).toBe("Ready");
    expect(stakeLabel(false)).toBe("Stake");
  });
});
