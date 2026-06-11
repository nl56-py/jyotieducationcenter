import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited } from "@/lib/security/rate-limit";
import { normalizeEmail, hashString } from "@/lib/security/sanitize";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const SubscriberSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const ipHash = hashString(ip);

    // Rate limit: Max 5 subscriber requests per IP per hour
    const { limited } = isRateLimited(`newsletter:${ipHash}`, {
      limit: 5,
      windowMs: 3600000,
    });

    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Zod validation
    const result = SubscriberSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = result.data;
    const cleanSubscriber = {
      email: normalizeEmail(data.email),
      source: data.source ? normalizeEmail(data.source) : "footer_subscription",
      status: "active",
    };

    const supabaseAdmin = createSupabaseAdminClient();
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from("newsletter_subscribers")
        .insert([cleanSubscriber]);

      if (error) {
        // If already subscribed, return positive success message anyway to avoid leaks (security A06)
        if (error.code === "23505") {
          return NextResponse.json({ success: true, message: "Subscribed successfully." });
        }
        console.error("Supabase subscriber insertion error:", error);
        throw new Error("Database insertion failure");
      }
    } else {
      console.log("Mock Mode - Newsletter subscribed:", cleanSubscriber);
    }

    return NextResponse.json({ success: true, message: "Thank you for subscribing to our newsletter!" });
  } catch (error) {
    console.error("Newsletter route error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
