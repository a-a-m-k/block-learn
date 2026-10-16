"use client";

import type { ReactNode } from "react";

import {
  LedgerStatusChip,
  NotebookColumns,
  NotebookHeading,
  NotebookTotal,
} from "@/components/ledger/notebook-frame";
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
      className="relative mx-auto w-full max-w-3xl text-muted-foreground"
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
          <NotebookHeading
            face={
              <div className={cn(FACE_CHROME_CLASS, "size-9 rounded-lg")}>
                <LedgerPersonFace
                  variant={keeper.variant}
                  mood={keeper.mood}
                  gaze={keeper.gaze}
                  className={FACE_INSET_CLASS}
                />
              </div>
            }
            title={`${keeper.name}'s notebook`}
            detail="Private ledger"
            status={<LedgerStatusChip />}
          />
          <NotebookColumns />
          {children}
          <NotebookTotal total={total} />
        </div>
        {overlay}
      </div>
    </figure>
  );
}
