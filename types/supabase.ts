// types/supabase.ts

export interface Product {
  id: string;
  name: string;
  description: string | null;
  images: string[] | null;
  category: string | null;
  price_tiers: { quantity: number; price: number }[] | null;
  created_at?: string;
}