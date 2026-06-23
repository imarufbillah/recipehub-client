import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { getRecipeById } from "@/lib/apiClient.server";
import EditRecipeForm from "@/components/dashboard/EditRecipeForm";
import { Button } from "@/components/ui/button";

const EditRecipePage = async ({ params, searchParams }) => {
  const { id } = await params;
  const { from } = await searchParams;
  const { user } = await getServerSession();

  const backHref =
    from === "manage-recipes"
      ? "/dashboard/manage-recipes"
      : "/dashboard/my-recipes";

  let recipe = null;
  try {
    recipe = await getRecipeById(id);
  } catch {
    recipe = null;
  }

  if (!recipe) notFound();

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
            Edit Recipe
          </h2>
          <p className="mt-1 text-[13px] font-sans text-muted-foreground">
            Editing:{" "}
            <span className="text-foreground/70">{recipe.recipeName}</span>
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="shrink-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
        >
          <Link href={backHref}>Cancel</Link>
        </Button>
      </div>

      <EditRecipeForm recipe={recipe} user={user} backHref={backHref} />
    </div>
  );
};

export default EditRecipePage;
