import { cva, type VariantProps } from "class-variance-authority";

const mutedInteract =
  "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50";

const iconPad = {
  md: "has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
  sm: "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
} as const;

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-chrome font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon)",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: `border-border bg-background ${mutedInteract} dark:border-input dark:bg-input/30 dark:hover:bg-input/50`,
        softOutline: `border-2 border-border ${mutedInteract}`,
        ghost: mutedInteract,
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "rounded-full bg-brand text-brand-foreground hover:bg-brand/90",
      },
      size: {
        default: `h-(--size-control) gap-(--spacing-control-gap) px-(--spacing-control-px) ${iconPad.md}`,
        xs: `h-(--size-control-sm) gap-1 rounded-md px-2 text-chrome-meta in-data-[slot=button-group]:rounded-lg ${iconPad.sm} [&_svg:not([class*='size-'])]:size-(--size-icon-sm)`,
        sm: `h-(--size-control-sm) gap-(--spacing-control-gap) rounded-md px-(--spacing-control-px) text-chrome-meta in-data-[slot=button-group]:rounded-lg ${iconPad.sm} [&_svg:not([class*='size-'])]:size-(--size-icon-sm)`,
        lg: `h-(--size-control-lg) gap-(--spacing-control-gap) px-(--spacing-control-px) ${iconPad.md} [&_svg:not([class*='size-'])]:size-(--size-icon-lg)`,
        cta: `h-(--size-control-cta) gap-2 px-6 text-body has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 [&_svg:not([class*='size-'])]:size-(--size-icon-lg)`,
        icon: "size-(--size-control) [&_svg:not([class*='size-'])]:size-(--size-icon)",
        "icon-xs":
          "size-(--size-control-sm) rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        "icon-sm":
          "size-(--size-control-sm) rounded-md in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        "icon-lg":
          "size-(--size-control-lg) [&_svg:not([class*='size-'])]:size-(--size-icon-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
