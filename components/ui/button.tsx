"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  buttonVariants,
  type ButtonVariantProps,
} from "@/components/ui/button-variants";

type ButtonProps = ButtonPrimitive.Props &
  ButtonVariantProps & {
    icon?: LucideIcon;
    iconClassName?: string;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  icon: Icon,
  iconClassName,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {Icon ? (
        <Icon data-icon="inline-start" className={iconClassName} />
      ) : null}
      {children}
    </ButtonPrimitive>
  );
}

export { Button };
