// app/store/products/[id]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient'; // Import the client component

type ProductPageProps = {
  params: {
    id: string;
  };
};

// This remains a server component to fetch data
export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  // Render the client component and pass the product data to it
  return <ProductClient product={product} />;
}