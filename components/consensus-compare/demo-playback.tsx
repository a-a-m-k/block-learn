"use client";

import { useCallback, useState } from "react";
import { PlayIcon, RefreshCwIcon } from "lucide-react";
import { useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

export function useDemoPlayback() {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");

  const play = useCallback(() => {
    if (reducedMotion || phase === "playing") return;
    setPhase("playing");
  }, [phase, reducedMotion]);

  const complete = useCallback(() => {
    setPhase("done");
  }, []);

  const reset = useCallback(() => {
    setPhase("idle");
  }, []);

  return {
    reducedMotion,
    playing: !reducedMotion && phase === "playing",
    idle: !reducedMotion && phase === "idle",
    done: reducedMotion || phase === "done",
    hasPlayed: phase === "done",
    play,
    complete,
    reset,
  };
}

export function DemoPlaybackBar({
  playing,
  hasPlayed,
  reducedMotion,
  onPlay,
}: {
  playing: boolean;
  hasPlayed: boolean;
  reducedMotion: boolean;
  onPlay: () => void;
}) {
  const hint = playing
    ? "Watch what happens…"
    : hasPlayed
      ? "Play again to watch it once more."
      : "Press Play demo to see how this method picks the next block.";

  if (reducedMotion) {
    return (
      <p className="caption text-muted-foreground">
        Animation is off, so this shows the finished result.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <Button
        type="button"
        variant="outline"
        size="default"
        icon={hasPlayed ? RefreshCwIcon : PlayIcon}
        disabled={playing}
        title={hint}
        onClick={onPlay}
      >
        {playing ? "Running…" : hasPlayed ? "Replay" : "Play demo"}
      </Button>
      <p className="caption text-muted-foreground">{hint}</p>
    </div>
  );
}
