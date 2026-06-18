"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Filter bar — sticky horizontal row with category pill chips (left)
 * and a search input (right).
 *
 * Design system spec:
 *  - Chips: secondary bg at rest, primary fill + primary-foreground text when active.
 *  - Single-select: selecting a chip deselects the previous one. "All" chip = no filter.
 *  - Mobile: chips horizontally scrollable (no wrap), fade edges at scroll boundaries.
 *  - Mobile search: icon-only button that expands to full input on tap.
 *  - Sticky below the page header — bg-background with a hairline bottom border.
 *
 * Props:
 *  categories       — array of { id, label } objects
 *  activeCategory   — currently selected category id (or null for "All")
 *  searchQuery      — current search string
 *  onCategoryChange — (id | null) => void
 *  onSearchChange   — (query: string) => void
 */
const CategoryFilterBar = ({
  categories,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}) => {
  const scrollRef = useRef(null);
  const searchInputRef = useRef(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Track scroll position to show/hide fade edges
  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 8);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFades();
    el.addEventListener("scroll", updateFades, { passive: true });
    const ro = new ResizeObserver(updateFades);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFades);
      ro.disconnect();
    };
  }, [updateFades]);

  // Expand search on mobile: focus the input after state update
  const handleSearchToggle = () => {
    setSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleSearchCollapse = () => {
    if (!searchQuery) {
      setSearchExpanded(false);
    }
  };

  const handleClearSearch = () => {
    onSearchChange("");
    setSearchExpanded(false);
  };

  const allCategories = [{ id: null, label: "All" }, ...categories];

  return (
    <div className="sticky top-16 z-30 bg-background border-b border-border">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-4 py-3">
          {/* ── Chip row — horizontally scrollable on mobile ── */}
          <div className="relative flex-1 min-w-0">
            {/* Left fade edge */}
            {showLeftFade && (
              <div
                className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, var(--background), transparent)",
                }}
                aria-hidden
              />
            )}

            {/* Right fade edge */}
            {showRightFade && (
              <div
                className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, var(--background), transparent)",
                }}
                aria-hidden
              />
            )}

            <div
              ref={scrollRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              role="group"
              aria-label="Filter by category"
            >
              {allCategories.map(({ id, label }) => {
                const isActive = activeCategory === id;
                return (
                  <button
                    key={id ?? "all"}
                    type="button"
                    onClick={() => onCategoryChange(id)}
                    className={cn(
                      // Base: pill shape, micro-label type, no scale on hover per design system
                      "shrink-0 inline-flex items-center px-3.5 py-1.5 rounded-full",
                      "text-[11px] uppercase tracking-[0.08em] font-medium font-sans",
                      "transition-colors duration-200 whitespace-nowrap",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                    aria-pressed={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Search — desktop: always visible input; mobile: icon → expand ── */}

          {/* Desktop search (md+) */}
          <div className="hidden md:flex items-center relative shrink-0">
            <Search
              className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search recipes…"
              aria-label="Search recipes"
              className={cn(
                "h-8 pl-8 pr-3 w-48 lg:w-56",
                "bg-background border border-input rounded-md",
                "text-[13px] font-sans text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
                "transition-all duration-200",
              )}
            />
          </div>

          {/* Mobile search — icon-only → expands on tap */}
          <div className="flex md:hidden items-center shrink-0">
            {searchExpanded ? (
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
                    aria-hidden
                  />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onBlur={handleSearchCollapse}
                    placeholder="Search…"
                    aria-label="Search recipes"
                    className={cn(
                      "h-8 pl-8 pr-2 w-36",
                      "bg-background border border-input rounded-md",
                      "text-[13px] font-sans text-foreground placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
                      "transition-all duration-200",
                    )}
                  />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSearchToggle}
                className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Open search"
              >
                <Search className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar;
