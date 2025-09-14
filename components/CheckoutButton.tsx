'use client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton({ cartItems }: { cartItems: any[] }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems }),
    });
    const { sessionId } = await response.json();
    const result = await stripe?.redirectToCheckout({ sessionId });
    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <button onClick={handleCheckout} className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full">
      Proceed to Checkout
    </button>
  );
}