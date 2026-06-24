import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  /*
   * Base — font-sans enforced so buttons never accidentally inherit font-heading.
   * rounded-md per design system: "radius-md for interactive containers like buttons".
   * Slightly negative tracking on default text keeps it crisp.
   * No scale-on-hover per design system ("never scale-on-hover").
   */
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding font-sans font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /*
         * Primary — burnt sienna fill, primary-foreground text.
         * Hover: slight background darken via border-emphasis, no glow, no scale.
         * Design system: "solid primary fill … subtle background-darken or
         * border-emphasis on hover, never scale-on-hover".
         */
        default:
          "bg-primary text-primary-foreground hover:bg-primary/85 active:bg-primary/75",
        /*
         * Outline — transparent bg, border token outline, foreground text.
         * Design system: "Secondary Button: transparent/secondary fill, border token".
         */
        outline:
          "border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted dark:border-input dark:bg-input/20 dark:hover:bg-input/40",
        /*
         * Secondary — warm neutral surface fill.
         * Design system: "secondary buttons, subtle section backgrounds".
         */
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 aria-expanded:bg-secondary",
        /*
         * Ghost — no fill, no border; foreground-to-primary color shift on hover.
         * Design system: "Ghost/Text Button: underline or foreground-to-primary
         * color shift on hover only".
         */
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted dark:hover:bg-muted/40",
        /*
         * Destructive — reserved for delete/report/error actions only.
         */
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        /*
         * default: h-9 (36px) — comfortable touch target, not oversized.
         * lg: h-10 (40px) — primary CTAs, form submits, card actions.
         * sm: h-8 (32px) — inline utility buttons, table row actions.
         * xs: h-6 (24px) — micro actions (remove tag, icon-only tight spaces).
         *
         * Horizontal padding scales proportionally.
         * Text sizes: lg gets 14px, default/sm get 13px, xs gets 12px.
         */
        default: "h-9 gap-1.5 px-3.5 text-[13px] tracking-[-0.01em]",
        lg: "h-10 gap-2 px-5 text-[14px] tracking-[-0.01em]",
        sm: "h-8 gap-1.5 px-3 text-[13px] rounded-[calc(var(--radius-md)*0.9)]",
        xs: "h-6 gap-1 px-2 text-xs rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
        /*
         * Icon sizes — square, same height scale as text buttons.
         */
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[calc(var(--radius-md)*0.9)] [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
