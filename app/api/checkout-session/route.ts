import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
  try {
    const { productName, productPrice, origin }: { productName: string; productPrice: number; origin: string } = await req.json();

    // Create a customer
    const customer = await stripe.customers.create({
      description: `Customer for ${productName}`,
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: productPrice, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer: customer.id, // Attach the customer to the session
      success_url: `${origin}?success=true&product=${encodeURIComponent(
        productName
      )}&price=${productPrice}&session_id={CHECKOUT_SESSION_ID}&customer_id=${customer.id}`,
      cancel_url: `${origin}`,
    });

    const walletAddress = customer.id; // Set wallet address to the customer ID

    // Send data to your backend API
    try {
      const res = await fetch(`${origin}/api/postdata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, walletAddress }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Product data saved successfully:', data);
      } else {
        const error = await res.json();
        console.error(error.message || 'Failed to save product.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    // Return session and customer information
    return NextResponse.json({
      id: session.id,
      customer: customer.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
