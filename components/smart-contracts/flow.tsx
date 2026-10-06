"use client";

import { useState } from "react";
import { ArrowRightIcon, RefreshCwIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FlowStepVisual, type FlowStepId } from "./flow-visuals";

const FLOW_CARD =
  "rounded-xl border border-muted-foreground/50 bg-card diagram-pad-loose text-foreground";

const STEPS = [
  {
    id: "tx" as const,
    label: "Transaction",
    summary: "Alice confirms in her wallet—To is the swap contract.",
    detail:
      "Alice confirms in her wallet. This time “To” is a swap contract—not Bob’s wallet.",
  },
  {
    id: "contract" as const,
    label: "Smart Contract",
    summary: "The call hits a program that already lives on the ledger.",
    detail:
      "The swap program lives on the shared ledger—like any other address with its own balance and data—so every node can load the same code.",
  },
  {
    id: "condition" as const,
    label: "Condition",
    summary: "The contract checks whether the swap can fill.",
    detail:
      "Does she send enough ETH for the quoted USDC? If the pool can’t fill it, she keeps the ETH. The failed call can still land in a block, and the fee can still be spent.",
  },
  {
    id: "execute" as const,
    label: "Code executes",
    summary: "If the check passes, the contract runs the swap.",
    detail:
      "After consensus includes the call, honest nodes run the same functions and must get the same result.",
  },
  {
    id: "state" as const,
    label: "State updated",
    summary: "New balances are written into the next block.",
    detail:
      "Alice’s USDC and the pool’s ETH land in a block. Hashes link that update into history—just like Alice paying Bob.",
  },
] satisfies {
  id: FlowStepId;
  label: string;
  summary: string;
  detail: string;
}[];

export function SmartContractFlow() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const step = STEPS[active] ?? STEPS[0];
  const last = active === STEPS.length - 1;

  return (
    <figure aria-label="How a smart contract runs, step by step">
      <div className="flex flex-col gap-6 md:hidden">
        <p className="caption text-muted-foreground">
          Select each step to follow the path.
        </p>
        <ol className="flex flex-col">
          {STEPS.map((item, index) => {
            const selected = index === active;
            const lastItem = index === STEPS.length - 1;
            return (
              <li key={item.id} className="relative flex">
                {lastItem ? null : (
                  <span
                    className={cn(
                      "absolute top-8 bottom-0 left-4 w-px -translate-x-1/2",
                      index < active
                        ? "bg-brand"
                        : "bg-muted-foreground/30",
                    )}
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={selected ? "step" : undefined}
                  className="flex min-w-0 flex-1 items-start gap-3 rounded-lg py-1 text-left outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-body font-semibold tabular-nums transition-colors",
                      selected
                        ? "bg-brand text-brand-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--brand)_40%,transparent)]"
                        : "border border-muted-foreground/50 bg-card text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 pt-1 text-body font-medium",
                      selected ? "text-foreground" : "text-muted-foreground",
                      lastItem ? "pb-0" : "pb-5",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className={cn(FLOW_CARD, "flex flex-col gap-4")}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              role="status"
              className="flex min-h-40 flex-col gap-4"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0.15 : 0.28 }}
            >
              <p className="caption font-medium tracking-wide text-brand-text uppercase">
                Step {active + 1} of {STEPS.length}
              </p>
              <div>
                <h3 className="text-title font-semibold tracking-tight text-foreground">
                  {step.label}
                </h3>
                <p className="mt-2 text-body text-muted-foreground">
                  {step.detail}
                </p>
              </div>
              <div className="flex min-h-32 flex-1 items-center justify-center py-2">
                <FlowStepVisual id={step.id} layout="detail" />
              </div>
            </motion.div>
          </AnimatePresence>
          <Button
            type="button"
            variant="cta"
            size="cta"
            className="w-full"
            icon={last ? RefreshCwIcon : undefined}
            onClick={() => setActive((index) => (index + 1) % STEPS.length)}
          >
            {last ? "Start over" : "Next step"}
            {last ? null : <ArrowRightIcon data-icon="inline-end" />}
          </Button>
        </div>
      </div>

      <ol className="hidden min-w-0 grid-cols-2 gap-4 md:grid xl:grid-cols-6 xl:gap-5">
        {STEPS.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              FLOW_CARD,
              "flex min-w-0 flex-col gap-5",
              index < 3 ? "xl:col-span-2" : "xl:col-span-3",
              index === STEPS.length - 1 && "md:col-span-2 xl:col-span-3",
            )}
          >
            <div className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand bg-card text-body font-semibold tabular-nums text-brand-text shadow-[0_0_24px_color-mix(in_oklab,var(--brand)_28%,transparent)]">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-body font-semibold text-foreground">
                  {item.label}
                </h3>
                <p className="mt-1 caption text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            </div>
            <div className="flex min-h-36 flex-1 items-center justify-center">
              <FlowStepVisual id={item.id} layout="card" />
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
