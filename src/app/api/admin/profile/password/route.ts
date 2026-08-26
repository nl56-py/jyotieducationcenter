import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await request.json();
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("admin_users")
      .update({ password_hash: hashedPassword, updated_at: new Date() })
      .eq("id", user.id);

    if (error) {
      console.error("Profile password update error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (err: any) {
    console.error("Profile password update error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to update password" }, { status: 500 });
  }
}
