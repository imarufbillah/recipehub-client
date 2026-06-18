"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Theme toggle with a brief crossfade between sun and moon icons.
 * Mounts only after hydration to prevent flash-of-wrong-theme.
 */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Render an invisible placeholder during SSR / pre-hydration
  // so the navbar layout doesn't shift on mount
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="opacity-0 pointer-events-none"
      >
        <Sun />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="relative overflow-hidden text-muted-foreground hover:text-foreground"
    >
      {/* Sun — visible in light mode, fades out in dark */}
      <span
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isDark ? 0 : 1 }}
        aria-hidden={isDark}
      >
        <Sun className="size-4.5" />
      </span>

      {/* Moon — visible in dark mode, fades out in light */}
      <span
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isDark ? 1 : 0 }}
        aria-hidden={!isDark}
      >
        <Moon className="size-4.5" />
      </span>

      {/* Invisible spacer keeps button width stable */}
      <span className="invisible">
        <Sun className="size-4.5" />
      </span>
    </Button>
  );
};

export default ThemeToggle;
