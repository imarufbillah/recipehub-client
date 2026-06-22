"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Search, X, ChevronDown, SlidersHorizontal, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DIFFICULTIES, SORT_OPTIONS } from "@/app/(public)/recipes/page";
import useDebounce from "@/hooks/useDebounce";

const PREP_TIME_OPTIONS = [
  { label: "Any time", value: "" },
  { label: "≤ 15 min", value: "15" },
  { label: "≤ 30 min", value: "30" },
  { label: "≤ 45 min", value: "45" },
  { label: "≤ 60 min", value: "60" },
];

// Reusable horizontal chip group
const ChipGroup = ({
  options,
  activeValue,
  onSelect,
  accentActive = false,
}) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 8);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
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

  return (
    <div className="relative flex-1 min-w-0">
      {showLeft && (
        <div
          className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--background), transparent)",
          }}
          aria-hidden
        />
      )}
      {showRight && (
        <div
          className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--background), transparent)",
          }}
          aria-hidden
        />
      )}
      <div
        ref={scrollRef}
        className="flex items-center gap-1.5 overflow-x-auto scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {options.map(({ id, label }) => {
          const isActive = activeValue === id;
          return (
            <button
              key={id ?? "all"}
              type="button"
              onClick={() =>
                onSelect(isActive ? (id === null ? null : "") : id)
              }
              className={cn(
                "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full",
                "text-[11px] uppercase tracking-[0.08em] font-medium font-sans",
                "transition-colors duration-200 whitespace-nowrap",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? accentActive
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground"
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
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const AdvancedFilterBar = ({
  categories,
  cuisines = [],
  params,
  onFilterChange,
  onClearAll,
  hasFilters,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Local search state — decoupled from URL params so keystrokes feel instant.
  // The debounced value is what actually triggers onFilterChange → URL update → API call.
  const [searchValue, setSearchValue] = useState(params.q ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);

  // Sync debounced value → URL (fires API call)
  useEffect(() => {
    // Only fire if the debounced value actually differs from the current URL param
    if (debouncedSearch !== (params.q ?? "")) {
      onFilterChange("q", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Keep local state in sync when params.q changes externally (e.g. "Clear all")
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchValue(params.q ?? "");
  }, [params.q]);

  // Count active advanced filters for the badge
  const advancedFilterCount = [
    params.cuisine,
    params.difficulty,
    params.maxPrepTime,
    params.isPremium,
  ].filter(Boolean).length;

  const allCategories = [{ id: null, label: "All" }, ...categories];

  // Cuisines come from the API — prepend an "All" option
  const cuisineOptions = [{ id: "", label: "All" }, ...cuisines];
  const difficultyOptions = [
    { id: "", label: "Any" },
    ...DIFFICULTIES.map((d) => ({ id: d, label: d })),
  ];

  const handleSearchToggle = () => {
    setSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };
  const handleSearchCollapse = () => {
    if (!params.q) setSearchExpanded(false);
  };

  return (
    <div className="sticky top-16 z-30 bg-background border-b border-border">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16">
        {/* ── Row 1: category chips + search + filters button + sort ── */}
        <div className="flex items-center gap-3 py-3">
          {/* Category chips */}
          <ChipGroup
            options={allCategories}
            activeValue={params.category ? params.category.toLowerCase() : null}
            onSelect={(val) =>
              onFilterChange("category", val === null ? "" : val)
            }
          />

          {/* Desktop search */}
          <div className="hidden md:flex items-center relative shrink-0">
            <Search
              className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search recipes…"
              aria-label="Search recipes"
              className={cn(
                "h-8 pl-8 pr-3 w-44 lg:w-52",
                "bg-background border border-input rounded-md",
                "text-[13px] font-sans text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200",
              )}
            />
          </div>

          {/* Mobile search */}
          <div className="flex md:hidden items-center shrink-0">
            {searchExpanded ? (
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
                    aria-hidden
                  />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onBlur={handleSearchCollapse}
                    placeholder="Search…"
                    aria-label="Search recipes"
                    className={cn(
                      "h-8 pl-8 pr-2 w-32",
                      "bg-background border border-input rounded-md",
                      "text-[13px] font-sans placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring",
                    )}
                  />
                </div>
                {searchValue && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchValue("");
                      setSearchExpanded(false);
                    }}
                    className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
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
                className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Open search"
              >
                <Search className="size-4" />
              </button>
            )}
          </div>

          {/* Filters toggle button */}
          <button
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            aria-expanded={drawerOpen}
            className={cn(
              "shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-md border",
              "text-[11px] uppercase tracking-[0.08em] font-medium font-sans",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              drawerOpen || advancedFilterCount > 0
                ? "border-foreground/30 bg-secondary text-foreground"
                : "border-input text-muted-foreground hover:text-foreground hover:border-foreground/20",
            )}
          >
            <SlidersHorizontal className="size-3.5" aria-hidden />
            <span>Filters</span>
            {advancedFilterCount > 0 && (
              <span className="inline-flex items-center justify-center size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold leading-none">
                {advancedFilterCount}
              </span>
            )}
          </button>

          {/* Sort select */}
          <div className="relative shrink-0 hidden sm:block">
            <select
              value={params.sort ?? "newest"}
              onChange={(e) => onFilterChange("sort", e.target.value)}
              aria-label="Sort recipes"
              className={cn(
                "h-8 pl-3 pr-7 rounded-md border border-input appearance-none",
                "bg-background text-[11px] uppercase tracking-[0.08em] font-medium font-sans text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                "transition-colors duration-200 hover:border-foreground/20",
              )}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground pointer-events-none"
              aria-hidden
            />
          </div>

          {/* Clear all — only when filters are active */}
          {hasFilters && (
            <button
              type="button"
              onClick={onClearAll}
              className="shrink-0 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] font-medium font-sans text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              aria-label="Clear all filters"
            >
              <X className="size-3" aria-hidden />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>

        {/* ── Row 2: advanced filter drawer ── */}
        {drawerOpen && (
          <div className="flex flex-col gap-3 pb-3 border-t border-border pt-3">
            {/* Cuisine row */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans shrink-0 w-16">
                Cuisine
              </span>
              <ChipGroup
                options={cuisineOptions}
                activeValue={params.cuisine ?? ""}
                onSelect={(val) => onFilterChange("cuisine", val)}
              />
            </div>

            {/* Difficulty row */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans shrink-0 w-16">
                Difficulty
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {difficultyOptions.map(({ id, label }) => {
                  const isActive = (params.difficulty ?? "") === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        onFilterChange(
                          "difficulty",
                          isActive && id !== "" ? "" : id,
                        )
                      }
                      className={cn(
                        "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full",
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

            {/* Prep time + Premium row */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* Prep time */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans shrink-0 w-16">
                  Prep Time
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {PREP_TIME_OPTIONS.map(({ label, value }) => {
                    const isActive = (params.maxPrepTime ?? "") === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          onFilterChange("maxPrepTime", isActive ? "" : value)
                        }
                        className={cn(
                          "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full",
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

              {/* Premium toggle — accent when active */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans shrink-0 w-16">
                  Plan
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange(
                      "isPremium",
                      params.isPremium === "true" ? "" : "true",
                    )
                  }
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                    "text-[11px] uppercase tracking-[0.08em] font-medium font-sans",
                    "transition-colors duration-200 whitespace-nowrap",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    params.isPremium === "true"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                  aria-pressed={params.isPremium === "true"}
                >
                  <Crown className="size-3 shrink-0" aria-hidden />
                  Premium only
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilterBar;
