import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const TONE = {
  brand: {
    shell: "items-center rounded-lg border-blue-800 bg-zinc-950",
    icon: "text-blue-400",
    title: "text-slate-100",
  },
  destructive: {
    shell: "border-destructive/40 bg-destructive/10",
    icon: "text-destructive",
    title: "text-foreground",
  },
  pow: {
    shell: "border-pow/30 bg-pow/10",
    icon: "text-pow",
    title: "text-pow",
  },
  stake: {
    shell: "border-stake/30 bg-stake/10",
    icon: "text-stake",
    title: "text-stake",
  },
} as const;

export type CalloutTone = keyof typeof TONE;

type CalloutProps = {
  tone?: CalloutTone;
  icon?: LucideIcon;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Callout({
  tone = "brand",
  icon: Icon,
  title,
  children,
  className,
}: CalloutProps) {
  const styles = TONE[tone];
  const titleLabel =
    typeof title === "string" && !/[.:…!?]$/.test(title.trim())
      ? `${title}:`
      : title;

  return (
    <aside
      role="note"
      className={cn("callout flex w-full", styles.shell, className)}
    >
      {Icon ? (
        <Icon
          className={cn("mt-0.5 size-icon shrink-0", styles.icon)}
          aria-hidden
        />
      ) : null}
      <p className="min-w-0 text-foreground/90">
        {titleLabel ? (
          <span className={cn("font-semibold", styles.title)}>
            {titleLabel}{" "}
          </span>
        ) : null}
        {children}
      </p>
    </aside>
  );
}
