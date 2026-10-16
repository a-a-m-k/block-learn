import { SparklesIcon, TerminalIcon } from "lucide-react";
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
    case "section": {
      const heading = block.title ? (
        <h2 className="text-title font-semibold tracking-tight text-foreground">
          {richText(block.title)}
        </h2>
      ) : null;
      const body = block.blocks.map((child, index) => (
        <ContentBlockView key={`${child.type}-${index}`} block={child} />
      ));

      return (
        <section className="flex flex-col gap-4 scroll-mt-24 border-t border-border pt-8 sm:gap-5">
          {block.eyebrow ? (
            <p className="caption font-medium tracking-[0.16em] text-brand-text uppercase">
              {block.eyebrow}
            </p>
          ) : null}
          {block.aside ? (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
                {heading}
                {body}
              </div>
              <aside className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-brand-text">
                  <TerminalIcon className="size-icon" aria-hidden />
                </span>
                <p className="min-w-0 text-chrome leading-snug">
                  <span className="block font-medium text-foreground">
                    {block.aside.title}
                  </span>
                  <span className="mt-1 block caption text-muted-foreground">
                    {block.aside.text}
                  </span>
                </p>
              </aside>
            </div>
          ) : (
            <>
              {heading}
              {body}
            </>
          )}
        </section>
      );
    }
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
        <Callout tone="brand" icon={SparklesIcon} title={block.title}>
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
