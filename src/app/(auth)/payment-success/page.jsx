import Link from "next/link";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import PaymentSuccessAnimated from "@/components/payment/PaymentSuccessAnimated";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Format cents → "$4.49" — Stripe always returns amounts in the smallest unit
const formatAmount = (cents, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);

// Shorten the Stripe payment intent ID to a human-readable ref
// e.g. "pi_3abc…XYZ" → "PI-XYZ" (last 6 chars, uppercased)
const shortRef = (paymentIntentId) => {
  if (!paymentIntentId) return "—";
  const suffix = paymentIntentId.slice(-6).toUpperCase();
  return `PI-${suffix}`;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const PaymentSuccessPage = async ({ searchParams }) => {
  const params = await searchParams;

  const sessionId = params?.session_id;
  const type = params?.type ?? "recipe";
  const fallbackTitle = params?.title ?? "Recipe";
  const redirectHref = params?.redirect ?? "/dashboard";

  // No session ID → something went wrong, bounce to home
  if (!sessionId) redirect("/");

  // Fetch the real session from Stripe — expand line_items for product name
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });
  } catch {
    // Invalid / expired session ID — bounce gracefully
    redirect("/");
  }

  // Guard: only show success for actually completed payments
  if (session.payment_status !== "paid") redirect("/");

  const isPremiumUpgrade = type === "premium";

  // Prefer the product name from the Stripe line item over the URL param
  const recipeTitle =
    session.line_items?.data?.[0]?.description ??
    session.line_items?.data?.[0]?.price?.product?.name ??
    fallbackTitle;

  // Amount and currency straight from Stripe — authoritative
  const amountDisplay = formatAmount(session.amount_total, session.currency);

  // Short human-readable reference from the payment intent ID
  const txnRef = shortRef(session.payment_intent?.id);

  // Customer email confirmed by Stripe
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
