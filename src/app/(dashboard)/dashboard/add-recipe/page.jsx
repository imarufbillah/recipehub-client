import RecipeForm from "@/components/dashboard/RecipeForm";
import RecipeLimitGate from "@/components/dashboard/RecipeLimitGate";
import { getServerSession } from "@/lib/session";

const FREE_PLAN_RECIPE_LIMIT = 2;

const AddRecipePage = async () => {
  const { user } = await getServerSession();

  const isPremium = user?.plan === "premium";
  const isAdmin = user?.role === "admin";
  const recipeCount = user?.recipes ?? 0;
  const isAtLimit =
    !isPremium && !isAdmin && recipeCount >= FREE_PLAN_RECIPE_LIMIT;

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Add Recipe
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          {isAtLimit
            ? `Free plan · ${recipeCount} / ${FREE_PLAN_RECIPE_LIMIT} recipes published.`
            : "Share a new recipe with the RecipeHub community."}
        </p>
      </div>

      {isAtLimit ? (
        <RecipeLimitGate recipeCount={recipeCount} />
      ) : (
        <RecipeForm user={user} mode="add" />
      )}
    </div>
  );
};

export default AddRecipePage;
