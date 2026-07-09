import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guards";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { safeErrorResponse } from "@/lib/security/api-error";

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
    const { role, status, password } = body;

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin && !user.isMock) {
      return NextResponse.json({ success: false, error: "Supabase Admin client not configured (Service Role key missing)" }, { status: 500 });
    }

    // 1. Fetch user to verify details and protect against self-modification
    let targetUser: any = null;
    let fetchError: any = null;

    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("admin_users")
        .select("*")
        .eq("id", id)
        .single();
      targetUser = data;
      fetchError = error;
    } else if (user.isMock) {
      targetUser = { id, user_id: "mock-id", email: "mock@example.com", role: "counselor", status: "active" };
    } else {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
    }

    if (fetchError || !targetUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Self-modification protection:
    // Check if the user ID or email matches the current logged-in user
    const isSelf = targetUser.user_id === user.id || targetUser.email === user.email;
    if (isSelf) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You cannot change your own password, role, or status here." },
        { status: 400 }
      );
    }

    // Handle password update if provided
    let passwordUpdated = false;
    let newUserId = targetUser.user_id;

    if (password !== undefined) {
      if (password.length < 8) {
        return NextResponse.json({ success: false, error: "Password must be at least 8 characters." }, { status: 400 });
      }
      if (!user.isMock && supabaseAdmin) {
        if (!newUserId) {
          // Attempt to find existing auth user by email
          const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
            perPage: 1000,
          });
          if (listError) {
            console.error("Error listing users to find match:", listError);
            return NextResponse.json({ success: false, error: `Failed to search Auth users: ${listError.message}` }, { status: 500 });
          }

          const existingAuthUser = listData?.users?.find(
            (u: any) => u.email?.toLowerCase() === targetUser.email.toLowerCase()
          );

          if (existingAuthUser) {
            newUserId = existingAuthUser.id;
            const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
              newUserId,
              { password }
            );
            if (authError) {
              console.error("Error resetting user password in Auth:", authError);
              return NextResponse.json({ success: false, error: `Auth update failed: ${authError.message}` }, { status: 500 });
            }
          } else {
            // Create user in Supabase Auth on the fly
            const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
              email: targetUser.email,
              password,
              email_confirm: true,
            });
            if (authError) {
              console.error("Error creating missing Auth user:", authError);
              return NextResponse.json({ success: false, error: `Failed to create Auth account: ${authError.message}` }, { status: 500 });
            }
            newUserId = authData.user.id;
          }
        } else {
          // Regular password update
          const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
            newUserId,
            { password }
          );
          if (authError) {
            console.error("Error resetting user password in Auth:", authError);
            return NextResponse.json({ success: false, error: `Auth update failed: ${authError.message}` }, { status: 500 });
          }
        }
      }
      passwordUpdated = true;
    }

    // Prepare updates
    const updates: any = {};
    if (newUserId && newUserId !== targetUser.user_id) {
      updates.user_id = newUserId;
    }

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
      if (passwordUpdated) {
        return NextResponse.json({ success: true, message: "Password updated successfully." });
      }
      return NextResponse.json({ success: false, error: "No fields to update" }, { status: 400 });
    }

    // Handle database update for mock mode
    if (user.isMock) {
      const mockUpdatedProfile = {
        id,
        user_id: "mock-id",
        email: "mock@example.com",
        role: role !== undefined ? role : targetUser.role,
        status: status !== undefined ? status : targetUser.status,
        updated_at: new Date().toISOString()
      };
      return NextResponse.json({ success: true, user: mockUpdatedProfile });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
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
    return safeErrorResponse(err, { logLabel: "Users item PATCH" });
  }
}
