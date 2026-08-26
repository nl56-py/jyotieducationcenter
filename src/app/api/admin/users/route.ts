import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { safeErrorResponse } from "@/lib/security/api-error";

const VALID_ROLES = ["super_admin", "admin", "editor", "counselor", "viewer"];

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden: Super Admin access required" }, { status: 403 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
    }

    const { data: dbUsers, error } = await supabase
      .from("admin_users")
      .select("id, user_id, full_name, email, role, status, last_seen_at, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbUsers || []);
  } catch (err: any) {
    return safeErrorResponse(err, { logLabel: "Users API GET" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden: Super Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { email, password, full_name, role } = body;

    // Validation
    if (!email || !password || !full_name || !role) {
      return NextResponse.json({ success: false, error: "Missing required fields: email, password, full_name, role" }, { status: 400 });
    }

    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ success: false, error: `Invalid role: must be one of ${VALID_ROLES.join(", ")}` }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
    }

    // Check if user already exists
    const { data: existing } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: false, error: "A user with this email already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from("admin_users")
      .insert({
        email: cleanEmail,
        full_name,
        password_hash: hashedPassword,
        role,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: newUser });
  } catch (err: any) {
    return safeErrorResponse(err, { logLabel: "Users API POST" });
  }
}
