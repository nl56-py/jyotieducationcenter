import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminRole } from "../supabase/types";
import { hasPermission, Permission } from "./roles";
import { verifyJwtToken } from "./jwt";
import { createSupabaseServerClient } from "../supabase/server";

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
        // Verify user is still active in database using native MySQL pool
        try {
          const supabase = await createSupabaseServerClient();
          if (supabase) {
            const cleanEmail = payload.email.toLowerCase();
            const emailCandidates = [cleanEmail];
            if (cleanEmail.endsWith("@jyotieducation.edu.np")) {
              emailCandidates.push(cleanEmail.replace("@jyotieducation.edu.np", "@jyotieducations.edu.np"));
            } else if (cleanEmail.endsWith("@jyotieducations.edu.np")) {
              emailCandidates.push(cleanEmail.replace("@jyotieducations.edu.np", "@jyotieducation.edu.np"));
            }

            let dbUser: any = null;
            for (const candidate of emailCandidates) {
              const { data } = await supabase
                .from("admin_users")
                .select("id, email, role, full_name, status")
                .eq("email", candidate)
                .maybeSingle();
              if (data) {
                dbUser = data;
                break;
              }
            }

            if (dbUser) {
              const status = (dbUser.status || dbUser.STATUS || "active").toLowerCase();
              if (status !== "active") {
                // Account is inactive or suspended
                return null;
              }
              const role = (dbUser.role || dbUser.ROLE || payload.role).toLowerCase() as AdminRole;
              const fullName = dbUser.full_name || dbUser.FULL_NAME || payload.fullName;
              return {
                id: dbUser.id || dbUser.ID || payload.id,
                email: dbUser.email || dbUser.EMAIL || payload.email,
                role,
                fullName,
              };
            }
          }
        } catch (dbError) {
          // If DB is temporarily unreachable, fallback to verified JWT payload
        }

        // Fallback to verified JWT payload if user record is during cold-start/setup
        return {
          id: payload.id,
          email: payload.email,
          role: payload.role,
          fullName: payload.fullName,
        };
      }
    }

    // 2. Mock session fallback for testing/dev (ONLY if no valid JWT token is present)
    const mockCookie = cookieStore.get("edumark_mock_session") || cookieStore.get("jyoti_mock_session");
    if (mockCookie?.value) {
      try {
        let rawVal = mockCookie.value;
        if (rawVal.startsWith("%")) {
          try {
            rawVal = decodeURIComponent(rawVal);
          } catch (e) {}
        }
        const session = JSON.parse(rawVal);
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
