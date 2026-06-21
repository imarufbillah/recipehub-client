import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import PremiumContentGate from "./PremiumContentGate";

const RecipeContentBody = ({
  ingredientGroups,
  steps,
  isPremium = false,
  isPurchased = false,
  recipeId,
  recipeName,
  recipeSlug,
  priceAmount,
  price,
}) => {
  // Locked: premium recipe the current user has not purchased
  const isLocked = isPremium && !isPurchased;

  if (isLocked) {
    return (
      <PremiumContentGate
        recipeName={recipeName}
        recipeId={recipeId}
        recipeSlug={recipeSlug}
        priceAmount={priceAmount}
        price={price}
      />
    );
  }

  return (
    <section className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-16 lg:py-24">
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-16 gap-14">
        {/* ── Ingredients — narrow left column (5/12) ── */}
        <div className="lg:col-span-5 lg:border-r lg:border-border lg:pr-16">
          <RecipeIngredients groups={ingredientGroups} />
        </div>

        {/* ── Instructions — wider right column (7/12) ── */}
        <div className="lg:col-span-7">
          <RecipeInstructions steps={steps} />
        </div>
      </div>
    </section>
  );
};

export default RecipeContentBody;
