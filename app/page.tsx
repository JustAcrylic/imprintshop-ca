// /app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase.from('products').select('*');

  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}