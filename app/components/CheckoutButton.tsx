'use client';

import { Product } from '@/types/supabase'; // Import the Product type

// Define the props for the component
interface CheckoutButtonProps {
  product: Product;
}

export default function CheckoutButton({ product }: CheckoutButtonProps) {
  const handleCheckout = () => {
    // Log the product to use the variable for now
    console.log('Checking out with:', product.name);
    // Add Stripe checkout logic here
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}