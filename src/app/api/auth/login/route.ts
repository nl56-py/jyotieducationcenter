import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Missing email or password" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase integration not configured" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message });
    }

    if (!data.user) {
      return NextResponse.json({ success: false, error: "Invalid login credentials" });
    }

    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id, role, full_name, status")
      .eq("user_id", data.user.id)
      .eq("status", "active")
      .maybeSingle();

    if (adminError || !adminUser) {
      await supabase.auth.signOut();
      return NextResponse.json({
        success: false,
        error: "This account is not authorized for the EduMark admin panel.",
      });
    }

    return NextResponse.json({ success: true, user: data.user, admin: adminUser });
  } catch (error: any) {
    console.error("Login API route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
