import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/login", "/register", "/auth"];

// Role-to-dashboard mapping
const ROLE_DASHBOARDS: Record<string, string> = {
  admin: "/dashboard/admin",
  instructor: "/dashboard/instructor",
  student: "/dashboard/student",
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Always call getUser() to refresh the session token.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // 1. No session → redirect to /login (unless already on a public route)
  if (!user && !isPublicRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "Please sign in to continue.");
    return NextResponse.redirect(loginUrl);
  }

  // 2. Has session but tries to access /login or /register → redirect to dashboard
  if (user && (pathname === "/login" || pathname === "/register")) {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = roleData?.role ?? "student";
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = ROLE_DASHBOARDS[role] ?? "/dashboard/student";
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  // 3. Has session but accessing wrong role's dashboard → redirect to correct one
  if (user && pathname.startsWith("/dashboard")) {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = roleData?.role ?? "student";
    const correctDashboard = ROLE_DASHBOARDS[role] ?? "/dashboard/student";

    // Check they aren't already on a valid sub-path of their dashboard
    if (!pathname.startsWith(correctDashboard)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = correctDashboard;
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return supabaseResponse;
}
