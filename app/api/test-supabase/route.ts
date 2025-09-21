// app/api/test-supabase/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('products').select('id').limit(1);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return NextResponse.json({ 
      message: "Connection successful!",
      data: data 
    });
  } catch (error) {
    console.error("Supabase connection test failed:", error);
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}