"use client";

import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * Label
 *
 * Base label primitive. Intentionally neutral — consumers (FormField, etc.)
 * apply their own typographic treatment on top.
 *
 * Key decisions vs. shadcn default:
 * - text-[13px] instead of text-sm (14px): tighter to the form field text
 *   size so label + input read as a cohesive unit.
 * - font-sans explicit: prevents accidental font-heading inheritance in forms.
 * - Removed gap-2 from flex — spacing is controlled by the parent wrapper
 *   (FormField uses gap-1.5 between label and input).
 */
const Label = ({ className, ...props }) => (
  <LabelPrimitive.Root
    data-slot="label"
    className={cn(
      "flex items-center text-[13px] font-medium font-sans leading-none select-none",
      "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

export { Label };
