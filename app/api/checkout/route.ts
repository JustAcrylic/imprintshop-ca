// /app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { cartItems } = await request.json(); // Expects an array of items

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item: any) => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name: item.name,
        images: [item.image_url],
      },
      unit_amount: Math.round(item.pricePerItem * 100), // Price in cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      invoice_creation: { enabled: true }, // Generate an invoice
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}