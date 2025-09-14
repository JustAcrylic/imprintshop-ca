// /components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/supabase'; // <-- CORRECT

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const startingPrice = Array.isArray(product.price_tiers) && product.price_tiers.length > 0
  ? product.price_tiers[0]?.price 
  : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative w-full h-60">
        <Image
          src={product.image_url ?? '/placeholder.png'}
          alt={product.name ?? 'Product Image'}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
        {startingPrice && (
          <p className="text-sm text-gray-600 mt-1">
            As low as ${Number(startingPrice).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
}