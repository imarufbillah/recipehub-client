import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Input
 *
 * Key decisions vs. shadcn default:
 * - h-9 (36px) instead of h-8 (32px): matches button default height for
 *   consistent form row alignment; 32px felt compressed in dense forms.
 * - rounded-md instead of rounded-lg: design system specifies radius-md for
 *   "inputs, buttons, interactive containers".
 * - text-[13px]/text-sm: 13px base keeps the field text in sync with the
 *   surrounding UI label/body hierarchy rather than jumping to base text-base.
 * - focus-visible:ring-2 (not ring-3): subtler focus ring; ring-3 at 12px is
 *   heavy and reads as an error state at a glance.
 * - px-3 instead of px-2.5: slightly more breathing room inside the field.
 * - bg-transparent on light, dark:bg-input/20: fields sit on card or
 *   background surfaces — transparent is cleanest.
 */
const Input = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1.5",
        "text-[13px] text-foreground transition-colors outline-none",
        "placeholder:text-muted-foreground/60",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-[13px] file:font-medium file:text-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/40 disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "dark:bg-input/20 dark:disabled:bg-input/60",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
};

export { Input };
