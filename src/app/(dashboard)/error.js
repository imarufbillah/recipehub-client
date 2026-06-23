"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardError = ({ error, unstable_retry }) => {
  useEffect(() => {
    console.error("[DashboardError]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-16 text-center">
      <AlertCircle
        className="size-8 text-muted-foreground/40 stroke-[1.25] mb-5"
        aria-hidden
      />

      <h2 className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-foreground mb-2">
        Something went wrong
      </h2>

      <p className="text-[14px] font-sans text-muted-foreground max-w-sm leading-relaxed mb-6">
        This page failed to load. The issue is likely temporary — try again or
        return to the overview.
      </p>

      {error?.digest && (
        <p className="font-mono text-[11px] text-muted-foreground/50 mb-6">
          ref: {error.digest}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button
          variant="default"
          size="sm"
          onClick={unstable_retry}
          className="font-sans text-[13px] font-medium"
        >
          Try again
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="font-sans text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
        >
          <Link href="/dashboard">Back to overview</Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardError;
