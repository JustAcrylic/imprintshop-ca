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
    <div className="bg-white border rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-blue hover:-translate-y-1">
      <Link href={`/store/products/${product.id}`} className="block group">
        <div className="relative w-full h-52 bg-gray-200">
          <Image
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
            alt={product.name ?? 'Product Image'}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">{product.category ?? 'Promotional'}</p>
          <h3 className="font-semibold text-md text-gray-900 truncate mt-1 group-hover:text-brand-blue transition-colors">{product.name}</h3>
          {startingPrice !== null && (
            <p className="text-sm text-gray-600 mt-2">
              As low as <span className="font-bold text-lg text-gray-800">${startingPrice.toFixed(2)}</span>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}