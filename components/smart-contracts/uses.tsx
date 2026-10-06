"use client";

import { useState } from "react";
import {
  ArrowLeftRightIcon,
  KeyRoundIcon,
  LandmarkIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { SC_STEP, SC_STEP_ACTIVE, ScPanel } from "./shell";

const CARDS: {
  id: string;
  title: string;
  icon: LucideIcon;
  text: string;
}[] = [
  {
    id: "swaps",
    title: "Swaps",
    icon: ArrowLeftRightIcon,
    text: "Alice confirms a swap of 0.1 ETH for USDC. ETH goes to a pool contract; USDC comes back only if the price rule can fill. No stranger has to send the other side.",
  },
  {
    id: "approvals",
    title: "Token approvals",
    icon: KeyRoundIcon,
    text: "“Allow this site to spend your USDC.” She isn’t sending yet—she’s giving a contract permission to pull tokens later. That’s why wallets warn on unlimited approvals.",
  },
  {
    id: "nfts",
    title: "NFTs",
    icon: SparklesIcon,
    text: "An NFT is a unique item on the ledger. Buy on a marketplace: she pays the listing contract. The NFT moves only if the price is met—ownership is a ledger entry, not a row in the app’s database.",
  },
  {
    id: "defi",
    title: "Lockups",
    icon: LandmarkIcon,
    text: "Deposit into a program that holds the coins. Earnings and unlock timers are the contract’s rules—not a bank’s back office. This lock is not the Proof of Stake from consensus.",
  },
];

export function SmartContractUses() {
  const [open, setOpen] = useState<string | null>(CARDS[0]?.id ?? null);
  const reduced = useReducedMotion();
  const active = CARDS.find((card) => card.id === open) ?? CARDS[0];

  return (
    <figure aria-label="What smart contracts can do">
      <ScPanel>
        <p className="caption text-muted-foreground">
          Choose a card for the wallet version.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CARDS.map((card) => {
            const Icon = card.icon;
            const selected = open === card.id;
            const panelId = `smart-contract-use-${card.id}`;
            return (
              <button
                key={card.id}
                type="button"
                aria-expanded={selected}
                aria-controls={selected ? panelId : undefined}
                onClick={() => setOpen(card.id)}
                className={cn(
                  SC_STEP,
                  "flex items-center gap-3",
                  selected
                    ? SC_STEP_ACTIVE
                    : "text-muted-foreground hover:border-brand/40 hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-icon-lg shrink-0",
                    selected ? "text-brand-text" : "text-muted-foreground",
                  )}
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-body font-medium text-foreground">
                  {card.title}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              id={`smart-contract-use-${active.id}`}
              role="region"
              aria-label={active.title}
              className="border-t border-muted-foreground/40 pt-4"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: reduced ? 0.15 : 0.28 }}
            >
              <p className="text-body font-medium text-foreground">
                {active.title}
              </p>
              <p className="mt-1 text-body text-muted-foreground">
                {active.text}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </ScPanel>
    </figure>
  );
}
