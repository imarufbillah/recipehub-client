"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

const Select = ({ ...props }) => (
  <SelectPrimitive.Root data-slot="select" {...props} />
);

const SelectGroup = ({ className, ...props }) => (
  <SelectPrimitive.Group
    data-slot="select-group"
    className={cn("scroll-my-1 p-1", className)}
    {...props}
  />
);

const SelectValue = ({ ...props }) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
);

/*
 * SelectTrigger
 *
 * Key decisions vs. shadcn default:
 * - h-9 (36px) default, h-8 (32px) sm: matches Input height so form rows align.
 * - rounded-md (was rounded-lg): design system spec for interactive containers.
 * - text-[13px]: matches Input/Textarea.
 * - px-3: matches Input padding.
 * - focus-visible:ring-2: lighter, consistent with Input.
 * - hover:bg-muted/40: subtle interactive affordance without over-coloring.
 */
const SelectTrigger = ({ className, size = "default", children, ...props }) => (
  <SelectPrimitive.Trigger
    data-slot="select-trigger"
    data-size={size}
    className={cn(
      "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent",
      "px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors outline-none select-none",
      "hover:bg-muted/40",
      "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
      "data-placeholder:text-muted-foreground/60",
      "data-[size=default]:h-9 data-[size=sm]:h-8",
      "dark:bg-input/20 dark:hover:bg-input/30",
      "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="pointer-events-none size-3.5 text-muted-foreground shrink-0" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

/*
 * SelectContent
 *
 * - rounded-lg for the floating panel: design system allows larger radius on
 *   floating/popover surfaces.
 * - ring-1 ring-border instead of ring-foreground/10: more token-pure.
 * - shadow-md: soft elevation per design system "low-opacity and soft".
 * - min-w-40 slightly wider default to avoid cramped option text.
 */
const SelectContent = ({
  className,
  children,
  position = "popper",
  align = "start",
  ...props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      className={cn(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-40",
        "origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
        "rounded-lg bg-popover text-popover-foreground",
        "shadow-md ring-1 ring-border",
        "duration-100",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      align={align}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        data-position={position}
        className={cn(
          "p-1",
          position === "popper" &&
            "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

const SelectLabel = ({ className, ...props }) => (
  <SelectPrimitive.Label
    data-slot="select-label"
    className={cn(
      "px-2 py-1 text-[11px] uppercase tracking-[0.07em] font-medium text-muted-foreground font-sans",
      className,
    )}
    {...props}
  />
);

/*
 * SelectItem
 *
 * Key decisions vs. shadcn default:
 * - hover uses bg-muted (neutral) NOT bg-accent/text-accent-foreground.
 *   The accent token is deep olive — reserved for premium/featured badges and
 *   success states. Using it on every hovered dropdown item is overuse.
 * - text-[13px]: consistent with trigger and Input.
 * - rounded-md instead of rounded-md (was rounded-md — kept).
 * - h-8 min-height for comfortable tap target.
 * - Check indicator uses primary token, not accent.
 */
const SelectItem = ({ className, children, ...props }) => (
  <SelectPrimitive.Item
    data-slot="select-item"
    className={cn(
      "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-md",
      "py-1.5 pr-8 pl-2.5 text-[13px] text-foreground outline-hidden select-none",
      "focus:bg-muted focus:text-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    {/* Check indicator — right-aligned */}
    <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-3.5 text-primary pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

const SelectSeparator = ({ className, ...props }) => (
  <SelectPrimitive.Separator
    data-slot="select-separator"
    className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
);

const SelectScrollUpButton = ({ className, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    data-slot="select-scroll-up-button"
    className={cn(
      "z-10 flex cursor-default items-center justify-center bg-popover py-1",
      "[&_svg:not([class*='size-'])]:size-3.5",
      className,
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton = ({ className, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    data-slot="select-scroll-down-button"
    className={cn(
      "z-10 flex cursor-default items-center justify-center bg-popover py-1",
      "[&_svg:not([class*='size-'])]:size-3.5",
      className,
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
);

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
