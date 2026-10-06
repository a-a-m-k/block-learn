export type VaultState = "locked" | "denied" | "ready" | "unlocked";

export type VaultTone = "muted" | "danger" | "brand" | "plain";

const MESSAGES: Record<VaultState, { tone: VaultTone; text: string }> = {
  locked: {
    tone: "muted",
    text: "10 ETH are locked. The unlock timer has not finished.",
  },
  denied: {
    tone: "danger",
    text: "Condition not met. Withdrawal rejected—the coins stay locked.",
  },
  ready: {
    tone: "brand",
    text: "10 days have passed. Try to withdraw again.",
  },
  unlocked: {
    tone: "plain",
    text: "Condition met. ETH returned to Alice—the contract updated the shared balances.",
  },
};

/** Early withdraw is rejected. After the lock, withdraw returns the ETH. */
export function withdraw(state: VaultState): VaultState {
  if (state === "unlocked") return state;
  if (state === "ready") return "unlocked";
  return "denied";
}

/** The lock ends unless the ETH is already back with Alice. */
export function advanceLock(state: VaultState): VaultState {
  if (state === "unlocked") return state;
  return "ready";
}

export function resetLock(): VaultState {
  return "locked";
}

export function vaultView(state: VaultState) {
  const unlocked = state === "unlocked";
  const ready = state === "ready" || unlocked;
  return {
    unlocked,
    ready,
    eth: unlocked ? "0" : "10",
    message: MESSAGES[state],
  };
}
