import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth/guards";
import prisma from "@/lib/db/prisma";
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

    const targetUser = await prisma.adminUser.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Self-modification protection
    const isSelf = targetUser.id === user.id || targetUser.email === user.email;
    if (isSelf) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You cannot change your own role, status, or password from here." },
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

    const updatedUser = await prisma.adminUser.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err: any) {
    return safeErrorResponse(err, { logLabel: "Users item PATCH" });
  }
}
