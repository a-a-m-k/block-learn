import type { ContentBlock } from "@/lib/content/blocks";

export const consensusBlocks: ContentBlock[] = [
      {
        type: "section",
        title: "Agreeing on the next block",
        blocks: [
          {
            type: "paragraph",
            text: "Alice, Bob, Emma, and Alex now share a chain of linked blocks. You just saw Alice’s $22 dinner payment inside Block #101. A transaction is not a block. She created that payment on its own first. It waited. Someone else put it into #101, and everyone else agreed that block was valid.",
          },
          {
            type: "paragraph",
            text: "That’s the job of a **consensus mechanism**: a repeatable loop for choosing a writer, checking their block, and locking it into shared history. The writer is the **proposer**. The people who created the transactions are the **senders**.",
          },
          {
            type: "steps",
            title: "How a block gets added",
            items: [
              {
                title: "Choose a proposer",
                text: "Pick who may build the next block—fairly, so one person can’t always go first.",
                icon: "user",
              },
              {
                title: "Propose a block",
                text: "That node packages waiting transactions into a proposed block and sends it to the others.",
                icon: "shield-check",
              },
              {
                title: "Others verify & accept",
                text: "The rest of the nodes check the rules. If it passes, they add it to their chain—same history for everyone.",
                icon: "network",
              },
            ],
          },
          {
            type: "callout",
            title: "The payment comes first",
            text: "**Alice** created the $22. A **proposer**—often someone else, like **Alex**—packed it into Block #101. Creating the transaction and proposing the block happen at different times, by different people. New transactions are already waiting for Block #102.",
          },
          {
            type: "paragraph",
            text: "That still leaves two questions: **why** would anyone want the job—and **how** do we pick who gets it without a boss? Rewards first, then two common ways to choose.",
          },
        ],
      },
      {
        type: "section",
        title: "Why add a block at all?",
        blocks: [
          {
            type: "paragraph",
            text: "Building a block isn’t free. On some networks the cost is machines and electricity. On others it is coins locked up. Either way, new transactions are waiting for Block #102. **Alex** takes the job because a block the others accept **pays him**—a **block reward** plus any **fees** senders attached so their transaction gets included.",
          },
          {
            type: "paragraph",
            text: "That pay is in the network’s **own coins**—not the $22 already in Block #101, and not a bank wire. He can **sell** them for dollars, or swap into USDT if he wants dinner-stable money. **Rewards** and **fees** aren’t fixed forever: the reward can change over time, and fees rise or fall with how busy the chain is.",
          },
          {
            type: "paragraph",
            text: "The catch: you only get paid if everyone else **accepts** your block. A fake transaction like “Alice owes Bob $1,000,000” fails the rules. Other nodes reject it. No reward—and the effort you already put in is wasted.",
          },
          {
            type: "list",
            items: [
              {
                label: "For the proposer",
                text: "A valid block pays in coins. An invalid one pays nothing—and cheating can cost what you already put in.",
              },
              {
                label: "For people sending value",
                text: "A transaction becomes part of shared history once a block includes it. Alice’s $22 landed that way, in Block #101. If nobody adds blocks, later transactions sit waiting.",
              },
              {
                label: "For the whole group",
                text: "Each accepted block extends the shared notebook. Copies stay in sync, and older entries get harder to rewrite (from hashes in the last chapter).",
              },
            ],
          },
          {
            type: "callout",
            title: "Honest is usually the winning move",
            text: "Add a **valid** block and you get paid, Alice’s transaction actually lands, and the chain keeps growing. Someone can still try to cheat, but other nodes check—so a lie usually just wastes your effort. Next we’ll look at two networks that make that waste expensive on purpose.",
          },
        ],
      },
      {
        type: "section",
        title: "Two common answers",
        blocks: [
          {
            type: "paragraph",
            text: "We’ll compare **Bitcoin** (Proof of Work) and **Ethereum** (Proof of Stake)—the two networks people mean most often when they say cryptocurrency. They are separate ledgers. Each demo shows how that network adds its own next block, not a second copy of Alice’s chain. Same goal—propose a **valid** block and get paid if the others accept it, in that network’s coins: **bitcoin** on Bitcoin, **ether (ETH)** on Ethereum. Different costs for cheating. In the demo, **+ 3.125** and **+ 0.1** are sample rewards in those coins—not dollars, and not a rate to memorize. Bitcoin’s block reward is 3.125 coins until the next scheduled cut. Fees still change with how busy the chain is.",
          },
          {
            type: "consensus-compare",
            title: "How do we choose who proposes the next block?",
            text: "Bitcoin and Ethereum answer that question in different ways. The computers doing the job are still **nodes**. When they compete with computing power they’re called **miners**. When they lock coins for a chance to write, they’re called **validators**.",
            proofOfWork: {
              title: "Proof of Work",
              subtitle: "Bitcoin — miners compete to solve a hard guessing puzzle",
              text: "Miners compete by trying many guesses. The first one to find a valid answer gets to propose the next block. Everyone else can check that answer quickly.",
              items: [
                "**Put in computing power** → Miners use their computers to compete.",
                "**Solve a puzzle** → Miners repeatedly calculate hashes until they find a valid one. The hashes shown in the race demo are illustrative.",
                "**Winner is determined by chance** → More computing power means more attempts and a higher chance of winning.",
                "**Winner proposes the block** → The first miner to find a valid solution proposes the next block. It lands when the other nodes accept it.",
                "**Others verify it** → Other nodes check the solution and transactions.",
                "**Cheating costs computing resources** → The miner has already spent electricity and computing power doing the work.",
              ],
              minersTitle: "Miners are solving...",
              miners: [
                {
                  name: "Alice",
                  trying: "Trying hash...",
                  hash: "8f2d4c19a7e30ba1",
                  status: "Not solved",
                  solved: false,
                },
                {
                  name: "Bob",
                  trying: "Trying hash...",
                  hash: "3ac481290d4fe07b",
                  status: "Not solved",
                  solved: false,
                },
                {
                  name: "Alex",
                  trying: "Trying hash...",
                  hash: "91bc6e2a8d15f0d3",
                  status: "Solved!",
                  solved: true,
                },
              ],
              result: {
                headline: "{name} wins!",
                text: "Next block added to Bitcoin",
                waitingText: "Next block",
                rewardLabel: "Reward",
                reward: "+ 3.125 coins",
              },
              callout: {
                title: "What's happening?",
                text: "Miners try different **guess numbers** (a **nonce** is just the number they change each try) until they find a hash that meets the network’s **target**: the hash has to look a certain way, often starting with zeros. That race costs computing power and energy—so cheating is expensive.",
              },
              footer: {
                attemptsLabel: "Attempts",
                attempts: 12_481_204,
                verifying: "Verifying block...",
                status: "Block verified and added",
              },
            },
            proofOfStake: {
              title: "Proof of Stake",
              subtitle: "Ethereum — selected based on stake",
              text: "Validators lock up coins as stake. The network then selects who may propose the next block. There is no massive computing race — selection is based on stake and rules.",
              items: [
                "**Put in coins** → Validators lock their own coins as a stake.",
                "**Selection happens automatically** → An algorithm chooses a validator to propose the next block.",
                "**More stake generally means higher chance** → But having the most stake doesn't guarantee selection.",
                "**Selected validator proposes the block** → Their computer creates and broadcasts the next block.",
                "**Others verify it** → Other validators check the block and agree whether it follows the rules.",
                "**Cheating risks your stake** → Dishonest validators can lose some of their locked coins as a **penalty** (often called slashing).",
              ],
              validatorsTitle: "Validators and their stake",
              validators: [
                { name: "Alice", stake: 120, winner: true },
                { name: "Alex", stake: 250, winner: false },
                { name: "Bob", stake: 80, winner: false },
              ],
              result: {
                headline: "{name} is selected!",
                text: "{name} proposes Ethereum’s next block",
                waitingText: "Next block",
                rewardLabel: "Reward",
                reward: "+ 0.1 coins",
              },
              callout: {
                title: "What's happening?",
                text: "This run selects **Alice**. **Alex** locked more coins. More stake raises the chance, and the biggest stake still loses some rounds. If they cheat, they can lose locked coins—a penalty often called slashing.",
              },
              footer: {
                attemptsLabel: "Validators",
                attempts: 3,
                verifying: "Verifying block...",
                status: "Block verified and added",
              },
            },
          },
          {
            type: "callout",
            title: "Key idea",
            text: "Consensus replaces a central authority with incentives to stay honest. You get paid for a block others accept—whether the cost of cheating is spent energy (Proof of Work) or locked coins (Proof of Stake).",
          },
          {
            type: "paragraph",
            text: "Blocks are the containers. Next we’ll open one up and follow a single **transaction** from Alice’s wallet to the chain.",
          },
        ],
      },
];
