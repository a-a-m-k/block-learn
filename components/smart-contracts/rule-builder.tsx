"use client";

import {
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { rovingKeyAction } from "@/lib/roving-focus";
import { cn } from "@/lib/utils";

import {
  RULE_ACTIONS,
  RULE_CONDITIONS,
  describeRule,
  isOutcomeStep,
  type ActionId,
  type ConditionId,
  type RuleTone,
} from "./rule-model";
import { SC_STEP, SC_STEP_ACTIVE, ScPanel } from "./shell";

export function SmartContractRuleBuilder() {
  const reduced = useReducedMotion();
  const [condition, setCondition] = useState<ConditionId | null>(null);
  const [action, setAction] = useState<ActionId | null>(null);
  const [played, setPlayed] = useState(false);

  const rule = useMemo(
    () => describeRule(condition, action, played),
    [condition, action, played],
  );

  function run() {
    if (!rule.ready) return;
    setPlayed(true);
  }

  function reset() {
    setCondition(null);
    setAction(null);
    setPlayed(false);
  }

  return (
    <figure aria-label="Build a smart contract rule">
      <ScPanel className="gap-5">
        <div>
          <p className="text-body font-semibold text-foreground">
            Final challenge — build the rule
          </p>
          <p className="mt-1 caption text-muted-foreground">
            Alice is swapping ETH for USDC. Choose the condition that checks
            enough ETH arrived, and the action that sends USDC to her—then run
            the rule.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ChoiceGroup
            title="Condition"
            options={RULE_CONDITIONS}
            value={condition}
            onChange={(id) => {
              setCondition(id);
              setPlayed(false);
            }}
          />
          <ChoiceGroup
            title="Action"
            options={RULE_ACTIONS}
            value={action}
            onChange={(id) => {
              setAction(id);
              setPlayed(false);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="cta"
            size="sm"
            disabled={!rule.ready || played}
            onClick={run}
          >
            Run rule
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </div>

        {rule.status ? (
          <p role="status" className="text-body text-muted-foreground">
            {rule.status}
          </p>
        ) : null}

        <AnimatePresence mode="wait">
          {rule.result?.tone === "success" ? (
            <SuccessResult
              key="success"
              reduced={Boolean(reduced)}
              path={rule.result.path}
            />
          ) : null}
          {rule.result?.tone === "fail" ? (
            <FailResult
              key="fail"
              reduced={Boolean(reduced)}
              path={rule.result.path}
              reason={rule.result.reason}
            />
          ) : null}
        </AnimatePresence>
      </ScPanel>
    </figure>
  );
}

function SuccessResult({
  reduced,
  path,
}: {
  reduced: boolean;
  path: readonly string[];
}) {
  return (
    <motion.div
      className="flex flex-col gap-4 border-t border-muted-foreground/40 pt-4"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
    >
      <ResultPath path={path} reduced={reduced} tone="success" />

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.85 }}
        className="flex flex-col gap-3"
      >
        <p className="inline-flex items-center gap-2 text-title font-semibold text-foreground">
          <CheckIcon className="size-icon-lg text-brand-text" aria-hidden />
          You made it.
        </p>
        <ul className="flex flex-col gap-1.5 text-body text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Blocks</span> store
            data—including contract state.
          </li>
          <li>
            <span className="font-medium text-foreground">Hashes</span> connect
            that data into a tamper-evident chain.
          </li>
          <li>
            <span className="font-medium text-foreground">Consensus</span> helps
            the network agree which execution counts.
          </li>
          <li>
            <span className="font-medium text-foreground">Transactions</span>{" "}
            request changes—wallet-to-wallet or contract calls.
          </li>
          <li>
            <span className="font-medium text-foreground">Smart contracts</span>{" "}
            execute the rules those calls trigger.
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

function FailResult({
  reduced,
  path,
  reason,
}: {
  reduced: boolean;
  path: readonly string[];
  reason: string;
}) {
  return (
    <motion.div
      role="status"
      className="flex flex-col gap-4 border-t border-muted-foreground/40 pt-4"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
    >
      <ResultPath path={path} reduced={reduced} tone="fail" />

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.55 }}
        className="flex flex-col gap-2"
      >
        <p className="inline-flex items-center gap-2 text-title font-semibold text-foreground">
          <XIcon className="size-icon-lg text-destructive" aria-hidden />
          Rule didn’t run.
        </p>
        <p className="text-body text-muted-foreground">{reason}</p>
        <p className="caption text-muted-foreground">
          Try ethIn &gt;= 0.1 → sendUSDC(), then run again.
        </p>
      </motion.div>
    </motion.div>
  );
}

function ResultPath({
  path,
  reduced,
  tone,
}: {
  path: readonly string[];
  reduced: boolean;
  tone: RuleTone;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {path.map((label, index) => {
        const highlight = isOutcomeStep(label, tone);

        return (
          <motion.span
            key={label}
            className="inline-flex items-center gap-2"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : index * 0.12,
              duration: 0.3,
            }}
          >
            <span
              className={cn(
                "rounded-md border px-2.5 py-1.5 caption font-medium",
                highlight
                  ? tone === "success"
                    ? "border-brand text-brand-text shadow-[0_0_18px_color-mix(in_oklab,var(--brand)_25%,transparent)]"
                    : "border-destructive text-destructive"
                  : "border-muted-foreground/50 text-foreground",
              )}
            >
              {label}
            </span>
            {index < path.length - 1 ? (
              <span className="text-muted-foreground" aria-hidden>
                →
              </span>
            ) : null}
          </motion.span>
        );
      })}
    </div>
  );
}

function ChoiceGroup<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: readonly { id: T; label: string }[];
  value: T | null;
  onChange: (id: T) => void;
}) {
  const labelId = useId();
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.id === value),
  );
  const [focusIndex, setFocusIndex] = useState(selectedIndex);

  function focusOption(nextIndex: number) {
    const next = Math.max(0, Math.min(options.length - 1, nextIndex));
    setFocusIndex(next);
    optionRefs.current[next]?.focus();
  }

  function handleRadiogroupKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const action = rovingKeyAction(event.key, focusIndex, options.length, {
      selectOnEnter: true,
    });
    if (action.type === "none") return;

    event.preventDefault();
    if (action.type === "move") {
      focusOption(action.index);
      return;
    }

    const option = options[action.index];
    if (option) onChange(option.id);
  }

  return (
    <div className="flex flex-col gap-2">
      <p id={labelId} className="caption font-medium text-foreground">
        {title}
      </p>
      <div
        className="flex flex-col gap-2"
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={handleRadiogroupKeyDown}
      >
        {options.map((option, index) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={focusIndex === index ? 0 : -1}
              onClick={() => {
                onChange(option.id);
                setFocusIndex(index);
              }}
              onFocus={() => setFocusIndex(index)}
              className={cn(
                SC_STEP,
                "font-mono",
                selected
                  ? SC_STEP_ACTIVE
                  : "text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
