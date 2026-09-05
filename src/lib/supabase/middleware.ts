import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const validUrl =
    supabaseUrl && supabaseUrl.startsWith("http")
      ? supabaseUrl
      : "https://placeholder-project.supabase.co";
  const validKey = supabaseAnonKey || "placeholder-anon-key";

  const supabase = createServerClient(validUrl, validKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh auth token by reading user session if configured
  if (
    supabaseUrl &&
    !supabaseUrl.includes("your-project.supabase.co") &&
    supabaseAnonKey &&
    !supabaseAnonKey.includes("your-placeholder")
  ) {
    try {
      await supabase.auth.getUser();
    } catch {
      // Ignore auth fetch error in middleware
    }
  }

  return supabaseResponse;
}
