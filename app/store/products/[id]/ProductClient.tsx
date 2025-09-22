// app/store/products/[id]/ProductClient.tsx
'use client';

import { useState } from 'react';
import { Product } from '@/types/supabase';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function ProductClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(product.min_quantity || 50);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const getPriceForQuantity = (qty: number) => {
    if (!product.price_tiers || product.price_tiers.length === 0) return 0;
    const sortedTiers = [...product.price_tiers].sort((a, b) => a.quantity - b.quantity);
    let applicablePrice = sortedTiers[0].price;
    for (const tier of sortedTiers) {
      if (qty >= tier.quantity) {
        applicablePrice = tier.price;
      }
    }
    return applicablePrice;
  };

  const pricePerItem = getPriceForQuantity(quantity);
  const totalPrice = (pricePerItem * quantity).toFixed(2);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-96 w-full bg-gray-200 rounded-lg">
          <Image
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
            alt={product.name ?? 'Product Image'}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{product.category}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <label htmlFor="quantity" className="font-bold">Quantity:</label>
              <input 
                type="number"
                id="quantity"
                value={quantity}
                min={product.min_quantity || 50}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 p-2 border rounded-md text-center"
              />
            </div>

            <div className="mt-4 text-right">
              <p className="text-xl font-semibold text-gray-800">${pricePerItem.toFixed(2)} / each</p>
              <p className="text-3xl font-bold text-brand-blue">Total: ${totalPrice}</p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-brand-blue-dark transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}