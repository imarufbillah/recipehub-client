"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ImageWithSkeleton — drop-in replacement for `next/image` with a
 * pulsing skeleton shown while the external image is loading.
 *
 * The skeleton fades out the moment the image fires its `onLoad` event,
 * and the image fades in simultaneously — no layout shift.
 *
 * Accepts all standard next/image props; `fill` layout assumed (wrapping
 * container must be `position: relative` with explicit dimensions).
 */
const ImageWithSkeleton = ({ className, onLoad, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  return (
    <>
      {/* Skeleton — sits behind the image, fades out on load */}
      <span
        className={cn(
          "absolute inset-0 bg-muted animate-pulse transition-opacity duration-300",
          loaded ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
        aria-hidden
      />

      {/* Image — fades in on load */}
      <Image
        {...props}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={handleLoad}
      />
    </>
  );
};

export default ImageWithSkeleton;
