"use client";

import type { ReactNode } from "react";

import type {
  FaceGaze,
  FaceMood,
  FaceVariant,
} from "@/components/ledger/person-face";
import { cn } from "@/lib/utils";

export type LedgerPerson = {
  name: string;
  mood: FaceMood;
  variant: FaceVariant;
  /** Used for gaze direction toward/away from the notebook. */
  position: "top" | "left" | "right" | "bottom";
  gaze?: FaceGaze;
};

export type KeeperPerson = Omit<LedgerPerson, "position">;

const PERSON_COLOR: Record<string, string> = {
  Alice: "bg-blue-600",
  Emma: "bg-violet-600",
  Alex: "bg-green-500",
  Bob: "bg-orange-400",
};

type CentralizedLedgerDiagramProps = {
  keeper: KeeperPerson;
  readers: LedgerPerson[];
  total: number;
  children: ReactNode;
  overlay?: ReactNode;
};

export function CentralizedLedgerDiagram({
  keeper,
  readers,
  total,
  children,
  overlay,
}: CentralizedLedgerDiagramProps) {
  const keeperColor = PERSON_COLOR[keeper.name] ?? "bg-orange-400";

  return (
    <figure
      className="relative mx-auto w-full max-w-3xl text-gray-400"
      aria-label={`${keeper.name}'s notebook that others read from`}
    >
      <div className="mb-8 flex items-start justify-center gap-8 sm:gap-14">
        {readers.map((person) => (
          <div key={person.name} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-full text-sm font-semibold text-white",
                PERSON_COLOR[person.name] ?? "bg-blue-600",
              )}
            >
              {person.name.slice(0, 1)}
            </span>
            <span className="text-xs text-gray-500">{person.name}</span>
          </div>
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-zinc-800 bg-neutral-950">
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white",
              keeperColor,
            )}
          >
            {keeper.name.slice(0, 1)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">
              {keeper.name}&apos;s notebook
            </span>
            <span className="block text-xs text-gray-500">Private ledger</span>
          </span>
          <span className="rounded-md bg-emerald-950 px-2 py-1 text-[10px] font-semibold tracking-wide text-green-400 uppercase">
            Current
          </span>
        </div>
        <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] font-medium tracking-[0.14em] text-gray-600 uppercase">
          <span>Entry</span>
          <span>Amount</span>
        </div>
        {children}
        <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-4 py-3 text-xs">
          <span className="tracking-[0.12em] text-gray-600 uppercase">
            Total recorded
          </span>
          <span className="font-semibold text-blue-400">${total}</span>
        </div>
      </div>
      {overlay}
    </figure>
  );
}
