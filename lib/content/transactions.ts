import type { ContentBlock } from "@/lib/content/blocks";

export const transactionsBlocks: ContentBlock[] = [
      {
        type: "section",
        title: "What’s inside a block?",
        blocks: [
          {
            type: "paragraph",
            text: "We’ve covered a shared record, linked blocks, and who may add the next one. The data those blocks carry is mostly **transactions**. Alice’s dinner payment, $22, is already inside Block #101. Below she sends Bob another $22 from the $42 still on her address.",
          },
          {
            type: "paragraph",
            text: "Those messages usually start in a **crypto wallet**. Before one ever reaches a block, it helps to see what that app is actually doing.",
          },
        ],
      },
      {
        type: "section",
        title: "What is a wallet?",
        blocks: [
          {
            type: "paragraph",
            text: "A crypto wallet is an app on Alice’s phone or computer. **MetaMask** is a common one for Ethereum; **Phantom** is another. Open it and it looks a bit like a banking app: a balance, someone to pay, and a Confirm button.",
          },
          {
            type: "paragraph",
            text: "A bank holds her dollars and moves them when she asks. Here the coins live on the shared ledger. The app does not hold them. It reads the blockchain—the list of payments already in the blocks—and adds up what she can still spend. To move coins, it asks the network to write a new line. Delete the app and the balance is still on the ledger. Install it again, with the same secret, and the balance comes back.",
          },
          {
            type: "paragraph",
            text: "What the app does hold is the **keys** that prove “this spend is from Alice.” Without those keys, nobody else can move her value—not Bob, and not the company that made the app. The next section opens those keys.",
          },
          {
            type: "list",
            items: [
              {
                label: "Balance",
                text: "What her address can still spend, read from the ledger. In the demo below, that number is $42.",
              },
              {
                label: "Address",
                text: "The account number she copies when someone wants to pay her. She can share it freely. Sharing it does not let them spend.",
              },
              {
                label: "Send",
                text: "She picks Bob and another $22. The app writes the message “Alice pays Bob $22” and waits.",
              },
              {
                label: "Confirm",
                text: "The tap that matters. It means “sign this exact message with my secret and hand it to the network.” After that, honest nodes will try to carry it out. There is no support desk that can pull the $22 back.",
              },
            ],
          },
          {
            type: "callout",
            title: "Hint: two things people call a wallet",
            text: "Some companies hold the keys and show Alice a balance in their own app. That is closer to a bank: they can freeze the account, and a forgotten password can be reset. MetaMask and Phantom are the kind in this story. The keys stay on her device, so if those keys are gone, nobody can restore them.",
          },
          {
            type: "callout",
            title: "Hint: the backup words",
            text: "When Alice creates the wallet, the app shows a short list of words once and tells her to write them down on paper, away from the phone. Those words rebuild the same keys on a new phone. Anyone who reads the list can spend her coins, so it is not a username—and it does not belong in a photo, email, or chat.",
          },
        ],
      },
      {
        type: "section",
        title: "What are the keys?",
        blocks: [
          {
            type: "paragraph",
            text: "When Alice creates a wallet, it generates a pair of keys.",
          },
          {
            type: "list",
            items: [
              {
                label: "Private key",
                text: "a secret that stays with Alice. It lets her authorize spending.",
              },
              {
                label: "Public key",
                text: "a matching public half made from the private key (you cannot reverse it to steal the secret). Others use it to verify her signatures.",
              },
            ],
          },
          {
            type: "paragraph",
            text: "Her **address** is made from the public key. The ledger stores her balance under that address, and the private key is what spends from it.",
          },
        ],
      },
      {
        type: "section",
        title: "From balance to broadcast",
        blocks: [
          {
            type: "paragraph",
            text: "When she sends this new $22 to Bob, the wallet builds a transaction from that record, signs it, and sends it to the network. It then waits in the **mempool** until consensus puts it in a block.",
          },
          {
            type: "callout",
            title: "Hint: what is a mempool?",
            text: "The **mempool** (memory pool) is a waiting room: each node’s list of valid transactions that are known to the network but not yet packed into a block. This new $22 sits there until someone includes it.",
          },
          {
            type: "create-transaction",
            from: "Alice",
            balance: "$42",
            to: "Bob",
            amount: "$22",
            fee: "$0.01",
            signature: "8f3a...91c2",
            otherMempoolCount: 3,
            steps: [
              { title: "Create transaction" },
              {
                title: "Signed",
                text: "The transaction is signed with Alice's private key.",
              },
              {
                title: "Broadcast to network",
                text: "The transaction is sent to all nodes.",
              },
              {
                title: "In mempool",
                text: "Valid and waiting—known to the network, but not confirmed in a block yet.",
              },
              {
                title: "Added to block",
                text: "The transaction is included in a block and becomes part of the chain.",
              },
            ],
          },
          {
            type: "callout",
            title: "Signed ≠ confirmed",
            text: "Signing only hands the transaction to the network. It becomes permanent once a block includes it and the other nodes accept that block.",
          },
          {
            type: "paragraph",
            text: "Nodes also reject a **double spend**: trying to pay the same coins twice. Alice’s $42 can cover one $22 send, not two overlapping ones. The second would fail even if both signatures look valid.",
          },
        ],
      },
      {
        type: "section",
        title: "Why is it called crypto?",
        blocks: [
          {
            type: "paragraph",
            text: "The “crypto” in cryptocurrency comes from **cryptography**—math that secures information. Here it ties Alice’s private key to a signature the network can check with public information.",
          },
          {
            type: "paragraph",
            text: "Private key → creates signature → network verifies with public key",
          },
          {
            type: "paragraph",
            text: "Her private key never needs to leave the wallet. That signature is what lets her move value without a bank approving the transfer. Explore the fields below to see what the network actually checks.",
          },
          {
            type: "explore-transaction",
            fields: [
              {
                id: "from",
                label: "From",
                value: "Alice (0x1a2b...3c4d)",
                description:
                  "The sender’s wallet address. Only the matching private key can authorize a send from here.",
                whyItMatters:
                  "No bank tells the network whose account to debit. From names the owner—and only that owner’s key can approve the spend.",
                icon: "user",
              },
              {
                id: "to",
                label: "To",
                value: "Bob (0x5e6f...7a8b)",
                description:
                  "The recipient’s wallet address — where the funds will arrive once the transaction is confirmed.",
                whyItMatters:
                  "To is the destination on the shared ledger. Send to the wrong address and the value still moves—there is no customer-support undo.",
                icon: "user",
              },
              {
                id: "amount",
                label: "Amount",
                value: "$22",
                description:
                  "How much value moves from sender to recipient. Alice must have enough balance to cover this plus the fee.",
                whyItMatters:
                  "Amount is what Alice wants to move. Nodes reject the whole transaction if she can’t cover it (plus the fee) from her balance.",
                icon: "dollar",
              },
              {
                id: "fee",
                label: "Fee",
                value: "$0.01",
                description:
                  "A small network payment for processing. Higher fees can mean faster inclusion when the network is busy.",
                whyItMatters:
                  "Block space is limited. Fee is Alice’s bid to get this request into a block sooner when lots of people are sending at once.",
                icon: "tag",
              },
              {
                id: "signature",
                label: "Signature",
                value: "3045f...2c7a",
                description:
                  "Proof Alice authorized this exact transaction. Change any field and the signature no longer matches.",
                whyItMatters:
                  "Signature locks the whole package. Swap Bob for someone else after signing and the proof fails—so nobody can quietly rewrite Alice’s intent.",
                icon: "key",
              },
            ],
            whyItMatters: {
              title: "Why it matters",
            },
          },
          {
            type: "callout",
            title: "The arc so far",
            text: "Shared copies → linked blocks → consensus on who writes next → transactions as the data inside. Next: those transactions can call **programs** on the ledger—smart contracts.",
          },
        ],
      },
];
