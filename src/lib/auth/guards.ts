import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminRole } from "../supabase/types";
import { hasPermission, Permission } from "./roles";
import { verifyJwtToken } from "./jwt";
import prisma from "../db/prisma";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: AdminRole;
  fullName: string;
  isMock?: boolean;
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();

    // 1. Check JWT token in cookies
    const token = cookieStore.get("auth_token")?.value || cookieStore.get("jyoti_session")?.value;
    if (token) {
      const payload = verifyJwtToken(token);
      if (payload) {
        // Verify user is still active in database
        try {
          const user = await prisma.adminUser.findUnique({
            where: { email: payload.email },
            select: { id: true, email: true, role: true, full_name: true, status: true },
          });

          if (user && user.status === "active") {
            return {
              id: user.id,
              email: user.email,
              role: user.role as AdminRole,
              fullName: user.full_name,
            };
          }
        } catch (dbError) {
          // If DB is temporarily unreachable, fallback to verified JWT payload
          return {
            id: payload.id,
            email: payload.email,
            role: payload.role,
            fullName: payload.fullName,
          };
        }
      }
    }

    // 2. Mock session fallback for testing/dev
    const mockCookie = cookieStore.get("edumark_mock_session") || cookieStore.get("jyoti_mock_session");
    if (mockCookie?.value) {
      try {
        const session = JSON.parse(mockCookie.value);
        if (session && session.email) {
          return {
            id: session.id || "mock-admin-id-12345",
            email: session.email,
            role: (session.role as AdminRole) || "super_admin",
            fullName: session.fullName || "Admin User",
            isMock: true,
          };
        }
      } catch (e) {
        // ignore JSON parse error
      }
    }
  } catch (err) {
    // Ignore cookies read error in static render contexts
  }

  return null;
}

export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function requirePermission(permission: Permission): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  if (!hasPermission(user.role, permission)) {
    throw new Error(`Forbidden: You do not have the permission to ${permission}`);
  }
  return user;
}
