import type { ChapterSlug } from "@/lib/course";

type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  question: string;
  options: [QuizOption, QuizOption, QuizOption];
  correctOptionId: string;
  explanation?: string;
};

export type ChapterQuiz = {
  questions: QuizQuestion[];
};

const quizzesByChapterSlug: Record<ChapterSlug, ChapterQuiz> = {
  "what-is-blockchain": {
    questions: [
      {
        question:
          "Why is Bob’s single notebook a weak design for a shared financial record?",
        options: [
          {
            id: "a",
            text: "Because paper notebooks can’t store enough who-owes-whom entries for a large group.",
          },
          {
            id: "b",
            text: "Because if Bob changes a debt or loses the notebook, nobody else has the record.",
          },
          {
            id: "c",
            text: "Because Alice, Emma, and Alex are not allowed to read Bob’s notebook.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "One person with the only notebook can change it or lose it. The group keeps the same ledger instead.",
      },
      {
        question:
          "If someone writes false who-owes-whom entries onto a public blockchain, what is still true?",
        options: [
          {
            id: "a",
            text: "The chain magically corrects the amounts to the real-world truth.",
          },
          {
            id: "b",
            text: "The network can still agree on that history—so garbage in can become garbage on-chain.",
          },
          {
            id: "c",
            text: "False entries are impossible because hashes encrypt every line.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "A blockchain makes an agreed history tamper-evident. It does not guarantee that the original data was true.",
      },
      {
        question:
          "In the shared-notebook diagram, you change an amount on Alice’s copy only. What is true before anyone accepts that edit?",
        options: [
          {
            id: "a",
            text: "Every notebook updates to her new amount immediately.",
          },
          {
            id: "b",
            text: "The other copies still show the old amount — one quiet edit does not become the group’s record.",
          },
          {
            id: "c",
            text: "Bob’s notebook is deleted, so Alice’s copy is the only one left.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Changing one copy is a local cheat. The others keep the shared amounts until the group accepts a new entry.",
      },
    ],
  },
  "blocks-and-hashes": {
    questions: [
      {
        question: "Why do hashes make a blockchain tamper-evident?",
        options: [
          {
            id: "a",
            text: "They encrypt every transaction so nobody can read it",
          },
          {
            id: "b",
            text: "Changing old data changes its hash and breaks later links",
          },
          { id: "c", text: "They delete invalid blocks automatically" },
        ],
        correctOptionId: "b",
        explanation:
          "Hashes link blocks. Change old data and later blocks no longer match—so the network can spot the edit.",
      },
      {
        question: "What does a hash do in this course?",
        options: [
          {
            id: "a",
            text: "It hides the block’s contents so only Alice can read them.",
          },
          {
            id: "b",
            text: "It fingerprints the data so any change produces a different result.",
          },
          {
            id: "c",
            text: "It chooses who may propose the next block.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Hashing is a fingerprint, not encryption. Same data → same hash; change the data → a different hash.",
      },
      {
        question:
          "In the hash diagram, Alice’s payment changes from $22 to $220. What happens?",
        options: [
          {
            id: "a",
            text: "The fingerprint stays the same, because the names on the block did not change.",
          },
          {
            id: "b",
            text: "The new fingerprint no longer matches what the next block expects, so this copy is invalid.",
          },
          {
            id: "c",
            text: "The network rewrites the next block so the new amount is accepted automatically.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "The fingerprint is of the whole block, including the amount. Change $22 and the result no longer matches the link the next block would store.",
      },
    ],
  },
  consensus: {
    questions: [
      {
        question: "What problem does consensus solve?",
        options: [
          {
            id: "a",
            text: "How the network agrees on one shared, valid history",
          },
          { id: "b", text: "How to make transaction fees free for everyone" },
          { id: "c", text: "How to hide all blockchain data from the public" },
        ],
        correctOptionId: "a",
        explanation:
          "Consensus is how nodes agree who may add the next block—and whether that block is valid. A proposer only gets paid if the others accept it.",
      },
      {
        question:
          "In Proof of Work vs Proof of Stake, what is the shared idea?",
        options: [
          {
            id: "a",
            text: "Only one company server may write the next block.",
          },
          {
            id: "b",
            text: "Cheating should be expensive—whether through spent energy or locked stake.",
          },
          {
            id: "c",
            text: "Blocks no longer need to be verified by other nodes.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Both replace a central authority with incentives: a valid block pays, and cheating wastes energy or risks stake—so honesty is usually the cheaper move.",
      },
      {
        question:
          "Alex proposes a block, and the other nodes reject it. What does he get for that block?",
        options: [
          {
            id: "a",
            text: "The block reward, because proposing is enough.",
          },
          {
            id: "b",
            text: "Nothing for that block — a proposer is paid only when the others accept it.",
          },
          {
            id: "c",
            text: "The fees, even though the block is thrown out.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "The reward is for a block the network accepts. A rejected proposal does not pay, whether the cost was energy or stake.",
      },
    ],
  },
  transactions: {
    questions: [
      {
        question:
          "Can this transaction be added to a block? Alice sends Bob $50, with a valid signature and correct format — but Alice only has $42.",
        options: [
          {
            id: "a",
            text: "Yes — a valid signature is enough for the network to accept it.",
          },
          {
            id: "b",
            text: "No — Alice does not have enough balance, so the network rejects it.",
          },
          {
            id: "c",
            text: "Yes — the fee will cover the missing $8.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "A valid signature isn’t enough. The network also checks Alice has enough balance for the amount (and fee).",
      },
      {
        question:
          "Alice signs a payment and broadcasts it. Is it permanent yet?",
        options: [
          {
            id: "a",
            text: "Yes — signing alone finalizes it on every node.",
          },
          {
            id: "b",
            text: "Not yet — it waits (often in the mempool) until consensus includes it in an accepted block.",
          },
          {
            id: "c",
            text: "No — signed transactions are never sent to the network.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Signed ≠ confirmed. Inclusion in a block the network accepts is what makes the change part of shared history.",
      },
      {
        question:
          "You open Alice’s signed payment and change the amount. What happens to the signature?",
        options: [
          {
            id: "a",
            text: "It still proves she authorized the new amount.",
          },
          {
            id: "b",
            text: "It no longer matches, so this is not the payment she signed.",
          },
          {
            id: "c",
            text: "The fee updates on its own to cover the new amount.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "The signature covers the whole payment. Change the amount and the proof fails — nobody can quietly rewrite what Alice authorized.",
      },
    ],
  },
  "smart-contracts": {
    questions: [
      {
        question:
          "Alice confirms a swap in her wallet: 0.1 ETH to a swap contract with the rule if (ethIn >= 0.1) sendUSDC(). What happens?",
        options: [
          {
            id: "a",
            text: "A support agent reviews the trade and sends USDC by hand.",
          },
          {
            id: "b",
            text: "The contract checks the condition and sends USDC automatically for everyone running the same rules.",
          },
          {
            id: "c",
            text: "Nothing—smart contracts only store text, they never change state.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Smart contracts execute predefined rules on-chain. Same signed call, same code, same result for every honest node.",
      },
      {
        question: "Why isn’t a “smart” contract actually smart?",
        options: [
          {
            id: "a",
            text: "It invents fair outcomes when the code looks unfair.",
          },
          {
            id: "b",
            text: "It only executes the deployed code—bugs and all—without understanding intent.",
          },
          {
            id: "c",
            text: "It refuses to run unless a human approves each line.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Contracts don’t think. They run whatever was deployed. Once consensus accepts a buggy result, that history sticks.",
      },
      {
        question:
          "Alice confirms a swap whose rule is if (ethIn >= 0.1) sendUSDC(), but she sends 0.05 ETH. What does the contract do?",
        options: [
          {
            id: "a",
            text: "Sends USDC anyway, because she confirmed in her wallet.",
          },
          {
            id: "b",
            text: "Does not send USDC — the condition fails.",
          },
          {
            id: "c",
            text: "Asks a person to decide whether 0.05 is close enough.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "The contract runs the rule you built. 0.05 is below 0.1, so sendUSDC() does not run.",
      },
    ],
  },
};

export function getQuizByChapterSlug(slug: ChapterSlug) {
  return quizzesByChapterSlug[slug];
}
