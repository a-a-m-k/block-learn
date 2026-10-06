import { ArrowRightIcon, FileTextIcon } from "lucide-react";

import { WireCube } from "@/components/hash-chain/visuals";
import { cn } from "@/lib/utils";

import { CARD_HEADING, PANEL } from "./constants";

type WhyItMattersPanelProps = {
  title: string;
  text: string;
};

export function WhyItMattersPanel({ title, text }: WhyItMattersPanelProps) {
  return (
    <div
      data-part="why"
      className={cn(PANEL, "flex flex-col justify-between gap-4")}
    >
      <div className="flex flex-col gap-4">
        <h3 className={CARD_HEADING}>{title}</h3>
        <p className="text-body text-muted-foreground">{text}</p>
      </div>
      <div
        data-part="why-visual"
        aria-hidden
        className="flex items-center justify-center gap-2 text-muted-foreground"
      >
        <FileTextIcon strokeWidth={1} className="size-mark" />
        <ArrowRightIcon strokeWidth={1} className="size-icon-lg" />
        <WireCube accent className="size-mark" />
      </div>
    </div>
  );
}
