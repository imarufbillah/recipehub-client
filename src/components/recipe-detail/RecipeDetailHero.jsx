"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const RecipeDetailHero = ({ image, alt, priority = true }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* ── Desktop: absolute left panel that bleeds full section height ── */}
      <div className="hidden lg:block relative w-full h-full min-h-150 overflow-hidden">
        {/* Skeleton shown until image paints */}
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse transition-opacity duration-300",
            loaded ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          aria-hidden
        />

        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          quality={100}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn(
            "object-cover object-center transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setLoaded(true)}
        />

        {/* Subtle right-edge gradient — blends image into page background */}
        <div
          className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--background), transparent)",
          }}
          aria-hidden
        />
      </div>

      {/* ── Mobile: full-width stacked image, 3:2 aspect, sharp corners ── */}
      <div className="lg:hidden w-full aspect-3/2 relative overflow-hidden">
        {/* Skeleton shown until image paints */}
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse transition-opacity duration-300",
            loaded ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          aria-hidden
        />

        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </>
  );
};

export default RecipeDetailHero;
