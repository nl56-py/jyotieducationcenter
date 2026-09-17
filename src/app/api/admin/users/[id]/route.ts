import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { safeErrorResponse } from "@/lib/security/api-error";

const VALID_ROLES = ["super_admin", "admin", "editor", "counselor", "viewer"];
const VALID_STATUSES = ["active", "suspended", "deleted"];

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

    const rawId = (await params).id;
    const id = decodeURIComponent(rawId).trim();
    const body = await request.json();
    const { role, status, password } = body;

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
    }

    let targetUser: any = null;

    // 1. Lookup by ID
    const { data: byId } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (byId) {
      targetUser = byId;
    } else {
      // 2. Lookup by email and domain candidates
      const candidateEmails = [id.toLowerCase()];
      if (id.includes("@jyotieducation.edu.np")) {
        candidateEmails.push(id.toLowerCase().replace("@jyotieducation.edu.np", "@jyotieducations.edu.np"));
      } else if (id.includes("@jyotieducations.edu.np")) {
        candidateEmails.push(id.toLowerCase().replace("@jyotieducations.edu.np", "@jyotieducation.edu.np"));
      }

      for (const cand of candidateEmails) {
        const { data: byEmail } = await supabase
          .from("admin_users")
          .select("*")
          .eq("email", cand)
          .maybeSingle();
        if (byEmail) {
          targetUser = byEmail;
          break;
        }
      }
    }

    if (!targetUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const targetEmail = String(targetUser.email || targetUser.EMAIL || "").toLowerCase();
    const userEmail = String(user.email || "").toLowerCase();
    const isSelf = targetUser.id === user.id || targetEmail === userEmail;

    // Self-modification protection: allow changing own password, but block demoting or suspending self
    if (isSelf && (role !== undefined || status !== undefined)) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You cannot change your own role or suspend your own account." },
        { status: 400 }
      );
    }

    const updates: any = {};

    if (password !== undefined && password.trim() !== "") {
      if (password.length < 6) {
        return NextResponse.json({ success: false, error: "Password must be at least 6 characters." }, { status: 400 });
      }
      updates.password_hash = await bcrypt.hash(password, 10);
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
      return NextResponse.json({ success: false, error: "No fields to update" }, { status: 400 });
    }

    let updateSuccess = false;
    let updateErrorMsg: string | null = null;

    if (targetUser.id) {
      const { error: errId } = await supabase
        .from("admin_users")
        .update(updates)
        .eq("id", targetUser.id);
      if (!errId) {
        updateSuccess = true;
      } else {
        updateErrorMsg = errId.message;
      }
    }

    if (targetUser.email) {
      const { error: errEmail } = await supabase
        .from("admin_users")
        .update(updates)
        .eq("email", targetUser.email);
      if (!errEmail) {
        updateSuccess = true;
      } else if (!updateErrorMsg) {
        updateErrorMsg = errEmail.message;
      }
    }

    if (!updateSuccess) {
      return NextResponse.json({ success: false, error: updateErrorMsg || "Failed to update user record" }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: { ...targetUser, ...updates } });
  } catch (err: any) {
    return safeErrorResponse(err, { logLabel: "Users item PATCH" });
  }
}

export async function DELETE(
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

    const rawId = (await params).id;
    const id = decodeURIComponent(rawId).trim();
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Database client not configured" }, { status: 500 });
    }

    let targetUser: any = null;
    const { data: byId } = await supabase
      .from("admin_users")
      .select("id, email")
      .eq("id", id)
      .maybeSingle();

    if (byId) {
      targetUser = byId;
    } else {
      const candidateEmails = [id.toLowerCase()];
      if (id.includes("@jyotieducation.edu.np")) {
        candidateEmails.push(id.toLowerCase().replace("@jyotieducation.edu.np", "@jyotieducations.edu.np"));
      } else if (id.includes("@jyotieducations.edu.np")) {
        candidateEmails.push(id.toLowerCase().replace("@jyotieducations.edu.np", "@jyotieducation.edu.np"));
      }

      for (const cand of candidateEmails) {
        const { data: byEmail } = await supabase
          .from("admin_users")
          .select("id, email")
          .eq("email", cand)
          .maybeSingle();
        if (byEmail) {
          targetUser = byEmail;
          break;
        }
      }
    }

    if (!targetUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const targetEmail = String(targetUser.email || targetUser.EMAIL || "").toLowerCase();
    const userEmail = String(user.email || "").toLowerCase();
    const isSelf = targetUser.id === user.id || targetEmail === userEmail;

    if (isSelf) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You cannot delete your own account." },
        { status: 400 }
      );
    }

    let deleteSuccess = false;
    let deleteErrorMsg: string | null = null;

    if (targetUser.id) {
      const { error: errId } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", targetUser.id);
      if (!errId) {
        deleteSuccess = true;
      } else {
        deleteErrorMsg = errId.message;
      }
    }

    if (!deleteSuccess && targetUser.email) {
      const { error: errEmail } = await supabase
        .from("admin_users")
        .delete()
        .eq("email", targetUser.email);
      if (!errEmail) {
        deleteSuccess = true;
      } else if (!deleteErrorMsg) {
        deleteErrorMsg = errEmail.message;
      }
    }

    if (!deleteSuccess) {
      return NextResponse.json({ success: false, error: deleteErrorMsg || "Failed to delete user" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (err: any) {
    return safeErrorResponse(err, { logLabel: "Users item DELETE" });
  }
}
