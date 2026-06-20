"use client";

import { useState, useMemo, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CategoryFilterBar from "./CategoryFilterBar";
import RecipeGrid from "./RecipeGrid";
import RecipeGridSkeleton from "./RecipeGridSkeleton";
import RecipesEmptyState from "./RecipesEmptyState";
import RecipesPagination from "./RecipesPagination";

const RECIPES_PER_PAGE = 12;

/**
 * Browse Recipes content orchestrator — "use client" island.
 *
 * Owns the filter/search/pagination state and syncs it to the URL via
 * Next.js router (shallow push) so state is shareable/bookmarkable.
 *
 * The server page passes all recipes down; filtering/pagination happens
 * client-side for instant response without full page reloads.
 * (When real API integration lands, replace with server-side filtering
 * via searchParams and proper suspense boundaries.)
 *
 * Props:
 *  recipes       — full array of recipe objects from the server
 *  categories    — array of { id, label } category objects
 *  initialCategory — category id from URL searchParams (or null)
 *  initialQuery    — search query string from URL searchParams (or "")
 *  initialPage     — page number from URL searchParams (default 1)
 */
const BrowseRecipesContent = ({
  recipes,
  categories,
  initialCategory = null,
  initialQuery = "",
  initialPage = 1,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(
    Math.max(1, Number(initialPage) || 1),
  );

  // Sync state to URL
  const pushParams = useCallback(
    (category, query, page) => {
      const params = new URLSearchParams(searchParams.toString());

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      if (page > 1) {
        params.set("page", String(page));
      } else {
        params.delete("page");
      }

      startTransition(() => {
        router.push(
          `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
          { scroll: false },
        );
      });
    },
    [pathname, router, searchParams],
  );

  const handleCategoryChange = useCallback(
    (id) => {
      setActiveCategory(id);
      setCurrentPage(1);
      pushParams(id, searchQuery, 1);
    },
    [searchQuery, pushParams],
  );

  const handleSearchChange = useCallback(
    (query) => {
      setSearchQuery(query);
      setCurrentPage(1);
      pushParams(activeCategory, query, 1);
    },
    [activeCategory, pushParams],
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      pushParams(activeCategory, searchQuery, page);
      // Scroll back to the grid top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [activeCategory, searchQuery, pushParams],
  );

  const handleClearFilters = useCallback(() => {
    setActiveCategory(null);
    setSearchQuery("");
    setCurrentPage(1);
    pushParams(null, "", 1);
  }, [pushParams]);

  // Client-side filter + search
  const filteredRecipes = useMemo(() => {
    let result = recipes;

    if (activeCategory) {
      result = result.filter((r) => r.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.cuisine?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q),
      );
    }

    return result;
  }, [recipes, activeCategory, searchQuery]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const pageRecipes = filteredRecipes.slice(
    (safePage - 1) * RECIPES_PER_PAGE,
    safePage * RECIPES_PER_PAGE,
  );

  const hasFilters = activeCategory !== null || searchQuery.trim() !== "";
  const isEmpty = filteredRecipes.length === 0;

  return (
    <>
      {/* ── Filter bar — sticky below navbar (top-16) ── */}
      <CategoryFilterBar
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />

      {/* ── Main content area ── */}
      <section className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-10 lg:py-14">
        {/* Results count line — updated on filter */}
        {!isEmpty && (
          <p className="text-[13px] font-sans text-muted-foreground mb-6 uppercase tracking-wider">
            {filteredRecipes.length.toLocaleString()}{" "}
            {filteredRecipes.length === 1 ? "recipe" : "recipes"}
            {hasFilters ? " found" : ""}
          </p>
        )}

        {/* Loading skeleton while router transition is in flight */}
        {isPending ? (
          <RecipeGridSkeleton count={RECIPES_PER_PAGE} />
        ) : isEmpty ? (
          /* Empty state */
          <RecipesEmptyState
            onClearFilters={hasFilters ? handleClearFilters : undefined}
          />
        ) : (
          /* Recipe grid */
          <RecipeGrid recipes={pageRecipes} />
        )}

        {/* Pagination — only when not empty and more than one page */}
        {!isEmpty && !isPending && totalPages > 1 && (
          <div className="mt-14 lg:mt-16">
            <RecipesPagination
              currentPage={safePage}
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
