"use client";

import { useState } from "react";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ScPanel } from "./shell";
import {
  advanceLock,
  resetLock,
  vaultView,
  withdraw,
  type VaultState,
} from "./vault-model";

const messageTone = {
  muted: "text-muted-foreground",
  danger: "text-destructive",
  brand: "text-brand-text",
  plain: "text-foreground",
} as const;

export function SmartContractVault() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<VaultState>("locked");
  const view = vaultView(state);
  const { unlocked, ready } = view;

  function tryWithdraw() {
    setState((current) => withdraw(current));
  }

  function advanceTime() {
    setState((current) => advanceLock(current));
  }

  function reset() {
    setState(resetLock());
  }

  return (
    <figure aria-label="Staking lock smart contract">
      <ScPanel>
        <p className="caption text-muted-foreground">
          Same idea as Unstake in a wallet: the contract holds the ETH until
          the lock ends. This timer is a contract rule—not Proof of Stake.
        </p>

        <div
          className={cn(
            "relative flex flex-col items-center gap-4 rounded-xl border border-dashed px-4 py-8",
            unlocked
              ? "border-brand shadow-[0_0_28px_color-mix(in_oklab,var(--brand)_22%,transparent)]"
              : "border-muted-foreground/50",
          )}
        >
          <motion.div
            animate={unlocked && !reduced ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.45 }}
            className={cn(
              "flex size-16 items-center justify-center rounded-full border",
              unlocked
                ? "border-brand text-brand-text"
                : "border-muted-foreground/50 text-muted-foreground",
            )}
          >
            {unlocked ? (
              <LockOpenIcon className="size-8" strokeWidth={1.5} />
            ) : (
              <LockIcon className="size-8" strokeWidth={1.5} />
            )}
          </motion.div>

          <div className="text-center">
            <p className="text-body font-semibold text-foreground">
              Staking lock (not Proof of Stake)
            </p>
            <p className="mt-1 tabular-nums text-title font-medium text-foreground">
              {view.eth}{" "}
              <span className="text-body font-normal text-muted-foreground">
                ETH
              </span>
            </p>
            <p className="mt-2 caption text-muted-foreground">
              Rule: withdraw after a 10-day lock
            </p>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={unlocked}
              onClick={tryWithdraw}
            >
              Try to withdraw
            </Button>
            <Button
              type="button"
              variant={ready && !unlocked ? "cta" : "softOutline"}
              className="flex-1"
              disabled={unlocked || ready}
              onClick={advanceTime}
            >
              10 days later
            </Button>
          </div>

          {unlocked ? (
            <Button type="button" variant="ghost" size="sm" onClick={reset}>
              Reset lock
            </Button>
          ) : null}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={state}
            role="status"
            className="text-body text-muted-foreground"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className={messageTone[view.message.tone]}>
              {view.message.text}
            </span>
          </motion.p>
        </AnimatePresence>
      </ScPanel>
    </figure>
  );
}
