import { NextRequest, NextResponse } from "next/server";
import { LeadSchema } from "@/lib/validation/lead";
import { isRateLimited } from "@/lib/security/rate-limit";
import { sanitizeString, normalizeEmail, normalizePhone, hashString } from "@/lib/security/sanitize";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    // 1. Resolve client IP and User Agent for Rate Limiting and Privacy hashing
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const ipHash = hashString(ip);

    // Rate limit: Max 5 submissions per IP per 10 minutes
    const { limited } = isRateLimited(`inquiry:${ipHash}`, {
      limit: 5,
      windowMs: 600000,
    });

    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in 10 minutes." },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    const body = await request.json();

    // 3. Honeypot check (Spam bot protection)
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Quietly return success to fool spam bots (standard anti-spam pattern)
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 4. Zod validation
    const result = LeadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form values", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 5. Sanitize and normalize inputs
    const cleanLead = {
      full_name: sanitizeString(data.fullName),
      phone: normalizePhone(data.phone),
      email: data.email ? normalizeEmail(data.email) : null,
      preferred_destination: data.preferredDestination ? sanitizeString(data.preferredDestination) : null,
      course_interest: data.courseInterest ? sanitizeString(data.courseInterest) : null,
      message: data.message ? sanitizeString(data.message) : null,
      source: sanitizeString(data.source || "inquiry_form"),
      ip_hash: ipHash,
      user_agent_hash: hashString(userAgent),
      status: "new",
    };

    // 6. Save to Supabase (if configured)
    const supabaseAdmin = createSupabaseAdminClient();
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from("leads")
        .insert([cleanLead]);

      if (error) {
        console.error("Supabase lead insertion error:", error);
        throw new Error("Database save failure");
      }
    } else {
      console.log("Mock Mode - Form submitted clean values:", cleanLead);
    }

    return NextResponse.json({ success: true, message: "Thank you! Inquiry submitted successfully." });
  } catch (error) {
    console.error("Inquiry route error:", error);
    return NextResponse.json(
      { error: "Server error processing your inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
