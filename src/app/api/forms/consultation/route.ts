import { NextRequest, NextResponse } from "next/server";
import { BookingSchema } from "@/lib/validation/booking";
import { isRateLimited } from "@/lib/security/rate-limit";
import { sanitizeString, normalizeEmail, normalizePhone, hashString } from "@/lib/security/sanitize";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const ipHash = hashString(ip);

    // Rate limit: Max 3 bookings per IP per 15 minutes
    const { limited } = isRateLimited(`booking:${ipHash}`, {
      limit: 3,
      windowMs: 900000,
    });

    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "Booking requested." });
    }

    // Zod validation
    const result = BookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form values", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    const cleanBooking = {
      full_name: sanitizeString(data.fullName),
      phone: normalizePhone(data.phone),
      email: data.email ? normalizeEmail(data.email) : null,
      preferred_destination: data.preferredDestination ? sanitizeString(data.preferredDestination) : null,
      course_interest: data.courseInterest ? sanitizeString(data.courseInterest) : null,
      preferred_date: data.preferredDate,
      preferred_time: sanitizeString(data.preferredTime),
      message: data.message ? sanitizeString(data.message) : null,
      ip_hash: ipHash,
      user_agent_hash: hashString(userAgent),
      status: "requested",
    };

    const supabaseAdmin = createSupabaseAdminClient();
    if (supabaseAdmin) {
      // 1. Check if matching lead exists or create a new lead
      let leadId = null;
      const { data: lead } = await supabaseAdmin
        .from("leads")
        .select("id")
        .eq("phone", cleanBooking.phone)
        .limit(1)
        .maybeSingle();

      if (lead) {
        leadId = lead.id;
      } else {
        // Insert new lead automatically
        const { data: newLead } = await supabaseAdmin
          .from("leads")
          .insert([{
            full_name: cleanBooking.full_name,
            phone: cleanBooking.phone,
            email: cleanBooking.email,
            preferred_destination: cleanBooking.preferred_destination,
            course_interest: cleanBooking.course_interest,
            message: "Created via consultation booking request.",
            source: "consultation_form",
            ip_hash: cleanBooking.ip_hash,
            user_agent_hash: cleanBooking.user_agent_hash,
            status: "new",
          }])
          .select("id")
          .single();

        if (newLead) leadId = newLead.id;
      }

      // 2. Insert booking record
      const { error } = await supabaseAdmin
        .from("consultation_bookings")
        .insert([{
          ...cleanBooking,
          lead_id: leadId,
        }]);

      if (error) {
        console.error("Supabase booking insertion error:", error);
        throw new Error("Database save failure");
      }
    } else {
      console.log("Mock Mode - Booking requested:", cleanBooking);
    }

    return NextResponse.json({ success: true, message: "Thank you! Consultation requested successfully." });
  } catch (error) {
    console.error("Consultation route error:", error);
    return NextResponse.json(
      { error: "Server error processing your slot request. Please try again later." },
      { status: 500 }
    );
  }
}
