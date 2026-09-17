import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwtToken } from "@/lib/auth/jwt";
import { isRateLimited } from "@/lib/security/rate-limit";
import { hashString } from "@/lib/security/sanitize";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Extract real client IP behind LiteSpeed / CloudLinux / Cloudflare proxy
    const rawIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-client-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const ipHash = hashString(rawIp);

    const { limited } = isRateLimited(`auth:login:${ipHash}`, {
      limit: 30, // 30 attempts per 15 min allows staff retry without shared proxy lockout
      windowMs: 900000, // 15 minutes
    });

    if (limited) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Missing email or password" }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Transparent domain alias candidates (both @jyotieducation.edu.np and @jyotieducations.edu.np)
    const emailCandidates = [cleanEmail];
    if (cleanEmail.endsWith("@jyotieducation.edu.np")) {
      emailCandidates.push(cleanEmail.replace("@jyotieducation.edu.np", "@jyotieducations.edu.np"));
      emailCandidates.push(cleanEmail.replace("@jyotieducation.edu.np", "@jyotieducation.com.np"));
    } else if (cleanEmail.endsWith("@jyotieducations.edu.np")) {
      emailCandidates.push(cleanEmail.replace("@jyotieducations.edu.np", "@jyotieducation.edu.np"));
      emailCandidates.push(cleanEmail.replace("@jyotieducations.edu.np", "@jyotieducation.com.np"));
    } else if (cleanEmail.endsWith("@jyotieducation.com.np")) {
      emailCandidates.push(cleanEmail.replace("@jyotieducation.com.np", "@jyotieducation.edu.np"));
      emailCandidates.push(cleanEmail.replace("@jyotieducation.com.np", "@jyotieducations.edu.np"));
    }

    // 1. Query user from database using connection pool across candidate aliases
    let rawAdminUser: any = null;
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      try {
        for (const candidate of emailCandidates) {
          const { data } = await supabase
            .from("admin_users")
            .select("*")
            .eq("email", candidate)
            .maybeSingle();
          if (data) {
            rawAdminUser = data;
            break;
          }
        }
      } catch (dbError) {
        console.error("Database lookup error during login:", dbError);
      }
    }

    // Normalize column casing for cross-engine compatibility (MySQL / MariaDB / CloudLinux)
    let adminUser: any = null;
    if (rawAdminUser) {
      adminUser = {
        id: rawAdminUser.id || rawAdminUser.ID,
        email: rawAdminUser.email || rawAdminUser.EMAIL,
        full_name: rawAdminUser.full_name || rawAdminUser.FULL_NAME || rawAdminUser.name || "Administrator",
        password_hash: rawAdminUser.password_hash ?? rawAdminUser.PASSWORD_HASH ?? "",
        role: (rawAdminUser.role || rawAdminUser.ROLE || "admin").toLowerCase(),
        status: (rawAdminUser.status || rawAdminUser.STATUS || "active").toLowerCase(),
      };
    }

    if (!adminUser || !adminUser.password_hash) {
      await logSecurityEvent(ipHash, cleanEmail, "login_failed", "Invalid email or password");
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    if (adminUser.status !== "active") {
      await logSecurityEvent(ipHash, cleanEmail, "login_blocked", "Account is inactive or suspended");
      return NextResponse.json({ success: false, error: "Account is inactive or suspended." }, { status: 403 });
    }

    let isValidPassword = false;

    // Verify password strictly against database hash using bcrypt
    if (adminUser.password_hash.startsWith("$2")) {
      isValidPassword = await bcrypt.compare(password, adminUser.password_hash);
    } else if (adminUser.password_hash === password) {
      // Upgrade legacy plaintext password if matching database record
      isValidPassword = true;
      if (supabase && adminUser.id) {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          await supabase
            .from("admin_users")
            .update({ password_hash: hashedPassword, status: "active" })
            .eq("id", adminUser.id);
          adminUser.password_hash = hashedPassword;
        } catch (e) {
          console.error("Failed to upgrade legacy password hash:", e);
        }
      }
    }

    if (!isValidPassword) {
      await logSecurityEvent(ipHash, cleanEmail, "login_failed", "Invalid email or password");
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    // Update last seen
    if (supabase && adminUser.id) {
      try {
        await supabase
          .from("admin_users")
          .update({ last_seen_at: new Date().toISOString() })
          .eq("id", adminUser.id);
      } catch (e) {}
    }

    // 2. Generate signed JWT Token
    const payload = {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role as any,
      fullName: adminUser.full_name,
    };
    const token = signJwtToken(payload);

    // 3. Create response and set secure cookies
    const response = NextResponse.json({
      success: true,
      user: { id: adminUser.id, email: adminUser.email },
      admin: adminUser,
    });

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax" as const,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    };

    // Purge any stale legacy/mock session cookies before setting new tokens
    response.cookies.delete("jyoti_mock_session");
    response.cookies.set("jyoti_mock_session", "", { path: "/", maxAge: 0, expires: new Date(0) });

    response.cookies.set("auth_token", token, cookieOptions);
    response.cookies.set("jyoti_session", token, cookieOptions);
    response.cookies.set(
      "edumark_mock_session",
      JSON.stringify(payload),
      { ...cookieOptions, httpOnly: false }
    );

    await logSecurityEvent(ipHash, cleanEmail, "login_success", "User logged in successfully");

    return response;
  } catch (error: any) {
    console.error("Login API route error:", error);
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}

async function logSecurityEvent(
  ipHash: string,
  email: string,
  eventType: string,
  detail: string
) {
  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      await supabase.from("security_events").insert({
        event_type: eventType,
        severity: eventType.includes("failed") ? "warning" : "info",
        fingerprint: ipHash,
        details: JSON.stringify({ email: email.substring(0, 100), reason: detail }),
      });
    }
  } catch (e) {
    // Ignore logging failure to avoid breaking auth flow
  }
}
