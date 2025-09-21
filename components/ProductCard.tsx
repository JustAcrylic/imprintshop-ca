// components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const startingPrice = Array.isArray(product.price_tiers) && product.price_tiers.length > 0
    ? product.price_tiers[0]?.price
    : null;

  return (
    <Link href={`/store/products/${product.id}`} className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative w-full h-60 bg-gray-200">
        <Image
          src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
          alt={product.name ?? 'Product Image'}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-lg text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category ?? 'General'}</p>
        {startingPrice !== null && (
          <p className="text-blue-600 font-semibold mt-2">
            As low as ${startingPrice.toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
}