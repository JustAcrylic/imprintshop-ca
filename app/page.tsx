// app/page.tsx
import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/supabase';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*').limit(8);

  return (
    <main className="container mx-auto p-4">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold">Promotional Products in Canada</h1>
        <p className="text-lg text-gray-600 mt-2">Your source for custom branded merchandise.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}