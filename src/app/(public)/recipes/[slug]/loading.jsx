import RecipeDetailSkeleton from "@/components/recipe-detail/RecipeDetailSkeleton";

/**
 * Shown while the recipe detail page fetches its data (recipe + auth status).
 * Only the dynamic content areas are skeletal — the Navbar/Footer are static
 * and render immediately from the parent public layout.
 */
const RecipeDetailLoading = () => <RecipeDetailSkeleton />;

export default RecipeDetailLoading;
