import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth/guards";
import prisma from "@/lib/db/prisma";
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

    const dbUsers = await prisma.adminUser.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        user_id: true,
        full_name: true,
        email: true,
        role: true,
        status: true,
        last_seen_at: true,
        created_at: true,
        updated_at: true,
      },
    });

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

    // Check if user already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({ success: false, error: "A user with this email already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.adminUser.create({
      data: {
        email: cleanEmail,
        full_name,
        password_hash: hashedPassword,
        role,
        status: "active",
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (err: any) {
    return safeErrorResponse(err, { logLabel: "Users API POST" });
  }
}
