import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guards";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { safeErrorResponse } from "@/lib/security/api-error";

// Helper to check if role is valid
const VALID_ROLES = ["super_admin", "admin", "editor", "counselor", "viewer"];

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden: Super Admin access required" }, { status: 403 });
    }

    // Determine whether to use admin client (for mock fallbacks) or server client
    let supabase: any;
    if (user.isMock) {
      supabase = createSupabaseAdminClient();
    } else {
      supabase = await createSupabaseServerClient();
    }

    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase client not configured" }, { status: 500 });
    }

    const { data: dbUsers, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching admin users:", error);
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

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: "Supabase Admin client not configured (Service Role key missing)" }, { status: 500 });
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

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error("Supabase Auth admin createUser error:", authError);
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
    }

    if (!authData?.user) {
      return NextResponse.json({ success: false, error: "Failed to create user in Auth system" }, { status: 500 });
    }

    // 2. Create profile in admin_users table
    const { data: profile, error: dbError } = await supabaseAdmin
      .from("admin_users")
      .insert({
        user_id: authData.user.id,
        email,
        full_name,
        role,
        status: "active",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error inserting admin user:", dbError);
      
      // Attempt cleanup of the created Auth user to avoid orphan auth accounts
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      
      return NextResponse.json({ success: false, error: `Database insert failed: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: profile });
  } catch (err: any) {
    return safeErrorResponse(err, { logLabel: "Users API POST" });
  }
}
