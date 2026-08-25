import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const path = request.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith("/admin")) {
    let isAuthenticated = false;

    // 1. Check JWT auth token from cookies
    const authToken = request.cookies.get("auth_token")?.value || request.cookies.get("jyoti_session")?.value;
    if (authToken) {
      try {
        // Base64 decode JWT payload (Edge/Node compatible without external heavy deps)
        const parts = authToken.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            Buffer.from(parts[1], "base64").toString("utf8")
          );
          if (payload && payload.email && (!payload.exp || payload.exp * 1000 > Date.now())) {
            isAuthenticated = true;
          }
        }
      } catch (e) {
        // token parse failed
      }
    }

    // 2. Check mock session cookie
    if (!isAuthenticated) {
      const mockSession =
        request.cookies.get("jyoti_mock_session")?.value ||
        request.cookies.get("edumark_mock_session")?.value;
      if (mockSession) {
        try {
          const session = JSON.parse(mockSession);
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
