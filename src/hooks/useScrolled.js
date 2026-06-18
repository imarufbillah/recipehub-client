"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Uses a passive scroll listener for performance.
 */
const useScrolled = (threshold = 80) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Set initial state (handles page reload mid-scroll)
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};

export default useScrolled;
