import type { ContentBlock } from "@/lib/chapter-content";

export type ConsensusCompareBlock = Extract<
  ContentBlock,
  { type: "consensus-compare" }
>;

export type CompareAccent = "pow" | "stake";

export type ConsensusMethod = ConsensusCompareBlock["proofOfWork"];
export type ConsensusMiners = NonNullable<ConsensusMethod["miners"]>;
export type ConsensusResult = ConsensusMethod["result"];
export type ConsensusFooter = NonNullable<ConsensusMethod["footer"]>;
export type ConsensusValidators = NonNullable<ConsensusMethod["validators"]>;
