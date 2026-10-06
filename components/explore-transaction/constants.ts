import type { LucideIcon } from "lucide-react";
import {
  CircleDollarSignIcon,
  ClockIcon,
  KeyRoundIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";

import type { ContentBlock } from "@/lib/chapter-content";

export type ExploreTransactionContent = Extract<
  ContentBlock,
  { type: "explore-transaction" }
>;

export type TransactionField = ExploreTransactionContent["fields"][number];

export type FieldIcon = TransactionField["icon"];

export const FIELD_ICONS: Record<FieldIcon, LucideIcon> = {
  user: UserIcon,
  dollar: CircleDollarSignIcon,
  tag: TagIcon,
  clock: ClockIcon,
  key: KeyRoundIcon,
};

export const PANEL =
  "rounded-md border border-muted-foreground/50 diagram-pad-loose";

export const CARD_HEADING = "text-body font-semibold tracking-wide text-brand-text";

export const NAV_BUTTON_CLASS =
  "flex size-control-lg items-center justify-center rounded-full text-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40";

export const NAV_BUTTON_MUTED = "bg-muted-foreground/50 hover:bg-brand";

export const NAV_BUTTON_BRAND = "bg-brand hover:bg-brand/90";
