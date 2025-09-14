'use client';

import { useState } from 'react';

type PriceTier = {
  quantity: number;
  price: number;
};

interface PricingSliderProps {
  priceTiers: PriceTier[];
  minQuantity: number;
  maxQuantity: number;
}

export default function PricingSlider({ priceTiers, minQuantity, maxQuantity }: PricingSliderProps) {
  const [quantity, setQuantity] = useState(minQuantity);

  const calculatePricePerItem = (currentQuantity: number): number => {
    // Find the highest quantity tier that is less than or equal to the current quantity
    const applicableTier = [...priceTiers]
      .sort((a, b) => b.quantity - a.quantity)
      .find(tier => currentQuantity >= tier.quantity);
    
    // Default to the price of the lowest tier if no other tier is met
    return applicableTier ? applicableTier.price : priceTiers[0]?.price || 0;
  };
  
  const pricePerItem = calculatePricePerItem(quantity);
  const totalPrice = (pricePerItem * quantity).toFixed(2);

  return (
    <div>
      <label htmlFor="quantity">Quantity: {quantity}</label>
      <input
        type="range"
        id="quantity"
        min={minQuantity}
        max={maxQuantity}
        step="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full"
      />
      <div>
        <p className="text-xl font-bold">${pricePerItem.toFixed(2)} / each</p>
        <p className="text-2xl font-bold">Total: ${totalPrice}</p>
      </div>
    </div>
  );
}