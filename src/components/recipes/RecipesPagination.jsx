"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial-minimal pagination — centered beneath the recipe grid.
 *
 * Design system spec:
 *  - Current page: primary-token text with a fine underline emphasis.
 *  - Inactive pages: muted-foreground text, hover to foreground.
 *  - Prev / Next: bare chevron icons, no button-box styling.
 *  - Generous horizontal spacing between numbers.
 *  - No heavy borders, no filled-box around each page number.
 *  - Reads like page numbers in a printed magazine index.
 *
 * Ellipsis logic: always shows first, last, current ± 1 window, ellipsis where gaps exist.
 *
 * Props:
 *  currentPage  — 1-indexed current page
 *  totalPages   — total number of pages
 *  onPageChange — (page: number) => void
 */

const buildPageList = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }

  return result;
};

const RecipesPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages);
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      {/* Prev */}
      <button
        type="button"
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        className={cn(
          "size-9 flex items-center justify-center transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
          canPrev
            ? "text-muted-foreground hover:text-foreground"
            : "text-muted-foreground/30 cursor-not-allowed",
        )}
      >
        <ChevronLeft className="size-4 stroke-[1.5]" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1 px-2">
        {pages.map((page, i) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${i}`}
                className="w-8 text-center text-[13px] font-sans text-muted-foreground/50 select-none"
                aria-hidden
              >
                …
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => !isActive && onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                // Generous spacing — editorial, not cramped
                "min-w-8 h-9 px-2 flex items-center justify-center",
                "text-[13px] font-sans transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
                isActive
                  ? // Current page: primary color + subtle underline — magazine index style
                    "text-primary font-medium underline underline-offset-4 decoration-primary/60 cursor-default"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Next page"
        className={cn(
          "size-9 flex items-center justify-center transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
          canNext
            ? "text-muted-foreground hover:text-foreground"
            : "text-muted-foreground/30 cursor-not-allowed",
        )}
      >
        <ChevronRight className="size-4 stroke-[1.5]" />
      </button>
    </nav>
  );
};

export default RecipesPagination;
