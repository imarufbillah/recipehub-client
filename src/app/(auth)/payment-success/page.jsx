import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { makePurchase } from "@/lib/apiClient";
import PaymentSuccessAnimated from "@/components/payment/PaymentSuccessAnimated";
import { getServerSession } from "@/lib/session";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Format cents → "$4.49" — Stripe always returns amounts in the smallest unit
const formatAmount = (cents, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);

// Shorten the payment intent ID to a readable ref: "pi_3abcXYZ" → "PI-XYZ"
const shortRef = (paymentIntentId) => {
  if (!paymentIntentId) return "—";
  return `PI-${paymentIntentId.slice(-6).toUpperCase()}`;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const PaymentSuccessPage = async ({ searchParams }) => {
  const params = await searchParams;

  const sessionId = params?.session_id;
  const type = params?.type ?? "recipe";
  const fallbackTitle = params?.title ?? "Recipe";
  const redirectHref = params?.redirect ?? "/dashboard";

  // No session ID → something went wrong
  if (!sessionId) redirect("/");

  // Fetch real session from Stripe — expand line_items and payment_intent
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });
  } catch {
    redirect("/");
  }

  // Only proceed for completed payments
  if (session.payment_status !== "paid") redirect("/");

  // ── Record the purchase ─────────────────────────────────────────────────────
  const authSession = await getServerSession();

  if (authSession?.user) {
    const userId = authSession.user.id;
    const recipeId = session.metadata?.recipeId;

    if (recipeId) {
      await makePurchase({
        userId,
        recipeId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent?.id ?? null,
        amount: session.amount_total / 100,
        currency: session.currency,
        purchasedAt: new Date(
          session.payment_intent?.created * 1000,
        ).toISOString(),
      }).catch((err) => {
        console.error("[makePurchase]", err.message);
      });
    }
  }

  // ── Presentation data ───────────────────────────────────────────────────────
  const isPremiumUpgrade = type === "premium";

  const recipeTitle =
    session.line_items?.data?.[0]?.description ??
    session.line_items?.data?.[0]?.price?.product?.name ??
    fallbackTitle;

  const amountDisplay = formatAmount(session.amount_total, session.currency);
  const txnRef = shortRef(session.payment_intent?.id);
  const customerEmail = session.customer_details?.email ?? null;

  const summaryLabel = isPremiumUpgrade ? "Premium Membership" : recipeTitle;
  const subText = isPremiumUpgrade
    ? "Your Premium membership is now active. Enjoy full access to all premium recipes."
    : `You've unlocked "${recipeTitle}". Ingredients and instructions are now available.`;
  const ctaLabel = isPremiumUpgrade ? "Go to Dashboard" : "View Recipe";

  return (
    <PaymentSuccessAnimated
      summaryLabel={summaryLabel}
      subText={subText}
      ctaLabel={ctaLabel}
      redirectHref={redirectHref}
      amountDisplay={amountDisplay}
      txnRef={txnRef}
      customerEmail={customerEmail}
      isPremiumUpgrade={isPremiumUpgrade}
    />
  );
};

export default PaymentSuccessPage;
