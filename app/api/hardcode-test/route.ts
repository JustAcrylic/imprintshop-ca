// app/api/hardcode-test/route.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // IMPORTANT: Replace these with your actual Supabase credentials for this test
    const supabaseUrl = 'YOUR_SUPABASE_URL_HERE';
    const supabaseKey = 'YOUR_SUPABASE_ANON_KEY_HERE';

    // This creates a temporary client that does NOT use environment variables
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {},
    });

    const { data, error } = await supabase.from('products').select('id').limit(1);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return NextResponse.json({ 
      message: "Hardcoded connection successful!",
      data: data 
    });
  } catch (error) {
    console.error("Hardcoded test failed:", error);
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}