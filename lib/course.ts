import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRightIcon,
  BlocksIcon,
  BookOpenIcon,
  FileCodeIcon,
  UsersIcon,
} from "lucide-react";

type ChapterDefinition = {
  id: string;
  number: number;
  title: string;
  slug: string;
  description: string;
  readMinutes: number;
  icon: LucideIcon;
  image?: { src: string; alt: string };
};

const chapterDefinitions = [
  {
    id: "1",
    number: 1,
    title: "What is Blockchain?",
    slug: "what-is-blockchain",
    description:
      "Alice, Bob, Emma, and Alex need a shared ledger of expenses. Blockchain to the rescue.",
    readMinutes: 6,
    icon: BookOpenIcon,
    image: {
      src: "/images/chapter-blockchain.svg",
      alt: "Three isometric blocks linked in a chain.",
    },
  },
  {
    id: "2",
    number: 2,
    title: "Blocks & Hashes",
    slug: "blocks-and-hashes",
    description:
      "Change one old record. Why does every later block give the edit away?",
    readMinutes: 4,
    icon: BlocksIcon,
    image: {
      src: "/images/chapter-hashes.svg",
      alt: "Stacked blocks marked with a hash.",
    },
  },
  {
    id: "3",
    number: 3,
    title: "Consensus Mechanisms",
    slug: "consensus",
    description:
      "Someone proposes the next block. What has to be true before everyone else adds it?",
    readMinutes: 7,
    icon: UsersIcon,
    image: {
      src: "/images/chapter-consensus.svg",
      alt: "Three nodes linked around a shared block.",
    },
  },
  {
    id: "4",
    number: 4,
    title: "Transactions",
    slug: "transactions",
    description:
      "Alice taps Confirm to send Bob another $22. What leaves her phone, and when does Bob actually have it?",
    readMinutes: 8,
    icon: ArrowLeftRightIcon,
    image: {
      src: "/images/chapter-transactions.svg",
      alt: "Two blocks exchanging a transaction.",
    },
  },

  {
    id: "5",
    number: 5,
    title: "Smart Contracts",
    slug: "smart-contracts",
    description:
      "Alice won’t trust a stranger to pay her back. What if a program on the chain does the swap?",
    readMinutes: 8,
    icon: FileCodeIcon,
    image: {
      src: "/images/chapter-smart-contracts.svg",
      alt: "Stacked blocks running contract code.",
    },
  },
] as const satisfies readonly ChapterDefinition[];

export type ChapterSlug = (typeof chapterDefinitions)[number]["slug"];

export type Chapter = Omit<ChapterDefinition, "slug"> & {
  slug: ChapterSlug;
};

export const chapters: readonly Chapter[] = chapterDefinitions;

export const totalChapters = chapters.length;

export const estimatedReadMinutes = chapters.reduce(
  (total, chapter) => total + chapter.readMinutes,
  0,
);

export function getChapterBySlug(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function isChapterSlug(value: unknown): value is ChapterSlug {
  return (
    typeof value === "string" &&
    chapters.some((chapter) => chapter.slug === value)
  );
}

export function getChapterProgressLabel(chapter: Chapter) {
  return `Chapter ${chapter.number} of ${totalChapters}`;
}

export function getAdjacentChapters(slug: ChapterSlug) {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) {
    return { prev: undefined, next: undefined };
  }

  return {
    prev: chapters[index - 1],
    next: chapters[index + 1],
  };
}

export function getResumeChapterSlug(
  completedSlugs: readonly ChapterSlug[],
): ChapterSlug {
  const nextIncomplete = chapters.find(
    (chapter) => !completedSlugs.includes(chapter.slug),
  );
  return (nextIncomplete ?? chapters[0]).slug;
}
