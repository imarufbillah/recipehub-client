"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * Switch
 *
 * Key decisions vs. shadcn default:
 * - Slightly larger default track: 36×20px (was ~32×18px). The previous size
 *   felt undersized next to h-9 inputs — a user's eye perceives the toggle as
 *   a different "weight" class than the surrounding form elements.
 * - Thumb is 16px (4px inset each side on a 20px track height) — clean
 *   circular proportions.
 * - Checked state uses primary token (burnt sienna) — reinforces the brand's
 *   single warm accent for active/selected states.
 * - Unchecked background is input token (muted border color) — consistent
 *   with inactive input borders; reads as "off" without needing a separate
 *   color.
 * - Removed after: negative inset pseudo-element (used for hit-area expansion)
 *   in favor of a proper min touch target via padding to avoid layout bleed.
 * - sm size: 28×16px — for dense dashboard row usage.
 */
const Switch = ({ className, size = "default", ...props }) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    data-size={size}
    className={cn(
      "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
      "border-2 border-transparent transition-colors outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-checked:bg-primary data-unchecked:bg-input",
      "dark:data-unchecked:bg-input/60",
      // Default size: 36×20px track
      "data-[size=default]:h-5 data-[size=default]:w-9",
      // sm size: 28×16px track
      "data-[size=sm]:h-4 data-[size=sm]:w-7",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform",
        // Default thumb: 16px, translates 16px (track 36 - thumb 16 - 2×border 4 = 16)
        "group-data-[size=default]/switch:size-4",
        "group-data-[size=default]/switch:data-unchecked:translate-x-0",
        "group-data-[size=default]/switch:data-checked:translate-x-4",
        // sm thumb: 12px, translates 12px
        "group-data-[size=sm]/switch:size-3",
        "group-data-[size=sm]/switch:data-unchecked:translate-x-0",
        "group-data-[size=sm]/switch:data-checked:translate-x-3",
        "dark:data-checked:bg-primary-foreground",
      )}
    />
  </SwitchPrimitive.Root>
);

export { Switch };
