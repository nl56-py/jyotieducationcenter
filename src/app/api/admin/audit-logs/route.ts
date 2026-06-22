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

    const { data: dbLogs, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Error fetching audit logs:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(dbLogs);
  } catch (err: any) {
    console.error("Audit Logs API GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
