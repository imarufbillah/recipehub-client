import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { getServerSession } from "@/lib/session";

export const POST = async (request) => {
  try {
    const { user } = await getServerSession();
    const headersList = await headers();
    const origin =
      headersList.get("origin") ?? process.env.NEXT_PUBLIC_BASE_URL;

    const { recipeId, recipeName, price, recipeSlug } = await request.json();

    if (!recipeId || !recipeName || !price || !recipeSlug) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: recipeId, recipeName, price, recipeSlug",
        },
        { status: 400 },
      );
    }

    // Convert to cents — Stripe amounts are always in the smallest currency unit
    const unitAmount = Math.round(Number(price) * 100);

    if (isNaN(unitAmount) || unitAmount <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const successParams = new URLSearchParams({
      type: "recipe",
      title: recipeName,
      amount: `$${price}`,
      redirect: `/recipes/${recipeSlug}`,
    });
    const successUrl = `${origin}/payment-success?${successParams.toString()}&session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = `${origin}/recipes/${recipeSlug}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: recipeName,
              description: "Premium recipe — RecipeHub",
            },
          },
        },
      ],
      metadata: { recipeId },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    // Return the URL — handleCheckout redirects the browser there
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout_sessions]", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode ?? 500 },
    );
  }
};
