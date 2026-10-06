"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  CogIcon,
  SendIcon,
  XIcon,
} from "lucide-react";

import { WireCube } from "@/components/hash-chain/visuals";
import { PersonAvatar } from "@/components/ledger/person-avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type FlowStepId = "tx" | "contract" | "condition" | "execute" | "state";

export function FlowStepVisual({
  id,
  layout,
}: {
  id: FlowStepId;
  layout: "card" | "detail";
}) {
  switch (id) {
    case "tx":
      return layout === "detail" ? <TransactionPathVisual /> : <TransactionCardVisual />;
    case "contract":
      return <ContractVisual />;
    case "condition":
      return <ConditionVisual />;
    case "execute":
      return <ExecuteVisual />;
    case "state":
      return <StateVisual />;
  }
}

function AliceMark({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <PersonAvatar
      name="Alice"
      variant="short"
      mood="happy"
      namePlacement="overlay"
      className={size === "sm" ? "w-12" : "w-14"}
    />
  );
}

function Dash() {
  return (
    <span
      className="w-5 shrink-0 border-t border-dashed border-muted-foreground/50 sm:w-7"
      aria-hidden
    />
  );
}

function TransactionCardVisual() {
  return (
    <div className="flex items-center justify-center gap-2 pb-5 sm:gap-3">
      <AliceMark />
      <div className="flex items-center gap-2 rounded-lg border border-brand px-2.5 py-2 text-brand-text sm:px-3">
        <SendIcon className="size-icon-lg shrink-0" strokeWidth={1.75} />
        <div className="min-w-0">
          <p className="caption font-medium leading-tight">Swap 0.1 ETH</p>
          <p className="caption leading-tight">To: Swap 0x7a…c3</p>
        </div>
      </div>
      <ArrowRightIcon
        className="size-icon-lg shrink-0 text-brand-text"
        strokeWidth={1.75}
      />
    </div>
  );
}

function TransactionPathVisual() {
  return (
    <div className="flex items-center justify-center gap-2 pb-6">
      <AliceMark size="sm" />
      <Dash />
      <div className="flex items-center gap-1.5 rounded-lg border border-brand px-2.5 py-2 text-brand-text">
        <span className="caption font-medium">Transaction</span>
        <ArrowRightIcon className="size-icon" strokeWidth={1.75} />
      </div>
      <Dash />
      <div className="relative">
        <ContractScroll className="h-14 w-11" />
        <span className="caption pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap text-muted-foreground">
          Smart contract
        </span>
      </div>
    </div>
  );
}

function ContractVisual() {
  return (
    <div className="flex items-center justify-center gap-3">
      <ArrowRightIcon
        className="size-icon-lg shrink-0 text-brand-text"
        strokeWidth={1.75}
      />
      <ContractScroll className="h-24 w-[4.5rem]" />
      <ArrowRightIcon
        className="size-icon-lg shrink-0 text-brand-text"
        strokeWidth={1.75}
      />
    </div>
  );
}

function ContractScroll({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 96"
      fill="none"
      className={cn("text-foreground", className)}
      aria-hidden
    >
      <path
        d="M16 14h38a8 8 0 0 1 8 8v58a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V22c0-4.4 3.6-8 8-8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <ellipse
        cx="16"
        cy="22"
        rx="7"
        ry="9"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M28 34h24M28 42h24M28 50h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M32 62 26 70 32 78M44 62 50 70 44 78"
        className="text-brand-text"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConditionVisual() {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <div className="relative flex size-24 shrink-0 items-center justify-center sm:size-28">
        <svg viewBox="0 0 88 88" className="absolute inset-0 text-brand-text" aria-hidden>
          <polygon
            points="44,6 82,44 44,82 6,44"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
        <p className="relative max-w-16 text-center caption font-medium leading-tight text-foreground">
          enough ETH?
        </p>
      </div>
      <svg
        viewBox="0 0 36 72"
        className="h-16 w-8 shrink-0 text-brand-text sm:h-20 sm:w-9"
        aria-hidden
      >
        <path
          d="M0 36h12M12 36v-20h24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M12 36v20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M12 56h24"
          className="text-muted-foreground/50"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeDasharray="3 3"
        />
      </svg>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md border border-brand text-brand-text">
            <CheckIcon className="size-icon" strokeWidth={2.25} />
          </span>
          <span className="caption text-muted-foreground">Yes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md border border-dashed border-muted-foreground/50 text-muted-foreground">
            <XIcon className="size-icon" strokeWidth={2.25} />
          </span>
          <span className="caption text-muted-foreground">No</span>
        </div>
      </div>
    </div>
  );
}

function ExecuteVisual() {
  return (
    <div className="flex items-center justify-center gap-3">
      <pre className="min-w-0 rounded-lg border border-muted-foreground/50 bg-panel px-3 py-2.5 font-mono caption">
        <code>{"if (ethIn >= 0.1) {"}</code>
      </pre>
      <ArrowRightIcon
        className="size-icon-lg shrink-0 text-brand-text"
        strokeWidth={1.75}
      />
      <div className="relative size-14 shrink-0 text-brand-text">
        <CogIcon className="size-10" strokeWidth={1.5} />
        <CogIcon
          className="absolute right-0 bottom-0 size-7 opacity-80"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}

function StateVisual() {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <WireCube className="size-10 sm:size-12" />
      <span
        className="w-4 shrink-0 border-t border-muted-foreground/50 sm:w-6"
        aria-hidden
      />
      <WireCube className="size-10 sm:size-12" />
      <span
        className="w-4 shrink-0 border-t border-muted-foreground/50 sm:w-6"
        aria-hidden
      />
      <WireCube className="size-10 sm:size-12" />
      <span className="w-4 shrink-0 border-t border-brand sm:w-6" aria-hidden />
      <div className="relative">
        <span className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap">
          <Badge variant="accent" shape="pill">
            New state
          </Badge>
        </span>
        <WireCube
          accent
          className="size-10 drop-shadow-[0_0_16px_color-mix(in_oklab,var(--brand)_45%,transparent)] sm:size-12"
        />
      </div>
    </div>
  );
}
