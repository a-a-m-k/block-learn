import { LightbulbIcon } from "lucide-react";
import type { ContentBlock } from "@/lib/chapter-content";
import { Callout } from "@/components/callout";
import { StepsPanel } from "@/components/chapter-steps";
import { ChapterDiagram } from "@/components/chapter-diagram";
import { isDiagramBlock } from "@/components/diagram-block";
import { richText } from "@/lib/rich-text";
import { cn } from "@/lib/utils";

type ChapterBlocksProps = {
  blocks: ContentBlock[];
};

export function ChapterBlocks({ blocks }: ChapterBlocksProps) {
  const grouped = blocks.some((block) => block.type === "section");

  return (
    <div
      className={cn(
        "section-y flex flex-col text-body text-muted-foreground",
        grouped
          ? "gap-8 sm:gap-10 md:gap-12 lg:gap-14"
          : "gap-5 sm:gap-6 md:gap-7 lg:gap-8",
      )}
    >
      {blocks.map((block, index) => (
        <ContentBlockView key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  if (isDiagramBlock(block)) {
    return <ChapterDiagram block={block} />;
  }

  switch (block.type) {
    case "section":
      return (
        <section className="flex flex-col gap-4 scroll-mt-24 sm:gap-5">
          {block.title ? (
            <h2 className="text-title font-semibold tracking-tight text-foreground">
              {richText(block.title)}
            </h2>
          ) : null}
          {block.blocks.map((child, index) => (
            <ContentBlockView key={`${child.type}-${index}`} block={child} />
          ))}
        </section>
      );
    case "paragraph":
      return <p>{richText(block.text)}</p>;
    case "list":
      return (
        <ul className="flex list-disc flex-col gap-1.5 pl-5 sm:gap-2 marker:text-brand-text">
          {block.items.map((item) => (
            <li key={item.label}>
              <span className="font-medium text-foreground">{item.label}</span>
              <span> — {richText(item.text)}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <Callout tone="brand" icon={LightbulbIcon} title={block.title}>
          {richText(block.text)}
        </Callout>
      );
    case "steps":
      return <StepsPanel block={block} />;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}
