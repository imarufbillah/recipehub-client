import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Textarea
 *
 * Key decisions vs. shadcn default:
 * - rounded-md (was rounded-lg): matches input and design system spec.
 * - min-h-[80px] (was min-h-16 / 64px): 64px feels too short — at rows={3}
 *   the text immediately clips. 80px gives comfortable 3-line breathing room.
 * - text-[13px]: consistent with Input — form text shouldn't jump to full base.
 * - px-3 py-2.5: matches Input horizontal padding, slightly more vertical
 *   padding than Input since textarea has no fixed height to center against.
 * - focus-visible:ring-2: same lighter ring as Input for consistency.
 * - leading-[1.6]: matches body-default line-height from design system.
 */
const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2.5",
        "text-[13px] leading-[1.6] text-foreground transition-colors outline-none",
        "placeholder:text-muted-foreground/60",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:bg-muted/40 disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "dark:bg-input/20 dark:disabled:bg-input/60",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        // field-sizing-content when supported — allows textarea to grow with content
        "field-sizing-content",
        className,
      )}
      {...props}
    />
  );
};

export { Textarea };
