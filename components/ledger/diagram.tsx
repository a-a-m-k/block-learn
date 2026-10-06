"use client";

import type { ReactNode } from "react";

import {
  ConnectorLines,
  type ConnectorLine,
} from "@/components/ledger/connector-lines";
import { Notebook } from "@/components/ledger/notebook";
import { PersonAvatar } from "@/components/ledger/person-avatar";
import type {
  FaceGaze,
  FaceMood,
  FaceVariant,
} from "@/components/ledger/person-face";

export type LedgerPerson = {
  name: string;
  mood: FaceMood;
  variant: FaceVariant;
  /** Used for gaze direction toward/away from the notebook. */
  position: "top" | "left" | "right" | "bottom";
  gaze?: FaceGaze;
};

export type KeeperPerson = Omit<LedgerPerson, "position">;

/** Connectors from notebook top to a top-row of readers. */
function topConnectors(count: number): Omit<ConnectorLine, "id">[] {
  if (count <= 0) return [];
  const notebookTop = { x1: 50, y1: 30 };
  return Array.from({ length: count }, (_, index) => {
    const x2 = ((index + 1) / (count + 1)) * 100;
    return { ...notebookTop, x2, y2: 14 };
  });
}

type CentralizedLedgerDiagramProps = {
  keeper: KeeperPerson;
  readers: LedgerPerson[];
  children: ReactNode;
};

export function CentralizedLedgerDiagram({
  keeper,
  readers,
  children,
}: CentralizedLedgerDiagramProps) {
  const lines: ConnectorLine[] = readers.map((person, index) => ({
    id: person.name,
    ...(topConnectors(readers.length)[index] ?? {
      x1: 50,
      y1: 30,
      x2: 50,
      y2: 14,
    }),
  }));

  return (
    <figure
      className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden text-muted-foreground sm:aspect-square sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      aria-label={`${keeper.name}'s notebook that others read from`}
    >
      <ConnectorLines lines={lines} />

      <div className="absolute inset-x-0 top-[3%] z-10 flex items-start justify-evenly px-3 sm:px-6 md:px-8">
        {readers.map((person) => (
          <PersonAvatar
            key={person.name}
            name={person.name}
            variant={person.variant}
            mood={person.mood}
            gaze={{ x: person.gaze?.x ?? 0, y: 1 }}
            namePlacement="overlay"
            className="w-[18%] sm:w-[14%]"
          />
        ))}
      </div>

      <Notebook
        name={keeper.name}
        label="notebook"
        variant={keeper.variant}
        mood={keeper.mood}
        gaze={keeper.gaze}
        className="absolute left-1/2 top-[28%] h-[58%] w-[72%] -translate-x-1/2 sm:top-[26%] sm:h-[60%] sm:w-[56%]"
      >
        {children}
      </Notebook>
    </figure>
  );
}
