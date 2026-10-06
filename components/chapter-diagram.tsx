"use client";

import dynamic from "next/dynamic";

import type { DiagramBlock } from "@/components/diagram-block";
import { cn } from "@/lib/utils";

function DiagramLoading() {
  return (
    <div
      role="status"
      className={cn(
        "diagram-shell min-h-48 animate-pulse border border-muted-foreground/50 bg-muted/20 motion-reduce:animate-none",
      )}
    >
      <span className="sr-only">Loading interactive diagram</span>
    </div>
  );
}

const OweLedgerBlock = dynamic(
  () =>
    import("@/components/ledger/owe-ledger").then(
      (module) => module.OweLedgerBlock,
    ),
  { loading: DiagramLoading, ssr: true },
);

const DistributedLedgerBlock = dynamic(
  () =>
    import("@/components/ledger/distributed-ledger").then(
      (module) => module.DistributedLedgerBlock,
    ),
  { loading: DiagramLoading, ssr: true },
);

const HashChainBlock = dynamic(
  () =>
    import("@/components/hash-chain").then((module) => module.HashChainBlock),
  { loading: DiagramLoading, ssr: true },
);

const HashCheckBlock = dynamic(
  () =>
    import("@/components/hash-check").then((module) => module.HashCheckBlock),
  { loading: DiagramLoading, ssr: true },
);

const CreateTransactionBlock = dynamic(
  () =>
    import("@/components/create-transaction").then(
      (module) => module.CreateTransactionBlock,
    ),
  { loading: DiagramLoading, ssr: true },
);

const ExploreTransactionBlock = dynamic(
  () =>
    import("@/components/explore-transaction").then(
      (module) => module.ExploreTransactionBlock,
    ),
  { loading: DiagramLoading, ssr: true },
);

const ConsensusComparePanel = dynamic(
  () =>
    import("@/components/consensus-compare").then(
      (module) => module.ConsensusComparePanel,
    ),
  { loading: DiagramLoading, ssr: true },
);

const SmartContractFlow = dynamic(
  () =>
    import("@/components/smart-contracts/flow").then(
      (module) => module.SmartContractFlow,
    ),
  { loading: DiagramLoading, ssr: true },
);

const SmartContractIfThen = dynamic(
  () =>
    import("@/components/smart-contracts/if-then").then(
      (module) => module.SmartContractIfThen,
    ),
  { loading: DiagramLoading, ssr: true },
);

const SmartContractVault = dynamic(
  () =>
    import("@/components/smart-contracts/vault").then(
      (module) => module.SmartContractVault,
    ),
  { loading: DiagramLoading, ssr: true },
);

const SmartContractUses = dynamic(
  () =>
    import("@/components/smart-contracts/uses").then(
      (module) => module.SmartContractUses,
    ),
  { loading: DiagramLoading, ssr: true },
);

const SmartContractRuleBuilder = dynamic(
  () =>
    import("@/components/smart-contracts/rule-builder").then(
      (module) => module.SmartContractRuleBuilder,
    ),
  { loading: DiagramLoading, ssr: true },
);

export function ChapterDiagram({ block }: { block: DiagramBlock }) {
  switch (block.type) {
    case "owe-ledger":
      return <OweLedgerBlock block={block} />;
    case "distributed-ledger":
      return <DistributedLedgerBlock block={block} />;
    case "hash-chain":
      return <HashChainBlock />;
    case "hash-check":
      return <HashCheckBlock />;
    case "create-transaction":
      return <CreateTransactionBlock block={block} />;
    case "explore-transaction":
      return <ExploreTransactionBlock block={block} />;
    case "consensus-compare":
      return <ConsensusComparePanel block={block} />;
    case "smart-contract-flow":
      return <SmartContractFlow />;
    case "smart-contract-if-then":
      return <SmartContractIfThen />;
    case "smart-contract-vault":
      return <SmartContractVault />;
    case "smart-contract-uses":
      return <SmartContractUses />;
    case "smart-contract-builder":
      return <SmartContractRuleBuilder />;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}
