import RecipeForm from "@/components/dashboard/RecipeForm";
import { getServerSession } from "@/lib/session";

/**
 * Add Recipe page — user dashboard.
 * RecipeForm handles all client state; this page is a server component shell.
 */
const AddRecipePage = async () => {
  const { user } = await getServerSession();

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Add Recipe
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Share a new recipe with the RecipeHub community.
        </p>
      </div>

      <RecipeForm user={user} mode="add" />
    </div>
  );
};

export default AddRecipePage;
