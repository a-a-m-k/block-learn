type Material = {
  id: string;
  title: string;
  link: string;
  source: string;
  description: string;
};

export const materials: Material[] = [
  {
    id: "bitcoin-whitepaper",
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
    link: "https://bitcoin.org/bitcoin.pdf",
    source: "Satoshi Nakamoto (bitcoin.org)",
    description:
      "The original whitepaper introducing blockchain and Proof of Work.",
  },
  {
    id: "ethereum-docs",
    title: "Ethereum Developer Documentation",
    link: "https://ethereum.org/en/developers/docs/",
    source: "ethereum.org",
    description:
      "Reference for smart contracts, Proof of Stake, and the EVM.",
  },
  {
    id: "ibm-blockchain",
    title: "How Does a Blockchain Work?",
    link: "https://www.ibm.com/think/topics/how-does-blockchain-work",
    source: "IBM Think / Blockchain",
    description:
      "Plain-language overview of distributed ledgers and hashing.",
  },
  {
    id: "blockchain-demo",
    title: "Blockchain Demo",
    link: "https://andersbrownworth.com/blockchain/",
    source: "Anders Brownworth",
    description:
      "Interactive visual demo of blocks, hashes, and chaining.",
  },
  {
    id: "consensus-mechanisms",
    title: "Consensus Mechanisms Explained",
    link: "https://ethereum.org/en/developers/docs/consensus-mechanisms/",
    source: "ethereum.org",
    description: "Comparison of Proof of Work and Proof of Stake.",
  },
];
