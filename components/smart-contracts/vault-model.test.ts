import { describe, expect, it } from "vitest";

import { advanceLock, resetLock, vaultView, withdraw } from "./vault-model";

describe("staking lock", () => {
  it("rejects a withdraw before the lock ends", () => {
    const denied = withdraw("locked");
    expect(denied).toBe("denied");
    expect(vaultView(denied).message.text).toMatch(/Withdrawal rejected/);
    expect(vaultView(denied).eth).toBe("10");
  });

  it("returns the ETH once the wait has passed", () => {
    const ready = advanceLock("denied");
    expect(ready).toBe("ready");
    expect(vaultView(ready).message.text).toMatch(/10 days have passed/);

    const unlocked = withdraw(ready);
    expect(unlocked).toBe("unlocked");
    expect(vaultView(unlocked)).toMatchObject({
      unlocked: true,
      eth: "0",
    });
    expect(vaultView(unlocked).message.text).toMatch(/ETH returned to Alice/);
  });

  it("ignores further time and withdraws after unlock, until reset", () => {
    expect(advanceLock("unlocked")).toBe("unlocked");
    expect(withdraw("unlocked")).toBe("unlocked");
    expect(resetLock()).toBe("locked");
  });
});
