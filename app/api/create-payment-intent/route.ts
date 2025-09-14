// app/api/create-payment-intent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { cartItems, shippingCost } = await request.json();
  console.log(cartItems);

  const subtotal = 12500;
  const totalAmount = subtotal + (shippingCost * 100);

  try {
    // The fix is on this line: "payment Intents" is now "paymentIntents"
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: 'some-internal-order-id' },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
  }
}