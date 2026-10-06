import type { ContentBlock } from "@/lib/chapter-content";

export const DIAGRAM_BLOCK_TYPES = [
  "owe-ledger",
  "distributed-ledger",
  "hash-chain",
  "hash-check",
  "create-transaction",
  "explore-transaction",
  "consensus-compare",
  "smart-contract-flow",
  "smart-contract-if-then",
  "smart-contract-vault",
  "smart-contract-uses",
  "smart-contract-builder",
] as const;

export type DiagramBlockType = (typeof DIAGRAM_BLOCK_TYPES)[number];

export type DiagramBlock = Extract<ContentBlock, { type: DiagramBlockType }>;

export function isDiagramBlock(block: ContentBlock): block is DiagramBlock {
  return (DIAGRAM_BLOCK_TYPES as readonly string[]).includes(block.type);
}
