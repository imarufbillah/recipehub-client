import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/session";
import { getPurchasesByUserId } from "@/lib/apiClient.server";
import PurchasedTable from "@/components/dashboard/PurchasedTable";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatPrice = (price) => {
  if (price == null) return "—";
  return `$${Number(price).toFixed(2)}`;
};

const normalisePurchases = (raw = []) =>
  raw.map((item) => ({
    id: item._id,
    // Kept separately so hrefFn can reference it
    recipeId: item.recipeId,
    recipeName: item.recipeName,
    author: item.author ?? "—",
    price: formatPrice(item.price),
    purchasedAt: formatDate(item.purchasedAt),
    // Stripe payment intent ID as the transaction reference
    ref: item.stripePaymentIntentId ?? "—",
  }));

const PurchasedPage = async () => {
  const { user } = await getServerSession();

  let rows = [];
  try {
    const data = await getPurchasesByUserId(user.id);
    rows = normalisePurchases(
      Array.isArray(data) ? data : (data?.purchases ?? []),
    );
  } catch {
    rows = [];
  }

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Purchased
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Premium recipes you&apos;ve unlocked.
        </p>
      </div>

      {rows.length > 0 ? (
        <PurchasedTable rows={rows} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <ShoppingBag
            className="size-8 text-muted-foreground/40 stroke-[1.25]"
            aria-hidden
          />
          <h3 className="font-heading text-[20px] leading-snug tracking-[-0.01em] text-foreground">
            No purchases yet
          </h3>
          <p className="text-[14px] font-sans text-muted-foreground max-w-xs">
            Browse premium recipes and unlock full ingredients and instructions.
          </p>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mt-1 px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <Link href="/recipes">Explore Recipes →</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PurchasedPage;
