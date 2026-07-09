import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isRateLimited } from "@/lib/security/rate-limit";
import { hashString } from "@/lib/security/sanitize";

export async function POST(request: NextRequest) {
  try {
    // SECURITY (OWASP A07): Rate limit login attempts — 5 per IP per 15 minutes
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const ipHash = hashString(ip);

    const { limited } = isRateLimited(`auth:login:${ipHash}`, {
      limit: 5,
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

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase integration not configured" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // SECURITY (OWASP A09): Log failed login attempts to security_events
      await logSecurityEvent(ipHash, email, "login_failed", error.message);
      return NextResponse.json({ success: false, error: "Invalid email or password" });
    }

    if (!data.user) {
      await logSecurityEvent(ipHash, email, "login_failed", "No user returned");
      return NextResponse.json({ success: false, error: "Invalid login credentials" });
    }

    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id, role, full_name, status")
      .eq("user_id", data.user.id)
      .eq("status", "active")
      .maybeSingle();

    if (adminError || !adminUser) {
      await supabase.auth.signOut();
      await logSecurityEvent(ipHash, email, "login_unauthorized", "Not an admin user");
      return NextResponse.json({
        success: false,
        error: "This account is not authorized for the EduMark admin panel.",
      });
    }

    return NextResponse.json({ success: true, user: data.user, admin: adminUser });
  } catch (error: any) {
    console.error("Login API route error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Log a security event to the security_events table.
 * OWASP A09: Security Logging & Monitoring Failures.
 */
async function logSecurityEvent(
  ipHash: string,
  email: string,
  eventType: string,
  detail: string
) {
  try {
    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) return;

    await supabaseAdmin.from("security_events").insert({
      event_type: eventType,
      ip_hash: ipHash,
      details: { email: email.substring(0, 100), reason: detail },
    });
  } catch (e) {
    // Don't fail the login flow if logging fails
    console.error("Failed to log security event:", e);
  }
}
