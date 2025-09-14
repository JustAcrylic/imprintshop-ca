// app/api/create-payment-intent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  // We'll use these variables later
  const { cartItems, shippingCost } = await request.json();
  console.log(cartItems); // Using the variable to remove the warning for now

  // 1. Recalculate the total amount on the server to prevent manipulation.
  const subtotal = 12500; // Example: $125.00 calculated from DB
  const totalAmount = subtotal + (shippingCost * 100); // Stripe expects cents

  try {
    const paymentIntent = await stripe.payment Intents.create({
      amount: totalAmount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: 'some-internal-order-id' }, 
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) { // The fix is here
    // Check if the error is an object and has a message property
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Handle cases where the error is not a standard Error object
    return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
  }
}