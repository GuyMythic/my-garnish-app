import { createBrowserClient } from '@supabase/ssr'

// Instantiates a client that automatically reads/writes browser cookies 
// so that your server-side middleware stays in perfect alignment.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
