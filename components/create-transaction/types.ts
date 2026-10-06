import type { ContentBlock } from "@/lib/chapter-content";

export type CreateTransactionContent = Extract<
  ContentBlock,
  { type: "create-transaction" }
>;
