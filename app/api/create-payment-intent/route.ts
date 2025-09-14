import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { cartItems, shippingCost } = await request.json();

  // 1. Recalculate the total amount on the server to prevent manipulation.
  //    Fetch product prices from your database based on cartItems.
  const subtotal = 12500; // Example: $125.00 calculated from DB
  const totalAmount = subtotal + (shippingCost * 100); // Stripe expects cents

  try {
    // 2. Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      // Optional: Add metadata to link to your internal order ID
      metadata: { orderId: 'some-internal-order-id' }, 
    });

    // 3. Send the client secret back to the frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}