import { NextResponse } from "next/server";

function clearAuthCookies(response: NextResponse) {
  const isProduction = process.env.NODE_ENV === "production";
  const clearOptions = {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax" as const,
    secure: isProduction,
  };

  response.cookies.set("auth_token", "", { ...clearOptions, httpOnly: true });
  response.cookies.set("jyoti_session", "", { ...clearOptions, httpOnly: true });
  response.cookies.set("edumark_mock_session", "", { ...clearOptions, httpOnly: false });
  response.cookies.set("jyoti_mock_session", "", { ...clearOptions, httpOnly: false });

  // Additional delete calls for Next.js engine compatibility
  response.cookies.delete("auth_token");
  response.cookies.delete("jyoti_session");
  response.cookies.delete("edumark_mock_session");
  response.cookies.delete("jyoti_mock_session");
}

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    clearAuthCookies(response);
    return response;
  } catch (error: any) {
    console.error("Logout API route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const redirectUrl = new URL("/admin/login", url.origin);
    const response = NextResponse.redirect(redirectUrl);
    clearAuthCookies(response);
    return response;
  } catch (error: any) {
    console.error("Logout GET route error:", error);
    return NextResponse.redirect("/admin/login");
  }
}
