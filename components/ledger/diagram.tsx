"use client";

import type { ReactNode } from "react";

import { PersonAvatar } from "@/components/ledger/person-avatar";
import {
  FACE_CHROME_CLASS,
  FACE_INSET_CLASS,
  LedgerPersonFace,
  type FaceGaze,
  type FaceMood,
  type FaceVariant,
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
  return (
    <figure
      className="relative mx-auto w-full max-w-3xl text-gray-400"
      aria-label={`${keeper.name}'s notebook that others read from`}
    >
      <div className="mb-8 flex items-start justify-center gap-8 sm:gap-14">
        {readers.map((person) => (
          <PersonAvatar
            key={person.name}
            name={person.name}
            variant={person.variant}
            mood={person.mood}
            gaze={{ x: person.gaze?.x ?? 0, y: person.gaze?.y ?? 1 }}
            className="w-11"
            faceClassName="size-11"
          />
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-4">
        <div className="relative w-full overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
          <div className={cn(FACE_CHROME_CLASS, "size-9 rounded-lg")}>
            <LedgerPersonFace
              variant={keeper.variant}
              mood={keeper.mood}
              gaze={keeper.gaze}
              className={FACE_INSET_CLASS}
            />
          </div>
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
      </div>
    </figure>
  );
}
