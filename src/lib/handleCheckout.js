const handleCheckout = async ({ recipeId, recipeName, price, recipeSlug }) => {
  const response = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId, recipeName, price, recipeSlug }),
  });

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}));
    throw new Error(error ?? "Failed to create checkout session");
  }

  const { url } = await response.json();

  if (!url) throw new Error("No checkout URL returned");

  window.location.href = url;
};

export default handleCheckout;
