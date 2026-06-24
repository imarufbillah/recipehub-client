import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/* Badge variants */
const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-0.5 text-[11px] font-medium font-sans uppercase tracking-[0.08em] whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        /*
         * default — primary fill: for status badges that need strong emphasis.
         * Use sparingly per color discipline rule.
         */
        default: "bg-primary text-primary-foreground border-transparent",
        /*
         * secondary — warm neutral: general-purpose category/cuisine/tag badges.
         * Lowest visual weight after outline; safe to use frequently.
         */
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        /*
         * accent — deep olive: ONLY for "Premium" / "Featured" / success states.
         * Design system: "Premium or Featured badges may use accent token
         * sparingly — these are the accent's primary job in the whole system."
         * bg-accent/10 + text-accent + border-accent/20 keeps it restrained
         * rather than a full accent fill which would be too heavy.
         */
        accent: "bg-accent/10 text-accent border-accent/20",
        /*
         * destructive — report/flagged/error labels.
         */
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20 focus-visible:ring-destructive/20 dark:bg-destructive/20",
        /*
         * outline — lowest weight; for plain category or taxonomy tags.
         */
        outline: "border-border bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

const Badge = ({
  className,
  variant = "secondary",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};

export { Badge, badgeVariants };
