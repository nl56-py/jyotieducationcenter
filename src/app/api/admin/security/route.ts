import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/guards";
import { hasPermission } from "@/lib/auth/roles";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(user.role, "read:audit_logs")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const { data: dbEvents, error } = await supabase
      .from("security_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching security events:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbEvents);
  } catch (err: any) {
    console.error("Security API GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(user.role, "read:audit_logs")) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { id, resolve } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing event ID" }, { status: 400 });
    }

    // Resolve security event by setting resolved_at timestamp
    const resolvedAt = resolve ? new Date().toISOString() : null;

    const { data: updated, error } = await supabase
      .from("security_events")
      .update({ resolved_at: resolvedAt })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, event: updated });
  } catch (err: any) {
    console.error("Security API POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
