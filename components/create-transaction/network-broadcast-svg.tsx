"use client";

import { stagger } from "motion";
import { motion, useReducedMotion } from "motion/react";

import { appear, ringFade } from "./motion";

/** Hexagonal peer layout around the sender (center = 50,50). */
const NETWORK_NODES = [
  { x: 50, y: 12 },
  { x: 84, y: 30 },
  { x: 84, y: 70 },
  { x: 50, y: 88 },
  { x: 16, y: 70 },
  { x: 16, y: 30 },
] as const;

const NODE_SIZE = 10;
const NODE_HALF = NODE_SIZE / 2;

type NetworkBroadcastSvgProps = {
  className?: string;
  active: boolean;
};

export function NetworkBroadcastSvg({
  className,
  active,
}: NetworkBroadcastSvgProps) {
  const shouldReduceMotion = useReducedMotion();
  const showWaiting = !active && !shouldReduceMotion;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      initial="hidden"
      animate={active ? "show" : "idle"}
      variants={{
        idle: {},
        hidden: {},
        show: {
          transition: {
            delayChildren: shouldReduceMotion ? 0 : stagger(0.08),
          },
        },
      }}
    >
      <WaitingRings visible={showWaiting} reducedMotion={shouldReduceMotion} />
      <PeerPlaceholders
        visible={showWaiting}
        reducedMotion={shouldReduceMotion}
      />
      <BroadcastLines reducedMotion={shouldReduceMotion} />
      <SenderNode />
      <PeerNodes reducedMotion={shouldReduceMotion} />
    </motion.svg>
  );
}

function WaitingRings({
  visible,
  reducedMotion,
}: {
  visible: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.g
      animate={{ opacity: visible ? 1 : 0 }}
      transition={reducedMotion ? { duration: 0.2 } : ringFade}
    >
      {!reducedMotion ? (
        <>
          <motion.circle
            cx="50"
            cy="50"
            r="24"
            fill="none"
            className="stroke-brand"
            strokeWidth="2"
            strokeDasharray="4 3"
            style={{ transformOrigin: "50px 50px" }}
            animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.12, 1] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            className="stroke-brand"
            strokeWidth="1.4"
            strokeDasharray="2 4"
            style={{ transformOrigin: "50px 50px" }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.25,
            }}
          />
        </>
      ) : null}
    </motion.g>
  );
}

function PeerPlaceholders({
  visible,
  reducedMotion,
}: {
  visible: boolean;
  reducedMotion: boolean | null;
}) {
  return (
    <>
      {NETWORK_NODES.map((node) => (
        <motion.rect
          key={`ph-${node.x}-${node.y}`}
          x={node.x - NODE_HALF}
          y={node.y - NODE_HALF}
          width={NODE_SIZE}
          height={NODE_SIZE}
          rx="1.5"
          className="fill-panel stroke-current"
          strokeWidth="1.3"
          strokeDasharray="2.5 2"
          animate={{ opacity: visible ? 0.45 : 0 }}
          transition={reducedMotion ? { duration: 0.2 } : ringFade}
        />
      ))}
    </>
  );
}

function BroadcastLines({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
    <>
      {NETWORK_NODES.map((node) => (
        <motion.line
          key={`l-${node.x}-${node.y}`}
          x1="50"
          y1="50"
          x2={node.x}
          y2={node.y}
          stroke="currentColor"
          strokeWidth="1.4"
          variants={{
            idle: { pathLength: 0, opacity: 0 },
            hidden: { pathLength: 0, opacity: 0 },
            show: reducedMotion
              ? { pathLength: 1, opacity: 1, transition: { duration: 0.2 } }
              : {
                  pathLength: 1,
                  opacity: 1,
                  transition: appear,
                },
          }}
        />
      ))}
    </>
  );
}

function SenderNode() {
  return (
    <rect
      x="42"
      y="42"
      width="16"
      height="16"
      rx="2"
      className="fill-panel stroke-brand"
      strokeWidth="1.6"
    />
  );
}

function PeerNodes({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <>
      {NETWORK_NODES.map((node) => (
        <motion.rect
          key={`n-${node.x}-${node.y}`}
          x={node.x - NODE_HALF}
          y={node.y - NODE_HALF}
          width={NODE_SIZE}
          height={NODE_SIZE}
          rx="1.5"
          className="fill-panel stroke-current"
          strokeWidth="1.3"
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          variants={{
            idle: reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.92 },
            hidden: { opacity: 0, scale: 0.92 },
            show: reducedMotion
              ? { opacity: 1, transition: { duration: 0.2 } }
              : { opacity: 1, scale: 1, transition: appear },
          }}
        />
      ))}
    </>
  );
}
