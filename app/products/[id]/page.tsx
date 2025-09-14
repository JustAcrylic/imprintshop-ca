import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PricingSlider from '@/components/PricingSlider';
import { Database } from '@/types/supabase';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
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

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.image_url ?? '/placeholder.png'}
            alt={product.name ?? 'Product Image'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {product.description}
          </p>
          
          <PricingSlider priceBreaks={product.pricing_data as any[]} />
        </div>
      </div>
    </div>
  );
}