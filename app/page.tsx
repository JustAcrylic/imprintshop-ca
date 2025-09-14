import ProductCard from '@/components/ProductCard';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export type Product = Database['public']['Tables']['products']['Row'];

export default async function HomePage() {
  const cookieStore = cookies();
   const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return <p className="text-center text-red-500">Failed to load products.</p>;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Our Promotional Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Browse our collection of customizable items perfect for your brand.
        </p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-16">
          No products found. Please check back later!
        </p>
      )}
    </main>
  );
}