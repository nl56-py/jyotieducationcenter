import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../supabase/server";
import { AdminRole } from "../supabase/types";
import { hasPermission, Permission } from "./roles";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: AdminRole;
  fullName: string;
  isMock?: boolean;
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  // 1. Try Supabase Auth client first
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Query the admin user record for role details
        const { data: adminUser, error } = await supabase
          .from("admin_users")
          .select("id, role, full_name")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (adminUser && !error) {
          return {
            id: adminUser.id,
            email: user.email!,
            role: adminUser.role,
            fullName: adminUser.full_name,
          };
        }
      }
    } catch (e) {
      console.warn("Failed to get current user via Supabase (falling back to mock cookie):", e);
    }
  }

  // 2. Fallback to mock session cookie for local dev previews
  // SECURITY (OWASP A01): Only allow mock sessions in development
  if (process.env.NODE_ENV !== "production") {
    try {
      const cookieStore = await cookies();
      const mockCookie = cookieStore.get("edumark_mock_session");
      if (mockCookie?.value) {
        const session = JSON.parse(mockCookie.value);
        if (session && session.email) {
          return {
            id: session.id || "mock-admin-id-12345",
            email: session.email,
            role: (session.role as AdminRole) || "super_admin",
            fullName: session.fullName || "Mock Admin User",
            isMock: true,
          };
        }
      }
    } catch (e) {
      // Ignore cookies read error in static layouts
    }
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
