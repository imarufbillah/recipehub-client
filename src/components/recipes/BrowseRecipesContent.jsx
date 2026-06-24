"use client";

import { useCallback, useRef, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import AdvancedFilterBar from "./AdvancedFilterBar";
import RecipeGrid from "./RecipeGrid";
import RecipeGridSkeleton from "./RecipeGridSkeleton";
import RecipesEmptyState from "./RecipesEmptyState";
import RecipesPagination from "./RecipesPagination";

const BrowseRecipesContent = ({
  recipes,
  categories,
  cuisines,
  total,
  totalPages,
  currentPage,
  initialParams = {},
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  /*
   * Track the count of the last visible result set so the skeleton mirrors
   * it during a pending transition — e.g. if the current page shows 7 cards,
   * the skeleton shows 7 cards, not a fixed 12.
   * Initialised to recipes.length on mount; updated after each settled render.
   */
  const prevCountRef = useRef(recipes.length);
  if (!isPending) {
    prevCountRef.current = recipes.length;
  }
  const skeletonCount = prevCountRef.current || 12;

  // Merge a partial update into the current URL params and navigate.
  // Arrays are joined as comma-separated strings for the URL.
  const pushParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(","));
          } else {
            params.delete(key);
          }
        } else if (value !== "" && value !== null && value !== undefined) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      }

      // Any filter change resets to page 1 unless explicitly setting page
      if (!("page" in updates)) params.delete("page");

      startTransition(() => {
        router.push(
          `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
          { scroll: false },
        );
      });
    },
    [pathname, router, searchParams],
  );

  const handleFilterChange = useCallback(
    (key, value) => pushParams({ [key]: value }),
    [pushParams],
  );

  const handlePageChange = useCallback(
    (page) => {
      pushParams({ page: page > 1 ? page : "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [pushParams],
  );

  const handleClearAll = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }, [pathname, router]);

  const isEmpty = recipes.length === 0;
  const hasFilters = Object.entries(initialParams).some(
    ([k, v]) => k !== "sort" && v !== "" && v !== "newest",
  );

  return (
    <>
      {/* ── Filter bar — sticky below navbar ── */}
      <AdvancedFilterBar
        categories={categories}
        cuisines={cuisines}
        params={initialParams}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        hasFilters={hasFilters}
      />

      {/* ── Main content ── */}
      <section className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-10 lg:py-14">
        {isPending ? (
          <RecipeGridSkeleton count={skeletonCount} />
        ) : isEmpty ? (
          <RecipesEmptyState
            onClearFilters={hasFilters ? handleClearAll : undefined}
          />
        ) : (
          <RecipeGrid recipes={recipes} />
        )}

        {!isEmpty && !isPending && totalPages > 1 && (
          <div className="mt-14 lg:mt-16">
            <RecipesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default BrowseRecipesContent;
