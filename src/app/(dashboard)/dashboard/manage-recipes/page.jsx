import { getAllRecipes } from "@/lib/apiClient.server";
import ManageRecipesClient from "@/components/dashboard/ManageRecipesClient";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ManageRecipesPage = async ({ searchParams }) => {
  const page = Number((await searchParams).page ?? 1);
  const data = await getAllRecipes({ page, limit: 20 });

  const rows = (data.recipes ?? []).map((r) => ({
    id: r._id,
    name: r.recipeName,
    author: r.authorName ?? r.author ?? "—",
    category: r.category ?? "—",
    submitted: r.createdAt ? formatDate(r.createdAt) : "—",
    likes: r.likesCount ?? r.likes ?? 0,
    status: r.isFeatured ? "Featured" : r.isPremium ? "Premium" : "Active",
  }));

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Manage Recipes
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Feature or remove recipes from the platform.
        </p>
      </div>
      <ManageRecipesClient
        initialRows={rows}
        totalPages={data.totalPages ?? 1}
        currentPage={data.page ?? 1}
      />
    </div>
  );
};

export default ManageRecipesPage;
