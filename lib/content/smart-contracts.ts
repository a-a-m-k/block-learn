import type { ContentBlock } from "@/lib/content/blocks";

export const smartContractsBlocks: ContentBlock[] = [
      {
        type: "section",
        title: "What is a smart contract?",
        blocks: [
          {
            type: "paragraph",
            text: "Last chapter, Alice confirmed a new send in her wallet: **To** was Bob, and the network moved another $22. She’s in that same wallet now. What’s new is the **destination**. To doesn’t have to be a person.",
          },
          {
            type: "paragraph",
            text: "A send is enough when she already owes Bob. Sometimes she needs to **trade**. She holds **ETH** (Ethereum’s own coin), but she wants **USDC**—the **stablecoin** from the first chapter, a crypto dollar that aims to stay near $1. The price can still slip. She wants it so she can pay a stable amount. She can’t send ETH to a stranger and hope they send USDC back. They can keep the ETH.",
          },
          {
            type: "paragraph",
            text: "So she opens a **swap** app: a site that asks her wallet to trade one token for another. Confirm pops again—but this time To is not Bob. It’s a **program** already stored on the shared ledger. If the trade can happen, that program takes her ETH and **sends USDC to Alice**. If it can’t, she keeps the ETH. The attempt can still be written into a block, and the fee can still be spent. That program is a **smart contract**.",
          },
          {
            type: "callout",
            title: "Key idea",
            text: "When the wallet shows a confirm for a program, you’re not paying a person. You’re asking every honest node to run the same rules. The wallet only signs.",
          },
        ],
      },
      {
        type: "section",
        title: "How does it work?",
        blocks: [
          {
            type: "paragraph",
            text: "**To** is a **contract address**—its own rules, and often its own balance. That shared pile of ETH and USDC is a **pool**. The program uses it to settle trades.",
          },
          {
            type: "paragraph",
            text: "Someone **deploys** that program once (it gets an address on the ledger). Later transactions **call** that address to run its rules. Deployment writes the code; calls ask it to execute.",
          },
          {
            type: "paragraph",
            text: "When a call is included in a block, nodes load that code, check its conditions, and write the **new state**—updated balances and data—into the chain. Like Alice’s payment, the call usually pays a **fee**.",
          },
          { type: "smart-contract-flow" },
          {
            type: "callout",
            title: "Same path, richer message",
            text: "Create → sign → broadcast → mempool → block still applies. The outcome can be a swap, an approval, or an NFT transfer—not only “Alice −$22, Bob +$22.”",
          },
        ],
      },
      {
        type: "section",
        title: "If this → then that",
        blocks: [
          {
            type: "paragraph",
            text: "A simple send is already a tiny rule: “if Alice signed and has enough balance, then move the amount.” A swap is the same shape: “if she sent enough ETH, then send USDC to Alice.” That’s what the confirm popup is asking her to run.",
          },
          {
            type: "paragraph",
            text: "A normal app could skip that check. Here every node runs it, so the wallet cannot pretend the swap went through.",
          },
          { type: "smart-contract-if-then" },
        ],
      },
      {
        type: "section",
        title: "Smart contracts can hold assets",
        blocks: [
          {
            type: "paragraph",
            text: "A contract address can **hold assets** until its rules release them. Swap pools, lockups, and NFT markets keep that value in shared balances on the chain, not in an app’s database.",
          },
          {
            type: "paragraph",
            text: "No one person can quietly empty it. Withdrawals only succeed if the **code’s conditions** pass—and the network agrees on the result.",
          },
          { type: "smart-contract-vault" },
        ],
      },
      {
        type: "section",
        title: "What can smart contracts do?",
        blocks: [
          {
            type: "paragraph",
            text: "The same confirm can do more than a swap. Click a card for the version you’d actually see.",
          },
          { type: "smart-contract-uses" },
        ],
      },
      {
        type: "section",
        title: "Important limitation",
        blocks: [
          {
            type: "paragraph",
            text: "They execute whatever code was deployed—literally.",
          },
          {
            type: "paragraph",
            text: "And because results land in **blocks linked by hashes**, a bad rule doesn’t quietly vanish. Once a buggy swap or a reckless approval ships and consensus accepts it, the ledger records that outcome like any other history.",
          },
          {
            type: "callout",
            title: "Not actually smart",
            text: "If a lockup contract says withdraw after 10 days, it won’t “notice” that feels unfair on day 9. If you approve a scam in your wallet, it will spend your tokens—the code doesn’t know it’s a scam. Read the popup before you confirm.",
          },
        ],
      },
      {
        type: "section",
        title: "Build the rule",
        blocks: [{ type: "smart-contract-builder" }],
      },
      {
        type: "section",
        title: "This is the end",
        blocks: [
          {
            type: "paragraph",
            text: "This is the last chapter. There is no next one.",
          },
          {
            type: "paragraph",
            text: "You started with Bob’s notebook and one writer. Shared copies replaced him. Hashes link the blocks so an edit shows. Consensus decides who may add the next block.",
          },
          {
            type: "paragraph",
            text: "Alice’s $22 is a signed message: “pay Bob $22.” A proposer packs it into a block. The other nodes check her signature and that she has enough. If they accept it, Bob receives $22.",
          },
          {
            type: "paragraph",
            text: "Her swap is that same kind of message. **To** is the swap program. The nodes load its code and run the rule you just built: enough ETH in, USDC sent to Alice. If she confirms a bad rule instead — an approval that lets a scam spend her tokens, or a lock the code will not open early — those nodes still carry it out. The hash links keep that outcome in the chain.",
          },
          {
            type: "callout",
            title: "The course stops here",
            text: "The quick check below is the last thing in the course. Answer all three, and you’re done.",
          },
        ],
      },
];
