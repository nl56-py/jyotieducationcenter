import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guards";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const VALID_ROLES = ["super_admin", "admin", "editor", "counselor", "viewer"];
const VALID_STATUSES = ["active", "suspended", "deleted"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "super_admin") {
      return NextResponse.json({ success: false, error: "Forbidden: Super Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { role, status } = body;

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: "Supabase Admin client not configured" }, { status: 500 });
    }

    // 1. Fetch user to verify details and protect against self-modification
    const { data: targetUser, error: fetchError } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !targetUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Self-modification protection:
    // Check if the user ID or email matches the current logged-in user
    const isSelf = targetUser.user_id === user.id || targetUser.email === user.email;
    if (isSelf) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You cannot change your own role or status." },
        { status: 400 }
      );
    }

    // Prepare updates
    const updates: any = {};
    if (role !== undefined) {
      if (!VALID_ROLES.includes(role)) {
        return NextResponse.json({ success: false, error: `Invalid role: must be one of ${VALID_ROLES.join(", ")}` }, { status: 400 });
      }
      updates.role = role;
    }

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ success: false, error: `Invalid status: must be one of ${VALID_STATUSES.join(", ")}` }, { status: 400 });
      }
      updates.status = status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: false, error: "No fields to update" }, { status: 400 });
    }

    // 2. Perform database update
    const { data: updatedProfile, error: dbError } = await supabaseAdmin
      .from("admin_users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (dbError) {
      console.error("Database update user error:", dbError);
      return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: updatedProfile });
  } catch (err: any) {
    console.error("Users item PATCH error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
