import type { ChapterSlug } from "@/lib/course";
import type { ContentBlock } from "@/lib/content/blocks";

import { blocksAndHashesBlocks } from "@/lib/content/blocks-and-hashes";
import { consensusBlocks } from "@/lib/content/consensus";
import { smartContractsBlocks } from "@/lib/content/smart-contracts";
import { transactionsBlocks } from "@/lib/content/transactions";
import { whatIsBlockchainBlocks } from "@/lib/content/what-is-blockchain";

export type { ContentBlock } from "@/lib/content/blocks";

type ChapterContent = {
  slug: ChapterSlug;
  blocks: readonly ContentBlock[];
};

const contentBySlug = {
  "what-is-blockchain": {
    slug: "what-is-blockchain",
    blocks: whatIsBlockchainBlocks,
  },
  "blocks-and-hashes": {
    slug: "blocks-and-hashes",
    blocks: blocksAndHashesBlocks,
  },
  consensus: {
    slug: "consensus",
    blocks: consensusBlocks,
  },
  transactions: {
    slug: "transactions",
    blocks: transactionsBlocks,
  },
  "smart-contracts": {
    slug: "smart-contracts",
    blocks: smartContractsBlocks,
  },
} as const satisfies Record<ChapterSlug, ChapterContent>;

export function getContentBySlug(slug: ChapterSlug) {
  return contentBySlug[slug];
}
