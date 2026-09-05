import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Client Components ("use client").
 * Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isConfigured =
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project.supabase.co") &&
    !supabaseAnonKey.includes("your-placeholder");

  if (!isConfigured && typeof window !== "undefined") {
    // Graceful warning for development
    console.info(
      "[Supabase] Credentials not yet configured in .env.local. Supabase features will be in placeholder mode."
    );
  }

  // Ensure safe fallback URL so createBrowserClient doesn't throw on initialization
  const validUrl =
    supabaseUrl && supabaseUrl.startsWith("http")
      ? supabaseUrl
      : "https://placeholder-project.supabase.co";
  const validKey = supabaseAnonKey || "placeholder-anon-key";

  return createBrowserClient(validUrl, validKey);
}
