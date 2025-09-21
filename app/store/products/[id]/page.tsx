// app/products/[id]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound(); // This will show a standard 404 page if no product is found
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full bg-gray-200 rounded-lg">
          <Image
            src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
            alt={product.name ?? 'Product Image'}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{product.category}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          
          {/* Add your PricingSlider component here later */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-bold text-xl">Pricing</h2>
            {/* You will implement the dynamic pricing slider here */}
          </div>
        </div>
      </div>
    </div>
  );
}