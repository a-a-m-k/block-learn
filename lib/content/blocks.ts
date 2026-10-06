export type ConsensusCompareMethod = {
  title: string;
  subtitle: string;
  text: string;
  items: string[];
  minersTitle?: string;
  miners?: {
    name: string;
    trying: string;
    hash: string;
    status: string;
    solved: boolean;
  }[];
  result: {
    headline: string;
    text: string;
    waitingText?: string;
    rewardLabel?: string;
    reward?: string;
  };
  validatorsTitle?: string;
  validators?: {
    name: string;
    stake: number;
    winner: boolean;
  }[];
  callout?: { title: string; text: string };
  footer?: {
    attemptsLabel: string;
    attempts: number;
    verifying: string;
    status: string;
  };
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { label: string; text: string }[] }
  | { type: "callout"; title: string; text: string }
  | {
      type: "steps";
      title: string;
      items: {
        title: string;
        text: string;
        icon: "shield-check" | "user" | "network";
      }[];
    }
  | {
      type: "owe-ledger";
      entries: { from: string; to: string; amount: string }[];
    }
  | {
      type: "distributed-ledger";
      entries: { from: string; to: string; amount: string }[];
    }
  | { type: "hash-chain" }
  | { type: "hash-check" }
  | {
      type: "create-transaction";
      from: string;
      balance: string;
      to: string;
      amount: string;
      fee: string;
      signature: string;
      otherMempoolCount: number;
      steps: { title: string; text?: string }[];
    }
  | {
      type: "explore-transaction";
      fields: {
        id: string;
        label: string;
        value: string;
        description: string;
        whyItMatters: string;
        icon: "user" | "dollar" | "tag" | "clock" | "key";
      }[];
      whyItMatters: {
        title: string;
      };
    }
  | { type: "smart-contract-flow" }
  | { type: "smart-contract-if-then" }
  | { type: "smart-contract-vault" }
  | { type: "smart-contract-uses" }
  | { type: "smart-contract-builder" }
  | { type: "section"; title?: string; blocks: ContentBlock[] }
  | {
      type: "consensus-compare";
      title: string;
      text: string;
      proofOfWork: ConsensusCompareMethod;
      proofOfStake: ConsensusCompareMethod;
    };
