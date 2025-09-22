'use client';

import { useState } from 'react';
import { Product } from '@/types/supabase';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function ProductClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(product.min_quantity || 50);
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(product.images?.[0] || '/placeholder.png');

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
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name ?? 'Product Image'}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex space-x-2 mt-2">
            {product.images?.map((img, index) => (
              <button key={index} onMouseOver={() => setMainImage(img)} className={`relative h-16 w-16 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-brand-blue' : 'border-transparent'}`}>
                <Image src={img} alt={`thumbnail ${index + 1}`} fill style={{ objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info & Pricing */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{product.category}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          
          <div className="mt-8 p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Calculate Your Price</h2>
            
            <div className="space-y-2 mb-6">
              {product.price_tiers?.sort((a, b) => a.quantity - b.quantity).map(tier => (
                <div 
                  key={tier.quantity} 
                  className={`flex justify-between p-2 rounded-md transition-colors ${quantity >= tier.quantity ? 'bg-blue-50' : ''}`}
                >
                  <span>{tier.quantity}+</span>
                  <span className="font-semibold">${tier.price.toFixed(2)} each</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <label htmlFor="quantity" className="font-bold text-lg">Quantity:</label>
              <input 
                type="number"
                id="quantity"
                value={quantity}
                min={product.min_quantity || 50}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 p-2 border rounded-md text-center font-bold text-lg"
              />
            </div>

            <div className="mt-4 text-right border-t pt-4">
              <p className="text-xl font-semibold text-gray-800">${pricePerItem.toFixed(2)} / each</p>
              <p className="text-3xl font-bold text-brand-blue">Total: ${totalPrice}</p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}