import type { ContentBlock } from "@/lib/content/blocks";

export const whatIsBlockchainBlocks: ContentBlock[] = [
      {
        type: "section",
        eyebrow: "01 — The problem",
        title: "A record everyone can trust",
        blocks: [
          {
            type: "paragraph",
            text: "Alice, Bob, Emma, and Alex just got back from a trip. They need one record of **who owes whom**—and they don’t want to trust a single person to keep it honest.",
          },
          {
            type: "paragraph",
            text: "Bob offers to keep a notebook of debts. Everyone else just reads from him.",
          },
          {
            type: "callout",
            title: "What is a ledger?",
            text: "A **ledger** is a list of money movements written in order over time. Bob’s notebook is a ledger—just a private one only he controls.",
          },
          {
            type: "owe-ledger",
            entries: [
              { from: "Alice", to: "Bob", amount: "$10" },
              { from: "Emma", to: "Bob", amount: "$25" },
              { from: "Alex", to: "Bob", amount: "$5" },
            ],
          },
        ],
      },
      {
        type: "section",
        eyebrow: "02 — The flaw",
        title: "One keeper, one weakness.",
        aside: {
          title: "Edit an amount above",
          text: "See what happens when Bob controls the only ledger.",
        },
        blocks: [
          {
            type: "paragraph",
            text: "Each line is an entry. Add them up and everyone knows where they stand. But everyone depends on Bob. If he changes a number, loses the notebook, or can’t be reached, the record breaks. A blockchain is how the group keeps the same ledger, so no one person holds the only copy.",
          },
        ],
      },
      {
        type: "section",
        title: "Everyone keeps a copy",
        blocks: [
          {
            type: "paragraph",
            text: "Give **everyone the same ledger**. When someone wants to add an **IOU** (“I owe you”—a new debt), they tell the group. A change gets written when the group accepts it. A quiet rewrite of an old line should show—the next chapters turn that into a rule.",
          },
          {
            type: "callout",
            title: "Hint: what is a node?",
            text: "A **node** is a computer running the software: it keeps a copy of the ledger, checks new entries, and talks to other nodes. Below, Alice’s notebook is one node; Bob’s, Emma’s, and Alex’s are others.",
          },
          {
            type: "paragraph",
            text: "The hard part isn’t making copies. It’s keeping them **the same**. If Alice edits her notebook, the others won’t match. They can see the disagreement, but not yet prove which copy is right.",
          },
          {
            type: "paragraph",
            text: "Try it: change Alice’s amounts, or broadcast a new IOU and watch it land on every copy.",
          },
          {
            type: "distributed-ledger",
            entries: [
              { from: "Alice", to: "Bob", amount: "$10" },
              { from: "Bob", to: "Emma", amount: "$25" },
            ],
          },
          {
            type: "paragraph",
            text: "That network of matching notebooks is a **shared ledger**: many machines, talking **peer-to-peer**—computer to computer, with no company database in the middle. It becomes a **blockchain** once an edit shows in the links between blocks, and the group has a rule for who may add the next entry. Those two pieces are next.",
          },
        ],
      },
      {
        type: "section",
        title: "What “decentralized” actually means",
        blocks: [
          {
            type: "paragraph",
            text: "Look back at the copies. No single node is the authority. The group follows **shared rules**. That’s **decentralized**.",
          },
          {
            type: "list",
            items: [
              {
                label: "Many copies",
                text: "One failure doesn’t erase the record—you just tried that with four notebooks.",
              },
              {
                label: "Anyone can check",
                text: "You don’t have to trust a company’s private database. You can check the rules yourself.",
              },
              {
                label: "Some people cheat",
                text: "The design assumes that. Honest nodes still end up with one shared history. How they pick the next writer is **consensus**—a little later.",
              },
            ],
          },
          {
            type: "callout",
            title: "Not magic",
            text: "A shared ledger does not make data “true.” The group can agree on a history that was wrong from the start. Garbage in still means garbage on the shared list.",
          },
          {
            type: "callout",
            title: "Key idea",
            text: "Copies replace trust in one record-keeper. Hashes and consensus are what let many nodes agree on one history and notice a rewrite.",
          },
        ],
      },
      {
        type: "section",
        title: "Blockchain and money",
        blocks: [
          {
            type: "paragraph",
            text: "So why does this show up next to **money**? In the real world, most money is already a list. Your bank app doesn’t hold cash in a drawer. It shows a **balance** the bank writes—and updates when you pay someone. A shared ledger can keep that kind of list **without** the bank: many computers share one official record, and when the group accepts a change, the money has moved.",
          },
          {
            type: "paragraph",
            text: "The units on that list are **coins** the network invented—not dollars sitting in a vault. Coin plus chain as the official who-has-what is a **cryptocurrency**. You can still **trade** those coins for **real money**, like dollars. That usually happens on an **exchange**: sell coins and dollars land in your bank, or spend dollars to buy coins. The chain itself never talks to the bank—the exchange does that handoff.",
          },
          {
            type: "callout",
            title: "Hint: where the price comes from",
            text: "There is **no fixed value**. Nobody prints “one coin = $X” into the notebook. A coin is worth whatever buyers and sellers agree to **right now**. If more people want to buy than sell, the price tends to rise. If more people want to sell, it tends to fall. News, fear, hype, and new uses can shift that—so people **speculate**, buying in hope the price rises or selling to lock in a win. The dollar price can jump day to day even though old blocks stay the same.",
          },
          {
            type: "paragraph",
            text: "In this course we still write **$** because a dinner bill is easy to picture. Treat it as **value**. On a real chain that value lives as **coins**—and for floating coins, the dollar price is a market guess, not something the ledger stores. Some tokens aim to stay near **$1**—**USDT** and **USDC** are common ones, often called **crypto dollars**. That peg is a target, and the price can slip. When we need a dinner-sized amount that shouldn’t swing overnight, that’s usually **22 USDT**, not “22 of whatever coin is racing today.”",
          },
          {
            type: "paragraph",
            text: "The shared copies solve *who keeps the record*. They don’t yet prove a quiet edit on one notebook. Next: **hashes**—fingerprints that break if someone changes an old line.",
          },
        ],
      },
];
