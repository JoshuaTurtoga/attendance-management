import { createClient } from '@supabase/supabase-js'

// This creates a Supabase client with the SERVICE_ROLE_KEY.
// WARNING: This client bypasses all Row Level Security (RLS) policies.
// It should ONLY be used in secure Server Actions or Route Handlers,
// and you must manually check the caller's authorization (e.g. ensure they are an admin).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
