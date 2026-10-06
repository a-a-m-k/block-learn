import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center border font-normal leading-normal [&_svg]:shrink-0",
  {
    variants: {
      shape: {
        pill: "gap-1.5 rounded-full px-3 py-1 text-xs [&_svg]:size-3.5",
        rounded: "gap-2 rounded-lg px-4 py-2 text-base [&_svg]:size-4",
      },
      variant: {
        default: "border-border bg-muted text-foreground [&_svg]:text-brand-text",
        subtle:
          "border-border/60 bg-muted/50 text-muted-foreground [&_svg]:text-muted-foreground",
        accent: "border-transparent bg-brand/15 text-brand-text [&_svg]:text-brand-text",
        ghost:
          "border-transparent bg-transparent text-muted-foreground [&_svg]:text-muted-foreground",
      },
    },
    defaultVariants: {
      shape: "rounded",
      variant: "default",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    icon?: LucideIcon;
    iconClassName?: string;
  };

export function Badge({
  className,
  shape = "rounded",
  variant = "default",
  icon: Icon,
  iconClassName,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ shape, variant, className }))}
      {...props}
    >
      {Icon ? (
        <Icon
          data-icon="inline-start"
          className={iconClassName}
          aria-hidden
        />
      ) : null}
      {children}
    </span>
  );
}
