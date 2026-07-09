import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const path = request.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith("/admin")) {
    let isAuthenticated = false;

    // 1. Try Supabase Auth
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (
        supabaseUrl &&
        supabaseAnonKey &&
        !supabaseUrl.includes("placeholder-project")
      ) {
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) =>
                request.cookies.set(name, value)
              );
              response = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            },
          },
        });
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: adminUser } = await supabase
            .from("admin_users")
            .select("id")
            .eq("user_id", user.id)
            .eq("status", "active")
            .maybeSingle();

          isAuthenticated = !!adminUser;
        }
      }
    } catch (error) {
      console.warn("Supabase Auth middleware error (falling back to mock check):", error);
    }

    // 2. Fallback to mock session cookie for local preview/testing
    // SECURITY (OWASP A01): Only allow mock sessions in development
    if (!isAuthenticated && process.env.NODE_ENV !== "production") {
      const mockSession = request.cookies.get("edumark_mock_session");
      if (mockSession?.value) {
        try {
          const session = JSON.parse(mockSession.value);
          if (session && session.email) {
            isAuthenticated = true;
          }
        } catch (e) {
          // ignore invalid JSON
        }
      }
    }

    // Redirect logic
    if (path === "/admin/login") {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      if (!isAuthenticated) {
        const loginUrl = new URL("/admin/login", request.url);
        // Save original URL to redirect back after login
        loginUrl.searchParams.set("next", path);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
