import { getServerSession } from "@/lib/session";
import PremiumPageClient from "@/components/premium/PremiumPageClient";

export const metadata = {
  title: "Premium Membership — RecipeHub",
  description:
    "Unlock unlimited recipe publishing, a premium profile badge, and access to purchase any recipe on RecipeHub.",
};

const PREMIUM_PRICE = "19.99";

const PremiumPage = async () => {
  let isPremium = false;

  try {
    const { user } = await getServerSession();
    isPremium = user?.plan === "premium";
  } catch {
    // Unauthenticated visitors: show the offer card (isPremium stays false)
  }

  return (
    <section className="w-full py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16">
        <PremiumPageClient isPremium={isPremium} price={PREMIUM_PRICE} />
      </div>
    </section>
  );
};

export default PremiumPage;
