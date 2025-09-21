// app/page.tsx
import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/supabase';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*').limit(8);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-gray py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Promotional Products in Canada</h1>
          <p className="text-md md:text-xl text-gray-600 mt-4">Your source for custom branded merchandise.</p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Search for pens, mugs, t-shirts..."
                className="w-full px-4 py-3 rounded-full border focus:ring-brand-blue focus:border-brand-blue"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-brand-blue text-white px-5 rounded-r-full hover:bg-brand-blue-dark">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
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