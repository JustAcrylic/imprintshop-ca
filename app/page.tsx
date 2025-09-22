// app/page.tsx
import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/supabase';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch products and categories in parallel
  const productsPromise = supabase.from('products').select('*').limit(8);
  const categoriesPromise = supabase.from('products').select('category').limit(10);
  
  const [{ data: products }, { data: categoriesData }] = await Promise.all([productsPromise, categoriesPromise]);

  // Get unique category names
  const categories = categoriesData ? [...new Set(categoriesData.map(item => item.category).filter(Boolean))] : [];

  return (
    <>
      {/* Hero Section ... (code remains the same) */}
      <section className="bg-brand-gray py-12 md:py-20">
        {/* ... */}
      </section>

      {/* Categories Section */}
      <section className="container mx-auto p-4 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Link key={category} href={`/category/${category}`} className="bg-white border rounded-full px-6 py-2 text-gray-700 hover:bg-brand-blue hover:text-white transition-colors">
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto p-4 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}