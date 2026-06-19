import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { getRecipesByUserId } from "@/lib/apiClient";
import EditRecipeForm from "@/components/dashboard/EditRecipeForm";
import { Button } from "@/components/ui/button";

const EditRecipePage = async ({ params }) => {
  const { id } = await params;
  const { user } = await getServerSession();

  // Fetch this user's recipes and find the one matching the id param.
  // TODO: replace with a direct getRecipeById(id) call once that endpoint
  // is added to apiClient — fetching all recipes just to find one is fine
  // for now but wasteful at scale.
  let recipe = null;
  try {
    const data = await getRecipesByUserId(user.id);
    const recipes = Array.isArray(data) ? data : (data?.recipes ?? []);
    recipe = recipes.find((r) => r._id === id) ?? null;
  } catch {
    recipe = null;
  }

  if (!recipe) notFound();

  return (
    <div className="px-5 md:px-8 py-8">
      {/* ── Page header ── */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          {/* Sans title — Admin Mode: dashboard chrome stays sans, not serif */}
          <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
            Edit Recipe
          </h2>
          {/* Muted caption: shows the recipe being edited as context */}
          <p className="mt-1 text-[13px] font-sans text-muted-foreground">
            Editing:{" "}
            <span className="text-foreground/70">{recipe.recipeName}</span>
          </p>
        </div>

        {/* Ghost cancel — top-right, returns to My Recipes without saving */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="shrink-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
        >
          <Link href="/dashboard/my-recipes">Cancel</Link>
        </Button>
      </div>

      {/* ── Form client island ── */}
      <EditRecipeForm recipe={recipe} user={user} />
    </div>
  );
};

export default EditRecipePage;
