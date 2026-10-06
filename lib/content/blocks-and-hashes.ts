import type { ContentBlock } from "@/lib/content/blocks";

export const blocksAndHashesBlocks: ContentBlock[] = [
      {
        type: "section",
        title: "From shared copies to a chain",
        blocks: [
          {
            type: "paragraph",
            text: "In the last chapter, everyone kept the same notebook. That stops Bob from being the only writer—but it raises a new question: if Alice edits her copy, how do the others prove she’s wrong?",
          },
          {
            type: "paragraph",
            text: "A **blockchain** answers by grouping those IOUs—now called **transactions**—into **blocks** and linking those blocks with **hashes**—digital fingerprints that change if the data changes. That link is what turns the shared ledger into a chain. Who may add the next block is still open.",
          },
          { type: "hash-chain" },
        ],
      },
      {
        type: "section",
        title: "What a hash does",
        blocks: [
          {
            type: "paragraph",
            text: "To make a hash, the block’s payments are written as one line in a fixed order: who paid whom, how much, and which block. A set calculation turns that line into a short fingerprint. Same line → same hash. Change one detail, such as Alice’s $22, and the line is different, so the fingerprint is completely different. Anyone can run that same calculation and check the result.",
          },
          {
            type: "paragraph",
            text: "The demos here use a short **teaching fingerprint**, not SHA-256—the hash real Bitcoin-style networks use. The lesson is the same: change the data, and the fingerprint changes.",
          },
          {
            type: "paragraph",
            text: "Try it with Alice’s $22. That amount is a new transaction—dinner for Bob—not the $10 she owed him on the trip. Change $22 to $220 and watch the fingerprint break.",
          },
          { type: "hash-check" },
        ],
      },
      {
        type: "section",
        title: "Why the network notices",
        blocks: [
          {
            type: "paragraph",
            text: "Each new block stores the hash of the block before it. The chain above ends at Block #101, which stores Block #100’s fingerprint. The next block, #102, would store #101’s.",
          },
          {
            type: "paragraph",
            text: "If Alice changes Block #101, that fingerprint no longer matches the one a later block would store. The others don’t take her copy on trust. Each one hashes Block #101 again and compares the result with the fingerprint already on their own copy. Same data would give the same hash. Hers doesn’t match, so they keep their copy and ignore the edit.",
          },
          {
            type: "paragraph",
            text: "Change an older block and you also break every link that follows. That’s why rewriting history gets harder as the chain grows.",
          },
          {
            type: "callout",
            title: "Key idea",
            text: "The network doesn't need to stop someone from changing their copy. It makes the change detectable and keeps the version that matches the network's agreed history.",
          },
          {
            type: "paragraph",
            text: "We still need a fair way to decide **who** gets to add the next block. That’s consensus—next up.",
          },
        ],
      },
];
