import type { CSSProperties } from "react";
import {
  NetworkIcon,
  ShieldCheckIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";

import { FlowArrow } from "@/components/flow-arrow";
import type { ContentBlock } from "@/lib/chapter-content";
import { richText } from "@/lib/rich-text";
import { cn } from "@/lib/utils";

const STEP_ICONS: Record<
  Extract<ContentBlock, { type: "steps" }>["items"][number]["icon"],
  LucideIcon
> = {
  "shield-check": ShieldCheckIcon,
  user: UserIcon,
  network: NetworkIcon,
};

export function StepsPanel({
  block,
}: {
  block: Extract<ContentBlock, { type: "steps" }>;
}) {
  return (
    <section
      className={cn(
        "diagram-shell relative border border-brand/50 px-4 pb-5 pt-6 sm:px-5 sm:pb-6 sm:pt-7",
      )}
    >
      <h3 className="absolute -top-3 left-4 bg-panel px-2 text-body font-semibold text-brand-text sm:left-5">
        {block.title}
      </h3>
      <ol
        className="flex flex-col gap-2 xl:grid xl:items-stretch xl:gap-x-3 xl:[grid-template-columns:var(--steps-cols)]"
        style={
          {
            "--steps-cols": block.items
              .map((_, index) =>
                index === block.items.length - 1 ? "minmax(0,1fr)" : "minmax(0,1fr) auto",
              )
              .join(" "),
          } as CSSProperties
        }
      >
        {block.items.map((item, index) => {
          const Icon = STEP_ICONS[item.icon];
          const isLast = index === block.items.length - 1;

          return (
            <li
              key={item.title}
              className={cn(
                "flex min-w-0 flex-col items-center gap-2",
                !isLast &&
                  "xl:col-span-2 xl:grid xl:grid-cols-subgrid xl:items-stretch xl:gap-x-3",
              )}
            >
              <div className="flex w-full max-w-64 flex-col items-center gap-3 text-center xl:h-full xl:justify-self-center">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-body font-semibold text-brand-foreground sm:size-9">
                    {index + 1}
                  </span>
                  <Icon
                    className="size-8 shrink-0 text-muted-foreground sm:size-9"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 w-full">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="caption mt-1 text-muted-foreground">
                    {richText(item.text)}
                  </p>
                </div>
              </div>
              {!isLast ? (
                <div
                  className="flex w-full shrink-0 items-center justify-center py-1 xl:h-full xl:w-auto xl:py-0"
                  aria-hidden
                >
                  <FlowArrow
                    at="xl"
                    className="text-muted-foreground"
                    downClassName="size-5 lg:size-7"
                    rightClassName="size-5 lg:size-7"
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
