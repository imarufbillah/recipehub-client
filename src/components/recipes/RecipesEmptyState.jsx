import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Empty state for Browse Recipes — shown when filters return zero results.
 *
 * Design system empty state pattern:
 *  - Centered, generous vertical whitespace
 *  - Single restrained Lucide line-icon (SearchX — functional, not decorative)
 *  - Serif micro-headline (h3 scale but treated as a label — 22px)
 *  - Muted sans supporting line
 *  - Single ghost-button CTA to clear filters
 *  - No illustration, no cartoon, no emoji
 *
 * Props:
 *  onClearFilters — callback to reset all filters
 */
const RecipesEmptyState = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 lg:py-32 gap-5 text-center">
      {/* Single line-icon — muted, functional wayfinding */}
      <SearchX
        className="size-9 text-muted-foreground/60 stroke-[1.25]"
        aria-hidden
      />

      {/* Serif micro-headline */}
      <h3 className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-foreground">
        No recipes match
      </h3>

      {/* Muted supporting line — sans */}
      <p className="text-[15px] font-sans text-muted-foreground leading-relaxed max-w-xs">
        Try adjusting your filters or search query to find what you&apos;re
        looking for.
      </p>

      {/* Ghost CTA — only one action available */}
      {onClearFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="mt-1 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent px-0"
        >
          Clear all filters
        </Button>
      )}
    </div>
  );
};

export default RecipesEmptyState;
