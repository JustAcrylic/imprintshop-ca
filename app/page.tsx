import { createClient } from '@/lib/supabase/server'; // Assumes you have a server helper
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const supabase = createClient();
  const { data: products } = await supabase.from('products').select('*').limit(8);

  return (
    <main>
      <h1>Welcome to Imprint Shop</h1>
      <div className="grid grid-cols-4 gap-4">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}