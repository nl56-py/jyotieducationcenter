import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    // Clear session cookies
    response.cookies.delete("auth_token");
    response.cookies.delete("jyoti_session");
    response.cookies.delete("edumark_mock_session");
    response.cookies.delete("jyoti_mock_session");

    return response;
  } catch (error: any) {
    console.error("Logout API route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
