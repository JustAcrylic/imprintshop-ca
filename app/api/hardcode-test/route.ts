// app/api/hardcode-test/route.ts
// Import the standard Supabase client
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // IMPORTANT: Replace these with your actual Supabase credentials for this test
    const supabaseUrl = 'YOUR_SUPABASE_URL_HERE';
    const supabaseKey = 'YOUR_SUPABASE_ANON_KEY_HERE';

    // This creates a basic client that does NOT need cookies
    const supabase = createClient(supabaseUrl, supabaseKey);

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