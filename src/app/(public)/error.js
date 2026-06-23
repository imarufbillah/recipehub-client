"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PublicError = ({ error, unstable_retry }) => {
  useEffect(() => {
    console.error("[PublicError]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 pb-20 text-center">
      {/* Display numeral — same treatment as the 404 page */}
      <p
        className="font-heading leading-none tracking-[-0.04em] text-muted-foreground/30 select-none"
        style={{ fontSize: "clamp(72px, 16vw, 120px)" }}
        aria-hidden
      >
        500
      </p>

      <div className="mt-6 flex flex-col gap-3 max-w-sm">
        <h1 className="font-heading text-[clamp(22px,3vw,30px)] leading-tight tracking-[-0.02em] text-foreground">
          Something went wrong.
        </h1>
        <p className="text-[15px] font-sans text-muted-foreground leading-relaxed">
          This page ran into an unexpected error. It&apos;s usually temporary —
          try refreshing or go back to browse recipes.
        </p>
      </div>

      {error?.digest && (
        <p className="mt-3 font-mono text-[11px] text-muted-foreground/40">
          ref: {error.digest}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        <Button
          variant="default"
          onClick={unstable_retry}
          className="px-7 h-10 font-sans text-[14px] font-medium"
        >
          Try again
        </Button>
        <Button
          variant="ghost"
          asChild
          className="h-10 font-sans text-[14px] text-muted-foreground hover:text-foreground hover:bg-transparent"
        >
          <Link href="/recipes">Browse recipes</Link>
        </Button>
      </div>
    </div>
  );
};

export default PublicError;
