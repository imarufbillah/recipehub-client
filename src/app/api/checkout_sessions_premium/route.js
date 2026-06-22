import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { getServerSession } from "@/lib/session";

export const POST = async (request) => {
  try {
    const { user } = await getServerSession();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Guard: already premium — don't create a duplicate session
    if (user.plan === "premium") {
      return NextResponse.json(
        { error: "Account is already Premium" },
        { status: 409 },
      );
    }

    const headersList = await headers();
    const origin =
      headersList.get("origin") ?? process.env.NEXT_PUBLIC_BASE_URL;

    const { price } = await request.json();

    const unitAmount = Math.round(Number(price ?? 20) * 100);

    if (isNaN(unitAmount) || unitAmount <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const successParams = new URLSearchParams({
      type: "premium",
      title: "RecipeHub Premium",
      amount: `$${price ?? 20}/mo`,
      redirect: "/dashboard",
    });
    const successUrl = `${origin}/payment-success?${successParams.toString()}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/premium`;

    const session = await stripe.checkout.sessions.create({
      // Subscription mode — recurring monthly billing
      mode: "subscription",
      customer_email: user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            recurring: {
              interval: "month",
            },
            product_data: {
              name: "RecipeHub Premium",
              description:
                "Unlimited recipe publishing, premium profile badge, and recipe purchase access.",
            },
          },
        },
      ],
      metadata: {
        userId: user.id,
        upgradeType: "premium",
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout_sessions_premium]", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode ?? 500 },
    );
  }
};
