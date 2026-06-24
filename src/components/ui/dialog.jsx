"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const Dialog = ({ ...props }) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
);

const DialogTrigger = ({ ...props }) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

const DialogPortal = ({ ...props }) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

const DialogClose = ({ ...props }) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

/*
 * DialogOverlay
 *
 * Key decisions vs. shadcn default:
 * - bg-foreground/20 instead of bg-black/10 backdrop-blur:
 *   Design system explicitly states "scrim background uses foreground token
 *   at low opacity (not pure black)". backdrop-blur is a glassmorphism signal
 *   — also explicitly on the anti-reference list.
 * - /20 opacity: enough to create layering without feeling oppressive.
 */
const DialogOverlay = ({ className, ...props }) => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={cn(
      "fixed inset-0 isolate z-50 bg-foreground/20",
      "duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
      className,
    )}
    {...props}
  />
);

/*
 * DialogContent
 *
 * Key decisions vs. shadcn default:
 * - rounded-xl: design system specifies "Modal: radius-xl".
 * - bg-card instead of bg-popover: modals are card-level surfaces.
 * - p-6 instead of p-4: design system "generous padding" for modals.
 * - max-w-md (448px) instead of max-w-sm (384px): sm felt narrow for
 *   most dialog use cases; md gives content room to breathe.
 * - Entrance: fade + 8px upward translate — exactly as design system specifies:
 *   "appears with a soft fade + 8px upward translate".
 * - shadow-lg: soft elevation for genuinely floating element.
 * - ring-1 ring-border: hairline border per design system card style.
 */
const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      data-slot="dialog-content"
      className={cn(
        "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)]",
        "-translate-x-1/2 -translate-y-1/2 gap-4",
        "rounded-xl bg-card p-6 text-[13px] text-card-foreground",
        "shadow-lg ring-1 ring-border outline-none",
        "sm:max-w-md",
        // Entrance animation: fade + 8px upward translate
        "duration-250",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.98] data-open:slide-in-from-bottom-2",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close data-slot="dialog-close" asChild>
          <Button
            variant="ghost"
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            size="icon-sm"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }) => (
  <div
    data-slot="dialog-header"
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
);

/*
 * DialogFooter
 *
 * - Border-top hairline to visually separate action area from content.
 * - bg-muted/30 instead of bg-muted/50: lighter tint so the footer doesn't
 *   compete with the content above.
 * - -mx-6 -mb-6 to stretch edge-to-edge inside the p-6 content panel.
 */
const DialogFooter = ({
  className,
  showCloseButton = false,
  children,
  ...props
}) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      "-mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-xl border-t border-border bg-muted/30 px-6 py-4",
      "sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  >
    {children}
    {showCloseButton && (
      <DialogPrimitive.Close asChild>
        <Button variant="outline" size="default">
          Close
        </Button>
      </DialogPrimitive.Close>
    )}
  </div>
);

/*
 * DialogTitle — serif heading per design system.
 * H3 scale: 22–26px, tight tracking.
 */
const DialogTitle = ({ className, ...props }) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn(
      "font-heading text-[clamp(20px,2.5vw,24px)] leading-snug tracking-[-0.02em] text-foreground",
      className,
    )}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn(
      "text-[13px] leading-[1.6] text-muted-foreground",
      "*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
      className,
    )}
    {...props}
  />
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
