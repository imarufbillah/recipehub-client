"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * RadioGroup
 *
 * Root container — gap-3 instead of gap-2 to give option rows
 * slightly more vertical breathing room.
 */
const RadioGroup = ({ className, ...props }) => (
  <RadioGroupPrimitive.Root
    data-slot="radio-group"
    className={cn("grid w-full gap-3", className)}
    {...props}
  />
);

/*
 * RadioGroupItem
 *
 * Key decisions vs. shadcn default:
 * - size-[18px] (was size-4 / 16px): 18px sits more comfortably next to
 *   14–15px body text — the 16px dot looked slightly undersized in label rows.
 * - Unchecked border: border-input (matches Input/Select border token) rather
 *   than a generic border-input that can look disconnected from form context.
 * - Checked state: border-primary + bg-primary — burnt sienna fill on the
 *   track, white dot inside. Consistent with Switch checked state.
 * - Focus ring: ring-2 ring-ring/40, ring-offset-1 — lighter than default
 *   ring-3, consistent with Input/Select focus treatment.
 * - Removed the after: negative-inset pseudo hit-area expansion — it bleeds
 *   into adjacent layout. Hit area is handled by the wrapping Label instead.
 * - The indicator dot is sized at ~40% of the item (7px in an 18px circle).
 */
const RadioGroupItem = ({ className, ...props }) => (
  <RadioGroupPrimitive.Item
    data-slot="radio-group-item"
    className={cn(
      "group/radio-group-item peer relative flex aspect-square size-4.5 shrink-0 rounded-full",
      "border border-input bg-transparent outline-none transition-colors",
      "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
      "data-checked:border-primary data-checked:bg-primary",
      "dark:bg-input/20 dark:data-checked:bg-primary",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className="flex size-full items-center justify-center"
    >
      {/* White indicator dot — ~40% of container */}
      <span className="block size-1.75 rounded-full bg-primary-foreground" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
);

export { RadioGroup, RadioGroupItem };
