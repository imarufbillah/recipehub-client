"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

/*
 * Toaster
 *
 * Tuned to RecipeHub design system:
 * - Uses card/popover tokens for background — consistent with modal surfaces.
 * - border-radius from --radius-md token — matches button/input radius level.
 * - No glassmorphism, no colored fills for normal toasts.
 * - richColors (passed from layout) handles success/error color variants via
 *   sonner's own semantic palette — we don't override those with brand colors
 *   since destructive states need immediate legibility.
 * - gap-2 between icon and text via --toast-gap for a tighter, editorial feel.
 */
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "var(--card)",
        "--normal-text": "var(--card-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius-md)",
        "--toast-shadow":
          "0 4px 16px color-mix(in oklch, var(--foreground) 8%, transparent)",
      }}
      toastOptions={{
        classNames: {
          toast: "font-sans text-[13px]",
          title: "font-medium",
          description: "text-muted-foreground text-[12px]",
          actionButton: "font-medium text-[12px]",
          cancelButton: "font-medium text-[12px] text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
