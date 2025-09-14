// /components/PricingSlider.tsx
'use client';
import { useState, useMemo } from 'react';

type PriceBreak = { quantity: number; price: number };

interface PricingSliderProps {
  priceBreaks: PriceBreak[];
  maxQuantity?: number;
}

export default function PricingSlider({ priceBreaks, maxQuantity = 500 }: PricingSliderProps) {
  const [quantity, setQuantity] = useState(priceBreaks[0]?.quantity || 50);

  const { pricePerItem, totalPrice } = useMemo(() => {
    let currentPrice = priceBreaks[0]?.price || 0;
    for (const p of [...priceBreaks].sort((a, b) => a.quantity - b.quantity)) {
      if (quantity >= p.quantity) {
        currentPrice = p.price;
      } else {
        break;
      }
    }
    return {
      pricePerItem: currentPrice,
      totalPrice: quantity * currentPrice,
    };
  }, [quantity, priceBreaks]);

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="quantity" className="font-bold text-lg">Quantity</label>
          <p className="text-2xl font-bold">{quantity}</p>
        </div>
        <div>
          <p className="text-gray-600">Price per item</p>
          <p className="text-2xl font-bold">${pricePerItem.toFixed(2)}</p>
        </div>
      </div>
      <input
        type="range"
        id="quantity"
        min={priceBreaks[0]?.quantity || 1}
        max={maxQuantity}
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="mt-4 text-right">
        <p className="text-gray-600">Total Price</p>
        <p className="text-3xl font-extrabold text-blue-600">
          ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}